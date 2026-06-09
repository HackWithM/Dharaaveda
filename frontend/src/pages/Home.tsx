import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Globe, Heart, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { IMAGES } from "../data/images";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";

interface CountUpStatProps {
  target: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

function CountUpStat({ target, decimals = 0, suffix = "", duration = 1200 }: CountUpStatProps) {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasTriggered = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          startCountUp();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, decimals, suffix, duration]);

  const startCountUp = () => {
    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Smooth custom modern luxury quadratic/cubic ease-out curve
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentProgress = easeOut(percentage);
      const rawValue = startValue + currentProgress * target;

      let formatted: string;
      if (percentage < 1) {
        // Blinking state during high speed run (flickering gold/white brightness transition)
        setIsBlinking(Math.random() > 0.55);
        
        if (decimals > 0) {
          const randomNoise = (Math.random() * 0.9).toFixed(decimals);
          const valueWithNoise = Math.floor(rawValue) + parseFloat(randomNoise);
          formatted = Math.min(valueWithNoise, target).toFixed(decimals);
        } else {
          // Standard integer tumbling
          const randomOffset = Math.floor(Math.random() * 5) - 2;
          const noiseValue = Math.max(0, Math.floor(rawValue) + randomOffset);
          formatted = String(Math.min(noiseValue, target));
        }
      } else {
        formatted = target.toFixed(decimals);
        setIsBlinking(false);
      }

      setDisplayValue(formatted);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <span 
      ref={elementRef} 
      className={`transition-all duration-75 tabular-nums ${
        isBlinking ? "text-[#c5a059] opacity-90 scale-95" : "text-white scale-100"
      } inline-block`}
    >
      {displayValue}
      <span className="text-white/80">{suffix}</span>
    </span>
  );
}

