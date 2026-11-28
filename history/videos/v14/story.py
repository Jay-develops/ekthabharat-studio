"""Video 14 - Prithviraj Chauhan and the battles of Tarain (1191, 1192). Storytelling script (Hindi), under 2 minutes.

The shabdbhedi arrow at Ghazni comes from the Prithviraj Raso tradition; the script calls it a legend and says what historians say.
Sources: Britannica (Prithviraja III; Battles of Tarain; Muhammad of Ghor), Wikipedia (Prithviraj Chauhan; Prithviraj Raso; Chand Bardai)."""

LINES = [
    ("hook_tarain", "दुश्मन का सुल्तान घायल होकर घोड़े से गिर रहा था। एक वार, और कहानी वहीं ख़त्म हो जाती।", "tense, urgent, close to the mic", 0.15),
    ("hook_tarain", "पर उसे जाने दिया गया। और इसी एक फ़ैसले ने इतिहास बदल दिया।", "slow, heavy, leave it hanging", 0.25),
    ("title", "पृथ्वीराज चौहान… और उनकी सबसे बड़ी भूल।", "proud, grave", 0.3),
    ("ajmer", "अजमेर और दिल्ली के युवा राजा। कहते हैं, आवाज़ सुनकर ही निशाना लगा देते थे — शब्दभेदी बाण। ये बात याद रखिए।", "admiring, then a knowing hint", 0.25),
    ("ghori", "उत्तर-पश्चिम से आया मुहम्मद ग़ोरी। 1191 में दोनों सेनाएँ तराइन में टकराईं।", "ominous, building", 0.15),
    ("ghori", "राजपूत हाथियों और घुड़सवारों ने ग़ोरी की फ़ौज को तितर-बितर कर दिया!", "energetic, triumphant", 0.15),
    ("ghori", "ग़ोरी घायल हुआ, एक सिपाही उसे बचाकर भाग निकला। और राजपूतों ने पीछा नहीं किया।", "tense, then regretful", 0.25),
    ("return", "पर ग़ोरी लौटा। ठीक एक साल बाद, 1192 में, पहले से बड़ी फ़ौज के साथ।", "ominous, slow", 0.15),
    ("return", "इस बार चाल अलग थी। संधि की बात चलाई, और भोर से पहले सोती सेना पर हमला कर दिया।", "cunning, then sudden", 0.2),
    ("battle", "तेज़ घुड़सवार तीर बरसाते, पीछे हटते, फिर लौट आते।", "fast, relentless", 0.15),
    ("battle", "शाम तक लड़ाई ख़त्म… और पृथ्वीराज बंदी बना लिए गए।", "heavy, sad", 0.3),
    ("legend", "कहते हैं, उन्हें ग़ज़नी ले जाकर अंधा कर दिया गया। पर साथ था उनका दोस्त, कवि चंद बरदाई।", "sorrowful, then a glimmer of hope", 0.15),
    ("legend", "तीरंदाज़ी मुक़ाबले में चंद बरदाई ने एक दोहे में सुल्तान की जगह बता दी — चार बाँस चौबीस गज… मत चूको चौहान! और शब्दभेदी बाण चला!", "rising suspense, then a goosebumps climax", 0.35),
    ("twist", "पर रुकिए। इतिहासकार कहते हैं, ग़ोरी 1206 में किसी और के हाथों मारा गया था।", "a twist, thoughtful", 0.2),
    ("twist", "फिर भी पृथ्वीराज रासो ने ये कहानी सदियों से ज़िंदा रखी है।", "warm, slow", 0.3),
    ("end", "अब आप बताइए — 1191 में ग़ोरी को ज़िंदा जाने देना, बड़प्पन था या सबसे बड़ी ग़लती? कमेंट में लिखिए।", "warm, friendly", 0.6),
]

SCENE_LEAD = {"hook_tarain": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"ghori": (108, 0.28), "battle": (120, 0.32)}, "pulse": ["hook_tarain", "return", "legend"],
         "hits": [("hook_tarain", 1), ("title", 0), ("battle", 1), ("legend", 1)], "rise": [("legend", 1), ("twist", 0)], "quiet": ["twist"]}
GROUPS = [["hook_tarain", "title", "ajmer", "ghori"], ["return", "battle"], ["legend", "twist", "end"]]
GROUP_MOOD = ["a tense cold open, then pride and a first victory",
              "cunning, betrayal and defeat",
              "sorrow, a legendary climax, then a thoughtful twist"]
TITLE = "Prithviraj Chauhan - Tarain"
FILE_NAME = "14 - Prithviraj Chauhan - Tarain.mp4"
