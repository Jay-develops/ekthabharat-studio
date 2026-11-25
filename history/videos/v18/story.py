"""Video 18 - Peshwa Bajirao I: Palkhed (1728), Bundelkhand, and the raid on Delhi (1737). Storytelling script (Hindi), under 2 minutes.

"Never lost a battle" and Montgomery's praise of Palkhed are common claims; framed with "कहा जाता है / कहते हैं".
Sources: Britannica (Baji Rao I), Wikipedia (Baji Rao I; Battle of Palkhed; Battle of Delhi (1737); Raverkhedi)."""

LINES = [
 ("hook_delhi", "मार्च 1737। दिल्ली के लाल क़िले में अफ़रा-तफ़री… बादशाह को ख़बर मिली:", "tense, hushed", 0.2),
 ("hook_delhi", "मराठा घुड़सवार दिल्ली के दरवाज़े तक आ पहुँचे हैं!", "urgent, shouting", 0.5),
 ("title", "ये कहानी है पेशवा बाजीराव की… जिनके बारे में कहा जाता है, वो कभी कोई लड़ाई नहीं हारे।", "proud storyteller voice", 0.4),
 ("young", "सिर्फ़ बीस साल की उम्र में छत्रपति शाहू ने उन्हें पेशवा बना दिया।", "proud", 0.25),
 ("young", "दरबार के बड़े-बड़े सरदार हँसे… एक लड़का?", "sly, mocking", 0.4),
 ("speed", "पर बाजीराव का हथियार था रफ़्तार। हल्की घुड़सवार फ़ौज… घोड़े पर ही खाना, घोड़े पर ही आराम।", "energetic", 0.25),
 ("speed", "दुश्मन एक जगह तैयारी करता… और बाजीराव कहीं और से आ धमकते।", "clever, a knowing smile", 0.4),
 ("palkhed", "1728, पालखेड़। ताक़तवर निज़ाम को उन्होंने ऐसा घेरा कि रसद और पानी कट गए… और उसे संधि करनी पड़ी।", "triumphant", 0.25),
 ("palkhed", "कहते हैं, दो सौ साल बाद अंग्रेज़ फ़ील्ड मार्शल मोंटगोमरी ने भी इसे रणनीति की मिसाल माना।", "proud, amused", 0.4),
 ("bundel", "बुंदेलखंड में बूढ़े राजा छत्रसाल घिरे हुए थे… बाजीराव पहुँचे, और घेरा तोड़ दिया।", "energetic, triumphant", 0.4),
 ("raid", "और 1737 में… मुग़लों को अपनी ताक़त दिखाने, बिजली की रफ़्तार से सीधे दिल्ली जा पहुँचे।", "rising, exciting", 0.25),
 ("raid", "बादशाह ने क़िले के दरवाज़े बंद करवा लिए… और बाजीराव अपना संदेश देकर लौट गए।", "proud, amused", 0.5),
 ("twist", "पर 1740 में नर्मदा किनारे, सिर्फ़ 39 साल की उम्र में… एक तेज़ बुख़ार ने वो कर दिया, जो कोई दुश्मन नहीं कर पाया।", "sad, slow", 0.3),
 ("twist", "रावेरखेड़ी में आज भी उनकी समाधि है।", "warm, gentle", 0.4),
 ("end", "आपके हिसाब से बाजीराव की सबसे बड़ी ताक़त क्या थी? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_delhi": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"speed": (126, 0.3), "palkhed": (108, 0.24), "bundel": (116, 0.28), "raid": (128, 0.32)}, "pulse": ["hook_delhi"],
         "hits": [("hook_delhi", 1), ("title", 0), ("raid", 1)], "rise": [("hook_delhi", 1), ("raid", 0)], "quiet": ["twist"]}
TITLE = "Peshwa Bajirao - The Lightning Raid on Delhi"
FILE_NAME = "18 - Peshwa Bajirao - Delhi 1737.mp4"
