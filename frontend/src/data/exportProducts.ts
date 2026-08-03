import { Product } from "../types";
import { IMAGES } from "./images";

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  products: Product[];
}

export const EXPORT_CATEGORIES: ProductCategory[] = [
  {
    "id": "spices",
    "title": "Spices & Seasonings",
    "description": "Vedas-grade aromatics, hot spices, and complex culinary powders milled to absolute microbiological safety standards.",
    "image": IMAGES.exportCategories.spices,
    "products": [
      {
        "id": "s-turmeric",
        "name": "Turmeric Powder",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.turmericPowder
        ],
        "description": "Turmeric Powder is a premium-quality spice made from carefully selected turmeric rhizomes, offering a vibrant golden-yellow color, rich aroma, and authentic flavor. Widely used in culinary, pharmaceutical, nutraceutical, cosmetic, and Ayurvedic applications, it is hygienically processed to meet international quality standards.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Premium Growing Regions of India",
          "packaging": "Fine Powder • Whole Turmeric Fingers • Polished Turmeric Fingers • Turmeric Granules • Customized Mesh Sizes",
          "purity": "NABL Lab Tested • Quality Assured",
          "grade": "Food • Pharmaceuticals • Nutraceuticals • Cosmetics • Ayurveda",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-redchilli",
        "name": "Red Chilli Powder",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.redChilliPowder
        ],
        "description": "Guntur Sannam red chilli powder offering a deep color and customizable heat ratings for international kitchens.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Guntur Region, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "Aflatoxin & Sudan Dye Negative",
          "grade": "Kashmiri Bright Red Selection",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-coriander",
        "name": "Coriander Powder",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.corianderPowder
        ],
        "description": "Our Coriander Powder is produced from premium coriander seeds, delivering a rich aroma, authentic flavor, and consistent quality. Carefully processed under hygienic conditions, it is ideal for food manufacturers, spice blenders, and global buyers.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Rajasthan & Madhya Pradesh, India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Fine Powder • Coarse Powder • Whole Coriander Seeds",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Export Grade • Machine Cleaned",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-cumin",
        "name": "Cumin Powder",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.cuminPowder
        ],
        "description": "Our Cumin Powder is finely ground from carefully selected premium cumin seeds, delivering a rich earthy aroma, warm flavor, and natural freshness. Hygienically processed to preserve its authentic taste and quality, it is widely used in spice blends, seasonings, food processing, and international export markets.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Gujarat & Rajasthan, India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Fine Powder • Medium Grind • Customized Mesh Sizes",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Food Processing • Spice Blends • Seasonings • Ready-to-Eat Foods • Sauces • Snacks",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-blackpepper",
        "name": "Black Pepper",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.blackPepper
        ],
        "description": "Our Black Pepper is sourced from carefully selected premium peppercorns, known for their bold aroma, sharp pungency, and rich flavor. Hygienically processed and quality assured, it is ideal for culinary applications, spice blends, food processing, pharmaceuticals, and international export markets.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Kerala & Karnataka, India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Whole Black Pepper • Cracked Black Pepper • Ground Black Pepper • Coarse Grind",
          "purity": "NABL Lab Tested • Moisture as per Buyer Specification",
          "grade": "Food Processing • Spice Blends • Seasonings • Marinades • Pharmaceuticals • Nutraceuticals",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-cardamom",
        "name": "Cardamom",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.cardamom
        ],
        "description": "Our premium Cardamom is carefully sourced from India's renowned spice-growing regions, offering a rich aroma, distinctive flavor, and vibrant natural color. Hygienically processed and quality assured, it is ideal for culinary, bakery, confectionery, beverage, pharmaceutical, and export applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Idukki, Kerala, India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Whole Green Cardamom • Cardamom Seeds • Cardamom Powder",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Food Processing • Spice Blends • Bakery • Confectionery • Beverages • Pharmaceuticals • Ayurveda",
          "minOrder": "200 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-cloves",
        "name": "Cloves",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.cloves
        ],
        "description": "Our premium Cloves are carefully sourced for their rich aroma, intense flavor, and natural oil content. Hygienically processed and quality assured, they are ideal for culinary, pharmaceutical, and export applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Kerala & Tamil Nadu, India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Hand-Selected Whole Cloves",
          "minOrder": "200 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-cinnamon",
        "name": "Cinnamon",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.cinnamon
        ],
        "description": "Ceylon-type sweet cinnamon quills harvested sustainably, carrying very low coumarin and a delicate woody sweetness.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Western Ghats, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "100% Pure, Heavy-Metal Free",
          "grade": "Fine Grade Alba quills",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-nutmeg",
        "name": "Nutmeg",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.nutmeg
        ],
        "description": "Our premium Nutmeg is carefully sourced from selected spice-growing regions, offering a rich aroma, warm flavor, and natural freshness. Hygienically processed and quality assured, it is ideal for culinary, bakery, confectionery, pharmaceutical, and wellness applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Kerala, India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Whole Nutmeg • Nutmeg Powder • Cracked Nutmeg",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Food Processing • Bakery • Confectionery • Beverages • Spice Blends • Pharmaceuticals • Ayurveda",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-staranise",
        "name": "Star Anise",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.starAnise
        ],
        "description": "Star Anise is a premium aromatic spice with a distinctive star shape and sweet, licorice-like flavor. Ideal for culinary, herbal, beverage, pharmaceutical, and essential oil applications, it is carefully sourced and processed to ensure exceptional quality and freshness.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Arunachal Pradesh & Northeast India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Whole • Broken • Powder",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Culinary • Spice Blends • Herbal Products • Beverages • Pharmaceuticals",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-fennel",
        "name": "Fennel Seeds",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.fennelSeeds
        ],
        "description": "Our premium Fennel Seeds are carefully sourced from India's finest growing regions, offering a naturally sweet aroma, refreshing flavor, and vibrant green color. Hygienically processed and quality assured, they are ideal for culinary, confectionery, beverage, pharmaceutical, and wellness applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Rajasthan & Gujarat, India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Whole Fennel Seeds • Fennel Powder • Crushed Fennel",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Food Processing • Spice Blends • Bakery • Confectionery • Beverages • Herbal Products • Ayurveda",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-mustard",
        "name": "Mustard Seeds",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.mustardSeeds
        ],
        "description": "Our premium Mustard Seeds are carefully sourced from India's leading growing regions, offering a rich aroma, natural pungency, and superior quality. Hygienically processed and quality assured.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Rajasthan & Uttar Pradesh, India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Whole Mustard Seeds • Mustard Powder • Crushed Mustard",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Food Processing • Spice Blends • Pickles • Condiments • Oil Extraction • Seasonings",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-bayleaves",
        "name": "Bay Leaves",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.bayLeaves
        ],
        "description": "Our premium Bay Leaves are carefully sourced from selected growing regions, offering a distinctive aroma, mild earthy flavor, and natural freshness. Hygienically processed and quality assured, they are ideal for culinary, spice blends, food processing, and international export markets.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Uttarakhand & Himachal Pradesh, India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Whole Bay Leaves • Crushed Bay Leaves • Bay Leaf Powder",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Food Processing • Spice Blends • Soups • Curries • Rice Dishes • Seasonings • Herbal Products",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "s-garammasala",
        "name": "Garam Masala",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.garamMasala
        ],
        "description": "Our premium Garam Masala is expertly blended using carefully selected whole spices to deliver a rich aroma, balanced flavor, and authentic taste. Hygienically processed and quality assured, it is ideal for home kitchens, food processing, restaurants, and international export markets.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Fine Powder • Coarse Blend • Customized Spice Blends",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Cooking • Curries • Gravies • Marinades • Snacks • Ready-to-Eat Foods • Food Processing",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
  
      {
        "id": "s-mixedspice",
        "name": "Mixed Spice Blends",
        "category": "Spices & Seasonings",
        "images": [
          IMAGES.exportProducts.mixedSpiceBlends
        ],
        "description": "Our premium Mixed Spice Blends are expertly crafted using carefully selected spices to deliver consistent aroma, authentic flavor, and superior quality. Hygienically processed and quality assured, they are ideal for food manufacturers, restaurants, retail brands, and international export markets.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk, Retail & Private Label Packaging Available • Available Blends: Garam Masala, Kitchen King, Chaat Masala, Pav Bhaji, Biryani, Sabzi, Sambar, Rasam, Tea, Kala, Kanda Lasun, Peri Peri, Custom Blends",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Food Processing • Ready-to-Cook Mixes • Seasonings • Marinades • Snacks • Sauces • Restaurant & Catering",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      }
    ]
  },
  {
    "id": "veg_powders",
    "title": "Dehydrated Vegetable Powders",
    "description": "Nature's Goodness, Expertly Preserved\n\nDharaaveda Global Exim offers a premium range of Dehydrated Vegetable Powders manufactured from carefully selected farm-fresh vegetables using advanced dehydration technology. Our products retain their natural color, aroma, taste, and nutritional value, making them ideal for a wide range of food processing and industrial applications.",
    "image": IMAGES.exportCategories.vegPowders,
    "products": [
      {
        "id": "vp-beetroot",
        "name": "Beetroot Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.beetrootPowder
        ],
        "description": "Our premium Beetroot Powder is made from carefully selected beetroots, offering a vibrant natural color, rich flavor, and superior quality. Hygienically processed to preserve its natural goodness, it is ideal for food processing, beverages, bakery, nutraceuticals, health foods, and international export markets.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Fine Powder • Customized Mesh Sizes",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Health Foods • Beverages • Smoothies • Bakery • Food Processing • Nutraceuticals • Natural Food Coloring",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "vp-tomato",
        "name": "Tomato Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.tomatoPowder
        ],
        "description": "Fine spray-dried red tomato powder prepared from ripe organic tomatoes, ideal for instant soups, sauces, and seasoning rubs.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Karnataka Farms, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "vp-potato",
        "name": "Potato Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.potatoPowder
        ],
        "description": "Our premium Potato Powder is produced from carefully selected potatoes, offering a smooth texture, natural taste, and excellent consistency. Hygienically processed and quality assured, it is ideal for soups, sauces, snacks, bakery products, food processing, and international export markets.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Fine Powder • Customized Mesh Sizes",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Food Processing • Soups • Sauces • Snacks • Bakery • Instant Mixes • Ready-to-Eat Foods",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "vp-garlic",
        "name": "Garlic Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.garlicPowder
        ],
        "description": "Our premium Garlic Powder is made from carefully selected garlic cloves, delivering a rich aroma, authentic flavor, and excellent consistency. Hygienically processed and quality assured, it is ideal for seasonings, spice blends, sauces, snacks, food processing, and international export markets.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Fine Powder • Coarse Powder • Customized Mesh Sizes",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Food Processing • Seasonings • Spice Blends • Sauces • Snacks • Ready-to-Eat Foods • Bakery",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "vp-ginger",
        "name": "Ginger Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.gingerPowder
        ],
        "description": "Our premium Ginger Powder is made from carefully selected ginger rhizomes, offering a rich aroma, warm flavor, and natural freshness. Hygienically processed and quality assured, it is ideal for food processing, beverages, bakery, nutraceuticals, spice blends, and international export markets.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Fine Powder • Coarse Powder • Customized Mesh Sizes",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Food Processing • Beverages • Bakery • Spice Blends • Seasonings • Nutraceuticals • Ayurveda",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "vp-onion",
        "name": "Onion Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.onionPowder
        ],
        "description": "Our premium Onion Powder is made from carefully selected onions, offering a rich aroma, authentic flavor, and excellent consistency. Hygienically processed and quality assured, it is ideal for seasonings, spice blends, soups, sauces, snacks, food processing, and international export markets.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Fine Powder • Coarse Powder • Customized Mesh Sizes",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Food Processing • Seasonings • Spice Blends • Soups • Sauces • Snacks • Ready-to-Eat Foods",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "vp-spinach",
        "name": "Spinach Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.spinachPowder
        ],
        "description": "Our Spinach Powder is produced from carefully selected, fresh spinach leaves that are gently dehydrated and finely milled to preserve their natural green color, nutrients, and fresh leafy aroma. Rich in iron, dietary fiber, vitamins, and natural chlorophyll, it is widely used in the food, nutraceutical, bakery, and health food industries.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail • Fine Powder • Custom Mesh Sizes (on request)",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Nutraceuticals • Smoothies & Beverages • Soups & Sauces • Bakery & Confectionery • Pasta & Noodles • Seasonings",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "vp-carrot",
        "name": "Carrot Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.carrotPowder
        ],
        "description": "Our Carrot Powder is produced from carefully selected fresh carrots that are hygienically processed, gently dehydrated, and finely milled to preserve their natural color, sweetness, and nutritional value. Rich in natural beta-carotene, it is widely used across the food, beverage, nutraceutical, and bakery industries.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Fine Powder • Custom Mesh Sizes",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Health Supplements • Soups & Sauces • Bakery & Confectionery • Baby Food Formulations • Smoothies & Beverages",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "vp-cabbage",
        "name": "Cabbage Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.cabbagePowder
        ],
        "description": "Our Cabbage Powder is produced from carefully selected fresh cabbage that is hygienically processed, gently dehydrated, and finely milled to preserve its natural flavor, color, and nutritional value. It is widely used in food processing, seasoning blends, soups, ready-to-eat meals, and health food applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Fine Powder • Custom Mesh Sizes",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Soups & Sauces • Seasoning & Spice Blends • Instant Food Mixes • Ready-to-Eat Foods • Bakery Products • Snacks",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "vp-moringa",
        "name": "Drumstick (Moringa) Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.moringaPowderVeg
        ],
        "description": "Our Drumstick Powder is produced from carefully selected fresh drumsticks (Moringa Pods) that are hygienically processed, gently dehydrated, and finely milled to preserve their natural flavor, color, and nutritional value. It is widely used in food processing, nutraceuticals, health foods, and seasoning applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Fine Powder • Custom Mesh Sizes",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Nutraceuticals & Health Foods • Soups & Sauces • Instant Food Mixes • Seasoning & Spice Blends • Ready-to-Eat Foods",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "vp-greenchilli",
        "name": "Green Chilli Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.greenChilliPowder
        ],
        "description": "Our Green Chilli Powder is produced from carefully selected fresh green chillies that are hygienically processed, gently dehydrated, and finely milled to preserve their natural pungency, vibrant green color, and fresh aroma. It is widely used in the food processing, seasoning, snack, and ready-to-eat food industries.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Fine Powder • Custom Mesh Sizes",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Seasoning & Spice Blends • Snack Food Manufacturing • Instant Food Mixes • Soups & Sauces • Pickle Preparations",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "vp-corianderleaf",
        "name": "Coriander Leaf Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.corianderLeafPowder
        ],
        "description": "Our Coriander Leaf Powder is produced from carefully selected fresh coriander (cilantro) leaves that are hygienically processed, gently dehydrated, and finely milled to preserve their natural green color, fresh aroma, and nutritional value. It is widely used in seasoning blends, soups, sauces, ready-to-eat foods, and various culinary applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Fine Powder • Custom Mesh Sizes",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Seasoning & Spice Blends • Soups & Sauces • Instant Food Mixes • Ready-to-Eat Foods • Snacks & Savory Products",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "vp-mint",
        "name": "Mint Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.mintPowder
        ],
        "description": "High-purity dehydrated mint powder ground to micro-mesh standards for quick solubility and flavor dispersion.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      }
    ]
  },
  {
    "id": "fruit_powders",
    "title": "Dehydrated Fruit Powders",
    "description": "Premium Fruit Powders for Global Food Industries\n\nDharaaveda Global Exim offers a premium range of Dehydrated Fruit Powders produced from carefully selected, high-quality fruits using advanced dehydration technology. Our fruit powders preserve the natural flavor, aroma, color, and nutritional goodness of fresh fruits, making them an ideal ingredient for a wide variety of food, beverage, nutraceutical, and confectionery applications.",
    "image": IMAGES.exportCategories.fruitPowders,
    "products": [
      {
        "id": "fp-banana",
        "name": "Banana Powder",
        "category": "Dehydrated Fruit Powders",
        "images": [
          IMAGES.exportProducts.bananaPowder
        ],
        "description": "Our Banana Powder is produced from carefully selected ripe bananas that are hygienically processed, gently dehydrated, and finely milled to preserve their natural sweetness, aroma, and nutritional value. It is widely used in the food, beverage, bakery, nutraceutical, and infant nutrition industries.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "25 kg Multi-layer Kraft Paper Bags • Customized Bulk & Retail Packaging Available • Fine Powder • Custom Mesh Sizes",
          "purity": "Premium Export Quality • Hygienically Processed",
          "grade": "Health Supplements • Baby Food & Infant Nutrition • Smoothies & Beverages • Bakery & Confectionery • Dairy Products • Instant Food Mixes",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fp-mango",
        "name": "Mango Powder",
        "category": "Dehydrated Fruit Powders",
        "images": [
          IMAGES.exportProducts.mangoPowder
        ],
        "description": "Our Mango Powder is produced from carefully selected premium-quality mangoes that are hygienically processed, gently dehydrated, and finely milled to preserve their natural sweetness, tropical aroma, vibrant color, and nutritional value. It is widely used in the food, beverage, bakery, confectionery, and nutraceutical industries.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Ratnagiri Orchards, India",
          "packaging": "Aluminum Vacuum Foil Inserts in Master Cartons • Fine Powder • Custom Mesh Sizes",
          "purity": "Spray-Dried from 100% Organic Fruit Pulp",
          "grade": "Beverage & Smoothie Mixes • Bakery & Confectionery • Dairy Products & Ice Cream • Health Supplements • Instant Food Mixes",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fp-guava",
        "name": "Guava Powder",
        "category": "Dehydrated Fruit Powders",
        "images": [
          IMAGES.exportProducts.guavaPowder
        ],
        "description": "Our Guava Powder is produced from carefully selected, ripe guavas that are hygienically processed and spray-dried to preserve their natural tropical flavor, aroma, color, and nutritional value. Rich in natural Vitamin C and dietary fiber, it is widely used in food, beverage, nutraceutical, dairy, and confectionery applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India (Maharashtra, Uttar Pradesh & Andhra Pradesh)",
          "packaging": "25 kg Multi-layer Kraft Paper Bags with Food-Grade Poly Liner • Aluminum Foil Vacuum Packs for Bulk Export • Customized Bulk & Retail",
          "purity": "100% Pure Guava Fruit Powder • No Artificial Colors • No Preservatives • No Added Sugar",
          "grade": "Beverages & Smoothies • Health Supplements • Bakery & Confectionery • Dairy Products • Instant Food Mixes",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fp-pomegranate",
        "name": "Pomegranate Powder",
        "category": "Dehydrated Fruit Powders",
        "images": [
          IMAGES.exportProducts.pomegranatePowder
        ],
        "description": "Our Pomegranate Powder is produced from carefully selected, ripe pomegranates that are hygienically processed and spray-dried to preserve their natural ruby-red color, fruity flavor, and nutritional value. Rich in natural antioxidants, polyphenols, and Vitamin C, it is widely used in the food, beverage, nutraceutical, and functional food industries.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India (Maharashtra, Karnataka & Gujarat)",
          "packaging": "25 kg Multi-layer Kraft Paper Bags with Food-Grade Poly Liner • Aluminum Foil Vacuum Packs for Bulk Export • Customized Bulk & Retail",
          "purity": "100% Pure Pomegranate Fruit Powder • No Artificial Colors • No Preservatives • No Added Sugar",
          "grade": "Health Supplements • Functional Beverages & Smoothies • Bakery & Confectionery • Dairy Products & Ice Cream • Instant Food Mixes",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fp-pineapple",
        "name": "Pineapple Powder",
        "category": "Dehydrated Fruit Powders",
        "images": [
          IMAGES.exportProducts.pineapplePowder
        ],
        "description": "Our Pineapple Powder is produced from carefully selected, ripe pineapples that are hygienically processed and spray-dried to preserve their natural tropical flavor, aroma, golden color, and nutritional value. Naturally rich in Vitamin C and bromelain, it is widely used in the food, beverage, nutraceutical, bakery, and confectionery industries.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India (Kerala, Assam, West Bengal & Tripura)",
          "packaging": "25 kg Multi-layer Kraft Paper Bags with Food-Grade Poly Liner • Aluminum Foil Vacuum Packs for Bulk Export • Customized Bulk & Retail",
          "purity": "100% Pure Pineapple Fruit Powder • No Artificial Colors • No Preservatives • No Added Sugar",
          "grade": "Beverages & Smoothies • Health Supplements • Bakery & Confectionery • Dairy Products & Ice Cream • Instant Food Mixes",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fp-papaya",
        "name": "Papaya Powder",
        "category": "Dehydrated Fruit Powders",
        "images": [
          IMAGES.exportProducts.papayaPowder
        ],
        "description": "Premium-quality dehydrated papaya powder made from carefully selected, ripe papaya. The fruit is hygienically processed and finely powdered to retain its natural colour, flavour, aroma, and nutritional properties.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "100 g / 250 g / 500 g / 1 kg retail pouches • 5 kg / 10 kg / 20 kg / 25 kg bulk packs • Food-grade laminated pouches • Kraft paper bags with food-grade inner liner",
          "purity": "100% Papaya Powder — free from artificial colours, flavours and preservatives",
          "grade": "Food Grade / Export Grade (Customized specifications available)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fp-apple",
        "name": "Apple Powder",
        "category": "Dehydrated Fruit Powders",
        "images": [
          IMAGES.exportProducts.applePowder
        ],
        "description": "Premium-quality dehydrated Apple Powder made from carefully selected fresh apples. The apples are hygienically processed and finely powdered to retain their natural fruity flavour, aroma, and characteristic apple taste. Suitable for food, beverage, bakery and nutraceutical applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "100 g / 250 g / 500 g / 1 kg retail pouches • 5 kg / 10 kg / 20 kg / 25 kg bulk packs • Food-grade laminated pouches • Kraft paper bags with food-grade inner liner",
          "purity": "100% Apple Powder — free from artificial colours, flavours and preservatives",
          "grade": "Food Grade / Export Grade (Customized specifications available)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fp-orange",
        "name": "Orange Powder",
        "category": "Dehydrated Fruit Powders",
        "images": [
          IMAGES.exportProducts.orangePowder
        ],
        "description": "Premium-quality dehydrated Orange Powder made from carefully selected fresh oranges. The fruit is hygienically processed and finely powdered to retain its natural citrus flavour, aroma, and characteristic orange taste. Suitable for food, beverage, bakery, confectionery and nutraceutical applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "100 g / 250 g / 500 g / 1 kg retail pouches • 5 kg / 10 kg / 20 kg / 25 kg bulk packs • Food-grade laminated pouches • Kraft paper bags with food-grade inner liner",
          "purity": "100% Orange Powder — free from artificial colours, flavours and preservatives",
          "grade": "Food Grade / Export Grade (Customized specifications available)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fp-lemon",
        "name": "Lemon Powder",
        "category": "Dehydrated Fruit Powders",
        "images": [
          IMAGES.exportProducts.lemonPowder
        ],
        "description": "Premium-quality dehydrated Lemon Powder made from carefully selected fresh lemons. The lemons are hygienically processed and finely powdered to retain their characteristic citrus flavour, aroma, and natural tanginess. Suitable for food, beverage, bakery, seasoning and nutraceutical applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "100 g / 250 g / 500 g / 1 kg retail pouches • 5 kg / 10 kg / 20 kg / 25 kg bulk packs • Food-grade laminated pouches • Kraft paper bags with food-grade inner liner",
          "purity": "100% Lemon Powder — free from artificial colours, flavours and preservatives",
          "grade": "Food Grade / Export Grade (Customized specifications available)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fp-strawberry",
        "name": "Strawberry Powder",
        "category": "Dehydrated Fruit Powders",
        "images": [
          IMAGES.exportProducts.strawberryPowder
        ],
        "description": "Premium-quality dehydrated Strawberry Powder made from carefully selected fresh strawberries. The fruit is hygienically processed and finely powdered to retain its characteristic strawberry flavour, aroma, colour, and natural fruity taste.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "100 g / 250 g / 500 g / 1 kg retail pouches • 5 kg / 10 kg / 20 kg / 25 kg bulk packs • Food-grade laminated pouches • Kraft paper bags with food-grade inner liner",
          "purity": "100% Strawberry Powder — free from artificial colours, flavours and preservatives",
          "grade": "Food Grade / Export Grade (Customized specifications available)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fp-amla",
        "name": "Amla Powder",
        "category": "Dehydrated Fruit Powders",
        "images": [
          IMAGES.exportProducts.amlaPowder
        ],
        "description": "Premium-quality dehydrated Amla Powder (Indian Gooseberry Powder) made from carefully selected fresh amla fruits. The fruit is hygienically processed and finely powdered to retain its natural colour, characteristic tangy flavour, aroma, and valuable nutritional properties.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "100 g / 250 g / 500 g / 1 kg retail pouches • 5 kg / 10 kg / 20 kg / 25 kg bulk packs • Food-grade laminated pouches • Kraft paper bags with food-grade inner liner",
          "purity": "100% Amla Powder — free from artificial colours, flavours and preservatives",
          "grade": "Food Grade / Export Grade (Customized specifications available)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      }
    ]
  },
  {
    "id": "moringa",
    "title": "Moringa Products",
    "description": "We offer premium-quality Moringa-based products sourced from India, carefully processed and packed for food, nutraceutical, herbal, wellness, and international export markets.",
    "image": IMAGES.exportCategories.moringa,
    "products": [
      {
        "id": "m-leaf-powder",
        "name": "Moringa Leaf Powder",
        "category": "Moringa Products",
        "images": [
          IMAGES.exportProducts.moringaPowder
        ],
        "description": "Finely processed powder made from carefully selected moringa leaves. Suitable for food, wellness, nutraceutical and herbal applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "100 g, 250 g, 500 g, 1 kg, 5 kg, 10 kg, 20 kg & 25 kg",
          "purity": "100% Moringa Leaf Powder",
          "grade": "Food Grade / Export Grade",
          "minOrder": "200 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "m-leaf-flakes",
        "name": "Moringa Leaf Flakes",
        "category": "Moringa Products",
        "images": [
          IMAGES.exportProducts.moringaLeaves
        ],
        "description": "Carefully dried moringa leaves processed into flakes while maintaining their natural green colour and characteristic aroma.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "100 g–25 kg",
          "purity": "100% Pure Moringa",
          "grade": "Food Grade / Export Grade",
          "minOrder": "200 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "m-tea",
        "name": "Moringa Tea",
        "category": "Moringa Products",
        "images": [
          IMAGES.exportProducts.moringaTea
        ],
        "description": "Premium dried moringa leaves selected and processed for use as a natural herbal tea ingredient.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "Retail pouches, tea bags & bulk packs",
          "purity": "100% Pure Moringa",
          "grade": "Food Grade / Export Grade",
          "minOrder": "200 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "m-seed-powder",
        "name": "Moringa Seed Powder / Murungai Vidhai Powder l Drumstick Seed Powder",
        "category": "Moringa Products",
        "images": [
          IMAGES.exportProducts.moringaExtract
        ],
        "description": "Finely processed moringa seed powder suitable for selected food, nutraceutical and industrial applications, subject to buyer specifications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "1 kg, 5 kg, 10 kg & 25 kg",
          "purity": "100% Pure Moringa",
          "grade": "Food / Industrial Grade depending on application",
          "minOrder": "200 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "m-seeds",
        "name": "Moringa Seeds",
        "category": "Moringa Products",
        "images": [
          IMAGES.exportProducts.moringaExtract
        ],
        "description": "Carefully selected and cleaned moringa seeds sourced from India for food, agricultural, processing and other specified applications.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "1 kg, 5 kg, 10 kg, 25 kg & customized bulk packing",
          "purity": "100% Pure Moringa",
          "grade": "Export Grade",
          "minOrder": "200 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "m-seed-oil",
        "name": "Moringa Seed Oil",
        "category": "Moringa Products",
        "images": [
          IMAGES.exportProducts.moringaExtract
        ],
        "description": "Premium oil obtained from moringa seeds, suitable for cosmetic, personal-care, wellness and industrial applications depending on specification.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "100 ml, 250 ml, 500 ml, 1 L, 5 L & bulk",
          "purity": "100% Pure Moringa",
          "grade": "Cosmetic / Industrial Grade",
          "minOrder": "200 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "m-leaf-extract",
        "name": "Moringa Leaf Extract",
        "category": "Moringa Products",
        "images": [
          IMAGES.exportProducts.moringaExtract
        ],
        "description": "Concentrated moringa leaf extract designed for use as an ingredient in nutraceutical, herbal and functional-food formulations.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "1 kg, 5 kg, 10 kg & 25 kg",
          "purity": "100% Pure Moringa",
          "grade": "Food / Nutraceutical Grade as specified",
          "minOrder": "200 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "m-capsules",
        "name": "Moringa Capsules / Tablets",
        "category": "Moringa Products",
        "images": [
          IMAGES.exportProducts.moringaExtract
        ],
        "description": "Moringa-based dietary supplement products manufactured according to applicable specifications and regulatory requirements.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "India",
          "packaging": "Bottles, jars, cartons",
          "purity": "100% Pure Moringa",
          "grade": "Dietary Supplement Grade",
          "minOrder": "200 Kilograms"
        },
        "createdAt": "2026-05-31"
      }
    ]
  },
  {
    "id": "seeds",
    "title": "Seeds Category",
    "description": "Elite export-quality organic oil and nutritional seeds cleaned, sorted, and packed under absolute phytosanitary controls.",
    "image": IMAGES.exportCategories.seeds,
    "products": [
      {
        "id": "sd-flax",
        "name": "Flax Seeds",
        "category": "Seeds Category",
        "images": [
          IMAGES.exportProducts.flaxSeeds
        ],
        "description": "Dark brown organic flax seeds loaded with Omega-3 fatty acids, processed with advanced optical graders to guarantee purity.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Gujarat Drylands, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "99.9% Machine Cleaned / Sortex Cleaned",
          "grade": "Export Grade AAA Bold Seeds",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "sd-pumpkin",
        "name": "Pumpkin Seeds",
        "category": "Seeds Category",
        "images": [
          IMAGES.exportProducts.pumpkinSeeds
        ],
        "description": "Export-ready premium pumpkin seeds carefully cleaned and graded for dietary seeds, cereals, and industrial oil extraction.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Gujarat Drylands, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "99.9% Machine Cleaned / Sortex Cleaned",
          "grade": "Export Grade AAA Bold Seeds",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "sd-sesame",
        "name": "Sesame Seeds",
        "category": "Seeds Category",
        "images": [
          IMAGES.exportProducts.sesameSeeds
        ],
        "description": "Crispy, white hulled sesame seeds Auto-Sortex graded, boasting high oil content and nuttiness for global bakery imports.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Gujarat Drylands, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "99.9% Machine Cleaned / Sortex Cleaned",
          "grade": "Premium Hulled Auto-Cleaned Sortex",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "sd-sunflower",
        "name": "Sunflower Seeds",
        "category": "Seeds Category",
        "images": [
          IMAGES.exportProducts.sunflowerSeeds
        ],
        "description": "Export-ready premium sunflower seeds carefully cleaned and graded for dietary seeds, cereals, and industrial oil extraction.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Gujarat Drylands, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "99.9% Machine Cleaned / Sortex Cleaned",
          "grade": "Export Grade AAA Bold Seeds",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "sd-chia",
        "name": "Chia Seeds",
        "category": "Seeds Category",
        "images": [
          IMAGES.exportProducts.chiaSeeds
        ],
        "description": "High-swelling organic black and white chia seeds, sorted to remove all foreign plant matter, rich in mucilage fibers.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Madhya Pradesh, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "99.9% Machine Cleaned / Sortex Cleaned",
          "grade": "Export Grade AAA Bold Seeds",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "sd-watermelon",
        "name": "Watermelon Seeds",
        "category": "Seeds Category",
        "images": [
          IMAGES.exportProducts.watermelonSeeds
        ],
        "description": "Export-ready premium watermelon seeds carefully cleaned and graded for dietary seeds, cereals, and industrial oil extraction.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Gujarat Drylands, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "99.9% Machine Cleaned / Sortex Cleaned",
          "grade": "Export Grade AAA Bold Seeds",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "sd-basil",
        "name": "Basil Seeds",
        "category": "Seeds Category",
        "images": [
          IMAGES.exportProducts.basilSeeds
        ],
        "description": "Export-ready premium basil seeds carefully cleaned and graded for dietary seeds, cereals, and industrial oil extraction.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Gujarat Drylands, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "99.9% Machine Cleaned / Sortex Cleaned",
          "grade": "Export Grade AAA Bold Seeds",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      }
    ]
  },
  {
    "id": "dehydrated_veg",
    "title": "Dehydrated Vegetables",
    "description": "Clean-sliced dehydrated onions, garlic, ginger, and other vegetables processed for high reconstitution and long shelf life.",
    "image": IMAGES.exportCategories.dehydratedVeg,
    "products": [
      {
        "id": "dv-onion",
        "name": "Dehydrated Onion",
        "category": "Dehydrated Vegetables",
        "images": [
          IMAGES.exportProducts.dehydratedOnion
        ],
        "description": "Air-dried red and white onion slices with excellent texture, preserving essential pungent flavors for immediate food formulation.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Nashik Region, India",
          "packaging": "Polyethylene lined corrugated boxes (15/20kg)",
          "purity": "No Added Salt, Preservatives or Sulfites",
          "grade": "AAA Premium Rehydration Standard",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "dv-garlic",
        "name": "Dehydrated Garlic",
        "category": "Dehydrated Vegetables",
        "images": [
          IMAGES.exportProducts.dehydratedGarlic
        ],
        "description": "Premium dehydrated garlic cloves split to speed up rehydration in instant spice rubs, canned stews, and noodles.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Malwa Region, India",
          "packaging": "Polyethylene lined corrugated boxes (15/20kg)",
          "purity": "No Added Salt, Preservatives or Sulfites",
          "grade": "AAA Premium Rehydration Standard",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "dv-ginger",
        "name": "Dehydrated Ginger",
        "category": "Dehydrated Vegetables",
        "images": [
          IMAGES.exportProducts.dehydratedGinger
        ],
        "description": "Low-temperature dehydrated dehydrated ginger slices, carefully sorted to match uniform shape and color for industrial food packers.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Polyethylene lined corrugated boxes (15/20kg)",
          "purity": "No Added Salt, Preservatives or Sulfites",
          "grade": "AAA Premium Rehydration Standard",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "dv-tomato",
        "name": "Dehydrated Tomato",
        "category": "Dehydrated Vegetables",
        "images": [
          IMAGES.exportProducts.dehydratedTomato
        ],
        "description": "Dried organic tomato slices with rich natural lycopene counts and zero sulfite treatment, for gourmet culinary packs.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Wayanad Highlands, India",
          "packaging": "Polyethylene lined corrugated boxes (15/20kg)",
          "purity": "No Added Salt, Preservatives or Sulfites",
          "grade": "AAA Premium Rehydration Standard",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "dv-carrot",
        "name": "Dehydrated Carrot",
        "category": "Dehydrated Vegetables",
        "images": [
          IMAGES.exportProducts.dehydratedCarrot
        ],
        "description": "Low-temperature dehydrated dehydrated carrot slices, carefully sorted to match uniform shape and color for industrial food packers.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Polyethylene lined corrugated boxes (15/20kg)",
          "purity": "No Added Salt, Preservatives or Sulfites",
          "grade": "AAA Premium Rehydration Standard",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "dv-beetroot",
        "name": "Dehydrated Beetroot",
        "category": "Dehydrated Vegetables",
        "images": [
          IMAGES.exportProducts.dehydratedBeetroot
        ],
        "description": "Low-temperature dehydrated dehydrated beetroot slices, carefully sorted to match uniform shape and color for industrial food packers.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Polyethylene lined corrugated boxes (15/20kg)",
          "purity": "No Added Salt, Preservatives or Sulfites",
          "grade": "AAA Premium Rehydration Standard",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "dv-spinach",
        "name": "Dehydrated Spinach",
        "category": "Dehydrated Vegetables",
        "images": [
          IMAGES.exportProducts.dehydratedSpinach
        ],
        "description": "Low-temperature dehydrated dehydrated spinach slices, carefully sorted to match uniform shape and color for industrial food packers.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Polyethylene lined corrugated boxes (15/20kg)",
          "purity": "No Added Salt, Preservatives or Sulfites",
          "grade": "AAA Premium Rehydration Standard",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "dv-cabbage",
        "name": "Dehydrated Cabbage",
        "category": "Dehydrated Vegetables",
        "images": [
          IMAGES.exportProducts.dehydratedCabbage
        ],
        "description": "Low-temperature dehydrated dehydrated cabbage slices, carefully sorted to match uniform shape and color for industrial food packers.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Polyethylene lined corrugated boxes (15/20kg)",
          "purity": "No Added Salt, Preservatives or Sulfites",
          "grade": "AAA Premium Rehydration Standard",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      }
    ]
  },
  {
    "id": "dehydrated_fruits",
    "title": "Dehydrated Fruits",
    "description": "Premium long-cut and slices of sun-sheltered dehydrated fruits preserving natural sugars, texture, and vitamins.",
    "image": IMAGES.exportCategories.dehydratedFruits,
    "products": [
      {
        "id": "df-banana",
        "name": "Banana Slices",
        "category": "Dehydrated Fruits",
        "images": [
          IMAGES.exportProducts.bananaSlices
        ],
        "description": "Sweet Cavendish banana rounds dehydrated naturally without chemical preservatives, perfect for organic snacking mixes.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Wayanad Highlands, India",
          "packaging": "Vacuum-sealed poly bags in master cartons (10kg)",
          "purity": "No Added Sugar, Sulfites or Colorants",
          "grade": "Premium Long-Cut Slices",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "df-mango",
        "name": "Mango Slices",
        "category": "Dehydrated Fruits",
        "images": [
          IMAGES.exportProducts.mangoSlices
        ],
        "description": "Hand-sliced Alphonso and Kesar mango strips air-dried to retain sweet tropical fragrance and soft, chewy gourmet texture.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Ratnagiri Orchards, India",
          "packaging": "Vacuum-sealed poly bags in master cartons (10kg)",
          "purity": "No Added Sugar, Sulfites or Colorants",
          "grade": "Premium Long-Cut Slices",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "df-pineapple",
        "name": "Pineapple Slices",
        "category": "Dehydrated Fruits",
        "images": [
          IMAGES.exportProducts.pineappleSlices
        ],
        "description": "Premium dehydrated slices of sun-ripened organic pineapple slices, structured for gourmet food bags and cereal additives.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Vacuum-sealed poly bags in master cartons (10kg)",
          "purity": "No Added Sugar, Sulfites or Colorants",
          "grade": "Premium Long-Cut Slices",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "df-apple",
        "name": "Apple Slices",
        "category": "Dehydrated Fruits",
        "images": [
          IMAGES.exportProducts.appleSlices
        ],
        "description": "Premium dehydrated slices of sun-ripened organic apple slices, structured for gourmet food bags and cereal additives.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Vacuum-sealed poly bags in master cartons (10kg)",
          "purity": "No Added Sugar, Sulfites or Colorants",
          "grade": "Premium Long-Cut Slices",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "df-papaya",
        "name": "Papaya Slices",
        "category": "Dehydrated Fruits",
        "images": [
          IMAGES.exportProducts.papayaSlices
        ],
        "description": "Premium dehydrated slices of sun-ripened organic papaya slices, structured for gourmet food bags and cereal additives.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Vacuum-sealed poly bags in master cartons (10kg)",
          "purity": "No Added Sugar, Sulfites or Colorants",
          "grade": "Premium Long-Cut Slices",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "df-strawberry",
        "name": "Strawberry Slices",
        "category": "Dehydrated Fruits",
        "images": [
          IMAGES.exportProducts.strawberrySlices
        ],
        "description": "Premium dehydrated slices of sun-ripened organic strawberry slices, structured for gourmet food bags and cereal additives.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Vacuum-sealed poly bags in master cartons (10kg)",
          "purity": "No Added Sugar, Sulfites or Colorants",
          "grade": "Premium Long-Cut Slices",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "df-guava",
        "name": "Guava Slices",
        "category": "Dehydrated Fruits",
        "images": [
          IMAGES.exportProducts.guavaSlices
        ],
        "description": "Premium dehydrated slices of sun-ripened organic guava slices, structured for gourmet food bags and cereal additives.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Vacuum-sealed poly bags in master cartons (10kg)",
          "purity": "No Added Sugar, Sulfites or Colorants",
          "grade": "Premium Long-Cut Slices",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      }
    ]
  },
  {
    "id": "flakes",
    "title": "Flakes Category",
    "description": "Industrial-grade and gourmet vegetable flakes dried uniformly for quick hydration in convenience foods and dry mixes.",
    "image": IMAGES.exportCategories.flakes,
    "products": [
      {
        "id": "fl-onion",
        "name": "Onion Flakes",
        "category": "Flakes Category",
        "images": [
          IMAGES.exportProducts.dehydratedOnion
        ],
        "description": "Perfectly cut 10mm red and white onion flakes, systematically air-dried to retain natural sweet allicin, ideal for fast food noodles and sauces.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Nashik Valley, India",
          "packaging": "Double corrugated boxes with heat-sealed liners",
          "purity": "Moisture < 5% guaranteed, zero dust",
          "grade": "Gourmet Flake Cut (10-12mm)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fl-garlic",
        "name": "Garlic Flakes",
        "category": "Flakes Category",
        "images": [
          IMAGES.exportProducts.garlicFlakes
        ],
        "description": "Dehydrated garlic flakes split clean, offering sharp allium zest and rapid hydration for ready-meal packets.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Malwa Plateau, India",
          "packaging": "Double corrugated boxes with heat-sealed liners",
          "purity": "Moisture < 5% guaranteed, zero dust",
          "grade": "Gourmet Flake Cut (10-12mm)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fl-potato",
        "name": "Potato Flakes",
        "category": "Flakes Category",
        "images": [
          IMAGES.exportProducts.potatoFlakes
        ],
        "description": "Premium dehydrated potato flakes flakes dried to preserve color intensity and cellular texture for quick gourmet meals.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Double corrugated boxes with heat-sealed liners",
          "purity": "Moisture < 5% guaranteed, zero dust",
          "grade": "Gourmet Flake Cut (10-12mm)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fl-tomato",
        "name": "Tomato Flakes",
        "category": "Flakes Category",
        "images": [
          IMAGES.exportProducts.tomatoFlakes
        ],
        "description": "Premium dehydrated tomato flakes flakes dried to preserve color intensity and cellular texture for quick gourmet meals.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Double corrugated boxes with heat-sealed liners",
          "purity": "Moisture < 5% guaranteed, zero dust",
          "grade": "Gourmet Flake Cut (10-12mm)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fl-beetroot",
        "name": "Beetroot Flakes",
        "category": "Flakes Category",
        "images": [
          IMAGES.exportProducts.dehydratedBeetroot
        ],
        "description": "Premium dehydrated beetroot flakes flakes dried to preserve color intensity and cellular texture for quick gourmet meals.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Double corrugated boxes with heat-sealed liners",
          "purity": "Moisture < 5% guaranteed, zero dust",
          "grade": "Gourmet Flake Cut (10-12mm)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fl-carrot",
        "name": "Carrot Flakes",
        "category": "Flakes Category",
        "images": [
          IMAGES.exportProducts.dehydratedCarrot
        ],
        "description": "Premium dehydrated carrot flakes flakes dried to preserve color intensity and cellular texture for quick gourmet meals.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Double corrugated boxes with heat-sealed liners",
          "purity": "Moisture < 5% guaranteed, zero dust",
          "grade": "Gourmet Flake Cut (10-12mm)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fl-spinach",
        "name": "Spinach Flakes",
        "category": "Flakes Category",
        "images": [
          IMAGES.exportProducts.dehydratedSpinach
        ],
        "description": "Premium dehydrated spinach flakes flakes dried to preserve color intensity and cellular texture for quick gourmet meals.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Double corrugated boxes with heat-sealed liners",
          "purity": "Moisture < 5% guaranteed, zero dust",
          "grade": "Gourmet Flake Cut (10-12mm)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "fl-mixedveg",
        "name": "Mixed Vegetable Flakes",
        "category": "Flakes Category",
        "images": [
          IMAGES.exportProducts.mixedVegFlakes
        ],
        "description": "Premium dehydrated mixed vegetable flakes flakes dried to preserve color intensity and cellular texture for quick gourmet meals.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Double corrugated boxes with heat-sealed liners",
          "purity": "Moisture < 5% guaranteed, zero dust",
          "grade": "Gourmet Flake Cut (10-12mm)",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      }
    ]
  }
];
