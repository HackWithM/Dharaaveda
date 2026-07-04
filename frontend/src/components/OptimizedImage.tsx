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
      url.searchParams.set("w", "800"); // default width if none specified
    }
    return url.toString();
  } catch (e) {
    return baseurl;
  }
}

// Helper to construct a standard dynamic srcSet for responsive scaling
export function getUnsplashSrcSet(baseurl: string, widths = [320, 640, 960, 1200, 1600], quality = 80): string {
  if (!baseurl || !baseurl.startsWith("https://images.unsplash.com")) return "";
  return widths
    .map((w) => `${getOptimizedUnsplashUrl(baseurl, w, quality)} ${w}w`)
    .join(", ");
}

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  widths?: number[];
  priority?: boolean;
  fallback?: string;
  quality?: number;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  widths = [320, 640, 960, 1200],
  priority = false,
  fallback = IMAGES.therapy.heroBg, // Default beautiful wellness fallback
  quality = 80,
  ...rest
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);

  // Reset status when source changes
  useEffect(() => {
    setIsLoaded(priority);
    setHasError(false);
  }, [src, priority]);

  const isUnsplash = src && src.startsWith("https://images.unsplash.com");

  // Determine actual source and srcset
  const finalSrc = hasError
    ? fallback
    : isUnsplash
    ? getOptimizedUnsplashUrl(src, undefined, quality)
    : src;

  const srcSet = !hasError && isUnsplash
    ? getUnsplashSrcSet(src, widths, quality)
    : undefined;

  const hasPositionClass = /\b(absolute|relative|fixed|sticky|static)\b/.test(className);
  const positionClass = hasPositionClass ? "" : "relative";

  return (
    <div className={`${positionClass} overflow-hidden ${className}`}>
      {/* Premium shimmer skeleton loader */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-slate-100 flex items-center justify-center z-10"
          >
            {/* Shimmer gradient line animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/60 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            {/* Elegant logo mark in loading state */}
            <div className="w-8 h-8 rounded-full border border-orange-500/20 flex items-center justify-center animate-pulse">
              <span className="text-[7px] font-mono text-orange-500/50 tracking-widest scale-90">DA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <img
        src={finalSrc}
        srcSet={srcSet}
        sizes={isUnsplash ? sizes : undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          console.error("OptimizedImage load failed for src:", src, e);
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover ${imgClassName} ${
          priority
            ? "opacity-100 scale-100 filter brightness-100"
            : `transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 scale-100 filter brightness-100" : "opacity-0 scale-[1.03] filter blur-[4px]"
              }`
        }`}
        {...rest}
      />
    </div>
  );
}
