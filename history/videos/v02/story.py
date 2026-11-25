"""Video 02 - Chhatrapati Shivaji Maharaj's escape from Agra (1666). Storytelling script (Hindi), under 2 minutes.

LINES: (scene, text, direction for the narrator, pause after in seconds)
Sources: Britannica (Shivaji), Jadunath Sarkar "Shivaji and His Times" ch. VI-VII, Wikipedia (Ram Singh I),
ThePrint / Free Press Journal on Shivchaturya Din (17 August).
"""

VOICE = "Charon"
BASE_STYLE = ("You are a deep-voiced Hindi storyteller narrating a gripping true story from Indian history, "
              "like a grandfather telling a legend by firelight. Natural spoken Hindi, unhurried, with feeling.")


LINES = [
 ("hook_door", "सुबह हुई… पहरेदारों ने दरवाज़ा खोला… और कमरा ख़ाली था।", "hushed, then a sudden shock on the last words", 0.4),
 ("hook_door", "जिस क़ैदी पर दिन-रात कड़ा पहरा था… वो ग़ायब हो चुका था।", "tense, mysterious", 0.6),
 ("title", "ये कहानी है भारत के इतिहास के सबसे चालाक पलायन की।", "warm storyteller voice, intriguing", 0.5),
 ("court", "12 मई 1666. आगरा में औरंगज़ेब का भव्य दरबार।", "grand, setting the scene", 0.25),
 ("court", "शिवाजी महाराज को छोटे सरदारों की कतार में खड़ा कर दिया गया।", "bitter, an insult", 0.25),
 ("court", "अपमान सहना उनकी आदत नहीं थी… वो दरबार छोड़कर चले गए।", "proud, defiant", 0.4),
 ("arrest", "उसी शाम उनका डेरा सैनिकों से घिर गया।", "ominous, tense", 0.2),
 ("arrest", "शिवाजी और उनके नौ साल के बेटे संभाजी… अब आगरा में क़ैद थे।", "grave, heavy", 0.5),
 ("plan", "फिर एक दिन शिवाजी बीमार पड़ गए।", "a knowing hint, slightly playful", 0.25),
 ("plan", "रोज़ उनके डेरे से मिठाइयों की बड़ी-बड़ी टोकरियाँ निकलतीं… ग़रीबों और ब्राह्मणों के लिए।", "storytelling, steady", 0.25),
 ("plan", "पहले पहरेदार हर टोकरी जाँचते थे… फिर धीरे-धीरे जाँचना बंद कर दिया।", "clever, building suspense", 0.5),
 ("escape", "17 अगस्त 1666.", "dramatic, slow", 0.25),
 ("escape", "एक टोकरी में शिवाजी… दूसरी में संभाजी।", "hushed, tense", 0.3),
 ("escape", "और बिस्तर पर, चादर ओढ़े, लेटे थे उनके सौतेले भाई हिरोजी फ़र्ज़ंद… हाथ में शिवाजी का सोने का कड़ा।", "secretive, suspenseful", 0.3),
 ("escape", "टोकरियाँ पहरेदारों के सामने से निकल गईं… और किसी को भनक तक नहीं लगी।", "suspense breaking into quiet triumph", 0.5),
 ("journey", "जब तक सच सामने आया, शिवाजी साधु के वेश में आगरा से बहुत दूर निकल चुके थे।", "triumphant, energetic", 0.25),
 ("journey", "कुछ ही हफ़्तों में वो अपने स्वराज्य लौट आए।", "proud", 0.5),
 ("legacy", "आज भी 17 अगस्त को शिवचातुर्य दिवस के रूप में याद किया जाता है।", "warm, proud", 0.4),
 ("twist", "और हाँ… शिवाजी की निगरानी की ज़िम्मेदारी थी राजा राम सिंह की।", "a sly reveal", 0.25),
 ("twist", "वही राम सिंह, जिन्हें पाँच साल बाद लाचित बोरफुकन ने हराया।", "amused, intriguing, talking directly to the viewer", 0.3),
 ("twist", "ऐसी और कहानियों के लिए फ़ॉलो कीजिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_door": 0.1}    # silence before first line of a scene (default 0.15)
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
GROUPS = [["hook_door", "title"], ["court", "arrest"], ["plan"], ["escape"], ["journey", "legacy"], ["twist"]]
GROUP_MOOD = ["a gripping, mysterious cold open, then warm intrigue", "grand, then bitter, then ominous",
              "clever, building suspense", "hushed, tense suspense breaking into quiet triumph",
              "triumphant and proud", "sly and amused, then warm, talking to the viewer"]
TITLE = "Shivaji Maharaj - Escape from Agra"
FILE_NAME = "02 - Shivaji Maharaj - Escape from Agra.mp4"
