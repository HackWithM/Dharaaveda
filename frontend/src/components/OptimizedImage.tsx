import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES } from "../data/images";

// Helper to optimize Unsplash URLs to WebP and specific widths
export function getOptimizedUnsplashUrl(baseurl: string, width?: number, quality = 80): string {
  if (!baseurl) return "";
  if (!baseurl.startsWith("https://images.unsplash.com")) return baseurl;
  try {
    const url = new URL(baseurl);
    url.searchParams.set("fm", "webp");
    url.searchParams.set("q", quality.toString());
    if (width) {
      url.searchParams.set("w", width.toString());
    } else if (!url.searchParams.has("w")) {
      url.searchParams.set("w", "800");
    }
    return url.toString();
  } catch (e) {
    return baseurl;
  }
}

// Helper to construct a standard dynamic srcSet for Unsplash URLs
export function getUnsplashSrcSet(baseurl: string, widths = [320, 640, 960, 1200, 1600], quality = 80): string {
  if (!baseurl || !baseurl.startsWith("https://images.unsplash.com")) return "";
  return widths
    .map((w) => `${getOptimizedUnsplashUrl(baseurl, w, quality)} ${w}w`)
    .join(", ");
}

// Helper to construct local WebP and AVIF responsive srcSet for self-hosted assets
export function getLocalSrcSets(src: string, isPriority = false) {
  if (!src || typeof src !== "string" || !src.startsWith("/images/")) {
    return { avifSrcSet: undefined, webpSrcSet: undefined, cleanSrc: src };
  }

  const queryMatch = src.match(/(\?[^#]*)?(#.*)?$/);
  const queryStr = queryMatch && queryMatch[1] ? queryMatch[1] : "";

  // Strip query parameters and hash fragments cleanly
  const cleanSrc = src.split("?")[0].split("#")[0];
  const lastDot = cleanSrc.lastIndexOf(".");
  if (lastDot === -1) return { avifSrcSet: undefined, webpSrcSet: undefined, cleanSrc };

  const basePath = cleanSrc.substring(0, lastDot);
  const isHeroOrBg =
    cleanSrc.includes("/backgrounds/") ||
    cleanSrc.includes("/hero/") ||
    cleanSrc.includes("heroBg") ||
    cleanSrc.includes("heroAtmosphere");

  // AVIF srcSet ONLY for hero/background assets that have .avif files
  const avifSrcSet = isHeroOrBg
    ? `${basePath}-hero.avif${queryStr} 1200w, ${basePath}.avif${queryStr} 800w`
    : undefined;

  // WebP srcSet with responsive sizes (-thumb 200w, -card 600w, master 1200w)
  const webpSrcSet = isPriority || isHeroOrBg
    ? `${basePath}-hero.webp${queryStr} 1200w, ${basePath}-card.webp${queryStr} 600w, ${basePath}-thumb.webp${queryStr} 200w, ${cleanSrc}${queryStr} 1200w`
    : `${basePath}-card.webp${queryStr} 600w, ${basePath}-thumb.webp${queryStr} 200w, ${cleanSrc}${queryStr} 800w`;

  return { avifSrcSet, webpSrcSet, cleanSrc };
}

export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  widths?: number[];
  priority?: boolean;
  fallback?: string;
  quality?: number;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  widths = [320, 640, 960, 1200],
  priority = false,
  fallback = IMAGES.export.productFallback,
  quality = 80,
  width,
  height,
  aspectRatio,
  loading,
  fetchPriority,
  decoding,
  ...rest
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(priority);
    setHasError(false);
  }, [src, priority]);

  const isUnsplash = src && typeof src === "string" && src.startsWith("https://images.unsplash.com");
  const isLocalImage = src && typeof src === "string" && src.startsWith("/images/");

  const { avifSrcSet, webpSrcSet, cleanSrc } = !hasError && isLocalImage
    ? getLocalSrcSets(src, priority)
    : { avifSrcSet: undefined, webpSrcSet: undefined, cleanSrc: src };

  // Determine actual image source
  const finalSrc = hasError
    ? fallback
    : isUnsplash
    ? getOptimizedUnsplashUrl(src, undefined, quality)
    : cleanSrc || src;

  // SrcSet resolution
  const unsplashSrcSet = !hasError && isUnsplash ? getUnsplashSrcSet(src, widths, quality) : undefined;

  // Production Loading Strategy
  const computedLoading = loading || (priority ? "eager" : "lazy");
  const computedFetchPriority = fetchPriority || (priority ? "high" : "auto");
  const computedDecoding = decoding || "async";

  const hasPositionClass = /\b(absolute|relative|fixed|sticky|static)\b/.test(className);
  const positionClass = hasPositionClass ? "" : "relative";

  const containerStyle: React.CSSProperties = {
    ...(aspectRatio ? { aspectRatio } : {}),
  };

  return (
    <div
      className={`${positionClass} overflow-hidden ${className}`}
      style={containerStyle}
    >
      {/* Premium Shimmer Skeleton Loader */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-slate-100/80 dark:bg-neutral-900/80 flex items-center justify-center z-10 pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/50 dark:via-neutral-800/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            <div className="w-7 h-7 rounded-full border border-orange-500/20 flex items-center justify-center animate-pulse">
              <span className="text-[7px] font-mono text-orange-500/60 tracking-widest scale-90">DA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <picture className="contents">
        {/* Modern Next-Gen AVIF Format (Only for assets where AVIF files exist) */}
        {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />}

        {/* WebP Format */}
        {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}

        {/* Standard Img Tag Fallback */}
        <img
          src={finalSrc}
          srcSet={unsplashSrcSet}
          sizes={isUnsplash ? sizes : undefined}
          alt={alt}
          width={width}
          height={height}
          loading={computedLoading}
          fetchPriority={computedFetchPriority}
          decoding={computedDecoding}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            if (!hasError) {
              setHasError(true);
              setIsLoaded(true);
            }
          }}
          className={`w-full h-full object-cover ${imgClassName} ${
            priority
              ? "opacity-100 scale-100 filter brightness-100"
              : `transition-all duration-700 ease-out ${
                  isLoaded ? "opacity-100 scale-100 filter brightness-100" : "opacity-0 scale-[1.02] filter blur-[3px]"
                }`
          }`}
          {...rest}
        />
      </picture>
    </div>
  );
}
