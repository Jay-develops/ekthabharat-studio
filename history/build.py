"""Build a history video: timeline from the real voice lengths -> render -> music under the voice -> mux -> Drive.

Run tts.py first (writes out/lines/*.wav and out/durations.json). Every caption and timed animation comes from
those measured line lengths, so picture and voice stay in sync.
Env: UPLOAD=1 to save into Drive (needs YT_CLIENT_ID, YT_CLIENT_SECRET, WS_DRIVE_REFRESH_TOKEN).
"""
import json, os, subprocess, sys, time
from pathlib import Path
import numpy as np

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import story, render, music  # noqa: E402

OUT = HERE / "out"; REVIEW = HERE / "review"; SR = 44100
LIMIT = float(os.environ.get("MAX_SECONDS", "178"))      # Shorts/Reels cap is 3:00
LOG = []


def log(m):
    print(m, flush=True); LOG.append(m)


def read_line(i, tempo=1.0):
    af = ["-af", f"atempo={tempo:.4f}"] if abs(tempo - 1) > 1e-3 else []
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(OUT / "lines" / f"{i:03d}.wav"), *af, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32)


def fit():
    durs = {int(k): v for k, v in json.loads((OUT / "durations.json").read_text()).items()}
    pause, tempo = 1.0, 1.0
    total = lambda: sum(d for _, d, _ in story.timeline({k: v / tempo for k, v in durs.items()}, pause)[0])
    while total() > LIMIT and pause > 0.5:
        pause = round(pause - 0.05, 2)
    if total() > LIMIT:
        tempo = min(1.12, 1 + (total() - LIMIT) / LIMIT + 0.003)
    log(f"Length {total():.1f}s (pauses x{pause}, voice speed x{tempo:.3f})")
    if total() > LIMIT + 7:                                   # never publish an overlong video
        sys.exit(f"Video would be {total():.0f}s - too long for Shorts/Reels; see history/review/report.txt")
    clips = {i: read_line(i, tempo) for i in durs}
    real = {i: len(c) / SR for i, c in clips.items()}           # exact lengths after any speed change
    scenes, place = story.timeline(real, pause)
    return scenes, place, clips


def mix(scenes, place, clips):
    T = sum(d for _, d, _ in scenes); N = int(T * SR)
    voice = np.zeros(N, np.float32)
    for i, at in place:
        c = clips[i]; s = int(at * SR); voice[s:s + len(c)] += c[: max(0, N - s)]
    voice *= 0.9 / (np.abs(voice).max() + 1e-9)
    m = music.music(scenes)[:N]
    if len(m) < N: m = np.pad(m, ((0, N - len(m)), (0, 0)))
    win = int(0.25 * SR)
    a = np.abs(voice); k = np.ones(win) / win
    env = np.convolve(a, k, "same"); env = np.convolve(env, np.ones(int(0.4 * SR)) / int(0.4 * SR), "same")
    gain = 0.55 - 0.38 * np.clip(env / (env.max() * 0.25 + 1e-9), 0, 1)
    st = np.stack([voice, voice], 1) + m * gain[:, None]
    st *= 0.95 / (np.abs(st).max() + 1e-9)
    wav = OUT / "mix.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "pcm_s16le", str(wav)],
                   input=st.astype(np.float32).tobytes(), check=True)
    return wav, T


