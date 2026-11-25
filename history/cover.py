"""Covers for Ek Tha Bharat: the Instagram Reel cover and the YouTube Short thumbnail of every video.

Each cover is a new picture, not a frame of the video: the art of one scene drawn with none of its text and
pushed in a little, then a big Hindi hook, the hero's name and the channel badge on top. Everything that
matters sits inside the middle 1080x1440 (y 240-1680), the part Instagram shows on the profile grid.
The scene, moment and words for each video come from history/covers.json.

Usage: python history/cover.py all          (every video that has an entry in covers.json)
       python history/cover.py v07 v08 ...
Env:   UPLOAD=1 also saves each cover in the Drive folder next to its video: same name, .jpg
       (publish.py finds it there by name). Needs YT_CLIENT_ID, YT_CLIENT_SECRET, WS_DRIVE_REFRESH_TOKEN.
Writes history/out/covers/<video>.jpg and a contact sheet history/review/covers.jpg.
"""
import base64, json, os, re, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
VIDEOS = HERE / "videos"
OUT = HERE / "out" / "covers"
REVIEW = HERE / "review"
CHROME = os.environ.get("CHROME", "/usr/bin/google-chrome")
SPEC = {k: v for k, v in json.loads((HERE / "covers.json").read_text(encoding="utf-8")).items() if not k.startswith("_")}
MUTE = ["slam", "stamp", "chip", "quoteCard", "title2", "legendTag", "textBlock", "scroll", "overlay", "captions"]

# Runs inside the page, next to the video's own scenes.
COVER_JS = r"""
// ---------------- cover (history/cover.py) ----------------
window.renderCover = (t, o) => {
  const MUTE = __MUTE__;
  const saved = {};
  for (const n of MUTE) if (typeof window[n] === 'function') { saved[n] = window[n]; window[n] = () => {}; }
  try {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    const z = o.z || 1.32, fy = o.fy || 930, fx = o.fx || 540;
    ctx.save(); ctx.translate(540, 820); ctx.scale(z, z); ctx.translate(-fx, -fy);
    DEFER = true; OV = [];
    S[SCN](t);
    DEFER = false;
    ctx.restore();
    finish();
    OV = [];
  } finally {
    for (const n in saved) window[n] = saved[n];
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';

  // light falls on the hero, shadow at the top and a deep band at the bottom for the words
  let g = ctx.createLinearGradient(0, 0, 0, 640);
  g.addColorStop(0, 'rgba(8,3,1,0.85)'); g.addColorStop(1, 'rgba(8,3,1,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, 640);
  g = ctx.createLinearGradient(0, 1120, 0, H);
  g.addColorStop(0, 'rgba(8,3,1,0)'); g.addColorStop(0.28, 'rgba(8,3,1,0.88)'); g.addColorStop(1, 'rgba(8,3,1,0.98)');
  ctx.fillStyle = g; ctx.fillRect(0, 1120, W, H - 1120);

  const fit = (text, size, maxW, font) => {
    let s = size;
    for (; s > 30; s -= 2) { ctx.font = `700 ${s}px ${font}`; if (ctx.measureText(text).width <= maxW) break; }
    return s;
  };
  const say = (text, x, y, size, color, opt = {}) => {
    const font = opt.font || SERIF;
    const s = fit(text, size, opt.maxW || 980, font);
    ctx.save(); ctx.font = `700 ${s}px ${font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round'; ctx.miterLimit = 2;
    if (opt.glow) { ctx.shadowColor = opt.glow; ctx.shadowBlur = s * 0.45; }
    ctx.strokeStyle = 'rgba(14,5,2,0.96)'; ctx.lineWidth = s * (opt.sw || 0.2); ctx.strokeText(text, x, y);
    ctx.shadowBlur = 0; ctx.fillStyle = color; ctx.fillText(text, x, y);
    ctx.restore();
    return s;
  };

  // channel badge between two gold rules
  ctx.save(); ctx.font = `700 54px ${SERIF}`; const bw = ctx.measureText('एक था भारत').width; ctx.restore();
  ctx.save(); ctx.strokeStyle = 'rgba(255,199,107,0.85)'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(540 - bw / 2 - 150, 296); ctx.lineTo(540 - bw / 2 - 30, 296);
  ctx.moveTo(540 + bw / 2 + 30, 296); ctx.lineTo(540 + bw / 2 + 150, 296); ctx.stroke(); ctx.restore();
  say('एक था भारत', 540, 296, 54, GOLD, { sw: 0.16 });

  // hero's name on a saffron ribbon
  if (o.name) {
    ctx.save(); ctx.font = `700 74px ${SERIF}`;
    const s = fit(o.name, 74, 900, SERIF); ctx.font = `700 ${s}px ${SERIF}`;
    const w = ctx.measureText(o.name).width + 110, h = s * 1.7, y = 430;
    ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 8;
    const rg = ctx.createLinearGradient(0, y - h / 2, 0, y + h / 2); rg.addColorStop(0, '#f39a3c'); rg.addColorStop(1, '#c4571a');
    ctx.fillStyle = rg; ctx.beginPath(); ctx.roundRect(540 - w / 2, y - h / 2, w, h, 16); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.strokeStyle = 'rgba(255,236,200,0.95)'; ctx.lineWidth = 4; ctx.stroke();
    ctx.fillStyle = '#2a0d03'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.name, 540, y + 3);
    ctx.restore();
  }

  // the hook: one quieter line, then the big one
  if (o.l1) say(o.l1, 540, 1372, 84, '#fff3d6', { sw: 0.18 });
  if (o.l2) {
    const s = say(o.l2, 540, 1522, 128, GOLD, { glow: 'rgba(255,120,30,0.9)', sw: 0.2 });
    ctx.save(); ctx.font = `700 ${s}px ${SERIF}`; const w = Math.min(ctx.measureText(o.l2).width, 980);
    ctx.fillStyle = '#d2421c'; ctx.fillRect(540 - w * 0.32, 1522 + s * 0.62, w * 0.64, 9); ctx.restore();
  }

  // thin gold frame
  ctx.save(); ctx.strokeStyle = 'rgba(255,199,107,0.55)'; ctx.lineWidth = 4; ctx.strokeRect(26, 26, W - 52, H - 52);
  ctx.strokeStyle = 'rgba(255,199,107,0.25)'; ctx.lineWidth = 2; ctx.strokeRect(40, 40, W - 80, H - 80); ctx.restore();
  return cv.toDataURL('image/jpeg', 0.9).split(',')[1];
};
"""


