"""Video 05 - Chanakya's vow and the rise of Chandragupta Maurya (c. 321 BCE). Storytelling script (Hindi), under 2 minutes.

The court insult and the vow come from later tradition (Mudrarakshasa, Buddhist and Jain accounts); the script says 'कहते हैं'.
Sources: Britannica (Kautilya; Chandragupta), Wikipedia (Chanakya; Nanda Empire)."""

VOICE = "Charon"
BASE_STYLE = ("You are a deep-voiced Hindi storyteller narrating a gripping true story from Indian history, "
              "like a grandfather telling a legend by firelight. Natural spoken Hindi, unhurried, with feeling.")


LINES = [
 ("hook_court", "भरे दरबार में… एक ब्राह्मण को चोटी पकड़कर बाहर घसीटा गया।", "tense, shocking", 0.3),
 ("hook_court", "उसने अपनी चोटी खोली… और एक कसम खाई।", "hushed, ominous", 0.5),
 ("title", "ये कहानी है चाणक्य की… और उनकी प्रतिज्ञा की।", "warm storyteller voice, intriguing", 0.5),
 ("magadh", "करीब तेईस सौ साल पहले, मगध पर राज करता था घमंडी राजा धनानंद।", "grand, ominous", 0.25),
 ("magadh", "कहते हैं, तक्षशिला के आचार्य चाणक्य उसके दरबार पहुँचे… और राजा ने उनका अपमान कर दिया।", "bitter, tense", 0.45),
 ("vow", "चाणक्य बोले… जब तक नंद वंश का नाश नहीं कर दूँगा, ये चोटी नहीं बाँधूँगा।", "proud, defiant, full power", 0.5),
 ("boy", "फिर एक दिन उन्होंने एक लड़के को देखा… जो दोस्तों के साथ राजा-राजा खेल रहा था।", "warm, storytelling", 0.25),
 ("boy", "खेल में भी वो एक सच्चे राजा की तरह न्याय कर रहा था। उसका नाम था… चंद्रगुप्त।", "warm, intriguing", 0.45),
 ("train", "चाणक्य उसे अपने साथ ले गए… और सालों तक युद्ध और राजनीति सिखाई।", "calm storytelling, steady", 0.25),
 ("train", "धीरे-धीरे सेना बनी… और फिर हमला हुआ मगध पर।", "energetic, rising", 0.45),
 ("fall", "जो काम बड़े-बड़े राजा नहीं कर सके… वो एक गुरु और उसके शिष्य ने कर दिखाया।", "triumphant, proud", 0.25),
 ("fall", "नंद वंश गिर गया… और चंद्रगुप्त बना मगध का सम्राट।", "triumphant", 0.3),
 ("fall", "और उस दिन… चाणक्य ने अपनी चोटी बाँधी।", "proud, slow", 0.5),
 ("legacy", "यहीं से शुरू हुआ मौर्य साम्राज्य… और चाणक्य ने लिखा अर्थशास्त्र, राज चलाने की किताब।", "proud, warm", 0.5),
 ("twist", "और हाँ… चंद्रगुप्त का पोता आगे चलकर बना… सम्राट अशोक।", "a sly reveal, amused", 0.35),
 ("twist", "ऐसी और कहानियों के लिए फ़ॉलो कीजिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_court": 0.1}    # silence before first line of a scene (default 0.15)
SCENE_EXTRA = {"title": 0.6}       # hold after the last line of a scene


def est_duration(text):
    # estimate for previews before real audio exists: ~2.4 Hindi words/s plus ellipsis pauses
    return len(text.split()) / 2.4 + text.count("…") * 0.35 + 0.2


def timeline(durs=None, pause=1.0):
    """durs: {line_index: seconds} from real audio; falls back to estimates.
    Returns scenes [(scene, duration, cues[(start,end,text)])], and voice placements [(line_index, abs_start)]."""
    scenes, place = [], []
    order = []
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


# One Gemini request per group (only used when the Gemini voice is chosen)
GROUPS = [['hook_court', 'title'], ['magadh', 'vow'], ['boy', 'train'], ['fall', 'legacy'], ['twist']]
GROUP_MOOD = ['shocking, tense cold open, then warm intrigue', 'grand, bitter, then defiant', 'warm, then rising energy', 'triumphant and proud', 'sly reveal, then warm']
TITLE = 'Chanakya - The Vow'
FILE_NAME = '05 - Chanakya - Pratigya.mp4'
