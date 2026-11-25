"""Video 03 - Rani Lakshmibai of Jhansi (1857-58). Storytelling script (Hindi), under 2 minutes.

Sources: Britannica (Lakshmi Bai), Wikipedia (Rani of Jhansi; Siege of Jhansi; Rani of Jhansi Regiment)."""

VOICE = "Charon"
BASE_STYLE = ("You are a deep-voiced Hindi storyteller narrating a gripping true story from Indian history, "
              "like a grandfather telling a legend by firelight. Natural spoken Hindi, unhurried, with feeling.")


LINES = [
 ("hook_wall", "रात का अँधेरा… किले के चारों ओर अंग्रेज़ी तोपें… और दीवार पर एक घुड़सवार।", "hushed, tense", 0.3),
 ("hook_wall", "पीठ पर कसकर बँधा एक छोटा बच्चा… और हाथ में तलवार।", "tense, building suspense", 0.5),
 ("title", "ये कहानी है झाँसी की रानी की… रानी लक्ष्मीबाई की।", "warm storyteller voice, proud", 0.5),
 ("jhansi", "बनारस में जन्मी मणिकर्णिका… शादी के बाद बनीं झाँसी की रानी।", "calm storytelling", 0.25),
 ("jhansi", "उनका अपना बेटा कुछ ही महीनों में चल बसा।", "sad, gentle", 0.25),
 ("jhansi", "राजा ने एक बच्चा गोद लिया, दामोदर राव… और फिर राजा भी नहीं रहे।", "sad, slow", 0.45),
 ("lapse", "अंग्रेज़ों ने कहा: गोद लिया बेटा वारिस नहीं हो सकता… अब झाँसी हमारी है।", "ominous, cold", 0.3),
 ("lapse", "रानी ने जवाब दिया… मैं अपनी झाँसी नहीं दूँगी!", "proud, defiant, full power", 0.5),
 ("siege", "1858. अंग्रेज़ी सेना ने झाँसी को घेर लिया।", "tense, ominous", 0.25),
 ("siege", "दो हफ़्ते तक तोपें बरसती रहीं… और रानी ख़ुद दीवारों पर लड़ती रहीं।", "tense, urgent", 0.45),
 ("escape", "जब किला गिरने लगा, तो एक रात… बेटे को पीठ पर बाँधकर, रानी घोड़े पर निकल पड़ीं।", "hushed, suspense", 0.3),
 ("escape", "अंग्रेज़ों का घेरा चीरती हुई… सीधी कालपी की ओर।", "energetic, rising", 0.45),
 ("gwalior", "वहाँ तात्या टोपे के साथ मिलकर… उन्होंने ग्वालियर का किला जीत लिया।", "triumphant, proud", 0.45),
 ("last", "18 जून 1858… ग्वालियर के पास, आख़िरी लड़ाई।", "grave, slow", 0.3),
 ("last", "रानी आख़िरी साँस तक लड़ती रहीं… और लड़ते-लड़ते वीरगति को प्राप्त हुईं।", "sad, emotional, slow", 0.35),
 ("last", "कहते हैं, उनसे लड़ने वाले अंग्रेज़ जनरल ने भी माना… विद्रोहियों में सबसे बहादुर, यही रानी थीं।", "proud, emotional", 0.5),
 ("twist", "और कहानी यहीं ख़त्म नहीं हुई…", "a sly reveal, mysterious", 0.25),
 ("twist", "85 साल बाद, नेताजी सुभाष चंद्र बोस ने महिलाओं की एक पूरी फ़ौज बनाई… नाम रखा: रानी झाँसी रेजिमेंट।", "proud, goosebumps, rising", 0.35),
 ("twist", "ऐसी और कहानियों के लिए फ़ॉलो कीजिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_wall": 0.1}    # silence before first line of a scene (default 0.15)
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
GROUPS = [['hook_wall', 'title'], ['jhansi', 'lapse'], ['siege', 'escape'], ['gwalior', 'last'], ['twist']]
GROUP_MOOD = ['a gripping, tense cold open, then warm pride', 'gentle and sad, then cold, then defiant', 'tense and urgent, then hushed suspense rising into energy', 'triumphant, then grave and emotional', 'sly reveal, then proud, then warm']
TITLE = 'Rani Lakshmibai - The Queen of Jhansi'
FILE_NAME = '03 - Rani Lakshmibai - Jhansi.mp4'
