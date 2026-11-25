"""Video 16 - Krishnadevaraya, Hampi and the Battle of Raichur (1520). Storytelling script (Hindi), under 2 minutes.

Hampi "as large as Rome" is from Domingo Paes; the rally at Raichur from Fernão Nunes. Tenali Rama stories are folk tradition.
Sources: Britannica (Krishnadevaraya; Vijayanagar; Battle of Talikota), Wikipedia (Battle of Raichur; Amuktamalyada; Ashtadiggajas), UNESCO (Group of Monuments at Hampi)."""

LINES = [
 ("hook_river", "1520, कृष्णा नदी के किनारे। तोपें गरज रही थीं… और विजयनगर की सेना पीछे हटने लगी।", "tense, urgent", 0.3),
 ("hook_river", "तभी राजा ने ख़ुद घोड़ा आगे बढ़ाया… और सबसे आगे चल पड़ा।", "rising, proud, full power", 0.5),
 ("title", "ये कहानी है कृष्णदेवराय की… और विजयनगर के सुनहरे दौर की।", "proud storyteller voice", 0.4),
 ("hampi", "राजधानी हम्पी… एक विदेशी यात्री ने लिखा: ये शहर रोम जितना बड़ा है।", "grand, amazed", 0.25),
 ("hampi", "बाज़ारों में हीरे और मोती ढेरों में बिकते थे।", "warm, amazed", 0.4),
 ("king", "कृष्णदेवराय: योद्धा भी, कवि भी। तेलुगु में उन्होंने ख़ुद आमुक्तमाल्यदा लिखी।", "proud", 0.25),
 ("king", "और उनके दरबार में थे आठ महान कवि… अष्टदिग्गज।", "proud, warm", 0.4),
 ("raichur", "रायचूर का क़िला बीजापुर के आदिल शाह के पास था… कृष्णदेवराय ने उसे घेर लिया।", "tense, building", 0.25),
 ("raichur", "आदिल शाह तोपें लेकर आया… और नदी किनारे भीषण लड़ाई हुई।", "urgent, exciting", 0.25),
 ("raichur", "राजा के आगे आते ही पासा पलट गया… आदिल शाह भाग खड़ा हुआ, और रायचूर विजयनगर का हो गया।", "triumphant", 0.5),
 ("tenali", "और हाँ… इन्हीं के दरबार से निकलीं तेनालीराम की मशहूर कहानियाँ!", "amused, warm", 0.4),
 ("twist", "पर उनके जाने के कुछ ही दशक बाद, 1565 में हम्पी लूटा गया… और जला दिया गया।", "sad, grave", 0.3),
 ("twist", "आज उसके खंडहर… यूनेस्को की विश्व धरोहर हैं।", "proud, warm, goosebumps", 0.4),
 ("end", "क्या आप कभी हम्पी गए हैं? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_river": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"raichur": (116, 0.3)}, "pulse": ["hook_river"], "hits": [("hook_river", 1), ("title", 0), ("raichur", 2), ("twist", 0)],
         "rise": [("hook_river", 1), ("raichur", 2)], "quiet": ["twist"]}
TITLE = "Krishnadevaraya - The Golden Age of Vijayanagara"
FILE_NAME = "16 - Krishnadevaraya - Vijayanagara.mp4"
