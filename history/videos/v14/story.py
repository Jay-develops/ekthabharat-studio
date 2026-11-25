"""Video 14 - Prithviraj Chauhan and the battles of Tarain (1191, 1192). Storytelling script (Hindi), under 2 minutes.

The shabdbhedi arrow at Ghazni comes from the Prithviraj Raso tradition; the script calls it a legend and says what historians say.
Sources: Britannica (Prithviraja III; Battles of Tarain; Muhammad of Ghor), Wikipedia (Prithviraj Chauhan; Prithviraj Raso; Chand Bardai)."""

LINES = [
 ("hook_tarain", "1191, तराइन का मैदान। दुश्मन का सुल्तान घायल होकर घोड़े से गिर रहा था…", "tense, urgent", 0.3),
 ("hook_tarain", "राजपूत सेना चाहती तो उसे वहीं ख़त्म कर देती… पर उसे जाने दिया गया।", "grave, slow", 0.5),
 ("title", "ये कहानी है पृथ्वीराज चौहान की… और उस एक भूल की, जिसने इतिहास बदल दिया।", "proud storyteller voice, a little ominous", 0.4),
 ("ajmer", "अजमेर और दिल्ली के युवा राजा पृथ्वीराज… कहते हैं, आवाज़ सुनकर ही निशाना लगा देते थे: शब्दभेदी बाण।", "proud, warm", 0.4),
 ("ghori", "उत्तर-पश्चिम से आ रहा था मुहम्मद ग़ोरी… और 1191 में दोनों सेनाएँ तराइन में टकराईं।", "ominous, building", 0.25),
 ("ghori", "राजपूत हाथियों और घुड़सवारों ने ग़ोरी की फ़ौज को तितर-बितर कर दिया।", "triumphant, energetic", 0.25),
 ("ghori", "ग़ोरी घायल हुआ… और उसका एक सिपाही उसे बचाकर भाग निकला।", "tense", 0.4),
 ("return", "पर ग़ोरी लौटा। ठीक एक साल बाद, 1192… पहले से बड़ी फ़ौज के साथ।", "ominous, grave", 0.25),
 ("return", "उसने संधि की बात चलाई… और भोर होने से पहले हमला कर दिया।", "tense, hushed then sharp", 0.4),
 ("battle", "उसके तेज़ घुड़सवार तीर बरसाते, पीछे हटते… फिर लौट आते।", "urgent, fast", 0.25),
 ("battle", "शाम तक लड़ाई ख़त्म… और पृथ्वीराज बंदी बना लिए गए।", "sad, slow", 0.5),
 ("legend", "कहते हैं, उन्हें ग़ज़नी ले जाकर अंधा कर दिया गया… पर साथ था उनका दोस्त, कवि चंद बरदाई।", "hushed, mysterious", 0.25),
 ("legend", "एक तीरंदाज़ी मुक़ाबले में चंद बरदाई ने एक दोहे में सुल्तान की जगह बता दी… और शब्दभेदी बाण चला!", "rising, goosebumps, full power at the end", 0.5),
 ("twist", "पर इतिहासकार कहते हैं, ग़ोरी 1206 में किसी और के हाथों मारा गया था।", "a sly reveal, calm", 0.25),
 ("twist", "फिर भी पृथ्वीराज रासो ने ये लोककथा सदियों से ज़िंदा रखी है।", "warm, proud", 0.4),
 ("end", "आप क्या मानते हैं: इतिहास, या लोककथा? कमेंट में बताइए।", "warm, friendly, curious", 0.8),
]

SCENE_LEAD = {"hook_tarain": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"ghori": (108, 0.28), "battle": (120, 0.32)}, "pulse": ["hook_tarain", "return", "legend"],
         "hits": [("hook_tarain", 1), ("title", 0), ("battle", 1), ("legend", 1)], "rise": [("legend", 1), ("twist", 0)], "quiet": ["twist"]}
TITLE = "Prithviraj Chauhan - Tarain"
FILE_NAME = "14 - Prithviraj Chauhan - Tarain.mp4"
