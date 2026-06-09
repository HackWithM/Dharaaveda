import React, { useState, lazy, Suspense } from "react";
import { Search, Compass, Award, ShieldCheck, Mail, Phone, MapPin, Sparkles, ChevronRight, MessageSquareCode } from "lucide-react";
import { Product } from "../types";
import { IMAGES } from "../data/images";
import OptimizedImage from "../components/OptimizedImage";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";

import { EXPORT_CATEGORIES, ProductCategory } from "../data/exportProducts";
import ProductCategoryCard from "../components/ProductCategoryCard";
import ProductModal from "../components/ProductModal";

const InquiryModal = lazy(() => import("../components/InquiryModal"));

export default function Export() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryModal, setSelectedCategoryModal] = useState<ProductCategory | null>(null);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<Product | null>(null);

  const { lang } = useLanguage();
  const t = staticTranslations[lang] || staticTranslations.en;

  const filteredCategories = EXPORT_CATEGORIES.filter((cat) => {
    const catTrans = t.products?.categories?.[cat.id] || { title: cat.title, desc: cat.description };
    const matchesSearch =
      catTrans.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      catTrans.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.products.some((p) => {
        const pTrans = t.products?.items?.[p.id] || { name: p.name };
        return pTrans.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    return matchesSearch;
  });

  return (
    <div className="bg-luxury-blue-deep text-white min-h-screen pt-24 font-sans">
      {/* 1. HERO - INTERNATIONAL TRADE BRANDING */}
      <section className="relative py-20 px-4 overflow-hidden border-b border-luxury-gold/15 bg-radial-[circle_at_right,_var(--color-luxury-blue-mid)_0%,_#070e13_100%]">
        {/* Absolute Background Graphics */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-10 pointer-events-none" 
          style={{ backgroundImage: `url('${IMAGES.export.hero}')` }}
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-luxury-blue-accent/30 border border-luxury-gold/20 text-[10px] font-mono uppercase tracking-widest text-luxury-gold">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.export.division || "International Trade Division"}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-white leading-tight text-left">
              {t.export.heroTitle || "Elite Crop Logistical Logistics"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl text-left">
              {t.export.heroDesc || "DharaAveda connects deep Indian botanical farms with premium global pharmacies, cosmetics houses, and food importers. Our systems guarantee trace-verified bulk shipping of authentic Himalayan shilajit, bold cardamom, vetiver base oils, and adaptogenic extracts under absolute phytosanitary compliance."}
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-300 pt-2">
              <div className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                <span>{t.export.apedaAuth || "APEDA Authorized"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-luxury-gold" />
                <span>{t.export.sgsPurity || "SGS Purity Lab Tested"}</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-luxury-gold/15 h-[320px] shadow-2xl">
            <OptimizedImage
              src={IMAGES.export.cargoShip}
              alt="Cargo Ship Logistics"
              className="w-full h-full filter brightness-90"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Absolute overlay trust card */}
            <div className="absolute bottom-4 left-4 right-4 glass-panel-dark px-4 py-3 rounded-lg flex items-center justify-between">
              <div className="space-y-0.5 text-left">
                <p className="text-[10px] font-mono tracking-wider text-luxury-gold uppercase">
                  {t.export.cargoTransit || "GLOBAL CARGO TRANSIT"}
                </p>
                <p className="text-xs text-white font-medium">
                  {t.export.cargoDesc || "Ocean & Air Freight Cargo Routing"}
                </p>
              </div>
              <span className="text-[9px] font-mono bg-emerald-950 text-emerald-400 px-2 py-1 rounded">
                {t.export.secure || "SECURE"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT EXPLORER & CATALOGUE */}
      <section className="py-20 px-4 bg-[#0a141b] relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-luxury-gold/15 pb-8 mb-12">
            <div className="text-left">
              <span className="text-[10px] font-mono tracking-[0.34em] text-luxury-gold uppercase block mb-2">
                {t.export.catalogue || "DYNAMIC CATALOGUE"}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white">
                {t.export.selectGoods || "Select Agricultural Goods"}
              </h2>
            </div>

            {/* Live Search Control */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0 max-w-md w-full text-xs">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-luxury-gold/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.export.searchPlaceholder || "Search categories or products..."}
                  className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-full pl-9 pr-3 py-2.5 text-white outline-none placeholder-gray-500 transition-all font-sans"
                />
              </div>
            </div>
          </div>

          {/* Category Cards Grid */}
          {filteredCategories.length === 0 ? (
            <div className="py-20 text-center space-y-2 text-gray-400 border border-dashed border-luxury-gold/15 rounded-2xl">
              <p className="text-sm font-semibold">{t.export.noMatch || "No categories or products match your parameter."}</p>
              <p className="text-xs font-mono">{t.export.adjustSearch || "Try adjusting the search query."}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredCategories.map((cat) => (
                <ProductCategoryCard
                  key={cat.id}
                  category={cat}
                  onOpenModal={(selectedCat) => setSelectedCategoryModal(selectedCat)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Category Modal */}
      {selectedCategoryModal && (
        <ProductModal
          category={selectedCategoryModal}
          onClose={() => setSelectedCategoryModal(null)}
          onInquiry={(product) => setSelectedProductForInquiry(product)}
        />
      )}

      {/* 3. COHESIVE TRUST / SHIPPING BADGES SECTION */}
      <section className="py-20 px-4 bg-[#070e13] border-t border-b border-luxury-gold/15 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-luxury-gold">
              {t.export.freightNetworks || "Global Freight Networks"}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white">
              {t.export.operationsTitle || "Trade Operations Built on Integrity"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-luxury-gold/10 space-y-4">
              <div className="w-12 h-12 bg-luxury-blue-accent/30 border border-luxury-gold/20 rounded-full flex items-center justify-center mx-auto text-luxury-gold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-white">
                {t.export.sgsTitle || "Full SGS Verification"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans text-center">
                {t.export.sgsDesc || "Every trace lot undergoes gas chromatography & analytical purity tests. Phytosanitary compliance guarantees hassle-free harbor custom routing."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-luxury-gold/10 space-y-4">
              <div className="w-12 h-12 bg-luxury-blue-accent/30 border border-luxury-gold/20 rounded-full flex items-center justify-center mx-auto text-luxury-gold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-white">
                {t.export.isoTitle || "ISO Reciprocal Standard"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans text-center">
                {t.export.isoDesc || "Operating under rigorous international hygiene guidelines. Vacuum-tight packing blocks cosmic UV light, keeping freshness intact during transit."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-luxury-gold/10 space-y-4">
              <div className="w-12 h-12 bg-luxury-blue-accent/30 border border-luxury-gold/20 rounded-full flex items-center justify-center mx-auto text-luxury-gold">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-white">
                {t.export.originTitle || "Wayanad Direct Origin"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans text-center">
                {t.export.originDesc || "Our spice estate cuts out unnecessary trading middlemen, ensuring maximum fair-wage compensation to local Vedic smallholder farmers directly."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPORT DESK DIRECT CONTACT CARD */}
      <section className="py-20 px-4 bg-[#0a141b]/95 relative z-10">
        <div className="max-w-4xl mx-auto glass-panel-dark rounded-3xl p-8 sm:p-12 border border-luxury-gold/20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-luxury-gold/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-left">
              <span className="text-[10px] font-mono tracking-[0.25em] text-luxury-gold uppercase block">
                {t.export.fastTrack || "FAST TRACK QUOTE"}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                {t.export.speakArbitrage || "Speak with our Commodity Arbitrage desk"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                {t.export.arbitrageDesc || "Need specialized custom moisture content, high volume tons, or sea container shipping contracts? Connect directly for priority trade handling."}
              </p>
              <div className="space-y-3 font-mono text-[10px] text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-luxury-gold" />
                  <span>+91 22 8390 1204</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-luxury-gold" />
                  <span>trade@dharaaveda.com</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#070e13] border border-luxury-gold/15 space-y-4 text-xs text-left">
              <h4 className="font-serif text-sm text-luxury-gold uppercase tracking-wider border-b border-luxury-gold/10 pb-1">
                {t.export.cargoTimelines || "Typical Cargo Timelines"}
              </h4>
              <div className="space-y-2 font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>{t.export.sgsClearance || "SGS analysis clearance:"}</span>
                  <span className="text-white">{t.export.sgsDays || "4-5 Working Days"}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.export.packagingPrep || "Custom packaging prep:"}</span>
                  <span className="text-white">{t.export.packagingDays || "5-7 Working Days"}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.export.portOfLoad || "FOB port of load:"}</span>
                  <span className="text-white">{t.export.portName || "Nhava Sheva, Mumbai"}</span>
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
