import fs from "fs";
import path from "path";

const languages = [
  "hi", "mr", "es", "fr", "de", "it", "pt", "ru",
  "zh", "ja", "ko", "ar", "tr", "nl", "id", "vi", "th", "pl"
];

const localesDir = path.resolve(process.cwd(), "frontend/src/lib/translations");
const enFilePath = path.join(localesDir, "en.ts");
const enContent = fs.readFileSync(enFilePath, "utf-8");
const enMatch = enContent.match(/export const translations: StaticTranslations = (\{[\s\S]+\});/);
const enMaster = eval("(" + enMatch[1] + ")");

function mergeObjects(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] === null || source[key] === undefined) continue;
    
    if (typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (typeof target[key] !== "object" || target[key] === null || Array.isArray(target[key])) {
        target[key] = {};
      }
      mergeObjects(target[key], source[key]);
    } else {
      if (target[key] === undefined) {
        target[key] = source[key];
      }
    }
  }
}

console.log("Auditing and ensuring key symmetry across all 18 language dictionaries...");

languages.forEach(code => {
  const filePath = path.join(localesDir, `${code}.ts`);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/export const translations: StaticTranslations = (\{[\s\S]+\});/);
  if (!match) return;

  const langObj = eval("(" + match[1] + ")");
  mergeObjects(langObj, enMaster);

  fs.writeFileSync(
    filePath,
    `import { StaticTranslations } from "../translations";\n\nexport const translations: StaticTranslations = ${JSON.stringify(langObj, null, 2)};\n`,
    "utf-8"
  );
  console.log(`✓ Synchronized ${code}.ts`);
});

console.log("All language dictionaries are fully key-complete!");
