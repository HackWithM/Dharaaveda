import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Phone, 
  Compass, 
  Sparkles, 
  Clock, 
  Flame, 
  Leaf, 
  Sun, 
  Layers, 
  Droplet,
  Truck,
  Package,
  FileText,
  Star,
  Quote
} from "lucide-react";
import { IMAGES } from "../data/images";
import { useLanguage } from "../lib/LanguageContext";


interface CountUpStatProps {
  target: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

function CountUpStat({ target, decimals = 0, suffix = "", duration = 1200 }: CountUpStatProps) {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasTriggered = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          startCountUp();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, decimals, suffix, duration]);

  const startCountUp = () => {
    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentProgress = easeOut(percentage);
      const rawValue = startValue + currentProgress * target;

      let formatted: string;
      if (percentage < 1) {
        setIsBlinking(Math.random() > 0.55);
        if (decimals > 0) {
          const randomNoise = (Math.random() * 0.9).toFixed(decimals);
          const valueWithNoise = Math.floor(rawValue) + parseFloat(randomNoise);
          formatted = Math.min(valueWithNoise, target).toFixed(decimals);
        } else {
          const randomOffset = Math.floor(Math.random() * 5) - 2;
          const noiseValue = Math.max(0, Math.floor(rawValue) + randomOffset);
          formatted = String(Math.min(noiseValue, target));
        }
      } else {
        formatted = target.toFixed(decimals);
        setIsBlinking(false);
      }

      setDisplayValue(formatted);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <span 
      ref={elementRef} 
      className={`transition-all duration-75 tabular-nums ${
        isBlinking ? "text-orange-500 opacity-90 scale-95" : "text-gray-900 scale-100"
      } inline-block`}
    >
      {displayValue}
      <span className="text-orange-500 ml-0.5">{suffix}</span>
    </span>
  );
}

