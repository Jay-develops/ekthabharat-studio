"""Video 27 - Hemu (Hemchandra Vikramaditya): from Rewari trader to king of Delhi, and the Second Battle of Panipat (5 November 1556). Storytelling script (Hindi), under 2 minutes.

"Won 22 battles" is the commonly repeated claim; framed with "कहा जाता है".
Sources: Britannica (Hemu; Battles of Panipat), Wikipedia (Hemu; Second Battle of Panipat; Battle of Delhi (1556))."""

LINES = [
 ("hook_eye", "5 नवंबर 1556, पानीपत। हाथी पर सवार एक सेनापति, जीत के बेहद क़रीब था…", "tense, building", 0.25),
 ("hook_eye", "तभी एक तीर आया… सीधा उसकी आँख में।", "shock, sharp", 0.5),
 ("title", "ये कहानी है हेमू की… जो एक साधारण व्यापारी से दिल्ली का राजा बना।", "proud storyteller voice", 0.4),
 ("trader", "हरियाणा के रेवाड़ी का हेमू, शुरू में रसद और शोरे का व्यापारी था।", "calm storytelling", 0.25),
 ("trader", "सूर वंश के दरबार में अपनी समझ से वो ऊपर उठता गया… पहले मंत्री, फिर सेनापति।", "warm, rising", 0.25),
 ("trader", "कहा जाता है, उसने लगातार बाईस लड़ाइयाँ जीतीं।", "proud", 0.4),
 ("delhi", "1556 में हुमायूँ की मौत के बाद, हेमू ने आगरा और फिर दिल्ली जीत ली।", "triumphant", 0.25),
 ("delhi", "पुराने क़िले में उसका राज्याभिषेक हुआ… नाम रखा: राजा विक्रमादित्य।", "proud, grand", 0.4),
 ("panipat", "एक महीने बाद पानीपत में सामने थी तेरह साल के अकबर की सेना… कमान बैरम ख़ान के हाथ में।", "ominous", 0.25),
 ("panipat", "हेमू अपने हाथी हवाई पर बैठा लड़ रहा था… और मुग़ल सेना पीछे हटने लगी थी।", "energetic, exciting", 0.4),
 ("arrow", "तभी वो तीर लगा। हेमू बेहोश होकर हौदे में गिर पड़ा… सेना ने समझा राजा नहीं रहा, और भगदड़ मच गई।", "urgent, then sad", 0.25),
 ("arrow", "जीती हुई लड़ाई… पल भर में हार बन गई।", "grave, slow", 0.5),
 ("twist", "हेमू पकड़ा गया और मार दिया गया। एक तीर… और शायद पूरे भारत का इतिहास बदल गया।", "deep, goosebumps", 0.4),
 ("end", "अगर वो तीर न लगता, तो क्या होता? कमेंट में बताइए।", "warm, curious", 0.8),
]

SCENE_LEAD = {"hook_eye": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"panipat": (122, 0.32), "delhi": (100, 0.22)}, "pulse": ["hook_eye", "trader"], "hits": [("hook_eye", 1), ("title", 0), ("arrow", 0), ("twist", 0)],
         "rise": [("panipat", 1), ("twist", 0)], "quiet": ["arrow"]}
TITLE = "Hemu - The Arrow That Changed History"
FILE_NAME = "27 - Hemu - Panipat 1556.mp4"
