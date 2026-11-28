"""Voice for a history video with Gemini TTS, synced line by line.

Free tier = about 10 TTS requests a day, 3 a minute, so each story part (story.GROUPS) is ONE request.
The take is then cut into its lines at the pauses. Safeguards (added after a broken 649 s take got through):
  * every take is checked: its spoken length must fit its text, or it is thrown away and recorded again
    (this also applies to takes already in voice_cache/);
  * cut points are matched on SPOKEN time, so dramatic pauses inside a line do not move a cut;
  * every cut line is checked against its text length; if a part still looks wrong, that part is
    recorded again line by line (one request per line) while the daily budget allows;
  * long silences inside a line are shortened to 0.28 s, so there is never dead air.
Every decision is logged in out/voice_report.txt. Writes out/lines/NNN.wav and out/durations.json.
"""
import base64, hashlib, json, os, subprocess, sys, time, wave
from pathlib import Path
import numpy as np

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from story import LINES, VOICE, GROUPS, GROUP_MOOD  # noqa: E402
VOICE = os.environ.get("VOICE_OVERRIDE") or VOICE   # try another Gemini voice without editing the story

SR = 24000
HOP = 240; FS = SR / HOP                      # 10 ms analysis frames
MODELS = os.environ.get("TTS_MODELS", "gemini-2.5-flash-preview-tts").split(",")   # one model per video = one consistent voice
CACHE = HERE / "voice_cache"; OUT = HERE / "out"; LDIR = OUT / "lines"
ALPHA, BETA = 2.5, 1.0
BUDGET = int(os.environ.get("TTS_BUDGET", "9"))   # requests this run may spend (free tier: 10/day)
REPORT = []
STATE = {"model": None, "calls": 0}


def log(m):
    print(m, flush=True); REPORT.append(m)


def group_lines(g):
    return [i for i, l in enumerate(LINES) if l[0] in g]


def weight(text):
    """Rough spoken length in letters. A digit is said as a word (1671 = सोलह सौ इकहत्तर), a Latin letter as a syllable."""
    return sum(4 if ch.isdigit() else 2 if (ch.isascii() and ch.isalpha()) else 1
               for ch in text if ch.isalnum() or "ऀ" <= ch <= "ॿ")


class NoTake(Exception):
    """Gemini kept returning broken audio for this text."""


PROFILE = ("# AUDIO PROFILE: Vikram — a deep-voiced Hindi storyteller, the voice of a hit Indian history channel.\n"
           "## THE SCENE: He narrates a true story from Indian history for a short video. It plays like a thriller: "
           "gripping, cinematic, confident and alive, never sleepy or monotone. Fast when the action is fast, quiet "
           "and slow only where a direction asks for it. Characters' words are acted with real emotion. "
           "He performs the story; he does not read it.\n"
           "### DIRECTOR'S NOTES\n")


def prompt(gi, idx):
    body = "\n\n".join(f"[{LINES[i][2]}] {LINES[i][1]}" for i in idx)
    return (PROFILE + f"Mood of this passage: {GROUP_MOOD[gi]}.\n"
            "Language: natural spoken Hindi (India). Deep voice, lively storytelling pace (never slow or sleepy); "
            "pause briefly only where the text has '…'.\n"
            "Leave a clear pause of about one second between paragraphs.\n"
            "Words in square brackets are performance directions: follow them, never speak them.\n"
            "#### TRANSCRIPT\n" + body)


def prompt_line(gi, i):
    return (PROFILE + f"Mood of this passage: {GROUP_MOOD[gi]}.\n"
            "Language: natural spoken Hindi (India). Deep voice, lively storytelling pace (never slow or sleepy).\n"
            "Words in square brackets are performance directions: follow them, never speak them.\n"
            f"#### TRANSCRIPT\n[{LINES[i][2]}] {LINES[i][1]}")


