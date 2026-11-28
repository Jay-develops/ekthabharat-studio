"""Render scenes of engine.html with headless Chrome -> one mp4 per scene (all same encoder settings)."""
import base64, json, os, subprocess, sys, time
from multiprocessing import Process
from pathlib import Path

FPS = 30
HERE = Path(__file__).resolve().parent
OUT = HERE / "out"
CHROME = os.environ.get("CHROME", "/usr/bin/google-chrome")


# long documentaries (story.WIDE = True): the same library on a 16:9 canvas, plus history/wide.js
WIDE_SWAPS = [
    ('<canvas id="c" width="1080" height="1920"></canvas>', '<canvas id="c" width="1920" height="1080"></canvas>'),
    ('const W = 1080, H = 1920;', 'const W = 1920, H = 1080;'),
    ('function bg(pal, flick = 0, cx = 540, cy = 800) {', 'function bg(pal, flick = 0, cx = 960, cy = 420) {'),
    ('ctx.createRadialGradient(540, 860, 500, 540, 860, 1250)', 'ctx.createRadialGradient(960, 480, 520, 960, 480, 1250)'),
    ('ctx.createLinearGradient(0, 1230, 0, 1920)', 'ctx.createLinearGradient(0, 860, 0, 1080)'),
    ('ctx.fillRect(0, 1230, W, 690)', 'ctx.fillRect(0, 860, W, 220)'),
    ('ctx.translate(540, 760); ctx.scale(z, z); ctx.translate(-540, -760);', 'ctx.translate(960, 520); ctx.scale(z, z); ctx.translate(-960, -520);'),
    ('textBlock(txt, 540, 1420, 60, { alpha: al, maxW: 930 })', 'textBlock(txt, 960, 990, 46, { alpha: al, maxW: 1560 })'),
    ('const lines = wrap(text, 820);', 'const lines = wrap(text, 1500);'),
    ("textBlock(text, 540, y, size, { font: SERIF, color: GOLD, maxW: 820", "textBlock(text, 960, y, size, { font: SERIF, color: GOLD, maxW: 1500"),
]


def widen(lib):
    for a, b in WIDE_SWAPS:
        if a not in lib:
            sys.exit(f"wide mode: lib.html no longer contains {a!r}")
        lib = lib.replace(a, b)
    return lib


def compose():
    """The page for this video: the shared library (lib.html) with the video's own scenes put in."""
    import story
    OUT.mkdir(exist_ok=True)
    page = OUT / "engine.html"
    lib = (HERE / "lib.html").read_text(encoding="utf-8")
    js = story.SCENES_JS.read_text(encoding="utf-8")
    if js.startswith("// @common2"):  # videos 07+: common.js plus the v2 toolkit (camera, effects, props)
        js = "\n".join((HERE / f).read_text(encoding="utf-8") for f in ("common.js", "common2.js") + (("wide.js",) if getattr(story, "WIDE", False) else ())) + "\n" + js
    elif js.startswith("// @common"):   # newer videos share helpers in history/common.js
        js = (HERE / "common.js").read_text(encoding="utf-8") + "\n" + js
    if getattr(story, "WIDE", False):
        lib = widen(lib)
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
