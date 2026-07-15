import fs from "fs";
import path from "path";

const languages = [
  { code: "hi", name: "Hindi" },
  { code: "mr", name: "Marathi" },
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
  { code: "tr", name: "Turkish" },
  { code: "nl", name: "Dutch" },
  { code: "id", name: "Indonesian" },
  { code: "vi", name: "Vietnamese" },
  { code: "th", name: "Thai" },
  { code: "pl", name: "Polish" }
];

const homeKeys = {
  heroTitle: "The Convergence of Global Trade & Holistic Healing",
  heroSubtitle: "Dharaaveda harmonizes premium agricultural supply-chains with restorative energetic therapies.",
  ctaExports: "Explore Exports",
  ctaTherapies: "Explore Therapies",
  aboutTitle: "Bridging Earth's Bounty & Individual Recovery",
  aboutSubtitle: "OUR DUAL-DIVISION PHILOSOPHY",
  aboutDesc1: "Dharaaveda operates at the intersection of international trade and holistic wellness. We believe that true well-being is both global and deeply personal.",
  aboutDesc2: "Our Agricultural Division partners directly with organic smallholder estates to distribute premium spices and dehydrated products worldwide. Concurrently, our Therapy Division crafts electromagnetic-silent sanctuaries in Wayanad to restore nervous system balance and cellular vitality.",
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
  statsTitle: "Our Operational Footprint",
  statsSubtitle: "Measuring our global impact and clinical success",
  statCountries: "Countries Served",
  statProducts: "Product Categories",
  statSessions: "Therapy Sessions",
  statSatisfaction: "Client Satisfaction",
  testimonialsTitle: "Voices of Resonance",
  testimonialsSubtitle: "Feedback from our trade partners and sanctuary visitors",
  ctaTitle: "Begin Your Journey",
  ctaSubtitle: "Connect with our specialized division desks",
  ctaExportBoxTitle: "Looking for Export Solutions?",
  ctaExportBoxDesc: "Connect with our Commodity Arbitrage desk for bulk container contracts, customized packaging, or logistics compliance.",
  ctaExportBoxBtn: "Speak with Export Desk",
  ctaTherapyBoxTitle: "Looking for Holistic Healing?",
  ctaTherapyBoxDesc: "Schedule a private consultation or reserve a villa stay at our Wayanad mountain sanctuary for biofield attunement.",
  ctaTherapyBoxBtn: "Book Sanctuary Intake"
};

const seoKeys = {
  homeTitle: "DharaAveda Sanctuary | Restorative Quantum Healing & Premium Wellness Exports",
  homeDesc: "DharaAveda Sanctuary blends classical Bach wildflower therapy, Usui Reiki chakra alignment, Aura-Soma chromo-essential oils, and sound attunements.",
  exportTitle: "Agricultural Trade Division | DharaAveda Sanctuary",
  exportDesc: "Direct-source premium green cardamom, pure Shilajit resin, and organic aromatherapy extracts. Authorized APEDA and SGS compliance.",
  wellnessTitle: "Restorative Quantum Sanctuary & Therapies | DharaAveda",
  wellnessDesc: "Experience Usui Reiki, Bach flower consultations, and 432Hz sound therapy at our Wayanad sanctuary in Kerala.",
  bookingTitle: "Schedule Your Attunement Residency | DharaAveda",
  bookingDesc: "Reserve your confidential intake session for Reiki alignment, Bach flower consultations, or deep sound healing.",
  contactTitle: "Contact the Council Desk | DharaAveda",
  contactDesc: "Get in touch for bulk agricultural shipments, commodity contracts, or sanctuary wellness admissions."
};

