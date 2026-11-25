"""Video 22 - Rani Abbakka Chowta of Ullal and her decades-long resistance to the Portuguese (16th century). Storytelling script (Hindi), under 2 minutes.

Details of the night raid and the fire arrows come from tradition and later accounts; framed with "कहते हैं".
Sources: Wikipedia (Abbakka Chowta; Ullal), Press Information Bureau (ICGS Rani Abbakka, 2012), India Post (stamp, 2003)."""

LINES = [
    ("hook_sea", "आधी रात। पुर्तगाली जहाज़ों पर अचानक आग के तीर बरसने लगे… पाल धू-धू कर जलने लगे।", "urgent, shocking, close to the mic", 0.2),
    ("hook_sea", "और ये हमला करवाने वाली थी… एक रानी।", "a proud reveal, slow", 0.25),
    ("hook_sea", "एक रानी, जिसने उस दौर की सबसे ताक़तवर नौसेनाओं में से एक से… दशकों तक लोहा लिया।", "intriguing, leave it hanging", 0.4),
    ("title", "रानी अब्बक्का चौटा… उल्लाल की वो निडर रानी।", "proud, strong", 0.4),
    ("ullal", "मंगलौर के पास छोटा-सा राज्य उल्लाल… मसालों के व्यापार का बंदरगाह।", "warm, setting the scene", 0.25),
    ("ullal", "पुर्तगाली चाहते थे कि हर जहाज़ उनसे परमिट ले… और हर राजा उन्हें कर दे।", "cold, arrogant", 0.3),
    ("refuse", "अब्बक्का ने साफ़ मना कर दिया — उल्लाल किसी को कर नहीं देगा! उनकी सेना में हिंदू, जैन, मुसलमान… सब कंधे से कंधा मिलाकर लड़ते थे।", "defiant, proud", 0.4),
    ("attack", "1555 में पुर्तगाली बेड़ा हमला करने आया… और हारकर लौट गया।", "triumphant, a little amused", 0.25),
    ("attack", "पर 1568 में वो बड़ी फ़ौज के साथ लौटे… और उल्लाल पर कब्ज़ा कर लिया।", "grave, ominous", 0.3),
    ("night", "रानी भागी नहीं। कहते हैं, उसी रात सिर्फ़ कुछ सौ सैनिकों के साथ उन्होंने धावा बोला…", "whispered suspense, rising", 0.25),
    ("night", "पुर्तगाली सेनापति मारा गया… और जलते तीरों ने उनके जहाज़ों में आग लगा दी। यही थी वो रात, जिससे कहानी शुरू हुई!", "explosive, triumphant", 0.4),
    ("betray", "आख़िर में, कहते हैं अपनों के धोखे से वो पकड़ी गईं… और क़ैद में ही उनकी मौत हुई।", "sad, betrayed", 0.4),
    ("twist", "पर उल्लाल ने उन्हें कभी नहीं भुलाया। आज भी वहाँ वीर रानी अब्बक्का उत्सव मनाया जाता है।", "warm, proud", 0.25),
    ("twist", "और भारतीय तटरक्षक बल के एक जहाज़ का नाम है… रानी अब्बक्का।", "proud, a slow reveal", 0.5),
    ("end", "क्या आपने रानी अब्बक्का का नाम पहले सुना था? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_sea": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"attack": (110, 0.26), "night": (122, 0.32)}, "pulse": ["hook_sea", "ullal"], "hits": [("hook_sea", 1), ("title", 0), ("night", 1), ("twist", 1)],
         "rise": [("night", 0), ("twist", 1)], "quiet": ["betray"]}
GROUPS = [["hook_sea", "title", "ullal", "refuse"], ["attack", "night"], ["betray", "twist", "end"]]
GROUP_MOOD = ["a fiery cold open, then proud defiance",
              "victory, loss, then a daring night raid",
              "betrayal and sorrow, then pride"]
TITLE = "Rani Abbakka - The Fearless Queen of Ullal"
FILE_NAME = "22 - Rani Abbakka - Ullal.mp4"
