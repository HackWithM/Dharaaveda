import { Product } from "../types";

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  products: Product[];
}

export const EXPORT_CATEGORIES: ProductCategory[] = [
  {
    id: "fruits",
    title: "Fruits",
    description: "Premium sun-ripened orchards and high-altitude tropical fruits harvested direct from organic farms.",
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?fm=webp&fit=crop&q=80&w=800",
    products: [
      {
        id: "f-banana",
        name: "Banana",
        category: "Fruits",
        images: ["https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?fm=webp&fit=crop&q=80&w=600"],
        description: "Naturally sweet Grand Naine and Cavendish bananas grown in nutrient-dense volcanic soil of Wayanad, exported in protective temperature-controlled atmospheres.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Wayanad Highlands, India",
          packaging: "Corrugated Box with Polyethylene liner",
          purity: "100% Organically Grown",
          grade: "Premium Class A",
          minOrder: "1 Metric Ton"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "f-pomegranate",
        name: "Pomegranate",
        category: "Fruits",
        images: ["https://images.unsplash.com/photo-1620127814897-40090bc1ef19?fm=webp&fit=crop&q=80&w=600"],
        description: "Juicy, deep-red Bhagwa pomegranate with soft seeds, high brix content, and rich antioxidant properties, sorted systematically via opto-electronic graders.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Deccan Plateau, India",
          packaging: "System Ventilated 4kg Cartons",
          purity: "Phytosanitary Certified",
          grade: "Export Quality Grade I",
          minOrder: "1 Metric Ton"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "f-grapes",
        name: "Grapes",
        category: "Fruits",
        images: ["https://images.unsplash.com/photo-1537640538966-79f369143f8f?fm=webp&fit=crop&q=80&w=600"],
        description: "Choice seedless green Thompson and black Sharad grapes. Crispy texture with balanced sweetness and optimum storage longevity.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Nashik Valley Soil, India",
          packaging: "Pouch Pack + Master Carton with SO2 pads",
          purity: "Zero Residue Verified",
          grade: "Extra Class Superior",
          minOrder: "2 Metric Tons"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "f-guava",
        name: "Guava",
        category: "Fruits",
        images: ["https://images.unsplash.com/photo-1534080564583-6be75777b70a?fm=webp&fit=crop&q=80&w=600"],
        description: "Vibrant pink-fleshed VNR Bihi and white-fleshed Lalit guavas known for their exceptional weight, minimal seeds, and exquisite tropical aroma.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Vedic Farming Estates, India",
          packaging: "Foam Netting & Reinforced Cartons",
          purity: "Organic Traceable",
          grade: "Premium Super",
          minOrder: "1 Metric Ton"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "f-mango",
        name: "Mango",
        category: "Fruits",
        images: ["https://images.unsplash.com/photo-1553279768-865429fa0078?fm=webp&fit=crop&q=80&w=600"],
        description: "The supreme Alphonso (Hapus) and Kesar mangoes. Prized globally for intense golden color, fiberless pulp, and rich, cream-like flavor profile.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Ratnagiri Coastal Orchards, India",
          packaging: "Vapour-Heat Treated / Gift Pack Boxed",
          purity: "APEDA Approved Phytosanitary",
          grade: "AAA Grade Prime Selection",
          minOrder: "1 Metric Ton"
        },
        createdAt: "2026-05-31"
      }
    ]
  },
  {
    id: "spices",
    title: "Spices & Seasonings",
    description: "Vedas-grade aromatics, hot spices, and complex culinary powders milled to absolute microbiological safety standards.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?fm=webp&fit=crop&q=80&w=800",
    products: [
      {
        id: "s-turmeric",
        name: "Turmeric Powder",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?fm=webp&fit=crop&q=80&w=600"],
        description: "Golden yellow powder from hand-selected Salem turmeric rhizomes. Extra-high curcumin levels (typically >5%) curated specifically for pharmaceutical applications.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Erode & Salem Estates, India",
          packaging: "Multi-layer Kraft Paper Bags (25 kg)",
          purity: "100% Pure, Heavy-Metal Free",
          grade: "A++ Premium Curcumin Gold",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-redchilli",
        name: "Red Chilli Powder",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1599307734114-19299496677f?fm=webp&fit=crop&q=80&w=600"],
        description: "Vibrant red chilli powder from whole stemless Guntur Sannam and Kashmiri chillies, presenting deep aroma and customizable SHU heat levels.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Guntur Region, India",
          packaging: "Air-locked Bags with Oxygen Absorbers",
          purity: "Aflatoxin & Sudan Dye Negative",
          grade: "Premium Single Origin",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-coriander",
        name: "Coriander Powder",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?fm=webp&fit=crop&q=80&w=600"],
        description: "Aromatic powder made of high-essential-oil coriander seeds. Adds sweet-warm, citrusy undertones to gourmet blends.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Malwa Plateau, India",
          packaging: "HDPE PP Bag with Inner LDPE Liner",
          purity: "No Added Fillers",
          grade: "Fine Mesh Pure Indian Origin",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-cumin",
        name: "Cumin Seeds",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1615485500704-8e990f9900f7?fm=webp&fit=crop&q=80&w=600"],
        description: "Bold, dust-cleaned cumin seeds (Jeera) presenting optimal content of cuminaldehyde. Provides earthy and nutty flavor signatures.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Gujarat Drylands, India",
          packaging: "Jute bags or composite paper cartons",
          purity: "99.5% Machine Cleaned (Sortex)",
          grade: "Singapore Quality High Purity",
          minOrder: "1 Metric Ton"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-blackpepper",
        name: "Black Pepper",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1508737190038-f1ab0bc032df?fm=webp&fit=crop&q=80&w=600"],
        description: "Bold Malabar Tellicherry Extra Bold Garbled pepper berries (TGSEB). Prized for its rich piperine heat and complex woodland fragrance.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Wayanad Forests, India",
          packaging: "Dual laminated poly bags (25/50 kg)",
          purity: "Moisture <11.5% Certified",
          grade: "Grade MG1 (Tellicherry Supreme)",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-cardamom",
        name: "Cardamom",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1509358271058-acd22cc93898?fm=webp&fit=crop&q=80&w=600"],
        description: "Stately 8mm+ giant green cardamom pods, meticulously dried to retain deep emerald color, sweet, highly complex resinous camphor flavor.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Cardamom Hills, Kerala, India",
          packaging: "Aluminium-foil lined master cartons",
          purity: "Free from artificial polishing agents",
          grade: "Bold Premium Extra Emerald (8mm+)",
          minOrder: "200 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-cinnamon",
        name: "Cinnamon",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1509358741195-3ca1caf097e0?fm=webp&fit=crop&q=80&w=600"],
        description: "Fragrant, hand-peeled quills of genuine Ceylon-type cinnamon. Sweet, smooth woodsy fragrance with very low coumarin levels, optimal for premium confectionery.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Western Ghats organic farms, India",
          packaging: "Hessian fiber bundles or master boxes",
          purity: "100% Authentic bark quills",
          grade: "Fine Grade Alba/C5 selection",
          minOrder: "200 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-cloves",
        name: "Cloves",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1608686207856-001b95cf60ca?fm=webp&fit=crop&q=80&w=600"],
        description: "Rich, aromatic whole cloves with high eugenol essential oil yield. Headed buds of bold shape and deep reddish-brown color.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Nilgiris Belt, India",
          packaging: "Sack liner inside carton dividers",
          purity: "Sortex Sorted, minimal stems",
          grade: "Hand selected prime cloves",
          minOrder: "200 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-fennel",
        name: "Fennel Seeds",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?fm=webp&fit=crop&q=80&w=600"],
        description: "Bold, sweet fennel seeds (Saunf) exhibiting a bright green color. Best suited for digestif infusions and artisan baking.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Rajasthan Plains, India",
          packaging: "PP bags or custom fiber sacks",
          purity: "99% Pure, sorted to color uniformity",
          grade: "Premium Bold Green",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-mustard",
        name: "Mustard Seeds",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1609137144813-2947118160fc?fm=webp&fit=crop&q=80&w=600"],
        description: "Bold black and yellow mustard seeds rich in oil content. Yields a sharp pungency for spice pastes, vinegars, and table spreads.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Indo-Gangetic Soil, India",
          packaging: "Woven multiwall craft paper boxes",
          purity: "Microbiologically Cleansed",
          grade: "Grade-A Bold Sortex",
          minOrder: "1 Metric Ton"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-garammasala",
        name: "Garam Masala",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d?fm=webp&fit=crop&q=80&w=600"],
        description: "Classic blend of toasted cardamom, cinnamon, black pepper, cloves, mace, nutmeg, and cumin. Ground cold to preserve essential volatile esters.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Royal Vedic Blend, India",
          packaging: "High-grade barrier packets in master boxes",
          purity: "100% Traditional Formulation",
          grade: "Gourmet Culinary-Grade",
          minOrder: "200 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-currypowder",
        name: "Curry Powder",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?fm=webp&fit=crop&q=80&w=600"],
        description: "International-spec Madras style curry powder blend. Perfectly balanced notes of coriander, mild chilli, fenugreek, and high-curcumin turmeric.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Madras Heritage Blend, India",
          packaging: "Multi-ply metallized moisture barrier wrapping",
          purity: "No artificial food coloring",
          grade: "Premium Export Quality",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-gingerpowder",
        name: "Ginger Powder",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1615485290263-ae5301826f63?fm=webp&fit=crop&q=80&w=600"],
        description: "Dehydrated and finely ground ginger root powder, yielding strong gingerol warmth and spicy sharpness. Highly sought by beverage and baking industries.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Northeast Hills, India",
          packaging: "Vacuum sealed foil bags (25 kg)",
          purity: "Pure Zingiber officinale root",
          grade: "Select Grade Fine",
          minOrder: "300 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-garlicpowder",
        name: "Garlic Powder",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?fm=webp&fit=crop&q=80&w=600"],
        description: "Dehydrated, fine garlic powder curated from strong local Indian garlic clones, providing powerful allicin-driven aroma and instant flavor distribution.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Madhya Pradesh Farm Belt, India",
          packaging: "Laminated moisture-proof drums",
          purity: "Additives Free, non-caking",
          grade: "A-Grade Culinary Powder",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "s-onionpowder",
        name: "Onion Flakes / Powder",
        category: "Spices & Seasonings",
        images: ["https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?fm=webp&fit=crop&q=80&w=600"],
        description: "Premium dehydrated red and white onion milled to powder. Delivers concentrated sweet, pungent onion zest immediately without moisture load.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Maharashtra Agro Belt, India",
          packaging: "Double sealed food-grade bags in carton",
          purity: "Moisture < 4.0% Standard",
          grade: "High mesh gourmet standard",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      }
    ]
  },
  {
    id: "dehydrated",
    title: "Dehydrated Products",
    description: "Premium sun-sheltered, low-temp dehydrated vegetables and therapeutic superfood plant powders with cell-retentive color and nutrients.",
    image: "https://images.unsplash.com/photo-1598514983318-291419f5b9d8?fm=webp&fit=crop&q=80&w=800",
    products: [
      {
        id: "d-onion",
        name: "Onion Flakes",
        category: "Dehydrated Products",
        images: ["https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?fm=webp&fit=crop&q=80&w=600"],
        description: "Carefully sliced and air-dehydrated premium red onions. Retains high pungency, light texture, and pristine visual flakes with long-term shelf stability.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Nashik Region, India",
          packaging: "Moisture protective food-grade drums (20kg)",
          purity: "Free from external skins / soot",
          grade: "Choice Grade AA Flakes",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "d-garlic",
        name: "Garlic Flakes",
        category: "Dehydrated Products",
        images: ["https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?fm=webp&fit=crop&q=80&w=600"],
        description: "Golden-white, low-temperature dehydrated split garlic flakes. Robust allicin content, perfect for quick reconstitution in convenience foods.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Malwa Region, India",
          packaging: "Polyethylene lined corrugated boxes",
          purity: "100% Pure Garlic Cloves, no skins",
          grade: "AAA Grade Sortex Sorted",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "d-tomato",
        name: "Tomato Powder",
        category: "Dehydrated Products",
        images: ["https://images.unsplash.com/photo-1595855759920-86582396756a?fm=webp&fit=crop&q=80&w=600"],
        description: "Rich red powder obtained by spray-drying vine-ripened organic tomatoes. Imbues instant umami depth and classic tomato tang to soups, sauces, and savory mixes.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "DharaAveda Sourced Farms, India",
          packaging: "Aluminum vacuum foil drum inserts",
          purity: "100% Natural Lycopene, no synthetics",
          grade: "Premium Spray-Dried",
          minOrder: "300 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "d-beetroot",
        name: "Beetroot Powder",
        category: "Dehydrated Products",
        images: ["https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?fm=webp&fit=crop&q=80&w=600"],
        description: "Finely ground powder of dehydrated premium red beetroots, delivering intense crimson betalain dyes alongside sweet, natural nitrate-rich profiles.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Vedic Plains, India",
          packaging: "Sealed barrier tubes or double polybags",
          purity: "Zero Artificial Pigment",
          grade: "Nutraceutical Grade",
          minOrder: "200 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "d-spinach",
        name: "Spinach Powder",
        category: "Dehydrated Products",
        images: ["https://images.unsplash.com/photo-1576045057995-568f588f82fb?fm=webp&fit=crop&q=80&w=600"],
        description: "Brilliant green powder dehydrated from iron-rich fresh spinach leaves. Highly soluble, yielding instant chlorophyll enrichment.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Himalayan Foothills, India",
          packaging: "Nitrogen flushed vacuum sacks",
          purity: "100% Pure Spinacia oleracea",
          grade: "Superfood Feed & Food Grade",
          minOrder: "200 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "d-carrot",
        name: "Carrot Powder",
        category: "Dehydrated Products",
        images: ["https://images.unsplash.com/photo-1598170845058-32b996a6bd11?fm=webp&fit=crop&q=80&w=600"],
        description: "Rich orange powder from sweet dehydrated baby carrots, showcasing high Beta-Carotene retention and gentle dietary fiber richness.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Punjab Agrarian Fields, India",
          packaging: "Moisture lock drums (20kg)",
          purity: "100% Carrot taproots, no sugars added",
          grade: "U.S. FDA Compliant Grade",
          minOrder: "300 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "d-greenchilli",
        name: "Green Chilli Flakes",
        category: "Dehydrated Products",
        images: ["https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?fm=webp&fit=crop&q=80&w=600"],
        description: "Zesty green flakes chopped from fresh capsicums and chillies, preserving clean herbal warmth, capsaicinoids, and crisp green color.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Nimar Valley, India",
          packaging: "Airtight multi-wall paper packages",
          purity: "Residue free, high purity standard",
          grade: "Premium Pungency Flakes",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "d-drumstick",
        name: "Drumstick Powder",
        category: "Dehydrated Products",
        images: ["https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?fm=webp&fit=crop&q=80&w=600"],
        description: "Drying of nutritious botanical drumstick pods. Packed with essential amino acids and micronutrients; excellent for daily health formulations.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Deccan Biofarm, India",
          packaging: "Barrier foil liners inside drums",
          purity: "100% Pure Moringa Oleifera pods",
          grade: "Gourmet Functional",
          minOrder: "200 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "d-moringa",
        name: "Moringa Powder",
        category: "Dehydrated Products",
        images: ["https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?fm=webp&fit=crop&q=80&w=600"],
        description: "Certified organically harvested, shadow-dried Miracle Tree (Moringa oleifera) leaves. Deep emerald powder loaded with vital vitamins, polyphenols, and complete proteins.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Latur Organic Valley, India",
          packaging: "Vacuum barrier packaging with dessicant packs",
          purity: "99.9% Raw Leaf powder, zero additives",
          grade: "AAA+ Premium Nutraceutical",
          minOrder: "200 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "d-curryleaves",
        name: "Curry Leaves Powder",
        category: "Dehydrated Products",
        images: ["https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?fm=webp&fit=crop&q=80&w=600"],
        description: "Made from fresh botanical curry leaves shadow-dehydrated immediately after harvest. Preserves aromatic, therapeutic terpene oils for health formulations and luxury cosmetics.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Kerala Spice Belt, India",
          packaging: "Sealed Kraft-poly liners",
          purity: "Organic Murraya koenigii species",
          grade: "Grade-1 Herbal Standard",
          minOrder: "200 Kilograms"
        },
        createdAt: "2026-05-31"
      }
    ]
  },
  {
    id: "jaggery",
    title: "Jaggery Products",
    description: "Traditional sugarcane nectars clarified utilizing organic wild-plant extracts and evaporated to crystalline rich caramels.",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?fm=webp&fit=crop&q=80&w=800",
    products: [
      {
        id: "j-powder",
        name: "Jaggery Powder",
        category: "Jaggery Products",
        images: ["https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?fm=webp&fit=crop&q=80&w=600"],
        description: "Free-flowing, non-sticky organic jaggery powder processed without chemical bleaching agents or toxic processing aids. Yields healthy mineral sweetening profiles.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Kolhapur Sugarcane Belt, India",
          packaging: "Stand-up moisture proof eco pouches",
          purity: "100% Organic, Chemical-Free Clarified",
          grade: "Premium Crystalline Level",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      },
      {
        id: "j-cubes",
        name: "Jaggery Cubes",
        category: "Jaggery Products",
        images: ["https://images.unsplash.com/photo-1587132137056-bfbf0166836e?fm=webp&fit=crop&q=80&w=600"],
        description: "Pre-measured, uniform blocks and cubes made of authentic high-purity jaggery. Dissolves cleanly, releasing deep molasses aroma.",
        pricing: "Contact Trade Desk",
        specifications: {
          origin: "Mandya Farming Belt, India",
          packaging: "Compartment-divided vacuum tray packs",
          purity: "Traditional sugarcane extraction",
          grade: "Grade-A Uniform Cubes",
          minOrder: "500 Kilograms"
        },
        createdAt: "2026-05-31"
      }
    ]
  }
];
