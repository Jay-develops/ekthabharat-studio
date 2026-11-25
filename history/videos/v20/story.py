"""Video 20 - Rani Chennamma of Kittur and the war of 1824 against the East India Company. Storytelling script (Hindi), under 2 minutes.

Sources: Britannica (Kittur Chennamma), Wikipedia (Kittur Chennamma; Kittur rebellion of 1824; Sangolli Rayanna; St John Thackeray), Government of India (statue in the Parliament complex, 2007)."""

LINES = [
 ("hook_gate", "अक्टूबर 1824, कर्नाटक का कित्तूर। क़िले के बाहर अंग्रेज़ी फ़ौज… और अंदर से घोड़े पर निकली एक रानी।", "tense, building", 0.3),
 ("hook_gate", "हाथ में तलवार… और आँखों में आग।", "proud, full power", 0.5),
 ("title", "ये कहानी है कित्तूर की रानी चेन्नम्मा की… 1857 से तैंतीस साल पहले अंग्रेज़ों से टकराने वाली रानी।", "proud storyteller voice", 0.4),
 ("loss", "पहले पति राजा मल्लसर्ज चल बसे… फिर 1824 में इकलौता बेटा भी।", "sad, slow", 0.25),
 ("loss", "रानी ने शिवलिंगप्पा को गोद लिया… पर अंग्रेज़ों ने उसे वारिस मानने से इनकार कर दिया।", "grave, building", 0.25),
 ("loss", "उनकी नज़र थी कित्तूर के ख़ज़ाने पर।", "sly, ominous", 0.4),
 ("demand", "धारवाड़ का कलेक्टर थैकरे फ़ौज लेकर आया… और हुक्म दिया: क़िले का दरवाज़ा खोलो!", "tense, sharp", 0.25),
 ("demand", "रानी ने जवाब दिया… तलवार से।", "defiant, proud", 0.4),
 ("battle", "कित्तूर की सेना टूट पड़ी। थैकरे वहीं मारा गया… और अंग्रेज़ अफ़सर बंदी बना लिए गए।", "energetic, triumphant", 0.25),
 ("battle", "रानी ने उन्हें इस वादे पर छोड़ दिया कि अब लड़ाई नहीं होगी।", "calm, noble", 0.4),
 ("betray", "पर अंग्रेज़ वादा तोड़कर और बड़ी फ़ौज के साथ लौटे। दिसंबर में भीषण लड़ाई के बाद रानी पकड़ी गईं।", "grave, angry", 0.25),
 ("betray", "बैलहोंगल के क़िले में क़ैद रहीं… और 1829 में वहीं उनकी मौत हुई।", "sad, slow", 0.4),
 ("twist", "पर उनके वीर संगोल्ली रायन्ना ने सालों तक लड़ाई जारी रखी।", "rising, proud", 0.25),
 ("twist", "और आज, संसद भवन परिसर में… रानी चेन्नम्मा की प्रतिमा खड़ी है।", "proud, goosebumps", 0.4),
 ("end", "क्या आपने पहले रानी चेन्नम्मा के बारे में सुना था? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_gate": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"battle": (118, 0.32), "betray": (96, 0.22)}, "pulse": ["hook_gate", "demand"], "hits": [("hook_gate", 1), ("title", 0), ("demand", 1), ("battle", 0)],
         "rise": [("hook_gate", 1), ("twist", 1)], "quiet": ["loss"]}
TITLE = "Rani Chennamma of Kittur"
FILE_NAME = "20 - Kittur Chennamma - 1824.mp4"
