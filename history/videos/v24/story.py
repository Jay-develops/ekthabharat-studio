"""Video 24 - Harihara and Bukka, the Sangama brothers who founded the Vijayanagara Empire (1336). Storytelling script (Hindi), under 2 minutes.

The hare legend, the brothers' captivity in Delhi and the role of Vidyaranya come from tradition and later accounts; framed with "कहते हैं / एक कहानी के अनुसार".
Sources: Britannica (Vijayanagar; Harihara I; Bukka I), Wikipedia (Sangama dynasty; Harihara I; Bukka Raya I; Kumara Kampana; Madhura Vijayam; Vidyaranya)."""

LINES = [
 ("hook_hare", "तुंगभद्रा नदी के किनारे शिकार चल रहा था। शिकारी कुत्ते एक खरगोश के पीछे दौड़े…", "storyteller, building", 0.25),
 ("hook_hare", "तभी खरगोश पलटा… और कुत्तों पर ही झपट पड़ा!", "surprised, energetic", 0.5),
 ("title", "ये कहानी है हरिहर और बुक्का की… दो भाई, जिन्होंने विजयनगर साम्राज्य की नींव रखी।", "proud storyteller voice", 0.4),
 ("captive", "चौदहवीं सदी। दक्षिण पर दिल्ली के सुल्तान मुहम्मद बिन तुग़लक़ की फ़ौजें चढ़ आई थीं।", "grave, ominous", 0.25),
 ("captive", "कम्पिली राज्य गिरा… और एक कहानी के अनुसार, दोनों भाई बंदी बनाकर दिल्ली ले जाए गए।", "sad, tense", 0.4),
 ("back", "फिर उन्हें दक्षिण वापस भेजा गया, सुल्तान का राज सँभालने… पर भाइयों के इरादे कुछ और थे।", "sly, building", 0.4),
 ("sage", "कहते हैं, उन्हें राह दिखाई संत विद्यारण्य ने…", "calm, reverent", 0.25),
 ("sage", "और उन्हें याद आया वो खरगोश। जिस धरती का खरगोश भी शिकारी से न डरे… वो वीरों की धरती है।", "proud, goosebumps", 0.4),
 ("found", "1336 में वहीं तुंगभद्रा के किनारे एक नया नगर बसा… विजयनगर, यानी जीत का शहर।", "triumphant, proud", 0.4),
 ("grow", "बुक्का के बेटे कुमार कंपण की सेना मदुरै तक जीतती चली गई…", "energetic", 0.25),
 ("grow", "और उनकी पत्नी गंगादेवी ने इस अभियान पर संस्कृत में एक काव्य लिखा: मधुरा विजयम।", "warm, amazed", 0.4),
 ("twist", "दो भाइयों का छोटा-सा राज्य… दक्षिण का सबसे बड़ा साम्राज्य बना, और दो सौ साल से ज़्यादा चला।", "proud, rising", 0.25),
 ("twist", "और इसी साम्राज्य में आगे चलकर आए… महान कृष्णदेवराय।", "proud, warm", 0.4),
 ("end", "विजयनगर की कौन-सी कहानी आप आगे सुनना चाहेंगे? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_hare": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"captive": (96, 0.24), "grow": (116, 0.3)}, "pulse": ["hook_hare", "back"], "hits": [("hook_hare", 1), ("title", 0), ("found", 0), ("twist", 1)],
         "rise": [("sage", 1), ("found", 0)], "quiet": ["sage"]}
TITLE = "Harihara and Bukka - Founding Vijayanagara"
FILE_NAME = "24 - Harihara Bukka - Vijayanagara 1336.mp4"
