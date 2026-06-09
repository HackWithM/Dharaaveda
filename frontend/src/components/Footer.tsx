import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ShieldCheck, HeartPulse, Award } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const t = (staticTranslations[lang] || staticTranslations["en"]).footer;

  return (
    <footer className="bg-[#050d0a] text-gray-400 border-t border-luxury-gold/15 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Main Column */}
          <div className="space-y-4">
            <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white">
              DHARA<span className="text-luxury-gold">AVEDA</span>
            </span>
            <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-sm">
              {t.desc}
            </p>
            <div className="flex space-x-3 pt-2">
              <span className="p-2 border border-luxury-gold/20 hover:border-luxury-gold/50 rounded-full transition-colors">
                <ShieldCheck className="w-4 h-4 text-luxury-gold" />
              </span>
              <span className="p-2 border border-luxury-gold/20 hover:border-luxury-gold/50 rounded-full transition-colors">
                <HeartPulse className="w-4 h-4 text-luxury-gold" />
              </span>
              <span className="p-2 border border-luxury-gold/20 hover:border-luxury-gold/50 rounded-full transition-colors">
                <Award className="w-4 h-4 text-luxury-gold" />
              </span>
            </div>
          </div>

          {/* Agricultural Export */}
          <div>
            <h3 className="text-white font-serif tracking-[0.15em] text-xs uppercase mb-6 border-b border-luxury-gold/10 pb-2">
              {t.agriTitle}
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link to="/export?category=spices" className="hover:text-luxury-gold transition-colors">
                  {t.agriLink1}
                </Link>
              </li>
              <li>
                <Link to="/export?category=shilajit" className="hover:text-luxury-gold transition-colors">
                  {t.agriLink2}
                </Link>
              </li>
              <li>
                <Link to="/export?category=oils" className="hover:text-luxury-gold transition-colors">
                  {t.agriLink3}
                </Link>
              </li>
              <li>
                <Link to="/export" className="hover:text-luxury-gold transition-colors flex items-center space-x-1">
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
            <h3 className="text-white font-serif tracking-[0.15em] text-xs uppercase mb-6 border-b border-luxury-gold/10 pb-2">
              {t.wellnessTitle}
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link to="/wellness#bach-flower" className="hover:text-luxury-gold transition-colors">
                  {t.wellnessLink1}
                </Link>
              </li>
              <li>
                <Link to="/wellness#reiki" className="hover:text-luxury-gold transition-colors">
                  {t.wellnessLink2}
                </Link>
              </li>
              <li>
                <Link to="/wellness#sound" className="hover:text-luxury-gold transition-colors">
                  {t.wellnessLink3}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-luxury-gold transition-colors">
                  {t.wellnessLink4}
                </Link>
              </li>
            </ul>
          </div>

          {/* Luxury Contact Info */}
          <div>
            <h3 className="text-white font-serif tracking-[0.15em] text-xs uppercase mb-6 border-b border-luxury-gold/10 pb-2">
              {t.corpTitle}
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span>
                  <strong>{t.corpOffice}</strong><br />
                  312 Marine Heights, Ballard Estate, Mumbai, India
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span>
                  <strong>{t.corpSanctuary}</strong><br />
                  Aura Villa, Rosewood Fields, Wayanad, Kerala, India
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>+91 22 8390 1204</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>trade@dharaaveda.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trade Badges */}
        <div className="mt-12 pt-8 border-t border-luxury-gold/10 flex flex-col sm:flex-row justify-between items-center text-xs">
          <div className="flex flex-wrap gap-4 items-center mb-6 sm:mb-0 justify-center">
            <span className="px-2.5 py-1 border border-luxury-gold/20 text-gray-500 font-mono text-[9px] uppercase tracking-widest rounded">
              APEDA CERTIFIED
            </span>
            <span className="px-2.5 py-1 border border-luxury-gold/20 text-gray-500 font-mono text-[9px] uppercase tracking-widest rounded">
              ISO 9001:2015
            </span>
            <span className="px-2.5 py-1 border border-luxury-gold/20 text-gray-500 font-mono text-[9px] uppercase tracking-widest rounded">
              FSSAI STANDARD EXPORT
            </span>
            <span className="px-2.5 py-1 border border-luxury-gold/20 text-gray-500 font-mono text-[9px] uppercase tracking-widest rounded">
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

