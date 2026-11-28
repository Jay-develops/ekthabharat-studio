"""Video 12 - Netaji Subhas Chandra Bose's escape from Calcutta (16-17 January 1941) and the INA. Storytelling script (Hindi), under 2 minutes.

Sources: Britannica (Subhas Chandra Bose), Wikipedia (Subhas Chandra Bose; Sisir Kumar Bose; Bhagat Ram Talwar; Indian National Army;
Netaji Subhas Chandra Bose Gomoh railway station), Netaji Research Bureau (the Wanderer car at Netaji Bhawan)."""

LINES = [
    ("hook_house", "1941, कोलकाता। घर के बाहर अंग्रेज़ जासूसों का पहरा… और अंदर से निकला एक पठान।", "hushed, tense, close to the mic", 0.15),
    ("hook_house", "जासूसों ने उसे देखा, और जाने दिया। ये उनकी सबसे बड़ी भूल थी।", "suspense, a sly smile in the voice", 0.2),
    ("title", "क्योंकि वो पठान थे — नेताजी सुभाष चंद्र बोस!", "a proud reveal", 0.3),
    ("arrest", "अंग्रेज़ों ने उन्हें घर में नज़रबंद किया था। हर आने-जाने वाले पर नज़र।", "tense, serious", 0.15),
    ("arrest", "नेताजी ने ऐलान किया — अब मैं किसी से नहीं मिलूँगा। और बंद कमरे में दाढ़ी बढ़ने लगी।", "secretive, a plan forming", 0.25),
    ("car", "फिर एक रात भतीजा शिशिर गाड़ी लेकर आया, और गाड़ी सीधे पहुँची बिहार के गोमो स्टेशन।", "fast, urgent, whispered", 0.15),
    ("car", "अब वो थे मोहम्मद ज़ियाउद्दीन, बीमा एजेंट। ट्रेन पकड़ी, और सीधे पेशावर।", "quick, confident", 0.2),
    ("pass", "आगे पहाड़, पैदल। यहाँ उन्होंने गूँगे-बहरे पठान का भेस बनाया, ताकि बोली से पकड़े न जाएँ।", "tense, clever", 0.15),
    ("pass", "बर्फ़ीले दर्रे, क़बीलों का इलाक़ा। एक ग़लती, और खेल ख़त्म। पर वो काबुल पहुँच गए।", "dangerous, then relief", 0.2),
    ("pass", "और कोलकाता में? दस दिन तक अंग्रेज़ों को पता ही नहीं चला कि कमरा ख़ाली है!", "amused, triumphant", 0.3),
    ("berlin", "काबुल से नया पासपोर्ट, नया नाम — ओरलांडो मज़ोत्ता। और फिर, बर्लिन।", "brisk, adventurous", 0.15),
    ("berlin", "फिर पनडुब्बी में आधी दुनिया का समंदर पार करके, वापस एशिया।", "awe, rising", 0.2),
    ("ina", "वहाँ आज़ाद हिंद फ़ौज की कमान सँभाली, और वो नारा दिया जो आज भी गूँजता है —", "building, rising intensity", 0.15),
    ("ina", "तुम मुझे ख़ून दो… मैं तुम्हें आज़ादी दूँगा!", "a commander's roar, full power and passion", 0.5),
    ("twist", "जिस गाड़ी में वो उस रात निकले थे, वो आज भी कोलकाता के नेताजी भवन में खड़ी है।", "a reveal, warm", 0.2),
    ("twist", "और गोमो स्टेशन का नाम आज है — नेताजी सुभाष चंद्र बोस जंक्शन।", "proud, slow", 0.3),
    ("end", "पर सबसे बड़ा सवाल आज भी बाक़ी है — क्या 1945 के प्लेन हादसे में सच में नेताजी की मौत हुई थी? कमेंट में लिखिए, हाँ या ना।", "warm, friendly", 0.6),
]

SCENE_LEAD = {"hook_house": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"car": (104, 0.22), "ina": (96, 0.3)}, "pulse": ["hook_house", "pass"],
         "hits": [("hook_house", 1), ("title", 0), ("ina", 1)], "rise": [("ina", 1), ("twist", 1)], "quiet": []}
GROUPS = [["hook_house", "title", "arrest", "car"], ["pass", "berlin"], ["ina", "twist", "end"]]
GROUP_MOOD = ["a spy-thriller cold open, then secretive suspense",
              "danger in the mountains, relief, then a breathless adventure",
              "a rising call to arms, then warm, proud reveals"]
TITLE = "Netaji Subhas Chandra Bose - The Great Escape"
FILE_NAME = "12 - Netaji Subhas Chandra Bose - Great Escape.mp4"
