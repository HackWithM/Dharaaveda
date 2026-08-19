const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:/Users/MAYUR/.gemini/antigravity-ide/brain/7e2701c6-14b3-4c48-a7e5-927cb5bc75ee/kala_masala_1787134799199.png';
const outMain = 'd:/Projects/Client/Dharaaveda-main/frontend/public/images/products/kala-masala.webp';
const outCard = 'd:/Projects/Client/Dharaaveda-main/frontend/public/images/products/kala-masala-card.webp';
const outThumb = 'd:/Projects/Client/Dharaaveda-main/frontend/public/images/products/kala-masala-thumb.webp';

sharp(inputPath)
  .webp({ quality: 85 })
  .toFile(outMain)
  .then(() => {
     fs.copyFileSync(outMain, outCard);
     fs.copyFileSync(outMain, outThumb);
     console.log('Kala Masala image converted to WebP successfully!');
  })
  .catch(err => console.error(err));
