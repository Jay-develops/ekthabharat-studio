"""Render scenes of engine.html with headless Chrome -> one mp4 per scene (all same encoder settings)."""
import base64, json, os, subprocess, sys, time
from multiprocessing import Process
from pathlib import Path

FPS = 30
HERE = Path(__file__).resolve().parent
OUT = HERE / "out"
CHROME = os.environ.get("CHROME", "/usr/bin/google-chrome")


def compose():
    """The page for this video: the shared library (lib.html) with the video's own scenes put in."""
    import story
    OUT.mkdir(exist_ok=True)
    page = OUT / "engine.html"
    lib = (HERE / "lib.html").read_text(encoding="utf-8")
    js = story.SCENES_JS.read_text(encoding="utf-8")
    if js.startswith("// @common2"):  # videos 07+: common.js plus the v2 toolkit (camera, effects, props)
        js = "\n".join((HERE / f).read_text(encoding="utf-8") for f in ("common.js", "common2.js")) + "\n" + js
    elif js.startswith("// @common"):   # newer videos share helpers in history/common.js
        js = (HERE / "common.js").read_text(encoding="utf-8") + "\n" + js
    page.write_text(lib.replace("/*SCENES*/", js), encoding="utf-8")
    return page


def _page(p):
    b = p.chromium.launch(executable_path=CHROME, args=["--disable-gpu-vsync", "--no-sandbox"])
    pg = b.new_page(viewport={"width": 1080, "height": 1920})
    pg.goto(compose().as_uri())
    pg.wait_for_function("window.ready === true")
    pg.evaluate('Promise.all([document.fonts.load("700 60px FreeSans"), document.fonts.load("700 60px FreeSerif")])')
    return b, pg


def _set(pg, sc):
    sid, d, cues = sc
    pg.evaluate(f"setScene({json.dumps(sid)}, {d}, {json.dumps(cues, ensure_ascii=False)})")


def _worker(scenes, idxs, log_path):
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p, open(log_path, "a") as lg:
        b, pg = _page(p)
        for i in idxs:
            sid, d, _ = scenes[i]
            _set(pg, scenes[i])
            n = int(round(d * FPS)); fin = OUT / f"{i:02d}_{sid}.mp4"; tmp = OUT / f"{i:02d}_{sid}.tmp.mp4"
            ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
                                   "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", "-r", str(FPS), str(tmp)], stdin=subprocess.PIPE)
            t0 = time.time()
            for f in range(n):
                data = pg.evaluate(f"renderFrame({f / FPS}, {str(i > 0).lower()}, {str(i < len(scenes) - 1).lower()}), grab(0.92)")
                ff.stdin.write(base64.b64decode(data))
            ff.stdin.close()
            if ff.wait() == 0:
                os.replace(tmp, fin)
            print(f"  scene {i:02d} {sid}: {n} frames in {time.time() - t0:.0f}s", file=lg, flush=True)
        b.close()


def render_all(scenes, workers=2):
    OUT.mkdir(exist_ok=True)
    order = sorted(range(len(scenes)), key=lambda i: -scenes[i][1])      # longest first, balanced
    parts = [order[k::workers] for k in range(workers)]
    log = OUT / "render.log"; log.write_text("")
    ps = [Process(target=_worker, args=(scenes, part, log)) for part in parts]
    [p.start() for p in ps]; [p.join() for p in ps]
    print(log.read_text(), end="")
    missing = [i for i, s in enumerate(scenes) if not (OUT / f"{i:02d}_{s[0]}.mp4").exists()]
    if missing:
        sys.exit(f"scenes failed to render: {missing}")
    return [OUT / f"{i:02d}_{s[0]}.mp4" for i, s in enumerate(scenes)]


def stills(scenes, spec, prefix="still"):
    """spec: [(scene index, t)] -> jpg paths"""
    from playwright.sync_api import sync_playwright
    out = []
    with sync_playwright() as p:
        b, pg = _page(p)
        for i, t in spec:
            _set(pg, scenes[i])
            data = pg.evaluate(f"renderFrame({t}, true, true), grab(0.9)")
            fn = OUT / f"{prefix}_{i:02d}_{t:05.2f}.jpg"; fn.write_bytes(base64.b64decode(data)); out.append(fn)
        b.close()
    return out
