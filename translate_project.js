import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { EXPORT_CATEGORIES } from "./frontend/src/data/exportProducts.ts";

// Load environment variables from .env in the project root
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is not defined in the environment or .env file.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const languages = [
  { code: "hi", name: "Hindi" },
  { code: "mr", name: "Marathi" },
  { code: "sa", name: "Sanskrit" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "ml", name: "Malayalam" },
  { code: "kn", name: "Kannada" },
  { code: "gu", name: "Gujarati" },
  { code: "pa", name: "Punjabi" },
  { code: "tr", name: "Turkish" },
  { code: "nl", name: "Dutch" }
];

// Build products translation master
const productsMaster = {
  categories: {},
  items: {}
};

EXPORT_CATEGORIES.forEach(cat => {
  productsMaster.categories[cat.id] = {
    title: cat.title,
    desc: cat.description
  };
  cat.products.forEach(p => {
    productsMaster.items[p.id] = {
      name: p.name,
      desc: p.description,
      pricing: p.pricing,
      spec: {
        origin: p.specifications.origin,
        packaging: p.specifications.packaging,
        purity: p.specifications.purity,
        grade: p.specifications.grade,
        minOrder: p.specifications.minOrder
      }
    };
  });
});

const enMaster = {
  navbar: {
    home: "Home",
    export: "Export",
    therapy: "Therapy",
    contact: "Contact",
    admin: "Admin",
    console: "Console",
    language: "Language",
    selectLanguage: "Select Sacred Language",
    subTitle: "Agriculture & Aura Clinic",
    searchPlaceholder: "Search language..."
  },
  footer: {
    desc: "An elite, high-vibrational ecosystem merging enterprise agricultural supply-chain and global spice distribution with high-end quantum sound and floral bio-frequency wellness clinics.",
    agriTitle: "Agricultural Division",
    wellnessTitle: "Wellness Division",
    corpTitle: "Corporate Desk",
    agriLink1: "Elite Spices & Culinary Gems",
    agriLink2: "Purified Himalayan Shilajit Resin",
    agriLink3: "Pure Organic Aromatherapy Extracts",
    agriLink4: "Custom Phytosanitary Certification",
    agriStatus: "● 100% Trace-Audited",
    wellnessLink1: "Edward Bach Floral Consultations",
    wellnessLink2: "Usui Reiki Chromatic Harmony",
    wellnessLink3: "432Hz Quartz Polyphonic Attunements",
    wellnessLink4: "Schedule Private Residency Session",
    corpOffice: "Global Trade Office:",
    corpSanctuary: "Wellness Sanctuary:",
    rights: "All rights reserved. Registered Trade Entity."
  },
  home: {
    div1: "Division 01",
    agriTitle: "Global Agricultural Export Network",
    agriDesc: "Premium supply chain solution connecting organic harvest directly, delivering hand-sorted cardamom, pure Shilajit resin, and high-essential botanical extracts. Authorized phytosanitary testing, bulk vessel freight, and zero-loss logistics.",
    enterExport: "Enter Export Desk",
    div2: "Division 02",
    wellnessTitle: "Holistic Wellness & Energy Therapy",
    wellnessDesc: "Dr. Edward Bach's timeless flower essences, bio-energy Usui Reiki, and Aura-Soma alignment. Valley sanctuaries situated in Wayanad for total recovery of nervous systems, cellular fatigue, and persistent stress.",
    exploreTherapies: "Explore Therapies",
    inquiryHandling: "Inquiry Handling",
    annualDeals: "Annual Deals",
    wellnessSuccess: "Wellness Success",
    recoveryRate: "Recovery Rate",
    tradePresence: "Trade Presence",
    nations: "Nations",
    nextAvailable: "Next Available Session",
    availableSession: "Oct 24, 09:30 AM — Reiki Resonance",
    cinematic: "Cinematic Excellence",

    // Redesigned Homepage Optional Keys
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
  },
  export: {
    division: "International Trade Division",
    heroTitle: "Elite Crop Logistical Logistics",
    heroDesc: "DharaAveda connects deep Indian botanical farms with premium global pharmacies, cosmetics houses, and food importers. Our systems guarantee trace-verified bulk shipping of authentic Himalayan shilajit, bold cardamom, vetiver base oils, and adaptogenic extracts under absolute phytosanitary compliance.",
    apedaAuth: "APEDA Authorized",
    sgsPurity: "SGS Purity Lab Tested",
    cargoTransit: "GLOBAL CARGO TRANSIT",
    cargoDesc: "Ocean & Air Freight Cargo Routing",
    secure: "SECURE",
    catalogue: "DYNAMIC CATALOGUE",
    selectGoods: "Select Agricultural Goods",
    searchPlaceholder: "Search categories or products...",
    noMatch: "No categories or products match your parameter.",
    adjustSearch: "Try adjusting the search query.",
    freightNetworks: "Global Freight Networks",
    operationsTitle: "Trade Operations Built on Integrity",
    sgsTitle: "Full SGS Verification",
    sgsDesc: "Every trace lot undergoes gas chromatography & analytical purity tests. Phitosanitary compliance guarantees hassle-free harbor custom routing.",
    isoTitle: "ISO Reciprocal Standard",
    isoDesc: "Operating under rigorous international hygiene guidelines. Vacuum-tight packing blocks cosmic UV light, keeping freshness intact during transit.",
    originTitle: "Wayanad Direct Origin",
    originDesc: "Our spice estate cuts out unnecessary trading middlemen, ensuring maximum fair-wage compensation to local Vedic smallholder farmers directly.",
    fastTrack: "FAST TRACK QUOTE",
    speakArbitrage: "Speak with our Commodity Arbitrage desk",
    arbitrageDesc: "Need specialized custom moisture content, high volume tons, or sea container shipping contracts? Connect directly for priority trade handling.",
    cargoTimelines: "Typical Cargo Timelines",
    sgsClearance: "SGS analysis clearance:",
    sgsDays: "4-5 Working Days",
    packagingPrep: "Custom packaging prep:",
    packagingDays: "5-7 Working Days",
    portOfLoad: "FOB port of load:",
    portName: "Nhava Sheva, Mumbai"
  },
  booking: {
    clinic: "HARMONIZATION CLINICS",
    sanctuary: "Vibrational Sanctuary",
    desc: "All consultations are conducted in complete secrecy. Our therapists custom formulate remedies to match active stress fields, facilitating physical release and recovery.",
    confidential: "Confidential Intake",
    confidentialDesc: "Your biofields mapping, thermal diagnostics, and case histories remain sealed.",
    private: "Private Residences",
    privateDesc: "Chambers are isolated inside our deep Wayanad forest gardens in Kerala, India.",
    aligning: "Aligning Aura Diagnostics...",
    scheduler: "Harmonic Residency Scheduler",
    title: "Schedule Your Therapy",
    formDesc: "Reserve custom-blended Bach flower, Reiki alignment, or deep quartz therapeutic sound healing.",
    successTitle: "Residency Reservation Initiated",
    successDesc: "Thank you, {name}. Your appointment request for {service} has been logged in our secure sanctuary ledger.",
    slipTitle: "Requested Session Slip",
    date: "Date",
    hour: "Hour",
    note: "Our clinic coordinator will call or email you to finalize the bio-resonance intake files.",
    anotherBtn: "Book Another Session",
    labelName: "Your Full Name *",
    labelEmail: "Contact Email Address *",
    labelPhone: "Direct Phone *",
    labelService: "Therapeutic Attunement Service *",
    labelDate: "Intake Residency Date *",
    labelTime: "Preferred Arrival Time *",
    labelNotes: "Energetic Symptoms, Stress Triggers or Food Preferences",
    placeholderName: "e.g. Heinrich Müller",
    placeholderEmail: "e.g. heinrich@wellbeing.com",
    placeholderPhone: "+91 99042 12345",
    placeholderNotes: "Mention any physical pain, life blockages, emotional distress patterns, or if you prefer a female/male practitioner...",
    errorFields: "Please fill in all required fields marked with *.",
    submitting: "Submitting Ledger Reservation...",
    submit: "Attune Booking Ledgers",
    loadingModalities: "Loading Sacred Modalities...",
    pickSlot: "Pick Slot...",
    slot1: "08:00 AM - Sunrise Dew Intake",
    slot2: "11:00 AM - Solar Zenith Sync",
    slot3: "02:30 PM - Afternoon Starlight",
    slot4: "05:30 PM - Wayanad Sunset Calm"
  },
  contact: {
    accessLines: "DIRECT ACCESS LINES",
    council: "Contact the DharaAveda Council",
    desc: "Whether arranging shipping vessels for bulk spice operations or planning custom clinical healing admissions, our representatives provide elite corporate care.",
    exportDesk: "EXPORT LOGISTICS DESK",
    cargoAffairs: "Commodity & Sea Cargo Affairs",
    sanctuaryAdmissions: "SANCTUARY VILLA ADMISSIONS",
    healingReserves: "Holistic Healing Reserves",
    responseRate: "Average response rate of commodity contract brokers is 24 business hours.",
    transmissionSealed: "Transmission Sealed",
    transmissionDesc: "Your message, {name}, has been processed. A council coordinate advisor from the appropriate division will contact you shortly.",
    sendAnother: "Send Another Message",
    labelName: "Your Full Name *",
    labelEmail: "Email Address *",
    labelPhone: "Direct Contact Phone",
    labelMessage: "Your Inquiries / Requirements *",
    placeholderName: "e.g. Heinrich Müller",
    placeholderEmail: "partner@hamburgtrade.de",
    placeholderPhone: "+49 40 128459",
    placeholderMessage: "Describe your bulk spices cargo requirements, clinical therapy intents, or secure scheduling queries...",
    submit: "Transmit Dispatch",
    transmitting: "Transmitting Dispatch...",
    errorFields: "Please fill out all mandatory fields."
  },
  product: {
    extendedCatalogue: "EXTENDED CATALOGUE",
    premiumItems: "Premium Items",
    viewProducts: "View Products",
    titleCatalogue: "Catalogue",
    availableCargo: "Available Cargo Lots",
    minOrder: "Min Order",
    pricingModel: "Pricing Model",
    sendInquiry: "Send Inquiry / Quote",
    close: "Close",
    apedaCompliant: "APEDA Compliant Export Cargo Standard",
    inquiryRequestQuote: "Request Quotation",
    inquiryDirectAccess: "Direct access to our Agricultural Export Desk for",
    inquirySuccessTitle: "Quotation Request Logged",
    inquirySuccessDesc: "Your trade desk ticket has been initialized. A dedicated cargo specialist will review your cargo specifications within 24 standard business hours.",
    inquiryCloseWindow: "Close Window",
    inquiryLabelName: "Full Name *",
    inquiryLabelEmail: "Corporate Email *",
    inquiryLabelCompany: "Company / Organization",
    inquiryLabelQuantity: "Target Quantity (e.g. Tons) *",
    inquiryPlaceholderName: "e.g. Elena Rostova",
    inquiryPlaceholderEmail: "partner@tradehouse.com",
    inquiryPlaceholderCompany: "e.g. Hanseatic Spices GmbH",
    inquiryPlaceholderQuantity: "e.g. 5 Metric Tons",
    inquiryPlaceholderMessage: "Mention specific vacuum-seal requests, harbor ports of choice (e.g. Rotterdam, Hamburg), and phytosanitary certificate needs...",
    inquiryLoggingSpecs: "Logging Cargo Specs...",
    inquirySubmit: "Transmit Inquiry",
    inquiryErrorFields: "Please fill out all mandatory fields."
  },
  wellness: {
    floatingCTAText: "Attune Session",
    heroBadge: "Restorative Quantum Sanctuary",
    heroTitle: "Calming Quantum Harmony",
    heroDesc: "True longevity begins where structural stress dissolves. DharaAveda Sanctuary blends classical Edward Bach wildflower remedies, Usui Reiki chakra alignment, Aura-Soma chromo-essential oils, and immersive 432Hz quartz singing sound waves. Align your auric frequency, cleanse deep lifecycle trauma, and restore absolute biological peace.",
    heroExploreBtn: "Explore Sanctuary Modalities",
    modalitiesBadge: "ANCIENT KNOWLEDGE RESTORED",
    modalitiesTitle: "Our Therapeutic Modalities",
    modalitiesDesc: "Each clinical residency session is customized on intake, blending specialized frequencies for physical and emotional release.",
    modalityNoServices: "Attuning vibrational healing schedules...",
    modalityTimelineTitle: "Chronological Session Pathway",
    modalityRequestBtn: "Request Residency",
    testimonialsBadge: "HARMONIC VOWS",
    testimonialsTitle: "Voices of Attuned Relief",
    testimonialsNoData: "Testimonials loaded upon client non-disclosure release files.",
    reviewsBadge: "AUTHENTIC ECHOES",
    reviewsTitle: "Social Media Directives",
    reviewsDesc: "Direct snapshots of digital conversations and public feedback from clients experiencing our energetic attunements.",
    reviewsEmpty: "No social screenshot reviews uploaded yet.",
    reviewsExpand: "Expand Image",
    badgeWhatsapp: "WhatsApp Review",
    badgeInstagram: "Instagram Review",
    aboutBadge: "FOUNDER & MASTER PRACTITIONER",
    aboutPhilosophyTitle: "Our Resonance Philosophy",
    faqBadge: "SACRED KNOWLEDGE FAQ",
    faqTitle: "Attunement Inquiries",
    faqDesc: "Answers to recurring contemplations regarding our energy and adaptogenic therapeutic residency programs.",
    faqItems: [
      {
        question: "How do I choose between Reiki, Bach Flower, and Sound alignment?",
        answer: "We recommend sharing your immediate emotional or physical challenges during our initial booking consultation. Dr. Vikranti and team will scan your energetic biofield to weave custom modalities tailored to your resonant frequency."
      },
      {
        question: "Are these therapy cycles held in-person or online?",
        answer: "While Usui Reiki and Sound Attunement are highly immersive in our pure Wayanad Villa retreat, Bach Flower emotional consultations and selective energy biofield support can be performed online with equal spiritual potency."
      },
      {
        question: "Can these therapies be integrated with modern conventional treatments?",
        answer: "Absolutely. Our methods operate on the subtle energy bodies (pranamaya kosha) and emotional fields, complementing conventional clinical medicine by unlocking cellular stress and facilitating accelerated somatic self-healing loops."
      }
    ],
    locationBadge: "WAYANAD MOUNTAIN CLIME",
    locationTitle: "The Wayanad Villa Retreat",
    locationDesc: "Our main clinical chambers lie in the misty highlands of Wayanad, Kerala. The clinical estate features high negative ion levels, natural running mountain spring water, and absolute absence of electromagnetic radiation noise to ensure deep biofield recovery.",
    locationBanner: "Wayanad, Kerala Sanctuary",
    writeReview: "Write a Review",
    ratingTitle: "Attuned Satisfaction Rating",
    ratingSub: "Based on verified spiritual resonance testimonials.",
    visitorEcho: "Visitor Sanctuary Echo",
    shareReview: "Share Your Sanctuary Review",
    feedbackGuideline: "Your sacred feedback directs our communal path and is approved by our master alchemist.",
    labelResonanceRating: "Quantum Resonance Rating*",
    labelSilhouette: "Select Silhouette Portrait (Optional)",
    placeholderReview: "Describe your feelings, emotional balance or physical relief...",
    btnSubmitReview: "Submit Review",
    btnDiscard: "Discard",
    reviewSuccessTitle: "Echo Received!",
    reviewSuccessDesc: "Thank you for sharing your attuned experience. Your review has been saved in the registry and will appear live once reviewed and approved by our Sanctuary Moderator.",
    btnPerfect: "Perfect",
    reviewTransmitting: "Transmitting...",
    reviewNameLabel: "Full Name*",
    reviewCityLabel: "City / Country (Optional)",
    reviewAvatarLabel: "Or input custom photo URL...",
    reviewTitleDefault: "Wellness Visitor",
    reviewErrorName: "Full Name is required",
    reviewErrorContent: "Review Message is required",
    reviewErrorRating: "Rating must be between 1 and 5 stars",
    reviewsModality: "MODALITY RESIDENCE"
  },
  products: productsMaster
};

