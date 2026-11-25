"""Video 21 - Chandrashekhar Azad: the boy who called himself "Azad" (1921) and the last stand at Alfred Park, Allahabad (27 February 1931). Storytelling script (Hindi), under 2 minutes.

The court exchange (name Azad, father Swatantrata, home jail) is the well-known account from his biographers.
Sources: Britannica (Chandra Shekhar Azad), Wikipedia (Chandra Shekhar Azad; Hindustan Socialist Republican Association; Kakori conspiracy; Chandrashekhar Azad Park), Allahabad Museum (Azad's Colt pistol)."""

LINES = [
    ("hook_park", "एक पेड़ की आड़ में अकेला नौजवान… चारों तरफ़ पुलिस। और पिस्तौल में बस कुछ गोलियाँ।", "tense, urgent, close to the mic", 0.2),
    ("hook_park", "उसने बरसों पहले एक कसम खाई थी… और आज उस कसम का इम्तिहान था।", "low, intense, leave it hanging", 0.4),
    ("title", "चंद्रशेखर आज़ाद… जिन्होंने कहा था, मुझे कोई ज़िंदा नहीं पकड़ पाएगा।", "proud, strong", 0.4),
    ("court", "ये कहानी शुरू होती है 1921 में, बनारस से। असहयोग आंदोलन में पंद्रह साल का एक लड़का पकड़ा गया।", "calm, inviting", 0.25),
    ("court", "मजिस्ट्रेट ने नाम पूछा — बोला, आज़ाद! पिता का नाम? स्वतंत्रता! घर? जेल!", "bold, cheeky, defiant", 0.4),
    ("lashes", "सज़ा मिली पंद्रह बेंत की… और हर बेंत पर वो बोला — भारत माता की जय!", "pain, then a defiant roar", 0.5),
    ("leader", "बड़े होकर वो क्रांतिकारियों के नेता बने। काकोरी में सरकारी ख़ज़ाना लूटा… भगत सिंह जैसे साथी जुड़े।", "rising, energetic", 0.25),
    ("leader", "पुलिस सालों ढूँढती रही… पर आज़ाद कभी साधु बनकर, कभी किसी और भेस में हाथ से निकल जाते।", "playful, sly", 0.3),
    ("stand", "फिर किसी ने मुख़बिरी कर दी… और आया वो दिन, जिससे कहानी शुरू हुई। घिरे हुए आज़ाद अकेले लड़ते रहे… और साथी को निकल जाने दिया।", "tense, then heroic", 0.3),
    ("stand", "जब आख़िरी गोली बची… तो उन्होंने अपनी कसम निभाई।", "very quiet, slow", 0.6),
    ("twist", "वो जिए आज़ाद… और गए भी आज़ाद। उम्र थी सिर्फ़ चौबीस साल।", "moved, proud", 0.3),
    ("twist", "आज उस पार्क का नाम है चंद्रशेखर आज़ाद पार्क… और उनकी पिस्तौल इलाहाबाद संग्रहालय में रखी है।", "warm, proud", 0.5),
    ("end", "चंद्रशेखर आज़ाद के लिए एक शब्द… कमेंट में लिखिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_park": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"leader": (112, 0.26), "stand": (120, 0.3)}, "pulse": ["hook_park", "court"], "hits": [("hook_park", 1), ("title", 0), ("lashes", 0), ("stand", 1)],
         "rise": [("lashes", 0), ("twist", 0)], "quiet": ["twist"]}
GROUPS = [["hook_park", "title", "court", "lashes"], ["leader", "stand"], ["twist", "end"]]
GROUP_MOOD = ["a tense cold open, then a cheeky, defiant boy",
              "a daring rebel, then a last stand",
              "quiet pride"]
TITLE = "Chandrashekhar Azad - Forever Free"
FILE_NAME = "21 - Chandrashekhar Azad - Alfred Park.mp4"
