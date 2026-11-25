"""Video 26 - The Mysorean rockets of Hyder Ali and Tipu Sultan, and how they inspired the British Congreve rocket. Storytelling script (Hindi), under 2 minutes.

Focus is the technology. Sources: Britannica (Tipu Sultan; Congreve rocket), Wikipedia (Mysorean rockets; Battle of Pollilur (1780); Siege of Seringapatam (1799); William Congreve)."""

LINES = [
 ("hook_rocket", "1780, पोल्लिलूर। अंग्रेज़ी फ़ौज आगे बढ़ रही थी… तभी आसमान में आग की लकीरें दिखीं।", "tense, building", 0.25),
 ("hook_rocket", "एक रॉकेट सीधा अंग्रेज़ों की बारूद-गाड़ी पर गिरा… और ज़ोरदार धमाका हुआ!", "energetic, full power", 0.5),
 ("title", "ये कहानी है मैसूर के रॉकेटों की… हैदर अली और टीपू सुल्तान का वो हथियार, जिसने अंग्रेज़ों को हैरान कर दिया।", "proud storyteller voice", 0.4),
 ("tech", "इनकी ख़ासियत थी लोहे का खोल। उसमें कसकर भरा बारूद ज़्यादा दबाव बनाता… और रॉकेट करीब दो किलोमीटर तक उड़ जाता।", "amazed, explaining", 0.25),
 ("tech", "पीछे बँधा होता लंबा बाँस… और कुछ रॉकेटों के आगे तलवार जैसी धार।", "amazed", 0.4),
 ("corps", "टीपू की सेना में हज़ारों रॉकेट चलाने वाले सैनिक थे… उनकी अपनी अलग टुकड़ियाँ।", "proud", 0.4),
 ("battle", "अंग्रेज़ों से मैसूर की लड़ाइयों में, ये रॉकेट बार-बार उनकी कतारों पर कहर बनकर गिरे।", "energetic", 0.4),
 ("fall", "पर 1799 में श्रीरंगपट्टनम का क़िला गिरा… और टीपू सुल्तान लड़ते हुए मारे गए।", "grave, slow", 0.25),
 ("fall", "अंग्रेज़ बचे हुए रॉकेट उठाकर इंग्लैंड ले गए।", "sly, ominous", 0.4),
 ("congreve", "वहाँ विलियम कॉन्ग्रीव ने उन्हें परखकर अपना कॉन्ग्रीव रॉकेट बनाया…", "building", 0.25),
 ("congreve", "जो नेपोलियन के ख़िलाफ़ चला… और 1814 में अमेरिका की लड़ाई में भी।", "amazed", 0.4),
 ("twist", "यानी जिस रॉकेट पर अंग्रेज़ों को नाज़ था… उसकी कहानी मैसूर से शुरू हुई थी।", "proud, goosebumps", 0.4),
 ("end", "क्या आपको ये बात पता थी? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_rocket": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"battle": (120, 0.32), "corps": (104, 0.24)}, "pulse": ["hook_rocket", "tech"], "hits": [("hook_rocket", 1), ("title", 0), ("fall", 0), ("twist", 0)],
         "rise": [("hook_rocket", 1), ("twist", 0)], "quiet": ["fall"]}
TITLE = "Mysore Rockets - The Weapon That Shocked the British"
FILE_NAME = "26 - Mysore Rockets - Tipu Sultan.mp4"