def load_story(v):
    """Same as history/story.py does for VIDEO=v: the video's story.py, then story_base.py for videos 07+."""
    ns = {"__file__": str(VIDEOS / v / "story.py"), "__name__": f"story_{v}"}
    p = VIDEOS / v / "story.py"
    exec(compile(p.read_text(encoding="utf-8"), str(p), "exec"), ns)
    if "timeline" not in ns:
        b = HERE / "story_base.py"
        exec(compile(b.read_text(encoding="utf-8"), str(b), "exec"), ns)
    return ns


def page_for(v):
    lib = (HERE / "lib.html").read_text(encoding="utf-8")
    js = (VIDEOS / v / "scenes.js").read_text(encoding="utf-8")
    if js.startswith("// @common2"):
        js = "\n".join((HERE / f).read_text(encoding="utf-8") for f in ("common.js", "common2.js")) + "\n" + js
    elif js.startswith("// @common"):
        js = (HERE / "common.js").read_text(encoding="utf-8") + "\n" + js
    js += "\n" + COVER_JS.replace("__MUTE__", json.dumps(MUTE))
    OUT.mkdir(parents=True, exist_ok=True)
    page = OUT / f"_{v}.html"
    page.write_text(lib.replace("/*SCENES*/", js), encoding="utf-8")
    return page


def make(pg, v):
    o = SPEC[v]
    ns = load_story(v)
    scenes = ns["timeline"]()[0]
    sc = next((s for s in scenes if s[0] == o.get("scene", "title")), scenes[1] if len(scenes) > 1 else scenes[0])
    sid, d, cues = sc
    t = round(d * float(o.get("at", 0.85)), 3)
    pg.goto(page_for(v).as_uri())
    pg.wait_for_function("window.ready === true")
    pg.evaluate('Promise.all([document.fonts.load("700 60px FreeSans"), document.fonts.load("700 60px FreeSerif")])')
    pg.evaluate(f"setScene({json.dumps(sid)}, {d}, {json.dumps([list(c) for c in cues], ensure_ascii=False)})")
    data = pg.evaluate(f"renderCover({t}, {json.dumps(o, ensure_ascii=False)})")
    path = OUT / f"{v}.jpg"
    path.write_bytes(base64.b64decode(data))
    print(f"{v}: {sid} @ {t:.2f}s of {d:.2f}s -> {path.name} ({path.stat().st_size // 1024} KB)", flush=True)
    return path, ns.get("FILE_NAME")


