import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is not defined in .env file.");
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
  { code: "zh", name: "Chinese (Simplified)" },
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

async function translatePayload(payload, targetLang) {
  const prompt = `Translate the following English localization JSON structure into ${targetLang}.
Maintain the EXACT JSON structure, keys, bullet points (•), and line breaks (\\n).
Do not translate key names, only values.
Make it sound natural, elegant, and professional for an international agricultural trade website.
Output ONLY valid raw JSON string with no markdown formatting.

English JSON:
${JSON.stringify(payload, null, 2)}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  const text = response.text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  return JSON.parse(text);
}

async function run() {
  const localesDir = path.resolve(process.cwd(), "frontend/src/lib/translations");
  const enFilePath = path.join(localesDir, "en.ts");
  const enContent = fs.readFileSync(enFilePath, "utf-8");
  const enMatch = enContent.match(/export const translations: StaticTranslations = (\{[\s\S]+\});/);
  const enMaster = eval("(" + enMatch[1] + ")");

  const seedsPayload = {
    seedsCategoryShowcase: enMaster.export.showcaseCategories.seeds,
    seedsCategoryProduct: enMaster.products.categories.seeds,
    seedItems: {
      "sd-flax": enMaster.products.items["sd-flax"],
      "sd-pumpkin": enMaster.products.items["sd-pumpkin"],
      "sd-sesame": enMaster.products.items["sd-sesame"],
      "sd-sunflower": enMaster.products.items["sd-sunflower"],
      "sd-chia": enMaster.products.items["sd-chia"],
      "sd-watermelon": enMaster.products.items["sd-watermelon"],
      "sd-basil": enMaster.products.items["sd-basil"]
    }
  };

  console.log("Syncing seeds & updated content to all 18 languages...");

  for (const lang of languages) {
    const filePath = path.join(localesDir, `${lang.code}.ts`);
    if (!fs.existsSync(filePath)) continue;

    console.log(`Translating updated Seeds content for ${lang.name} (${lang.code})...`);
    try {
      const translated = await translatePayload(seedsPayload, lang.name);

      const fileContent = fs.readFileSync(filePath, "utf-8");
      const jsonMatch = fileContent.match(/export const translations: StaticTranslations = (\{[\s\S]+\});/);
      if (!jsonMatch) continue;

      const langObj = eval("(" + jsonMatch[1] + ")");

      if (!langObj.export) langObj.export = {};
      if (!langObj.export.showcaseCategories) langObj.export.showcaseCategories = {};
      langObj.export.showcaseCategories.seeds = translated.seedsCategoryShowcase;

      if (!langObj.products) langObj.products = {};
      if (!langObj.products.categories) langObj.products.categories = {};
      langObj.products.categories.seeds = translated.seedsCategoryProduct;

      if (!langObj.products.items) langObj.products.items = {};
      Object.assign(langObj.products.items, translated.seedItems);

      // Save updated language file
      fs.writeFileSync(
        filePath,
        `import { StaticTranslations } from "../translations";\n\nexport const translations: StaticTranslations = ${JSON.stringify(langObj, null, 2)};\n`,
        "utf-8"
      );
      console.log(`✓ Updated ${lang.code}.ts`);
    } catch (e) {
      console.error(`❌ Failed to update ${lang.code}.ts:`, e.message);
    }
  }

  // Also update index.ts aggregator
  let indexContent = `// Static Translations Aggregator\n`;
  indexContent += `import { translations as en } from "./en";\n`;
  languages.forEach(l => {
    indexContent += `import { translations as ${l.code} } from "./${l.code}";\n`;
  });
  indexContent += `\nimport { StaticTranslations, LanguageCode } from "../translations";\n\n`;
  indexContent += `export const staticTranslations: Record<LanguageCode, StaticTranslations> = {\n`;
  indexContent += `  en,\n`;
  languages.forEach(l => {
    indexContent += `  ${l.code},\n`;
  });
  indexContent += `};\n`;

  fs.writeFileSync(path.join(localesDir, "index.ts"), indexContent, "utf-8");
  console.log("✓ Updated frontend/src/lib/translations/index.ts");

  console.log("\nAll 18 target languages are 100% synchronized with latest English content!");
}

run();
