"""Video 11 - Rajendra Chola I and the naval expedition to Srivijaya (c. 1025 CE). Storytelling script (Hindi), under 2 minutes.

Sources: Britannica (Rajendra I; Chola dynasty; Srivijaya), Wikipedia (Chola invasion of Srivijaya; Gangaikonda Cholapuram; Lobu Tua inscription),
UNESCO (Great Living Chola Temples)."""

LINES = [
 ("hook_sea", "1025 ईस्वी। बंगाल की खाड़ी में सैकड़ों जहाज़… और हर पाल पर एक बाघ का निशान।", "tense, grand", 0.3),
 ("hook_sea", "हज़ारों किलोमीटर दूर एक साम्राज्य सो रहा था… उसे अंदाज़ा भी नहीं था कि क्या आने वाला है।", "hushed, ominous", 0.5),
 ("title", "ये कहानी है राजेंद्र चोल की… वो भारतीय राजा, जिसकी नौसेना ने समंदर पार जाकर जीत हासिल की।", "proud storyteller voice", 0.4),
 ("father", "उनके पिता राजराज चोल ने तंजावुर का विशाल बृहदेश्वर मंदिर बनवाया था।", "grand, calm", 0.25),
 ("father", "पर बेटा… पिता से भी आगे निकला।", "proud, a knowing smile", 0.4),
 ("ganga", "उसकी सेना उत्तर में गंगा तक गई… और जीत की निशानी के तौर पर गंगाजल लेकर लौटी।", "energetic, proud", 0.25),
 ("ganga", "इसीलिए वो कहलाए गंगैकोंड चोल… और बसाई नई राजधानी, गंगैकोंड चोलपुरम।", "proud", 0.4),
 ("srivijaya", "उधर समंदर में श्रीविजय साम्राज्य, आज के इंडोनेशिया और मलेशिया का इलाक़ा… व्यापार के रास्ते रोक रहा था।", "tense, serious", 0.25),
 ("srivijaya", "तो राजेंद्र ने वो किया जो उस दौर में लगभग नामुमकिन था… पूरी सेना को जहाज़ों पर चढ़ा दिया।", "rising, exciting", 0.4),
 ("attack", "बंगाल की खाड़ी पार… एक के बाद एक बंदरगाह गिरते गए।", "energetic, exciting", 0.25),
 ("attack", "कडारम, आज का केदाह, जीत लिया गया… और श्रीविजय का राजा बंदी बना।", "triumphant", 0.5),
 ("legacy", "समंदर के रास्ते फिर खुल गए… और दक्षिण-पूर्व एशिया तक भारत का व्यापार फैल गया।", "proud, warm", 0.3),
 ("twist", "आज भी सुमात्रा में तमिल व्यापारियों का नौ सौ साल पुराना शिलालेख मिलता है…", "a sly reveal, intriguing", 0.25),
 ("twist", "और गंगैकोंड चोलपुरम का मंदिर… यूनेस्को की विश्व धरोहर है।", "proud, goosebumps", 0.4),
 ("end", "क्या आपको पता था कि हज़ार साल पहले भारत की नौसेना ने समंदर पार जीत हासिल की थी? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_sea": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"ganga": (90, 0.22), "attack": (116, 0.32)}, "pulse": ["hook_sea", "srivijaya"],
         "hits": [("hook_sea", 0), ("title", 0), ("attack", 1)], "rise": [("attack", 0), ("twist", 1)], "quiet": ["legacy"]}
TITLE = "Rajendra Chola - India's Navy 1000 Years Ago"
FILE_NAME = "11 - Rajendra Chola - Samudra Vijay.mp4"
