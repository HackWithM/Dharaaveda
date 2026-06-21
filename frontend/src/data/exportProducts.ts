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
        "description": "Vibrant golden-yellow turmeric powder ground from choice Erode rhizomes, offering high active curcumin levels suitable for B2B pharmaceutical and gourmet use.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Erode & Salem Estates, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "Curcumin > 5% Certified, Pure",
          "grade": "A++ High-Curcumin Gold",
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
        "description": "Traditional whole and ground coriander powder processed under low temperature milling to protect aromatic fractions.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Kerala Spice Belt, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "100% Pure, Heavy-Metal Free",
          "grade": "Premium Export Quality",
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
        "description": "Traditional whole and ground cumin powder processed under low temperature milling to protect aromatic fractions.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Kerala Spice Belt, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "100% Pure, Heavy-Metal Free",
          "grade": "Premium Export Quality",
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
        "description": "Grade-1 whole black pepper berries harvested from historic Malabar slopes, delivering intense piperine heat and a complex woody aroma.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Wayanad Highland Forests, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "Moisture < 11.5% Certified",
          "grade": "Tellicherry Extra Bold (TGSEB)",
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
        "description": "Plump, premium green cardamom pods displaying beautiful natural emerald shells and high essential seed-oil levels.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Cardamom Hills, Kerala, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "Free from artificial polishers",
          "grade": "Bold Premium Extra Emerald (8mm+)",
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
        "description": "Whole brown cloves dried to optimal moisture levels to preserve aromatic eugenol compounds.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Nilgiris Belt, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "100% Pure, Heavy-Metal Free",
          "grade": "Hand selected prime whole cloves",
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
        "description": "Traditional whole and ground nutmeg processed under low temperature milling to protect aromatic fractions.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Kerala Spice Belt, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "100% Pure, Heavy-Metal Free",
          "grade": "Premium Export Quality",
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
        "description": "Traditional whole and ground star anise processed under low temperature milling to protect aromatic fractions.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Kerala Spice Belt, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "100% Pure, Heavy-Metal Free",
          "grade": "Premium Export Quality",
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
        "description": "Traditional whole and ground fennel seeds processed under low temperature milling to protect aromatic fractions.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Kerala Spice Belt, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "100% Pure, Heavy-Metal Free",
          "grade": "Premium Export Quality",
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
        "description": "Traditional whole and ground mustard seeds processed under low temperature milling to protect aromatic fractions.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Kerala Spice Belt, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "100% Pure, Heavy-Metal Free",
          "grade": "Premium Export Quality",
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
        "description": "Traditional whole and ground bay leaves processed under low temperature milling to protect aromatic fractions.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Kerala Spice Belt, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "100% Pure, Heavy-Metal Free",
          "grade": "Premium Export Quality",
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
        "description": "Traditional whole and ground garam masala processed under low temperature milling to protect aromatic fractions.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Kerala Spice Belt, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "100% Pure, Heavy-Metal Free",
          "grade": "Premium Export Quality",
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
        "description": "Traditional whole and ground mixed spice blends processed under low temperature milling to protect aromatic fractions.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Kerala Spice Belt, India",
          "packaging": "Multi-layer Kraft Paper Bags (25 kg)",
          "purity": "100% Pure, Heavy-Metal Free",
          "grade": "Premium Export Quality",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      }
    ]
  },
  {
    "id": "veg_powders",
    "title": "Dehydrated Vegetable Powders",
    "description": "Fine agricultural vegetable powders dehydrated at low temperatures to lock in bioactive nutrients, colors, and intense flavors.",
    "image": IMAGES.exportCategories.vegPowders,
    "products": [
      {
        "id": "vp-beetroot",
        "name": "Beetroot Powder",
        "category": "Dehydrated Vegetable Powders",
        "images": [
          IMAGES.exportProducts.beetrootPowder
        ],
        "description": "Rich crimson beetroot powder retaining high natural betalains, nitrates, and dietary fibers for health blends.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Vedic Plains, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
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
        "description": "High-purity dehydrated potato powder ground to micro-mesh standards for quick solubility and flavor dispersion.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
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
        "description": "Concentrated garlic powder milled from aromatic bulbs, delivering robust allicin flavor and dispersibility.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Madhya Pradesh, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
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
        "description": "Fine ginger root powder packing potent gingerol warmth, widely utilized in confectionery and herbal tea blending.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Northeast Hills, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
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
        "description": "Dehydrated white/red onion powder bringing quick savory onion sweetness and zest to food mixes.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Nashik Region, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
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
        "description": "Fine green powder dried from high-grade spinach leaves, locking in dietary iron and natural chlorophyll color.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Himalayan Foothills, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
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
        "description": "High-purity dehydrated carrot powder ground to micro-mesh standards for quick solubility and flavor dispersion.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
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
        "description": "High-purity dehydrated cabbage powder ground to micro-mesh standards for quick solubility and flavor dispersion.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
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
        "description": "Nutritive moringa pod and leaf powder processed in cleanrooms to maintain extreme vitamin and antioxidant counts.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Latur Valley, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
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
        "description": "High-purity dehydrated green chilli powder ground to micro-mesh standards for quick solubility and flavor dispersion.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
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
        "description": "High-purity dehydrated coriander leaf powder ground to micro-mesh standards for quick solubility and flavor dispersion.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Laminated moisture-proof drums (20kg)",
          "purity": "100% Pure Dehydrated Vegetable, No Additives",
          "grade": "Premium Spray-Dried / Low-Temp Milled",
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
    "description": "Premium spray-dried and low-temp dehydrated fruit powders capturing the pure sweetness, vitamins, and tang of fresh orchards.",
    "image": IMAGES.exportCategories.fruitPowders,
    "products": [
      {
        "id": "fp-banana",
        "name": "Banana Powder",
        "category": "Dehydrated Fruit Powders",
        "images": [
          IMAGES.exportProducts.bananaPowder
        ],
        "description": "Dehydrated green banana powder rich in resistant starches, utilized in healthy gluten-free flour formulations.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Wayanad Highlands, India",
          "packaging": "Aluminum vacuum foil inserts in master cartons",
          "purity": "Spray-Dried from 100% Organic Fruit Pulp",
          "grade": "Food & Beverage Grade A",
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
        "description": "Spray-dried Kesar and Alphonso mango pulp powder, preserving authentic tropical flavor, golden color, and natural sugars.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Ratnagiri Orchards, India",
          "packaging": "Aluminum vacuum foil inserts in master cartons",
          "purity": "Spray-Dried from 100% Organic Fruit Pulp",
          "grade": "Food & Beverage Grade A",
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
        "description": "Spray-dried premium fruit juice powder of guava powder, capturing natural aroma and visual hues for gourmet mixers and baking.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Aluminum vacuum foil inserts in master cartons",
          "purity": "Spray-Dried from 100% Organic Fruit Pulp",
          "grade": "Food & Beverage Grade A",
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
        "description": "Antioxidant-rich pomegranate juice powder spray-dried to retain high brix and beautiful pink-red coloring.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Deccan Plateau, India",
          "packaging": "Aluminum vacuum foil inserts in master cartons",
          "purity": "Spray-Dried from 100% Organic Fruit Pulp",
          "grade": "Food & Beverage Grade A",
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
        "description": "Spray-dried premium fruit juice powder of pineapple powder, capturing natural aroma and visual hues for gourmet mixers and baking.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Aluminum vacuum foil inserts in master cartons",
          "purity": "Spray-Dried from 100% Organic Fruit Pulp",
          "grade": "Food & Beverage Grade A",
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
        "description": "Spray-dried premium fruit juice powder of papaya powder, capturing natural aroma and visual hues for gourmet mixers and baking.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Aluminum vacuum foil inserts in master cartons",
          "purity": "Spray-Dried from 100% Organic Fruit Pulp",
          "grade": "Food & Beverage Grade A",
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
        "description": "Spray-dried premium fruit juice powder of apple powder, capturing natural aroma and visual hues for gourmet mixers and baking.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Aluminum vacuum foil inserts in master cartons",
          "purity": "Spray-Dried from 100% Organic Fruit Pulp",
          "grade": "Food & Beverage Grade A",
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
        "description": "Spray-dried premium fruit juice powder of orange powder, capturing natural aroma and visual hues for gourmet mixers and baking.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Aluminum vacuum foil inserts in master cartons",
          "purity": "Spray-Dried from 100% Organic Fruit Pulp",
          "grade": "Food & Beverage Grade A",
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
        "description": "Spray-dried premium fruit juice powder of lemon powder, capturing natural aroma and visual hues for gourmet mixers and baking.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Aluminum vacuum foil inserts in master cartons",
          "purity": "Spray-Dried from 100% Organic Fruit Pulp",
          "grade": "Food & Beverage Grade A",
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
        "description": "Spray-dried premium fruit juice powder of strawberry powder, capturing natural aroma and visual hues for gourmet mixers and baking.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Maharashtra, India",
          "packaging": "Aluminum vacuum foil inserts in master cartons",
          "purity": "Spray-Dried from 100% Organic Fruit Pulp",
          "grade": "Food & Beverage Grade A",
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
        "description": "Dehydrated Indian gooseberry (Amla) powder offering exceptional Vitamin C levels, highly suitable for dietary supplements.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Gujarat Orchards, India",
          "packaging": "Aluminum vacuum foil inserts in master cartons",
          "purity": "100% Pure Amla, high Vitamin C",
          "grade": "Nutraceutical Standard",
          "minOrder": "500 Kilograms"
        },
        "createdAt": "2026-05-31"
      }
    ]
  },
  {
    "id": "moringa",
    "title": "Moringa Products",
    "description": "Pure botanical Moringa oleifera leaves, powders, teas, and extracts sourced from pesticide-free high-yield cultivation.",
    "image": IMAGES.exportCategories.moringa,
    "products": [
      {
        "id": "m-powder",
        "name": "Moringa Powder",
        "category": "Moringa Products",
        "images": [
          IMAGES.exportProducts.moringaPowder
        ],
        "description": "Finely milled raw leaf powder from organically grown Moringa oleifera trees, boasting rich protein, iron, and multivitamin indexes.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Latur Organic Farms, India",
          "packaging": "Vacuum sealed UV barrier bags (20 kg)",
          "purity": "USDA & APEDA Organic Certified",
          "grade": "AAA+ Raw Leaf / Concentrated Standard",
          "minOrder": "200 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "m-leaves",
        "name": "Moringa Leaves",
        "category": "Moringa Products",
        "images": [
          IMAGES.exportProducts.moringaLeaves
        ],
        "description": "Shadow-dried, whole moringa leaves systematically cleaned of stems and organic residue, keeping vital chlorophyll intact.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Latur Organic Farms, India",
          "packaging": "Double poly-lined woven sacks (15 kg)",
          "purity": "USDA & APEDA Organic Certified",
          "grade": "AAA+ Raw Leaf / Concentrated Standard",
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
        "description": "Premium cut moringa leaves blended with aromatic herbs to create a high-antioxidant, caffeine-free daily wellness infusion.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Latur Organic Farms, India",
          "packaging": "Customized filter tea bags in composite tins",
          "purity": "USDA & APEDA Organic Certified",
          "grade": "AAA+ Raw Leaf / Concentrated Standard",
          "minOrder": "200 Kilograms"
        },
        "createdAt": "2026-05-31"
      },
      {
        "id": "m-extract",
        "name": "Moringa Extract",
        "category": "Moringa Products",
        "images": [
          IMAGES.exportProducts.moringaExtract
        ],
        "description": "High-potency bioactive moringa leaf extract standardized for total flavonoids and saponin ratios, for clinical use.",
        "pricing": "Contact Trade Desk",
        "specifications": {
          "origin": "Latur Organic Farms, India",
          "packaging": "Food-grade HDPE canisters",
          "purity": "USDA & APEDA Organic Certified",
          "grade": "AAA+ Raw Leaf / Concentrated Standard",
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
