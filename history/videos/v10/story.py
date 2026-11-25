"""Video 10 - Rani Velu Nachiyar of Sivaganga and her commander Kuyili (1772-1780). Storytelling script (Hindi), v2 Nov 2026: cold-open hook, Gemini voice in 3 takes, under 2 minutes.

Kuyili's attack on the British arsenal is told in Tamil tradition; framed with "कहते हैं".
Sources: Wikipedia (Velu Nachiyar; Kuyili), PIB / India Post (Velu Nachiyar stamp, 2008), The Hindu features."""

LINES = [
    # ---- HOOK ----
    ("hook_arsenal", "एक औरत… अपने ऊपर घी उड़ेल रही थी। कहते हैं, फिर उसने ख़ुद को आग लगा ली।", "sudden, shocking, close to the mic", 0.2),
    ("hook_arsenal", "क्योंकि सामने था अंग्रेज़ों का बारूदख़ाना… और उसे उड़ाने का बस यही एक रास्ता बचा था।", "tense, urgent, leave it hanging", 0.4),
    ("title", "रानी वेलु नाच्चियार… और उनकी सेनापति कुयिली। जिन्होंने अंग्रेज़ों से अपना राज्य वापस छीन लिया।", "proud, strong", 0.4),
    # ---- WHO SHE WAS ----
    ("princess", "पर पीछे चलते हैं। रामनाथपुरम की एक राजकुमारी… घुड़सवारी, तलवार, सिलंबम में माहिर, और कई भाषाएँ बोलने वाली।", "warm, admiring", 0.25),
    ("princess", "शादी हुई शिवगंगा के राजा मुत्तु वडुगनाथ से… ज़िंदगी अच्छी चल रही थी।", "warm, with a hint of what is coming", 0.3),
    ("attack", "फिर आया 1772। अंग्रेज़ों और अर्काट के नवाब की सेना ने हमला किया… और राजा मारे गए।", "sudden, grave", 0.3),
    ("attack", "रानी के पास बची थी बस एक छोटी बेटी… और एक कसम। वो जंगलों में निकल गईं।", "low, determined", 0.5),
    # ---- EIGHT YEARS ----
    ("exile", "आठ साल… जंगलों में छिपकर, सेना जोड़ते हुए। अंग्रेज़ ढूँढते रहे… और मैसूर के हैदर अली ने रानी का साथ दिया।", "quiet, building, patient", 0.25),
    ("exile", "और उनकी सबसे भरोसेमंद साथी थी कुयिली… औरतों की एक पूरी फ़ौज की सेनापति।", "proud, a reveal", 0.4),
    ("return", "1780 में रानी लौटीं। पर क़िले के अंदर अंग्रेज़ों के पास बारूद का भंडार था… सीधा हमला मतलब मौत।", "tense, serious", 0.3),
    ("return", "फिर कुयिली को एक बात पता चली — विजयादशमी के दिन औरतें पूजा के लिए क़िले के मंदिर में जा सकती थीं।", "hushed, a plan forming", 0.3),
    ("return", "पूजा की टोकरियों में छिपे हथियार… और औरतें क़िले के अंदर।", "whispered suspense, quick", 0.3),
    ("return", "और यहीं वो पल आया, जिससे कहानी शुरू हुई थी। कहते हैं, कुयिली ने अपने ऊपर घी उड़ेला… ख़ुद को आग लगाई… और दौड़ पड़ी बारूदख़ाने की तरफ़।", "rising, faster and faster, goosebumps", 0.3),
    # ---- VICTORY ----
    ("blast", "धमाका इतना बड़ा था कि अंग्रेज़ों का सारा बारूद पल भर में राख हो गया।", "explosive, full power", 0.25),
    ("blast", "रानी की सेना टूट पड़ी… और आठ साल बाद, शिवगंगा फिर से आज़ाद!", "triumphant, proud", 0.5),
    ("legacy", "तमिलनाडु में आज भी रानी को कहते हैं — वीरमंगई… वीर नारी।", "proud, warm", 0.3),
    ("legacy", "और सोचिए… ये सब हुआ था 1857 से पूरे 77 साल पहले।", "a slow reveal, amazed", 0.5),
    ("end", "कुयिली का नाम किताबों में कम मिलता है… आपने पहले सुना था? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_arsenal": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"attack": (100, 0.24), "blast": (116, 0.3)}, "pulse": ["hook_arsenal", "return"],
         "hits": [("hook_arsenal", 1), ("title", 0), ("blast", 0)], "rise": [("return", 3), ("legacy", 1)], "quiet": ["exile"]}
GROUPS = [["hook_arsenal", "title", "princess", "attack"], ["exile", "return"], ["blast", "legacy", "end"]]
GROUP_MOOD = ["a shocking cold open, then warm storytelling that turns grave",
              "patient, quiet determination, then a secret plan and rising suspense",
              "an explosion of triumph, then pride and wonder"]
TITLE = "Velu Nachiyar and Kuyili - Sivaganga 1780"
FILE_NAME = "10 - Velu Nachiyar - Kuyili.mp4"
