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
      className="group relative rounded-2xl overflow-hidden glass-panel-dark border border-luxury-gold/15 hover:border-luxury-gold/45 bg-[#0d1c24]/50 hover:bg-[#0f212a]/70 flex flex-col justify-between transition-all duration-350 shadow-lg hover:shadow-2xl hover:shadow-luxury-gold/5"
    >
      {/* Visual Header */}
      <div className="h-64 relative overflow-hidden bg-neutral-950 border-b border-luxury-gold/10">
        <OptimizedImage
          src={category.image}
          alt={title}
          className="w-full h-full"
          imgClassName="group-hover:scale-[1.04] transition-transform duration-700 ease-out brightness-90 saturate-95 group-hover:brightness-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Subtle decorative grid/line mesh over category image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a141b] via-[#0a141b]/20 to-transparent mix-blend-multiply opacity-80" />
        
        {/* Category Badge Indicator representing pure agricultural origin */}
        <span className="absolute top-4 left-4 bg-[#0a141b]/90 text-luxury-gold border border-luxury-gold/30 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center space-x-1">
          <Sparkles className="w-3 h-3 animate-pulse text-luxury-gold" />
          <span>{title}</span>
        </span>
      </div>

      {/* Main Metadata Information */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3 text-left">
          <h3 className="font-serif text-xl sm:text-2xl text-white group-hover:text-luxury-gold transition-colors font-semibold tracking-wide">
            {title}
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed font-sans line-clamp-3">
            {description}
          </p>
        </div>

        <div className="pt-5 border-t border-luxury-gold/10 flex items-center justify-between">
          <div className="space-y-1 text-left">
            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block">
              {t.product.extendedCatalogue || "EXTENDED CATALOGUE"}
            </span>
            <span className="text-[10px] font-mono font-bold text-luxury-gold uppercase tracking-wider">
              {category.products.length} {t.product.premiumItems || "Premium Items"}
            </span>
          </div>
          <button
            onClick={() => onOpenModal(category)}
            className="cursor-pointer group/btn inline-flex items-center space-x-1.5 px-4.5 py-2.5 border border-luxury-gold bg-luxury-gold/5 text-[10px] font-mono uppercase tracking-widest text-luxury-gold hover:bg-luxury-gold hover:text-luxury-blue-deep transition-all duration-300 rounded"
          >
            <span>{t.product.viewProducts || "View Products"}</span>
            <ChevronRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryCard;
