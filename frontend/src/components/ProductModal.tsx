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
          className="relative w-full max-w-5xl rounded-3xl border border-gray-200 bg-white shadow-2xl overflow-hidden flex flex-col my-auto h-[75vh] md:h-[80vh] max-h-[80vh]"
          id={`category-modal-${category.id}`}
        >
          {/* Top Golden Light Mesh */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
          <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Sticky Modal Header */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 sm:px-8 py-5 flex justify-between items-center">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 border border-orange-500/30 rounded-xl rotate-45 flex items-center justify-center bg-orange-50 shrink-0 hidden sm:flex">
                <Compass className="-rotate-45 w-5 h-5 text-orange-500" />
              </div>
              <div>
                <span className="text-[9px] font-mono tracking-[0.3em] text-orange-600 font-semibold uppercase block mb-0.5">
                  {t.export.division || "Agricultural Export Division"}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-gray-900 font-bold leading-tight">
                  {catTitle} {t.product.titleCatalogue || "Catalogue"}
                </h3>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="cursor-pointer p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-gray-200 active:scale-95"
              title={t.product.modalCloseTitle || "Close Catalogue"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Products List Container */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-8 scroll-smooth custom-scrollbar">
            
            {/* Category Intro Card inside Modal */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 text-left">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-4xl font-sans">
                {catDesc} Every crop is registered, compliant with APEDA requirements, and processed in high-purity clean rooms to preserve volatile natural phytol compounds and nutritional profiles during transit.
              </p>
            </div>

            {/* Custom Divider */}
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-mono text-orange-600 font-semibold uppercase tracking-[0.2em] shrink-0">
                {t.product.availableCargo || "Available Cargo Lots"}
              </span>
              <div className="h-px bg-orange-500/20 flex-1" />
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
                    className="group grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 rounded-2xl p-5 sm:p-6 bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg shadow-sm transition-all duration-300"
                  >
                    {/* Left Column: Product Image */}
                    <div className="md:col-span-4 aspect-[4/3] md:aspect-auto md:h-52 rounded-xl overflow-hidden relative border border-gray-100 bg-slate-50 group">
                      <OptimizedImage
                        src={p.images[0]}
                        alt={pName}
                        className="w-full h-full"
                        imgClassName="transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                      <div className="absolute top-2 left-2 bg-white border border-orange-500/20 px-2 py-1 rounded text-[8px] font-mono tracking-wider text-orange-500">
                        ORIGIN {idx + 1}
                      </div>
                    </div>

                    {/* Right Column: Key details */}
                    <div className="md:col-span-8 flex flex-col justify-between space-y-4 text-left">
                       <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2">
                          <h4 className="font-serif text-lg sm:text-xl text-gray-900 font-bold tracking-wide group-hover:text-orange-600 transition-colors">
                            {pName}
                          </h4>
                          <div className="flex items-center space-x-1 font-mono text-[9px] text-gray-600 bg-slate-50 border border-gray-200 px-2.5 py-1 rounded-full">
                            <Tag className="w-3 h-3 text-orange-500 shrink-0" />
                            <span>{t.product.minOrder || "Min Order"}: {pMinOrder}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {pDesc}
                        </p>
                      </div>

                      {/* Metadata specs table */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3 bg-slate-50 rounded-xl border border-gray-200 text-[10px] font-mono text-gray-600">
                        <div>
                          <span className="uppercase text-gray-500 block text-[8px] mb-0.5">{t.product.metadataOrigin || "ORIGIN"}</span>
                          <span className="text-gray-800 font-sans">{pOrigin}</span>
                        </div>
                        <div>
                          <span className="uppercase text-gray-500 block text-[8px] mb-0.5">{t.product.metadataPurity || "PURITY"}</span>
                          <span className="text-gray-800 font-sans">{pPurity}</span>
                        </div>
                        <div>
                          <span className="uppercase text-gray-500 block text-[8px] mb-0.5">{t.product.metadataGrade || "GRADE"}</span>
                          <span className="text-gray-800 font-sans">{pGrade}</span>
                        </div>
                        <div>
                          <span className="uppercase text-gray-500 block text-[8px] mb-0.5">{t.product.metadataPackaging || "PACKAGING"}</span>
                          <span className="text-gray-800 font-sans">{pPackaging}</span>
                        </div>
                      </div>

                      {/* Action Footer */}
                      <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                            {t.product.pricingModel || "Pricing Model"}
                          </span>
                          <span className="font-mono font-bold text-orange-600">{pPricing}</span>
                        </div>
                        <button
                          onClick={() => onInquiry(p)}
                          className="cursor-pointer flex items-center space-x-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all duration-300 rounded shadow-md shadow-orange-500/10"
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
          <div className="sticky bottom-0 bg-slate-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center text-xs">
            <div className="flex items-center space-x-1.5 text-[9px] font-mono text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{t.product.apedaCompliant || "APEDA Compliant Export Cargo Standard"}</span>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-500 hover:text-gray-900 font-mono text-[10px] uppercase tracking-wider transition-colors hover:underline"
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
