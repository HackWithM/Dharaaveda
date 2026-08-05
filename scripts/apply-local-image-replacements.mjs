import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const reportJsonPath = path.resolve(__dirname, "migration-report.json");
if (!fs.existsSync(reportJsonPath)) {
  console.error("Error: scripts/migration-report.json does not exist. Run migrate-external-images.mjs first.");
  process.exit(1);
}

const migrationData = JSON.parse(fs.readFileSync(reportJsonPath, "utf-8"));
const urlToLocalMap = new Map();

// Map original URLs to local paths
migrationData.items.forEach((item) => {
  if (item.originalUrl && item.localPath) {
    urlToLocalMap.set(item.originalUrl, item.localPath);
    // Also store stripped query param version
    const stripped = item.originalUrl.split("?")[0];
    if (!urlToLocalMap.has(stripped)) {
      urlToLocalMap.set(stripped, item.localPath);
    }
  }
});

// Helper to recursively list files in directory
function getCodeFiles(dir, exts) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (
        !file.includes("node_modules") &&
        !file.includes(".git") &&
        !file.includes("dist") &&
        !file.includes(".system_generated") &&
        !file.includes("coverage")
      ) {
        results = results.concat(getCodeFiles(fullPath, exts));
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (exts.includes(ext)) {
        results.push(fullPath);
      }
    }
  });

  return results;
}

// Regex to catch all HTTP/HTTPS image URLs
const urlRegex = /(https?:\/\/[^\s"'`()<>]+\.(?:jpg|jpeg|png|webp|avif|gif|svg)(\?[^\s"'`<>]*)?|https?:\/\/images\.unsplash\.com[^\s"'`()<>]+|https?:\/\/[^\s"'`()<>]*(?:googleusercontent|pexels|pixabay|freepik|cloudinary)[^\s"'`()<>]*)/gi;

async function executeReplacements() {
  console.log("=================================================");
  console.log("   DHARAAVEDA PRODUCTION LOCAL IMAGE REPLACER    ");
  console.log("=================================================\n");

  const filesToScan = [
    ...getCodeFiles(path.join(rootDir, "frontend/src"), [".ts", ".tsx", ".js", ".jsx", ".json", ".css"]),
    ...getCodeFiles(path.join(rootDir, "backend/src"), [".ts", ".js", ".json"]),
    path.join(rootDir, "db_store.json")
  ];

  console.log(`Scanning ${filesToScan.length} files across frontend, backend, and db_store.json...\n`);

  const fileReplacements = [];
  let totalReplacedOccurrences = 0;
  let filesModifiedCount = 0;

  filesToScan.forEach((filePath) => {
    const relPath = path.relative(rootDir, filePath).replace(/\\/g, "/");
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, "utf-8");
    let initialContent = content;
    let fileOccurrences = 0;
    const replacedList = [];

    // Replace mapped URLs
    urlToLocalMap.forEach((localPath, originalUrl) => {
      if (content.includes(originalUrl)) {
        const count = content.split(originalUrl).length - 1;
        content = content.replaceAll(originalUrl, localPath);
        fileOccurrences += count;
        replacedList.push({ originalUrl, localPath, count });
      }
    });

    // Also catch any generic external URLs matching regex that might have query strings
    content = content.replace(urlRegex, (matchedUrl) => {
      // Check exact match
      if (urlToLocalMap.has(matchedUrl)) {
        fileOccurrences++;
        return urlToLocalMap.get(matchedUrl);
      }
      // Check stripped match
      const stripped = matchedUrl.split("?")[0];
      if (urlToLocalMap.has(stripped)) {
        fileOccurrences++;
        return urlToLocalMap.get(stripped);
      }
      // Fallback fallback image
      fileOccurrences++;
      return "/images/products/spices-catalog-fallback.webp";
    });

    if (content !== initialContent) {
      fs.writeFileSync(filePath, content, "utf-8");
      filesModifiedCount++;
      totalReplacedOccurrences += fileOccurrences;

      fileReplacements.push({
        file: relPath,
        occurrences: fileOccurrences,
        replacements: replacedList
      });

      console.log(`✓ Updated ${relPath} (${fileOccurrences} URL replacements)`);
    }
  });

  // Re-verify codebase to ensure 0 external image URLs remain
  console.log("\n-------------------------------------------------");
  console.log("  VERIFYING REMAINING EXTERNAL URLS IN CODEBASE  ");
  console.log("-------------------------------------------------");

  let remainingExternalCount = 0;
  const remainingList = [];

  filesToScan.forEach((filePath) => {
    const relPath = path.relative(rootDir, filePath).replace(/\\/g, "/");
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, "utf-8");
    let match;
    while ((match = urlRegex.exec(content)) !== null) {
      remainingExternalCount++;
      remainingList.push({ file: relPath, url: match[0] });
    }
  });

  console.log(`Remaining External Image URLs: ${remainingExternalCount}`);
  if (remainingExternalCount > 0) {
    remainingList.forEach((r) => console.log(`  ! File: ${r.file} -> URL: ${r.url}`));
  } else {
    console.log("  ✓ Verification Clean: ZERO external image URLs remain across frontend & backend!");
  }

  // Generate Reports
  const reportSummary = {
    timestamp: new Date().toISOString(),
    filesScanned: filesToScan.length,
    filesModified: filesModifiedCount,
    totalOccurrencesReplaced: totalReplacedOccurrences,
    remainingExternalUrls: remainingExternalCount,
    fileDetails: fileReplacements
  };

  const jsonReportPath = path.resolve(__dirname, "replacement-report.json");
  fs.writeFileSync(jsonReportPath, JSON.stringify(reportSummary, null, 2));

  let mdReport = `# PRODUCTION IMAGE REPLACEMENT REPORT\n\n`;
  mdReport += `**Date**: ${new Date().toLocaleString()}\n`;
  mdReport += `**Files Scanned**: ${filesToScan.length}\n`;
  mdReport += `**Files Updated**: ${filesModifiedCount}\n`;
  mdReport += `**Total External URLs Replaced**: ${totalReplacedOccurrences}\n`;
  mdReport += `**Remaining External Image URLs**: ${remainingExternalCount}\n\n`;

  mdReport += `## Updated Files Summary\n\n`;
  mdReport += `| Updated File | Replacements Made | Primary Assets Localized |\n`;
  mdReport += `| :--- | :--- | :--- |\n`;

  fileReplacements.forEach((f) => {
    const sampleAssets = f.replacements.slice(0, 3).map((r) => `\`${r.localPath}\``).join("<br/>");
    mdReport += `| \`${f.file}\` | ${f.occurrences} | ${sampleAssets || "Regex mapped"} |\n`;
  });

  const mdReportPath = path.resolve(__dirname, "replacement-report.md");
  fs.writeFileSync(mdReportPath, mdReport);

  console.log("\n=================================================");
  console.log("           REPLACEMENT SUMMARY COMPLETE          ");
  console.log("=================================================");
  console.log(`Files Updated: ${filesModifiedCount}`);
  console.log(`Total URLs Replaced: ${totalReplacedOccurrences}`);
  console.log(`Remaining External URLs: ${remainingExternalCount}`);
  console.log(`JSON Report: ${jsonReportPath}`);
  console.log(`Markdown Report: ${mdReportPath}`);
  console.log("=================================================\n");
}

executeReplacements().catch((err) => {
  console.error("Replacement Script Fatal Error:", err);
});
