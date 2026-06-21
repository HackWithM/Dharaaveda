import React from "react";
import { ProductCategory } from "../data/exportProducts";
import { Compass, Sparkles, ChevronRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";

interface ProductCategoryCardProps {
  category: ProductCategory;
  onOpenModal: (category: ProductCategory) => void;
}

const ProductCategoryCard: React.FC<ProductCategoryCardProps> = ({ category, onOpenModal }) => {
  const { lang } = useLanguage();
  const t = staticTranslations[lang] || staticTranslations.en;

  const title = t.products?.categories?.[category.id]?.title || category.title;
  const description = t.products?.categories?.[category.id]?.desc || category.description;

  return (
    <div
      id={`cat-card-${category.id}`}
      className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-orange-300 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl h-full"
    >
      {/* Visual Header */}
      <div className="h-40 relative overflow-hidden bg-neutral-950 border-b border-gray-100">
        <OptimizedImage
          src={category.image}
          alt={title}
          className="w-full h-full"
          imgClassName="group-hover:scale-[1.04] transition-transform duration-700 ease-out brightness-90 saturate-95 group-hover:brightness-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Subtle decorative grid/line mesh over category image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
        
        {/* Category Badge Indicator representing pure agricultural origin */}
        <span className="absolute top-3 left-3 bg-white/90 text-orange-600 border border-orange-200 font-mono text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center space-x-1 font-semibold">
          <Sparkles className="w-2.5 h-2.5 animate-pulse text-orange-500" />
          <span>{title}</span>
        </span>
      </div>

      {/* Main Metadata Information */}
      <div className="p-4.5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2 text-left">
          <h3 className="font-serif text-base sm:text-lg text-gray-900 group-hover:text-orange-600 transition-colors font-semibold tracking-wide line-clamp-1">
            {title}
          </h3>
          <p className="text-[11px] text-gray-500 leading-relaxed font-sans line-clamp-2">
            {description}
          </p>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="space-y-0.5 text-left">
            <span className="text-[7px] font-mono text-gray-400 uppercase tracking-widest block">
              {t.product.extendedCatalogue || "EXTENDED CATALOGUE"}
            </span>
            <span className="text-[9px] font-mono font-semibold text-orange-600 uppercase tracking-wider">
              {category.products.length} {t.product.premiumItems || "Items"}
            </span>
          </div>
          <button
            onClick={() => onOpenModal(category)}
            className="cursor-pointer group/btn inline-flex items-center space-x-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[9px] font-mono uppercase tracking-widest transition-all duration-300 rounded shadow-sm shadow-orange-500/10 shrink-0"
          >
            <span>{t.product.viewProducts || "View"}</span>
            <ChevronRight className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCategoryCard);
