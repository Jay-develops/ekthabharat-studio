"""Video 18 - Peshwa Bajirao I: Palkhed (1728), Bundelkhand, and the raid on Delhi (1737). Storytelling script (Hindi), under 2 minutes.

"Never lost a battle" and Montgomery's praise of Palkhed are common claims; framed with "कहा जाता है / कहते हैं".
Sources: Britannica (Baji Rao I), Wikipedia (Baji Rao I; Battle of Palkhed; Battle of Delhi (1737); Raverkhedi)."""

LINES = [
    ("hook_delhi", "दिल्ली के लाल क़िले में अफ़रा-तफ़री… बादशाह के पास एक ख़बर पहुँची, जिस पर किसी को यक़ीन नहीं हुआ।", "urgent, tense, close to the mic", 0.2),
    ("hook_delhi", "मराठा घुड़सवार… दिल्ली के दरवाज़े तक आ पहुँचे हैं!", "a panicked shout", 0.3),
    ("hook_delhi", "और उनका सेनापति… वो आदमी था, जिसे कहते हैं कोई लड़ाई नहीं हरा पाई।", "proud, intriguing", 0.4),
    ("title", "पेशवा बाजीराव… रफ़्तार का दूसरा नाम।", "proud, strong", 0.4),
    ("young", "सिर्फ़ बीस साल की उम्र में छत्रपति शाहू ने उन्हें पेशवा बना दिया।", "admiring", 0.25),
    ("young", "दरबार के बड़े-बड़े सरदार हँसे… एक लड़का? उन्हें जल्द पता चलने वाला था।", "mocking, then a knowing smile", 0.4),
    ("speed", "बाजीराव का हथियार था रफ़्तार। हल्की घुड़सवार फ़ौज… घोड़े पर ही खाना, घोड़े पर ही आराम।", "brisk, energetic", 0.25),
    ("speed", "दुश्मन एक जगह तैयारी करता… और बाजीराव कहीं और से आ धमकते।", "playful, fast", 0.3),
    ("palkhed", "1728, पालखेड़। ताक़तवर निज़ाम को उन्होंने ऐसा घेरा कि रसद और पानी कट गए… और उसे संधि करनी पड़ी।", "clever, triumphant", 0.25),
    ("palkhed", "कहते हैं, दो सौ साल बाद अंग्रेज़ फ़ील्ड मार्शल मोंटगोमरी ने भी इसे रणनीति की मिसाल माना।", "impressed, proud", 0.3),
    ("bundel", "बुंदेलखंड में बूढ़े राजा छत्रसाल घिरे हुए थे… बाजीराव पहुँचे, और घेरा तोड़ दिया।", "urgent, then triumphant", 0.25),
    ("bundel", "ख़ुश होकर छत्रसाल ने अपने राज्य का एक हिस्सा बाजीराव को दे दिया।", "warm", 0.3),
    ("raid", "और 1737 में… मुग़लों को अपनी ताक़त दिखाने, बिजली की रफ़्तार से सीधे दिल्ली जा पहुँचे। यही था वो दिन, जिससे कहानी शुरू हुई।", "fast, thrilling, rising", 0.25),
    ("raid", "बादशाह ने क़िले के दरवाज़े बंद करवा लिए… और बाजीराव अपना संदेश देकर लौट गए।", "triumphant, a little amused", 0.4),
    ("twist", "पर 1740 में नर्मदा किनारे, सिर्फ़ 39 साल की उम्र में… एक तेज़ बुख़ार ने वो कर दिया, जो कोई दुश्मन नहीं कर पाया।", "sad, slow", 0.3),
    ("twist", "रावेरखेड़ी में आज भी उनकी समाधि है… एक योद्धा, जिसे मैदान में कोई नहीं हरा पाया।", "wistful, proud", 0.5),
    ("end", "आपके हिसाब से बाजीराव की सबसे बड़ी ताक़त क्या थी? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_delhi": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"speed": (126, 0.3), "palkhed": (108, 0.24), "bundel": (116, 0.28), "raid": (128, 0.32)}, "pulse": ["hook_delhi"],
         "hits": [("hook_delhi", 1), ("title", 0), ("raid", 1)], "rise": [("hook_delhi", 1), ("raid", 0)], "quiet": ["twist"]}
GROUPS = [["hook_delhi", "title", "young", "speed"], ["palkhed", "bundel", "raid"], ["twist", "end"]]
GROUP_MOOD = ["a panicked cold open, then playful, energetic storytelling",
              "clever victories, then a thrilling lightning raid",
              "a sad, wistful ending"]
TITLE = "Peshwa Bajirao - The Lightning Raid on Delhi"
FILE_NAME = "18 - Peshwa Bajirao - Delhi 1737.mp4"
