import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Lock, Globe, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";


const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "zh", name: "Chinese - Simplified", nativeName: "简体中文" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
  { code: "th", name: "Thai", nativeName: "ไทย" },
  { code: "pl", name: "Polish", nativeName: "Polski" }
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const isWellnessActive = location.pathname.includes("/wellness");

  const { lang, setLang } = useLanguage();
  const t = staticTranslations[lang] || staticTranslations.en;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY >= 100;
          setScrolled((prev) => {
            if (prev !== isScrolled) {
              return isScrolled;
            }
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isAdmin = location.pathname.startsWith("/admin") && location.pathname !== "/admin/login";

  // Navigation Links mapping (Therapy maps to wellness)
  const navLinks = [
    { name: t.navbar.home || "Home", path: "/" },
    { name: t.navbar.export || "Export", path: "/export" },
    { name: t.navbar.therapy || "Therapy", path: "/wellness" },
    { name: t.navbar.contact || "Contact", path: "/contact" },
  ];

  // Optimization: dynamic import preloader triggered on user intent
  const handlePrefetch = (path: string) => {
    switch (path) {
      case "/":
        import("../pages/Home").catch(() => {});
        break;
      case "/export":
        import("../pages/Export").catch(() => {});
        break;
      case "/wellness":
        import("../pages/Wellness").catch(() => {});
        break;
      case "/contact":
        import("../pages/Contact").catch(() => {});
        break;
      case "/booking":
        Promise.all([
          import("../pages/Booking"),
          import("./BookingForm")
        ]).catch(() => {});
        break;
      case "/admin":
        import("../pages/AdminDashboard").catch(() => {});
        break;
      default:
        break;
    }
  };

  const filteredLanguages = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentLanguageName = LANGUAGES.find(l => l.code === lang)?.nativeName || "English";

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out pointer-events-none ${
        scrolled 
          ? "top-3 sm:top-4 w-[calc(100%-2rem)] max-w-5xl scale-[0.98]" 
          : "top-0 pt-4 sm:pt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8 scale-100"
      }`}
    >
      <nav
        className={`w-full pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
          scrolled
            ? "py-2 sm:py-2.5 px-6 sm:px-8 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-full"
            : "py-4 sm:py-6 px-0 bg-transparent border-transparent shadow-none backdrop-blur-none rounded-none"
        }`}
      >
        {/* Left Side: Brand Logo and Name */}
        <Link 
          to="/" 
          onMouseEnter={() => handlePrefetch("/")}
          onFocus={() => handlePrefetch("/")}
          onTouchStart={() => handlePrefetch("/")}
          className="flex items-center gap-3 select-none group pointer-events-auto"
        >
          <img 
            src="/images/logo/logo.png" 
            alt="Dharaaveda Logo" 
            className="w-14 h-14 object-contain select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
          />
          <div className="flex flex-col text-left">
            <span className={`text-[14px] sm:text-[16px] font-light tracking-[0.25em] uppercase text-gray-900 leading-tight ${isWellnessActive ? "group-hover:text-therapy-500" : "group-hover:text-orange-500"} transition-colors duration-300`}>
              Dhara<span className={isWellnessActive ? "text-therapy-500 font-semibold" : "text-orange-500 font-semibold"}>Aveda</span>
            </span>
            <span className="text-[7.5px] font-mono tracking-[0.2em] uppercase text-gray-500 -mt-0.5 whitespace-nowrap hidden xs:block">
              {t.navbar.subTitle || "Agriculture & Aura Clinic"}
            </span>
          </div>
        </Link>

        {/* Center: Luxury Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100/80 p-1 rounded-full border border-gray-200/50">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => handlePrefetch(link.path)}
                onFocus={() => handlePrefetch(link.path)}
                onTouchStart={() => handlePrefetch(link.path)}
                className={`px-4 sm:px-5 py-2 text-[10px] font-semibold tracking-[0.22em] uppercase rounded-full transition-all duration-300 ease-out relative ${
                  isActive
                    ? (isWellnessActive ? "bg-therapy-500 text-white shadow-md shadow-therapy-500/20 font-bold" : "bg-orange-500 text-white shadow-md shadow-orange-500/20 font-bold")
                    : `text-gray-600 hover:scale-[1.03] ${isWellnessActive ? "hover:text-therapy-500" : "hover:text-orange-500"}`
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Primary CTA & Admin lock trigger */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Selector Dropdown */}
          <div className="relative pointer-events-auto">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-300 text-[9px] font-bold font-mono tracking-widest uppercase rounded-full border border-gray-200 cursor-pointer"
            >
              <Globe className={`w-3.5 h-3.5 ${isWellnessActive ? "text-therapy-500" : "text-orange-500"}`} />
              <span>{currentLanguageName}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${langDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <>
                  {/* Backdrop overlay to close when clicking outside */}
                  <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute ${lang === "ar" ? "left-0" : "right-0"} top-full mt-2 w-64 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl p-3 shadow-2xl z-50 text-gray-900 font-sans`}
                  >
                    <div className="relative mb-2">
                      <Search className={`absolute ${lang === "ar" ? "right-3" : "left-3"} top-2.5 h-3.5 w-3.5 text-gray-400`} />
                      <input
                        type="text"
                        placeholder={t.navbar.searchPlaceholder || "Search language..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full bg-gray-50 border border-gray-200 ${isWellnessActive ? "focus:border-therapy-500/50" : "focus:border-orange-500/50"} rounded-xl py-1.5 ${lang === "ar" ? "pr-9 pl-4 text-right" : "pl-9 pr-4 text-left"} text-xs text-gray-900 placeholder-gray-400 focus:outline-none transition-colors`}
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 space-y-1">
                      {filteredLanguages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLang(l.code);
                            setLangDropdownOpen(false);
                            setSearchQuery("");
                          }}
                          className={`w-full ${lang === "ar" ? "text-right flex-row-reverse" : "text-left"} flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                            lang === l.code
                              ? (isWellnessActive ? "bg-therapy-50 text-therapy-600 border border-therapy-200 font-bold" : "bg-orange-50 text-orange-600 border border-orange-200 font-bold")
                              : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          <span>{l.nativeName}</span>
                          <span className="text-[10px] text-gray-400">{l.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Admin Toggle Panel */}
          <Link
            to="/admin"
            onMouseEnter={() => handlePrefetch("/admin")}
            onFocus={() => handlePrefetch("/admin")}
            onTouchStart={() => handlePrefetch("/admin")}
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-300 text-[9px] font-bold font-mono tracking-widest uppercase rounded-full border border-gray-200 pointer-events-auto"
            title="Administrator Control Board"
          >
            <Lock className={`w-3 h-3 ${isWellnessActive ? "text-therapy-500" : "text-orange-500"}`} />
            <span>{isAdmin ? (t.navbar.console || "Console") : (t.navbar.admin || "Admin")}</span>
          </Link>
        </div>

        {/* Mobile Menu Action button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`inline-flex items-center justify-center p-2 rounded-full text-gray-600 ${isWellnessActive ? "hover:text-therapy-500" : "hover:text-orange-500"} bg-gray-50 hover:bg-gray-100 border border-gray-200 focus:outline-none transition-all cursor-pointer`}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Toggle navigation scope</span>
            {mobileMenuOpen ? (
              <X className={`block h-4.5 w-4.5 ${isWellnessActive ? "text-therapy-500" : "text-orange-500"}`} />
            ) : (
              <Menu className="block h-4.5 w-4.5 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Glass Dropdown Drawer container */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-[calc(100%+0.75rem)] left-0 right-0 w-full bg-white/95 backdrop-blur-2xl border border-gray-200 rounded-3xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] space-y-3 z-50 flex flex-col items-center justify-center text-center font-sans"
            >
              <div className="flex flex-col w-full space-y-2 font-sans">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onMouseEnter={() => handlePrefetch(link.path)}
                      onFocus={() => handlePrefetch(link.path)}
                      onTouchStart={() => handlePrefetch(link.path)}
                      className={`block py-3 rounded-2xl text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 ${
                        isActive 
                          ? (isWellnessActive ? "bg-therapy-500 text-white font-bold shadow-md shadow-therapy-500/10" : "bg-orange-500 text-white font-bold shadow-md shadow-orange-500/10") 
                          : `text-gray-700 hover:text-gray-900 hover:bg-gray-50 ${isWellnessActive ? "hover:text-therapy-500" : "hover:text-orange-500"}`
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile primary actionable integrations */}
              <div className="pt-3 border-t border-gray-200 w-full flex flex-col gap-2.5">
                {/* Mobile Language Selector */}
                <div className="w-full flex flex-col gap-2 p-2 bg-gray-50 border border-gray-200 rounded-2xl">
                  <div className="flex items-center justify-between px-2 text-[10px] font-bold text-gray-400 tracking-wider font-mono">
                    <span>{t.navbar.selectLanguage || "Select Sacred Language"}</span>
                    <Globe className={`w-3.5 h-3.5 ${isWellnessActive ? "text-therapy-500" : "text-orange-500"} animate-pulse`} />
                  </div>
                  
                  {/* Quick Select Grid for Mobile */}
                  <div className="grid grid-cols-2 gap-1 max-h-40 overflow-y-auto p-1 scrollbar-none">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setMobileMenuOpen(false);
                        }}
                        className={`px-3 py-2 text-[10px] font-medium rounded-xl text-center transition-all ${
                          lang === l.code
                            ? (isWellnessActive ? "bg-therapy-500 text-white font-bold" : "bg-orange-500 text-white font-bold")
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {l.nativeName}
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  to="/admin"
                  onMouseEnter={() => handlePrefetch("/admin")}
                  onFocus={() => handlePrefetch("/admin")}
                  onTouchStart={() => handlePrefetch("/admin")}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gray-50 border border-gray-200 text-center text-xs font-semibold font-mono tracking-widest uppercase text-gray-700 hover:text-gray-900"
                >
                  <Lock className={`w-3.5 h-3.5 ${isWellnessActive ? "text-therapy-500" : "text-orange-500"}`} />
                  <span>{t.navbar.console || "Console"} Panel</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
