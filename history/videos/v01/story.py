"""Video 01 - Lachit Borphukan & the Battle of Saraighat (1671). Storytelling script (Hindi).

Every line is voiced separately (exact caption + animation sync), then joined with the pause given.
LINES: (scene, text, direction for the narrator, pause after in seconds)
Legend items (uncle, battle cry) are framed with "कहते हैं".
Sources: indianculture.gov.in, nvli.in, PIB (Dec 2022), Wikipedia (Battle of Saraighat / Lachit Borphukan / Mir Jumla).
"""

VOICE = "Charon"   # deep, steady male narrator
BASE_STYLE = ("You are a deep-voiced Hindi storyteller narrating a gripping true story from Indian history, "
              "like a grandfather telling a legend by firelight. Natural spoken Hindi, unhurried, with feeling.")

LINES = [
    # ---- HOOK ----
    ("hook_fleet", "मार्च 1671… ब्रह्मपुत्र का पानी आज शांत नहीं है।", "low, slow, mysterious, almost a whisper", 0.5),
    ("hook_fleet", "सामने मुग़लों के सैकड़ों जहाज़ हैं… और असम की सेना — पीछे हट रही है।", "tense, ominous", 0.6),
    ("hook_bed", "किनारे के एक तंबू में उनका सेनापति बुखार से तप रहा है। उठ भी नहीं सकता।", "quiet, heavy, sorrowful", 0.5),
    ("hook_bed", "तभी वो आँखें खोलता है… और धीरे से कहता है —", "hushed suspense, slowing down", 0.35),
    ("hook_bed", "मुझे… नाव पर ले चलो।", "a weak, feverish voice that is still firm and determined", 1.0),
    # ---- TITLE ----
    ("title", "ये कहानी है उस योद्धा की, जिसका नाम शायद आपकी किताबों में नहीं था।", "warm storyteller voice, intriguing", 0.6),
    # ---- PART 1: humiliation ----
    ("mirjumla", "चलिए, थोड़ा पीछे चलते हैं।", "calm, inviting", 0.3),
    ("mirjumla", "1662 में मुग़ल सेनापति मीर जुमला असम में घुसा।", "serious, setting the scene", 0.25),
    ("mirjumla", "अहोम राज्य को एक कड़वी संधि माननी पड़ी… और गुवाहाटी मुग़लों के हाथ चला गया।", "bitter, regretful", 0.5),
    ("chosen", "ये अपमान अहोम राजा को सालों तक चुभता रहा।", "quiet anger", 0.3),
    ("chosen", "फिर उन्होंने एक सेनापति चुना — लाचित।", "building, proud, a small pause before the name", 0.4),
    ("guwahati", "और 1667 में… लाचित ने गुवाहाटी वापस छीन लिया।", "triumphant but controlled", 0.6),
    # ---- PART 2: threat ----
    ("army", "ये ख़बर दिल्ली पहुँची।", "ominous, slow", 0.2),
    ("army", "औरंगज़ेब ने भेजा अपना भरोसेमंद सेनापति — आमेर के राजा राम सिंह।", "grave, heavy", 0.3),
    ("army", "साथ में हज़ारों घुड़सवार… हाथी… और जहाज़ों का पूरा बेड़ा।", "growing tension, each item weighs more", 0.6),
    # ---- PART 3: plan ----
    ("map", "लाचित जानता था — खुले मैदान में इस सेना से जीतना नामुमकिन है।", "thoughtful", 0.3),
    ("map", "तो उसने तय किया… लड़ाई ज़मीन पर नहीं होगी। पानी पर होगी।", "clever, a knowing smile in the voice", 0.3),
    ("map", "सराईघाट पर — जहाँ ब्रह्मपुत्र सबसे संकरी है।", "confident, revealing", 0.6),
    # ---- PART 4: uncle (legend) ----
    ("uncle", "रातों-रात मिट्टी की दीवारें खड़ी करनी थीं।", "urgent, hushed", 0.2),
    ("uncle", "कहते हैं, एक दीवार का काम लाचित के अपने मामा के ज़िम्मे था… और काम ढीला पड़ गया।", "storytelling, slightly disapproving", 0.4),
    ("uncle", "लाचित वहाँ पहुँचा, और बस इतना कहा —", "slow, serious", 0.3),
    ("uncle", "मेरा मामा… मेरे देश से बड़ा नहीं।", "cold, steady, unshakeable", 0.7),
    ("uncle", "कहते हैं, वो दीवार सुबह होने से पहले खड़ी थी।", "quiet awe", 0.6),
    # ---- PART 5: back to the hook ----
    ("retreat", "फिर आया मार्च 1671।", "dramatic, a drumbeat in the voice", 0.2),
    ("retreat", "मुग़ल जहाज़ आगे बढ़े। अहोम सैनिकों की हिम्मत टूटने लगी… नावें पीछे मुड़ने लगीं।", "fast, urgent, rising panic", 0.4),
    ("bed2", "और लाचित? वो बिस्तर पर था। बहुत बीमार।", "sudden quiet, sad", 0.6),
    ("bed2", "मुझे नाव पर ले चलो।", "weak feverish voice but iron will", 0.6),
    ("rally", "सैनिक उसे उठाकर नाव तक ले गए।", "building, steady", 0.2),
    ("rally", "वो खड़ा हुआ… तलवार उठाई… और गरजा —", "rising intensity, each phrase stronger", 0.25),
    ("rally", "जिसे भागना है, भाग जाए! मैं अपने देश को ख़तरे में छोड़कर नहीं जाऊँगा!", "a commander's battle roar, shouting with full power and passion", 0.8),
    # ---- PART 6: victory ----
    ("victory", "एक नाव मुड़ी। फिर दूसरी। फिर सारी।", "goosebumps, slow then faster, hope rising", 0.3),
    ("victory", "छोटी, फुर्तीली अहोम नावों ने भारी मुग़ल जहाज़ों को घेर लिया।", "energetic, exciting", 0.2),
    ("victory", "संकरी नदी में वो बड़े जहाज़ ठीक से मुड़ भी नहीं पाए।", "excited, almost amused", 0.3),
    ("victory", "उस दिन मुग़लों की विशाल सेना… ब्रह्मपुत्र से हारकर लौटी।", "triumphant, proud, slow on the last words", 0.9),
    # ---- PART 7: ending ----
    ("legacy", "लेकिन लाचित अपनी जीत ज़्यादा दिन नहीं देख पाया।", "soft, emotional", 0.2),
    ("legacy", "एक साल बाद, बीमारी ने उसे हमसे छीन लिया।", "sad, gentle", 0.6),
    ("legacy", "आज हर चौबीस नवंबर को असम उसे याद करता है — लाचित दिवस पर।", "warm, proud", 0.3),
    ("legacy", "और एनडीए के सबसे अच्छे कैडेट को जो गोल्ड मेडल मिलता है… उसका नाम है — लाचित बोरफुकन।", "proud, slow reveal on the name", 0.8),
    ("end", "क्या आपने ये नाम पहले सुना था? कमेंट में बताइए।", "warm, friendly, talking directly to the viewer", 0.8),
]

