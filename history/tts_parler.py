"""Voice with AI4Bharat Indic Parler-TTS: open source (Apache-2.0), runs on the GitHub machine, no quota.

Every line is recorded on its own, so captions and animation sync exactly with no cutting.
Same output as tts.py: out/lines/NNN.wav (24 kHz mono), out/durations.json, out/voice_report.txt.
Each line is checked (tts.check_take) and recorded again with another seed if it comes out broken.
Lines are cached in voice_cache/ (p_ prefix), so a re-run only records lines whose text changed.

  python tts_parler.py            -> all lines of the video
  python tts_parler.py --sample   -> the hook in two voices, saved as mp3 for listening (out/samples/)
Env: HF_TOKEN (the model is gated), PARLER_SPEAKER (default Rohit), PARLER_SEED.
"""
import hashlib, json, os, re, subprocess, sys, time
from pathlib import Path
import numpy as np

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import tts                                                   # noqa: E402  (shared checks, tidy, files, log)
from tts import log, OUT, LDIR, CACHE, SR                    # noqa: E402
from story import LINES                                      # noqa: E402

MODEL_ID = "ai4bharat/indic-parler-tts"
SPEAKER = os.environ.get("PARLER_SPEAKER", "Rohit")          # recommended Hindi voices: Rohit, Aman (male), Divya, Rani
SEED = int(os.environ.get("PARLER_SEED", "7"))

# ---------------------------------------------------------------- text
ONES = ("शून्य एक दो तीन चार पाँच छह सात आठ नौ दस ग्यारह बारह तेरह चौदह पंद्रह सोलह सत्रह अठारह उन्नीस "
        "बीस इक्कीस बाईस तेईस चौबीस पच्चीस छब्बीस सत्ताईस अट्ठाईस उनतीस तीस इकतीस बत्तीस तैंतीस चौंतीस "
        "पैंतीस छत्तीस सैंतीस अड़तीस उनतालीस चालीस इकतालीस बयालीस तैंतालीस चवालीस पैंतालीस छियालीस सैंतालीस "
        "अड़तालीस उनचास पचास इक्यावन बावन तिरेपन चौवन पचपन छप्पन सत्तावन अट्ठावन उनसठ साठ इकसठ बासठ "
        "तिरेसठ चौंसठ पैंसठ छियासठ सड़सठ अड़सठ उनहत्तर सत्तर इकहत्तर बहत्तर तिहत्तर चौहत्तर पचहत्तर छिहत्तर "
        "सतहत्तर अठहत्तर उन्यासी अस्सी इक्यासी बयासी तिरासी चौरासी पचासी छियासी सत्तासी अट्ठासी नवासी नब्बे "
        "इक्यानवे बानवे तिरानवे चौरानवे पचानवे छियानवे सत्तानवे अट्ठानवे निन्यानवे").split()
assert len(ONES) == 100


def hindi_number(n):
    """1671 -> सोलह सौ इकहत्तर (years are read in hundreds), 2026 -> दो हज़ार छब्बीस, 24 -> चौबीस."""
    if n < 100:
        return ONES[n]
    if 1100 <= n <= 1999:
        h, r = divmod(n, 100)
        return f"{ONES[h]} सौ" + (f" {ONES[r]}" if r else "")
    if n < 1000:
        h, r = divmod(n, 100)
        return f"{ONES[h]} सौ" + (f" {ONES[r]}" if r else "")
    if n < 100000:
        t, r = divmod(n, 1000)
        return f"{hindi_number(t)} हज़ार" + (f" {hindi_number(r)}" if r else "")
    return str(n)


def speakable(text):
    """What the model reads: numbers as Hindi words, ellipses as pauses, dashes as commas."""
    text = re.sub(r"\d+", lambda m: hindi_number(int(m.group())), text)
    text = re.sub(r"\s*—\s*", ", ", text)
    return re.sub(r"\s+", " ", text.replace("…", "...")).strip()


def style(direction):
    d = direction.lower()
    if any(k in d for k in ("roar", "shout", "battle cry", "full power")):
        return "a loud, commanding and highly expressive voice at a moderately fast pace"
    if any(k in d for k in ("whisper", "hushed", "mysterious")):
        return "a soft, hushed and slow voice, slightly expressive"
    if any(k in d for k in ("sad", "sorrow", "emotional", "weak", "fever", "farewell")):
        return "a sad, slow and gentle voice, expressive"
    if any(k in d for k in ("triumph", "proud", "energetic", "exciting", "goosebumps", "rising")):
        return "a proud and energetic voice, highly expressive at a moderate pace"
    if any(k in d for k in ("tense", "urgent", "ominous", "panic", "fast", "grave")):
        return "a tense, serious voice, expressive at a moderate pace"
    return "a calm, warm and expressive voice at a slow, steady pace"


def description(i, speaker=SPEAKER):
    return (f"{speaker} speaks in a deep, low-pitched male voice. He narrates a legend from Indian history with "
            f"{style(LINES[i][2])}. The recording is very clear audio with no background noise, close up.")


