"""Video 26 - The Mysorean rockets of Hyder Ali and Tipu Sultan, and how they inspired the British Congreve rocket. Storytelling script (Hindi), under 2 minutes.

Focus is the technology. Sources: Britannica (Tipu Sultan; Congreve rocket), Wikipedia (Mysorean rockets; Battle of Pollilur (1780); Siege of Seringapatam (1799); William Congreve)."""

LINES = [
    ("hook_rocket", "आसमान में आग की लकीरें… और अंग्रेज़ी फ़ौज समझ भी नहीं पाई कि ये है क्या।", "urgent, amazed, close to the mic", 0.2),
    ("hook_rocket", "एक रॉकेट सीधा अंग्रेज़ों की बारूद-गाड़ी पर गिरा… और ज़ोरदार धमाका!", "explosive", 0.25),
    ("hook_rocket", "जी हाँ… रॉकेट। और ये चलाए थे भारतीयों ने… अंग्रेज़ों से भी पहले।", "a proud reveal, leave it hanging", 0.4),
    ("title", "मैसूर के रॉकेट… हैदर अली और टीपू सुल्तान का वो हथियार, जिसने अंग्रेज़ों को हैरान कर दिया।", "proud, strong", 0.4),
    ("tech", "राज़ था लोहे का खोल। उसमें कसकर भरा बारूद ज़्यादा दबाव बनाता… और रॉकेट करीब दो किलोमीटर तक उड़ जाता।", "clever, explaining with excitement", 0.25),
    ("tech", "पीछे बँधा होता लंबा बाँस… और कुछ रॉकेटों के आगे तलवार जैसी धार।", "impressed", 0.3),
    ("corps", "टीपू की सेना में हज़ारों रॉकेट चलाने वाले सैनिक थे… उनकी अपनी अलग टुकड़ियाँ।", "proud", 0.3),
    ("battle", "मैसूर की लड़ाइयों में, ये रॉकेट बार-बार अंग्रेज़ों की कतारों पर कहर बनकर गिरे।", "energetic, powerful", 0.4),
    ("fall", "पर 1799 में श्रीरंगपट्टनम का क़िला गिरा… और टीपू सुल्तान लड़ते हुए मारे गए।", "sad, grave", 0.25),
    ("fall", "अंग्रेज़ बचे हुए रॉकेट उठाकर इंग्लैंड ले गए।", "a knowing hint", 0.3),
    ("congreve", "वहाँ विलियम कॉन्ग्रीव ने उन्हें परखकर अपना कॉन्ग्रीव रॉकेट बनाया…", "intriguing", 0.25),
    ("congreve", "जो नेपोलियन के ख़िलाफ़ चला… और 1814 में अमेरिका की लड़ाई में भी।", "amazed", 0.3),
    ("twist", "यानी जिस रॉकेट पर अंग्रेज़ों को नाज़ था… उसकी शुरुआत मैसूर में हुई थी।", "proud, a slow reveal", 0.5),
    ("end", "क्या आपको ये बात पता थी? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_rocket": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"battle": (120, 0.32), "corps": (104, 0.24)}, "pulse": ["hook_rocket", "tech"], "hits": [("hook_rocket", 1), ("title", 0), ("fall", 0), ("twist", 0)],
         "rise": [("hook_rocket", 1), ("twist", 0)], "quiet": ["fall"]}
GROUPS = [["hook_rocket", "title", "tech", "corps"], ["battle", "fall", "congreve"], ["twist", "end"]]
GROUP_MOOD = ["an explosive cold open, then excited explanation",
              "power, then loss, then an intriguing twist",
              "proud reveal"]
TITLE = "Mysore Rockets - The Weapon That Shocked the British"
FILE_NAME = "26 - Mysore Rockets - Tipu Sultan.mp4"
