"""Video 11 - Rajendra Chola I and the naval expedition to Srivijaya (c. 1025 CE). Storytelling script (Hindi), under 2 minutes.

Sources: Britannica (Rajendra I; Chola dynasty; Srivijaya), Wikipedia (Chola invasion of Srivijaya; Gangaikonda Cholapuram; Lobu Tua inscription),
UNESCO (Great Living Chola Temples)."""

LINES = [
    ("hook_sea", "हज़ार साल पहले… एक भारतीय राजा ने अपनी पूरी सेना जहाज़ों पर चढ़ा दी।", "sudden, bold, a big claim, close to the mic", 0.2),
    ("hook_sea", "और समंदर पार, हज़ारों किलोमीटर दूर एक साम्राज्य सो रहा था… उसे अंदाज़ा भी नहीं था कि क्या आने वाला है।", "ominous, building", 0.3),
    ("hook_sea", "पर ये राजा था कौन… और उसने ऐसा क्यों किया?", "intriguing, leave it hanging", 0.4),
    ("title", "राजेंद्र चोल… वो राजा, जिसकी नौसेना ने समंदर पार जाकर एक साम्राज्य को हरा दिया।", "proud, strong", 0.4),
    ("father", "उनके पिता राजराज चोल कोई मामूली राजा नहीं थे… तंजावुर का विशाल बृहदेश्वर मंदिर उन्हीं ने बनवाया।", "admiring, warm", 0.25),
    ("father", "पर बेटा… पिता से भी आगे निकला।", "a knowing smile, slow", 0.4),
    ("ganga", "राजेंद्र की सेना उत्तर में गंगा तक गई… और जीत की निशानी के तौर पर, गंगाजल भरकर लौटी।", "proud, rising", 0.25),
    ("ganga", "इसीलिए उन्हें कहा गया गंगैकोंड चोल… यानी गंगा को जीतने वाला। और बसी नई राजधानी, गंगैकोंड चोलपुरम।", "triumphant", 0.4),
    ("srivijaya", "पर असली चुनौती ज़मीन पर नहीं, समंदर में थी। श्रीविजय साम्राज्य, आज के इंडोनेशिया-मलेशिया का इलाक़ा… भारत के व्यापार का रास्ता रोक रहा था।", "serious, a new threat", 0.3),
    ("srivijaya", "तो राजेंद्र ने वो किया जो उस दौर में लगभग नामुमकिन था… पूरी सेना को जहाज़ों पर चढ़ा दिया।", "bold, goosebumps", 0.4),
    ("attack", "हफ़्तों का सफ़र… अनजान पानी… और फिर एक सुबह, क्षितिज पर दिखा दुश्मन का पहला बंदरगाह।", "hushed suspense, then rising", 0.2),
    ("attack", "हमला! एक के बाद एक बंदरगाह गिरते गए… कडारम, आज का केदाह, जीत लिया गया… और श्रीविजय का राजा बंदी बना।", "explosive, fast, triumphant", 0.5),
    ("legacy", "समंदर के रास्ते फिर खुल गए… और दक्षिण-पूर्व एशिया तक भारत का व्यापार फैल गया।", "calm, proud", 0.3),
    ("twist", "और इसका सबूत? सुमात्रा में आज भी तमिल व्यापारियों का नौ सौ साल पुराना शिलालेख मिलता है।", "a reveal, amazed", 0.3),
    ("twist", "और गंगैकोंड चोलपुरम का वो मंदिर… आज यूनेस्को की विश्व धरोहर है।", "proud, slow", 0.5),
    ("end", "हज़ार साल पहले की ये नौसेना… क्या आपको स्कूल में किसी ने बताया था? कमेंट में लिखिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_sea": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"ganga": (90, 0.22), "attack": (116, 0.32)}, "pulse": ["hook_sea", "srivijaya"],
         "hits": [("hook_sea", 0), ("title", 0), ("attack", 1)], "rise": [("attack", 0), ("twist", 1)], "quiet": ["legacy"]}
GROUPS = [["hook_sea", "title", "father", "ganga"], ["srivijaya", "attack"], ["legacy", "twist", "end"]]
GROUP_MOOD = ["a bold cold open, then proud, warm storytelling",
              "a new threat, a daring plan, suspense at sea, then an explosive attack",
              "calm pride, then amazed reveals"]
TITLE = "Rajendra Chola - India's Navy 1000 Years Ago"
FILE_NAME = "11 - Rajendra Chola - Samudra Vijay.mp4"