const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-3-flash-preview"
];
let currentModelIndex = 0;

const block1Keys = ["navbar", "footer", "home", "export", "booking", "contact", "product", "wellness"];

async function translateSection(key, sourceObj, targetLang) {
  const prompt = `You are a professional luxury brand translator. Translate the following English localization JSON structure into ${targetLang}.
Maintain the EXACT JSON structure, keys, formatting, and variables like {name} or {service}.
Make the translation sound natural, premium, elegant, and high-end, matching the tone of a luxury agricultural trade firm and traditional Vedic energy therapies.
Do not output markdown codeblocks. Output only the raw translated JSON string.
Ensure all double quotes inside JSON string values are correctly escaped.

English JSON for section "${key}":
${JSON.stringify(sourceObj, null, 2)}`;

  const activeModel = MODELS[currentModelIndex];
  console.log(`  Calling model: ${activeModel} for key "${key}" (${targetLang})`);

  const response = await ai.models.generateContent({
    model: activeModel,
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  const text = response.text.trim();
  let cleaned = text;
  // Remove starting ```json or ```
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "");
  // Remove ending ```
  cleaned = cleaned.replace(/\s*```$/, "");
  cleaned = cleaned.trim();
  // Remove any trailing backticks
  if (cleaned.endsWith("``")) {
    cleaned = cleaned.substring(0, cleaned.length - 2).trim();
  }
  if (cleaned.endsWith("`")) {
    cleaned = cleaned.substring(0, cleaned.length - 1).trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error(`JSON parse error on key "${key}" for language "${targetLang}". Raw text:`);
    console.error(text);
    throw err;
  }
}

// Resilient translation wrapper with retry on 429, JSON syntax errors, and standard 13 seconds RPM spacing
async function translateSectionWithRetry(key, sourceObj, targetLang) {
  let attempts = 0;
  const maxAttempts = 12; // Allow more attempts to try multiple models/retries
  while (attempts < maxAttempts) {
    try {
      const response = await translateSection(key, sourceObj, targetLang);
      // Wait 13 seconds on success to guarantee staying below the 5 RPM rate limit
      console.log(`  Successfully translated ${key}. Spacing 13s to prevent 429 rate limit...`);
      await new Promise(resolve => setTimeout(resolve, 13000));
      return response;
    } catch (err) {
      attempts++;
      const isRateLimit = err.status === 429 || err.message.includes("429") || err.message.includes("RESOURCE_EXHAUSTED");
      const isDailyLimit = isRateLimit && (err.message.toLowerCase().includes("quota") && err.message.toLowerCase().includes("day"));
      
      // Rotate model index
      const oldModel = MODELS[currentModelIndex];
      currentModelIndex = (currentModelIndex + 1) % MODELS.length;
      const newModel = MODELS[currentModelIndex];
      
      if (isRateLimit) {
        console.warn(`[429 Quota Exceeded] using ${oldModel} for key "${key}". Switched to ${newModel}.`);
        
        let delayMs = 5000; // default 5s
        if (!isDailyLimit) {
          // Standard RPM limit backoff
          delayMs = 15000;
          const match = err.message.match(/retry in ([\d\.]+)s/i);
          if (match && match[1]) {
            delayMs = parseFloat(match[1]) * 1000 + 2005;
          } else if (err.details && err.details.retryDelay) {
            const seconds = parseFloat(err.details.retryDelay);
            if (!isNaN(seconds)) {
              delayMs = seconds * 1000 + 2005;
            }
          }
          console.warn(`Rate limit hit (429) on ${key}. Retrying in ${delayMs / 1000}s... (Attempt ${attempts}/${maxAttempts})`);
        } else {
          console.warn(`Daily quota limit hit for ${oldModel}. Retrying with ${newModel} in ${delayMs / 1000}s... (Attempt ${attempts}/${maxAttempts})`);
        }
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        // Handle JSON parse errors or other generation errors
        console.warn(`[Translation Error] for key "${key}" using ${oldModel}: ${err.message}. Switched to ${newModel}. Retrying in 3s... (Attempt ${attempts}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }
  throw new Error(`Exceeded maximum translation retries for ${targetLang} section ${key}`);
}

async function translateObjectSectionBySection(obj, targetLang) {
  const result = {};
  console.log(`Starting translation for ${targetLang}...`);
  
  // Consolidated Block 1: Static UI Keys
  console.log(`  Translating Block 1 (UI Strings) for ${targetLang}...`);
  const uiSource = {};
  block1Keys.forEach(k => { uiSource[k] = obj[k]; });
  const uiTranslated = await translateSectionWithRetry("ui_strings", uiSource, targetLang);
  if (uiTranslated && uiTranslated.ui_strings) {
    Object.assign(result, uiTranslated.ui_strings);
  } else {
    Object.assign(result, uiTranslated);
  }

  // Consolidated Block 2: Products catalog
  console.log(`  Translating Block 2 (Products) for ${targetLang}...`);
  const productsSource = { products: obj.products };
  const productsTranslated = await translateSectionWithRetry("products_catalog", productsSource, targetLang);
  if (productsTranslated && productsTranslated.products_catalog) {
    Object.assign(result, productsTranslated.products_catalog);
  } else {
    Object.assign(result, productsTranslated);
  }

  console.log(`Completed all sections for ${targetLang}.`);
  return result;
}

async function translateSingleDbLanguage(db, lang) {
  console.log(`Translating db content for ${lang.name}...`);
  
  const dbSource = {
    services: db.services.map(s => ({
      id: s.id,
      name: s.translations.en?.name || s.name,
      category: s.translations.en?.category || s.category,
      description: s.translations.en?.description || s.description,
      story: s.translations.en?.story || s.story,
      highlight: s.translations.en?.highlight || s.highlight,
      ctaText: s.translations.en?.ctaText || s.ctaText,
      benefits: s.translations.en?.benefits || s.benefits,
      timeline: s.translations.en?.timeline || s.timeline
    })),
    testimonials: db.testimonials.map(t => ({
      id: t.id,
      name: t.translations.en?.name || t.name,
      role: t.translations.en?.role || t.role,
      content: t.translations.en?.content || t.content
    })),
    aboutVikranti: {
      name: db.aboutVikranti.translations.en?.name || db.aboutVikranti.name,
      role: db.aboutVikranti.translations.en?.role || db.aboutVikranti.role,
      aboutText: db.aboutVikranti.translations.en?.aboutText || db.aboutVikranti.aboutText,
      philosophy: db.aboutVikranti.translations.en?.philosophy || db.aboutVikranti.philosophy
    },
    screenshotReviews: db.screenshotReviews ? db.screenshotReviews.map(r => ({
      id: r.id,
      caption: r.translations?.en?.caption || r.caption
    })) : []
  };

  const translatedDb = await translateSectionWithRetry(`db_content_${lang.code}`, dbSource, lang.name);
  
  // Map back to services
  db.services.forEach(service => {
    const match = translatedDb.services.find(s => s.id === service.id);
    if (match) {
      service.translations[lang.code] = match;
    }
  });

  // Map back to testimonials
  db.testimonials.forEach(testimonial => {
    const match = translatedDb.testimonials.find(t => t.id === testimonial.id || t.name === testimonial.name);
    if (match) {
      testimonial.translations[lang.code] = match;
    }
  });

  // Map back to about
  if (translatedDb.aboutVikranti) {
    db.aboutVikranti.translations[lang.code] = translatedDb.aboutVikranti;
  }

  // Map back to screenshotReviews
  if (db.screenshotReviews && translatedDb.screenshotReviews) {
    db.screenshotReviews.forEach(review => {
      const match = translatedDb.screenshotReviews.find(r => r.id === review.id);
      if (match) {
        if (!review.translations) review.translations = {};
        review.translations[lang.code] = match;
      }
    });
  }
}

async function run() {
  try {
    const localesDir = path.resolve(process.cwd(), "frontend/src/lib/translations");
    if (!fs.existsSync(localesDir)) {
      fs.mkdirSync(localesDir, { recursive: true });
    }

    // Write English master
    fs.writeFileSync(
      path.join(localesDir, "en.ts"),
      `import { StaticTranslations } from "../translations";\n\nexport const translations: StaticTranslations = ${JSON.stringify(enMaster, null, 2)};\n`,
      "utf-8"
    );
    console.log("Wrote en.ts translation file.");

    const dbPath = path.resolve(process.cwd(), "db_store.json");
    let db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    // Translate for other languages
    for (const lang of languages) {
      const filePath = path.join(localesDir, `${lang.code}.ts`);
      if (!fs.existsSync(filePath)) {
        const translatedObj = await translateObjectSectionBySection(enMaster, lang.name);
        fs.writeFileSync(
          filePath,
          `import { StaticTranslations } from "../translations";\n\nexport const translations: StaticTranslations = ${JSON.stringify(translatedObj, null, 2)};\n`,
          "utf-8"
        );
        console.log(`Successfully generated translation file for ${lang.code}.ts`);
      } else {
        console.log(`Translation file for ${lang.code} already exists. Skipping static trans.`);
      }

      // Translate db fields sequentially per language
      const allServicesTranslated = db.services.every(s => s.translations && s.translations[lang.code]);
      const allTestimonialsTranslated = db.testimonials.every(t => t.translations && t.translations[lang.code]);
      const aboutTranslated = db.aboutVikranti && db.aboutVikranti.translations && db.aboutVikranti.translations[lang.code];
      const allReviewsTranslated = db.screenshotReviews ? db.screenshotReviews.every(r => r.translations && r.translations[lang.code]) : true;

      if (allServicesTranslated && allTestimonialsTranslated && aboutTranslated && allReviewsTranslated) {
        console.log(`Database translations for ${lang.name} already exist. Skipping db trans.`);
      } else {
        await translateSingleDbLanguage(db, lang);
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
        console.log(`Saved database updates for ${lang.name}.`);
      }
    }

    // Generate index.ts aggregator
    let indexContent = `// Static Translations Aggregator\n`;
    indexContent += `import { translations as en } from "./en";\n`;
    languages.forEach(lang => {
      indexContent += `import { translations as ${lang.code} } from "./${lang.code}";\n`;
    });
    indexContent += `\nimport { StaticTranslations, LanguageCode } from "../translations";\n\n`;
    indexContent += `export const staticTranslations: Record<LanguageCode, StaticTranslations> = {\n`;
    indexContent += `  en,\n`;
    languages.forEach(lang => {
      indexContent += `  ${lang.code},\n`;
    });
    indexContent += `};\n`;

    fs.writeFileSync(path.join(localesDir, "index.ts"), indexContent, "utf-8");
    console.log("Successfully generated frontend/src/lib/translations/index.ts");

    console.log("All translations successfully completed!");
  } catch (err) {
    console.error("Critical translation error occurred:", err);
    process.exit(1);
  }
}

run();
