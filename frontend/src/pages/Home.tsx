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
import OptimizedImage from "../components/OptimizedImage";
import { staticTranslations } from "../lib/translations";
import { useSeo } from "../lib/useSeo";

interface CountUpStatProps {
  target: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

function CountUpStat({ target, decimals = 0, suffix = "", duration = 1200 }: CountUpStatProps) {
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
      let isBlinking = false;
      if (percentage < 1) {
        isBlinking = Math.random() > 0.55;
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
      }

      if (elementRef.current) {
        const valNode = elementRef.current.querySelector(".counter-val");
        if (valNode) {
          valNode.textContent = formatted;
        }

        // Direct DOM class manipulation for blinking effect to prevent React re-renders
        if (isBlinking) {
          elementRef.current.className = "transition-all duration-75 tabular-nums text-orange-500 opacity-90 scale-95 inline-block";
        } else {
          elementRef.current.className = "transition-all duration-75 tabular-nums text-gray-900 scale-100 inline-block";
        }
      }

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <span 
      ref={elementRef} 
      className="transition-all duration-75 tabular-nums text-gray-900 scale-100 inline-block"
    >
      <span className="counter-val">0</span>
      <span className="text-orange-500 ml-0.5">{suffix}</span>
    </span>
  );
}


export default function Home() {
  const { lang } = useLanguage();
  const t = staticTranslations[lang] || staticTranslations.en;
  useSeo(t.seo?.homeTitle || staticTranslations.en.seo?.homeTitle, t.seo?.homeDesc || staticTranslations.en.seo?.homeDesc);
  
  const getVal = (key: string) => {
    return t.home?.[key] || staticTranslations.en.home?.[key] || "";
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
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-no-repeat border-b border-gray-100"
        style={{ 
          backgroundImage: `url(${IMAGES.home.heroBg})`,
          backgroundPosition: 'center bottom',
          backgroundSize: 'cover'
        }}
      >
        {/* Subtle gradient overlay for readability and vibrancy (20%-35% maximum opacity) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/20 to-white/30 dark:from-slate-950/35 dark:via-slate-950/20 dark:to-slate-950/30 pointer-events-none z-0" />
        
        {/* Decorative Grid & Glowing Orbs */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none z-0" />
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse z-0" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

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
                  <OptimizedImage
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-1000 scale-[1.03] group-hover:scale-110 filter brightness-[0.85] saturate-[0.9]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent z-10" />
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
