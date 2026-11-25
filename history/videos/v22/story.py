"""Video 22 - Rani Abbakka Chowta of Ullal and her decades-long resistance to the Portuguese (16th century). Storytelling script (Hindi), under 2 minutes.

Details of the night raid and the fire arrows come from tradition and later accounts; framed with "कहते हैं".
Sources: Wikipedia (Abbakka Chowta; Ullal), Press Information Bureau (ICGS Rani Abbakka, 2012), India Post (stamp, 2003)."""

LINES = [
 ("hook_sea", "अरब सागर, सोलहवीं सदी। आधी रात को पुर्तगाली जहाज़ों पर अचानक आग के तीर बरसने लगे…", "tense, building", 0.3),
 ("hook_sea", "और उन्हें चलवाने वाली थी… एक रानी।", "proud, a reveal", 0.5),
 ("title", "ये कहानी है रानी अब्बक्का चौटा की… तटीय कर्नाटक के उल्लाल की निडर रानी।", "proud storyteller voice", 0.4),
 ("ullal", "मंगलौर के पास छोटा-सा राज्य उल्लाल… मसालों के व्यापार का बंदरगाह।", "warm, calm", 0.25),
 ("ullal", "पुर्तगाली चाहते थे कि हर जहाज़ उनसे परमिट ले… और हर राजा उन्हें कर दे।", "ominous", 0.4),
 ("refuse", "अब्बक्का ने साफ़ मना कर दिया। उनकी सेना में हिंदू, जैन, मुसलमान… सब कंधे से कंधा मिलाकर लड़ते थे।", "defiant, proud", 0.4),
 ("attack", "1555 में पुर्तगाली बेड़ा हमला करने आया… और हारकर लौट गया।", "triumphant", 0.25),
 ("attack", "पर 1568 में उन्होंने उल्लाल पर कब्ज़ा कर लिया।", "grave", 0.4),
 ("night", "रानी ने हार नहीं मानी। कहते हैं, उसी रात कुछ सौ सैनिकों के साथ उन्होंने धावा बोला…", "tense, rising", 0.25),
 ("night", "पुर्तगाली सेनापति मारा गया… और जलते तीरों ने उनके जहाज़ों में आग लगा दी।", "energetic, full power", 0.5),
 ("betray", "आख़िर में, कहते हैं अपनों के धोखे से वो पकड़ी गईं… और क़ैद में ही उनकी मौत हुई।", "sad, slow", 0.4),
 ("twist", "पर उल्लाल ने उन्हें कभी नहीं भुलाया। आज भी वहाँ वीर रानी अब्बक्का उत्सव मनाया जाता है।", "warm, proud", 0.25),
 ("twist", "और भारतीय तटरक्षक बल के एक जहाज़ का नाम है… रानी अब्बक्का।", "proud, goosebumps", 0.4),
 ("end", "क्या आपने रानी अब्बक्का का नाम पहले सुना था? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_sea": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"attack": (110, 0.26), "night": (122, 0.32)}, "pulse": ["hook_sea", "ullal"], "hits": [("hook_sea", 1), ("title", 0), ("night", 1), ("twist", 1)],
         "rise": [("night", 0), ("twist", 1)], "quiet": ["betray"]}
TITLE = "Rani Abbakka - The Fearless Queen of Ullal"
FILE_NAME = "22 - Rani Abbakka - Ullal.mp4"
