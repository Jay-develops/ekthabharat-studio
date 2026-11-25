"""Video 23 - Guru Tegh Bahadur Ji, the ninth Sikh Guru, and his martyrdom at Chandni Chowk, Delhi (1675). Storytelling script (Hindi), under 2 minutes.

Out of respect, the Gurus are never shown as figures: only as light. The dialogue at Anandpur is from Sikh tradition; framed with "कहते हैं".
Sources: Britannica (Tegh Bahadur), Wikipedia (Guru Tegh Bahadur; Gurdwara Sis Ganj Sahib; Gurdwara Rakab Ganj Sahib; Bhai Mati Das; Bhai Jaita; Lakhi Shah Vanjara)."""

LINES = [
 ("hook_chowk", "1675, दिल्ली का चाँदनी चौक। भारी भीड़… और बीच में शांत बैठे थे सिखों के नौवें गुरु।", "grave, hushed", 0.3),
 ("hook_chowk", "उनके सामने बस दो रास्ते रखे गए: धर्म बदलो… या मौत।", "tense, slow", 0.5),
 ("title", "ये कहानी है गुरु तेग बहादुर जी की… जिन्हें कहा गया: हिंद की चादर।", "reverent, proud", 0.4),
 ("kashmir", "उस समय औरंगज़ेब के राज में कश्मीर के पंडितों पर ज़बरदस्ती धर्म बदलने का दबाव था।", "grave", 0.25),
 ("kashmir", "पंडित किरपा राम के साथ कई पंडित, मदद की आस लेकर आनंदपुर पहुँचे।", "hopeful, calm", 0.4),
 ("anandpur", "कहते हैं, गुरु जी ने कहा: इसके लिए किसी महापुरुष के बलिदान की ज़रूरत है।", "deep, calm", 0.25),
 ("anandpur", "तब नौ साल के गोबिंद राय बोले: पिताजी, आपसे बड़ा महापुरुष और कौन है?", "warm, emotional", 0.4),
 ("message", "गुरु जी ने पंडितों से कहा: बादशाह से कह दो… अगर तेग बहादुर धर्म बदल लें, तो हम सब बदल लेंगे।", "firm, proud", 0.4),
 ("arrest", "गुरु जी को बंदी बनाकर दिल्ली लाया गया। उनकी आँखों के सामने उनके तीन साथी, भाई मती दास, भाई सती दास और भाई दयाला शहीद हुए।", "grave, slow", 0.25),
 ("arrest", "पर कोई भी नहीं झुका।", "proud, firm", 0.5),
 ("martyr", "आख़िर चाँदनी चौक में गुरु तेग बहादुर जी ने शीश दे दिया… पर धर्म नहीं छोड़ा।", "reverent, emotional, goosebumps", 0.5),
 ("twist", "भाई जैता उनका शीश आनंदपुर ले गए… और लक्खी शाह वणजारा ने अपना घर जलाकर उनका अंतिम संस्कार किया।", "emotional, proud", 0.25),
 ("twist", "आज वहाँ गुरुद्वारा शीश गंज साहिब और रकाब गंज साहिब हैं। उन्होंने दूसरों के धर्म की रक्षा के लिए प्राण दिए।", "reverent, proud", 0.4),
 ("end", "गुरु तेग बहादुर जी के बलिदान को नमन। कमेंट में अपना संदेश लिखिए।", "warm, reverent", 0.8),
]

SCENE_LEAD = {"hook_chowk": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {}, "pulse": ["hook_chowk", "arrest"], "hits": [("hook_chowk", 1), ("title", 0), ("martyr", 0)],
         "rise": [("martyr", 0), ("twist", 1)], "quiet": ["anandpur", "martyr"]}
TITLE = "Guru Tegh Bahadur Ji - Hind Di Chadar"
FILE_NAME = "23 - Guru Tegh Bahadur - Hind Di Chadar.mp4"
