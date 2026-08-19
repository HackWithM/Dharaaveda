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
    navbarLogo: "/images/logo/logo.webp",
    navbarLogoSvg: "/images/logo/logo.svg",
    navbarLogoPng: "/images/logo/logo.png",
    /** Logo shown in the Footer */
    footerLogo: "/images/logo/logo.webp",
    footerLogoSvg: "/images/logo/logo.svg",
    footerLogoPng: "/images/logo/logo.png",
  },

  // ----------------------------------------------------------
  // HOME PAGE
  // ----------------------------------------------------------
  home: {
    /** Full-width hero background on the Home landing section */
    heroBg: "/images/home.png",
    /** Background image for the Export showcase card on Home */
    exportCardBg: "/images/backgrounds/export-trade-showcase.webp",
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
    cargoShipAbout: "/images/backgrounds/export-logistics-cargo.webp",
    /** Fallback / placeholder image when no product image is available */
    productFallback: "/images/products/spices-catalog-fallback.webp",
  },

  // ----------------------------------------------------------
  // EXPORT PRODUCT CATEGORIES
  // (category-level banner images — one key per category)
  // ----------------------------------------------------------
  exportCategories: {
    /** Banner for the Spices & Seasonings category */
    spices: "/images/products/asset-5-68747470.webp",
    /** Banner for the Dehydrated Vegetable Powders category */
    vegPowders: "/images/products/asset-6-68747470.webp",
    /** Banner for the Dehydrated Fruit Powders category */
    fruitPowders: "/images/products/asset-7-68747470.webp",
    /** Banner for the Moringa Products category */
    moringa: "https://ik.imagekit.io/pon54xoks/moringa-leaves-extract%20(2).jpg",
    /** Banner for the Seeds category */
    seeds: "/images/products/asset-8-68747470.webp",
    /** Banner for the Dehydrated Vegetables category */
    dehydratedVeg: "https://media.licdn.com/dms/image/v2/D4D12AQENQ2jHukVtDQ/article-cover_image-shrink_720_1280/B4DZZ1bHwIGcAI-/0/1745726767556?e=2147483647&v=beta&t=sdRa0ldWyYCjxbWvIGXgZx1ilfX1Qci4s__mxct-Dww",
    /** Banner for the Dehydrated Fruits category */
    dehydratedFruits: "/images/products/asset-9-68747470.webp",
    /** Banner for the Flakes category */
    flakes: flakesCategoryImage,
  },

  // ----------------------------------------------------------
  // EXPORT PRODUCT IMAGES
  // (individual product photos — one key per product)
  // ----------------------------------------------------------
  exportProducts: {
    // Spices
    turmericPowder: "/images/products/turmeric-extract.webp",
    redChilliPowder: "/images/products/red-chilli-powder.webp",
    corianderPowder: "/images/products/coriander-leaf-powder.webp",
    cuminPowder: "/images/products/asset-13-68747470.webp",
    blackPepper: "/images/products/asset-14-68747470.webp",
    cardamom: "/images/products/asset-15-68747470.webp",
    cloves: "/images/products/asset-16-68747470.webp",
    cinnamon: "/images/products/asset-17-68747470.webp",
    nutmeg: "/images/products/asset-18-68747470.webp",
    starAnise: "/images/products/asset-19-68747470.webp",
    fennelSeeds: "/images/products/asset-20-68747470.webp",
    mustardSeeds: "/images/products/mustard-seeds.webp",
    bayLeaves: "/images/products/asset-22-68747470.webp",
    garamMasala: "/images/products/asset-23-68747470.webp",
    mixedSpiceBlends: "/images/products/asset-24-68747470.webp",
    kalaMasala: "/images/products/kala-masala.webp",
    // Dehydrated Vegetable Powders
    beetrootPowder: "/images/products/dehydrated-beetroot-flakes.webp",
    tomatoPowder: "/images/products/dehydrated-tomato-flakes.webp",
    potatoPowder: "/images/products/dehydrated-potato-flakes.webp",
    garlicPowder: "/images/products/asset-28-68747470.webp",
    gingerPowder: "/images/products/dehydrated-ginger-slice.webp",
    onionPowder: "/images/products/asset-30-68747470.webp",
    spinachPowder: "/images/products/dehydrated-spinach-flakes.webp",
    carrotPowder: "/images/products/asset-32-68747470.webp",
    cabbagePowder: "/images/products/cabbage-powder.webp",
    moringaPowderVeg: "/images/products/moringa-leaf-powder.webp",
    greenChilliPowder: "/images/products/green-chilli-powder.webp",
    corianderLeafPowder: "/images/products/coriander-leaf-powder.webp",
    mintPowder: "/images/products/mint-leaf-powder.webp",
    // Dehydrated Fruit Powders
    bananaPowder: "/images/products/raw-banana-powder.webp",
    mangoPowder: "/images/products/amchur-mango-powder.webp",
    guavaPowder: "/images/products/white-guava-powder.webp",
    pomegranatePowder: "/images/products/pomegranate-powder.webp",
    pineapplePowder: "/images/products/pineapple-powder.webp",
    papayaPowder: "/images/products/papaya-powder.webp",
    applePowder: "/images/products/asset-44-68747470.webp",
    orangePowder: "/images/products/orange-peel-powder.webp",
    lemonPowder: "/images/products/lemon-powder.webp",
    strawberryPowder: "/images/products/strawberry-powder.webp",
    amlaPowder: "/images/products/amla-fruit-powder.webp",
    // Moringa Products
    moringaPowder: "/images/products/moringa-leaf-powder.webp",
    moringaLeaves: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNwNsgi7f-TOPNkw9sGyb1BBuyrcNuEuNt7Q&s",
    moringaTea: "/images/products/asset-50-68747470.webp",
    moringaExtract: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwE68zDlJyiPMGoSfcK1NgmjHHLXavgznxow&s",
    moringaSeeds: "/images/products/moringa-seeds.webp",
    moringaSeedOil: "/images/products/moringa-seed-oil.webp",
    // Seeds
    flaxSeeds: "/images/products/asset-51-68747470.webp",
    pumpkinSeeds: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU0jfiE947AYh41zRqzeFE56IGIiVcS3Uxtg&s",
    sesameSeeds: "/images/products/hulled-sesame-seeds.webp",
    sunflowerSeeds: "/images/products/sunflower-seeds.webp",
    chiaSeeds: "/images/products/chia-seeds.webp",
    watermelonSeeds: "/images/products/watermelon-seeds.webp",
    basilSeeds: "/images/products/asset-56-68747470.webp",
    // Dehydrated Vegetables (slices)
    dehydratedOnion: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxFpkbyQpRHFY44eeSLh2DTkRn-gx342YY8Q&s",
    dehydratedGarlic: "/images/products/asset-57-68747470.webp",
    dehydratedGinger: "/images/products/dehydrated-ginger-slice.webp",
    dehydratedTomato: "/images/products/asset-59-68747470.webp",
    dehydratedCarrot: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-xTuIutf98gvaOSivzEASla1l84IV7ZGTSw&s",
    dehydratedBeetroot: "/images/products/dehydrated-beetroot-flakes.webp",
    dehydratedSpinach: "/images/products/dehydrated-spinach-flakes.webp",
    dehydratedCabbage: "/images/products/dehydrated-cabbage-flakes.webp",
    // Dehydrated Fruits (slices)
    bananaSlices: "/images/products/dehydrated-banana-slices.webp",
    mangoSlices: "/images/products/asset-64-68747470.webp",
    pineappleSlices: "/images/products/asset-65-68747470.webp",
    appleSlices: "/images/products/asset-66-68747470.webp",
    papayaSlices: "/images/products/asset-67-68747470.webp",
    strawberrySlices: "/images/products/asset-68-68747470.webp",
    guavaSlices: "/images/products/dehydrated-guava-slices.webp",
    // Flakes
    onionFlakes: "/images/products/asset-70-68747470.webp",
    garlicFlakes: "/images/products/dehydrated-garlic-flakes.webp",
    potatoFlakes: "/images/products/dehydrated-potato-flakes.webp",
    tomatoFlakes: "/images/products/dehydrated-tomato-flakes.webp",
    beetrootFlakes: "/images/products/asset-70-68747470.webp",
    carrotFlakes: "/images/products/asset-70-68747470.webp",
    spinachFlakes: "/images/products/asset-70-68747470.webp",
    mixedVegFlakes: "/images/products/dehydrated-mix-vegetables.webp",
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
    whatsappReview1: "/images/testimonials/client-review-wellness-1.webp",
    /** Screenshot or image from an Instagram review */
    instagramReview1: "/images/testimonials/client-review-wellness-2.webp",
    /** Generic review placeholder image */
    generalReview: "/images/testimonials/client-review-soundwave.webp",
  },

  // ----------------------------------------------------------
  // AVATARS (used in booking form and testimonials)
  // ----------------------------------------------------------
  avatars: {
    /** Lotus avatar option for user profile selection */
    lotus: "/images/therapy/sanctuary-lotus-atmosphere.webp",
    /** Retreat avatar option for user profile selection */
    retreat: "/images/therapy/sanctuary-meditation-retreat.webp",
    /** Yogi avatar option for user profile selection */
    yogi: "/images/testimonials/client-avatar-default.webp",
    /** Pilgrim avatar option for user profile selection */
    pilgrim: "/images/testimonials/client-avatar-male.webp",
    /** Default fallback avatar for testimonials/team without a custom photo */
    defaultTestimonial: "/images/testimonials/client-avatar-default.webp",
  },

  // ----------------------------------------------------------
  // ADMIN DASHBOARD
  // ----------------------------------------------------------
  admin: {
    /** Fallback for new export product when no image URL is provided */
    newProductFallback: "/images/products/spices-catalog-fallback.webp",
    /** Fallback for new service/session when no image URL is provided */
    newServiceFallback: "/images/therapy/sanctuary-meditation-retreat.webp?fm=webp&fit=crop&q=80&w=800",
    /** Fallback for new team member when no image URL is provided */
    newTeamMemberFallback: "/images/testimonials/client-avatar-default.webp?fm=webp&fit=crop&q=80&w=800",
    /** Fallback for team member display row in admin testimonials table */
    teamMemberRowFallback: "/images/testimonials/client-avatar-default.webp",
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
