"""Video 07 - Adi Shankaracharya (c. 8th century CE). Storytelling script (Hindi), under 2 minutes.

The crocodile, the debate judged by Ubhaya Bharati and the Kashi chandala come from the traditional
Shankara-vijaya biographies; the script frames them with "कहते हैं".
Sources: Britannica (Shankara), Wikipedia (Adi Shankara; Manisha Panchakam; Statue of Oneness)."""

LINES = [
 ("hook_croc", "नदी… चीख़ती हुई एक माँ… और आठ साल के बच्चे का पैर, मगरमच्छ के जबड़े में।", "tense, urgent", 0.3),
 ("hook_croc", "बच्चा चिल्लाया: माँ! मुझे संन्यास की अनुमति दो… वरना ये मुझे ले जाएगा!", "urgent, shouting with full power", 0.5),
 ("title", "ये कहानी है आदि शंकराचार्य की… जिसने पैदल पूरा भारत नाप दिया।", "proud storyteller voice", 0.4),
 ("kaladi", "बारह सौ साल पहले, केरल का कालड़ी गाँव। आठ साल का शंकर… और उसे वेद कंठस्थ।", "calm storytelling", 0.25),
 ("kaladi", "पर मन बस एक बात पर अटका था: संन्यास। और माँ… तैयार नहीं थीं।", "gentle, tense", 0.4),
 ("croc", "कहते हैं, तभी नदी में मगरमच्छ ने उसका पैर पकड़ लिया।", "hushed suspense", 0.25),
 ("croc", "माँ ने रोते हुए हाँ कहा… और मगरमच्छ ने पैर छोड़ दिया।", "emotional, relief", 0.25),
 ("croc", "बेटे ने वचन दिया: माँ, तुम्हारे आख़िरी समय में मैं लौटूँगा।", "emotional, soft", 0.5),
 ("journey", "फिर पैदल, हज़ारों किलोमीटर… नर्मदा तट पर मिले गुरु गोविंद भगवत्पाद।", "energetic storytelling", 0.25),
 ("journey", "सोलह की उम्र तक उपनिषद और गीता पर भाष्य लिख डाले।", "proud", 0.35),
 ("debate", "शास्त्रार्थ में बड़े-बड़े विद्वान हारे… महान मंडन मिश्र तो उनके शिष्य ही बन गए।", "triumphant", 0.4),
 ("kashi", "कहते हैं, काशी में एक चांडाल रास्ते में आया। शिष्य बोले: हटो!", "tense", 0.2),
 ("kashi", "उसने पूछा: किसे हटाऊँ? शरीर को, या आत्मा को? आत्मा तो सबमें एक है।", "calm, profound", 0.3),
 ("kashi", "और शंकर ने उसके आगे सिर झुका दिया।", "soft, awe", 0.45),
 ("mathas", "भारत के चार कोनों में चार मठ: श्रृंगेरी, द्वारका, पुरी और ज्योतिर्मठ।", "proud, grand", 0.25),
 ("mathas", "और सिर्फ़ बत्तीस की उम्र में… केदारनाथ में देह त्याग दी।", "sad, slow", 0.5),
 ("twist", "और वो वचन? माँ के आख़िरी समय में शंकर सचमुच लौटे… और ख़ुद उनका अंतिम संस्कार किया।", "emotional reveal, goosebumps", 0.4),
 ("end", "उनके मठ आज भी चल रहे हैं। आपने कौन-सा देखा है? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_croc": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"journey": (84, 0.2)}, "pulse": ["hook_croc", "croc"], "hits": [("hook_croc", 1), ("title", 0), ("twist", 0)],
         "rise": [("croc", 1), ("twist", 0)], "quiet": ["kashi"]}
TITLE = "Adi Shankaracharya - The Boy Who Walked Across India"
FILE_NAME = "07 - Adi Shankaracharya - Char Math.mp4"
