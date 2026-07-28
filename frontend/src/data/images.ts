import flakesCategoryImage from "../assets/images/manually/flakes-category.jpg";

// ============================================================
// DHARAAVEDA — CENTRALIZED IMAGE CONFIGURATION
// ============================================================
// This is the SINGLE source of truth for ALL images in the app.
// To change any image, update its URL here.
// Each key is unique — even if two usages share the same photo
// initially, they have separate keys so they can be changed independently.
// ============================================================

export const IMAGES = {

  // ----------------------------------------------------------
  // BRANDING
  // ----------------------------------------------------------
  branding: {
    /** Main logo displayed in the Navbar */
    navbarLogo: "/images/logo/logo.png",
    /** Logo shown in the Footer */
    footerLogo: "/images/logo/logo.png",
  },

  // ----------------------------------------------------------
  // HOME PAGE
  // ----------------------------------------------------------
  home: {
    /** Full-width hero background on the Home landing section */
    heroBg: "/images/home.png",
    /** Background image for the Export showcase card on Home */
    exportCardBg: "https://knnindia.co.in/uploads/newsfiles/INDIAN-EXPORTS-25-5-2026.jpg",
    /** Background image for the Therapy showcase card on Home */
    therapyCardBg: "/images/therapy/bachFlowerService.webp",
  },

  // ----------------------------------------------------------
  // EXPORT PAGE
  // ----------------------------------------------------------
  export: {
    /** Full-width hero background on the Export page */
    heroBg: "/images/export/heroBg.jpg",
    /** Cargo ship image used in the Export page about section */
    cargoShipAbout: "https://media.istockphoto.com/id/2123124996/photo/low-angle-aerial-shot-of-cranes-looming-over-container-ship.jpg?s=612x612&w=0&k=20&c=ple5acFVT_AT1SCZCbkXT0ZEXLMQ-3dFTCGRisGSYVA=",
    /** Fallback / placeholder image when no product image is available */
    productFallback: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?fm=webp&fit=crop&q=80&w=800",
  },

  // ----------------------------------------------------------
  // EXPORT PRODUCT CATEGORIES
  // (category-level banner images — one key per category)
  // ----------------------------------------------------------
  exportCategories: {
    /** Banner for the Spices & Seasonings category */
    spices: "https://info.ehl.edu/hubfs/1440/1440x960-spices.jpg",
    /** Banner for the Dehydrated Vegetable Powders category */
    vegPowders: "https://proficiencytesting.in/wp-content/uploads/2023/08/18-e1693220803501.jpg",
    /** Banner for the Dehydrated Fruit Powders category */
    fruitPowders: "https://www.meviveinternational.com/data/storage/app/images/category/spray-dried-fruit-powders-8976.webp",
    /** Banner for the Moringa Products category */
    moringa: "https://ik.imagekit.io/pon54xoks/moringa-leaves-extract%20(2).jpg",
    /** Banner for the Seeds category */
    seeds: "https://www.taropumps.com/media/2366/1_edit.jpg",
    /** Banner for the Dehydrated Vegetables category */
    dehydratedVeg: "https://media.licdn.com/dms/image/v2/D4D12AQENQ2jHukVtDQ/article-cover_image-shrink_720_1280/B4DZZ1bHwIGcAI-/0/1745726767556?e=2147483647&v=beta&t=sdRa0ldWyYCjxbWvIGXgZx1ilfX1Qci4s__mxct-Dww",
    /** Banner for the Dehydrated Fruits category */
    dehydratedFruits: "https://www.mevabite.com/cdn/shop/articles/Is-it-better-to-eat-fresh-or-dried-fruits_053668dd-1ef8-4273-9f5d-e0ea80b1d48a.webp?v=1721815055",
    /** Banner for the Flakes category */
    flakes: flakesCategoryImage,
  },

  // ----------------------------------------------------------
  // EXPORT PRODUCT IMAGES
  // (individual product photos — one key per product)
  // ----------------------------------------------------------
  exportProducts: {
    // Spices
    turmericPowder: "https://rubflex.com/wp-content/uploads/2022/10/TURMERIC-Slides-V3_2-1-1.jpg",
    redChilliPowder: "https://www.neonaturalindustries.com/wp-content/uploads/2022/06/red-chillies.jpg",
    corianderPowder: "https://tiimg.tistatic.com/fp/1/009/713/coriander-powder-019.jpg",
    cuminPowder: "https://vibrantliving.in/cdn/shop/files/Cumin_543f69f0-f80b-42e7-b0c6-a45ee4d535b4.png?v=1731059986&width=2048",
    blackPepper: "https://d3kgrlupo77sg7.cloudfront.net/media/chococoorgspice.com/images/products/medium/black-pepper-powder-coorg-spices.20260315024227.webp",
    cardamom: "https://cdn.shopify.com/s/files/1/0437/8953/files/Queen_of_spices_origin_seeds_pods.png?v=1642723399",
    cloves: "https://sandigeatdoors.com/wp-content/uploads/2022/12/Cloves-Sandige-At-Doors.png",
    cinnamon: "https://www.stylecraze.com/wp-content/uploads/2013/04/Cinnamon-10-Potent-Health-Benefits-The-Best-Type-Of-Cinnamon_1200px.jpg.webp",
    nutmeg: "https://cdn.britannica.com/77/170777-050-3A754B3D/Nutmeg-seeds-ground-spice.jpg",
    starAnise: "https://cdn.shopify.com/s/files/1/0686/4283/2583/files/star_anise_article_hero_copy.webp?v=1745522159",
    fennelSeeds: "https://cdn11.bigcommerce.com/s-7gw5qujusi/images/stencil/1280x1280/products/356/1391/102441__57402.1719401293.jpg?c=1",
    mustardSeeds: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?fm=webp&fit=crop&q=80&w=800",
    bayLeaves: "https://sygsan.com/wp-content/uploads/2024/09/bayle.jpeg",
    garamMasala: "https://keralaspicecart.com/wp-content/uploads/2020/10/kerala-spice-cart-garam-masala.jpg",
    mixedSpiceBlends: "https://d1wv6w1iq7btjo.cloudfront.net/mm/2021/10/niQ4ze9XZwfAibEawspGLBtvAistockphoto-1297420369-170667a.jpg",
    // Dehydrated Vegetable Powders
    beetrootPowder: "https://www.spicebloom.co.nz/cdn/shop/articles/creative-ways-to-use-beetroot-powder-in-nz-cooking-baking-382330.png?v=1750196405",
    tomatoPowder: "https://dailyfarmer.in/cdn/shop/articles/SEOon_tomato-powder-1.webp?v=1758522019",
    potatoPowder: "https://5.imimg.com/data5/SELLER/Default/2025/4/503173940/OW/MU/WF/157799058/dehydrated-potato-powder.jpg",
    garlicPowder: "https://www.kisaantrade.com/public/uploads/all/BgZKnepaWalga3yYOMjqZIq81em3pmfNQKKiWTGr.webp",
    gingerPowder: "https://pikpure.in/wp-content/uploads/2023/05/organic-ginger-root-powder.jpg",
    onionPowder: "https://m.media-amazon.com/images/I/61aFPnRZOtL._AC_UF350,350_QL80_.jpg",
    spinachPowder: "https://5.imimg.com/data5/SELLER/Default/2025/7/525270821/FG/JC/LQ/13151738/spinach-powder-500x500.jpeg",
    carrotPowder: "https://5.imimg.com/data5/SELLER/Default/2024/10/461205666/HK/YG/GG/121743691/spray-dried-carrot-powder-500x500.jpg",
    cabbagePowder: "https://5.imimg.com/data5/SELLER/Default/2024/12/470678328/KQ/XA/YW/133006965/cabbage-powder.png",
    moringaPowderVeg: "https://5.imimg.com/data5/SELLER/Default/2025/10/553278943/HH/ES/IP/233295527/drumstick-powder-moringa.png",
    greenChilliPowder: "https://foodcare.in/cdn/shop/files/Green-Chilli-Powder.jpg?v=1768271643&width=1445",
    corianderLeafPowder: "https://foodcare.in/cdn/shop/files/coriander-leaf-powder.png?v=1780550221",
    mintPowder: "https://fzyezy.com/cdn/shop/files/Freeze-Dried-Mint-Powder-1.jpg?v=1725118967",
    // Dehydrated Fruit Powders
    bananaPowder: "https://5.imimg.com/data5/SELLER/Default/2025/12/566787036/ZR/FJ/RJ/227106443/banana-powder.jpg",
    mangoPowder: "https://5.imimg.com/data5/SELLER/Default/2025/4/503570585/ON/JX/FX/157512010/organic-mango-powder-500x500.jpg",
    guavaPowder: "https://fzyezy.com/cdn/shop/files/Freeze-Dried-White-Guava-Powder-1.jpg?v=1725119160",
    pomegranatePowder: "https://5.imimg.com/data5/SELLER/Default/2023/10/353032586/GF/HT/PN/75214588/high-quality-pomegranate-powder.jpg",
    pineapplePowder: "https://cpimg.tistatic.com/12551838/b/4/Pineapple-Powder.jpeg",
    papayaPowder: "https://5.imimg.com/data5/SELLER/Default/2025/2/488383816/VB/EZ/GZ/234972051/papaya-powder-500x500.jpg",
    applePowder: "https://nankatrathu.in/cdn/shop/files/WhatsApp-Image-2025-10-19-at-17.46.16-1.jpg?v=1775903916",
    orangePowder: "https://5.imimg.com/data5/SELLER/Default/2024/11/463894282/EV/TV/SX/51611984/orange-powder-500x500.jpg",
    lemonPowder: "https://cpimg.tistatic.com/08182994/b/4/Organic-Lemon-Powder.jpg",
    strawberryPowder: "https://fzyezy.com/cdn/shop/files/Freeze-Dried-Strawberry-Powder-1.jpg?v=1725119108",
    amlaPowder: "https://www.gomataseva.org/wp-content/uploads/2026/01/Amla-Powder.webp",
    // Moringa Products
    moringaPowder: "https://satviya.com/cdn/shop/articles/Moringa_powder.jpg?v=1757315523&width=1920",
    moringaLeaves: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNwNsgi7f-TOPNkw9sGyb1BBuyrcNuEuNt7Q&s",
    moringaTea: "https://t4.ftcdn.net/jpg/15/14/92/79/360_F_1514927911_kvgtHqQfB8ZvVXxapVAHPBm1AiGFhtkE.jpg",
    moringaExtract: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwE68zDlJyiPMGoSfcK1NgmjHHLXavgznxow&s",
    // Seeds
    flaxSeeds: "https://m.media-amazon.com/images/I/718Ez2dYkPL._AC_UF350,350_QL80_.jpg",
    pumpkinSeeds: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU0jfiE947AYh41zRqzeFE56IGIiVcS3Uxtg&s",
    sesameSeeds: "https://krishnaindia.in/wp-content/uploads/2025/07/Hulled-Sesame-Seed-99.98-Non-EU-Grade.jpg",
    sunflowerSeeds: "https://cdn.shopify.com/s/files/1/1740/1449/files/RG-Sunflower-4.jpg?v=1631119406",
    chiaSeeds: "https://www.drweil.com/wp-content/uploads/2018/05/Can-Chia-Help-With-Weight-Loss_-531657339-600x450.jpg",
    watermelonSeeds: "https://cdn.shopify.com/s/files/1/0548/8230/4247/files/Are_Watermelon_Seeds_Healthy_to_Eat.jpg?v=1641795437",
    basilSeeds: "https://www.darwin-nutrition.fr/wp-content/uploads/2020/06/AdobeStock_353791440.jpeg",
    // Dehydrated Vegetables (slices)
    dehydratedOnion: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxFpkbyQpRHFY44eeSLh2DTkRn-gx342YY8Q&s",
    dehydratedGarlic: "https://m.media-amazon.com/images/I/41iIR+LL3UL._AC_UF894,1000_QL80_.jpg",
    dehydratedGinger: "https://tiimg.tistatic.com/fp/1/006/196/natural-brown-dehydrated-ginger-801.jpg",
    dehydratedTomato: "https://healthy-indian.com/wp-content/uploads/2021/07/IMG_8432.jpg",
    dehydratedCarrot: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-xTuIutf98gvaOSivzEASla1l84IV7ZGTSw&s",
    dehydratedBeetroot: "https://www.alphafoodie.com/wp-content/uploads/2020/08/Beetroot-Chips.jpeg",
    dehydratedSpinach: "https://www.greendna.in/cdn/shop/products/dried_palakleaves_1200x.webp?v=1677324926",
    dehydratedCabbage: "https://2.wlimg.com/product_images/bc-full/2024/8/13087015/dehydrated-cabbage-1724407934-7574544.jpeg",
    // Dehydrated Fruits (slices)
    bananaSlices: "https://tiimg.tistatic.com/fp/1/009/901/banana-slices-793.jpg",
    mangoSlices: "https://5.imimg.com/data5/ECOM/Default/2022/10/PY/EG/SW/13510045/1-d8f81a85-4048-444a-bc67-9ea1e89a68b0-500x500.png",
    pineappleSlices: "https://m.media-amazon.com/images/I/81jehZof-HL.jpg",
    appleSlices: "https://m.media-amazon.com/images/I/71VoBg3ARZL._AC_UF894,1000_QL80_.jpg",
    papayaSlices: "https://m.media-amazon.com/images/I/61i8DAqE9aL._SX679_.jpg",
    strawberrySlices: "https://m.media-amazon.com/images/I/61zDISkcigL._AC_UF894,1000_QL80_.jpg",
    guavaSlices: "https://5.imimg.com/data5/SELLER/Default/2025/7/527139174/YM/DG/BC/248203515/dehydrated-guava-slices.jpg",
    // Flakes
    onionFlakes: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?fm=webp&fit=crop&q=80&w=600",
    garlicFlakes: "https://cpimg.tistatic.com/12747559/b/5/Dehydrated-Garlic-Flakes.jpg",
    potatoFlakes: "https://5.imimg.com/data5/SELLER/Default/2025/4/506414860/XB/UR/VF/244097434/dehydrated-potato-flakes-500x500.jpeg",
    tomatoFlakes: "https://5.imimg.com/data5/SELLER/Default/2024/12/470991883/QZ/TW/NW/29994952/tomato-powder-and-flakes-500x500.jpeg",
    beetrootFlakes: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?fm=webp&fit=crop&q=80&w=600",
    carrotFlakes: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?fm=webp&fit=crop&q=80&w=600",
    spinachFlakes: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?fm=webp&fit=crop&q=80&w=600",
    mixedVegFlakes: "https://5.imimg.com/data5/SELLER/Default/2025/10/553140206/AK/ZT/HN/125266950/5-kg-dehydrated-vegetable-500x500.png",
  },

  // ----------------------------------------------------------
  // WELLNESS / THERAPY PAGE
  // ----------------------------------------------------------
  therapy: {
    /** Full-width hero background on the Wellness/Therapy page */
    heroBg: "/images/therapy/heroBg.webp",
    /** Atmosphere/mood image shown alongside the hero text */
    heroAtmosphere: "/images/therapy/heroAtmosphere.webp",
    /** Image for the Bach Flower Therapy service card */
    bachFlowerService: "/images/therapy/bachFlowerService.webp",
    /** Image for the Rekkhanoho / Reiki Therapy service card */
    rekkhanohoService: "/images/therapy/rekkhanohoService.webp",
    /** Photo of the founder / therapist (Dr. Vikranti) */
    founderPortrait: "/images/therapy/founderPortrait.webp",
    /** Location / sanctuary exterior image */
    sanctuaryLocation: "/images/therapy/sanctuaryLocation.webp",
    /** Fallback image used when a service has no image set in the CMS */
    serviceFallback: "/images/therapy/serviceFallback.webp",
  },

  // ----------------------------------------------------------
  // TESTIMONIALS / REVIEWS
  // ----------------------------------------------------------
  reviews: {
    /** Screenshot or image from a WhatsApp review */
    whatsappReview1: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fm=webp&fit=crop&q=80&w=600",
    /** Screenshot or image from an Instagram review */
    instagramReview1: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?fm=webp&fit=crop&q=80&w=600",
    /** Generic review placeholder image */
    generalReview: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?fm=webp&fit=crop&q=80&w=600",
  },

  // ----------------------------------------------------------
  // AVATARS (used in booking form and testimonials)
  // ----------------------------------------------------------
  avatars: {
    /** Lotus avatar option for user profile selection */
    lotus: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?fm=webp&fit=crop&q=80&w=150",
    /** Retreat avatar option for user profile selection */
    retreat: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?fm=webp&fit=crop&q=80&w=150",
    /** Yogi avatar option for user profile selection */
    yogi: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=webp&fit=crop&q=80&w=150",
    /** Pilgrim avatar option for user profile selection */
    pilgrim: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=webp&fit=crop&q=80&w=150",
    /** Default fallback avatar for testimonials/team without a custom photo */
    defaultTestimonial: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=webp&fit=crop&q=80&w=150",
  },

  // ----------------------------------------------------------
  // ADMIN DASHBOARD
  // ----------------------------------------------------------
  admin: {
    /** Fallback for new export product when no image URL is provided */
    newProductFallback: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?fm=webp&fit=crop&q=80&w=800",
    /** Fallback for new service/session when no image URL is provided */
    newServiceFallback: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?fm=webp&fit=crop&q=80&w=800",
    /** Fallback for new team member when no image URL is provided */
    newTeamMemberFallback: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=webp&fit=crop&q=80&w=800",
    /** Fallback for team member display row in admin testimonials table */
    teamMemberRowFallback: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=webp&fit=crop&q=80&w=150",
  },

} as const;

