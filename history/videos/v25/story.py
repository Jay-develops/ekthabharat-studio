"""Video 25 - Khudiram Bose and the Muzaffarpur bomb (30 April 1908). Storytelling script (Hindi), under 2 minutes.

"He walked to the gallows smiling" is the popular account; framed with "कहते हैं". The bomb killed two British women by mistake; the script says so plainly.
Sources: Britannica (Khudiram Bose), Wikipedia (Khudiram Bose; Prafulla Chaki; Muzaffarpur bombing; Douglas Kingsford)."""

LINES = [
    ("hook_carriage", "अँधेरी रात… सड़क किनारे झाड़ियों में छिपे दो लड़के। और हाथ में एक बम।", "hushed, tense, close to the mic", 0.2),
    ("hook_carriage", "निशाने पर था एक अंग्रेज़ जज… और उनमें से एक लड़के की उम्र थी सिर्फ़ अठारह साल।", "suspense, building", 0.25),
    ("hook_carriage", "पर उस रात कुछ ऐसा हुआ… जो किसी ने नहीं सोचा था।", "ominous, leave it hanging", 0.4),
    ("title", "खुदीराम बोस… भारत के सबसे कम उम्र के शहीदों में से एक।", "proud, strong", 0.4),
    ("boy", "बंगाल के मिदनापुर का एक लड़का। सोलह साल की उम्र में अंग्रेज़ों के ख़िलाफ़ पर्चे बाँटते पकड़ा गया… और छूटकर भाग निकला!", "cheeky, energetic", 0.4),
    ("judge", "कलकत्ता का मजिस्ट्रेट किंग्सफ़ोर्ड… क्रांतिकारियों को कड़ी सज़ाएँ देने के लिए बदनाम था।", "cold, grave", 0.25),
    ("judge", "उसका तबादला मुज़फ़्फ़रपुर हुआ… और खुदीराम और प्रफुल्ल चाकी उसके पीछे-पीछे वहाँ पहुँच गए।", "determined, building", 0.3),
    ("bomb", "30 अप्रैल की रात, बग्घी आई… और बम फेंका गया। पर उसमें किंग्सफ़ोर्ड था ही नहीं। दो अंग्रेज़ महिलाओं की जान चली गई।", "sudden, then a shocked, sad twist", 0.4),
    ("chase", "पुलिस पीछे पड़ी। प्रफुल्ल चाकी घिरने पर शहीद हो गए…", "fast, then sad", 0.25),
    ("chase", "और खुदीराम रात भर, मीलों पैदल चलकर वैनी स्टेशन पहुँचे… जहाँ उन्हें पकड़ लिया गया।", "exhausted, tense", 0.3),
    ("trial", "अदालत में वो डरे नहीं। 11 अगस्त 1908 को उन्हें फाँसी दी गई… उम्र थी सिर्फ़ अठारह साल।", "steady, then heavy", 0.4),
    ("twist", "कहते हैं, वो मुस्कुराते हुए फाँसी तक गए।", "quiet, moved", 0.3),
    ("twist", "और बंगाल के जुलाहे धोतियों के किनारे पर एक नाम बुनने लगे… खुदीराम।", "warm, proud, slow", 0.5),
    ("end", "खुदीराम बोस के लिए एक शब्द… कमेंट में लिखिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_carriage": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"chase": (118, 0.28)}, "pulse": ["hook_carriage", "judge"], "hits": [("hook_carriage", 1), ("title", 0), ("bomb", 0), ("twist", 1)],
         "rise": [("twist", 1)], "quiet": ["trial"]}
GROUPS = [["hook_carriage", "title", "boy", "judge"], ["bomb", "chase", "trial"], ["twist", "end"]]
GROUP_MOOD = ["a tense night ambush cold open, then a cheeky boy and a cruel judge",
              "a shocking twist, a chase, then a brave trial",
              "quiet, moved pride"]
TITLE = "Khudiram Bose - Age 18"
FILE_NAME = "25 - Khudiram Bose - Muzaffarpur.mp4"