# ---------------------------------------------------------------- Gemini
def call_gemini(text):
    """One take. The first model that answers is kept for every later request, so the voice never changes."""
    import requests
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        sys.exit("GEMINI_API_KEY is not set")
    if STATE["calls"] >= BUDGET:
        raise RuntimeError("request budget for this run is used up")
    if STATE["calls"]:
        time.sleep(31)                                        # stay under 3 requests a minute
    body = {"contents": [{"parts": [{"text": text}]}],
            "generationConfig": {"responseModalities": ["AUDIO"],
                                 "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": VOICE}}}}}
    order = [STATE["model"]] if STATE["model"] else MODELS
    last = ""
    for rnd in range(1, 4):
        for model in order:
            try:
                r = requests.post(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
                                  params={"key": key}, json=body, timeout=150)
            except requests.RequestException as e:
                last = f"{model}: {str(e)[:150]}"; log("  " + last); continue
            if r.status_code == 200:
                STATE["calls"] += 1
                try:
                    part = r.json()["candidates"][0]["content"]["parts"][0]["inlineData"]
                    pcm = np.frombuffer(base64.b64decode(part["data"]), dtype=np.int16)
                    log(f"  {model}: {len(pcm) / SR:.1f}s audio (request {STATE['calls']}/{BUDGET})")
                    STATE["model"] = model
                    return pcm
                except Exception as e:
                    last = f"{model}: bad response {str(e)[:120]} {r.text[:200]}"
            else:
                last = f"{model}: {r.status_code} {' '.join(r.text[:300].split())}"
                if r.status_code == 429:
                    if "PerMinute" in r.text or "per minute" in r.text.lower():
                        log(f"  {model}: per-minute limit - waiting 65 s"); time.sleep(65); continue
                    if "PerDay" in r.text or "per day" in r.text.lower():
                        log("  " + last); raise RuntimeError(f"daily voice quota of {model} is used up - run again after it resets (1:30 PM IST)")
            log("  " + last)
        time.sleep(30 * rnd)
    raise RuntimeError("Gemini TTS failed: " + last)


# ---------------------------------------------------------------- analysis
def frames(a):
    n = len(a) // HOP
    x = a[:n * HOP].astype(np.float32).reshape(n, HOP) / 32768
    db = 20 * np.log10(np.sqrt((x ** 2).mean(1)) + 1e-9)
    ref = np.percentile(db[db > -80], 95) if (db > -80).any() else -20
    return db < ref - 32                                      # True = silent frame


def check_take(a, idx):
    """Is this take plausible for these lines? Returns (ok, reason)."""
    if len(a) < SR:
        return False, "take shorter than 1 s"
    sil = frames(a)
    spoken = (~sil).sum() / FS
    letters = sum(weight(LINES[i][1]) for i in idx)
    rate = letters / max(spoken, 0.1)                         # letters per spoken second
    longest = 0; run = 0
    for s in sil:
        run = run + 1 if s else 0; longest = max(longest, run)
    longest /= FS
    total = len(a) / SR
    limit = letters / 6 + 2.5 * len(idx) + 4                  # generous upper bound for the whole take
    if not 5 <= rate <= 30:
        return False, f"{rate:.1f} letters per spoken second (expected 5-30)"
    if total > limit:
        return False, f"{total:.0f}s long, far more than its text needs (limit {limit:.0f}s)"
    if longest > 6:
        return False, f"contains a {longest:.1f}s silence"
    return True, f"{total:.1f}s, {spoken:.1f}s spoken, {rate:.1f} letters/s"


# ---------------------------------------------------------------- speech recognition (alignment)
_ASR = {"model": None, "failed": False}
STRIP = {"\u093c", "\u200c", "\u200d"}                 # nukta and joiners: spelled inconsistently


def norm(s):
    return "".join(ch for ch in s if (ch.isalnum() or "\u0900" <= ch <= "\u097f") and ch not in STRIP
                   and ch not in "।॥").lower()


def asr_words(a):
    """[(start s, end s, word)] from Whisper, or None if it cannot run here."""
    if _ASR["failed"] or os.environ.get("NO_ASR") == "1":
        return None
    try:
        if _ASR["model"] is None:
            from faster_whisper import WhisperModel
            _ASR["model"] = WhisperModel(os.environ.get("ASR_MODEL", "small"), device="cpu", compute_type="int8")
        a16 = np.interp(np.arange(0, len(a), SR / 16000), np.arange(len(a)), a.astype(np.float32)) / 32768
        segs, _ = _ASR["model"].transcribe(a16.astype(np.float32), language="hi", word_timestamps=True, beam_size=1,
                                           condition_on_previous_text=False)
        return [(w.start, w.end, w.word) for s in segs for w in (s.words or [])]
    except Exception as e:                                    # no package / no model download: fall back
        log(f"  speech recognition unavailable ({str(e)[:120]}) - using pause matching")
        _ASR["failed"] = True
        return None


