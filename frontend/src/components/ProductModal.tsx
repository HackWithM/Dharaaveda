import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Compass, HelpCircle, ShieldCheck, Tag } from "lucide-react";
import { ProductCategory } from "../data/exportProducts";
import { Product } from "../types";
import OptimizedImage from "./OptimizedImage";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";

interface ProductModalProps {
  category: ProductCategory | null;
  onClose: () => void;
  onInquiry: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ category, onClose, onInquiry }) => {
  const { lang } = useLanguage();
  const t = staticTranslations[lang] || staticTranslations.en;

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (category) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [category]);

  if (!category) return null;

  const catTitle = t.products?.categories?.[category.id]?.title || category.title;
  const catDesc = t.products?.categories?.[category.id]?.desc || category.description;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          className="relative w-full max-w-5xl rounded-3xl border border-luxury-gold/30 bg-[#070e13]/90 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh] sm:max-h-[85vh]"
          id={`category-modal-${category.id}`}
        >
          {/* Top Golden Light Mesh */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold/70 to-transparent" />
          <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Sticky Modal Header */}
          <div className="sticky top-0 z-10 glass-panel-dark border-b border-luxury-gold/15 px-6 sm:px-8 py-5 flex justify-between items-center bg-[#070e13]/95">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 border border-luxury-gold/30 rounded-xl rotate-45 flex items-center justify-center bg-luxury-gold/5 shrink-0 hidden sm:flex">
                <Compass className="-rotate-45 w-5 h-5 text-luxury-gold" />
              </div>
              <div>
                <span className="text-[9px] font-mono tracking-[0.3em] text-luxury-gold uppercase block mb-0.5">
                  {t.export.division || "Agricultural Export Division"}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-bold leading-tight">
                  {catTitle} {t.product.titleCatalogue || "Catalogue"}
                </h3>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="cursor-pointer p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5 active:scale-95"
              title="Close Catalogue"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Products List Container */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-12 scroll-smooth max-h-[calc(85vh-120px)] custom-scrollbar">
            
            {/* Category Intro Card inside Modal */}
            <div className="p-6 rounded-2xl bg-white/5 border border-luxury-gold/10 text-left">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-4xl font-sans">
                {catDesc} Every crop is registered, compliant with APEDA requirements, and processed in high-purity clean rooms to preserve volatile natural phytol compounds and nutritional profiles during transit.
              </p>
            </div>

            {/* Custom Divider */}
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-[0.2em] shrink-0">
                {t.product.availableCargo || "Available Cargo Lots"}
              </span>
              <div className="h-px bg-luxury-gold/15 flex-1" />
            </div>

            {/* Products Lists */}
            <div className="space-y-10">
              {category.products.map((p, idx) => {
                const pTrans = t.products?.items?.[p.id];
                const pName = pTrans?.name || p.name;
                const pDesc = pTrans?.desc || p.description;
                const pPricing = pTrans?.pricing || p.pricing;
                const pOrigin = pTrans?.spec?.origin || p.specifications.origin;
                const pPurity = pTrans?.spec?.purity || p.specifications.purity;
                const pGrade = pTrans?.spec?.grade || p.specifications.grade;
                const pPackaging = pTrans?.spec?.packaging || p.specifications.packaging;
                const pMinOrder = pTrans?.spec?.minOrder || p.specifications.minOrder;

                return (
                  <div
                    key={p.id}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 rounded-2xl p-5 sm:p-6 bg-[#0d1c24]/30 border border-luxury-gold/10 hover:border-luxury-gold/30 hover:bg-[#0a1820]/50 transition-all duration-300"
                  >
                    {/* Left Column: Product Image */}
                    <div className="md:col-span-4 aspect-[4/3] md:aspect-auto md:h-52 rounded-xl overflow-hidden relative border border-luxury-gold/10 bg-neutral-900 group">
                      <OptimizedImage
                        src={p.images[0]}
                        alt={pName}
                        className="w-full h-full"
                        imgClassName="transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 border border-luxury-gold/20 px-2 py-1 rounded text-[8px] font-mono tracking-wider text-luxury-gold">
                        ORIGIN {idx + 1}
                      </div>
                    </div>

                    {/* Right Column: Key details */}
                    <div className="md:col-span-8 flex flex-col justify-between space-y-4 text-left">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-luxury-gold/10 pb-2">
                          <h4 className="font-serif text-lg sm:text-xl text-white font-bold tracking-wide group-hover:text-luxury-gold transition-colors">
                            {pName}
                          </h4>
                          <div className="flex items-center space-x-1 font-mono text-[9px] text-gray-400 bg-black/30 border border-white/5 px-2.5 py-1 rounded-full">
                            <Tag className="w-3 h-3 text-luxury-gold shrink-0" />
                            <span>{t.product.minOrder || "Min Order"}: {pMinOrder}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {pDesc}
                        </p>
                      </div>

                      {/* Metadata specs table */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3 bg-black/45 rounded-xl border border-luxury-gold/5 text-[10px] font-mono text-gray-400">
                        <div>
                          <span className="uppercase text-gray-500 block text-[8px] mb-0.5">ORIGIN</span>
                          <span className="text-white font-sans">{pOrigin}</span>
                        </div>
                        <div>
                          <span className="uppercase text-gray-500 block text-[8px] mb-0.5">PURITY</span>
                          <span className="text-white font-sans">{pPurity}</span>
                        </div>
                        <div>
                          <span className="uppercase text-gray-500 block text-[8px] mb-0.5">GRADE</span>
                          <span className="text-white font-sans">{pGrade}</span>
                        </div>
                        <div>
                          <span className="uppercase text-gray-500 block text-[8px] mb-0.5">PACKAGING</span>
                          <span className="text-white font-sans">{pPackaging}</span>
                        </div>
                      </div>

                      {/* Action Footer */}
                      <div className="pt-3 border-t border-luxury-gold/10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                            {t.product.pricingModel || "Pricing Model"}
                          </span>
                          <span className="font-mono font-bold text-luxury-gold">{pPricing}</span>
                        </div>
                        <button
                          onClick={() => onInquiry(p)}
                          className="cursor-pointer flex items-center space-x-2 px-5 py-2.5 border border-luxury-gold bg-luxury-gold/10 text-[10px] font-mono uppercase tracking-widest text-luxury-gold hover:bg-luxury-gold hover:text-luxury-blue-deep transition-all duration-300 rounded"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{t.product.sendInquiry || "Send Inquiry / Quote"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Modal Footer */}
          <div className="sticky bottom-0 glass-panel-dark border-t border-luxury-gold/15 px-6 py-4 bg-[#070e13]/95 flex justify-between items-center text-xs">
            <div className="flex items-center space-x-1.5 text-[9px] font-mono text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.product.apedaCompliant || "APEDA Compliant Export Cargo Standard"}</span>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-400 hover:text-white font-mono text-[10px] uppercase tracking-wider transition-colors hover:underline"
            >
              {t.product.close || "Close"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;
