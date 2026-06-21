import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, "../frontend/public/images/therapy");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const imagesToOptimize = [
  {
    name: "heroBg.webp",
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?fm=webp&fit=crop&q=80&w=1200",
    width: 1200,
    quality: 80
  },
  {
    name: "heroAtmosphere.webp",
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?fm=webp&fit=crop&q=80&w=800",
    width: 800,
    quality: 80
  },
  {
    name: "bachFlowerService.webp",
    url: "https://drmezihat.com/wp-content/uploads/2024/08/bach-cicekleri-terapisi.jpg",
    width: 800,
    quality: 80
  },
  {
    name: "rekkhanohoService.webp",
    url: "https://static.wixstatic.com/media/ba45f1_8d605aff93b04d3795cec253f7bdf1e9~mv2.png/v1/fill/w_280,h_218,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/woman-pregnant-waiting-baby%202.png",
    width: 800,
    quality: 85
  },
  {
    name: "founderPortrait.webp",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=webp&fit=crop&q=80&w=800",
    width: 800,
    quality: 80
  },
  {
    name: "sanctuaryLocation.webp",
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?fm=webp&fit=crop&q=80&w=800",
    width: 800,
    quality: 80
  },
  {
    name: "serviceFallback.webp",
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?fm=webp&fit=crop&q=80&w=800",
    width: 800,
    quality: 80
  }
];

async function optimizeImages() {
  console.log(`Starting wellness image optimization. Output directory: ${outputDir}`);
  
  for (const img of imagesToOptimize) {
    const targetPath = path.join(outputDir, img.name);
    console.log(`\nProcessing: ${img.name}...`);
    try {
      console.log(`Downloading from: ${img.url}`);
      const response = await fetch(img.url);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
      
      const buffer = Buffer.from(await response.arrayBuffer());
      console.log(`Downloaded ${buffer.length} bytes. Compressing to WebP...`);
      
      await sharp(buffer)
        .resize({ width: img.width, withoutEnlargement: true })
        .webp({ quality: img.quality })
        .toFile(targetPath);
        
      const stats = fs.statSync(targetPath);
      console.log(`Successfully saved: ${targetPath} (${stats.size} bytes)`);
    } catch (err) {
      console.error(`Failed to optimize ${img.name}:`, err);
    }
  }
  
  console.log("\nAll wellness images processed.");
}

optimizeImages();
