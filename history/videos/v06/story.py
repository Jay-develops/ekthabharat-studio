"""Video 06 - Maharana Pratap and Chetak at Haldighati (18 June 1576). Storytelling script (Hindi), under 2 minutes.

Chetak's leap and wound come from tradition; the memorial stands at Balicha near Haldighati.
Sources: Britannica (Pratap Singh; Battle of Haldighati), Wikipedia (Chetak; Jhala Man; HAL Chetak)."""

VOICE = "Charon"
BASE_STYLE = ("You are a deep-voiced Hindi storyteller narrating a gripping true story from Indian history, "
              "like a grandfather telling a legend by firelight. Natural spoken Hindi, unhurried, with feeling.")


LINES = [
 ("hook_run", "एक घोड़ा… ज़ख़्मी टाँग के साथ… अपने राजा को मौत के मुँह से निकालकर दौड़ रहा था।", "tense, urgent", 0.3),
 ("hook_run", "सामने था एक बरसाती नाला… और पीछे दुश्मन।", "tense, building suspense", 0.5),
 ("title", "ये कहानी है महाराणा प्रताप… और उनके घोड़े चेतक की।", "warm storyteller voice, proud", 0.5),
 ("mewar", "मेवाड़ के राणा प्रताप… अकबर के आगे झुकने को तैयार नहीं थे।", "proud", 0.25),
 ("mewar", "अकबर ने कई बार संदेश भेजे… पर हर बार जवाब था… ना।", "defiant, proud", 0.45),
 ("battle", "18 जून 1576… हल्दीघाटी।", "dramatic, slow", 0.25),
 ("battle", "मुग़ल सेना की कमान थी आमेर के राजा मान सिंह के हाथ… जो हाथी पर सवार थे।", "ominous, grand", 0.25),
 ("battle", "राणा प्रताप चेतक पर सवार होकर… सीधे मान सिंह के हाथी तक जा पहुँचे।", "energetic, exciting", 0.25),
 ("battle", "कहते हैं, चेतक ने अपने अगले पैर हाथी के माथे पर रख दिए… और प्रताप ने भाला चलाया।", "exciting, rising", 0.45),
 ("wound", "पर हाथी की सूँड़ में बँधी तलवार ने… चेतक की एक टाँग घायल कर दी।", "sad, tense", 0.3),
 ("wound", "तभी सरदार झाला मान ने राणा का छत्र अपने सिर पर ले लिया… ताकि दुश्मन उन्हें ही राणा समझे।", "proud, emotional", 0.45),
 ("leap", "घायल चेतक राणा को लेकर दौड़ पड़ा… और नाले के ऊपर से छलाँग लगा दी।", "exciting, triumphant", 0.3),
 ("leap", "राणा बच गए… पर उस पार पहुँचकर चेतक ने दम तोड़ दिया।", "sad, slow", 0.5),
 ("legacy", "हल्दीघाटी के पास आज भी चेतक की समाधि है।", "warm, gentle", 0.25),
 ("legacy", "और महाराणा प्रताप ने कभी हार नहीं मानी… जंगलों में रहकर लड़ते रहे, और मेवाड़ का बड़ा हिस्सा वापस जीत लिया।", "proud", 0.5),
 ("twist", "और हाँ… भारत का एक मशहूर हेलिकॉप्टर भी इसी घोड़े के नाम पर है… चेतक।", "a sly reveal, amused", 0.35),
 ("twist", "ऐसी और कहानियों के लिए फ़ॉलो कीजिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_run": 0.1}    # silence before first line of a scene (default 0.15)
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
GROUPS = [['hook_run', 'title'], ['mewar', 'battle'], ['wound', 'leap'], ['legacy'], ['twist']]
GROUP_MOOD = ['urgent, tense cold open, then warm pride', 'proud and defiant, then grand and exciting', 'sad, then emotional, then triumphant, then sad', 'warm and proud', 'sly reveal, then warm']
TITLE = 'Maharana Pratap and Chetak - Haldighati'
FILE_NAME = '06 - Maharana Pratap - Chetak.mp4'