SCENE_LEAD = {"hook_fleet": 0.2}   # silence before first line of a scene (default 0.15)
SCENE_EXTRA = {"title": 0.8}       # hold after the last line of a scene


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


if __name__ == "__main__":
    sc, _ = timeline()
    tot = 0
    for s, d, c in sc:
        tot += d; print(f"{s:11s} {d:5.1f}s {len(c)} lines")
    print("total", round(tot, 1), "chars", sum(len(l[1]) for l in LINES))

# One Gemini request per group (free tier allows ~10 TTS requests/day, 3/minute).
GROUPS = [["hook_fleet", "hook_bed"], ["title", "mirjumla", "chosen", "guwahati"], ["army", "map"], ["uncle"],
          ["retreat", "bed2", "rally"], ["victory"], ["legacy"], ["end"]]
GROUP_MOOD = ["a gripping, mysterious cold open; dark and slow", "warm, intriguing storytelling, then bitter regret, then pride",
              "rising tension, then a clever plan revealed", "serious, hushed, a legend told by firelight",
              "urgent battle, then sudden sad quiet, then a roaring war cry", "goosebumps turning into triumph",
              "soft, emotional, a proud farewell", "warm and friendly, talking directly to the viewer"]
TITLE = "Lachit Borphukan - Battle of Saraighat"
FILE_NAME = "01 - Lachit Borphukan - Saraighat.mp4"