const LOCAL_TRANSLATIONS: Record<string, Record<string, any>> = {
  en: {
    heroTitle: "The Convergence of Global Trade & Holistic Healing",
    heroSubtitle: "Dharaaveda harmonizes premium agricultural supply-chains with restorative energetic therapies.",
    ctaExports: "Explore Exports",
    ctaTherapies: "Explore Therapies",
    aboutTitle: "Bridging Earth's Bounty & Individual Recovery",
    aboutSubtitle: "OUR DUAL-DIVISION PHILOSOPHY",
    aboutDesc1: "Dharaaveda operates at the intersection of international trade and holistic wellness. We believe that true well-being is both global and deeply personal.",
    aboutDesc2: "Our Agricultural Division partners directly with organic smallholder estates to distribute premium spices and dehydrated products worldwide. Concurrently, our Therapy Division crafts electromagnetic-silent sanctuaries in Wayanad to restore nervous system balance and cellular vitality.",
    // Showcase Section
    showcaseTitle: "Explore Our Divisions",
    showcaseSubtitle: "Select a vertical to enter our dedicated spaces",
    exportCardTitle: "Export Division",
    exportCardDesc: "Connecting deep Indian botanical farms with premium global pharmacies, cosmetics houses, and food importers. Premium spices, grains, and adaptogenic extracts shipped under absolute phytosanitary compliance.",
    exportHighlight1: "APEDA & SGS Certified",
    exportHighlight2: "Direct farm sourcing",
    exportHighlight3: "Global sea & air routing",
    exportHighlight4: "Bulk custom packaging",
    exportCardBtn: "View Export Services",
    therapyCardTitle: "Therapy Division",
    therapyCardDesc: "Attune your biofield, clear deep lifecycle trauma, and restore absolute somatic peace. Immersive consultations blending flower essences, Reiki chakra alignment, and polyphonic quartz sound healing.",
    therapyHighlight1: "Bach Flower Therapy",
    therapyHighlight2: "Usui Reiki Alignment",
    therapyHighlight3: "Emotional Wellness",
    therapyHighlight4: "432Hz Sound Healing",
    therapyCardBtn: "View Therapy Services",
    // Why Choose Us
    whyTitle: "Why Choose Dharaaveda",
    whySubtitle: "Uncompromising standards across logistics and wellness",
    whyTrustTitle: "Absolute Trust",
    whyTrustDesc: "Total transparency, complete phytosanitary compliance, and certified non-disclosure protocols.",
    whyQualityTitle: "Vedic Quality",
    whyQualityDesc: "Direct farm-to-harbor traceability and custom-formulated bio-frequency remedies.",
    whyExpertiseTitle: "Proven Expertise",
    whyExpertiseDesc: "Generations of agricultural legacy paired with certified energetic practitioners.",
    whyReachTitle: "Global Reach",
    whyReachDesc: "Reliable freight shipping lanes delivering to leading importers in 34+ countries.",
    whyHolisticTitle: "Holistic Wellness",
    whyHolisticDesc: "Deep cellular healing inside pure, natural mountain sanctuaries.",
    // Highlights
    highlightsTitle: "Featured Highlights",
    highlightsSubtitle: "Key focus areas of our operations",
    exportHighlightTitle: "Export Division Focus",
    therapyHighlightTitle: "Therapy Division Focus",
    highlightsExport1: "Agricultural Products",
    highlightsExport1Desc: "Hand-harvested Cavendish bananas, Alphonso mangoes, and organic sugarcane extracts.",
    highlightsExport2: "Elite Spices",
    highlightsExport2Desc: "Salem turmeric, bold cardamom, Guntur chillies, and Malabar black pepper.",
    highlightsExport3: "Dehydrated Products",
    highlightsExport3Desc: "Low-temperature onion flakes, spray-dried tomato, and beetroot powders.",
    highlightsExport4: "Global Logistics",
    highlightsExport4Desc: "Custom vacuum-barrier sealing, SGS certifications, and custom port filings.",
    highlightsTherapy1: "Bach Flower Therapy",
    highlightsTherapy1Desc: "Custom liquid remedies selected for active cognitive stress and neural release.",
    highlightsTherapy2: "Rekkhanoho / Reiki",
    highlightsTherapy2Desc: "Non-invasive biofield chakra balancing and chromatic energy field restoration.",
    highlightsTherapy3: "Emotional Wellness",
    highlightsTherapy3Desc: "Nervous system recovery protocols designed to dissolve lifestyle fatigue.",
    highlightsTherapy4: "Energy Healing",
    highlightsTherapy4Desc: "432Hz polyphonic quartz singing sound attunements inside electromagnetic-free chambers.",
    // Stats
    statsTitle: "Our Operational Footprint",
    statsSubtitle: "Measuring our global impact and clinical success",
    statCountries: "Countries Served",
    statProducts: "Product Categories",
    statSessions: "Therapy Sessions",
    statSatisfaction: "Client Satisfaction",
    // Testimonials
    testimonialsTitle: "Voices of Resonance",
    testimonialsSubtitle: "Feedback from our trade partners and sanctuary visitors",
    // Call to Action
    ctaTitle: "Begin Your Journey",
    ctaSubtitle: "Connect with our specialized division desks",
    ctaExportBoxTitle: "Looking for Export Solutions?",
    ctaExportBoxDesc: "Connect with our Commodity Arbitrage desk for bulk container contracts, customized packaging, or logistics compliance.",
    ctaExportBoxBtn: "Speak with Export Desk",
    ctaTherapyBoxTitle: "Looking for Holistic Healing?",
    ctaTherapyBoxDesc: "Schedule a private consultation or reserve a villa stay at our Wayanad mountain sanctuary for biofield attunement.",
    ctaTherapyBoxBtn: "Book Sanctuary Intake",
  },
  hi: {
    heroTitle: "वैश्विक व्यापार और समग्र कल्याण का संगम",
    heroSubtitle: "धाराआयुर्वेद प्रीमियम कृषि आपूर्ति-श्रृंखलाओं को पुनर्योजी ऊर्जा चिकित्सा के साथ जोड़ता है।",
    ctaExports: "निर्यात की खोज करें",
    ctaTherapies: "चिकित्सा की खोज करें",
    aboutTitle: "पृथ्वी के उपहार और व्यक्तिगत स्वास्थ्य लाभ का सेतु",
    aboutSubtitle: "हमारा द्वि-प्रभागीय दर्शन",
    aboutDesc1: "धाराआयुर्वेद अंतर्राष्ट्रीय व्यापार और समग्र कल्याण के चौराहे पर काम करता है। हमारा मानना है कि वास्तविक कल्याण वैश्विक और व्यक्तिगत दोनों है।",
    aboutDesc2: "हमारा कृषि प्रभाग प्रीमियम मसालों और निर्जलीकृत उत्पादों को दुनिया भर में वितरित करने के लिए सीधे जैविक उत्पादकों के साथ साझेदारी करता है। साथ ही, हमारा चिकित्सा प्रभाग तंत्रिका तंत्र के संतुलन और कोशिकीय जीवन शक्ति को बहाल करने के लिए वायनाड में विद्युत चुंबकीय विकिरण-मुक्त सुरम्य शरणस्थलियाँ प्रदान करता है।",
    showcaseTitle: "हमारे प्रभागों की खोज करें",
    showcaseSubtitle: "हमारे समर्पित स्थानों में प्रवेश करने के लिए एक प्रभाग चुनें",
    exportCardTitle: "निर्यात प्रभाग",
    exportCardDesc: "समृद्ध भारतीय वानस्पतिक खेतों को वैश्विक स्तर की प्रीमियम फार्मास्यूटिकल्स और सौंदर्य प्रसाधन गृहों से जोड़ना। पूर्ण पादप-स्वच्छता अनुपालन के तहत थोक शिपिंग।",
    exportCardBtn: "निर्यात सेवाएं देखें",
    therapyCardTitle: "चिकित्सा प्रभाग",
    therapyCardDesc: "अपनी आभा तरंगों को संरेखित करें, जीवनचक्र के गहरे आघातों को शुद्ध करें, और पूर्ण शारीरिक शांति बहाल करें। पुष्प सत्व, रेकी चक्र संरेखण, और ध्वनि चिकित्सा का संयोजन।",
    therapyCardBtn: "चिकित्सा सेवाएं देखें",
    whyTitle: "धाराआयुर्वेद क्यों चुनें",
    whySubtitle: "रसद और कल्याण दोनों में समझौता न करने वाले मानक",
    whyTrustTitle: "पूर्ण विश्वास",
    whyTrustDesc: "पूर्ण पारदर्शिता, पूर्ण पादप-स्वच्छता अनुपालन, और प्रमाणित गैर-प्रकटीकरण प्रोटोकॉल।",
    whyQualityTitle: "वैदिक गुणवत्ता",
    whyQualityDesc: "सीधे खेत-से-बंदरगाह तक पता लगाने की क्षमता और कस्टम-तैयार जैव-आवृत्ति उपचार।",
    whyExpertiseTitle: "प्रमाणित विशेषज्ञता",
    whyExpertiseDesc: "पीढ़ियों की कृषि विरासत के साथ प्रमाणित ऊर्जावान चिकित्सकों की विशेषज्ञता।",
    whyReachTitle: "वैश्विक पहुंच",
    whyReachDesc: "34 से अधिक देशों में अग्रणी आयातकों को सुरक्षित माल ढुलाई सेवाएं।",
    whyHolisticTitle: "समग्र कल्याण",
    whyHolisticDesc: "शुद्ध, प्राकृतिक पहाड़ी शरणस्थली के भीतर कोशिकीय स्व-उपचार।",
    highlightsTitle: "प्रमुख विशेषताएं",
    highlightsSubtitle: "हमारे संचालन के प्रमुख केंद्रित क्षेत्र",
    exportHighlightTitle: "निर्यात प्रभाग का केंद्र",
    therapyHighlightTitle: "चिकित्सा प्रभाग का केंद्र",
    highlightsExport1: "कृषि उत्पाद",
    highlightsExport1Desc: "हाथ से चुने गए कैवेंडिश केले, अल्फोंसो आम और जैविक गन्ने का अर्क।",
    highlightsExport2: "उत्कृष्ट मसाले",
    highlightsExport2Desc: "सलेम हल्दी, बड़ी इलायची, गुंटूर मिर्च और मालाबार काली मिर्च।",
    highlightsExport3: "निर्जलीकृत उत्पाद",
    highlightsExport3Desc: "कम तापमान वाले प्याज के टुकड़े, स्प्रे-सूखे टमाटर और चुकंदर पाउडर।",
    highlightsExport4: "वैश्विक रसद",
    highlightsExport4Desc: "अनुकूलित वैक्यूम-सील, एसजीएस प्रमाणपत्र और सीमा शुल्क कागजी कार्रवाई।",
    highlightsTherapy1: "बाख फ्लावर थेरेपी",
    highlightsTherapy1Desc: "सक्रिय मानसिक तनाव और तंत्रिका तंत्र की राहत के लिए तैयार पुष्प सत्व।",
    highlightsTherapy2: "रेकी संरेखण",
    highlightsTherapy2Desc: "आभा-क्षेत्र चक्रों का गैर-आक्रामक संतुलन और ऊर्जा संरेखण।",
    highlightsTherapy3: "भावनात्मक कल्याण",
    highlightsTherapy3Desc: "थकान को दूर करने और मानसिक शांति के लिए तैयार तंत्रिका तंत्र पुनर्प्राप्ति।",
    highlightsTherapy4: "ऊर्जा चिकित्सा",
    highlightsTherapy4Desc: "विद्युत चुंबकीय-शोर मुक्त कमरों में 432 हर्ट्ज़ क्वार्ट्ज गायन ध्वनि समस्वरता।",
    statsTitle: "हमारा परिचालन क्षेत्र",
    statsSubtitle: "हमारे वैश्विक प्रभाव और नैदानिक सफलता का मापन",
    statCountries: "देशों की सेवा",
    statProducts: "उत्पाद श्रेणियाँ",
    statSessions: "थेरेपी सत्र",
    statSatisfaction: "ग्राहक संतुष्टि",
    testimonialsTitle: "प्रतिध्वनि की आवाजें",
    testimonialsSubtitle: "हमारे व्यापार भागीदारों और शरणस्थली के आगंतुकों से प्राप्त प्रतिक्रिया",
    ctaTitle: "अपनी यात्रा शुरू करें",
    ctaSubtitle: "हमारे विशिष्ट प्रभाग डेस्क से संपर्क करें",
    ctaExportBoxTitle: "क्या आप निर्यात समाधान खोज रहे हैं?",
    ctaExportBoxDesc: "थोक कंटेनर अनुबंध, अनुकूलित पैकेजिंग या रसद अनुपालन के लिए हमारे कमोडिटी आर्बिट्राज डेस्क से संपर्क करें।",
    ctaExportBoxBtn: "निर्यात डेस्क से बात करें",
    ctaTherapyBoxTitle: "क्या आप समग्र कल्याण की तलाश में हैं?",
    ctaTherapyBoxDesc: "व्यक्तिगत परामर्श का समय तय करें या वायनाड पहाड़ी शरणस्थली में विला ठहरने का आरक्षण करें।",
    ctaTherapyBoxBtn: "शरणस्थली सत्र बुक करें",
  },
  mr: {
    heroTitle: "जागतिक व्यापार आणि समग्र आरोग्याचा संगम",
    heroSubtitle: "धाराआयुर्वेद प्रीमियम कृषी पुरवठा-साखळीला पुनरुज्जीवित ऊर्जा उपचारांसोबत जोडते.",
    ctaExports: "निर्यात शोधा",
    ctaTherapies: "उपचार शोधा",
    aboutTitle: "पृथ्वीच्या भेटी आणि वैयक्तिक आरोग्य प्राप्तीचा सेतू",
    aboutSubtitle: "आमचे द्वि-विभागीय तत्वज्ञान",
    aboutDesc1: "धाराआयुर्वेद आंतरराष्ट्रीय व्यापार आणि समग्र आरोग्य यांच्या चौकटीवर काम करते. आमचा विश्वास आहे की खरे कल्याण जागतिक आणि वैयक्तिक दोन्ही आहे.",
    aboutDesc2: "आमचा कृषी विभाग प्रीमियम मसाले आणि निर्जलीकृत उत्पादने जगभरात वितरित करण्यासाठी थेट सेंद्रिय उत्पादकांसोबत भागीदारी करतो. तसेच, आमचा थेरेपी विभाग तंत्रिका तंत्राचे संतुलन आणि पेशींची चैतन्य पुनर्संचयित करण्यासाठी वायनाडमध्ये विद्युत चुंबकीय विकिरण-मुक्त सुरम्य शरणस्थान प्रदान करतो.",
    showcaseTitle: "आमच्या विभागांचा शोध घ्या",
    showcaseSubtitle: "आमच्या समर्पित जागांमध्ये प्रवेश करण्यासाठी एक विभाग निवडा",
    exportCardTitle: "निर्यात विभाग",
    exportCardDesc: "समृद्ध भारतीय वनस्पती क्षेत्रांना जागतिक दर्जाच्या प्रीमियम फार्मास्युटिकल्स आणि सौंदर्य प्रसाधनांशी जोडणे. पूर्ण वनस्पती-स्वच्छता नियमांनुसार घाऊक शिपिंग.",
    exportCardBtn: "निर्यात सेवा पहा",
    therapyCardTitle: "थेरेपी विभाग",
    therapyCardDesc: "तुमच्या आभा लहरींचे संरेखन करा, जुने आघात शुद्ध करा आणि पूर्ण शारीरिक शांतता मिळवा. पुष्प सत्व, रेकी चक्र संरेखन आणि ध्वनी उपचारांचे संयोजन.",
    therapyCardBtn: "थेरेपी सेवा पहा",
    whyTitle: "धाराआयुर्वेद का निवडावे",
    whySubtitle: "रसद आणि कल्याण दोन्हीमध्ये न तडजोड करणारी मानके",
    whyTrustTitle: "पूर्ण विश्वास",
    whyTrustDesc: "पूर्ण पारदर्शकता, पूर्ण वनस्पती-स्वच्छता अनुपालन आणि प्रमाणित गोपनीयता प्रोटोकॉल.",
    whyQualityTitle: "वैदिक गुणवत्ता",
    whyQualityDesc: "थेट शेत-ते-बंदरगाह पर्यंत मागोवा घेण्याची क्षमता आणि सानुकूलित जैव-वारंवारता उपचार.",
    whyExpertiseTitle: "प्रमाणित तज्ञता",
    whyExpertiseDesc: "पिढ्यांच्या कृषी वारशासह प्रमाणित ऊर्जावान वैद्यांची तज्ञता.",
    whyReachTitle: "जागतिक पोहोच",
    whyReachDesc: "३४ हून अधिक देशांमध्ये आघाडीच्या आयातदारांना सुरक्षित मालवाहू सेवा.",
    whyHolisticTitle: "समग्र कल्याण",
    whyHolisticDesc: "शुद्ध, नैसर्गिक डोंगराळ शरणस्थानात पेशींचे जलद पुनरुज्जीवन.",
    highlightsTitle: "प्रमुख वैशिष्ट्ये",
    highlightsSubtitle: "आमच्या संचालनाचे मुख्य केंद्रबिंदू क्षेत्र",
    exportHighlightTitle: "निर्यात विभागाचे केंद्र",
    therapyHighlightTitle: "थेरेपी विभागाचे केंद्र",
    highlightsExport1: "कृषी उत्पादने",
    highlightsExport1Desc: "हाताने निवडलेली कॅव्हेंडिश केळी, अल्फोन्सो आंबे आणि सेंद्रिय उसाचा अर्क.",
    highlightsExport2: "उत्कृष्ट मसाले",
    highlightsExport2Desc: "सालेम हळद, मोठी वेलची, गुंंटूर मिरची आणि मलबार काळी मिरी.",
    highlightsExport3: "निर्जलीकृत उत्पादने",
    highlightsExport3Desc: "कमी तापमानाचे कांद्याचे तुकडे, स्प्रे-ड्राय केलेले टोमॅटो आणि बीट पावडर.",
    highlightsExport4: "जागतिक रसद",
    highlightsExport4Desc: "सानुकूलित व्हॅक्यूम-सील, एसजीएस प्रमाणपत्रे आणि सीमा शुल्क कागदपत्रे.",
    highlightsTherapy1: "बाख फ्लॉवर थेरेपी",
    highlightsTherapy1Desc: "सक्रिय मानसिक ताण आणि मज्जासंस्थेच्या सुटकेसाठी तयार केलेले पुष्प सत्व.",
    highlightsTherapy2: "रेकी संरेखन",
    highlightsTherapy2Desc: "आभा-क्षेत्र चक्रांचे गैर-आक्रमक संतुलन आणि ऊर्जा संरेखन.",
    highlightsTherapy3: "भावनिक आरोग्य",
    highlightsTherapy3Desc: "थकवा दूर करण्यासाठी आणि मानसिक शांततेसाठी डिझाइन केलेले मज्जासंस्था पुनरुज्जीवन.",
    highlightsTherapy4: "ऊर्जा उपचार",
    highlightsTherapy4Desc: "विद्युत चुंबकीय-गोंधळ विरहित खोल्यांमध्ये ४३२ हर्ट्झ क्वार्ट्ज गायन ध्वनी समस्वरता.",
    statsTitle: "आमचे परिचालन क्षेत्र",
    statsSubtitle: "आमच्या जागतिक प्रभाव आणि नैदानिक यशाचे मोजमाप",
    statCountries: "देशांची सेवा",
    statProducts: "उत्पादन श्रेणी",
    statSessions: "थेरेपी सत्र",
    statSatisfaction: "ग्राहक समाधान",
    testimonialsTitle: "प्रतिध्वनीचे सूर",
    testimonialsSubtitle: "आमचे व्यावसायिक भागीदार आणि शरणस्थानाच्या अभ्यागतांकडून मिळालेला अभिप्राय",
    ctaTitle: "तुमचा प्रवास सुरू करा",
    ctaSubtitle: "आमच्या विशिष्ट विभाग डेस्कशी संपर्क साधा",
    ctaExportBoxTitle: "तुम्ही निर्यात उपाय शोधत आहात का?",
    ctaExportBoxDesc: "घाऊक कंटेनर करार, सानुकूलित पॅकेजिंग किंवा रसद अनुपालनासाठी आमच्या कमोडिटी आर्बिट्राज डेस्कशी संपर्क साधा.",
    ctaExportBoxBtn: "निर्यात डेस्कशी बोला",
    ctaTherapyBoxTitle: "तुम्ही समग्र कल्याणाची शोध घेत आहात का?",
    ctaTherapyBoxDesc: "वैयक्तिक सल्लामसलत वेळ निश्चित करा किंवा वायनाड डोंगराळ शरणस्थानात विला निवासाचे आरक्षण करा.",
    ctaTherapyBoxBtn: "शरणस्थान सत्र बुक करा",
  }
};

