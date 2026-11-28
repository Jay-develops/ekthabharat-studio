"""Quick visual check of a video without any voice: stills from every line (estimated timing) -> one contact sheet.
VIDEO env picks the folder. Writes history/review/<VIDEO>/preview.jpg (and thumb.jpg when the scenes have S.thumb)."""
import os, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import story, render  # noqa: E402
from PIL import Image  # noqa: E402

scenes, _ = story.timeline(None, 1.0)
spec = []
for i, (sid, d, cues) in enumerate(scenes):
    spec.append((i, min(1.2, d / 2)))
    for a, b, _t in cues:
        spec.append((i, round(a + 0.6 * (b - a), 2)))
shots = render.stills(scenes, spec, "pv")
wide = getattr(story, "WIDE", False)
tw, th = (384, 216) if wide else (216, 384)
cols = 5 if wide else 8
rows = (len(shots) + cols - 1) // cols
sheet = Image.new("RGB", (cols * tw, rows * th))
for k, sp in enumerate(shots):
    sheet.paste(Image.open(sp).resize((tw, th)), ((k % cols) * tw, (k // cols) * th))
rv = HERE / "review" / story.VIDEO; rv.mkdir(parents=True, exist_ok=True)
sheet.save(rv / "preview.jpg", quality=80)
print(f"preview: {len(shots)} stills, {sum(d for _, d, _ in scenes):.0f}s estimated")
if "thumb" in (story.SCENES_JS.read_text(encoding="utf-8")):
    th_ = render.stills([("thumb", 5.0, [])], [(0, 2.0)], "thumb")[0]
    Image.open(th_).resize((1280, 720)).save(rv / "thumb.jpg", quality=92)
