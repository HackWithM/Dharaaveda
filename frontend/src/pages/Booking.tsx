import React, { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles, MapPin, ShieldCheck } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";

const BookingForm = lazy(() => import("../components/BookingForm"));

export default function Booking() {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId") || "";

  const { lang } = useLanguage();
  const t = staticTranslations[lang] || staticTranslations.en;

  return (
    <div className="bg-white text-gray-900 min-h-screen pt-28 pb-20 px-4 font-sans relative">
      <div className="absolute top-0 left-0 w-full h-full bg-radial-[circle_at_top,_var(--color-orange-500)_0%,_transparent_60%] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Visual Info Column */}
        <div className="lg:col-span-4 space-y-6 text-left">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[10px] font-mono text-orange-600 font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.booking.clinic || "HARMONIZATION CLINICS"}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-gray-900 leading-tight">
            {t.booking.sanctuary || "Vibrational Sanctuary"}
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
            {t.booking.desc || "All consultations are conducted in complete secrecy. Our therapists custom formulate remedies to match active stress fields, facilitating physical release and recovery."}
          </p>

          {/* Guidelines */}
          <div className="space-y-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-gray-900">{t.booking.confidential || "Confidential Intake"}</strong><br />
                {t.booking.confidentialDesc || "Your biofields mapping, thermal diagnostics, and case histories remain sealed."}
              </span>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-gray-900">{t.booking.private || "Private Residences"}</strong><br />
                {t.booking.privateDesc || "Chambers are isolated inside our deep Wayanad forest gardens in Kerala, India."}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Booking Scheduler Column */}
        <div className="lg:col-span-8 w-full">
          <Suspense fallback={
            <div className="animate-pulse bg-slate-50 border border-gray-200 rounded-3xl h-[500px] w-full flex flex-col items-center justify-center p-8">
              <div className="w-10 h-10 border border-orange-500/20 rotate-45 flex items-center justify-center mb-4">
                <span className="text-[9px] -rotate-45 font-mono text-orange-500 animate-pulse">DA</span>
              </div>
              <div className="text-orange-500 text-[10px] font-mono tracking-[0.25em] uppercase">
                {t.booking.aligning || "Aligning Aura Diagnostics..."}
              </div>
            </div>
          }>
            <BookingForm preselectedServiceId={serviceId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