def drive_upload(path):
    import requests
    TOKEN_URL = "https://oauth2.googleapis.com/token"; FILES = "https://www.googleapis.com/drive/v3/files"
    UPLOAD = "https://www.googleapis.com/upload/drive/v3/files"; FOLDER = "Indian History - videos"
    r = requests.post(TOKEN_URL, data={"client_id": os.environ["YT_CLIENT_ID"], "client_secret": os.environ["YT_CLIENT_SECRET"],
                                       "refresh_token": os.environ["WS_DRIVE_REFRESH_TOKEN"], "grant_type": "refresh_token"}, timeout=30)
    r.raise_for_status(); H = {"Authorization": f"Bearer {r.json()['access_token']}"}
    state = HERE / "drive.json"; fid = json.loads(state.read_text()).get("folder_id") if state.exists() else None
    if fid:
        q = requests.get(f"{FILES}/{fid}", params={"fields": "id,trashed"}, headers=H, timeout=60)
        if q.status_code != 200 or q.json().get("trashed"): fid = None
    if not fid:
        fid = requests.post(FILES, headers=H, params={"fields": "id"}, json={"name": FOLDER, "mimeType": "application/vnd.google-apps.folder"}, timeout=60).json()["id"]
        state.write_text(json.dumps({"folder_id": fid, "folder_name": FOLDER}, indent=2) + "\n")
    ex = requests.get(FILES, headers=H, timeout=60, params={"q": f"'{fid}' in parents and name = '{path.name}' and trashed = false", "fields": "files(id)"}).json().get("files", [])
    data = path.read_bytes()
    if ex:
        requests.patch(f"{UPLOAD}/{ex[0]['id']}", headers={**H, "Content-Type": "video/mp4"}, params={"uploadType": "media"}, data=data, timeout=900).raise_for_status()
        vid = ex[0]["id"]
    else:
        b = "hist-9d2e"; meta = json.dumps({"name": path.name, "parents": [fid]})
        body = (f"--{b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n{meta}\r\n--{b}\r\nContent-Type: video/mp4\r\n\r\n").encode() + data + f"\r\n--{b}--".encode()
        rr = requests.post(UPLOAD, headers={**H, "Content-Type": f"multipart/related; boundary={b}"}, params={"uploadType": "multipart", "fields": "id"}, data=body, timeout=900)
        rr.raise_for_status(); vid = rr.json()["id"]
    log(f"Saved to Drive folder '{FOLDER}': https://drive.google.com/file/d/{vid}/view")


def main():
    OUT.mkdir(exist_ok=True); REVIEW.mkdir(exist_ok=True)
    scenes, place, clips = fit()
    (OUT / "timeline.json").write_text(json.dumps(scenes, ensure_ascii=False, indent=1))
    for sid, d, cues in scenes:
        log(f"  {sid:11s} {d:6.2f}s  " + "  ".join(f"{c[0]:.2f}-{c[1]:.2f}" for c in cues))
    wav, T = mix(scenes, place, clips)
    t0 = time.time()
    files = render.render_all(scenes, workers=int(os.environ.get("WORKERS", "2")))
    log(f"Rendered {len(files)} scenes in {time.time() - t0:.0f}s")
    (OUT / "list.txt").write_text("".join(f"file '{f.name}'\n" for f in files))
    video = OUT / "video.mp4"; (OUT / "final").mkdir(exist_ok=True); final = OUT / "final" / story.FILE_NAME
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(OUT / "list.txt"), "-c", "copy", str(video)], check=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(video), "-i", str(wav), "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                    "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-shortest", str(final)], check=True)
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(final)], capture_output=True, text=True).stdout)
    log(f"Final: {final.name} {dur:.1f}s (timeline {T:.1f}s) {final.stat().st_size / 1e6:.1f} MB")
    # review sheet: one frame from the middle of every line, so captions can be checked against the voice
    spec = []
    for si, (sid, d, cues) in enumerate(scenes):
        spec += [(si, (c[0] + c[1]) / 2) for c in cues] or [(si, d / 2)]
    shots = render.stills(scenes, spec[::2] if len(spec) > 24 else spec, "rv")
    from PIL import Image
    cols = 6; rows = (len(shots) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * 240, rows * 427))
    for k, sp in enumerate(shots):
        sheet.paste(Image.open(sp).resize((240, 427)), ((k % cols) * 240, (k // cols) * 427))
    sheet.save(REVIEW / "sheet.jpg", quality=85)
    if os.environ.get("UPLOAD", "0") == "1":
        drive_upload(final)
    vr = (OUT / "voice_report.txt").read_text() if (OUT / "voice_report.txt").exists() else ""
    (REVIEW / "report.txt").write_text(vr + "\n" + "\n".join(LOG) + "\n")


if __name__ == "__main__":
    main()
