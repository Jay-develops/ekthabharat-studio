"""Picks the script of the video being made: history/videos/<VIDEO>/story.py
(VIDEO env var, e.g. v02; default = the newest video folder). Everything in that file is available here,
plus SCENES_JS: the path of the video's own scenes (drawn by lib.html)."""
import os
from pathlib import Path

_DIR = Path(__file__).resolve().parent / "videos"
VIDEO = os.environ.get("VIDEO") or sorted(p.name for p in _DIR.iterdir() if (p / "story.py").exists())[-1]
_PATH = _DIR / VIDEO / "story.py"
exec(compile(_PATH.read_text(encoding="utf-8"), str(_PATH), "exec"))
SCENES_JS = _DIR / VIDEO / "scenes.js"
if "timeline" not in globals():   # videos 07+: their story.py only holds the script; shared helpers live in story_base.py
    _B = Path(__file__).resolve().parent / "story_base.py"
    exec(compile(_B.read_text(encoding="utf-8"), str(_B), "exec"))
