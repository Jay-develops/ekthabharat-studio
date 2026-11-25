"""Video 10 - Rani Velu Nachiyar of Sivaganga and her commander Kuyili (1772-1780). Storytelling script (Hindi), under 2 minutes.

Kuyili's attack on the British arsenal is told in Tamil tradition; framed with "कहते हैं".
Sources: Wikipedia (Velu Nachiyar; Kuyili), PIB / India Post (Velu Nachiyar stamp, 2008), The Hindu features."""

LINES = [
 ("hook_arsenal", "1780, शिवगंगा का क़िला। अंदर अंग्रेज़ों का बारूदख़ाना… और उसकी तरफ़ अकेली बढ़ती एक औरत।", "hushed, tense", 0.3),
 ("hook_arsenal", "कहते हैं, उसने ख़ुद को एक जलती मशाल बना लिया… और सीधी बारूदख़ाने में!", "tense, rising, full power at the end", 0.5),
 ("title", "ये कहानी है रानी वेलु नाच्चियार की… और उनकी सेनापति कुयिली की।", "proud storyteller voice", 0.4),
 ("princess", "रामनाथपुरम की राजकुमारी… घुड़सवारी, तलवार, सिलंबम… और कई भाषाएँ।", "proud, warm", 0.25),
 ("princess", "शादी हुई शिवगंगा के राजा मुत्तु वडुगनाथ से।", "calm storytelling", 0.4),
 ("attack", "1772 में अंग्रेज़ों और अर्काट के नवाब की सेना ने हमला किया… और राजा मारे गए।", "grave, tense", 0.25),
 ("attack", "रानी अपनी छोटी बेटी को लेकर जंगलों में निकल गईं।", "urgent, hushed", 0.4),
 ("exile", "आठ साल… छिपकर, सेना जोड़ते हुए। मैसूर के हैदर अली ने उनका साथ दिया।", "steady, determined", 0.25),
 ("exile", "और उनकी सबसे भरोसेमंद साथी थी कुयिली… औरतों की एक पूरी फ़ौज की सेनापति।", "proud", 0.4),
 ("return", "1780 में रानी लौटीं। पर क़िले में अंग्रेज़ों के पास बारूद था, तोपें थीं।", "tense", 0.25),
 ("return", "विजयादशमी के दिन औरतों को क़िले के मंदिर में जाने की इजाज़त थी… कुयिली ने यही दिन चुना।", "hushed suspense", 0.4),
 ("blast", "धमाका इतना बड़ा था कि अंग्रेज़ों का बारूद पल भर में राख हो गया।", "exciting, loud", 0.25),
 ("blast", "रानी की सेना टूट पड़ी… और शिवगंगा फिर से आज़ाद हो गया।", "triumphant", 0.5),
 ("legacy", "तमिलनाडु में आज भी उन्हें कहते हैं: वीरमंगई… वीर नारी।", "proud, warm", 0.3),
 ("legacy", "और ये सब हुआ था 1857 से पूरे 77 साल पहले।", "a sly reveal, goosebumps", 0.4),
 ("end", "क्या आपने कुयिली का नाम कभी पढ़ा था? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_arsenal": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"attack": (100, 0.24), "blast": (116, 0.3)}, "pulse": ["hook_arsenal", "return"],
         "hits": [("hook_arsenal", 1), ("title", 0), ("blast", 0)], "rise": [("blast", 0), ("legacy", 1)], "quiet": ["exile"]}
TITLE = "Velu Nachiyar and Kuyili - Sivaganga 1780"
FILE_NAME = "10 - Velu Nachiyar - Kuyili.mp4"
