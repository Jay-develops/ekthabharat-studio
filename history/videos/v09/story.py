"""Video 09 - Rani Durgavati of Garha-Katanga (Gondwana) and the battle of 24 June 1564. Storytelling script (Hindi).

v2 (Nov 2026): rewritten as a story, not a list of facts. The hook opens inside the last battle and leaves a
question open (what did the queen do?), the middle re-hooks every ~20 s, the ending pays the hook off.
Her words and the night-attack plan come from later accounts; framed with "कहते हैं".
Sources: Britannica (Durgavati), Wikipedia (Rani Durgavati; Garha Kingdom; Rani Durgavati Vishwavidyalaya).
"""

LINES = [
    # ---- HOOK: inside the last battle, a question left open ----
    ("hook_elephant", "एक तीर आँख के पास धँसा… दूसरा गर्दन में।", "sudden, urgent, close to the mic, no slow build-up", 0.2),
    ("hook_elephant", "और फिर भी वो रानी हाथी से नहीं उतरी।", "low, intense, in awe", 0.3),
    ("hook_elephant", "सामने अकबर की सेना… और पीछे उफनती हुई नदी।", "tense, quick", 0.2),
    ("hook_elephant", "महावत चीखा — रानी साहिबा, निकल चलिए!", "a panicked shout", 0.3),
    ("hook_elephant", "रानी ने जो जवाब दिया… वो साढ़े चार सौ साल बाद भी याद किया जाता है।", "slowing down, mysterious, leave it hanging", 0.4),
    ("title", "रानी दुर्गावती… गोंडवाना की वो रानी, जो मुग़लों के आगे नहीं झुकीं।", "proud, strong, each phrase lands", 0.4),
    # ---- WHO SHE WAS ----
    ("kalinjar", "पर ये कहानी शुरू होती है कालिंजर के क़िले से… जहाँ एक लड़की को गुड़ियों से ज़्यादा तीर-कमान पसंद थे।", "calm and inviting, then a smile in the voice", 0.25),
    ("kalinjar", "शादी हुई गोंड राजा दलपत शाह से… पर कुछ ही साल में राजा चल बसे।", "warm, then a sudden shadow", 0.3),
    ("kalinjar", "गोद में पाँच साल का बेटा… और सामने पूरा राज्य।", "heavy, slow", 0.5),
    # ---- SHE PROVES THEM WRONG ----
    ("rule", "दरबार में फुसफुसाहट हुई — एक औरत राज कैसे चलाएगी? पर रानी ने जवाब काम से दिया… और गढ़ा-कटंगा की दौलत के चर्चे दूर-दूर तक फैल गए।", "hushed like gossip, then firm, proud and rising", 0.3),
    ("rule", "मालवा का सुल्तान बाज़ बहादुर सोचकर आया — अकेली रानी है, आसान शिकार… और ऐसा हारकर भागा कि दोबारा इधर देखा तक नहीं।", "mocking the sultan, then amused and triumphant", 0.5),
    # ---- THE THREAT ----
    ("akbar", "पर वही दौलत दिल्ली तक भी पहुँची… और 1564 में अकबर का सेनापति आसफ़ ख़ान आ धमका। बड़ी सेना… और तोपें।", "ominous, a turn in the story, then grave and heavy", 0.3),
    ("akbar", "रानी के पास गिनती के सैनिक थे। सलाहकार बोले — संधि कर लीजिए, जान बच जाएगी। रानी कुछ देर चुप रहीं।", "tense, the advisers pleading, then very quiet", 0.5),
    ("akbar", "कहते हैं, फिर बोलीं — ग़ुलामी की ज़िंदगी से… इज़्ज़त की मौत बेहतर है।", "cold, steady, unshakeable", 0.6),
    # ---- THE BATTLE ----
    ("battle", "नरई के नाले के पास पहली टक्कर हुई… और रानी ने मुग़ल सेना को पीछे धकेल दिया! कहते हैं, रात को रानी बोलीं — अभी हमला करो, दुश्मन थका है। पर सरदार नहीं माने।", "energetic and exciting, then urgent, then frustrated", 0.3),
    ("battle", "और अगली सुबह… सब कुछ पलट गया। मुग़ल तोपें आ चुकी थीं… और पीछे नदी में अचानक बाढ़ आ गई।", "ominous and slow, then fast and urgent", 0.3),
    ("battle", "एक तीर… फिर दूसरा। साथी गिरते गए… पर रानी हाथी पर डटी रहीं।", "emotional, urgent, then defiant", 0.4),
    # ---- PAYOFF: back to the hook ----
    ("fall", "और यही वो पल था, जहाँ से ये कहानी शुरू हुई थी। महावत की बात पर रानी बोलीं — पीठ दिखाकर भागूँ? कभी नहीं।", "quiet and slow, then the queen's answer: defiant, full of pride", 0.4),
    ("fall", "कहते हैं, उन्होंने अपने साथी से कहा — मुझे दुश्मन के हाथ मत पड़ने देना।", "weak but firm, a dying commander", 0.3),
    ("fall", "और जब कोई रास्ता न बचा… रानी ने ख़ुद अपने प्राण दे दिए। जीते-जी हार नहीं मानी।", "sad, slow, dignified", 0.8),
    # ---- LEGACY ----
    ("legacy", "उनका बेटा वीर नारायण भी चौरागढ़ में लड़ते हुए शहीद हुआ। मुग़ल जीत गए… पर इतिहास ने याद किसे रखा?", "sad, then a pointed question", 0.4),
    ("legacy", "आज हर 24 जून को उनका बलिदान दिवस मनाया जाता है… और जबलपुर का विश्वविद्यालय उन्हीं के नाम पर है।", "proud, warm", 0.4),
    ("end", "हार जाना और झुक जाना… दोनों में बहुत फ़र्क़ होता है।", "warm, proud, slow", 0.4),
    ("end", "अगली कहानी किसकी हो? कमेंट में नाम लिखिए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_elephant": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"rule": (88, 0.18), "battle": (112, 0.3)}, "pulse": ["hook_elephant", "akbar"],
         "hits": [("hook_elephant", 0), ("title", 0), ("akbar", 2), ("battle", 2)], "rise": [("akbar", 2)], "quiet": ["fall"]}
# Gemini voice: three long takes (free tier allows ~10 a day), each performed as one passage
GROUPS = [["hook_elephant", "title", "kalinjar", "rule"], ["akbar", "battle"], ["fall", "legacy", "end"]]
GROUP_MOOD = ["a gripping cold open, then warm storytelling with rising pride",
              "a storm gathering: dread, defiance, the thrill of the first day, then disaster",
              "grief and dignity, then quiet pride"]
TITLE = "Rani Durgavati - The Queen of Gondwana"
FILE_NAME = "09 - Rani Durgavati - Gondwana.mp4"
