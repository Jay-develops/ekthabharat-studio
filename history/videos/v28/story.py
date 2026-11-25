"""Video 28 - The Kakori train action (9 August 1925) and the friendship of Ram Prasad Bismil and Ashfaqulla Khan. Storytelling script (Hindi), under 2 minutes.

A passenger was killed by a stray shot during the action; the script says so plainly.
Sources: Britannica (Ram Prasad Bismil), Wikipedia (Kakori conspiracy; Ram Prasad Bismil; Ashfaqulla Khan; Rajendra Lahiri; Roshan Singh; Hindustan Republican Association)."""

LINES = [
    ("hook_train", "अँधेरे में दौड़ती एक ट्रेन… और उसमें रखा था अंग्रेज़ सरकार का ख़ज़ाना।", "tense, close to the mic", 0.2),
    ("hook_train", "तभी किसी ने ज़ंजीर खींच दी।", "sudden, sharp", 0.3),
    ("hook_train", "और ट्रेन रोकने वाले कोई डाकू नहीं थे… वो थे दस नौजवान क्रांतिकारी।", "a proud reveal, leave it hanging", 0.4),
    ("title", "काकोरी… जब दस नौजवानों ने अंग्रेज़ी ख़ज़ाना लूट लिया।", "proud, strong", 0.4),
    ("why", "हिंदुस्तान रिपब्लिकन एसोसिएशन को हथियारों के लिए पैसे चाहिए थे।", "serious", 0.25),
    ("why", "राम प्रसाद बिस्मिल ने तय किया — सरकार का पैसा, सरकार से ही लेंगे!", "bold, defiant", 0.4),
    ("heist", "गार्ड के डिब्बे से लोहे का भारी संदूक उतारा गया… और अशफ़ाक़ उल्ला ख़ाँ ने हथौड़े से उसे तोड़ डाला।", "fast, thrilling", 0.25),
    ("heist", "यात्रियों को नहीं लूटा गया… पर अफ़रा-तफ़री में चली एक गोली से एक यात्री की जान चली गई।", "tense, then regretful", 0.4),
    ("hunt", "अंग्रेज़ सरकार बौखला गई। देश भर में छापे पड़े और ज़्यादातर साथी पकड़े गए… पर चंद्रशेखर आज़ाद कभी हाथ नहीं आए।", "urgent, then a sly smile", 0.4),
    ("friends", "बिस्मिल और अशफ़ाक़… एक हिंदू, एक मुसलमान। दोनों शायर, दोनों पक्के दोस्त।", "warm, tender", 0.25),
    ("friends", "दोनों ने साथ मिलकर आज़ादी का सपना देखा… और साथ ही मौत चुनी।", "moved, slow", 0.4),
    ("gallows", "दिसंबर 1927 में बिस्मिल, अशफ़ाक़, राजेंद्र लाहिड़ी और ठाकुर रोशन सिंह को फाँसी दी गई।", "grave, sad", 0.4),
    ("twist", "बिस्मिल की आवाज़ बनकर गूँजी वो ग़ज़ल आज भी याद है — सरफ़रोशी की तमन्ना…", "rising, goosebumps", 0.3),
    ("twist", "और 2021 में इस घटना को नया नाम मिला — काकोरी ट्रेन एक्शन।", "proud, slow", 0.5),
    ("end", "बिस्मिल और अशफ़ाक़ की दोस्ती पर आप क्या कहेंगे? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_train": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"heist": (118, 0.3), "hunt": (104, 0.24)}, "pulse": ["hook_train", "why"], "hits": [("hook_train", 1), ("title", 0), ("gallows", 0), ("twist", 0)],
         "rise": [("twist", 0)], "quiet": ["friends", "gallows"]}
GROUPS = [["hook_train", "title", "why", "heist"], ["hunt", "friends", "gallows"], ["twist", "end"]]
GROUP_MOOD = ["a tense train-heist cold open, then a bold plan and a thrilling heist",
              "a manhunt, a tender friendship, then grief",
              "goosebumps and pride"]
TITLE = "Kakori - The Train Action of 1925"
FILE_NAME = "28 - Kakori - Train Action 1925.mp4"
