"""Video 12 - Netaji Subhas Chandra Bose's escape from Calcutta (16-17 January 1941) and the INA. Storytelling script (Hindi), under 2 minutes.

Sources: Britannica (Subhas Chandra Bose), Wikipedia (Subhas Chandra Bose; Sisir Kumar Bose; Bhagat Ram Talwar; Indian National Army;
Netaji Subhas Chandra Bose Gomoh railway station), Netaji Research Bureau (the Wanderer car at Netaji Bhawan)."""

LINES = [
 ("hook_house", "17 जनवरी 1941, रात डेढ़ बजे। कोलकाता के एक घर के बाहर अंग्रेज़ जासूसों का पहरा…", "hushed, tense", 0.3),
 ("hook_house", "और अंदर से निकलता है लंबी दाढ़ी वाला एक पठान… जो चुपचाप एक गाड़ी में बैठ जाता है।", "suspense, slow", 0.5),
 ("title", "ये कहानी है नेताजी सुभाष चंद्र बोस की… उनके सबसे बड़े फ़रार की।", "proud storyteller voice", 0.4),
 ("arrest", "अंग्रेज़ों ने उन्हें घर में नज़रबंद कर रखा था। बाहर जासूस, हर आने-जाने वाले पर नज़र।", "tense", 0.25),
 ("arrest", "नेताजी ने ऐलान किया: अब मैं किसी से नहीं मिलूँगा… और चुपचाप दाढ़ी बढ़ाने लगे।", "sly", 0.4),
 ("car", "उस रात भतीजा शिशिर गाड़ी चला रहा था… और गाड़ी रुकी, बिहार के गोमो स्टेशन पर।", "exciting, building", 0.25),
 ("car", "अब वो थे मोहम्मद ज़ियाउद्दीन, एक बीमा एजेंट… ट्रेन पकड़ी, सीधे पेशावर।", "energetic", 0.4),
 ("pass", "वहाँ से पहाड़ों के रास्ते, पैदल… अफ़ग़ानिस्तान। अब वो बने एक गूँगे-बहरे पठान… ताकि भाषा से पहचाने न जाएँ।", "tense", 0.25),
 ("pass", "बर्फ़ीले दर्रे, क़बीलों का इलाक़ा… पर वो काबुल पहुँच गए।", "urgent, then relieved", 0.25),
 ("pass", "और कोलकाता में? दस दिन तक अंग्रेज़ों को पता ही नहीं चला कि घर ख़ाली है!", "amused, sly", 0.4),
 ("berlin", "काबुल से नया पासपोर्ट, नया नाम… और मॉस्को होते हुए, बर्लिन।", "energetic", 0.25),
 ("berlin", "फिर एक पनडुब्बी में आधी दुनिया का समंदर पार करके… वापस एशिया।", "exciting, grand", 0.4),
 ("ina", "वहाँ उन्होंने आज़ाद हिंद फ़ौज की कमान सँभाली… और नारा दिया:", "rising", 0.2),
 ("ina", "तुम मुझे ख़ून दो… मैं तुम्हें आज़ादी दूँगा!", "a commander's roar, full power", 0.6),
 ("twist", "जिस गाड़ी में वो उस रात निकले थे, वो आज भी कोलकाता के नेताजी भवन में रखी है।", "warm reveal", 0.25),
 ("twist", "और गोमो स्टेशन का नाम आज है… नेताजी सुभाष चंद्र बोस जंक्शन।", "proud, goosebumps", 0.4),
 ("end", "नेताजी की कौन-सी बात आपको सबसे ज़्यादा प्रेरित करती है? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_house": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"car": (104, 0.22), "ina": (96, 0.3)}, "pulse": ["hook_house", "pass"],
         "hits": [("hook_house", 1), ("title", 0), ("ina", 1)], "rise": [("ina", 1), ("twist", 1)], "quiet": []}
TITLE = "Netaji Subhas Chandra Bose - The Great Escape"
FILE_NAME = "12 - Netaji Subhas Chandra Bose - Great Escape.mp4"
