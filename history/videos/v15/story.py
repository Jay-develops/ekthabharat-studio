"""Video 15 - Mangal Pandey at Barrackpore (29 March 1857) and the spark of 1857. Storytelling script (Hindi), under 2 minutes.

Sources: Britannica (Mangal Pandey; Indian Mutiny), Wikipedia (Mangal Pandey; 34th Bengal Native Infantry; Enfield cartridge controversy; Indian Rebellion of 1857)."""

LINES = [
    ("hook_parade", "परेड ग्राउंड पर अकेला एक सिपाही… हाथ में भरी हुई बंदूक। और सामने अंग्रेज़ अफ़सर।", "tense, close to the mic", 0.2),
    ("hook_parade", "भाइयो, उठो! … और गोली चल गई।", "a desperate shout, then sudden", 0.3),
    ("hook_parade", "उस एक गोली ने… अंग्रेज़ी राज की नींव हिला दी।", "low, ominous, leave it hanging", 0.4),
    ("title", "मंगल पांडे… और 1857 की पहली चिंगारी।", "proud, strong", 0.4),
    ("sepoy", "बलिया के एक गाँव का नौजवान… ईस्ट इंडिया कंपनी की चौंतीसवीं बंगाल नेटिव इन्फ़ैंट्री का सिपाही। एक आम सिपाही… जिसे पूरा देश याद रखने वाला था।", "warm, then a hint of destiny", 0.3),
    ("cartridge", "फिर आई नई एनफ़ील्ड राइफ़ल। उसका कारतूस दाँत से काटकर खोलना पड़ता था…", "serious, building", 0.25),
    ("cartridge", "और छावनियों में ख़बर फैली — इन कारतूसों पर गाय और सूअर की चर्बी लगी है!", "shocked, urgent", 0.25),
    ("cartridge", "हिंदू हो या मुसलमान… हर सिपाही का धर्म दाँव पर था।", "grave, heavy", 0.4),
    ("clash", "29 मार्च की उस दोपहर… मंगल पांडे ने अंग्रेज़ अफ़सरों पर हमला कर दिया।", "fast, intense", 0.25),
    ("clash", "जमादार ईश्वरी प्रसाद को हुक्म मिला — पकड़ो उसे! … उन्होंने मना कर दिया।", "tense, then defiant", 0.25),
    ("clash", "आख़िरकार मंगल पांडे घायल होकर पकड़े गए।", "heavy, slowing down", 0.4),
    ("hang", "8 अप्रैल 1857… तय तारीख़ से पहले ही, उन्हें फाँसी दे दी गई।", "sad, grave", 0.3),
    ("hang", "अंग्रेज़ों को लगा, बात यहीं ख़त्म हो गई। वो ग़लत थे।", "quiet, then a knowing warning", 0.4),
    ("spark", "ठीक एक महीने बाद, 10 मई को मेरठ में सिपाही उठ खड़े हुए… और दिल्ली की ओर कूच कर दिया।", "rising, urgent", 0.25),
    ("spark", "आग पूरे उत्तर भारत में फैल गई… 1857 की क्रांति!", "triumphant, full power", 0.4),
    ("twist", "और अंग्रेज़ इतने चिढ़े… कि हर बाग़ी सिपाही को एक ही नाम से बुलाने लगे — पांडे।", "amused, a reveal", 0.5),
    ("end", "एक सिपाही, एक गोली… और एक नाम जो पहचान बन गया। क्या आपको ये बात पता थी? कमेंट में बताइए।", "warm, proud, friendly", 0.8),
]

SCENE_LEAD = {"hook_parade": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"clash": (112, 0.28), "spark": (120, 0.32)}, "pulse": ["hook_parade", "cartridge"],
         "hits": [("hook_parade", 1), ("title", 0), ("hang", 0), ("spark", 1)], "rise": [("spark", 0), ("twist", 0)], "quiet": ["hang"]}
GROUPS = [["hook_parade", "title", "sepoy", "cartridge"], ["clash", "hang"], ["spark", "twist", "end"]]
GROUP_MOOD = ["a tense cold open, then rising anger and fear",
              "a desperate act, defiance, then a sad execution",
              "a fire spreading, triumph, then a wry reveal"]
TITLE = "Mangal Pandey - The Spark of 1857"
FILE_NAME = "15 - Mangal Pandey - 1857.mp4"
