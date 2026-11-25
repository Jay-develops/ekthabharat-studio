"""Video 25 - Khudiram Bose and the Muzaffarpur bomb (30 April 1908). Storytelling script (Hindi), under 2 minutes.

"He walked to the gallows smiling" is the popular account; framed with "कहते हैं". The bomb killed two British women by mistake; the script says so plainly.
Sources: Britannica (Khudiram Bose), Wikipedia (Khudiram Bose; Prafulla Chaki; Muzaffarpur bombing; Douglas Kingsford)."""

LINES = [
 ("hook_carriage", "30 अप्रैल 1908, बिहार का मुज़फ़्फ़रपुर। अँधेरे में दो लड़के एक बग्घी का इंतज़ार कर रहे थे…", "hushed, tense", 0.25),
 ("hook_carriage", "हाथ में एक बम… और निशाने पर एक अंग्रेज़ जज।", "tense, slow", 0.5),
 ("title", "ये कहानी है खुदीराम बोस की… भारत के सबसे कम उम्र के शहीदों में से एक।", "proud storyteller voice", 0.4),
 ("boy", "बंगाल के मिदनापुर का एक लड़का। सोलह साल की उम्र में अंग्रेज़ों के ख़िलाफ़ पर्चे बाँटते पकड़ा गया… और छूटकर भाग निकला।", "energetic, warm", 0.4),
 ("judge", "कलकत्ता का मजिस्ट्रेट किंग्सफ़ोर्ड, क्रांतिकारियों को कड़ी सज़ाएँ देने के लिए बदनाम था।", "grave, bitter", 0.25),
 ("judge", "उसका तबादला मुज़फ़्फ़रपुर हुआ… और खुदीराम व प्रफुल्ल चाकी उसके पीछे वहाँ पहुँच गए।", "tense, building", 0.4),
 ("bomb", "उन्होंने बग्घी पर बम फेंका… पर उसमें किंग्सफ़ोर्ड नहीं थे। दो अंग्रेज़ महिलाओं की जान चली गई।", "grave, heavy", 0.5),
 ("chase", "पुलिस पीछे पड़ी। प्रफुल्ल चाकी घिरने पर शहीद हो गए…", "urgent, sad", 0.25),
 ("chase", "और खुदीराम रात भर पैदल चलकर वैनी स्टेशन पहुँचे, जहाँ उन्हें पकड़ लिया गया।", "tense", 0.4),
 ("trial", "अदालत में वो डरे नहीं। 11 अगस्त 1908 को उन्हें फाँसी दी गई… उम्र थी सिर्फ़ अठारह साल।", "grave, slow", 0.5),
 ("twist", "कहते हैं, वो मुस्कुराते हुए फाँसी तक गए।", "emotional, proud", 0.25),
 ("twist", "और बंगाल के जुलाहे धोतियों के किनारे पर एक नाम बुनने लगे… खुदीराम।", "proud, goosebumps", 0.4),
 ("end", "खुदीराम बोस के लिए एक शब्द कमेंट में लिखिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_carriage": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"chase": (118, 0.28)}, "pulse": ["hook_carriage", "judge"], "hits": [("hook_carriage", 1), ("title", 0), ("bomb", 0), ("twist", 1)],
         "rise": [("twist", 1)], "quiet": ["trial"]}
TITLE = "Khudiram Bose - Age 18"
FILE_NAME = "25 - Khudiram Bose - Muzaffarpur.mp4"
