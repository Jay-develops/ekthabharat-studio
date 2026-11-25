"""Video 17 - Udham Singh: from Jallianwala Bagh (13 April 1919) to Caxton Hall, London (13 March 1940). Storytelling script (Hindi), under 2 minutes.

Whether he was present at Jallianwala Bagh is debated; framed with "कहते हैं".
Sources: Britannica (Udham Singh; Jallianwala Bagh Massacre; Michael O'Dwyer), Wikipedia (Udham Singh; Caxton Hall)."""

LINES = [
 ("hook_hall", "13 मार्च 1940, लंदन का कैक्सटन हॉल। सभा ख़त्म होने वाली थी…", "hushed, tense", 0.25),
 ("hook_hall", "तभी भीड़ में बैठे एक हिंदुस्तानी ने अपनी किताब खोली… और उसके अंदर छिपी थी एक रिवॉल्वर।", "suspense, slow", 0.5),
 ("title", "ये कहानी है ऊधम सिंह की… और इक्कीस साल पुराने एक वादे की।", "proud storyteller voice", 0.4),
 ("bagh", "13 अप्रैल 1919, अमृतसर। बैसाखी का दिन… जलियाँवाला बाग़ में हज़ारों लोग जमा थे।", "calm, then grave", 0.25),
 ("bagh", "जनरल डायर आया, इकलौता रास्ता बंद किया… और बिना चेतावनी गोलियाँ चलवा दीं।", "grave, angry", 0.25),
 ("bagh", "पंजाब का गवर्नर माइकल ओ'डायर… इस क़त्लेआम को सही ठहराता रहा।", "cold, bitter", 0.4),
 ("vow", "कहते हैं, अनाथालय में पले बीस साल के ऊधम ने उस दिन की तबाही देखी… और मन ही मन एक कसम खाई।", "hushed, emotional", 0.4),
 ("years", "सालों तक वो दुनिया भर में भटके… अफ़्रीका, अमेरिका, फिर लंदन। नाम बदलते रहे… पर इरादा नहीं।", "steady, determined", 0.4),
 ("shot", "और इक्कीस साल बाद, उसी हॉल में… ऊधम सिंह ने ओ'डायर पर गोलियाँ चला दीं।", "tense, full power", 0.3),
 ("shot", "वो भागे नहीं। वहीं खड़े रहे।", "proud, calm", 0.5),
 ("trial", "अदालत में उन्होंने अपना नाम बताया: राम मोहम्मद सिंह आज़ाद।", "proud, slow", 0.25),
 ("trial", "हिंदू, मुसलमान, सिख… और आज़ाद। एक नाम में पूरा हिंदुस्तान।", "goosebumps, proud", 0.5),
 ("twist", "31 जुलाई 1940 को लंदन में उन्हें फाँसी दी गई।", "grave, slow", 0.3),
 ("twist", "और 1974 में… उनकी अस्थियाँ पूरे सम्मान के साथ भारत लौटीं।", "proud, emotional", 0.4),
 ("end", "ऊधम सिंह के लिए एक शब्द कमेंट में लिखिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_hall": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"years": (88, 0.2)}, "pulse": ["hook_hall", "shot"], "hits": [("title", 0), ("bagh", 1), ("shot", 0), ("trial", 1)],
         "rise": [("shot", 0), ("trial", 1)], "quiet": ["vow", "twist"]}
TITLE = "Udham Singh - 21 Years Later"
FILE_NAME = "17 - Udham Singh - Jallianwala Ka Badla.mp4"
