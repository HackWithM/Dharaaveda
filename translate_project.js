import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

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

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-1.5-flash"
];
let currentModelIndex = 0;

async function translateSection(key, sourceObj, targetLang) {
  const prompt = `You are a professional luxury brand translator for Dharaaveda (Agricultural Trade & Holistic Wellness).
Translate the following English localization JSON object into ${targetLang}.
Maintain the EXACT JSON structure, keys, formatting, and formatting characters (like linebreaks \\n or bullet points •).
Do not translate key names, only translate string values.
Make the translation sound natural, premium, elegant, and culturally accurate.
Do not output markdown codeblocks. Output ONLY raw translated JSON string.

English JSON for section "${key}":
${JSON.stringify(sourceObj, null, 2)}`;

  const activeModel = MODELS[currentModelIndex];
  console.log(`  Calling model: ${activeModel} for section "${key}" -> ${targetLang}`);

  const response = await ai.models.generateContent({
    model: activeModel,
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  const text = response.text.trim();
  let cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error(`JSON parse error on key "${key}" for language "${targetLang}". Raw text snippet: ${cleaned.substring(0, 100)}...`);
    throw err;
  }
}

async function translateSectionWithRetry(key, sourceObj, targetLang) {
  let attempts = 0;
  const maxAttempts = 10;
  while (attempts < maxAttempts) {
    try {
      const response = await translateSection(key, sourceObj, targetLang);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return response;
    } catch (err) {
      attempts++;
      currentModelIndex = (currentModelIndex + 1) % MODELS.length;
      const newModel = MODELS[currentModelIndex];
      console.warn(`[Retry ${attempts}/${maxAttempts}] Switched to model ${newModel} for "${key}" (${targetLang}). Delaying 5s...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  throw new Error(`Exceeded maximum translation retries for ${targetLang} section ${key}`);
}

async function translateObjectSectionBySection(enMaster, targetLang) {
  const result = {};
  console.log(`\n========================================`);
  console.log(`Starting translation for ${targetLang}...`);
  console.log(`========================================`);

  const keys = Object.keys(enMaster);
  for (const k of keys) {
    if (!enMaster[k]) continue;
    console.log(`  Translating section: "${k}" for ${targetLang}...`);
    const translatedSection = await translateSectionWithRetry(k, enMaster[k], targetLang);
    result[k] = translatedSection;
  }

  console.log(`Completed all sections for ${targetLang}.`);
  return result;
}

async function translateSingleDbLanguage(db, lang) {
  console.log(`Translating db_store content for ${lang.name}...`);
  
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
      name: db.aboutVikranti?.translations?.en?.name || db.aboutVikranti?.name,
      role: db.aboutVikranti?.translations?.en?.role || db.aboutVikranti?.role,
      aboutText: db.aboutVikranti?.translations?.en?.aboutText || db.aboutVikranti?.aboutText,
      philosophy: db.aboutVikranti?.translations?.en?.philosophy || db.aboutVikranti?.philosophy
    },
    screenshotReviews: db.screenshotReviews ? db.screenshotReviews.map(r => ({
      id: r.id,
      caption: r.translations?.en?.caption || r.caption
    })) : []
  };

  const translatedDb = await translateSectionWithRetry(`db_content_${lang.code}`, dbSource, lang.name);
  
  if (translatedDb.services) {
    db.services.forEach(service => {
      const match = translatedDb.services.find(s => s.id === service.id);
      if (match) {
        if (!service.translations) service.translations = {};
        service.translations[lang.code] = match;
      }
    });
  }

  if (translatedDb.testimonials) {
    db.testimonials.forEach(testimonial => {
      const match = translatedDb.testimonials.find(t => t.id === testimonial.id || t.name === testimonial.name);
      if (match) {
        if (!testimonial.translations) testimonial.translations = {};
        testimonial.translations[lang.code] = match;
      }
    });
  }

  if (translatedDb.aboutVikranti) {
    if (!db.aboutVikranti.translations) db.aboutVikranti.translations = {};
    db.aboutVikranti.translations[lang.code] = translatedDb.aboutVikranti;
  }

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

    const enFilePath = path.join(localesDir, "en.ts");
    const enFileContent = fs.readFileSync(enFilePath, "utf-8");
    const enJsonMatch = enFileContent.match(/export const translations: StaticTranslations = (\{[\s\S]+\});/);
    if (!enJsonMatch) {
      throw new Error("Could not parse en.ts master object.");
    }
    const enMaster = eval("(" + enJsonMatch[1] + ")");
    console.log("Successfully loaded master English translations from en.ts.");

    const dbPath = path.resolve(process.cwd(), "db_store.json");
    let db = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath, "utf-8")) : null;

    const forceTranslateAll = process.argv.includes("--force");

    for (const lang of languages) {
      const filePath = path.join(localesDir, `${lang.code}.ts`);
      let translatedObj = null;

      if (!fs.existsSync(filePath) || forceTranslateAll) {
        translatedObj = await translateObjectSectionBySection(enMaster, lang.name);
        fs.writeFileSync(
          filePath,
          `import { StaticTranslations } from "../translations";\n\nexport const translations: StaticTranslations = ${JSON.stringify(translatedObj, null, 2)};\n`,
          "utf-8"
        );
        console.log(`Successfully generated translation file for ${lang.code}.ts`);
      } else {
        console.log(`\nChecking translation completeness for ${lang.code}.ts...`);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const jsonMatch = fileContent.match(/export const translations: StaticTranslations = (\{[\s\S]+\});/);
        if (jsonMatch) {
          try {
            translatedObj = eval("(" + jsonMatch[1] + ")");
            let dirty = false;

            for (const sectionKey of Object.keys(enMaster)) {
              if (!translatedObj[sectionKey]) {
                console.log(`  Translating missing "${sectionKey}" section for ${lang.name}...`);
                const secTrans = await translateSectionWithRetry(sectionKey, enMaster[sectionKey], lang.name);
                translatedObj[sectionKey] = secTrans;
                dirty = true;
              }
            }

            // Sync seeds product and showcase update to all languages if needed
            if (enMaster.products?.items?.["sd-flax"] && translatedObj.products?.items?.["sd-flax"]?.desc !== enMaster.products.items["sd-flax"].desc) {
              console.log(`  Updating outdated products catalog section for ${lang.name}...`);
              const secTrans = await translateSectionWithRetry("products", enMaster.products, lang.name);
              translatedObj.products = secTrans;
              dirty = true;
            }

            if (enMaster.export?.showcaseCategories && JSON.stringify(translatedObj.export?.showcaseCategories) !== JSON.stringify(enMaster.export.showcaseCategories)) {
              console.log(`  Updating outdated export section for ${lang.name}...`);
              const secTrans = await translateSectionWithRetry("export", enMaster.export, lang.name);
              translatedObj.export = secTrans;
              dirty = true;
            }

            if (dirty) {
              fs.writeFileSync(
                filePath,
                `import { StaticTranslations } from "../translations";\n\nexport const translations: StaticTranslations = ${JSON.stringify(translatedObj, null, 2)};\n`,
                "utf-8"
              );
              console.log(`Updated translation file for ${lang.code}.ts with latest content.`);
            } else {
              console.log(`Translation file for ${lang.code}.ts is fully up-to-date.`);
            }
          } catch (e) {
            console.error(`Error parsing existing translation file for ${lang.code}:`, e);
          }
        }
      }

      if (db) {
        await translateSingleDbLanguage(db, lang);
      }
    }

    if (db) {
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
      console.log("Saved database translation updates to db_store.json.");
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
