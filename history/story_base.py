"""Shared helpers for the story.py of videos 07+ (those files only hold the script and its settings).
history/story.py runs this after the video's own story.py, in the same namespace."""

VOICE = globals().get("VOICE", "Charon")
BASE_STYLE = globals().get("BASE_STYLE", (
    "You are a deep-voiced Hindi storyteller narrating a gripping true story from Indian history, "
    "like a grandfather telling a legend by firelight. Natural spoken Hindi, with feeling."))
SCENE_LEAD = globals().get("SCENE_LEAD", {})
SCENE_EXTRA = globals().get("SCENE_EXTRA", {"title": 0.5})


def est_duration(text):
    # estimate for previews before real audio exists: ~2.4 Hindi words/s plus ellipsis pauses
    return len(text.split()) / 2.4 + text.count("…") * 0.35 + 0.2


def timeline(durs=None, pause=1.0):
    """durs: {line_index: seconds} from real audio; falls back to estimates.
    Returns scenes [(scene, duration, cues[(start,end,text)])], and voice placements [(line_index, abs_start)]."""
    scenes, place, order = [], [], []
    for i, (sc, *_rest) in enumerate(LINES):
        if not order or order[-1][0] != sc:
            order.append([sc, []])
        order[-1][1].append(i)
    T = 0.0
    for sc, idx in order:
        t = SCENE_LEAD.get(sc, 0.15)
        cues = []
        for i in idx:
            d = (durs or {}).get(i) or est_duration(LINES[i][1])
            cues.append((round(t, 3), round(t + d, 3), LINES[i][1]))
            place.append((i, round(T + t, 3)))
            t += d + LINES[i][3] * pause
        D = round(t + SCENE_EXTRA.get(sc, 0.0), 3)
        scenes.append((sc, D, cues))
        T += D
    return scenes, place


if "GROUPS" not in globals():   # one Gemini request per two scenes (only used with the Gemini voice)
    _ids = []
    for _l in LINES:
        if not _ids or _ids[-1] != _l[0]:
            _ids.append(_l[0])
    GROUPS = [_ids[k:k + 2] for k in range(0, len(_ids), 2)]
    GROUP_MOOD = ["gripping storytelling, follow each line's direction"] * len(GROUPS)
