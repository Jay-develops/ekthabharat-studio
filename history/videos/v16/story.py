"""Video 16 - Krishnadevaraya, Hampi and the Battle of Raichur (1520). Storytelling script (Hindi), under 2 minutes.

Hampi "as large as Rome" is from Domingo Paes; the rally at Raichur from Fernão Nunes. Tenali Rama stories are folk tradition.
Sources: Britannica (Krishnadevaraya; Vijayanagar; Battle of Talikota), Wikipedia (Battle of Raichur; Amuktamalyada; Ashtadiggajas), UNESCO (Group of Monuments at Hampi)."""

LINES = [
    ("hook_river", "दुश्मन की तोपें गरज रही थीं… और राजा की सेना पीछे भागने लगी।", "urgent, tense, close to the mic", 0.2),
    ("hook_river", "तभी राजा ने वो किया, जो कोई राजा नहीं करता — ख़ुद घोड़ा आगे बढ़ाया… और सबसे आगे चल पड़ा।", "rising, goosebumps", 0.25),
    ("hook_river", "उस दिन क्या हुआ? पहले जानिए… ये राजा था कौन।", "intriguing, leave it hanging", 0.4),
    ("title", "कृष्णदेवराय… वो राजा, जिसके राज में बाज़ारों में हीरे ढेरों में बिकते थे।", "proud, warm", 0.4),
    ("hampi", "राजधानी हम्पी… एक विदेशी यात्री ने लिखा — ये शहर रोम जितना बड़ा है।", "awe, wonder", 0.25),
    ("hampi", "हम्पी के बाज़ारों में हीरे और मोती… सब्ज़ी की तरह ढेरों में बिकते थे।", "amazed, a smile in the voice", 0.3),
    ("king", "और कृष्णदेवराय सिर्फ़ योद्धा नहीं थे… कवि भी थे। तेलुगु में उन्होंने ख़ुद आमुक्तमाल्यदा लिखी।", "admiring", 0.25),
    ("king", "उनके दरबार में थे आठ महान कवि… अष्टदिग्गज।", "proud", 0.4),
    ("raichur", "रायचूर का क़िला बीजापुर के आदिल शाह के पास था… कृष्णदेवराय ने उसे घेर लिया।", "serious, building", 0.25),
    ("raichur", "आदिल शाह तोपें लेकर आया… और कृष्णा नदी के किनारे भीषण लड़ाई छिड़ी। विजयनगर की सेना डगमगाने लगी।", "fast, tense", 0.25),
    ("raichur", "और यहीं वो पल आया, जिससे कहानी शुरू हुई — राजा ख़ुद सबसे आगे! पासा पलट गया… आदिल शाह भाग खड़ा हुआ, और रायचूर विजयनगर का हो गया।", "rising, triumphant, full power", 0.4),
    ("tenali", "और हाँ… इन्हीं के दरबार से निकलीं तेनालीराम की मशहूर कहानियाँ!", "playful, warm", 0.4),
    ("twist", "पर उनके जाने के कुछ ही दशक बाद, 1565 में… हम्पी लूटा गया, और जला दिया गया।", "sad, grave", 0.3),
    ("twist", "आज उसके खंडहर यूनेस्को की विश्व धरोहर हैं… और पत्थरों में आज भी वो सुनहरा दौर दिखता है।", "wistful, proud", 0.5),
    ("end", "क्या आप कभी हम्पी गए हैं? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_river": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"raichur": (116, 0.3)}, "pulse": ["hook_river"], "hits": [("hook_river", 1), ("title", 0), ("raichur", 2), ("twist", 0)],
         "rise": [("hook_river", 1), ("raichur", 2)], "quiet": ["twist"]}
GROUPS = [["hook_river", "title", "hampi", "king"], ["raichur", "tenali"], ["twist", "end"]]
GROUP_MOOD = ["a battlefield cold open, then wonder at a golden city",
              "a siege, a wavering army, then a king's charge and triumph",
              "a wistful ending"]
TITLE = "Krishnadevaraya - The Golden Age of Vijayanagara"
FILE_NAME = "16 - Krishnadevaraya - Vijayanagara.mp4"