def asr_bounds(words, idx):
    """Where each line ends (seconds), by matching the recognised text to the script. None if it does not match."""
    import difflib
    S, ends = "", []
    for i in idx:
        S += norm(LINES[i][1]); ends.append(len(S))
    A, at = "", []
    for (t0, t1, w) in words:
        nw = norm(w)
        for k, ch in enumerate(nw):
            A += ch; at.append(t0 + (t1 - t0) * (k + 0.5) / max(1, len(nw)))
    if not A:
        return None, 0.0
    sm = difflib.SequenceMatcher(None, S, A, autojunk=False)
    m = {}
    for blk in sm.get_matching_blocks():
        for k in range(blk.size):
            m[blk.a + k] = blk.b + k
    ratio = sum(b.size for b in sm.get_matching_blocks()) / max(1, len(S))
    keys = np.array(sorted(m))
    out = []
    for e in ends[:-1]:
        lo = keys[keys < e]; hi = keys[keys >= e]
        if not len(lo) or not len(hi):
            return None, ratio
        miss_end, miss_next = e - 1 - int(lo[-1]), int(hi[0]) - e   # letters the recogniser missed around the cut
        if miss_end > 25 or miss_next > 25:                   # nearest matched letters too far from the boundary
            return None, ratio
        t_end = at[m[int(lo[-1])]] + miss_end * 0.075; t_next = at[m[int(hi[0])]] - miss_next * 0.075
        out.append((t_end, max(t_next, t_end)))
    return out, ratio


def snap(bounds, runs):
    """Cut at the pause right after each line's (estimated) last letter, before the next line's first one."""
    cuts = []
    for t_end, t_next in bounds:
        lo, hi = (t_end - 0.25) * FS, (t_next + 0.25) * FS
        ref = t_end * FS
        inside = [r for r in runs if lo <= (r[0] + r[1]) / 2 <= hi + 0.6 * FS]
        if inside:
            cuts.append(max(inside, key=lambda r: min(r[1] - r[0], 1.5 * FS) / FS - 1.2 * abs(r[0] - ref) / FS)); continue
        near = [r for r in runs if abs(r[0] - ref) <= 0.9 * FS]
        if near:
            cuts.append(min(near, key=lambda r: abs(r[0] - ref)))
        else:
            cuts.append((int(ref), int(ref)))
    return cuts


