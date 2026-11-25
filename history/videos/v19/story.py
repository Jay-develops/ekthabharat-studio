"""Video 19 - Nalanda Mahavihara: the great university of ancient India, and its destruction (c. 1200). Storytelling script (Hindi), under 2 minutes.

"The library burned for months" is a popular tradition, not from a contemporary record; framed with "कहते हैं".
Sources: Britannica (Nalanda; Xuanzang), UNESCO (Archaeological Site of Nalanda Mahavihara, inscribed 2016), Wikipedia (Nalanda mahavihara; Bakhtiyar Khalji; Nalanda University)."""

LINES = [
    ("hook_fire", "आसमान तक उठती लपटें… और उनमें जल रही थीं लाखों हाथ से लिखी किताबें।", "urgent, shocked, close to the mic", 0.2),
    ("hook_fire", "कहते हैं, ये लाइब्रेरी इतनी बड़ी थी… कि महीनों तक जलती रही।", "low, heavy, in awe", 0.25),
    ("hook_fire", "और इसमें पढ़ने के लिए… दुनिया के दूसरे छोर से लोग पैदल चलकर आते थे।", "intriguing, leave it hanging", 0.4),
    ("title", "नालंदा… दुनिया के सबसे पुराने महान विश्वविद्यालयों में से एक।", "proud, strong", 0.4),
    ("campus", "पाँचवीं सदी में गुप्त राजाओं के समय यहाँ पढ़ाई शुरू हुई… और सात सौ साल तक चलती रही।", "warm, proud", 0.25),
    ("campus", "लाल ईंटों के विहार, मंदिर, कुएँ… और हज़ारों विद्यार्थी, हज़ारों शिक्षक।", "wonder", 0.3),
    ("exam", "पर यहाँ दाख़िला आसान नहीं था। दरवाज़े पर ही विद्वान सवाल पूछते… और कहते हैं, दस में से सिर्फ़ दो-तीन ही अंदर जा पाते।", "playful challenge, impressed", 0.3),
    ("xuanzang", "सातवीं सदी में चीन से एक यात्री, ह्वेन त्सांग, हज़ारों मील चलकर यहाँ पढ़ने आया… और सालों यहीं रहा।", "admiring, adventurous", 0.25),
    ("xuanzang", "कोरिया, तिब्बत, इंडोनेशिया से भी विद्यार्थी आते थे… पूरा एशिया यहाँ पढ़ने आता था।", "proud, rising", 0.3),
    ("library", "इसकी लाइब्रेरी का नाम था धर्मगंज… यानी ज्ञान का ख़ज़ाना। कहते हैं, इसकी एक इमारत नौ मंज़िल ऊँची थी।", "awe, wonder", 0.25),
    ("library", "बौद्ध दर्शन, गणित, व्याकरण, चिकित्सा, खगोल… सब कुछ पढ़ाया जाता था।", "proud", 0.4),
    ("attack", "और फिर… बारहवीं सदी के आख़िर में बख़्तियार ख़िलजी की फ़ौज बिहार में घुसी।", "ominous, slow", 0.25),
    ("attack", "भिक्षु मारे गए, विहार ढहा दिए गए… और वही आग लगी, जिससे ये कहानी शुरू हुई थी। नालंदा ख़ामोश हो गया।", "grave, sad", 0.5),
    ("twist", "पर कहानी यहीं ख़त्म नहीं हुई। 2016 में इसके खंडहर यूनेस्को की विश्व धरोहर बने…", "hope rising", 0.25),
    ("twist", "और उसी के पास, नया नालंदा विश्वविद्यालय फिर से पढ़ा रहा है।", "warm, proud", 0.5),
    ("end", "अगर आप नालंदा में पढ़ते, तो कौन-सा विषय चुनते? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_fire": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"attack": (100, 0.26)}, "pulse": ["hook_fire", "exam"], "hits": [("hook_fire", 1), ("title", 0), ("attack", 1), ("twist", 0)],
         "rise": [("twist", 0), ("library", 1)], "quiet": ["hook_fire"]}
GROUPS = [["hook_fire", "title", "campus", "exam"], ["xuanzang", "library", "attack"], ["twist", "end"]]
GROUP_MOOD = ["a shocking cold open of fire, then wonder and pride",
              "awe at a great library, then dread and loss",
              "hope and warm pride"]
TITLE = "Nalanda - The Great University"
FILE_NAME = "19 - Nalanda - Mahavihara.mp4"
