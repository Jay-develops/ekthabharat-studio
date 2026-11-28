"""Video 13 - Tanaji Malusare and the night assault on Kondhana / Sinhagad (February 1670). Storytelling script (Hindi), under 2 minutes.

The monitor lizard (ghorpad) and Shivaji's words "गड आला, पण सिंह गेला" come from Maratha tradition and ballads; framed with "कहते हैं".
Sources: Britannica (Shivaji), Wikipedia (Tanaji Malusare; Battle of Sinhagad; Sinhagad)."""

LINES = [
    ("hook_cliff", "आधी रात। सीधी खड़ी चट्टान, और रस्सी के सहारे ऊपर चढ़ते मराठा सैनिक। एक फिसला, तो सब ख़त्म।", "hushed, tense, close to the mic", 0.15),
    ("hook_cliff", "ऊपर क़िले में मुग़लों की फ़ौज सो रही थी। नीचे से आ रहे थे बस कुछ सौ मावले।", "suspense, building", 0.15),
    ("hook_cliff", "और उनका सरदार, अपने बेटे की शादी छोड़कर आया था।", "intriguing, leave it hanging", 0.25),
    ("title", "तानाजी मालुसरे! और वो रात, जिसने एक क़िले का नाम बदल दिया।", "proud, strong", 0.3),
    ("wedding", "घर में बेटे की शादी की तैयारी थी — ढोल, मेहमान, हल्दी। तभी शिवाजी महाराज का संदेश आया।", "warm and festive, then a sudden turn", 0.15),
    ("wedding", "कोंढाणा वापस चाहिए। तानाजी बोले — पहले कोंढाणा का ब्याह, फिर मेरे बेटे का!", "firm, proud, full of resolve", 0.25),
    ("fort", "कोंढाणा, पुणे के पास पहाड़ की चोटी पर क़िला। क़िलेदार था उदयभान राठौड़।", "serious, setting the scene", 0.15),
    ("fort", "सामने से हमला नामुमकिन। तो तानाजी ने चुनी सबसे खड़ी चट्टान, जहाँ कोई पहरा नहीं था।", "clever, a plan", 0.2),
    ("climb", "कहते हैं, एक घोरपड़ की कमर में रस्सी बाँधकर उसे ऊपर भेजा गया। वो चट्टान से चिपक गई, और सैनिक एक-एक कर ऊपर पहुँच गए।", "whispered suspense, slowly rising", 0.2),
    ("fight", "फिर अँधेरे में गर्जना गूँजी — हर हर महादेव! क़िले में भगदड़ मच गई।", "a battle roar, full power", 0.15),
    ("fight", "तानाजी और उदयभान आमने-सामने। ढाल टूट गई, तो तानाजी ने हाथ पर कपड़ा लपेटा और लड़ते रहे।", "fast, intense", 0.15),
    ("fight", "आख़िरी वार… और दोनों योद्धा ज़मीन पर गिर पड़े।", "sudden, then quiet", 0.3),
    ("rally", "सरदार गिरा, मावले पीछे भागने लगे। तभी तानाजी के भाई सूर्याजी ने रस्सियाँ ही काट दीं!", "panic, then a shocking twist", 0.15),
    ("rally", "अब लौटने का रास्ता नहीं था। या तो जीतो, या मरो। और मराठों ने क़िला जीत लिया!", "rising, triumphant", 0.3),
    ("twist", "जीत की ख़बर आई, पर साथ में तानाजी के जाने की भी।", "sad, slow", 0.2),
    ("twist", "कहते हैं, शिवाजी महाराज बोले — गड आला, पण सिंह गेला। क़िला तो मिला, पर मेरा शेर चला गया।", "grief and pride, slow", 0.3),
    ("twist", "और उसी दिन से कोंढाणा का नाम पड़ा — सिंहगढ़।", "proud, a slow reveal", 0.35),
    ("end", "ऐसे शेर के लिए कमेंट में एक बार लिखिए — जय भवानी! और ये कहानी उस दोस्त को भेजिए, जो सिंहगढ़ ट्रेक पर गया है।", "warm, friendly", 0.6),
]

SCENE_LEAD = {"hook_cliff": 0.0}
SCENE_EXTRA = {"title": 0.3}
MUSIC = {"drums": {"fight": (118, 0.32), "rally": (104, 0.26)}, "pulse": ["hook_cliff", "climb"],
         "hits": [("hook_cliff", 1), ("title", 0), ("fight", 0), ("twist", 2)], "rise": [("fight", 0), ("twist", 2)], "quiet": ["twist"]}
GROUPS = [["hook_cliff", "title", "wedding", "fort"], ["climb", "fight", "rally"], ["twist", "end"]]
GROUP_MOOD = ["a night-raid cold open, then a wedding interrupted by duty",
              "whispered suspense, then a roaring battle and a shocking twist",
              "grief and pride"]
TITLE = "Tanaji Malusare - Sinhagad"
FILE_NAME = "13 - Tanaji Malusare - Sinhagad.mp4"
