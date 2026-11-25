"""Video 08 - Bhagat Singh: the Assembly bombs (8 April 1929) to 23 March 1931. Storytelling script (Hindi), under 2 minutes.

The Jallianwala soil and the last-moment book are well-known accounts from his family and comrades; framed with "कहते हैं".
Sources: Britannica (Bhagat Singh), Wikipedia (Bhagat Singh; 1929 Central Legislative Assembly bombing; Lahore Conspiracy Case trial)."""

LINES = [
 ("hook_assembly", "8 अप्रैल 1929, दिल्ली की असेंबली। तभी ऊपर गैलरी से कुछ नीचे गिरा…", "tense, hushed", 0.2),
 ("hook_assembly", "धमाका! धुआँ, भगदड़… पर दो नौजवान भागे नहीं। वहीं खड़े होकर गरजे: इंक़लाब ज़िंदाबाद!", "energetic, shouting with full power", 0.5),
 ("title", "ये कहानी है भगत सिंह की… जो सिर्फ़ तेईस साल जिए, पर आज तक ज़िंदा हैं।", "proud storyteller voice", 0.4),
 ("jallianwala", "बारह साल के थे, जब जलियाँवाला बाग़ में गोलियाँ चलीं।", "grave", 0.2),
 ("jallianwala", "कहते हैं, वो वहाँ गए… और ख़ून से भीगी मिट्टी एक शीशी में भरकर घर ले आए।", "hushed, emotional", 0.4),
 ("lahore", "1928, लाहौर। साइमन कमीशन के विरोध में लाला लाजपत राय पर लाठियाँ बरसीं… और कुछ हफ़्तों बाद उनकी मौत हो गई।", "angry, grave", 0.25),
 ("lahore", "भगत सिंह और साथियों ने बदला लिया। अंग्रेज़ पुलिस अफ़सर सॉन्डर्स मारा गया।", "tense, cold", 0.4),
 ("escape", "पूरा लाहौर छान मारा गया… पर भगत सिंह ने बाल कटवाए, हैट पहनी, और साहब बनकर ट्रेन से निकल गए।", "sly, exciting", 0.4),
 ("bomb", "फिर असेंबली। बम ख़ाली बेंचों पर फेंके गए थे… किसी को मारने के लिए नहीं।", "proud, deliberate", 0.2),
 ("bomb", "पर्चों पर लिखा था: बहरों को सुनाने के लिए, धमाके की ज़रूरत होती है।", "proud, rising", 0.4),
 ("jail", "गिरफ़्तारी ही उनका प्लान था। अदालत उनका मंच बनी… और पूरा देश सुन रहा था।", "rising, proud", 0.25),
 ("jail", "फाँसी की सज़ा सुनाई गई। साथ में थे राजगुरु और सुखदेव।", "grave, slow", 0.4),
 ("last", "23 मार्च 1931। कहते हैं, जब उन्हें लेने आए, वो एक किताब पढ़ रहे थे।", "calm, slow", 0.2),
 ("last", "बोले: ठहरिए… एक क्रांतिकारी, दूसरे क्रांतिकारी से मिल रहा है।", "calm, proud, deep", 0.3),
 ("last", "और तीनों गाते हुए, नारे लगाते हुए आगे बढ़े।", "emotional, proud", 0.45),
 ("twist", "अंग्रेज़ इतने डरे हुए थे कि फाँसी तय दिन से एक दिन पहले… शाम को चुपचाप दे दी गई।", "grave reveal", 0.3),
 ("twist", "पर उनकी बात सच निकली: वो मुझे मार सकते हैं… मेरे विचारों को नहीं।", "proud, goosebumps", 0.4),
 ("end", "भगत सिंह का कौन-सा विचार आपको सबसे ज़्यादा प्रेरित करता है? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_assembly": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"lahore": (96, 0.22), "escape": (112, 0.24)}, "pulse": ["hook_assembly", "last"],
         "hits": [("hook_assembly", 1), ("title", 0), ("bomb", 1), ("twist", 1)], "rise": [("bomb", 0), ("twist", 1)], "quiet": ["jallianwala"]}
TITLE = "Bhagat Singh - Bombs to Make the Deaf Hear"
FILE_NAME = "08 - Bhagat Singh - Inquilab Zindabad.mp4"
