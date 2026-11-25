"""Video 21 - Chandrashekhar Azad: the boy who called himself "Azad" (1921) and the last stand at Alfred Park, Allahabad (27 February 1931). Storytelling script (Hindi), under 2 minutes.

The court exchange (name Azad, father Swatantrata, home jail) is the well-known account from his biographers.
Sources: Britannica (Chandra Shekhar Azad), Wikipedia (Chandra Shekhar Azad; Hindustan Socialist Republican Association; Kakori conspiracy; Chandrashekhar Azad Park), Allahabad Museum (Azad's Colt pistol)."""

LINES = [
 ("hook_park", "27 फ़रवरी 1931, इलाहाबाद का अल्फ़्रेड पार्क। एक पेड़ की आड़ में अकेला नौजवान… और चारों तरफ़ पुलिस।", "tense, hushed", 0.3),
 ("hook_park", "पिस्तौल में बस कुछ गोलियाँ बची थीं।", "grave, slow", 0.5),
 ("title", "ये कहानी है चंद्रशेखर आज़ाद की… जिन्होंने कसम खाई थी: मुझे कोई ज़िंदा नहीं पकड़ पाएगा।", "proud storyteller voice", 0.4),
 ("court", "1921, बनारस। असहयोग आंदोलन में पंद्रह साल का एक लड़का पकड़ा गया।", "calm storytelling", 0.25),
 ("court", "मजिस्ट्रेट ने नाम पूछा: बोला, आज़ाद। पिता का नाम? स्वतंत्रता। घर? जेल!", "defiant, proud, with a smile", 0.4),
 ("lashes", "सज़ा मिली पंद्रह बेंत की… और हर बेंत पर वो बोला: भारत माता की जय!", "intense, proud", 0.4),
 ("leader", "बड़े होकर वो क्रांतिकारियों के नेता बने। काकोरी में सरकारी ख़ज़ाना लूटा… भगत सिंह जैसे साथी जुड़े।", "energetic", 0.25),
 ("leader", "पुलिस सालों ढूँढती रही… पर आज़ाद कभी साधु बनकर, कभी किसी और भेस में निकल जाते।", "clever, amused", 0.4),
 ("stand", "फिर किसी ने मुख़बिरी कर दी। पार्क में घिरे आज़ाद अकेले लड़ते रहे… और साथी को निकल जाने दिया।", "urgent, exciting", 0.25),
 ("stand", "जब आख़िरी गोली बची… तो उन्होंने अपनी कसम निभाई।", "slow, emotional, goosebumps", 0.6),
 ("twist", "वो जिए आज़ाद… और गए भी आज़ाद। उम्र थी सिर्फ़ चौबीस साल।", "proud, emotional", 0.25),
 ("twist", "आज उस पार्क का नाम है चंद्रशेखर आज़ाद पार्क… और उनकी पिस्तौल इलाहाबाद संग्रहालय में रखी है।", "proud, warm", 0.4),
 ("end", "चंद्रशेखर आज़ाद के लिए एक शब्द कमेंट में लिखिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_park": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"leader": (112, 0.26), "stand": (120, 0.3)}, "pulse": ["hook_park", "court"], "hits": [("hook_park", 1), ("title", 0), ("lashes", 0), ("stand", 1)],
         "rise": [("lashes", 0), ("twist", 0)], "quiet": ["twist"]}
TITLE = "Chandrashekhar Azad - Forever Free"
FILE_NAME = "21 - Chandrashekhar Azad - Alfred Park.mp4"
