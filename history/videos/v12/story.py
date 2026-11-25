"""Video 12 - Netaji Subhas Chandra Bose's escape from Calcutta (16-17 January 1941) and the INA. Storytelling script (Hindi), under 2 minutes.

Sources: Britannica (Subhas Chandra Bose), Wikipedia (Subhas Chandra Bose; Sisir Kumar Bose; Bhagat Ram Talwar; Indian National Army;
Netaji Subhas Chandra Bose Gomoh railway station), Netaji Research Bureau (the Wanderer car at Netaji Bhawan)."""

LINES = [
    ("hook_house", "घर के बाहर अंग्रेज़ जासूसों का पहरा… और अंदर से निकला एक पठान। लंबी दाढ़ी, ढीला कुर्ता।", "hushed, tense, close to the mic", 0.2),
    ("hook_house", "जासूसों ने उसे देखा… और जाने दिया। उन्हें अंदाज़ा भी नहीं था कि वो किसे जाने दे रहे हैं।", "suspense, a sly smile in the voice", 0.4),
    ("title", "वो पठान थे… नेताजी सुभाष चंद्र बोस। और ये है उनके सबसे बड़े फ़रार की कहानी।", "a proud reveal", 0.4),
    ("arrest", "अंग्रेज़ों ने उन्हें घर में नज़रबंद कर रखा था। बाहर जासूस… हर आने-जाने वाले पर नज़र।", "tense, serious", 0.25),
    ("arrest", "तो नेताजी ने ऐलान किया — अब मैं किसी से नहीं मिलूँगा। कमरे का दरवाज़ा बंद… और अंदर, चुपचाप दाढ़ी बढ़ने लगी।", "secretive, a plan forming", 0.4),
    ("car", "फिर आई वो रात। भतीजा शिशिर स्टीयरिंग पर… गाड़ी अँधेरे में निकली, और रुकी सीधे बिहार के गोमो स्टेशन पर।", "fast, urgent, whispered", 0.25),
    ("car", "अब वो थे मोहम्मद ज़ियाउद्दीन, एक बीमा एजेंट। ट्रेन पकड़ी… और सीधे पेशावर।", "quick, confident", 0.3),
    ("pass", "आगे का रास्ता पहाड़ों से, पैदल। और यहाँ उन्होंने फिर रूप बदला — एक गूँगा-बहरा पठान, ताकि बोली से पकड़े न जाएँ।", "tense, clever", 0.25),
    ("pass", "बर्फ़ीले दर्रे, क़बीलों का इलाक़ा… एक ग़लत क़दम, और सब ख़त्म। पर वो काबुल पहुँच गए।", "dangerous, then relief", 0.3),
    ("pass", "और कोलकाता में? दस दिन तक अंग्रेज़ों को पता ही नहीं चला कि कमरा ख़ाली है!", "amused, triumphant", 0.4),
    ("berlin", "काबुल से नया पासपोर्ट, नया नाम — ओरलांडो मज़ोत्ता… और मॉस्को होते हुए, बर्लिन।", "brisk, adventurous", 0.25),
    ("berlin", "फिर एक पनडुब्बी में आधी दुनिया का समंदर पार करके… वापस एशिया।", "awe, rising", 0.3),
    ("ina", "वहाँ उन्होंने आज़ाद हिंद फ़ौज की कमान सँभाली… और हज़ारों सैनिकों के सामने वो नारा दिया, जो आज भी गूँजता है —", "building, rising intensity", 0.25),
    ("ina", "तुम मुझे ख़ून दो… मैं तुम्हें आज़ादी दूँगा!", "a commander's roar, full power and passion", 0.7),
    ("twist", "और वो गाड़ी, जिसमें नेताजी उस रात निकले थे? आज भी कोलकाता के नेताजी भवन में खड़ी है।", "a reveal, warm", 0.3),
    ("twist", "और गोमो स्टेशन का नाम आज है… नेताजी सुभाष चंद्र बोस जंक्शन।", "proud, slow", 0.5),
    ("end", "नेताजी की कौन-सी बात आपको सबसे ज़्यादा प्रेरित करती है? कमेंट में बताइए।", "warm, friendly", 0.8),
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
