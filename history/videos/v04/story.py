"""Video 04 - Emperor Ashoka after the Kalinga war (c. 261 BCE). Storytelling script (Hindi), under 2 minutes.

Sources: Britannica (Ashoka; Kalinga), Major Rock Edicts XIII and II, Government of India (State Emblem)."""

VOICE = "Charon"
BASE_STYLE = ("You are a deep-voiced Hindi storyteller narrating a gripping true story from Indian history, "
              "like a grandfather telling a legend by firelight. Natural spoken Hindi, unhurried, with feeling.")


LINES = [
 ("hook_field", "युद्ध जीता जा चुका था… पर विजेता सम्राट मैदान में खड़ा होकर रो रहा था।", "hushed, sad", 0.3),
 ("hook_field", "चारों ओर सन्नाटा… और लाखों उजड़ी ज़िंदगियाँ।", "grave, slow", 0.5),
 ("title", "ये कहानी है सम्राट अशोक की… और कलिंग के युद्ध की।", "warm storyteller voice, intriguing", 0.5),
 ("rise", "मौर्य साम्राज्य का तीसरा सम्राट… चंद्रगुप्त मौर्य का पोता।", "grand, setting the scene", 0.25),
 ("rise", "कहते हैं, गद्दी के लिए उसने अपने ही भाइयों से लड़ाई की… लोग उसे चंडाशोक कहते थे, क्रूर अशोक।", "ominous, dark", 0.45),
 ("war", "करीब 261 ईसा पूर्व, उसने हमला किया कलिंग पर… आज का ओडिशा।", "tense, building", 0.25),
 ("war", "कलिंग के लोग जी-जान से लड़े… पर मौर्य सेना बहुत बड़ी थी।", "tense, urgent", 0.45),
 ("cost", "अशोक ने ख़ुद पत्थर पर लिखवाया… एक लाख लोग मारे गए, डेढ़ लाख बंदी बनाए गए।", "grave, slow", 0.3),
 ("cost", "और ये जीत… उसे अंदर से तोड़ गई।", "sad, emotional", 0.5),
 ("change", "उसने कसम खाई… अब तलवार नहीं, धम्म।", "proud, warm", 0.3),
 ("change", "उसने बौद्ध धर्म अपनाया… और पूरे साम्राज्य में पत्थरों पर अपने संदेश खुदवाए।", "calm storytelling", 0.25),
 ("change", "इंसानों और जानवरों के लिए इलाज, रास्तों पर पेड़ और कुएँ… और सबके लिए दया।", "warm, gentle", 0.45),
 ("mission", "उसने अपने बेटे महेंद्र और बेटी संघमित्रा को श्रीलंका भेजा… शांति का संदेश लेकर।", "warm, proud", 0.3),
 ("mission", "चंडाशोक… अब बन चुका था धम्माशोक।", "proud, slow", 0.5),
 ("twist", "और आज भी… हर भारतीय अशोक की निशानी अपनी जेब में रखता है।", "a sly reveal, intriguing", 0.3),
 ("twist", "सारनाथ का सिंह-स्तंभ ही भारत का राष्ट्रीय चिह्न है… हर नोट पर छपा हुआ।", "proud", 0.25),
 ("twist", "और तिरंगे के बीच का चक्र… वो भी अशोक चक्र है।", "proud, goosebumps", 0.35),
 ("twist", "ऐसी और कहानियों के लिए फ़ॉलो कीजिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_field": 0.1}    # silence before first line of a scene (default 0.15)
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
GROUPS = [['hook_field', 'title'], ['rise', 'war'], ['cost', 'change'], ['mission'], ['twist']]
GROUP_MOOD = ['hushed and sad cold open, then warm intrigue', 'grand, then dark, then tense', 'grave and sad, then warm', 'warm and proud', 'sly reveal, then proud, then warm']
TITLE = 'Ashoka - After Kalinga'
FILE_NAME = '04 - Samrat Ashoka - Kalinga.mp4'
