"""Video 17 - Udham Singh: from Jallianwala Bagh (13 April 1919) to Caxton Hall, London (13 March 1940). Storytelling script (Hindi), under 2 minutes.

Whether he was present at Jallianwala Bagh is debated; framed with "कहते हैं".
Sources: Britannica (Udham Singh; Jallianwala Bagh Massacre; Michael O'Dwyer), Wikipedia (Udham Singh; Caxton Hall)."""

LINES = [
    ("hook_hall", "लंदन का एक भरा हुआ हॉल… और भीड़ में बैठा एक हिंदुस्तानी, गोद में एक मोटी किताब।", "hushed, tense, close to the mic", 0.2),
    ("hook_hall", "उसने किताब खोली… और पन्ने काटकर बनाई जगह में छिपी थी एक रिवॉल्वर।", "suspense, a chill", 0.25),
    ("hook_hall", "इस पल का इंतज़ार… उसने इक्कीस साल किया था।", "low, intense, leave it hanging", 0.4),
    ("title", "ऊधम सिंह… और इक्कीस साल पुराना एक वादा।", "proud, strong", 0.4),
    ("bagh", "13 अप्रैल 1919, अमृतसर। बैसाखी का दिन… जलियाँवाला बाग़ में हज़ारों लोग जमा थे।", "warm, then uneasy", 0.25),
    ("bagh", "जनरल डायर आया, इकलौता रास्ता बंद किया… और बिना चेतावनी गोलियाँ चलवा दीं।", "shocked, grave", 0.3),
    ("bagh", "और पंजाब का गवर्नर माइकल ओ'डायर… इस क़त्लेआम को सही ठहराता रहा। ये नाम याद रखिए।", "cold anger, a warning", 0.4),
    ("vow", "कहते हैं, अनाथालय में पले बीस साल के ऊधम ने उस दिन की तबाही देखी… और मन ही मन एक कसम खाई।", "quiet, heavy, resolute", 0.4),
    ("years", "इक्कीस साल… अफ़्रीका, अमेरिका, फिर लंदन। नाम बदलते रहे… पर इरादा नहीं।", "patient, determined", 0.3),
    ("shot", "और फिर आया 13 मार्च 1940। उसी हॉल में… ऊधम सिंह ने ओ'डायर पर गोलियाँ चला दीं।", "rising, then sudden", 0.25),
    ("shot", "वो भागे नहीं। वहीं खड़े रहे… जैसे यही उनकी ज़िंदगी का मक़सद था।", "calm, proud, goosebumps", 0.4),
    ("trial", "अदालत में उन्होंने अपना नाम बताया — राम मोहम्मद सिंह आज़ाद।", "proud, slow", 0.3),
    ("trial", "हिंदू, मुसलमान, सिख… और आज़ाद। एक नाम में पूरा हिंदुस्तान।", "moved, proud", 0.4),
    ("twist", "31 जुलाई 1940 को लंदन में उन्हें फाँसी दी गई।", "sad, grave", 0.3),
    ("twist", "और 1974 में… उनकी अस्थियाँ पूरे सम्मान के साथ भारत लौटीं।", "warm, proud", 0.5),
    ("end", "ऊधम सिंह के लिए एक शब्द… कमेंट में लिखिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_hall": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"years": (88, 0.2)}, "pulse": ["hook_hall", "shot"], "hits": [("title", 0), ("bagh", 1), ("shot", 0), ("trial", 1)],
         "rise": [("shot", 0), ("trial", 1)], "quiet": ["vow", "twist"]}
GROUPS = [["hook_hall", "title", "bagh", "vow"], ["years", "shot", "trial"], ["twist", "end"]]
GROUP_MOOD = ["a thriller cold open, then horror and a silent vow",
              "patient resolve, a sudden shot, then proud defiance",
              "sorrow, then warm pride"]
TITLE = "Udham Singh - 21 Years Later"
FILE_NAME = "17 - Udham Singh - Jallianwala Ka Badla.mp4"
