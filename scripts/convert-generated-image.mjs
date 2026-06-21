import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sourcePath = "C:/Users/MAYUR/.gemini/antigravity-ide/brain/e11c1963-aab9-42b8-993c-bf8900fed7c3/bach_flower_therapy_premium_1782048962054.png";
const destPath = "d:/Projects/Client/Dharaaveda-main/frontend/public/images/therapy/bachFlowerService.webp";

async function convertImage() {
  console.log(`Converting ${sourcePath} to optimized WebP at ${destPath}...`);
  try {
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source file does not exist at ${sourcePath}`);
    }
    
    await sharp(sourcePath)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toFile(destPath);
      
    const stats = fs.statSync(destPath);
    console.log(`Successfully converted. Output size: ${stats.size} bytes`);
  } catch (err) {
    console.error("Error converting image:", err);
  }
}

convertImage();