def drive():
    import requests
    r = requests.post("https://oauth2.googleapis.com/token", timeout=30, data={
        "client_id": os.environ["YT_CLIENT_ID"], "client_secret": os.environ["YT_CLIENT_SECRET"],
        "refresh_token": os.environ["WS_DRIVE_REFRESH_TOKEN"], "grant_type": "refresh_token"})
    r.raise_for_status()
    H = {"Authorization": f"Bearer {r.json()['access_token']}"}
    fid = json.loads((HERE / "drive.json").read_text())["folder_id"]
    files = requests.get("https://www.googleapis.com/drive/v3/files", headers=H, timeout=60, params={
        "q": f"'{fid}' in parents and trashed = false", "fields": "files(id,name)", "pageSize": 1000}).json().get("files", [])
    return requests, H, fid, files


def upload(conn, v, path, file_name):
    """Save next to the video: '<video name>.jpg'. The video is found by its number (07 - ...)."""
    requests, H, fid, files = conn
    num = re.sub(r"\D", "", v).zfill(2)
    vids = [f["name"] for f in files if f["name"].lower().endswith(".mp4") and f["name"].startswith(f"{num} ")]
    stem = Path(vids[0]).stem if vids else (Path(file_name).stem if file_name else None)
    if not stem:
        print(f"  {v}: no video in Drive and no FILE_NAME, cover not uploaded", flush=True)
        return
    name = stem + ".jpg"
    data = path.read_bytes()
    UP = "https://www.googleapis.com/upload/drive/v3/files"
    ex = [f for f in files if f["name"] == name]
    if ex:
        requests.patch(f"{UP}/{ex[0]['id']}", headers={**H, "Content-Type": "image/jpeg"}, params={"uploadType": "media"},
                       data=data, timeout=300).raise_for_status()
        cid = ex[0]["id"]
    else:
        b = "etb-cover-5c1"; meta = json.dumps({"name": name, "parents": [fid]}, ensure_ascii=False)
        body = (f"--{b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n{meta}\r\n--{b}\r\nContent-Type: image/jpeg\r\n\r\n").encode() \
            + data + f"\r\n--{b}--".encode()
        r = requests.post(UP, headers={**H, "Content-Type": f"multipart/related; boundary={b}"},
                          params={"uploadType": "multipart", "fields": "id"}, data=body, timeout=300)
        r.raise_for_status(); cid = r.json()["id"]
    # Instagram fetches the cover by link, so it must be viewable by anyone with the link
    requests.post(f"https://www.googleapis.com/drive/v3/files/{cid}/permissions", headers=H, timeout=30,
                  json={"type": "anyone", "role": "reader"})
    print(f"  saved to Drive: {name}", flush=True)


def sheet(paths):
    from PIL import Image
    if not paths:
        return
    cols = 6; rows = (len(paths) + cols - 1) // cols
    im = Image.new("RGB", (cols * 270, rows * 480), (20, 8, 3))
    for k, p in enumerate(paths):
        im.paste(Image.open(p).resize((270, 480)), ((k % cols) * 270, (k // cols) * 480))
    REVIEW.mkdir(exist_ok=True)
    im.save(REVIEW / "covers.jpg", quality=85)
    print(f"Contact sheet: history/review/covers.jpg ({len(paths)} covers)", flush=True)


def main(args):
    want = sorted(SPEC) if not args or args == ["all"] else [a if a.startswith("v") else f"v{int(a):02d}" for a in args]
    want = [v for v in want if v in SPEC and (VIDEOS / v / "scenes.js").exists()]
    if not want:
        sys.exit("No videos to make covers for (check covers.json and the video folders).")
    conn = drive() if os.environ.get("UPLOAD", "0") == "1" else None
    from playwright.sync_api import sync_playwright
    done, failed = [], []
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME, args=["--no-sandbox"])
        pg = b.new_page(viewport={"width": 1080, "height": 1920})
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        for v in want:
            try:
                path, file_name = make(pg, v)
                done.append(path)
                if conn:
                    upload(conn, v, path, file_name)
            except Exception as e:
                failed.append(v)
                print(f"{v}: FAILED {e}", flush=True)
            if errs:
                print(f"  page errors in {v}: {errs[:2]}", flush=True); errs.clear()
        b.close()
    sheet(done)
    if failed:
        sys.exit(f"Covers failed for: {' '.join(failed)}")


if __name__ == "__main__":
    main(sys.argv[1:])
