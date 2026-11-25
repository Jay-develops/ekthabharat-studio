"""Video 13 - Tanaji Malusare and the night assault on Kondhana / Sinhagad (February 1670). Storytelling script (Hindi), under 2 minutes.

The monitor lizard (ghorpad) and Shivaji's words "गड आला, पण सिंह गेला" come from Maratha tradition and ballads; framed with "कहते हैं".
Sources: Britannica (Shivaji), Wikipedia (Tanaji Malusare; Battle of Sinhagad; Sinhagad)."""

LINES = [
 ("hook_cliff", "अँधेरी रात… सीधी खड़ी चट्टान… और उस पर रस्सी के सहारे चढ़ते मराठा सैनिक।", "hushed, tense", 0.3),
 ("hook_cliff", "ऊपर क़िले में मुग़लों की बड़ी फ़ौज सो रही थी… और नीचे से आ रहे थे बस कुछ सौ मावले।", "tense, building suspense", 0.5),
 ("title", "ये कहानी है तानाजी मालुसरे की… और कोंढाणा क़िले की।", "proud storyteller voice", 0.4),
 ("wedding", "तानाजी के घर बेटे की शादी की तैयारी चल रही थी… तभी शिवाजी महाराज का संदेश आया।", "warm, then serious", 0.25),
 ("wedding", "कोंढाणा वापस चाहिए। तानाजी बोले: पहले कोंढाणा का ब्याह, फिर मेरे बेटे का।", "proud, defiant", 0.5),
 ("fort", "कोंढाणा, पुणे के पास, पहाड़ की चोटी पर एक क़िला… और उसका क़िलेदार था उदयभान राठौड़।", "grave", 0.25),
 ("fort", "सामने से हमला नामुमकिन था। तो तानाजी ने चुनी सबसे खड़ी चट्टान… जहाँ कोई पहरा नहीं था।", "clever, hushed", 0.4),
 ("climb", "कहते हैं, उन्होंने एक घोरपड़ की कमर में रस्सी बाँधकर उसे ऊपर चढ़ाया… और रस्सी के सहारे सैनिक चढ़ गए।", "suspense", 0.4),
 ("fight", "आधी रात को हर हर महादेव की गर्जना हुई… और क़िले में भगदड़ मच गई।", "energetic, full power", 0.25),
 ("fight", "तानाजी और उदयभान आमने-सामने। ढाल टूट गई… तो तानाजी ने हाथ पर कपड़ा लपेटा और लड़ते रहे।", "urgent, exciting", 0.25),
 ("fight", "दोनों योद्धा एक-दूसरे के वार से गिर पड़े।", "sad, slow", 0.4),
 ("rally", "सेनापति गिर गया… मावले पीछे हटने लगे। तभी तानाजी के भाई सूर्याजी ने रस्सियाँ काट दीं।", "tense, rising", 0.25),
 ("rally", "अब भागने का रास्ता नहीं था… और मराठों ने क़िला जीत लिया।", "triumphant", 0.5),
 ("twist", "जीत की ख़बर पहुँची… पर साथ में तानाजी के जाने की भी।", "sad, emotional", 0.3),
 ("twist", "कहते हैं, शिवाजी महाराज बोले: गड आला, पण सिंह गेला… क़िला तो मिला, पर मेरा शेर चला गया।", "emotional, deep", 0.3),
 ("twist", "और उसी दिन से कोंढाणा का नाम पड़ा… सिंहगढ़।", "proud, goosebumps", 0.4),
 ("end", "क्या आप कभी सिंहगढ़ क़िला गए हैं? कमेंट में बताइए।", "warm, friendly", 0.8),
]

SCENE_LEAD = {"hook_cliff": 0.1}
SCENE_EXTRA = {"title": 0.5}
MUSIC = {"drums": {"fight": (118, 0.32), "rally": (104, 0.26)}, "pulse": ["hook_cliff", "climb"],
         "hits": [("hook_cliff", 1), ("title", 0), ("fight", 0), ("twist", 2)], "rise": [("fight", 0), ("twist", 2)], "quiet": ["twist"]}
TITLE = "Tanaji Malusare - Sinhagad"
FILE_NAME = "13 - Tanaji Malusare - Sinhagad.mp4"