export default function Home() {
  const { lang } = useLanguage();
  const activeLang = LOCAL_TRANSLATIONS[lang] ? lang : "en";
  
  const getVal = (key: string) => {
    return LOCAL_TRANSLATIONS[activeLang][key] || LOCAL_TRANSLATIONS["en"][key] || "";
  };

  const showcaseCards = [
    {
      title: getVal("exportCardTitle"),
      subtitle: "Enterprise Global Trade",
      desc: getVal("exportCardDesc"),
      img: IMAGES.home.exportCardBg || IMAGES.export.cargoShipAbout,
      btnText: getVal("exportCardBtn"),
      btnLink: "/export",
      badge: "GLOBAL SUPPLY CHAIN",
      highlights: [
        getVal("exportHighlight1"),
        getVal("exportHighlight2"),
        getVal("exportHighlight3"),
        getVal("exportHighlight4")
      ],
      themeColor: "from-[#0a1828]/95 to-[#070e13]/95 border-luxury-blue-accent/30 hover:border-[#2c526a]/60"
    },
    {
      title: getVal("therapyCardTitle"),
      subtitle: "Restorative Energetic Modalities",
      desc: getVal("therapyCardDesc"),
      img: IMAGES.home.therapyCardBg || IMAGES.therapy.heroAtmosphere,
      btnText: getVal("therapyCardBtn"),
      btnLink: "/wellness",
      badge: "BIOFIELD ATtUNEMENT",
      highlights: [
        getVal("therapyHighlight1"),
        getVal("therapyHighlight2"),
        getVal("therapyHighlight3"),
        getVal("therapyHighlight4")
      ],
      themeColor: "from-[#081e14]/95 to-[#030907]/95 border-emerald-900/30 hover:border-emerald-500/50"
    }
  ];

  const pillars = [
    {
      title: getVal("whyTrustTitle"),
      desc: getVal("whyTrustDesc"),
      icon: ShieldCheck
    },
    {
      title: getVal("whyQualityTitle"),
      desc: getVal("whyQualityDesc"),
      icon: Award
    },
    {
      title: getVal("whyExpertiseTitle"),
      desc: getVal("whyExpertiseDesc"),
      icon: Compass
    },
    {
      title: getVal("whyReachTitle"),
      desc: getVal("whyReachDesc"),
      icon: Globe
    },
    {
      title: getVal("whyHolisticTitle"),
      desc: getVal("whyHolisticDesc"),
      icon: Sparkles
    }
  ];

  const staticTestimonials = [
    {
      name: "Elena Rostova",
      role: "Procurement Director, Hanseatic Spices GmbH",
      city: "Hamburg, Germany",
      content: lang === "hi" 
        ? "धौली मिर्च और इलायची की थोक खरीद के लिए धाराआयुर्वेद हमारा विश्वसनीय भागीदार है। उनकी पैकेजिंग गुणवत्ता और सख्त एसजीएस प्रमाणपत्र उत्कृष्ट हैं।"
        : lang === "mr"
        ? "मसाल्यांच्या घाऊक आयातीसाठी धाराआयुर्वेद आमचा अत्यंत विश्वासू भागीदार आहे. त्यांची पॅकेजिंग गुणवत्ता आणि अचूक एसजीएस प्रमाणपत्रे अतुलनीय आहेत."
        : "Dharaaveda has been our premium partner for spices. Their cardamom shipments arrive vacuum-sealed and perfectly cleared by SGS. Outstanding trade compliance.",
      rating: 5,
      type: "export"
    },
    {
      name: "Marie Lindqvist",
      role: "Wellness Client",
      city: "Stockholm, Sweden",
      content: lang === "hi"
        ? "डॉ. विक्रांति के साथ उसुई रेकी और बाख फ्लावर थेरेपी ने मेरे तंत्रिका तंत्र को पूरी तरह से शांत कर दिया। तनाव और कोशिकीय थकान से राहत के लिए यह एक पवित्र स्थान है।"
        : lang === "mr"
        ? "डॉ. विक्रांती यांच्या मार्गदर्शनाखाली उसुई रेकी आणि बाक फ्लॉवर थेरपीने माझ्या मज्जासंस्थेला पूर्णपणे पूर्ववत केले. जुना ताण आणि थकवा दूर करण्यासाठी हे सर्वोत्तम स्थान आहे."
        : "The Usui Reiki and Bach Flower cycles with Dr. Vikranti completely restored my nervous system after years of chronic stress. A truly sacred space.",
      rating: 5,
      type: "therapy"
    },
    {
      name: "Rashed Al-Mansoori",
      role: "Founder, Gulf Agri Distributors",
      city: "Dubai, UAE",
      content: lang === "hi"
        ? "निर्जलीकृत प्याज के फ्लेक्स और जैविक गन्ने के उत्पादों की आपूर्ति के लिए उनका कृषि प्रभाग शानदार है। समय पर डिलीवरी और बेदाग रसद।"
        : lang === "mr"
        ? "निर्जलीकृत कांदा आणि सेंद्रिय उसाच्या उत्पादनांच्या पुरवठ्यासाठी त्यांचा विभाग उत्कृष्ट आहे. वेळेत डिलिव्हरी आणि पारदर्शक रसद."
        : "Their agricultural supply-chain for dehydrated flakes and organic extracts is top-tier. Extremely reliable shipments, consistent quality, and prompt communication.",
      rating: 5,
      type: "export"
    },
    {
      name: "Heinrich Müller",
      role: "Retreat Resident",
      city: "Munich, Germany",
      content: lang === "hi"
        ? "वायनाड के वन विला में क्वार्ट्ज गायन ध्वनि तरंगों के सत्र ने मेरे शरीर को फिर से ऊर्जा से भर दिया। ईएमएफ विकिरण से मुक्त वातावरण अद्भुत था।"
        : lang === "mr"
        ? "वायनाडच्या जंगल विलामध्ये झालेल्या क्वार्ट्ज ध्वनी थेरपीच्या सत्राने शरीराला एक नवीन ऊर्जा दिली. विद्युत चुंबकीय गोंधळापासून मुक्त परिसर थक्क करणारा आहे."
        : "The quartz sound healing attunements inside the Wayanad forest gardens felt like a biological reset. The absence of EMF noise was key.",
      rating: 5,
      type: "therapy"
    }
  ];

  return (
    <div className="relative bg-white text-gray-900 min-h-screen overflow-hidden flex flex-col font-sans select-none">
      


      {/* SECTION 1: HERO - DUAL-DIVISION STORYTELLING ENTRY */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-50 to-white border-b border-gray-200">
        
        {/* Decorative Grid & Glowing Orbs */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto w-full text-center relative z-10 py-12 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-orange-600"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span className="font-bold">Enterprise Trade & Restoration Clinics</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-wide text-gray-900"
          >
            {getVal("heroTitle")}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-lg text-gray-600 font-light leading-relaxed max-w-3xl mx-auto font-sans"
          >
            {getVal("heroSubtitle")}
          </motion.p>

          {/* Dual CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-6 pt-4"
          >
            <Link 
              to="/export"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 font-mono shadow-md shadow-orange-500/20 hover:scale-105 rounded-sm cursor-pointer"
            >
              <span>{getVal("ctaExports")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/wellness"
              className="px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 font-mono hover:scale-105 rounded-sm cursor-pointer"
            >
              <span>{getVal("ctaTherapies")}</span>
              <Compass className="w-4 h-4 text-orange-500" />
            </Link>
          </motion.div>

          {/* Down Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="pt-16 flex justify-center"
          >
            <a href="#about" className="animate-bounce p-2 rounded-full border border-gray-200 hover:border-orange-500 transition-colors">
              <ChevronDown className="w-5 h-5 text-orange-500" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ABOUT DHARAAVEDA */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] relative border-b border-gray-200">
        <div className="absolute top-0 right-10 w-[1px] h-48 bg-gradient-to-b from-orange-500/30 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto space-y-8 relative z-10 text-center">
          <span className="text-[10px] font-mono tracking-[0.4em] text-orange-600 uppercase block font-medium">
            {getVal("aboutSubtitle")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {getVal("aboutTitle")}
          </h2>
          <div className="w-16 h-[1px] bg-orange-500 mx-auto" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto pt-6 text-sm sm:text-base leading-relaxed text-gray-600 font-light">
            <p>{getVal("aboutDesc1")}</p>
            <p>{getVal("aboutDesc2")}</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: TWO-DIVISION SHOWCASE SECTION */}
      <section id="divisions" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative border-b border-gray-200">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-orange-600 uppercase block font-medium">
              OPERATIONAL HORIZONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              {getVal("showcaseTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light max-w-xl mx-auto">
              {getVal("showcaseSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {showcaseCards.map((card, idx) => (
              <div 
                key={idx}
                className="flex flex-col rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:border-orange-500/40 group min-h-[550px]"
              >
                {/* Image top container */}
                <div className="h-56 w-full overflow-hidden relative pointer-events-none">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-[1.03] group-hover:scale-110 filter brightness-[0.85] saturate-[0.9]"
                    style={{ backgroundImage: `url('${card.img}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                </div>

                {/* Bottom content container */}
                <div className="p-8 sm:p-10 flex flex-col justify-between flex-grow space-y-6">
                  {/* Header */}
                  <div className="space-y-2 text-left">
                    <span className="text-[9px] font-mono tracking-widest text-orange-600 uppercase block font-bold">
                      {card.badge}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                      {card.title}
                    </h3>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Body description */}
                  <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed text-left">
                    {card.desc}
                  </p>

                  {/* Highlights */}
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-left font-mono text-[10px] sm:text-xs text-gray-700">
                    {card.highlights.map((high, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span>{high}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action link button */}
                  <div className="pt-4 text-left">
                    <Link
                      to={card.btnLink}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 font-mono rounded-lg shadow-md shadow-orange-500/10 hover:scale-[1.02] cursor-pointer"
                    >
                      <span>{card.btnText}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE DHARAAVEDA */}
      <section id="why-choose-us" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] relative border-b border-gray-200">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-orange-600 uppercase block font-medium">
              CORE CAPABILITIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              {getVal("whyTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light max-w-xl mx-auto">
              {getVal("whySubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4 text-left hover:border-orange-500/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-light">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED HIGHLIGHTS */}
      <section id="featured-highlights" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative border-b border-gray-200">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-orange-600 uppercase block font-medium">
              PORTFOLIO HIGHLIGHTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              {getVal("highlightsTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light max-w-xl mx-auto">
              {getVal("highlightsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* EXPORTS HIGHLIGHTS COLUMN */}
            <div className="space-y-8 p-8 sm:p-10 rounded-3xl bg-slate-50 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                  {getVal("exportHighlightTitle")}
                </h3>
              </div>

              <div className="space-y-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0 text-orange-500 shadow-sm">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 font-serif">{getVal("highlightsExport1")}</h4>
                    <p className="text-xs text-gray-500 mt-1">{getVal("highlightsExport1Desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0 text-orange-500 shadow-sm">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 font-serif">{getVal("highlightsExport2")}</h4>
                    <p className="text-xs text-gray-500 mt-1">{getVal("highlightsExport2Desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0 text-orange-500 shadow-sm">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 font-serif">{getVal("highlightsExport3")}</h4>
                    <p className="text-xs text-gray-500 mt-1">{getVal("highlightsExport3Desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0 text-orange-500 shadow-sm">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 font-serif">{getVal("highlightsExport4")}</h4>
                    <p className="text-xs text-gray-500 mt-1">{getVal("highlightsExport4Desc")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* THERAPY HIGHLIGHTS COLUMN */}
            <div className="space-y-8 p-8 sm:p-10 rounded-3xl bg-slate-50 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                  {getVal("therapyHighlightTitle")}
                </h3>
              </div>

              <div className="space-y-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0 text-orange-500 shadow-sm">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 font-serif">{getVal("highlightsTherapy1")}</h4>
                    <p className="text-xs text-gray-500 mt-1">{getVal("highlightsTherapy1Desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0 text-orange-500 shadow-sm">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 font-serif">{getVal("highlightsTherapy2")}</h4>
                    <p className="text-xs text-gray-500 mt-1">{getVal("highlightsTherapy2Desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0 text-orange-500 shadow-sm">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 font-serif">{getVal("highlightsTherapy3")}</h4>
                    <p className="text-xs text-gray-500 mt-1">{getVal("highlightsTherapy3Desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0 text-orange-500 shadow-sm">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 font-serif">{getVal("highlightsTherapy4")}</h4>
                    <p className="text-xs text-gray-500 mt-1">{getVal("highlightsTherapy4Desc")}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: STATISTICS SECTION */}
      <section id="statistics" className="relative py-20 bg-slate-50 border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.4em] text-orange-600 uppercase block font-medium">
              CUMULATIVE PERFORMANCE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900">
              {getVal("statsTitle")}
            </h2>
            <div className="w-12 h-[1px] bg-orange-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 flex items-baseline gap-0.5">
                <CountUpStat target={34} decimals={0} suffix="+" />
              </span>
              <p className="text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-500 uppercase mt-2">
                {getVal("statCountries")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 flex items-baseline gap-0.5">
                <CountUpStat target={4} decimals={0} suffix="+" />
              </span>
              <p className="text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-500 uppercase mt-2">
                {getVal("statProducts")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 flex items-baseline gap-0.5">
                <CountUpStat target={1000} decimals={0} suffix="+" />
              </span>
              <p className="text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-500 uppercase mt-2">
                {getVal("statSessions")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 flex items-baseline gap-0.5">
                <CountUpStat target={99.8} decimals={1} suffix="%" />
              </span>
              <p className="text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-500 uppercase mt-2">
                {getVal("statSatisfaction")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative border-b border-gray-200">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-orange-600 uppercase block font-medium">
              VERIFIED SUCCESS STORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              {getVal("testimonialsTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light max-w-xl mx-auto">
              {getVal("testimonialsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {staticTestimonials.map((test, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 border border-gray-200 bg-white hover:border-orange-500/30 hover:shadow-lg relative flex flex-col justify-between transition-all duration-300"
              >
                <Quote className="absolute right-8 top-8 w-12 h-12 text-orange-500/5" />
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[8px] font-mono uppercase border ${
                      test.type === "export" 
                        ? "bg-blue-50 border-blue-100 text-blue-600"
                        : "bg-emerald-50 border-emerald-100 text-emerald-600"
                    }`}>
                      {test.type === "export" ? "Export Partner" : "Therapy Client"}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: test.rating }).map((_, r) => (
                        <Star key={r} className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm italic text-gray-600 leading-relaxed pt-2 font-sans font-light">
                    "{test.content}"
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-6 border-t border-gray-100 mt-6 text-left">
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-xs sm:text-sm font-semibold text-gray-900 tracking-wide">
                      {test.name}
                    </h4>
                    <p className="text-[10px] font-mono text-gray-500 leading-none">
                      {test.role} • {test.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CALL TO ACTION SECTION */}
      <section id="cta" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] border-b border-gray-200 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-orange-600 uppercase block font-medium">
              COMMUNAL GATEWAYS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              {getVal("ctaTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light max-w-xl mx-auto">
              {getVal("ctaSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            
            {/* EXPORTS CTA BOX */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left space-y-6">
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-orange-500 tracking-widest uppercase font-bold">COMMODITY LOGISTICS</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                  {getVal("ctaExportBoxTitle")}
                </h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  {getVal("ctaExportBoxDesc")}
                </p>
              </div>
              <div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 font-mono rounded-lg shadow-md shadow-orange-500/10 cursor-pointer"
                >
                  <span>{getVal("ctaExportBoxBtn")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* THERAPY CTA BOX */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left space-y-6">
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-orange-500 tracking-widest uppercase font-bold">VIBRATIONAL ADMISSIONS</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                  {getVal("ctaTherapyBoxTitle")}
                </h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  {getVal("ctaTherapyBoxDesc")}
                </p>
              </div>
              <div>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 border border-transparent text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 font-mono rounded-lg shadow-md shadow-orange-500/10 cursor-pointer"
                >
                  <span>{getVal("ctaTherapyBoxBtn")}</span>
                  <Compass className="w-3.5 h-3.5 text-white" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEO FOOTER TAGS STRIP */}
      <section className="bg-[#080808] py-8 border-t border-gray-900 text-center px-4 relative z-10 select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider">
          <span>Indian Exporter</span>
          <span className="text-orange-500/30">•</span>
          <span>Agricultural Exporter</span>
          <span className="text-orange-500/30">•</span>
          <span>Spice Exporter</span>
          <span className="text-orange-500/30">•</span>
          <span>Dehydrated Vegetable Exporter</span>
          <span className="text-orange-500/30">•</span>
          <span>Global Trade</span>
          <span className="text-orange-500/30">•</span>
          <span>International Supply Chain</span>
          <span className="text-orange-500/30">•</span>
          <span>Bulk Export Supplier</span>
        </div>
      </section>

    </div>
  );
}