// Legacy shape aliases — kept for backward compatibility during transition.
// These map the old nested paths used in App.tsx and other components
// to the new canonical keys above.
export const LEGACY = {
  home: {
    heroBg: IMAGES.home.heroBg,
    exportBg: IMAGES.home.exportCardBg,
    therapyBg: IMAGES.home.therapyCardBg,
  },
  export: {
    hero: IMAGES.export.heroBg,
    cargoShip: IMAGES.export.cargoShipAbout,
    products: {
      defaultProduct: IMAGES.export.productFallback,
      dal1: IMAGES.export.productFallback,
      dal2: IMAGES.export.heroBg,
      dal3: IMAGES.exportProducts.beetrootPowder,
    },
  },
  therapy: {
    heroBg: IMAGES.therapy.heroBg,
    heroAtmosphere: IMAGES.therapy.heroAtmosphere,
    bachFlower: IMAGES.therapy.bachFlowerService,
    rekkhanoho: IMAGES.therapy.rekkhanohoService,
    founder: IMAGES.therapy.founderPortrait,
    location: IMAGES.therapy.sanctuaryLocation,
  },
  reviews: {
    whatsapp1: IMAGES.reviews.whatsappReview1,
    insta1: IMAGES.reviews.instagramReview1,
    generalReview: IMAGES.reviews.generalReview,
  },
  avatars: {
    lotus: IMAGES.avatars.lotus,
    retreat: IMAGES.avatars.retreat,
    yogi: IMAGES.avatars.yogi,
    pilgrim: IMAGES.avatars.pilgrim,
  },
} as const;