async function translateText(text, targetLang) {
  if (!text || typeof text !== "string") return text;
  let langMap = targetLang;
  if (targetLang === "zh") langMap = "zh-CN";
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${langMap}&dt=t&q=${encodeURIComponent(text)}`;
  
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json[0].map(row => row[0]).join("");
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn(`Translation attempt ${attempt}/${maxRetries} failed for "${text.substring(0, 15)}..." to ${targetLang}: ${err.message || err}`);
      if (attempt === maxRetries) {
        return text;
      }
      await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }
  return text;
}

async function translateObject(obj, targetLang) {
  const stringsToTranslate = [];
  
  function collect(item, path) {
    if (Array.isArray(item)) {
      item.forEach((val, idx) => collect(val, [...path, idx]));
    } else if (typeof item === "object" && item !== null) {
      for (const key in item) {
        collect(item[key], [...path, key]);
      }
    } else if (typeof item === "string") {
      const val = item;
      if (val.trim() !== "" && !val.includes("http") && !val.includes("@") && !val.includes("+") && !/^\d+$/.test(val)) {
        stringsToTranslate.push({ path, val });
      }
    }
  }
  
  collect(obj, []);
  
  const limit = 25;
  const translatedValues = new Array(stringsToTranslate.length);
  
  for (let i = 0; i < stringsToTranslate.length; i += limit) {
    const batch = stringsToTranslate.slice(i, i + limit);
    const promises = batch.map(async (item, batchIdx) => {
      const trans = await translateText(item.val, targetLang);
      translatedValues[i + batchIdx] = trans;
    });
    await Promise.all(promises);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  function cloneAndReassemble(item, path) {
    if (Array.isArray(item)) {
      return item.map((val, idx) => cloneAndReassemble(val, [...path, idx]));
    } else if (typeof item === "object" && item !== null) {
      const result = {};
      for (const key in item) {
        result[key] = cloneAndReassemble(item[key], [...path, key]);
      }
      return result;
    } else if (typeof item === "string") {
      const matchIdx = stringsToTranslate.findIndex(entry => 
        entry.path.length === path.length && entry.path.every((p, idx) => p === path[idx])
      );
      if (matchIdx !== -1) {
        return translatedValues[matchIdx];
      }
      return item;
    }
    return item;
  }
  
  return cloneAndReassemble(obj, []);
}

async function translateSingleDbLanguage(db, lang) {
  console.log(`Translating DB fields for ${lang.name}...`);
  const dbSource = {
    services: db.services.map(s => ({
      id: s.id,
      name: s.translations?.en?.name || s.name,
      category: s.translations?.en?.category || s.category,
      description: s.translations?.en?.description || s.description,
      story: s.translations?.en?.story || s.story,
      highlight: s.translations?.en?.highlight || s.highlight,
      ctaText: s.translations?.en?.ctaText || s.ctaText,
      benefits: s.translations?.en?.benefits || s.benefits,
      timeline: s.translations?.en?.timeline || s.timeline
    })),
    testimonials: db.testimonials.map(t => ({
      id: t.id,
      name: t.translations?.en?.name || t.name,
      role: t.translations?.en?.role || t.role,
      content: t.translations?.en?.content || t.content
    })),
    aboutVikranti: {
      name: db.aboutVikranti.translations?.en?.name || db.aboutVikranti.name,
      role: db.aboutVikranti.translations?.en?.role || db.aboutVikranti.role,
      aboutText: db.aboutVikranti.translations?.en?.aboutText || db.aboutVikranti.aboutText,
      philosophy: db.aboutVikranti.translations?.en?.philosophy || db.aboutVikranti.philosophy
    },
    screenshotReviews: db.screenshotReviews ? db.screenshotReviews.map(r => ({
      id: r.id,
      caption: r.translations?.en?.caption || r.caption
    })) : []
  };

  const translatedDb = await translateObject(dbSource, lang.code);

  // Map back to services
  db.services.forEach(service => {
    const match = translatedDb.services.find(s => s.id === service.id);
    if (match) {
      if (!service.translations) service.translations = {};
      service.translations[lang.code] = match;
    }
  });

  // Map back to testimonials
  db.testimonials.forEach(testimonial => {
    const match = translatedDb.testimonials.find(t => t.id === testimonial.id || t.name === testimonial.name);
    if (match) {
      if (!testimonial.translations) testimonial.translations = {};
      testimonial.translations[lang.code] = match;
    }
  });

  // Map back to about
  if (translatedDb.aboutVikranti) {
    if (!db.aboutVikranti.translations) db.aboutVikranti.translations = {};
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
  const localesDir = path.resolve("frontend/src/lib/translations");
  
  // Load original English Master to use as baseline
  const enPath = path.join(localesDir, "en.ts");
  const enFileContent = fs.readFileSync(enPath, "utf-8");
  const enMatch = enFileContent.match(/export const translations: StaticTranslations = (\{[\s\S]+\});/);
  if (!enMatch) {
    console.error("Could not parse en.ts");
    process.exit(1);
  }
  const enMaster = JSON.parse(enMatch[1]);
  enMaster.home = homeKeys;
  enMaster.seo = seoKeys;

  // Save updated en.ts
  fs.writeFileSync(
    enPath,
    `import { StaticTranslations } from "../translations";\n\nexport const translations: StaticTranslations = ${JSON.stringify(enMaster, null, 2)};\n`,
    "utf-8"
  );
  console.log("Updated en.ts Master file.");

  // Read DB
  const dbPath = path.resolve("db_store.json");
  let db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  for (const lang of languages) {
    const filePath = path.join(localesDir, `${lang.code}.ts`);
    let translatedObj;
    
    // Check if the file is a placeholder (same size as en.ts or missing custom keys)
    const isNewLang = lang.code === "id" || lang.code === "vi" || lang.code === "th" || lang.code === "pl";
    
    if (!fs.existsSync(filePath) || isNewLang) {
      console.log(`Translating full file for ${lang.name}...`);
      translatedObj = await translateObject(enMaster, lang.code);
      fs.writeFileSync(
        filePath,
        `import { StaticTranslations } from "../translations";\n\nexport const translations: StaticTranslations = ${JSON.stringify(translatedObj, null, 2)};\n`,
        "utf-8"
      );
      console.log(`Generated translation file for ${lang.code}.ts`);
    } else {
      console.log(`Updating keys in existing file for ${lang.name}...`);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const jsonMatch = fileContent.match(/export const translations: StaticTranslations = (\{[\s\S]+\});/);
      if (jsonMatch) {
        try {
          translatedObj = JSON.parse(jsonMatch[1]);
          // Translate home section
          translatedObj.home = await translateObject(homeKeys, lang.code);
          // Translate seo section
          translatedObj.seo = await translateObject(seoKeys, lang.code);
          
          // Translate products section if missing or incomplete
          const expectedCatIds = Object.keys(enMaster.products?.categories || {});
          const translatedCatIds = translatedObj.products && translatedObj.products.categories ? Object.keys(translatedObj.products.categories) : [];
          const hasAllCategories = expectedCatIds.every(id => translatedCatIds.includes(id));
          
          if (!hasAllCategories || !translatedObj.products || !translatedObj.products.items) {
            console.log(`  Translating missing/outdated "products" section for ${lang.name}...`);
            translatedObj.products = await translateObject(enMaster.products, lang.code);
          }

          // Translate export.showcaseCategories if missing or incomplete
          const expectedShowcaseIds = Object.keys(enMaster.export?.showcaseCategories || {});
          const translatedShowcaseIds = translatedObj.export?.showcaseCategories ? Object.keys(translatedObj.export.showcaseCategories) : [];
          const hasAllShowcase = expectedShowcaseIds.length > 0 && expectedShowcaseIds.every(id => translatedShowcaseIds.includes(id));

          if (!hasAllShowcase && enMaster.export?.showcaseCategories) {
            console.log(`  Translating missing/outdated "export.showcaseCategories" for ${lang.name}...`);
            const translatedShowcase = await translateObject(enMaster.export.showcaseCategories, lang.code);
            if (!translatedObj.export) translatedObj.export = {};
            translatedObj.export.showcaseCategories = translatedShowcase;
          }
          
          fs.writeFileSync(
            filePath,
            `import { StaticTranslations } from "../translations";\n\nexport const translations: StaticTranslations = ${JSON.stringify(translatedObj, null, 2)};\n`,
            "utf-8"
          );
          console.log(`Updated translation file for ${lang.code}.ts`);
        } catch (e) {
          console.error(`Error parsing translation file for ${lang.code}:`, e);
        }
      }
    }

    // Sync database fields for this language (always translate if not present)
    const allServicesTranslated = db.services.every(s => s.translations && s.translations[lang.code]);
    const allTestimonialsTranslated = db.testimonials.every(t => t.translations && t.translations[lang.code]);
    const aboutTranslated = db.aboutVikranti && db.aboutVikranti.translations && db.aboutVikranti.translations[lang.code];
    
    if (allServicesTranslated && allTestimonialsTranslated && aboutTranslated) {
      console.log(`Database translations for ${lang.name} already exist.`);
    } else {
      await translateSingleDbLanguage(db, lang);
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
      console.log(`Updated database translations for ${lang.name} in db_store.json.`);
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
  console.log("Successfully generated index.ts");

  console.log("All free translations successfully completed!");
}

run().catch(err => {
  console.error("Critical error in free translation script:", err);
});
