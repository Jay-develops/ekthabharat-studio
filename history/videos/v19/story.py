"""Video 19 - Nalanda Mahavihara: the great university of ancient India, and its destruction (c. 1200). Storytelling script (Hindi), under 2 minutes.

"The library burned for months" is a popular tradition, not from a contemporary record; framed with "कहते हैं".
Sources: Britannica (Nalanda; Xuanzang), UNESCO (Archaeological Site of Nalanda Mahavihara, inscribed 2016), Wikipedia (Nalanda mahavihara; Bakhtiyar Khalji; Nalanda University)."""

LINES = [
 ("hook_fire", "बिहार, लगभग 1200 ईस्वी। आसमान तक उठती लपटें… और जल रही थीं लाखों हाथ से लिखी किताबें।", "grave, slow", 0.3),
 ("hook_fire", "कहते हैं, ये लाइब्रेरी इतनी बड़ी थी कि महीनों तक जलती रही।", "hushed, emotional", 0.5),
 ("title", "ये कहानी है नालंदा की… दुनिया के सबसे पुराने महान विश्वविद्यालयों में से एक।", "proud storyteller voice", 0.4),
 ("campus", "पाँचवीं सदी में गुप्त राजाओं के समय यहाँ पढ़ाई शुरू हुई… और सात सौ साल तक चलती रही।", "calm storytelling, warm", 0.25),
 ("campus", "लाल ईंटों के विहार, मंदिर, कुएँ… और हज़ारों विद्यार्थी, हज़ारों शिक्षक।", "warm, amazed", 0.4),
 ("exam", "पर यहाँ दाख़िला आसान नहीं था। दरवाज़े पर ही विद्वान सवाल पूछते… और ज़्यादातर लोग लौट जाते।", "sly, impressed", 0.4),
 ("xuanzang", "सातवीं सदी में चीन से एक यात्री, ह्वेन त्सांग, हज़ारों मील चलकर यहाँ पढ़ने आया।", "warm, adventurous", 0.25),
 ("xuanzang", "कोरिया, तिब्बत, इंडोनेशिया से भी विद्यार्थी आते थे… पूरा एशिया यहाँ पढ़ने आता था।", "proud", 0.4),
 ("library", "इसकी लाइब्रेरी का नाम था धर्मगंज… ज्ञान का पहाड़।", "proud, mysterious", 0.25),
 ("library", "बौद्ध दर्शन, गणित, व्याकरण, चिकित्सा, खगोल… सब कुछ पढ़ाया जाता था।", "proud, building", 0.4),
 ("attack", "फिर बारहवीं सदी के आख़िर में बख़्तियार ख़िलजी की फ़ौज बिहार में घुसी।", "ominous, grave", 0.25),
 ("attack", "भिक्षु मारे गए, विहार ढहा दिए गए… और नालंदा ख़ामोश हो गया।", "sad, slow", 0.5),
 ("twist", "पर कहानी यहीं ख़त्म नहीं हुई। 2016 में इसके खंडहर यूनेस्को की विश्व धरोहर बने…", "rising, proud", 0.25),
 ("twist", "और उसी के पास, नया नालंदा विश्वविद्यालय फिर से पढ़ा रहा है।", "proud, goosebumps", 0.4),
 ("end", "अगर आप नालंदा में पढ़ते, तो कौन-सा विषय चुनते? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_fire": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"attack": (100, 0.26)}, "pulse": ["hook_fire", "exam"], "hits": [("hook_fire", 1), ("title", 0), ("attack", 1), ("twist", 0)],
         "rise": [("twist", 0), ("library", 1)], "quiet": ["hook_fire"]}
TITLE = "Nalanda - The Great University"
FILE_NAME = "19 - Nalanda - Mahavihara.mp4"
