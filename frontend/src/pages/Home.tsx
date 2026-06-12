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
  HelpCircle,
  TrendingUp,
  Briefcase
} from "lucide-react";
import { IMAGES } from "../data/images";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";
import ScrollEnergyLine from "../components/ScrollEnergyLine";

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
        isBlinking ? "text-[#c5a059] opacity-90 scale-95" : "text-white scale-100"
      } inline-block`}
    >
      {displayValue}
      <span className="text-[#c5a059] ml-0.5">{suffix}</span>
    </span>
  );
}

// Fallback translation dictionary for robust locale support
const defaultHomeTranslations = {
  heroTitle: "Global Export Solutions",
  heroSubtitle: "Premium Indian Agricultural Products & Quality Assured Export Services with Worldwide Shipping and Compliance Support.",
  heroCtaProducts: "Explore Products",
  heroCtaQuote: "Get Export Quote",
  aboutTitle: "Connecting Indian Quality to Global Markets",
  aboutText: "We specialize in exporting premium Indian agricultural products, spices, dehydrated vegetables, grains, pulses, and natural ingredients to international markets. Our focus is quality assurance, timely delivery, international standards, and long-term business relationships.",
  whatWeExportTitle: "What We Export",
  whatWeExportSubtitle: "High-Quality Indian Spices, Agro Products, and Dehydrated Ingredients for Global Industries",
  cat1Title: "Whole & Ground Spices",
  cat1Desc: "Elite green cardamom, high-curcumin turmeric, bold black pepper, Guntur chillies, and premium culinary seasonings.",
  cat2Title: "Agriculture Products",
  cat2Desc: "Premium hand-harvested fresh mangoes, Bhagwa pomegranates, Nashik grapes, and organic sugarcane extracts.",
  cat3Title: "Dehydrated Vegetables & Fruits",
  cat3Desc: "Low-temperature dehydrated onion flakes, garlic powder, spray-dried tomato powder, and nutrient-dense beetroot.",
  cat4Title: "Pulses & Lentils",
  cat4Desc: "A-grade split red lentils, chickpeas, organic black gram, and high-protein agricultural pulses.",
  cat5Title: "Oil Seeds",
  cat5Desc: "Bold sesame seeds, mustard seeds, high oil-content fennel, cumin, and certified organic seeds.",
  cat6Title: "Herbal & Natural Products",
  cat6Desc: "Purified Himalayan Shilajit resin, Wayanad moringa powder, and certified botanical leaf extracts.",
  whyChooseUsTitle: "Why Partners Trust Us",
  whyChooseUsSubtitle: "We establish long-term trade relations built on strict standards, reliable networks, and total compliance.",
  why1Title: "International Quality Standards",
  why1Desc: "Every shipment matches rigorous global standards, featuring APEDA certification and optional client-specific lab testing.",
  why2Title: "Reliable Supply Chain",
  why2Desc: "Direct partnerships with smallholder farms and estates eliminate middle-layer delays, ensuring consistent crop supply.",
  why3Title: "Global Logistics Support",
  why3Desc: "Robust sea container shipping, customized air freight, and full-process cargo tracking to global ports.",
  why4Title: "Competitive Pricing",
  why4Desc: "Commodity arbitrage modeling and direct-origin sourcing ensure premium products at optimized wholesale rates.",
  why5Title: "Export Documentation Assistance",
  why5Desc: "Complete trade compliance, including phytosanitary certificates, SGS inspection, customs filings, and bills of lading.",
  why6Title: "Bulk Order Capability",
  why6Desc: "Scale-ready operations from mixed container shipping to high-volume cargo tons with customized vacuum packaging.",
  statsTitle: "Our Trade Footprint",
  statsProducts: "Product Categories",
  statsCountries: "Countries Served",
  statsQuality: "Quality Checks",
  statsSatisfaction: "Customer Satisfaction",
  processTitle: "Our Export Process",
  processSubtitle: "A highly structured, trace-audited journey from Indian fields to global harbors.",
  processStep1Title: "Product Selection",
  processStep1Desc: "Direct-source selection of crop lots matching precise size, color, moisture, and curcumin parameters.",
  processStep2Title: "Quality Inspection",
  processStep2Desc: "Analytical testing for chemical residues, heavy metals, and mold in partner laboratories prior to packaging.",
  processStep3Title: "Packaging & Documentation",
  processStep3Desc: "Custom vacuum-tight sealing, UV-barrier bags, phytosanitary licensing, and complete customs documentation prep.",
  processStep4Title: "Global Shipping",
  processStep4Desc: "Ocean container boarding at Nhava Sheva (Mumbai) or express air cargo routing for temperature-sensitive goods.",
  processStep5Title: "Delivery & Support",
  processStep5Desc: "Harbor customs routing, inland supply coordination, and continuous post-delivery support.",
  marketsTitle: "Global Markets We Serve",
  marketsSubtitle: "We supply premium agricultural ingredients to leading importers across major global regions.",
  certificationsTitle: "Certifications & Quality Assurance",
  certificationsSubtitle: "Our processes are compliant with the world's most demanding health, safety, and trade organizations.",
  cert1Title: "Quality Tested Products",
  cert1Desc: "Gas chromatography and lab certificates verify chemical purity.",
  cert2Title: "Hygienic Processing",
  cert2Desc: "Mechanized cleaning and sorting ensure zero foreign matter.",
  cert3Title: "Export Standard Packaging",
  cert3Desc: "Aluminum-foil lined cartons and vacuum seals retain volatile oils.",
  cert4Title: "International Compliance",
  cert4Desc: "Full alignment with APEDA, SGS, and regional custom guidelines.",
  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Find direct answers to standard trade operations, bulk container queries, and logistics timelines.",
  faq1Q: "What products do you export?",
  faq1A: "We specialize in exporting premium Indian whole and ground spices (cardamom, turmeric, pepper), dehydrated vegetables and fruits (onions, garlic, tomatoes), pulses, lentils, oil seeds, and natural remedies like Shilajit resin.",
  faq2Q: "Do you support bulk orders?",
  faq2A: "Yes, we specialize in high-volume B2B contract supplies. Our logistics support ranges from consolidated LCL mixed container cargo to full container loads (FCL) of multiple metric tons.",
  faq3Q: "Which countries do you export to?",
  faq3A: "We export to over 34 countries across the Middle East, Europe, North America, Africa, and East Asia, delivering direct to regional logistics hubs and ports.",
  faq4Q: "How can I request a quotation?",
  faq4A: "You can request a quotation by clicking 'Get Export Quote' or navigating to our Contact page. Please provide your company details, target quantity (in metric tons or kilograms), and preferred port of load.",
  faq5Q: "What certifications do you provide?",
  faq5A: "Every shipment includes standard APEDA export authorizations, certified phytosanitary certificates, certificate of origin, and invoices. On-demand SGS laboratory purity testing and analysis reports can be attached."
};

export default function Home() {
  const { lang } = useLanguage();
  const t = (staticTranslations[lang] || staticTranslations["en"]).home;

  // Translation lookup with fallback
  const getVal = (key: keyof typeof defaultHomeTranslations) => {
    return t[key] || defaultHomeTranslations[key];
  };

  // FAQ Accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const exportCategories = [
    { id: "spices", title: getVal("cat1Title"), desc: getVal("cat1Desc"), icon: Flame },
    { id: "fruits", title: getVal("cat2Title"), desc: getVal("cat2Desc"), icon: Sparkles },
    { id: "dehydrated", title: getVal("cat3Title"), desc: getVal("cat3Desc"), icon: Sun },
    { id: "pulses", title: getVal("cat4Title"), desc: getVal("cat4Desc"), icon: Layers },
    { id: "seeds", title: getVal("cat5Title"), desc: getVal("cat5Desc"), icon: Droplet },
    { id: "herbal", title: getVal("cat6Title"), desc: getVal("cat6Desc"), icon: Leaf }
  ];

  const whyChooseUs = [
    { title: getVal("why1Title"), desc: getVal("why1Desc"), icon: Award },
    { title: getVal("why2Title"), desc: getVal("why2Desc"), icon: Compass },
    { title: getVal("why3Title"), desc: getVal("why3Desc"), icon: Truck },
    { title: getVal("why4Title"), desc: getVal("why4Desc"), icon: Globe },
    { title: getVal("why5Title"), desc: getVal("why5Desc"), icon: FileText },
    { title: getVal("why6Title"), desc: getVal("why6Desc"), icon: Package }
  ];

  const processSteps = [
    { step: "01", title: getVal("processStep1Title"), desc: getVal("processStep1Desc") },
    { step: "02", title: getVal("processStep2Title"), desc: getVal("processStep2Desc") },
    { step: "03", title: getVal("processStep3Title"), desc: getVal("processStep3Desc") },
    { step: "04", title: getVal("processStep4Title"), desc: getVal("processStep4Desc") },
    { step: "05", title: getVal("processStep5Title"), desc: getVal("processStep5Desc") }
  ];

  const globalMarkets = [
    { name: "Middle East", ports: "Jebel Ali (UAE), Jeddah (KSA)", focus: "Cardamom, Premium Spices, Fresh Fruits" },
    { name: "Europe", ports: "Rotterdam (NL), Hamburg (DE)", focus: "Dehydrated Veg Powders, Organic Spices, Shilajit" },
    { name: "Asia", ports: "Singapore, Tokyo (JP)", focus: "Oil Seeds, Herbal Extracts, Jaggery Evaporates" },
    { name: "Africa", ports: "Durban (ZA), Port Said (EG)", focus: "Agricultural Grains, Pulses, Bulk Spices" },
    { name: "North America", ports: "New York (US), Vancouver (CA)", focus: "Moringa, Organic Turmeric, Health Superfoods" }
  ];

  const qaCertifications = [
    { title: getVal("cert1Title"), desc: getVal("cert1Desc"), badge: "SGS Verified" },
    { title: getVal("cert2Title"), desc: getVal("cert2Desc"), badge: "HACCP Audited" },
    { title: getVal("cert3Title"), desc: getVal("cert3Desc"), badge: "ISO 22000" },
    { title: getVal("cert4Title"), desc: getVal("cert4Desc"), badge: "APEDA Approved" }
  ];

  const faqs = [
    { q: getVal("faq1Q"), a: getVal("faq1A") },
    { q: getVal("faq2Q"), a: getVal("faq2A") },
    { q: getVal("faq3Q"), a: getVal("faq3A") },
    { q: getVal("faq4Q"), a: getVal("faq4A") },
    { q: getVal("faq5Q"), a: getVal("faq5A") }
  ];

  return (
    <div className="relative bg-[#050d0a] text-white min-h-screen overflow-hidden flex flex-col font-sans select-none">

      {/* Scroll-driven energy lightning line — fixed left side */}
      <ScrollEnergyLine />
      
      {/* SECTION 1: HERO - INTERNATIONAL TRADE BRANDING */}
      <section id="hero" className="relative min-h-screen flex items-center pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-radial-[circle_at_bottom_left,_#0a2218_0%,_#050d0a_100%] border-b border-luxury-gold/15">
        {/* Decorative Grid Grid & Glowing Orbs */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-950/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 py-12">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#c5a059]"
            >
              <Compass className="w-3.5 h-3.5 animate-spin-slow text-[#c5a059]" />
              <span className="font-bold">Indian Exporter & Bulk Export Supplier</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-wide text-white"
            >
              {getVal("heroTitle")}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] via-yellow-200 to-[#c5a059] font-light italic glow-text-gold">
                {t.agriTitle || "Premium Indian Agricultural Products"}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-2xl"
            >
              {getVal("heroSubtitle")}
            </motion.p>

            {/* Micro Feature Flags */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-md pt-2 text-xs font-mono text-gray-300"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Quality Assured Export Services</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Worldwide Shipping Networks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Export Compliance Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>100% Traceable supply-chain</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link 
                to="/export"
                className="px-6 py-3 bg-[#c5a059] hover:bg-[#a17f40] text-black font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 font-mono glow-btn-gold"
              >
                <span>{getVal("heroCtaProducts")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/contact"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-luxury-gold/50 text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 font-mono"
              >
                <span>{getVal("heroCtaQuote")}</span>
                <ChevronRight className="w-4 h-4 text-[#c5a059]" />
              </Link>
            </motion.div>
          </div>

          {/* Right Visual Console */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold to-emerald-600 rounded-3xl blur opacity-10 group-hover:opacity-15 transition-opacity" />
            <div className="relative glass-panel-dark p-6 rounded-3xl border border-luxury-gold/20 overflow-hidden shadow-2xl space-y-6">
              
              {/* Inner Cargo Image Frame */}
              <div className="relative rounded-2xl overflow-hidden h-[240px] sm:h-[280px] border border-white/5">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] group-hover:scale-110"
                  style={{ backgroundImage: `url('${IMAGES.export.cargoShip}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[9px] font-mono tracking-widest text-[#c5a059] uppercase block">ACTIVE VESSEL</span>
                    <p className="text-sm font-serif font-bold text-white leading-tight">DharaAveda Ocean Liner</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/30 rounded text-[9px] font-mono text-emerald-400">IN TRANSIT</span>
                </div>
              </div>

              {/* Transit Mock Metadata Dashboard */}
              <div className="grid grid-cols-2 gap-4 text-left border-t border-white/10 pt-4 text-xs font-mono">
                <div>
                  <p className="text-gray-400 text-[10px]">ORIGIN PORT</p>
                  <p className="text-white font-medium mt-0.5">Nhava Sheva, IN</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px]">COMPLIANCE STATUS</p>
                  <p className="text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Cleared
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px]">DOCUMENTATION</p>
                  <p className="text-[#c5a059] font-medium mt-0.5">APEDA / SGS Sealed</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px]">GLOBAL LOGISTICS</p>
                  <p className="text-white font-medium mt-0.5">Ocean & Air Routing</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2: ABOUT OUR EXPORTS */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#030907] relative border-b border-luxury-gold/15">
        <div className="absolute top-0 right-10 w-[1px] h-48 bg-gradient-to-b from-luxury-gold/30 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Visual Left Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
            <div className="absolute -inset-4 bg-luxury-gold/5 rounded-3xl blur-2xl pointer-events-none" />
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-luxury-gold/15 shadow-xl h-[180px]">
                <img 
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?fm=webp&fit=crop&q=80&w=400" 
                  alt="Harvesting Spices" 
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-luxury-gold/15 shadow-xl h-[220px]">
                <img 
                  src="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?fm=webp&fit=crop&q=80&w=400" 
                  alt="Premium Herbs" 
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden border border-luxury-gold/15 shadow-xl h-[220px]">
                <img 
                  src="https://images.unsplash.com/photo-1598514983318-291419f5b9d8?fm=webp&fit=crop&q=80&w=400" 
                  alt="Dehydrated Vegetables" 
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-luxury-gold/15 shadow-xl h-[180px]">
                <img 
                  src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?fm=webp&fit=crop&q=80&w=400" 
                  alt="Jaggery Evaporation" 
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>

          {/* Texts Right block */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] uppercase block font-medium">
              WHOLE & BULK AGRI EXPORTER
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white border-b border-luxury-gold/10 pb-4">
              {getVal("aboutTitle")}
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              {getVal("aboutText")}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Our business model guarantees trace-verified direct sourcing from organic agriculture farms, processing under stringent hygienic guidelines, zero-loss vacuum-barrier packaging, and expedited sea or air shipping. As a trusted <strong className="text-white font-medium">Spice Exporter</strong> and <strong className="text-white font-medium">Agricultural Exporter</strong>, we handle complex phytosanitary protocols to ensure cargo clears global ports without friction.
            </p>

            {/* Keyword Tags Strip */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              {["Indian Exporter", "Spice Exporter", "Agricultural Exporter", "Dehydrated Vegetable Exporter", "Global Trade", "Bulk Export Supplier"].map((kw, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-white/[0.03] border border-white/10 hover:border-luxury-gold/30 transition-colors text-[10px] font-mono uppercase tracking-wider text-gray-300"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE EXPORT */}
      <section id="categories" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050d0a] relative border-b border-luxury-gold/15">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] uppercase block font-medium">
              OUR EXPORT SECTOR RANGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {getVal("whatWeExportTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              {getVal("whatWeExportSubtitle")}
            </p>
          </div>

          {/* Modern Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exportCategories.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <Link 
                  key={cat.id} 
                  to="/export"
                  className="group block relative p-8 glass-panel-dark rounded-2xl border border-luxury-gold/15 hover:border-luxury-gold/50 shadow-lg text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
                >
                  {/* Glowing card graphic background */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-luxury-gold/5 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div className="space-y-5">
                    {/* Glowing Circular Icon wrapper */}
                    <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold/20 rounded-full flex items-center justify-center text-[#c5a059] group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 text-[#c5a059] group-hover:text-white transition-colors" />
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#c5a059] transition-colors">
                      {cat.title}
                    </h3>
                    
                    <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {cat.desc}
                    </p>

                    <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono tracking-widest text-[#c5a059] uppercase group-hover:text-white pt-2 transition-colors">
                      <span>View Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section id="why-choose-us" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#030907] relative border-b border-luxury-gold/15">
        <div className="absolute bottom-1/4 right-8 w-[1px] h-32 bg-gradient-to-b from-transparent via-luxury-gold/30 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] uppercase block font-medium">
              CORE CAPABILITIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {getVal("whyChooseUsTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              {getVal("whyChooseUsSubtitle")}
            </p>
          </div>

          {/* Grid of Strengths */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-left hover:border-luxury-gold/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-luxury-gold/10 border border-luxury-gold/25 flex items-center justify-center text-[#c5a059]">
                    <Icon className="w-5 h-5 text-[#c5a059]" />
                  </div>
                  <h3 className="font-serif text-md sm:text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: EXPORT STATISTICS SECTION (Counters) */}
      <section id="statistics" className="relative py-16 bg-radial-[circle_at_center,_#0a2217_0%,_#030907_100%] border-b border-luxury-gold/15 overflow-hidden">
        {/* Absolute Background Accent Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white flex items-baseline gap-0.5">
                <CountUpStat target={4} decimals={0} suffix="+" />
              </span>
              <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mt-2">
                {getVal("statsProducts")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white flex items-baseline gap-0.5">
                <CountUpStat target={34} decimals={0} suffix="+" />
              </span>
              <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mt-2">
                {getVal("statsCountries")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white flex items-baseline gap-0.5">
                <CountUpStat target={100} decimals={0} suffix="%" />
              </span>
              <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mt-2">
                {getVal("statsQuality")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white flex items-baseline gap-0.5">
                <CountUpStat target={99.8} decimals={1} suffix="%" />
              </span>
              <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mt-2">
                {getVal("statsSatisfaction")}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: EXPORT PROCESS (Timeline) */}
      <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050d0a] relative border-b border-luxury-gold/15">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] uppercase block font-medium">
              STEP-BY-STEP WORKFLOW
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {getVal("processTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              {getVal("processSubtitle")}
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 border-l border-luxury-gold/30 space-y-12 py-4 text-left">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative group">
                
                {/* Timeline Bullet Ring */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#050d0a] border-2 border-[#c5a059] flex items-center justify-center text-[9px] font-mono font-bold text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-black transition-colors duration-300">
                  {step.step}
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-white group-hover:text-[#c5a059] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: GLOBAL MARKETS WE SERVE */}
      <section id="markets" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#030907] relative border-b border-luxury-gold/15">
        <div className="absolute top-1/4 left-10 w-[1px] h-48 bg-gradient-to-b from-luxury-gold/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] uppercase block font-medium">
              TERRITORIES COVERED
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {getVal("marketsTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              {getVal("marketsSubtitle")}
            </p>
          </div>

          {/* Interactive Continents Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {globalMarkets.map((market, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl glass-panel-dark border border-luxury-gold/10 hover:border-luxury-gold/30 text-left transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#c5a059] tracking-wider uppercase">REGION</span>
                    <Globe className="w-3.5 h-3.5 text-[#c5a059]/40" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {market.name}
                  </h3>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/5 text-[11px] font-sans">
                  <div>
                    <span className="text-gray-500 font-mono text-[9px] uppercase">KEY DESTINATIONS</span>
                    <p className="text-gray-300 font-medium leading-tight mt-0.5">{market.ports}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 font-mono text-[9px] uppercase">PRODUCT SEGMENTS</span>
                    <p className="text-[#c5a059] font-medium leading-tight mt-0.5">{market.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CERTIFICATIONS & QUALITY ASSURANCE */}
      <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050d0a] relative border-b border-luxury-gold/15">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] uppercase block font-medium">
              COMPLIANCE & TRACEABILITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {getVal("certificationsTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              {getVal("certificationsSubtitle")}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qaCertifications.map((cert, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left flex flex-col justify-between space-y-4 hover:border-luxury-gold/20 transition-all duration-300"
              >
                <div className="space-y-2">
                  <span className="inline-block px-2 py-0.5 bg-luxury-gold/10 border border-luxury-gold/20 rounded text-[9px] font-mono text-[#c5a059]">
                    {cert.badge}
                  </span>
                  <h3 className="font-serif text-base font-bold text-white">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
                    {cert.desc}
                  </p>
                </div>
                
                <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[9px] font-mono text-[#c5a059]/75">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Trade Compliant</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ SECTION */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#030907] relative border-b border-luxury-gold/15">
        <div className="max-w-4xl mx-auto space-y-16 relative z-10">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#c5a059] uppercase block font-medium">
              CLEAR ANSWERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {getVal("faqTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              {getVal("faqSubtitle")}
            </p>
          </div>

          {/* FAQ Accordion list */}
          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-luxury-gold/10 bg-white/[0.01] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-5 px-6 sm:px-8 flex items-center justify-between gap-4 text-left hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <span className="font-serif text-sm sm:text-base font-semibold text-white group-hover:text-[#c5a059]">
                      {faq.q}
                    </span>
                    <div className={`w-6 h-6 rounded-full border border-luxury-gold/20 flex items-center justify-center text-[#c5a059] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-luxury-gold/10" : ""}`}>
                      <ChevronDown className="w-4 h-4 text-[#c5a059]" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 sm:px-8 pb-6 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 10: SEO FOOTER TAGS STRIP */}
      <section className="bg-[#020504] py-8 border-t border-white/5 text-center px-4 relative z-10 select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider">
          <span>Indian Exporter</span>
          <span className="text-luxury-gold/30">•</span>
          <span>Agricultural Exporter</span>
          <span className="text-luxury-gold/30">•</span>
          <span>Spice Exporter</span>
          <span className="text-luxury-gold/30">•</span>
          <span>Dehydrated Vegetable Exporter</span>
          <span className="text-luxury-gold/30">•</span>
          <span>Global Trade</span>
          <span className="text-luxury-gold/30">•</span>
          <span>International Supply Chain</span>
          <span className="text-luxury-gold/30">•</span>
          <span>Bulk Export Supplier</span>
        </div>
      </section>

    </div>
  );
}
