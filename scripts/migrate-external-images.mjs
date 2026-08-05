import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.resolve(rootDir, "frontend/public/images");

// Target directories to create inside public/images/
const SUBDIRS = ["hero", "products", "therapy", "testimonials", "backgrounds", "logos"];

SUBDIRS.forEach((dir) => {
  const fullPath = path.join(publicDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Source files to scan for external URLs
const SOURCE_FILES = [
  "frontend/src/data/images.ts",
  "frontend/src/data/exportProducts.ts",
  "backend/src/services/seed.service.ts",
  "db_store.json"
];

// Helper to generate SEO-friendly filename from URL or key
function generateSeoFilename(url, index) {
  const cleanUrl = url.split("?")[0].toLowerCase();
  
  if (cleanUrl.includes("ashwagandha")) return "products/ashwagandha-extract.webp";
  if (cleanUrl.includes("turmeric")) return "products/turmeric-extract.webp";
  if (cleanUrl.includes("cardamom")) return "products/green-cardamom-pods.webp";
  if (cleanUrl.includes("mustard")) return "products/black-mustard-seeds.webp";
  if (cleanUrl.includes("cabbage-powder")) return "products/cabbage-powder.webp";
  if (cleanUrl.includes("drumstick") || cleanUrl.includes("moringa")) return "products/moringa-leaf-powder.webp";
  if (cleanUrl.includes("chilli")) return "products/green-chilli-powder.webp";
  if (cleanUrl.includes("coriander")) return "products/coriander-leaf-powder.webp";
  if (cleanUrl.includes("mint")) return "products/mint-leaf-powder.webp";
  if (cleanUrl.includes("banana-powder")) return "products/raw-banana-powder.webp";
  if (cleanUrl.includes("mango")) return "products/amchur-mango-powder.webp";
  if (cleanUrl.includes("guava-powder")) return "products/white-guava-powder.webp";
  if (cleanUrl.includes("pomegranate")) return "products/pomegranate-powder.webp";
  if (cleanUrl.includes("pineapple")) return "products/pineapple-powder.webp";
  if (cleanUrl.includes("papaya")) return "products/papaya-powder.webp";
  if (cleanUrl.includes("orange")) return "products/orange-peel-powder.webp";
  if (cleanUrl.includes("lemon")) return "products/lemon-powder.webp";
  if (cleanUrl.includes("strawberry")) return "products/strawberry-powder.webp";
  if (cleanUrl.includes("amla")) return "products/amla-fruit-powder.webp";
  if (cleanUrl.includes("sesame")) return "products/hulled-sesame-seeds.webp";
  if (cleanUrl.includes("sunflower")) return "products/sunflower-seeds.webp";
  if (cleanUrl.includes("chia")) return "products/chia-seeds.webp";
  if (cleanUrl.includes("watermelon")) return "products/watermelon-seeds.webp";
  if (cleanUrl.includes("pumpkin")) return "products/pumpkin-seeds.webp";
  if (cleanUrl.includes("ginger")) return "products/dehydrated-ginger-slice.webp";
  if (cleanUrl.includes("garlic")) return "products/dehydrated-garlic-flakes.webp";
  if (cleanUrl.includes("beetroot")) return "products/dehydrated-beetroot-flakes.webp";
  if (cleanUrl.includes("palak") || cleanUrl.includes("spinach")) return "products/dehydrated-spinach-flakes.webp";
  if (cleanUrl.includes("cabbage")) return "products/dehydrated-cabbage-flakes.webp";
  if (cleanUrl.includes("banana-slices")) return "products/dehydrated-banana-slices.webp";
  if (cleanUrl.includes("guava-slices")) return "products/dehydrated-guava-slices.webp";
  if (cleanUrl.includes("potato")) return "products/dehydrated-potato-flakes.webp";
  if (cleanUrl.includes("tomato")) return "products/dehydrated-tomato-flakes.webp";
  if (cleanUrl.includes("vegetable")) return "products/dehydrated-mix-vegetables.webp";
  
  if (cleanUrl.includes("cargo") || cleanUrl.includes("ship") || cleanUrl.includes("crane")) return "backgrounds/export-logistics-cargo.webp";
  if (cleanUrl.includes("exports")) return "backgrounds/export-trade-showcase.webp";

  if (cleanUrl.includes("photo-1581091226825")) return "testimonials/client-review-wellness-1.webp";
  if (cleanUrl.includes("photo-1490730141103")) return "testimonials/client-review-wellness-2.webp";
  if (cleanUrl.includes("photo-1518241353330")) return "testimonials/client-review-soundwave.webp";
  if (cleanUrl.includes("photo-1544005313")) return "testimonials/client-avatar-default.webp";
  if (cleanUrl.includes("photo-1507003211169")) return "testimonials/client-avatar-male.webp";
  if (cleanUrl.includes("photo-1506126613408")) return "therapy/sanctuary-meditation-retreat.webp";
  if (cleanUrl.includes("photo-1544367567")) return "therapy/sanctuary-lotus-atmosphere.webp";
  if (cleanUrl.includes("photo-1596040033229")) return "products/spices-catalog-fallback.webp";

  const urlHash = Buffer.from(url).toString("hex").substring(0, 8);
  return `products/asset-${index + 1}-${urlHash}.webp`;
}

// Download & optimize image with Sharp
async function fetchAndOptimize(url, targetSubpath) {
  const destinationPath = path.join(publicDir, targetSubpath);
  
  // Custom headers to prevent 403 Forbidden on hotlink-protected sites
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const inputBuffer = Buffer.from(arrayBuffer);
  const originalSize = inputBuffer.length;

  const isHeroOrBg = targetSubpath.startsWith("hero/") || targetSubpath.startsWith("backgrounds/");
  const maxW = isHeroOrBg ? 1200 : 800;

  const webpBuffer = await sharp(inputBuffer)
    .resize(maxW, null, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality: 80, effort: 6 })
    .toBuffer();

  fs.writeFileSync(destinationPath, webpBuffer);
  const optimizedSize = webpBuffer.length;

  return { originalSize, optimizedSize };
}

async function runMigration() {
  console.log("=================================================");
  console.log("  DHARAAVEDA PRODUCTION IMAGE MIGRATION AGENT   ");
  console.log("=================================================\n");

  const urlRegex = /(https?:\/\/[^\s"'`()<>]+\.(?:jpg|jpeg|png|webp|avif|gif|svg)(\?[^\s"'`<>]*)?|https?:\/\/images\.unsplash\.com[^\s"'`()<>]+|https?:\/\/[^\s"'`()<>]*(?:googleusercontent|pexels|pixabay|freepik|cloudinary)[^\s"'`()<>]*)/gi;

  const foundUrls = new Map();

  // 1. Scan source files
  SOURCE_FILES.forEach((relPath) => {
    const fullPath = path.resolve(rootDir, relPath);
    if (!fs.existsSync(fullPath)) return;
    const content = fs.readFileSync(fullPath, "utf-8");
    let match;
    while ((match = urlRegex.exec(content)) !== null) {
      const url = match[0];
      if (!foundUrls.has(url)) {
        foundUrls.set(url, []);
      }
      foundUrls.get(url).push(relPath);
    }
  });

  console.log(`Found ${foundUrls.size} unique external image URLs across project files.\n`);

  const reportItems = [];
  const processedUrlsMap = new Map();
  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;
  let successCount = 0;
  let failCount = 0;
  let duplicateCount = 0;

  let index = 0;
  for (const [url, sources] of foundUrls.entries()) {
    index++;
    const targetSubpath = generateSeoFilename(url, index);
    const targetLocalPath = `/images/${targetSubpath}`;

    // Check duplicate URL
    if (processedUrlsMap.has(url)) {
      duplicateCount++;
      const existing = processedUrlsMap.get(url);
      reportItems.push({
        index,
        sources,
        originalUrl: url,
        localPath: existing.localPath,
        status: "SKIPPED_DUPLICATE",
        originalSizeKb: existing.originalSizeKb,
        optimizedSizeKb: existing.optimizedSizeKb,
        savingsPercent: existing.savingsPercent
      });
      console.log(`[${index}/${foundUrls.size}] SKIP (Duplicate): ${url.substring(0, 60)}... -> ${existing.localPath}`);
      continue;
    }

    try {
      console.log(`[${index}/${foundUrls.size}] Downloading: ${url.substring(0, 70)}...`);
      const { originalSize, optimizedSize } = await fetchAndOptimize(url, targetSubpath);

      const origKb = (originalSize / 1024).toFixed(2);
      const optKb = (optimizedSize / 1024).toFixed(2);
      const savings = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1);

      totalOriginalBytes += originalSize;
      totalOptimizedBytes += optimizedSize;
      successCount++;

      const itemResult = {
        index,
        sources,
        originalUrl: url,
        localPath: targetLocalPath,
        status: "SUCCESS",
        originalSizeKb: parseFloat(origKb),
        optimizedSizeKb: parseFloat(optKb),
        savingsPercent: `${savings}%`
      };

      processedUrlsMap.set(url, itemResult);
      reportItems.push(itemResult);

      console.log(`  ✓ Saved to ${targetLocalPath} (${origKb} KB -> ${optKb} KB, -${savings}%)\n`);
    } catch (err) {
      failCount++;
      console.error(`  ✗ FAILED downloading ${url}: ${err.message}\n`);
      reportItems.push({
        index,
        sources,
        originalUrl: url,
        localPath: targetLocalPath,
        status: "FAILED",
        error: err.message
      });
    }
  }

  // Generate Report Documents
  const reportData = {
    summary: {
      timestamp: new Date().toISOString(),
      totalUrlsFound: foundUrls.size,
      successfulDownloads: successCount,
      duplicatesSkipped: duplicateCount,
      failedDownloads: failCount,
      totalOriginalSizeMb: (totalOriginalBytes / (1024 * 1024)).toFixed(2),
      totalOptimizedSizeMb: (totalOptimizedBytes / (1024 * 1024)).toFixed(2),
      overallSavingsPercent: (((totalOriginalBytes - totalOptimizedBytes) / (totalOriginalBytes || 1)) * 100).toFixed(1) + "%"
    },
    items: reportItems
  };

  const jsonReportPath = path.resolve(__dirname, "migration-report.json");
  fs.writeFileSync(jsonReportPath, JSON.stringify(reportData, null, 2));

  // Generate Markdown Report
  let mdContent = `# PRODUCTION IMAGE MIGRATION AUDIT REPORT\n\n`;
  mdContent += `**Date**: ${new Date().toLocaleString()}\n`;
  mdContent += `**Total External URLs Analyzed**: ${foundUrls.size}\n`;
  mdContent += `**Successful Downloads & Conversions**: ${successCount}\n`;
  mdContent += `**Duplicates Skipped**: ${duplicateCount}\n`;
  mdContent += `**Failed Downloads**: ${failCount}\n`;
  mdContent += `**Total Original Payload**: ${reportData.summary.totalOriginalSizeMb} MB\n`;
  mdContent += `**Total Optimized Payload**: ${reportData.summary.totalOptimizedSizeMb} MB\n`;
  mdContent += `**Overall Payload Reduction**: ${reportData.summary.overallSavingsPercent}\n\n`;

  mdContent += `## Migration Mapping Table\n\n`;
  mdContent += `| Status | Original URL | Target Local Path | Original Size | WebP Size | Savings | Source Files |\n`;
  mdContent += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  reportItems.forEach((item) => {
    const orig = item.originalSizeKb ? `${item.originalSizeKb} KB` : "N/A";
    const opt = item.optimizedSizeKb ? `${item.optimizedSizeKb} KB` : "N/A";
    const sav = item.savingsPercent || "N/A";
    const src = item.sources ? item.sources.join("<br/>") : "N/A";
    mdContent += `| ${item.status} | \`${item.originalUrl.substring(0, 50)}...\` | \`${item.localPath}\` | ${orig} | ${opt} | ${sav} | ${src} |\n`;
  });

  const mdReportPath = path.resolve(__dirname, "migration-report.md");
  fs.writeFileSync(mdReportPath, mdContent);

  console.log("=================================================");
  console.log("             MIGRATION EXECUTION SUMMARY         ");
  console.log("=================================================");
  console.log(`Total URLs Processed: ${foundUrls.size}`);
  console.log(`Successful: ${successCount} | Duplicates: ${duplicateCount} | Failed: ${failCount}`);
  console.log(`Payload Size: ${reportData.summary.totalOriginalSizeMb} MB -> ${reportData.summary.totalOptimizedSizeMb} MB (${reportData.summary.overallSavingsPercent} saved)`);
  console.log(`JSON Report: ${jsonReportPath}`);
  console.log(`Markdown Report: ${mdReportPath}`);
  console.log("=================================================\n");
}

runMigration().catch((err) => {
  console.error("Migration Script Encountered Fatal Error:", err);
});
