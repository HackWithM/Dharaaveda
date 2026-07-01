import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";
import { EMAIL_TO, PHONE_NUMBER } from "../lib/constants";

export default function Footer() {
  const { lang } = useLanguage();
  const t = (staticTranslations[lang] || staticTranslations["en"]).footer;

  return (
    <footer className="bg-[#0c0c0c] text-gray-400 border-t border-orange-500/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Main Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo/logo.png" 
                alt="Dharaaveda Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white">
                DHARA<span className="text-orange-500">AVEDA</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-sm">
              {t.desc}
            </p>
            <div className="flex space-x-3 pt-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/pure_bachhealing?utm_source=qr&igsh=MWU0cG5zc25mY3R4Yg=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 border border-orange-500/20 hover:border-orange-500/50 rounded-full transition-colors"
              >
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 border border-orange-500/20 hover:border-orange-500/50 rounded-full transition-colors"
              >
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* X (Twitter) */}
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="p-2 border border-orange-500/20 hover:border-orange-500/50 rounded-full transition-colors"
              >
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Agricultural Export */}
          <div>
            <h3 className="text-white font-serif tracking-[0.15em] text-xs uppercase mb-6 border-b border-orange-500/10 pb-2">
              {t.agriTitle}
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link to="/export?category=spices" className="hover:text-orange-500 transition-colors">
                  {t.agriLink1}
                </Link>
              </li>
              <li>
                <Link to="/export?category=shilajit" className="hover:text-orange-500 transition-colors">
                  {t.agriLink2}
                </Link>
              </li>
              <li>
                <Link to="/export?category=oils" className="hover:text-orange-500 transition-colors">
                  {t.agriLink3}
                </Link>
              </li>
              <li>
                <Link to="/export" className="hover:text-orange-500 transition-colors flex items-center space-x-1">
                  <span>{t.agriLink4}</span>
                </Link>
              </li>
              <li>
                <span className="text-[10px] uppercase tracking-wider text-green-500 font-mono">
                  {t.agriStatus}
                </span>
              </li>
            </ul>
          </div>

          {/* Holistic Therapies */}
          <div>
            <h3 className="text-white font-serif tracking-[0.15em] text-xs uppercase mb-6 border-b border-orange-500/10 pb-2">
              {t.wellnessTitle}
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link to="/wellness#bach-flower" className="hover:text-orange-500 transition-colors">
                  {t.wellnessLink1}
                </Link>
              </li>
              <li>
                <Link to="/wellness#reiki" className="hover:text-orange-500 transition-colors">
                  {t.wellnessLink2}
                </Link>
              </li>
              <li>
                <Link to="/wellness#sound" className="hover:text-orange-500 transition-colors">
                  {t.wellnessLink3}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-orange-500 transition-colors">
                  {t.wellnessLink4}
                </Link>
              </li>
            </ul>
          </div>

          {/* Luxury Contact Info */}
          <div>
            <h3 className="text-white font-serif tracking-[0.15em] text-xs uppercase mb-6 border-b border-orange-500/10 pb-2">
              {t.corpTitle}
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  <strong>{t.corpOffice}</strong><br />
                  B 501 Springwood, Near HP Petrol Pump, Mharunji, Pune – 411057, Maharashtra, India
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  <strong>{t.corpSanctuary}</strong><br />
                  B 501 Springwood, Near HP Petrol Pump, Mharunji, Pune – 411057, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{PHONE_NUMBER}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{EMAIL_TO}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trade Badges */}
        <div className="mt-12 pt-8 border-t border-orange-500/10 flex flex-col sm:flex-row justify-between items-center text-xs">
          <div className="flex flex-wrap gap-4 items-center mb-6 sm:mb-0 justify-center">
            <span className="px-2.5 py-1 border border-orange-500/20 text-gray-500 font-mono text-[9px] uppercase tracking-widest rounded">
              APEDA CERTIFIED
            </span>
            <span className="px-2.5 py-1 border border-orange-500/20 text-gray-500 font-mono text-[9px] uppercase tracking-widest rounded">
              ISO 9001:2015
            </span>
            <span className="px-2.5 py-1 border border-orange-500/20 text-gray-500 font-mono text-[9px] uppercase tracking-widest rounded">
              FSSAI STANDARD EXPORT
            </span>
            <span className="px-2.5 py-1 border border-orange-500/20 text-gray-500 font-mono text-[9px] uppercase tracking-widest rounded">
              USDA ORGANIC compliant
            </span>
          </div>
          <div className="text-center sm:text-right font-mono text-[10px] text-gray-500">
            &copy; {new Date().getFullYear()} DharaAveda Luxury Ltd. {t.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}

