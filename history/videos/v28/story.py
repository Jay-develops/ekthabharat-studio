"""Video 28 - The Kakori train action (9 August 1925) and the friendship of Ram Prasad Bismil and Ashfaqulla Khan. Storytelling script (Hindi), under 2 minutes.

A passenger was killed by a stray shot during the action; the script says so plainly.
Sources: Britannica (Ram Prasad Bismil), Wikipedia (Kakori conspiracy; Ram Prasad Bismil; Ashfaqulla Khan; Rajendra Lahiri; Roshan Singh; Hindustan Republican Association)."""

LINES = [
 ("hook_train", "9 अगस्त 1925, लखनऊ के पास काकोरी। आठ डाउन पैसेंजर ट्रेन अँधेरे में दौड़ रही थी…", "hushed, tense", 0.25),
 ("hook_train", "तभी किसी ने ज़ंजीर खींच दी।", "sharp, sudden", 0.5),
 ("title", "ये कहानी है काकोरी की… जब दस नौजवानों ने अंग्रेज़ी ख़ज़ाना लूट लिया।", "proud storyteller voice", 0.4),
 ("why", "हिंदुस्तान रिपब्लिकन एसोसिएशन को हथियारों के लिए पैसे चाहिए थे।", "calm, serious", 0.25),
 ("why", "राम प्रसाद बिस्मिल ने तय किया: सरकार का पैसा, सरकार से ही लेंगे।", "defiant, sly", 0.4),
 ("heist", "गार्ड के डिब्बे से लोहे का संदूक उतारा गया… और अशफ़ाक़ उल्ला ख़ाँ ने हथौड़े से उसे तोड़ दिया।", "energetic, exciting", 0.25),
 ("heist", "यात्रियों को नहीं लूटा गया… पर अफ़रा-तफ़री में चली एक गोली से एक यात्री की जान चली गई।", "grave, honest", 0.4),
 ("hunt", "अंग्रेज़ सरकार बौखला गई। देश भर में छापे पड़े और ज़्यादातर साथी पकड़े गए… पर चंद्रशेखर आज़ाद कभी हाथ नहीं आए।", "tense, then proud", 0.4),
 ("friends", "बिस्मिल और अशफ़ाक़… एक हिंदू, एक मुसलमान। दोनों शायर, दोनों पक्के दोस्त।", "warm, emotional", 0.25),
 ("friends", "दोनों ने साथ मिलकर आज़ादी का सपना देखा… और साथ ही मौत चुनी।", "emotional", 0.4),
 ("gallows", "दिसंबर 1927 में बिस्मिल, अशफ़ाक़, राजेंद्र लाहिड़ी और ठाकुर रोशन सिंह को फाँसी दी गई।", "grave, slow", 0.5),
 ("twist", "बिस्मिल की आवाज़ बनकर गूँजी वो ग़ज़ल आज भी याद है: सरफ़रोशी की तमन्ना…", "proud, goosebumps", 0.25),
 ("twist", "और 2021 में इस घटना को नया नाम मिला: काकोरी ट्रेन एक्शन।", "proud, warm", 0.4),
 ("end", "बिस्मिल और अशफ़ाक़ की दोस्ती पर आप क्या कहेंगे? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_train": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"heist": (118, 0.3), "hunt": (104, 0.24)}, "pulse": ["hook_train", "why"], "hits": [("hook_train", 1), ("title", 0), ("gallows", 0), ("twist", 0)],
         "rise": [("twist", 0)], "quiet": ["friends", "gallows"]}
TITLE = "Kakori - The Train Action of 1925"
FILE_NAME = "28 - Kakori - Train Action 1925.mp4"