def split(a, idx):
    """Cut one take into len(idx) lines, matching cut points on spoken time.
    Returns ([(start, end) samples], rows, suspicious)."""
    sil = frames(a)
    voiced = np.where(~sil)[0]
    v0, v1 = voiced[0], voiced[-1] + 1
    cumv = np.concatenate([[0], np.cumsum(~sil)])             # spoken frames before frame f
    runs, s = [], None
    for f in range(v0, v1):
        if sil[f] and s is None: s = f
        if not sil[f] and s is not None:
            if f - s >= 0.14 * FS: runs.append((s, f))
            s = None
    n = len(idx)
    w = np.array([weight(LINES[i][1]) for i in idx], float)
    V = cumv[v1] - cumv[v0]
    cuts = []
    method = "pause matching"
    if n > 1:
        words = asr_words(a)
        if words:
            bnd, ratio = asr_bounds(words, idx)
            if bnd is not None and ratio >= 0.35:
                c2 = snap(bnd, runs)
                if all(c2[k][0] > (c2[k - 1][1] if k else v0) for k in range(len(c2))) and c2[-1][1] < v1:
                    cuts, method = c2, f"speech recognition (text match {ratio:.0%})"
            if not cuts:
                log(f"  speech recognition did not line up (text match {ratio:.0%}) - using pause matching")
    if n > 1 and not cuts:
        m = len(runs)
        rate0 = V / w.sum()                                   # spoken frames per letter, this take
        e = w * rate0
        if m >= n - 1:
            pos = np.array([cumv[a_] - cumv[v0] for a_, _ in runs], float)
            gap = np.array([min((b_ - a_) / FS, 1.5) for a_, b_ in runs])
            # each line's own spoken length must fit its text (local cost, errors do not pile up);
            # longer pauses are preferred as cut points
            seg = lambda k, s: -ALPHA * abs(np.log(max(s, 1.0) / e[k]))
            NEG = -1e18
            best = np.full((n - 1, m), NEG); back = np.full((n - 1, m), -1)
            for j in range(m): best[0, j] = seg(0, pos[j]) + BETA * gap[j]
            for k in range(1, n - 1):
                for j in range(k, m):
                    cand = best[k - 1, :j] + np.array([seg(k, pos[j] - pos[jj]) for jj in range(j)])
                    jj = int(np.argmax(cand)); best[k, j] = cand[jj] + BETA * gap[j]; back[k, j] = jj
            fin = [best[n - 2, j] + seg(n - 1, V - pos[j]) for j in range(m)]
            j = int(np.argmax(fin)); sel = [j]
            for k in range(n - 2, 0, -1): j = int(back[k, j]); sel.append(j)
            cuts = [runs[j] for j in sel[::-1]]
        else:
            # not enough pauses: cut at the expected spoken positions
            for ex in np.cumsum(e)[:-1]:
                f = int(np.searchsorted(cumv, cumv[v0] + ex)); cuts.append((f, f))
    bounds, prev = [], v0
    for a_, b_ in cuts:
        bounds.append((prev, a_)); prev = b_
    bounds.append((prev, v1))
    spoken = [(cumv[b1] - cumv[b0]) / FS for b0, b1 in bounds]
    rate = sum(spoken) / w.sum()
    rows, bad = [f"  cut by {method}"], False
    for k, (b0, b1) in enumerate(bounds):
        e = w[k] * rate; ratio = spoken[k] / e if e else 1
        flag = ""
        if not 0.55 <= ratio <= 1.8:
            flag, bad = "   <-- SUSPICIOUS", True
        gap = (cuts[k][1] - cuts[k][0]) / FS if k < len(cuts) else 0
        rows.append(f"  line {idx[k]:2d}: {spoken[k]:5.2f}s spoken (expected ~{e:4.1f}s), pause after {gap:.2f}s{flag}  {LINES[idx[k]][1][:40]}")
    pad = int(0.04 * SR)
    return [(max(0, b0 * HOP - pad), min(len(a), b1 * HOP + pad)) for b0, b1 in bounds], rows, bad


def tidy(a):
    """Trim the ends and shorten any silence inside a line to 0.28 s (no dead air)."""
    sil = frames(a)
    voiced = np.where(~sil)[0]
    if not len(voiced):
        return a
    keep, run = [], []
    for f in range(voiced[0], voiced[-1] + 1):
        if sil[f]:
            run.append(f); continue
        if run:
            keep += run if len(run) <= 0.28 * FS else run[:int(0.14 * FS)] + run[-int(0.14 * FS):]
            run = []
        keep.append(f)
    pad = np.zeros(int(0.04 * SR), np.int16)
    body = np.concatenate([a[f * HOP:(f + 1) * HOP] for f in keep])
    return np.concatenate([pad, body, pad])


# ---------------------------------------------------------------- files
def save_wav(path, a):
    with wave.open(str(path), "wb") as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR); f.writeframes(a.astype(np.int16).tobytes())


def save_flac(path, a):
    tmp = OUT / "take.wav"; save_wav(tmp, a)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(tmp), "-c:a", "flac", str(path)], check=True)


def load_flac(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16)


def fake_take(idx, broken=False):
    """Local test without the API: speech-like bursts, pauses inside lines, longer pauses between lines."""
    rng = np.random.default_rng(len(idx)); out = []
    for i in idx:
        for k, piece in enumerate(LINES[i][1].replace("—", "…").replace("।", "…").split("…")):
            if not piece.strip(): continue
            d = max(0.3, weight(piece) / rng.uniform(10, 16)); t = np.arange(int(d * SR)) / SR
            out.append((np.sin(2 * np.pi * 140 * t) * (0.4 + 0.6 * np.abs(np.sin(2 * np.pi * 2.7 * t))) * 9000).astype(np.int16))
            out.append(np.zeros(int(rng.uniform(0.3, 1.4) * SR), np.int16))
        out.append(np.zeros(int(rng.uniform(0.5, 1.0) * SR), np.int16))
    a = np.concatenate(out)
    return np.concatenate([a, np.zeros(600 * SR, np.int16)]) if broken else a


