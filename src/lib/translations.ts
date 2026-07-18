import { Language } from "@/context/AppContext";

export const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिन्दी (Hindi)",
  bn: "বাংলা (Bengali)",
  ta: "தமிழ் (Tamil)",
  te: "తెలుగు (Telugu)",
  mr: "मराठी (Marathi)",
  gu: "ગુજરાતી (Gujarati)",
  kn: "ಕನ್ನಡ (Kannada)",
  ml: "മലയാളം (Malayalam)",
  pa: "ਪੰਜਾਬੀ (Punjabi)",
  or: "ଓଡ଼ିଆ (Odia)",
  as: "অসমীয়া (Assamese)",
  ur: "اردو (Urdu)"
};

export const translations: Record<string, Partial<Record<Language, string>> & { en: string }> = {
  brandName: {
    en: "JanSeva Bharat",
    hi: "जनसेवा भारत",
    bn: "জনসেবা ভারত",
    ta: "ஜனசேவா பாரத்",
    te: "జనసేవ భారత్",
    mr: "जनसेवा भारत",
    gu: "જનસેવા ભારત",
    kn: "ജനಸೇವಾ ಭಾರತ್",
    ml: "ജനസേവ ഭാരത്",
    pa: "ਜਨਸੇਵਾ ਭਾਰਤ",
    or: "ଜନସେବା ଭାରତ",
    as: "জনসেৱা ভাৰত",
    ur: "جن سیوا بھارت"
  },
  tagline: {
    en: "One Nation. One Platform. Every Government Scheme.",
    hi: "एक राष्ट्र। एक मंच। हर सरकारी योजना।",
    bn: "এক জাতি। এক মঞ্চ। প্রতিটি সরকারি প্রকল্প।",
    ta: "ஒரே தேசம். ஒரே தளம். ஒவ்வொரு அரசு திட்டம்.",
    te: "ఒక దేశం. ఒక వేదిక. ప్రతి ప్రభుత్వ పథకం.",
    mr: "एक देश. एक व्यासपीठ. प्रत्येक सरकारी योजना.",
    gu: "એक राष्ट्र. एक मंच. दरेक सरकारी योजना.",
    kn: "ಒಂದು ರಾಷ್ಟ್ರ. ಒಂದು ವೇದಿಕೆ. ಪ್ರತಿ ಸರ್ಕಾರಿ ಯೋಜನೆ.",
    ml: "ഒരു രാജ്യം. ഒരു പ്ലാറ്റ്ഫോം. എല്ലാ സർക്കാർ പദ്ധതിയും.",
    pa: "ਇੱਕ ਰਾਸ਼ਟਰ। ਇੱਕ ਮੰਚ। ਹਰ ਸਰਕਾਰੀ ਯੋਜਨਾ।",
    or: "ଏକ ରାଷ୍ଟ୍ର | ଏକ ମଞ୍ଚ | ପ୍ରତ୍ୟେକ ସରକାରୀ ଯୋଜନା |",
    as: "এক দেশ। এক মঞ্চ। প্ৰতিখন চৰকাৰী আঁচনি।",
    ur: "ایک قوم۔ ایک پلیٹ فارم۔ ہر سرکاری اسکیم۔"
  },
  disclaimerText: {
    en: "JanSeva Bharat is an independent informational platform and not an official government website. Always verify scheme details and apply only through official government portals.",
    hi: "जनसेवा भारत एक स्वतंत्र सूचनात्मक मंच है और यह कोई आधिकारिक सरकारी वेबसाइट नहीं है। कृपया हमेशा योजना के विवरण की पुष्टि करें और केवल आधिकारिक सरकारी पोर्टलों के माध्यम से ही आवेदन करें।",
    bn: "জনসেবা ভারত একটি স্বতন্ত্র তথ্যমূলক প্ল্যাটফর্ম এবং এটি কোনো অফিশিয়াল সরকারি ওয়েবসাইট নয়। সর্বদা প্রকল্পের বিশদ বিবরণ যাচাই করুন এবং শুধুমাত্র অফিশিয়াল সরকারি পোর্টালের মাধ্যমে আবেদন করুন।",
    ta: "ஜனசேவா பாரத் என்பது ஒரு சுயாதீனமான தகவல் தளமாகும், இது அதிகாரப்பூர்வ அரசு வலைத்தளம் அல்ல. எப்போதும் திட்ட விவரங்களைச் சரிபார்த்து, அதிகாரப்பூர்வ அரசு இணையதளங்கள் மூலமாக மட்டுமே விண்ணப்பிக்கவும்.",
    te: "జనసేవ భారత్ అనేది ఒక స్వతంత్ర సమాచార వేదిక మరియు ఇది అధికారిక ప్రభుత్వ వెబ్‌సైట్ కాదు. ఎల్లప్పుడూ పథకం వివరాలను సరిచూసుకోండి మరియు అధికారిక ప్రభుత్వ పోర్టల్స్ ద్వారా మాత్రమే దరఖాస్తు చేసుకోండి.",
    mr: "जनसेवा भारत हे एक स्वतंत्र माहिती देणारे व्यासपीठ असून ती अधिकृत सरकारी वेबसाईट नाही. नेहमी योजनेच्या तपशीलाची पडताळणी करा आणि केवळ अधिकृत सरकारी पोर्टलद्वारेच अर्ज करा.",
    gu: "જનસેવા ભારત એક સ્વતંત્ર માહિતી આપતું પ્લેટફોર્મ છે અને તે સત્તાવાર સરકારી વેબસાઇટ નથી. હંમેશા યોજનાની વિગતો ચકાસો અને માત્ર સત્તાવાર સરકારી પોર્ટલ દ્વારા જ અરજી કરો.",
    kn: "ಜನಸೇವಾ ಭಾರತ್ ಒಂದು ಸ್ವತಂತ್ರ ಮಾಹಿತಿ ವೇದಿಕೆಯಾಗಿದ್ದು, ಅಧಿಕೃತ ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್ ಅಲ್ಲ. ದಯವಿಟ್ಟು ಯೋಜನೆಗಳ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ आणि ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಮೂಲಕವೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
    ml: "ജനസേവ ഭാരത് ഒരു സ്വതന്ത്ര വിവര പ്ലാറ്റ്‌ഫോമാണ്, ഇത് ഔദ്യോഗിക സർക്കാർ വെബ്‌സൈറ്റല്ല. എപ്പോഴും പദ്ധതി വിവരങ്ങൾ പരിശോധിച്ച് ഔദ്യോഗിക സർക്കാർ പോർട്ടലുകൾ വഴി മാത്രം അപേക്ഷിക്കുക.",
    pa: "ਜਨਸੇਵਾ ਭਾਰਤ ਇੱਕ ਸੁਤੰਤਰ ਜਾਣਕਾਰੀ ਵਾਲਾ ਮੰਚ ਹੈ ਅਤੇ ਇਹ ਕੋਈ ਅਧਿਕਾਰਤ ਸਰਕਾਰੀ ਵੈੱਬਸਾਈਟ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਹਮੇਸ਼ਾ ਯੋਜਨਾ ਦੇ ਵੇਰਵਿਆਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਕੇਵਲ ਅਧਿਕਾਰਤ ਸਰਕਾਰੀ ਪੋਰਟਲ ਰਾਹੀਂ ਹੀ ਅਪਲਾਈ ਕਰੋ।",
    or: "ଜନସେବା ଭାରତ ଏକ ସ୍ୱତନ୍ତ୍ର ସୂଚନା ପ୍ଲାଟଫର୍ମ ଏବଂ ଏହା କୌଣସି ସରକାରୀ ୱେବସାଇଟ୍ ନୁହେଁ | ସର୍ବଦା ଯୋଜନା ବିବରଣୀ ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ କେବଳ ସରକାରୀ ପୋର୍ଟାଲ୍ ମାଧ୍ୟମରେ ଆବେଦନ କରନ୍ତୁ |",
    as: "জনসেৱা ভাৰত এখন স্বতন্ত্ৰ তথ্যমূলক মঞ্চ আৰু ই কোনো চৰকাৰী ৱেবছাইট নহয়। অনুগ্ৰহ কৰি আঁচনিৰ সবিশেষ পৰীক্ষা কৰক আৰু কেৱল চৰকাৰী প’ৰ্টেলৰ জৰিয়তেহে আবেদন কৰক।",
    ur: "جن سیوا بھارت ایک خود مختار معلوماتی پلیٹ فارم ہے اور یہ کوئی سرکاری ویب سائٹ نہیں ہے۔ ہمیشہ اسکیم کی تفصیلات کی تصدیق کریں اور صرف سرکاری پورٹلز کے ذریعے ہی درخواست دیں۔"
  },
  home: { en: "Home", hi: "मुख्य पृष्ठ", bn: "হোম", ta: "முகப்பு", te: "హోమ్", mr: "मुख्यपृष्ठ", gu: "હોમ", kn: "ಮುಖಪುಟ", ml: "ഹോം", pa: "ਮੁੱਖ ਪੰਨਾ", or: "ମୁଖ୍ୟ ପୃଷ୍ଠା", as: "গৃহ", ur: "ہوم" },
  schemes: { en: "Schemes", hi: "योजनाएं", bn: "প্রকল্পসমূহ", ta: "திட்டங்கள்", te: "పథకాలు", mr: "योजना", gu: "યોજનાઓ", kn: "ಯोजनाಗಳು", ml: "പദ്ധതികൾ", pa: "ਯੋਜਨਾਵਾਂ", or: "ଯୋଜନାଗୁଡ଼ିକ", as: "আঁচনিসমূহ", ur: "اسکیمیں" },
  services: { en: "Services", hi: "सेवाएं", bn: "সেবাসমূহ", ta: "சேவைகள்", te: "సేవలు", mr: "सेवा", gu: "સેવાઓ", kn: "ಸೇವೆಗಳು", ml: "സേവനങ്ങൾ", pa: "ਸੇਵਾਵਾਂ", or: "ସେବାଗୁଡ଼ିକ", as: "সেৱাসমূহ", ur: "خدمات" },
  states: { en: "States", hi: "राज्य", bn: "রাজ্যসমূহ", ta: "மாநிலங்கள்", te: "రాష్ట్రాలు", mr: "राज्ये", gu: "રાજ્યો", kn: "ರಾಜ್ಯಗಳು", ml: "സംസ്ഥാനങ്ങൾ", pa: "ਰਾਜ", or: "ରାଜ୍ୟଗୁଡ଼ିକ", as: "ৰাজ্যসমূহ", ur: "ریاستیں" },
  eligibilityChecker: { en: "Eligibility Checker", hi: "पात्रता जांच", bn: "योग्यता যাচাই", ta: "தகுதி சரிபார்ப்பு", te: "అర్హత పరీక్ష", mr: "पात्रता तपासक", gu: "પાત્રતા તપાસનાર", kn: "ಅರ್ಹತೆ ಪರೀಕ್ಷಕ", ml: "യോഗ്യതാ പരിശോധന", pa: "ਯੋਗਤਾ ਚੈਕਰ", or: "ଯୋଗ୍ୟତା ଯାଞ୍ચ", as: "যোগ্যতা নিৰূপক", ur: "اہلیت چیکر" },
  aiAssistant: { en: "AI Assistant", hi: "एआई सहायक", bn: "এআই সহকারী", ta: "AI உதவியாளர்", te: "AI అసిస్టెంట్", mr: "एआय सहाय्यक", gu: "AI મદદનીશ", kn: "AI ಸಹಾಯಕಿ", ml: "AI അസിസ്റ്റന്റ്", pa: "ਏਆਈ ਸਹਾਇਕ", or: "AI ସହାୟਕ", as: "এআই সহায়क", ur: "اے آئی اسسٹنٹ" },
  about: { en: "About", hi: "हमारे बारे में", bn: "আমাদের সম্পর্কে", ta: "எங்களைப் பற்றி", te: "గురించి", mr: "बद्दल", gu: "વિશે", kn: "ನಮ್ಮ ಬಗ್ಗೆ", ml: "ഞങ്ങളെക്കുറിച്ച്", pa: "ਸਾਡੇ ਬਾਰੇ", or: "आମ ବିଷୟରେ", as: "বিষয়ে", ur: "بابت" },
  searchPlaceholder: {
    en: "Search Aadhaar, PM Kisan, scholarships, pension, ration card...",
    hi: "आधार, पीएम किसान, छात्रवृत्ति, पेंशन, राशन कार्ड खोजें...",
    bn: "আধার, পিএম কিষাণ, স্কলারশিপ, পেনশন, রেশন কার্ড খুঁজুন...",
    ta: "ஆதார், பிஎம் கிசான், உதவித்தொகை, ஓய்வூதியம், ரேஷன் கார்டு தேடுக...",
    te: "ఆధార్, పిఎం కిసాన్, స్కాలర్‌షిప్స్, పెన్షన్, రేషన్ కార్డ్ వెతకండి...",
    mr: "आधार, पीएम किसान, शिष्यवृत्ती, पेन्शन, रेशन कार्ड शोधा...",
    gu: "આધાર, પીએમ કિસાન, શિષ્યવૃત્તિ, પેન્શન, રેશન કાર્ડ શોધો...",
    kn: "ಆಧಾರ್, ಪಿಎಂ ಕಿಸಾನ್, ವಿದ್ಯಾರ್ಥಿವೇತನ, ಪಿಂಚಣಿ, ರೇಷನ್ ಕಾರ್ಡ್ ಹುಡುಕಿ...",
    ml: "ആധാർ, പിഎം കിസാൻ, സ്കോളർഷിപ്പ്, പെൻഷൻ, റേഷൻ കാർഡ് എന്നിവ തിരയുക...",
    pa: "ਆਧਾਰ, ਪੀਐਮ ਕਿਸਾਨ, ਵਜ਼ੀਫਾ, ਪੈਨਸ਼ਨ, ਰਾਸ਼ਨ ਕਾਰਡ ਲੱਭੋ...",
    or: "ଆଧାର, ପିଏମ କିଷାନ, ବୃତ୍ତି, ପେନସନ, ରାସନ କାର୍ଡ ଖୋଜନ୍ତୁ ...",
    as: "আধাৰ, পিএম কিষাণ, জলপানি, পেঞ্চন, ৰেচন কাৰ্ড সন্ধান কৰক...",
    ur: "آدھار، پی ایم کسان، اسکالرشپ، پنشن، راشن کارڈ تلاش کریں..."
  },
  searchBtn: { en: "Search", hi: "खोजें", bn: "অনুসন্ধান", ta: "தேடுக", te: "వెతకండి", mr: "शोधा", gu: "શોધો", kn: "ಹುಡುಕಿ", ml: "തിരയുക", pa: "ਖੋਜੋ", or: "ଖୋଜନ୍ତୁ", as: "সন্ধান", ur: "تلاش کریں" },
  accessibilityMode: { en: "Accessibility", hi: "सुलभता", bn: "অ্যাক্সেসিবিলিটি", ta: "அணுகல்தன்மை", te: "యాక్సెస్బిలిటీ", mr: "सुलभता", gu: "ઍક્સેસિબિલિટી", kn: "ಪ್ರವೇಶಸಾಧ್ಯತೆ", ml: "അക്സസിബിലിറ്റി", pa: "ਸੁਲਭਤਾ", or: "ସୁଗମତା", as: "প্ৰৱেশাধিকাৰ", ur: "رسائی" },
  textLarge: { en: "Large Text", hi: "बड़ा फ़ॉन्ट", bn: "বড় টেক্সট", ta: "பெரிய எழுத்து", te: "పెద్ద అక్షరాలు", mr: "मोठा मजकूर", gu: "મોટા અક્ષરો", kn: "ದೊಡ್ಡ ಪಠ्य", ml: "വലിയ ടെക്സ്റ്റ്", pa: "ਵੱਡਾ ਅੱਖਰ", or: "ବଡ଼ ଅକ୍ଷର", as: "ডাঙৰ হৰফ", ur: "بڑا متن" },
  themeLight: { en: "Light Mode", hi: "लाइट मोड", bn: "लाइट मोड", ta: "பகல் பயன்முறை", te: "లైట్ मोड", mr: "लाईट मोड", gu: "લાઈટ મોડ", kn: "ಲೈಟ್ ಮೋಡ್", ml: "ലൈറ്റ് മോഡ്", pa: "ਲਾਈਟ ਮੋਡ", or: "ଲାଇଟ୍ ମୋଡ୍", as: "পোহৰ মোড", ur: "لائٹ موڈ" },
  themeDark: { en: "Dark Mode", hi: "डार्क मोड", bn: "ডার্ক মোड", ta: "இரவு பயன்முறை", te: "డార్క్ మోడ్", mr: "डार्क मोड", gu: "ડાર્ક મોડ", kn: "ಡಾರ್ಕ್ ಮೋಡ್", ml: "ഡാർക്ക് മോഡ്", pa: "ਡਾਰਕ ਮੋਡ", or: "ଡାର୍କ ମୋଡ୍", as: "আন্ধাৰ মোড", ur: "ڈارک موڈ" },
  verifyNotice: {
    en: "JanSeva Bharat does not ask users to submit Aadhaar, PAN, bank details, OTP, or personal documents. Users should apply only on official government websites.",
    hi: "जनसेवा भारत उपयोगकर्ताओं से आधार, पैन, बैंक विवरण, ओटीपी या व्यक्तिगत दस्तावेज जमा करने के लिए नहीं कहता है। उपयोगकर्ताओं को केवल आधिकारिक सरकारी वेबसाइटों पर ही आवेदन करना चाहिए।",
    bn: "জনসেবা ভারত ব্যবহারকারীদের আধার, প্যান, ব্যাঙ্কের বিশদ বিবরণ, ওটিপি বা ব্যক্তিগত নথি জমা দিতে বলে না। ব্যবহারকারীদের শুধুমাত্র অফিশিয়াল সরকারি ওয়েবসাইটে আবেদন করা উচিত।",
    ta: "ஜனசேவா பாரத் பயனர்களிடம் ஆதார், பான், வங்கி விவரங்கள், ஓடிபி அல்லது தனிப்பட்ட ஆவணங்களை சமர்ப்பிக்கக் கேட்பதில்லை. பயனர்கள் அதிகாரப்பூர்வ அரசு இணையதளங்களில் மட்டுமே விண்ணப்பிக்க வேண்டும்.",
    te: "జనసేవ భారత్ వినియోగదారులను ఆధార్, పాన్, బ్యాంక్ వివరాలు, OTP లేదా వ్యక్తిగత పత్రాలను సమర్పించమని కోరదు. వినియోగదారులు అధికారిక ప్రభుత్వ వెబ్‌సైట్‌లలో మాత్రమే దరఖాస్తు చేసుకోవాలి.",
    mr: "जनसेवा भारत वापरकर्त्यांना आधार, पॅन, बँक तपशील, ओटीपी किंवा वैयक्तिक कागदपत्रे सबमिट करण्यास सांगत नाही. वापरकर्त्यांनी केवळ अधिकृत सरकारी वेबसाइटवरच अर्ज करावा.",
    gu: "જનસેવા ભારત વપરાશકર્તાઓને આધાર, પાન, બેંક વિગતો, OTP અથવા વ્યક્તિગત દસ્તાવેજો સબમિટ કરવા માટે પૂછતું નથી. વપરાશકર્તાઓએ માત્ર સત્તાવાર સરકારી વેબસાઇટ્સ પર જ અરજી કરવી જોઈએ.",
    kn: "ಜನಸೇವಾ ಭಾರತ್ ಬಳಕೆದಾರರಿಗೆ ಆಧಾರ್, ಪ್ಯಾನ್, ಬ್ಯಾಂಕ್ ವಿವರಗಳು, ಒಟಿಪಿ ಅಥವಾ ವೈಯಕ್ತಿಕ ದಾಖಲೆಗಳನ್ನು ಸಲ್ಲಿಸಲು ಕೇಳುವುದಿಲ್ಲ. ಬಳಕೆದಾರರು ಅಧಿಕೃತ ಸರ್ಕಾರि ವೆಬ್‌ಸೈಟ್‌ಗಳಲ್ಲಿ ಮಾತ್ರ ಅರ್ಜಿ ಸಲ್ಲಿಸಬೇಕು.",
    ml: "ജനസേവ ഭാരത് ഉപയോക്താക്കളോട് ആധാർ, പാൻ, ബാങ്ക് വിവരങ്ങൾ, ഒടിപി അല്ലെങ്കിൽ വ്യക്തിഗത രേഖകൾ എന്നിവ സമർപ്പിക്കാൻ ആവശ്യപ്പെടുന്നില്ല. ഉപയോക്താക്കൾ ഔദ്യോഗിക സർക്കാർ വെബ്‌സൈറ്റുകളിൽ മാത്രം അപേക്ഷിക്കുക.",
    pa: "ਜਨਸੇਵਾ ਭਾਰਤ ਉਪਭੋਗਤਾਵਾਂ ਨੂੰ ਆਧਾਰ, ਪੈਨ, ਬੈਂਕ ਵੇਰਵੇ, ਓਟੀਪੀ ਜਾਂ ਨਿੱਜੀ ਦਸਤਾਵੇਜ਼ ਜਮ੍ਹਾਂ ਕਰਨ ਲਈ ਨਹੀਂ ਕਹਿੰਦਾ ਹੈ। ਉਪਭੋਗਤਾਵਾਂ ਨੂੰ ਕੇਵਲ ਅਧਿਕਾਰਤ ਸਰਕਾਰੀ ਵੈੱਬਸਾਈਟਾਂ 'ਤੇ ਹੀ ਅਪਲਾਈ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ।",
    or: "ଜନସେବା ଭାରତ ବ୍ୟବହାରକାରୀଙ୍କୁ ଆଧାର, ପାନ୍, ବ୍ୟାଙ୍କ ବିବରଣୀ, OTP କିମ୍ବା ବ୍ୟକ୍ତିଗତ ଦଲିଲ ଦାଖଲ କରିବାକୁ କୁହେ ନାହିଁ | ବ୍ୟବହାରକାରୀମାନେ କେବଳ ସରକารୀ ୱେବସାଇଟରେ ଆବେଦନ କରିବା ଉଚିତ |",
    as: "জনসেৱা ভাৰতে ব্যৱহাৰকাৰীক আধাৰ, পেন, বেংকৰ সবিশেষ, অ’টিপি বা ব্যক্তিগত নথি-পত্ৰ জমা দিবলৈ নকয়। ব্যৱহাৰকাৰীয়ে কেৱল চৰকাৰী ৱেবছাইটতহে আবেদন কৰিব লাগে।",
    ur: "جن سیوا بھارت صارفین سے آدھار، پین، بینک کی تفصیلات، او ٹی پی، یا ذاتی دستاویزات جمع کرانے کو نہیں کہتا۔ صارفین صرف سرکاری ویب سائٹوں پر ہی درخواست دیں۔"
  },
  discoverHeroTitle: {
    en: "Discover Every Government Scheme in India",
    hi: "भारत में हर सरकारी योजना की खोज करें"
  },
  discoverHeroSubtitle: {
    en: "Search Central and State Government schemes, benefits, services, required documents, eligibility rules, and official direct application links — all in one unified platform.",
    hi: "केंद्र और राज्य सरकार की योजनाओं, लाभों, सेवाओं, आवश्यक दस्तावेजों, पात्रता नियमों और आधिकारिक प्रत्यक्ष आवेदन लिंक को एक एकीकृत मंच पर खोजें।"
  },
  statsCentralSchemes: {
    en: "Central Schemes",
    hi: "केंद्रीय योजनाएं"
  },
  statsStateSchemes: {
    en: "State Schemes",
    hi: "राज्य योजनाएं"
  },
  statsSectors: {
    en: "Sectors & Categories",
    hi: "क्षेत्र और श्रेणियां"
  },
  statsVerified: {
    en: "Verified Official Links",
    hi: "सत्यापित आधिकारिक लिंक"
  },
  popularServicesTitle: {
    en: "Popular Public Services",
    hi: "लोकप्रिय सार्वजनिक सेवाएं"
  },
  popularServicesSubtitle: {
    en: "Quick guides and application portals for essential documents and registers.",
    hi: "आवश्यक दस्तावेजों और प्रमाणपत्रों के लिए त्वरित मार्गदर्शिका और आवेदन पोर्टल।"
  },
  browseCategoryTitle: {
    en: "Browse by Category",
    hi: "श्रेणी के अनुसार खोजें"
  },
  browseCategorySubtitle: {
    en: "Find schemes filtered by specific social and welfare sectors.",
    hi: "विशिष्ट सामाजिक और कल्याणकारी क्षेत्रों द्वारा फ़िल्टर की गई योजनाएं खोजें।"
  },
  browseStateTitle: {
    en: "Browse by State / UT",
    hi: "राज्य / केंद्र शासित प्रदेश के अनुसार खोजें"
  },
  browseStateSubtitle: {
    en: "Access state-specific benefits and localized welfare schemes.",
    hi: "राज्य-विशिष्ट लाभों और स्थानीयकृत कल्याणकारी योजनाओं तक पहुँचें।"
  },
  latestSchemesTitle: {
    en: "Latest Updated Schemes",
    hi: "नवीनतम अद्यतन योजनाएं"
  },
  latestSchemesSubtitle: {
    en: "Recently added or modified public welfare programs.",
    hi: "हाल ही में जोड़ी गई या संशोधित सार्वजनिक कल्याण योजनाएं।"
  },
  howItWorksTitle: {
    en: "How JanSeva Bharat Works",
    hi: "जनसेवा भारत कैसे काम करता है"
  },
  howItWorksSubtitle: {
    en: "Simple steps to discover and apply for your benefits.",
    hi: "अपने लाभों की खोज करने और आवेदन करने के लिए सरल कदम।"
  },
  howStep1Title: {
    en: "1. Search or Filter",
    hi: "1. खोजें या फ़िल्टर करें"
  },
  howStep1Desc: {
    en: "Enter keywords or use filters like state, category, age, and income to find matching schemes.",
    hi: "मिलान योजनाओं को खोजने के लिए कीवर्ड दर्ज करें या राज्य, श्रेणी, आयु और आय जैसे फ़िल्टर का उपयोग करें।"
  },
  howStep2Title: {
    en: "2. Check Eligibility",
    hi: "2. पात्रता की जांच करें"
  },
  howStep2Desc: {
    en: "Read detailed summary cards or use our dynamic questionnaire to see if you qualify.",
    hi: "यह देखने के लिए कि क्या आप योग्य हैं, विस्तृत सारांश कार्ड पढ़ें या हमारी गतिशील प्रश्नावली का उपयोग करें।"
  },
  howStep3Title: {
    en: "3. View Application Steps",
    hi: "3. आवेदन के चरण देखें"
  },
  howStep3Desc: {
    en: "Follow clear online or offline instructions, gather required documents, and use official links.",
    hi: "स्पष्ट ऑनलाइन या ऑफलाइन निर्देशों का पालन करें, आवश्यक दस्तावेज एकत्र करें, और आधिकारिक लिंक का उपयोग करें।"
  },
  exploreSchemesBtn: {
    en: "Explore Schemes",
    hi: "योजनाएं खोजें"
  },
  checkEligibilityBtn: {
    en: "Check Eligibility",
    hi: "पात्रता जांचें"
  },
  askAiAssistantBtn: {
    en: "Ask AI Assistant",
    hi: "एआई सहायक से पूछें"
  },
  browseByStateBtn: {
    en: "Browse by State",
    hi: "राज्य के अनुसार खोजें"
  },
  viewAllBtn: {
    en: "View All",
    hi: "सभी देखें"
  },
  verifiedBadge: {
    en: "Verified Source",
    hi: "सत्यापित स्रोत"
  },
  applyOnlineBtn: {
    en: "Apply Online",
    hi: "ऑनलाइन आवेदन करें"
  },
  detailsBtn: {
    en: "Details",
    hi: "विवरण"
  },
  aiCTATitle: {
    en: "Have questions about schemes?",
    hi: "योजनाओं के बारे में प्रश्न हैं?"
  },
  aiCTASubtitle: {
    en: "Ask our AI assistant to instantly find application steps, documents, and rules.",
    hi: "आवेदन के चरण, दस्तावेज और नियम तुरंत खोजने के लिए हमारे एआई सहायक से पूछें।"
  },
  safetyTitle: {
    en: "Safety and Privacy Notice",
    hi: "सुरक्षा और गोपनीयता सूचना"
  },
  safetyDesc: {
    en: "JanSeva Bharat is committed to citizen safety. We DO NOT collect, store, or ask you to input sensitive documents like Aadhaar, PAN card, or bank account details. Always apply only through official '.gov.in' or '.nic.in' domains.",
    hi: "जनसेवा भारत नागरिकों की सुरक्षा के लिए प्रतिबद्ध है। हम आधार, पैन कार्ड, या बैंक खाते के विवरण जैसे संवेदनशील दस्तावेज एकत्र, संग्रहीत या इनपुट करने के लिए नहीं कहते हैं। हमेशा केवल आधिकारिक '.gov.in' या '.nic.in' डोमेन के माध्यम से ही आवेदन करें।"
  },
  // Categories Translation
  "agriculture": { en: "Agriculture", hi: "कृषि" },
  "education": { en: "Education", hi: "शिक्षा" },
  "health": { en: "Health", hi: "स्वास्थ्य" },
  "social-welfare": { en: "Social Welfare", hi: "समाज कल्याण" },
  "women-child-development": { en: "Women & Child Development", hi: "महिला एवं बाल विकास" },
  "labour-employment": { en: "Labour & Employment", hi: "श्रम और रोजगार" },
  "transport": { en: "Transport", hi: "परिवहन" },
  "finance": { en: "Finance & Banking", hi: "वित्त और बैंकिंग" },
  "rural-development": { en: "Rural Development", hi: "ग्रामीण विकास" },
  "urban-development": { en: "Urban Development", hi: "शहरी विकास" },
  "minority-affairs": { en: "Minority Affairs", hi: "अल्पसंख्यक मामले" },
  "tribal-affairs": { en: "Tribal Affairs", hi: "जनजातीय मामले" },
  "disability-welfare": { en: "Disability Welfare", hi: "दिव्यांग कल्याण" },
  "senior-citizen-welfare": { en: "Senior Citizen Welfare", hi: "वरिष्ठ नागरिक कल्याण" },
  "housing": { en: "Housing", hi: "आवास" },
  "food-civil-supplies": { en: "Food & Ration", hi: "खाद्य और राशन" },
  // States Translation
  "state_maharashtra": { en: "Maharashtra", hi: "महाराष्ट्र" },
  "state_karnataka": { en: "Karnataka", hi: "कर्नाटक" },
  "state_uttar-pradesh": { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" },
  "state_gujarat": { en: "Gujarat", hi: "गुजरात" },
  "state_delhi": { en: "Delhi", hi: "दिल्ली" },
  "state_bihar": { en: "Bihar", hi: "बिहार" },
  // Filter sidebar translation
  "filters": { en: "Filters", hi: "फ़िल्टर" },
  "clearAll": { en: "Clear All", hi: "सभी साफ़ करें" },
  "searchSchemes": { en: "Search Schemes...", hi: "योजनाएं खोजें..." },
  "govLevel": { en: "Government Level", hi: "सरकारी स्तर" },
  "central": { en: "Central Government", hi: "केंद्र सरकार" },
  "stateLevel": { en: "State Government", hi: "राज्य सरकार" },
  "selectState": { en: "Select State / UT", hi: "राज्य / केंद्र शासित प्रदेश चुनें" },
  "selectCategory": { en: "Select Category", hi: "श्रेणी चुनें" },
  "beneficiaryFilters": { en: "Beneficiary Filters", hi: "लाभार्थी फ़िल्टर" },
  "caste": { en: "Caste Category", hi: "जाति श्रेणी" },
  "occupation": { en: "Occupation", hi: "व्यवसाय" },
  "incomeLimit": { en: "Annual Income Limit", hi: "वार्षिक आय सीमा" }
};

export function t(key: string, lang: Language): string {
  const transObj = translations[key];
  if (transObj) {
    const val = transObj[lang];
    if (val) return val;
    return transObj["en"];
  }
  return key;
}
