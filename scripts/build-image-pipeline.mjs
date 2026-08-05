import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const imagesDir = path.resolve(rootDir, "frontend/public/images");

// Helper to recursively collect image files
function getImagesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getImagesRecursively(fullPath));
    } else {
      const ext = path.extname(file).toLowerCase();
      // Process images, skip existing breakpoint suffixes (-thumb, -card, -hero) to avoid infinite loops
      if (
        [".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext) &&
        !file.includes("-thumb.") &&
        !file.includes("-card.") &&
        !file.includes("-hero.")
      ) {
        results.push(fullPath);
      }
    }
  });

  return results;
}

// Temporary file cleanup helper
function cleanupTempFiles(tempDir) {
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log(`✓ Cleaned up temporary directory: ${tempDir}`);
  }
}

async function runOptimizationPipeline() {
  console.log("=================================================");
  console.log("  DHARAAVEDA PRODUCTION SHARP OPTIMIZATION PIPELINE ");
  console.log("=================================================\n");

  const tempDir = path.resolve(rootDir, "scripts/.temp-pipeline");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const allImages = getImagesRecursively(imagesDir);
  console.log(`Found ${allImages.length} master image assets to process.\n`);

  let totalInputBytes = 0;
  let totalOutputBytes = 0;
  let totalVariantsCreated = 0;
  const statsList = [];

  for (let i = 0; i < allImages.length; i++) {
    const filePath = allImages[i];
    const relPath = path.relative(imagesDir, filePath).replace(/\\/g, "/");
    const dirName = path.dirname(filePath);
    const parsed = path.parse(filePath);
    const baseName = parsed.name;
    const ext = parsed.ext.toLowerCase();

    const inputBuffer = fs.readFileSync(filePath);
    const inputSize = inputBuffer.length;
    totalInputBytes += inputSize;

    const isHeroOrBg =
      relPath.startsWith("hero/") ||
      relPath.startsWith("backgrounds/") ||
      baseName.toLowerCase().includes("hero") ||
      baseName.toLowerCase().includes("bg");

    const meta = await sharp(inputBuffer).metadata();
    const originalWidth = meta.width || 1200;

    let imageVariantsBytes = 0;
    const variantsCreatedForThisImage = [];

    try {
      // 1. Primary WebP (80% Quality)
      const mainWebpPath = path.join(dirName, `${baseName}.webp`);
      const mainWebpBuf = await sharp(inputBuffer)
        .resize(Math.min(originalWidth, 1200), null, { withoutEnlargement: true, fit: "inside" })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      
      fs.writeFileSync(mainWebpPath, mainWebpBuf);
      imageVariantsBytes += mainWebpBuf.length;
      totalVariantsCreated++;
      variantsCreatedForThisImage.push({ format: "webp", size: "master (1200px)", sizeKb: (mainWebpBuf.length / 1024).toFixed(2) });

      // 2. Card Variant (600px width)
      const cardWebpPath = path.join(dirName, `${baseName}-card.webp`);
      const cardWebpBuf = await sharp(inputBuffer)
        .resize(Math.min(originalWidth, 600), null, { withoutEnlargement: true, fit: "inside" })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();

      fs.writeFileSync(cardWebpPath, cardWebpBuf);
      imageVariantsBytes += cardWebpBuf.length;
      totalVariantsCreated++;
      variantsCreatedForThisImage.push({ format: "webp", size: "card (600px)", sizeKb: (cardWebpBuf.length / 1024).toFixed(2) });

      // 3. Thumb Variant (200px width)
      const thumbWebpPath = path.join(dirName, `${baseName}-thumb.webp`);
      const thumbWebpBuf = await sharp(inputBuffer)
        .resize(Math.min(originalWidth, 200), null, { withoutEnlargement: true, fit: "inside" })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();

      fs.writeFileSync(thumbWebpPath, thumbWebpBuf);
      imageVariantsBytes += thumbWebpBuf.length;
      totalVariantsCreated++;
      variantsCreatedForThisImage.push({ format: "webp", size: "thumb (200px)", sizeKb: (thumbWebpBuf.length / 1024).toFixed(2) });

      // 4. Hero Variant & AVIF Generation (for Hero / Background assets)
      if (isHeroOrBg) {
        // Hero WebP 1200px
        const heroWebpPath = path.join(dirName, `${baseName}-hero.webp`);
        const heroWebpBuf = await sharp(inputBuffer)
          .resize(Math.min(originalWidth, 1200), null, { withoutEnlargement: true, fit: "inside" })
          .webp({ quality: 80, effort: 6 })
          .toBuffer();

        fs.writeFileSync(heroWebpPath, heroWebpBuf);
        imageVariantsBytes += heroWebpBuf.length;
        totalVariantsCreated++;
        variantsCreatedForThisImage.push({ format: "webp", size: "hero (1200px)", sizeKb: (heroWebpBuf.length / 1024).toFixed(2) });

        // Hero AVIF 1200px (Quality 75)
        const heroAvifPath = path.join(dirName, `${baseName}-hero.avif`);
        const heroAvifBuf = await sharp(inputBuffer)
          .resize(Math.min(originalWidth, 1200), null, { withoutEnlargement: true, fit: "inside" })
          .avif({ quality: 75, effort: 6 })
          .toBuffer();

        fs.writeFileSync(heroAvifPath, heroAvifBuf);
        imageVariantsBytes += heroAvifBuf.length;
        totalVariantsCreated++;
        variantsCreatedForThisImage.push({ format: "avif", size: "hero (1200px)", sizeKb: (heroAvifBuf.length / 1024).toFixed(2) });

        // Master AVIF
        const masterAvifPath = path.join(dirName, `${baseName}.avif`);
        fs.writeFileSync(masterAvifPath, heroAvifBuf);
        imageVariantsBytes += heroAvifBuf.length;
        totalVariantsCreated++;
      }

      totalOutputBytes += imageVariantsBytes;

      const origKb = (inputSize / 1024).toFixed(2);
      const mainWebpKb = (mainWebpBuf.length / 1024).toFixed(2);
      const savings = (((inputSize - mainWebpBuf.length) / (inputSize || 1)) * 100).toFixed(1);

      statsList.push({
        asset: relPath,
        originalFormat: ext.replace(".", ""),
        originalSizeKb: parseFloat(origKb),
        optimizedWebpKb: parseFloat(mainWebpKb),
        savingsPercent: `${savings}%`,
        variants: variantsCreatedForThisImage
      });

      console.log(`[${i + 1}/${allImages.length}] Processed: ${relPath}`);
      console.log(`  ✓ Master WebP: ${origKb} KB -> ${mainWebpKb} KB (-${savings}%)`);
      console.log(`  ✓ Generated ${variantsCreatedForThisImage.length} breakpoint variants.\n`);
    } catch (err) {
      console.error(`  ✗ Error processing ${relPath}: ${err.message}\n`);
    }
  }

  // Delete temp files directory
  cleanupTempFiles(tempDir);

  // Clean up unused .gitkeep files in public/images
  const gitkeeps = getImagesRecursively(imagesDir).filter((f) => f.endsWith(".gitkeep"));
  gitkeeps.forEach((g) => {
    try { fs.unlinkSync(g); } catch (e) {}
  });

  // Calculate statistics
  const statsSummary = {
    timestamp: new Date().toISOString(),
    totalMasterImagesProcessed: allImages.length,
    totalVariantsGenerated: totalVariantsCreated,
    totalOriginalPayloadMb: (totalInputBytes / (1024 * 1024)).toFixed(2),
    totalOptimizedPayloadMb: (totalOutputBytes / (1024 * 1024)).toFixed(2),
    overallSavingsPercent: (((totalInputBytes - totalOutputBytes) / (totalInputBytes || 1)) * 100).toFixed(1) + "%",
    details: statsList
  };

  // Write JSON Stats Report
  const statsJsonPath = path.resolve(__dirname, "optimization-stats.json");
  fs.writeFileSync(statsJsonPath, JSON.stringify(statsSummary, null, 2));

  // Write Markdown Stats Report
  let md = `# PRODUCTION IMAGE OPTIMIZATION PIPELINE REPORT\n\n`;
  md += `**Date**: ${new Date().toLocaleString()}\n`;
  md += `**Master Assets Processed**: ${allImages.length}\n`;
  md += `**Total Breakpoint Variants Generated**: ${totalVariantsCreated}\n`;
  md += `**Original Input Size**: ${statsSummary.totalOriginalPayloadMb} MB\n`;
  md += `**Optimized Pipeline Size**: ${statsSummary.totalOptimizedPayloadMb} MB\n`;
  md += `**Overall Optimization Savings**: ${statsSummary.overallSavingsPercent}\n\n`;

  md += `## Asset Optimization Breakdown\n\n`;
  md += `| Asset Path | Orig Format | Orig Size | Master WebP | Savings | Variants Created |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  statsList.forEach((s) => {
    const varCount = s.variants ? s.variants.length : 0;
    md += `| \`${s.asset}\` | ${s.originalFormat} | ${s.originalSizeKb} KB | ${s.optimizedWebpKb} KB | ${s.savingsPercent} | ${varCount} variants |\n`;
  });

  const statsMdPath = path.resolve(__dirname, "optimization-stats.md");
  fs.writeFileSync(statsMdPath, md);

  console.log("=================================================");
  console.log("          PIPELINE OPTIMIZATION COMPLETE         ");
  console.log("=================================================");
  console.log(`Master Assets Processed: ${allImages.length}`);
  console.log(`Total Variants Created: ${totalVariantsCreated}`);
  console.log(`Payload Reduction: ${statsSummary.totalOriginalPayloadMb} MB -> ${statsSummary.totalOptimizedPayloadMb} MB (${statsSummary.overallSavingsPercent})`);
  console.log(`JSON Stats: ${statsJsonPath}`);
  console.log(`Markdown Stats: ${statsMdPath}`);
  console.log("=================================================\n");
}

runOptimizationPipeline().catch((err) => {
  console.error("Optimization Pipeline Fatal Error:", err);
});