# ---------------------------------------------------------------- main
def take_for(name, text, idx, make):
    """Cached or new take that passes check_take; a bad cached take is discarded."""
    h = hashlib.sha1((VOICE + text).encode()).hexdigest()[:12]
    cf = CACHE / f"{name}_{h}.flac"
    if cf.exists():
        a = load_flac(cf); ok, why = check_take(a, idx)
        if ok:
            log(f"  cached take {cf.name}: {why}"); return a
        log(f"  cached take {cf.name} REJECTED: {why} - recording again"); cf.unlink()
    for attempt in range(1, 3):
        a = make()
        ok, why = check_take(a, idx)
        if ok:
            log(f"  new take: {why}"); save_flac(cf, a); return a
        log(f"  new take REJECTED (attempt {attempt}): {why}")
    raise NoTake(f"no usable take for {name}")


def main():
    CACHE.mkdir(exist_ok=True); LDIR.mkdir(parents=True, exist_ok=True)
    fake = os.environ.get("FAKE_VOICE")                         # "1" = test takes, "broken" = first take of the last part is broken
    durs = {}
    for gi, g in enumerate(GROUPS):
        idx = group_lines(g)
        log(f"Part {gi + 1}/{len(GROUPS)} ({', '.join(g)}): {len(idx)} lines")
        state = {"n": 0}

        def make(idx=idx, gi=gi):
            state["n"] += 1
            if fake:
                return fake_take(idx, broken=(fake == "broken" and gi == len(GROUPS) - 1 and state["n"] == 1))
            return call_gemini(prompt(gi, idx))
        try:
            a = take_for(f"g{gi}", prompt(gi, idx), idx, make)
        except NoTake:
            if len(idx) == 1:
                raise
            log("  this part keeps coming back broken as one take - recording it line by line")
            a, bad = None, False
            clips = {i: take_for(f"l{i:03d}", prompt_line(gi, i), [i],
                                 (lambda i=i: fake_take([i]) if fake else call_gemini(prompt_line(gi, i)))) for i in idx}
        if a is not None:
            segs, rows, bad = split(a, idx)
            for r in rows: log(r)
            clips = {i: a[s0:s1] for i, (s0, s1) in zip(idx, segs)}
        if bad and len(idx) > 1:
            need = len(idx) - sum((CACHE / f"l{i:03d}_{hashlib.sha1((VOICE + prompt_line(gi, i)).encode()).hexdigest()[:12]}.flac").exists() for i in idx)
            if fake or STATE["calls"] + need <= BUDGET:
                log(f"  cuts look wrong - recording this part line by line ({need} requests)")
                try:
                    for i in idx:
                        clips[i] = take_for(f"l{i:03d}", prompt_line(gi, i), [i],
                                            (lambda i=i: fake_take([i]) if fake else call_gemini(prompt_line(gi, i))))
                except RuntimeError as e:
                    log(f"  WARNING: line-by-line recording stopped ({e}) - keeping the cuts from the take")
                    clips.update({i: a[s0:s1] for i, (s0, s1) in zip(idx, segs) if i not in clips})
            else:
                log(f"  WARNING: cuts look wrong but only {BUDGET - STATE['calls']} requests left today - keeping them")
        for i in idx:
            c = tidy(clips[i]); save_wav(LDIR / f"{i:03d}.wav", c); durs[i] = round(len(c) / SR, 3)
            log(f"    line {i:2d} final {durs[i]:.2f}s")
    (OUT / "durations.json").write_text(json.dumps(durs, indent=1))
    log(f"Voice done: {len(durs)} lines, {sum(durs.values()):.1f}s of speech, {STATE['calls']} new requests")
    (OUT / "voice_report.txt").write_text("\n".join(REPORT) + "\n")


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, NoTake) as e:
        (OUT / "voice_report.txt").write_text("\n".join(REPORT) + f"\nFAILED: {e}\n")
        sys.exit(str(e))
