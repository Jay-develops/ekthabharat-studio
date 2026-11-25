"""Video 20 - Rani Chennamma of Kittur and the war of 1824 against the East India Company. Storytelling script (Hindi), under 2 minutes.

Sources: Britannica (Kittur Chennamma), Wikipedia (Kittur Chennamma; Kittur rebellion of 1824; Sangolli Rayanna; St John Thackeray), Government of India (statue in the Parliament complex, 2007)."""

LINES = [
    ("hook_gate", "क़िले के बाहर अंग्रेज़ी फ़ौज… और अंदर से घोड़े पर निकली एक रानी। हाथ में तलवार।", "tense, urgent, close to the mic", 0.2),
    ("hook_gate", "अंग्रेज़ों ने सोचा था, एक विधवा रानी डर जाएगी… वो ग़लत थे।", "defiant, a knowing smile", 0.25),
    ("hook_gate", "और ये हुआ था… 1857 से पूरे तैंतीस साल पहले।", "a slow reveal, leave it hanging", 0.4),
    ("title", "कित्तूर की रानी चेन्नम्मा… जिन्होंने अंग्रेज़ों से हार मानने से मना कर दिया।", "proud, strong", 0.4),
    ("loss", "पहले पति राजा मल्लसर्ज चल बसे… फिर 1824 में इकलौता बेटा भी।", "sad, heavy", 0.25),
    ("loss", "रानी ने शिवलिंगप्पा को गोद लिया… पर अंग्रेज़ों ने उसे वारिस मानने से इनकार कर दिया।", "bitter, tense", 0.25),
    ("loss", "असल में उनकी नज़र थी… कित्तूर के ख़ज़ाने पर।", "cold, revealing", 0.4),
    ("demand", "धारवाड़ का कलेक्टर थैकरे फ़ौज लेकर आया… और हुक्म दिया — क़िले का दरवाज़ा खोलो!", "arrogant, commanding", 0.3),
    ("demand", "रानी ने जवाब दिया… तलवार से।", "slow, then fierce", 0.4),
    ("battle", "कित्तूर की सेना टूट पड़ी! थैकरे वहीं मारा गया… और अंग्रेज़ अफ़सर बंदी बना लिए गए।", "explosive, triumphant", 0.25),
    ("battle", "रानी ने दया दिखाई… उन्हें इस वादे पर छोड़ दिया कि अब लड़ाई नहीं होगी।", "warm, noble", 0.3),
    ("betray", "पर अंग्रेज़ वादा तोड़कर और बड़ी फ़ौज के साथ लौटे। दिसंबर 1824 में भीषण लड़ाई… और रानी पकड़ी गईं।", "betrayed, grave", 0.25),
    ("betray", "बैलहोंगल के क़िले में क़ैद रहीं… और 1829 में वहीं उनकी मौत हुई।", "sad, slow", 0.4),
    ("twist", "पर उनकी आग बुझी नहीं। उनके वीर संगोल्ली रायन्ना ने सालों तक लड़ाई जारी रखी।", "rising, defiant", 0.25),
    ("twist", "और आज, संसद भवन परिसर में… रानी चेन्नम्मा की प्रतिमा खड़ी है।", "proud, slow", 0.5),
    ("end", "क्या आपने पहले रानी चेन्नम्मा के बारे में सुना था? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_gate": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"battle": (118, 0.32), "betray": (96, 0.22)}, "pulse": ["hook_gate", "demand"], "hits": [("hook_gate", 1), ("title", 0), ("demand", 1), ("battle", 0)],
         "rise": [("hook_gate", 1), ("twist", 1)], "quiet": ["loss"]}
GROUPS = [["hook_gate", "title", "loss", "demand"], ["battle", "betray"], ["twist", "end"]]
GROUP_MOOD = ["a defiant cold open, then grief, greed and a bold reply",
              "triumph and mercy, then betrayal and sorrow",
              "rising defiance, then pride"]
TITLE = "Rani Chennamma of Kittur"
FILE_NAME = "20 - Kittur Chennamma - 1824.mp4"