export default function Home() {
  const { lang } = useLanguage();
  const t = (staticTranslations[lang] || staticTranslations["en"]).home;

  return (
    <div className="relative bg-[#050505] text-white min-h-screen overflow-hidden flex flex-col font-sans select-none">
      
      {/* Cinematic Hero Sections (Split) */}
      <div className="flex-grow flex flex-col md:flex-row relative min-h-[calc(100vh-80px)] pt-20">
        
        {/* Left Pane: Export Business */}
        <div className="w-full md:w-1/2 min-h-[450px] md:min-h-0 relative group overflow-hidden border-r border-[#c5a059]/20 flex flex-col justify-end p-8 md:p-16 transition-all duration-700">
          {/* Background image & gradient blends */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 z-0"
            style={{ backgroundImage: `url('${IMAGES.home.exportBg}')` }}
          />
          <div className="absolute inset-0 bg-[#0a2e1f]/85 mix-blend-multiply z-10 transition-colors duration-500 group-hover:bg-[#0a2e1f]/75" />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
          
          <div className="relative z-20 space-y-6 max-w-lg">
            <span className="text-[#c5a059] text-[10px] uppercase tracking-[0.44em] block font-mono font-medium">{t.div1}</span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-normal text-white leading-tight">
              {t.agriTitle}
            </h2>
            
            <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
              {t.agriDesc}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider font-mono text-[#c5a059]">ISO 9001:2015</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider font-mono text-[#c5a059]">Organic Certified</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider font-mono text-white/60">APEDA Standard</span>
            </div>

            <div className="pt-4">
              <Link 
                to="/export"
                className="inline-flex items-center gap-3 text-[10px] md:text-sm font-semibold tracking-widest uppercase text-[#c5a059] hover:text-white transition-colors duration-300 group/btn"
              >
                <span>{t.enterExport}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Pane: Wellness */}
        <div className="w-full md:w-1/2 min-h-[450px] md:min-h-0 relative group overflow-hidden flex flex-col justify-end p-8 md:p-16 text-left md:text-right transition-all duration-700">
           {/* Background image & gradient blends */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 z-0"
            style={{ backgroundImage: `url('${IMAGES.home.therapyBg}')` }}
          />
          <div className="absolute inset-0 bg-[#1a365d]/75 mix-blend-color z-10 transition-colors duration-500 group-hover:bg-[#1a365d]/60" />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/90 via-black/40 to-transparent z-10" />
          
          <div className="relative z-20 space-y-6 max-w-lg md:ml-auto flex flex-col md:items-end">
            <span className="text-[#c5a059] text-[10px] uppercase tracking-[0.44em] block font-mono font-medium">{t.div2}</span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-normal text-white leading-tight">
              {t.wellnessTitle}
            </h2>
            
            <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
              {t.wellnessDesc}
            </p>

            <div className="flex flex-wrap gap-3 pt-2 justify-start md:justify-end">
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider font-mono text-[#c5a059]">Usui Reiki</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider font-mono text-[#c5a059]">Bach Flowers</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider font-mono text-white/60">432Hz Resonance</span>
            </div>

            <div className="pt-4">
              <Link 
                to="/wellness"
                className="inline-flex items-center gap-3 text-[10px] md:text-sm font-semibold tracking-widest uppercase text-[#c5a059] hover:text-white transition-colors duration-300 group/btn"
              >
                <span>{t.exploreTherapies}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Center Brand Mask Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden lg:block text-center select-none">
          <h1 className="text-[120px] xl:text-[140px] font-serif leading-none tracking-tighter text-white/5 font-extrabold">DHARA</h1>
          <h1 className="text-[120px] xl:text-[140px] font-serif leading-none tracking-tighter text-white/5 translate-x-20 -translate-y-10 font-extrabold">AVEDA</h1>
        </div>
      </div>

      {/* Bottom Info Strip */}
      <div className="bg-[#050505] border-t border-white/10 py-6 md:py-0 min-h-[112px] flex flex-col md:flex-row items-center px-6 md:px-12 justify-between z-20 gap-6 md:gap-0">
        <div className="flex flex-wrap gap-8 md:gap-16 w-full md:w-auto justify-around md:justify-start">
          <div className="flex flex-col">
            <span className="text-[#c5a059] text-[9px] uppercase tracking-widest mb-1 font-mono font-medium">{t.inquiryHandling}</span>
            <span className="text-lg md:text-xl font-light tabular-nums text-white flex items-baseline gap-1.5">
              <CountUpStat target={2.4} decimals={1} suffix="k+" />
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">{t.annualDeals}</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#c5a059] text-[9px] uppercase tracking-widest mb-1 font-mono font-medium">{t.wellnessSuccess}</span>
            <span className="text-lg md:text-xl font-light tabular-nums text-white flex items-baseline gap-1.5">
              <CountUpStat target={98.4} decimals={1} suffix="%" />
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">{t.recoveryRate}</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#c5a059] text-[9px] uppercase tracking-widest mb-1 font-mono font-medium">{t.tradePresence}</span>
            <span className="text-lg md:text-xl font-light tabular-nums text-white flex items-baseline gap-1.5 font-serif">
              <CountUpStat target={34} decimals={0} suffix="" />
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">{t.nations}</span>
            </span>
          </div>
        </div>

        {/* Mini Booking Widget */}
        <Link 
          to="/booking"
          className="bg-white/5 hover:bg-white/10 transition-colors p-3.5 border border-white/10 hover:border-luxury-gold/30 backdrop-blur-xl flex items-center gap-6 cursor-pointer max-w-sm w-full md:w-auto rounded-none group"
        >
          <div className="text-left flex-grow">
            <p className="text-[8px] uppercase tracking-widest text-[#c5a059] font-mono font-medium">{t.nextAvailable}</p>
            <p className="text-xs font-semibold text-white tracking-wide">{t.availableSession}</p>
          </div>
          <div className="w-9 h-9 bg-[#c5a059] text-black group-hover:scale-110 transition-transform duration-300 flex items-center justify-center rounded-none shadow-md">
            <span className="font-bold text-center text-xs">+</span>
          </div>
        </Link>
      </div>

      {/* Floating Decorative Ruler Accents */}
      <div className="absolute top-1/4 right-8 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#c5a059]/40 to-transparent pointer-events-none hidden lg:block" />
      <div className="absolute bottom-1/4 left-8 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#c5a059]/40 to-transparent pointer-events-none hidden lg:block" />
      <div 
        className="absolute top-[40%] left-6 text-[8px] uppercase tracking-[0.8em] text-[#c5a059]/20 vertical-rl transform rotate-180 font-mono select-none hidden xl:block pointer-events-none" 
        style={{ writingMode: "vertical-rl" }}
      >
        {t.cinematic}
      </div>
    </div>
  );
}

