import React, { useState, lazy, Suspense, useCallback } from "react";
import { Search, Compass, Award, ShieldCheck, Mail, Phone, MapPin, Sparkles, ChevronRight, ScrollText } from "lucide-react";
import { motion } from "motion/react";
import { Product } from "../types";
import { IMAGES } from "../data/images";
import OptimizedImage from "../components/OptimizedImage";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";
import { EMAIL_TO, PHONE_NUMBER } from "../lib/constants";
import { useSeo } from "../lib/useSeo";

import { EXPORT_CATEGORIES, ProductCategory } from "../data/exportProducts";
import ProductCategoryCard from "../components/ProductCategoryCard";

const ProductModal = lazy(() => import("../components/ProductModal"));
const InquiryModal = lazy(() => import("../components/InquiryModal"));

export default function Export() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryModal, setSelectedCategoryModal] = useState<ProductCategory | null>(null);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<Product | null>(null);

  const { lang } = useLanguage();
  const t = staticTranslations[lang] || staticTranslations.en;
  useSeo(t.seo?.exportTitle || staticTranslations.en.seo?.exportTitle, t.seo?.exportDesc || staticTranslations.en.seo?.exportDesc);

  const handleOpenCategoryModal = useCallback((category: ProductCategory) => {
    setSelectedCategoryModal(category);
  }, []);

  const handleRequestQuote = useCallback((e: React.MouseEvent) => {
    const target = document.getElementById("booking-form-card");
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const filteredCategories = EXPORT_CATEGORIES.filter((cat) => {
    const catTrans = t.products?.categories?.[cat.id];
    const showcaseTrans = t.export?.showcaseCategories?.[cat.id];
    const resolvedTitle = catTrans?.title || showcaseTrans?.title || cat.title;
    const resolvedDesc = catTrans?.desc || showcaseTrans?.description || cat.description;
    const matchesSearch =
      resolvedTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resolvedDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.products.some((p) => {
        const pTrans = t.products?.items?.[p.id] || { name: p.name };
        return pTrans.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    return matchesSearch;
  });

  return (
    <div className="bg-white text-gray-900 min-h-screen pt-24 font-sans">
      {/* 1. HERO - INTERNATIONAL TRADE BRANDING */}
      <section className="relative py-20 px-4 overflow-hidden border-b border-gray-200 bg-gradient-to-b from-slate-50 to-white">
        {/* Absolute Background Graphics */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
        <OptimizedImage
          src={IMAGES.export.heroBg}
          alt=""
          className="absolute inset-0 w-full h-full mix-blend-overlay opacity-5 pointer-events-none"
          imgClassName="object-cover"
          priority={true}
          width={1200}
          height={600}
          aspectRatio="16/9"
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[10px] font-mono uppercase tracking-widest text-orange-600 font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.export.division || "International Trade Division"}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-gray-900 leading-tight text-left">
              {t.export.heroTitle || "Elite Crop Logistical Logistics"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl text-left">
              {t.export.heroDesc || "DharaAveda connects deep Indian botanical farms with premium global pharmacies, cosmetics houses, and food importers. Our systems guarantee trace-verified bulk shipping of authentic Himalayan shilajit, bold cardamom, vetiver base oils, and adaptogenic extracts under absolute phytosanitary compliance."}
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-600 pt-2">
              <div className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                <span>{t.export.apedaAuth || "APEDA Authorized"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-orange-500" />
                <span>{t.export.sgsPurity || "SGS Purity Lab Tested"}</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-gray-200 h-[320px] shadow-2xl">
            <OptimizedImage
              src={IMAGES.export.cargoShipAbout}
              alt="Cargo Ship Logistics"
              className="w-full h-full filter brightness-95"
              width={800}
              height={500}
              aspectRatio="16/10"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Absolute overlay trust card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg px-4 py-3 rounded-lg flex items-center justify-between">
              <div className="space-y-0.5 text-left">
                <p className="text-[10px] font-mono tracking-wider text-orange-600 uppercase font-bold">
                  {t.export.cargoTransit || "GLOBAL CARGO TRANSIT"}
                </p>
                <p className="text-xs text-gray-900 font-medium">
                  {t.export.cargoDesc || "Ocean & Air Freight Cargo Routing"}
                </p>
              </div>
              <span className="text-[9px] font-mono bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-1 rounded font-bold">
                {t.export.secure || "SECURE"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT EXPLORER & CATALOGUE */}
      <section className="py-20 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-8 mb-12">
            <div className="text-left">
              <span className="text-[10px] font-mono tracking-[0.34em] text-orange-600 uppercase block mb-2 font-bold">
                {t.export.catalogue || "DYNAMIC CATALOGUE"}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-gray-900">
                {t.export.selectGoods || "Select Agricultural Goods"}
              </h2>
            </div>

            {/* Live Search Control */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0 max-w-md w-full text-xs">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-orange-500/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.export.searchPlaceholder || "Search categories or products..."}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 rounded-full pl-9 pr-3 py-2.5 text-gray-900 outline-none placeholder-gray-400 transition-all font-sans"
                />
              </div>
            </div>
          </div>

          {/* Category Cards Grid */}
          {filteredCategories.length === 0 ? (
            <div className="py-20 text-center space-y-2 text-gray-500 border border-dashed border-gray-200 rounded-2xl">
              <p className="text-sm font-semibold">{t.export.noMatch || "No categories or products match your parameter."}</p>
              <p className="text-xs font-mono">{t.export.adjustSearch || "Try adjusting the search query."}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCategories.map((cat) => (
                <ProductCategoryCard
                  key={cat.id}
                  category={cat}
                  onOpenModal={handleOpenCategoryModal}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY SHOWCASE SECTIONS */}
      {/* CATEGORY SHOWCASE SECTIONS */}
      {SHOWCASE_CATEGORIES.map((cat, idx) => {
        const matchingCategory = EXPORT_CATEGORIES.find((c) => c.id === cat.id);
        return (
          <ShowcaseCategorySection
            key={cat.id}
            cat={cat}
            idx={idx}
            onOpenModal={handleOpenCategoryModal}
            onRequestQuote={handleRequestQuote}
            lang={lang}
            t={t}
            matchingCategory={matchingCategory}
          />
        );
      })}

      {/* Product Category Modal */}
      {selectedCategoryModal && (
        <Suspense fallback={null}>
          <ProductModal
            category={selectedCategoryModal}
            onClose={() => setSelectedCategoryModal(null)}
            onInquiry={(product) => setSelectedProductForInquiry(product)}
          />
        </Suspense>
      )}



      {/* 4. EXPORT DESK DIRECT CONTACT CARD */}
      <section className="py-20 px-4 bg-white relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 hover:border-orange-500/30 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-left">
              <span className="text-[10px] font-mono tracking-[0.25em] text-orange-600 uppercase block font-bold">
                {t.export.fastTrack || "FAST TRACK QUOTE"}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-gray-900">
                {t.export.speakArbitrage || "Speak with our Commodity Arbitrage desk"}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                {t.export.arbitrageDesc || "Need specialized custom moisture content, high volume tons, or sea container shipping contracts? Connect directly for priority trade handling."}
              </p>
              <div className="space-y-3 font-mono text-[10px] text-gray-700">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>{PHONE_NUMBER}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-orange-500" />
                  <span>{EMAIL_TO}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 space-y-4 text-xs text-left">
              <h4 className="font-serif text-sm text-orange-600 uppercase tracking-wider border-b border-gray-200 pb-1 font-bold">
                {t.export.cargoTimelines || "Typical Cargo Timelines"}
              </h4>
              <div className="space-y-2 font-mono text-gray-500">
                <div className="flex justify-between">
                  <span>{t.export.packagingPrep || "Custom packaging prep:"}</span>
                  <span className="text-gray-900">{t.export.packagingDays || "5-7 Working Days"}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.export.portOfLoad || "FOB port of load:"}</span>
                  <span className="text-gray-900">{t.export.portName || "Nhava Sheva, Mumbai"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {selectedProductForInquiry && (
        <Suspense fallback={null}>
          <InquiryModal
            product={selectedProductForInquiry}
            onClose={() => setSelectedProductForInquiry(null)}
          />
        </Suspense>
      )}
    </div>
  );
}

interface ShowcaseCategorySectionProps {
  cat: typeof SHOWCASE_CATEGORIES[0];
  idx: number;
  onOpenModal: (category: ProductCategory) => void;
  onRequestQuote: (e: React.MouseEvent) => void;
  lang: string;
  t: any;
  matchingCategory: ProductCategory | undefined;
}

const ShowcaseCategorySection = React.memo<ShowcaseCategorySectionProps>((
  {cat, idx, onOpenModal, onRequestQuote, lang, t, matchingCategory}
) => {
  const isEven = idx % 2 === 0;

  // Resolve translated text with priority order:
  // 1. t.export.showcaseCategories[id] — full rich showcase translation (added after run of translate script)
  // 2. t.products.categories[id]       — always translated in all languages (title + desc)
  // 3. cat.*                           — English hardcoded fallback
  const showcaseTrans = t.export?.showcaseCategories?.[cat.id];
  const catTrans = t.products?.categories?.[cat.id];

  const resolvedBadge = showcaseTrans?.badge || catTrans?.title || cat.badge;
  const resolvedTitle = showcaseTrans?.title || catTrans?.title || cat.title;
  const resolvedDesc = showcaseTrans?.description || catTrans?.desc || cat.description;
  const resolvedFeatures = showcaseTrans?.features || cat.features;
  const resolvedHighlights = showcaseTrans?.highlights || cat.highlights;
  const resolvedBenefits = showcaseTrans?.benefits || cat.benefits;
  const resolvedPackaging = showcaseTrans?.packaging || cat.packaging;
  const resolvedCapability = showcaseTrans?.capability || cat.capability;
  const resolvedShippingInfo = showcaseTrans?.shippingInfo || cat.shippingInfo;

  return (
    <section
      id={`showcase-${cat.id}`}
      className={`py-24 px-4 relative z-10 border-b border-gray-200 overflow-hidden ${
        isEven ? "bg-white" : "bg-slate-50"
      }`}
    >
      {/* Ambient Background Glows */}
      <div className={`absolute top-1/2 ${isEven ? "left-0" : "right-0"} w-96 h-96 bg-orange-500/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2`} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"} space-y-6 text-left`}
          >
            <div className="space-y-4">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[10px] font-mono text-orange-600 font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                <span>{resolvedBadge}</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-wide leading-tight">
                {resolvedTitle}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light max-w-2xl">
                {resolvedDesc}
              </p>
            </div>

            {/* 2x2 Grid of Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resolvedFeatures.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-orange-500/30 transition-all duration-300 space-y-1.5"
                >
                  <h4 className="font-serif text-sm text-gray-900 font-bold flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span>{feat.title}</span>
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Highlight Specs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200/60 text-xs">
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-gray-900 uppercase tracking-wider text-[10px] tracking-wide">
                  {t.export.qualityHighlights || "Export Quality Highlights"}
                </h4>
                <ul className="space-y-1.5 font-mono text-[10px] text-gray-600">
                  {resolvedHighlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-center space-x-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-bold text-gray-900 uppercase tracking-wider text-[10px] tracking-wide">
                  {t.export.keyBenefits || "Key Benefits"}
                </h4>
                <ul className="space-y-1.5 font-mono text-[10px] text-gray-600">
                  {resolvedBenefits.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-center space-x-2">
                      <Award className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-bold text-gray-900 uppercase tracking-wider text-[10px] tracking-wide">
                  {t.export.shippingPacking || "Global Shipping & Packing"}
                </h4>
                <ul className="space-y-1.5 font-mono text-[10px] text-gray-600">
                  <li className="flex items-start space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <span><strong>{t.export.packageLabel || "Package:"}</strong> {resolvedPackaging}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Compass className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <span><strong>{t.export.capabilityLabel || "Capability:"}</strong> {resolvedCapability}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              {matchingCategory && (
                <button
                  onClick={() => onOpenModal(matchingCategory)}
                  className="cursor-pointer inline-flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded shadow-md shadow-orange-500/10"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.product?.viewProducts || "View Products"}</span>
                </button>
              )}
              <a
                href="#booking-form-card"
                onClick={onRequestQuote}
                className="cursor-pointer inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 hover:border-orange-500 hover:text-orange-500 text-gray-600 font-bold text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded"
              >
                <Mail className="w-4 h-4" />
                <span>{t.product?.inquiryRequestQuote || "Request Quote"}</span>
              </a>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="relative rounded-3xl overflow-hidden border border-gray-200/80 shadow-2xl h-[340px] lg:h-[450px] group">
              <OptimizedImage
                src={cat.image}
                alt={resolvedTitle}
                className="w-full h-full"
                imgClassName="filter brightness-95 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
              
              {/* Floating Trust Badge on Image */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-gray-200/80 p-4 rounded-xl flex items-center justify-between shadow-lg">
                <div className="text-left space-y-0.5">
                  <span className="text-[8px] font-mono font-bold text-orange-600 tracking-wider uppercase block">
                    {t.export.secureTransit || "SECURE TRANSIT"}
                  </span>
                  <p className="text-[10px] font-mono text-gray-500">
                    {resolvedShippingInfo}
                  </p>
                </div>
                <span className="text-[8px] font-mono font-bold bg-emerald-50 border border-emerald-100 text-emerald-600 px-2 py-1 rounded">
                  {t.export.readyStatus || "100% READY"}
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});
ShowcaseCategorySection.displayName = "ShowcaseCategorySection";

const SHOWCASE_CATEGORIES = [
  {
    id: "spices",
    badge: "Spices & Seasonings Division",
    title: "Elite Spices & Authentic Seasonings",
    description: "Vedas-grade aromatics, hot chillies, and complex culinary powders milled to absolute microbiological safety standards. Direct farm sourcing guarantees robust oil contents and intense flavor profiles.",
    image: IMAGES.exportCategories.spices,
    highlights: [
      "Curcumin Gold turmeric selection (>5%)",
      "Piperine-checked Tellicherry black pepper",
      "Sudan Dye negative Guntur chillies",
      "Cryogenic low-temp hygienic milling"
    ],
    benefits: [
      "High volatile essential oil retention",
      "Pristine aroma and flavor stability",
      "100% organic, additive-free processing",
      "Aflatoxin-safe global compliance"
    ],
    packaging: "25kg multi-layer Kraft bags with poly liners, vacuum packed options.",
    capability: "Consolidated mixed LCL container shipments or up to 20 Metric Tons per FCL.",
    shippingInfo: "FOB Nhava Sheva (Mumbai) or Mundra Port. Air cargo priority routing.",
    features: [
      { title: "Curcumin Gold", desc: "Golden turmeric powder carrying active curcumin levels exceeding 5% for food and clinical uses." },
      { title: "Malabar Pepper", desc: "Extra bold black pepper berries prized for deep piperine heat and complex woodland notes." },
      { title: "Cryo-Milled Chilli", desc: "Guntur Sannam chilli powder milled under cryogenic controls to block heat-induced oil loss." },
      { title: "Citrusy Coriander", desc: "Premium Malwa seeds milled to fine mesh, packing citrus-warm volatile fractions." }
    ]
  },
  {
    id: "veg_powders",
    badge: "Vegetable Powders Desk",
    title: "Pure Dehydrated Vegetable Powders",
    description: "Agricultural vegetables dehydrated at strictly controlled low temperatures to protect bioactive nutrients, color profiles, and flavor depth. Ideal for ready-to-eat foods, mixers, and pharmaceutical formulations.",
    image: IMAGES.exportCategories.vegPowders,
    highlights: [
      "100% real vegetable solids, zero additives",
      "Cell-retentive low-temperature drying",
      "Excellent dry solubility and dispersion",
      "Free-flowing, non-caking natural grade"
    ],
    benefits: [
      "Instant water reconstitution ratios",
      "Intense concentration of organic flavors",
      "Retains natural vitamins and fibers",
      "Pristine visual pigment retention"
    ],
    packaging: "Fiber drums with double polyethylene inner bags (20 kg / 25 kg).",
    capability: "12-15 Metric Tons per FCL. Custom spice/vegetable blend formulations.",
    shippingInfo: "Ocean transit via temperature-controlled reefer containers to global ports.",
    features: [
      { title: "Spray-Dried Tomato", desc: "Soluble red tomato pulp powder rich in lycopene, giving instant savory umami depth." },
      { title: "Betalain Beetroot", desc: "Finely ground beetroot powder providing intense natural crimson colors and nitrate richness." },
      { title: "Chlorophyll Spinach", desc: "Bright green soluble spinach powder locking in dietary iron and chlorophyll." },
      { title: "Allicin Garlic", desc: "Pungent garlic powder milled from choice cloves, offering quick dispersal and taste." }
    ]
  },
  {
    id: "fruit_powders",
    badge: "Fruit Powders Desk",
    title: "Orchard Fruit Powders & Solubles",
    description: "Premium spray-dried and low-temp dehydrated fruit powders capturing the true sweetness, organic sugars, and vitamins of sun-ripened orchard fruits. Highly popular in beverages, confectionery, and infant foods.",
    image: IMAGES.exportCategories.fruitPowders,
    highlights: [
      "Spray-dried directly from organic pulp",
      "No added sugars, sulfites or colorants",
      "Highly soluble in hot and cold liquids",
      "Nutrient-dense superfood selections"
    ],
    benefits: [
      "Pure fruit aroma and sweet tang",
      "High Vitamin C and bioactive retention",
      "Perfect blending for dairy and baking",
      "Clean-label compliant ingredients"
    ],
    packaging: "Aluminum foil vacuum sealed pouches inside corrugated master boxes.",
    capability: "8-10 Metric Tons per FCL. Private label packaging support.",
    shippingInfo: "Express air cargo or temperature-monitored sea container transport.",
    features: [
      { title: "Cavendish Banana", desc: "Green and ripe banana powder rich in resistant starches, perfect for gluten-free blends." },
      { title: "Kesar Mango", desc: "Golden fruit solids capturing the sweet aroma of hand-harvested Indian mangoes." },
      { title: "Ascorbic Amla", desc: "Organically sourced gooseberry powder containing highly concentrated natural Vitamin C." },
      { title: "Antioxidant Pomegranate", desc: "Spray-dried pomegranate juice powder providing rich polyphenols and visual pink hues." }
    ]
  },
  {
    id: "moringa",
    badge: "Moringa Superfood Desk",
    title: "Premium Organic Moringa Products",
    description: "Organically cultivated Moringa oleifera leaves, powders, teas, and extracts sourced from pesticide-free, high-yield Indian estates. Processed under shadow-drying protocols to protect essential amino acids.",
    image: IMAGES.exportCategories.moringa,
    highlights: [
      "USDA & APEDA Organic certified crops",
      "Strict shadow-dried leaf curing",
      "Phytochemical and flavonoid standardized",
      "99.9% clean leaf material, zero sand"
    ],
    benefits: [
      "Complete plant protein with 9 amino acids",
      "Extreme iron, calcium, and vitamin counts",
      "Highly stable shelf life in vacuum seal",
      "Ideal for supplements and cosmetics"
    ],
    packaging: "Vacuum barrier bags with silica gel inserts, packed in reinforced boxes.",
    capability: "5-8 Metric Tons per batch. Customizable leaf cuts and wholesale packs.",
    shippingInfo: "Sealed dry containers, priority air freight forwarding to global wellness distributors.",
    features: [
      { title: "Organics Leaf Powder", desc: "Finely milled moringa leaf powder with deep emerald color and grassy flavor." },
      { title: "Clean Cured Leaves", desc: "Whole shadow-dried leaves sorted mechanically to remove twigs, stems, and dust." },
      { title: "Herbal Moringa Tea", desc: "Uniformly cut leaves optimized for tea bags, offering a fresh wellness herbal infusion." },
      { title: "Standardized Extract", desc: "Concentrated moringa leaf extract standardized for total bioflavonoids for clinical formulations." }
    ]
  },
  {
    id: "seeds",
    badge: "Oil Seeds Desk",
    title: "Premium Sorted Oil & Dietary Seeds",
    description: "Dharaaveda Global Exim offers premium export-quality seeds sourced directly from trusted farms across India. Every batch is meticulously cleaned, graded, and packed under stringent hygiene standards, ensuring high purity, freshness, and compliance with international export and APEDA quality requirements.",
    image: IMAGES.exportCategories.seeds,
    highlights: [
      "Export Quality",
      "High Purity",
      "Hygienically Processed",
      "APEDA Compliant",
      "Bulk Supply Available"
    ],
    benefits: [
      "High natural oil extraction ratios",
      "Extremely clean seeds with zero dirt",
      "Uniform seed dimensions and color profiles",
      "Packed to block atmospheric moisture"
    ],
    packaging: "Woven polypropylene sacks or multi-ply paper bags (25 kg / 50 kg).",
    capability: "18-22 Metric Tons per container (FCL). Custom moisture specs.",
    shippingInfo: "Direct ocean liners, bulk cargo routing to commercial bakeries and distributors.",
    features: [
      { title: "Flax Seeds", desc: "Flax Seeds (Linum usitatissimum) are premium oilseeds valued for their high Omega-3 (ALA), dietary fiber, protein, and essential minerals." },
      { title: "Sesame Seeds", desc: "Sesame Seeds (Sesamum indicum) are nutrient-dense oilseeds renowned for high oil content, healthy fats, calcium, and iron." },
      { title: "Chia Seeds", desc: "Chia Seeds (Salvia hispanica) are nutrient-dense superfoods rich in Omega-3 fatty acids, dietary fiber, and plant-based protein." },
      { title: "Pumpkin Seeds", desc: "Pumpkin Seeds (Pepitas) are nutrient-rich edible seeds packed with protein, healthy fats, magnesium, zinc, iron, and antioxidants." }
    ]
  },
  {
    id: "dehydrated_veg",
    badge: "Dehydrated Vegetables Desk",
    title: "Premium Dehydrated Vegetables Catalogue",
    description: "Premium quality dehydrated vegetables sourced from trusted Indian suppliers, carefully processed to preserve natural flavour, colour and aroma. Suitable for food manufacturers, HoReCa, wholesalers and international distributors.",
    image: IMAGES.exportCategories.dehydratedVeg,
    highlights: [
      "100% premium Indian origin sourcing",
      "Preserves natural flavour, colour & aroma",
      "Flakes, granules, powder, sliced & diced forms",
      "Food-grade, export quality with buyer specs"
    ],
    benefits: [
      "Long shelf life and convenient storage",
      "Ideal for food processing & HoReCa",
      "Moisture protection with inner liner packaging",
      "Customized private label & bulk packaging"
    ],
    packaging: "5 kg, 10 kg, 20 kg, 25 kg & 50 kg food-grade poly/paper bags, HDPE & corrugated boxes.",
    capability: "10-12 Metric Tons per FCL. Customized cuts, forms & private label packaging.",
    shippingInfo: "Standard dry containers or reefer routing to industrial seasoning kitchens.",
    features: [
      { title: "Dehydrated Onion & Garlic", desc: "Available in flakes, chopped, minced, granules & powder for food processing, soups & seasoning blends." },
      { title: "Dehydrated Ginger & Tomato", desc: "Clean sliced & powdered for spice mixes, beverages, gravies, bakery & ready-to-eat meals." },
      { title: "Dehydrated Carrot & Beetroot", desc: "Naturally rich in color & nutrition for soups, smoothies, baby food, natural coloring & health drinks." },
      { title: "Dehydrated Spinach & Cabbage", desc: "Shelf-stable green veggies & cabbage cuts for instant noodles, pasta, chutneys & food service." }
    ]
  },
  {
    id: "dehydrated_fruits",
    badge: "Dehydrated Fruits Desk",
    title: "Sun-Sheltered Dehydrated Fruits",
    description: "Premium slices and long-cut dehydrated fruits prepared from hand-harvested organic orchards. Preserves natural fructose sugars, chewy textures, and vital vitamins without chemical preservatives.",
    image: IMAGES.exportCategories.dehydratedFruits,
    highlights: [
      "Zero added cane sugars or sweeteners",
      "Sulfite-free, zero chemical colorants",
      "Flexible slicing shapes and custom moisture",
      "Pesticide-free certified orchards"
    ],
    benefits: [
      "Chewy, natural texture and visual hue",
      "Stable room-temperature storage life",
      "High vitamin and dietary fiber retention",
      "Ready-to-eat snacking and baking grade"
    ],
    packaging: "Gas-flushed vacuum barrier film bags inside master cases (10 kg).",
    capability: "8-10 Metric Tons per FCL. Mixed category cargo LCL support.",
    shippingInfo: "Reefer container transport for optimal color retention during warm voyages.",
    features: [
      { title: "Mango Strips", desc: "Dehydrated Alphonso and Kesar mango strips, sweet and chewy without added cane sugar." },
      { title: "Banana Rounds", desc: "Cavendish banana rounds air-dried naturally, locking in potassium and sweet taste." },
      { title: "Pineapple Rings", desc: "Dried pineapple slices capturing the tart, tropical citrus flavor and visual yellow color." },
      { title: "Apple Wedges", desc: "Peeled and cored apple wedges dried slowly to a beautiful light-golden crunch." }
    ]
  },
  {
    id: "flakes",
    badge: "Flakes & Dehydrated Cuts Desk",
    title: "Industrial & Gourmet Flakes",
    description: "Gourmet vegetable flakes dried uniformly using advanced dehydration chambers. Designed for quick hydration and excellent cell-texture recovery in convenience foods, instant soups, and dry mixes.",
    image: IMAGES.exportCategories.flakes,
    highlights: [
      "Uniform flake cuts (typically 10mm)",
      "Zero dust, skin residue or foreign seeds",
      "Immediate rehydration in hot liquids",
      "Hygienically sorted, microbiology audited"
    ],
    benefits: [
      "Optimized for quick packaging assembly",
      "Restores crisp texture and color in soups",
      "Low moisture guarantees long shelf life",
      "Clean label industrial ingredient"
    ],
    packaging: "Corrugated boxes with multi-layer barrier foil liners.",
    capability: "14-16 Metric Tons per FCL. Custom blends and mesh sizes.",
    shippingInfo: "Direct container pipelines to global instant food and ready-to-eat brands.",
    features: [
      { title: "Red Onion Flakes", desc: "Air-dried 10mm red onion flakes preserving savory sweet notes for dry gravies." },
      { title: "Garlic Flakes", desc: "Clean garlic flakes sorted via high-accuracy Sortex cameras, free of outer skins." },
      { title: "Potato Flakes", desc: "High-starch potato flakes, ideal for instant baking thickeners and snack bases." },
      { title: "Mixed Veg Flakes", desc: "A colorful blend of carrot, cabbage, onion, and spinach flakes for instant soup cups." }
    ]
  }
];