# ---------------------------------------------------------------- model
_M = {}


def model():
    if not _M:
        import torch
        from parler_tts import ParlerTTSForConditionalGeneration
        from transformers import AutoTokenizer
        torch.set_num_threads(max(1, os.cpu_count() or 2))
        t0 = time.time()
        m = ParlerTTSForConditionalGeneration.from_pretrained(MODEL_ID).to("cpu").eval()
        _M.update(torch=torch, model=m, tok=AutoTokenizer.from_pretrained(MODEL_ID),
                  dtok=AutoTokenizer.from_pretrained(m.config.text_encoder._name_or_path), sr=m.config.sampling_rate)
        log(f"Loaded {MODEL_ID} in {time.time() - t0:.0f}s (sample rate {_M['sr']})")
    return _M


def synth(text, desc, seed):
    M = model(); torch = M["torch"]
    torch.manual_seed(seed)
    d = M["dtok"](desc, return_tensors="pt"); p = M["tok"](text, return_tensors="pt")
    with torch.inference_mode():
        g = M["model"].generate(input_ids=d.input_ids, attention_mask=d.attention_mask,
                                prompt_input_ids=p.input_ids, prompt_attention_mask=p.attention_mask)
    a = g.cpu().numpy().squeeze().astype(np.float32)
    raw = subprocess.run(["ffmpeg", "-v", "error", "-f", "f32le", "-ar", str(M["sr"]), "-ac", "1", "-i", "-",
                          "-ar", str(SR), "-f", "s16le", "-"], input=a.tobytes(), capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16)


def line_take(i, speaker=SPEAKER, prefix="p"):
    text, desc = speakable(LINES[i][1]), description(i, speaker)
    h = hashlib.sha1((MODEL_ID + desc + text).encode()).hexdigest()[:12]
    cf = CACHE / f"{prefix}{i:03d}_{h}.flac"
    if cf.exists():
        a = tts.load_flac(cf); ok, why = tts.check_take(a, [i])
        if ok:
            return a, f"cached ({why})"
        cf.unlink()
    for k in range(4):
        t0 = time.time()
        a = synth(text, desc, SEED + 101 * k)
        ok, why = tts.check_take(a, [i])
        if ok:
            tts.save_flac(cf, a)
            return a, f"recorded in {time.time() - t0:.0f}s ({why})"
        log(f"  line {i:2d} take {k + 1} rejected: {why}")
    raise tts.NoTake(f"line {i} kept coming out broken")


def main():
    CACHE.mkdir(exist_ok=True); LDIR.mkdir(parents=True, exist_ok=True)
    log(f"Voice: {MODEL_ID}, speaker {SPEAKER}")
    durs = {}
    for i in range(len(LINES)):
        a, how = line_take(i)
        c = tts.tidy(a); tts.save_wav(LDIR / f"{i:03d}.wav", c); durs[i] = round(len(c) / SR, 3)
        log(f"  line {i:2d}: {durs[i]:5.2f}s  {how}  {LINES[i][1][:40]}")
    (OUT / "durations.json").write_text(json.dumps(durs, indent=1))
    log(f"Voice done: {len(durs)} lines, {sum(durs.values()):.1f}s of speech")
    (OUT / "voice_report.txt").write_text("\n".join(tts.REPORT) + "\n")


def sample():
    """The hook (lines 0-4) in two male voices, as mp3 files to listen to."""
    sd = OUT / "samples"; sd.mkdir(parents=True, exist_ok=True); CACHE.mkdir(exist_ok=True)
    hook = [i for i, l in enumerate(LINES) if l[0] in ("hook_fleet", "hook_bed")]
    files = []
    for sp in ("Rohit", "Aman"):
        parts = []
        for i in hook:
            a, how = line_take(i, sp, prefix=f"s{sp[0]}")
            log(f"  {sp} line {i}: {how}")
            parts += [tts.tidy(a), np.zeros(int(LINES[i][3] * SR), np.int16)]
        wav = sd / f"{sp}.wav"; tts.save_wav(wav, np.concatenate(parts))
        mp3 = sd / f"Voice sample - {sp} (Parler).mp3"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(wav), "-b:a", "128k", str(mp3)], check=True)
        files.append(mp3)
    (OUT / "voice_report.txt").write_text("\n".join(tts.REPORT) + "\n")
    return files


if __name__ == "__main__":
    try:
        if "--sample" in sys.argv:
            fs = sample()
            if os.environ.get("UPLOAD", "0") == "1":
                import build
                for f in fs:
                    build.drive_upload(f, mime="audio/mpeg")
            print("\n".join(str(f) for f in fs))
        else:
            main()
    except (RuntimeError, tts.NoTake) as e:
        (OUT / "voice_report.txt").write_text("\n".join(tts.REPORT) + f"\nFAILED: {e}\n")
        sys.exit(str(e))
