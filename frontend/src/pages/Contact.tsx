import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from "lucide-react";
import { api } from "../lib/api";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { lang } = useLanguage();
  const t = staticTranslations[lang] || staticTranslations.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError(t.contact.errorFields || "Please fill out all mandatory fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.createInquiry({
        name,
        email,
        phone,
        message,
        company: "General Consultation"
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to log contact message.");
    } finally {
      setLoading(false);
    }
  };

  const transmissionDescMessage = (t.contact.transmissionDesc || "Your message, {name}, has been processed. A council coordinate advisor from the appropriate division will contact you shortly.")
    .replace("{name}", name);

  return (
    <div className="bg-white text-gray-900 min-h-screen pt-28 pb-20 px-4 font-sans relative">
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Page Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.45em] text-orange-600 font-semibold uppercase block">
            {t.contact.accessLines || "DIRECT ACCESS LINES"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900">
            {t.contact.council || "Contact the DharaAveda Council"}
          </h1>
          <p className="text-xs text-gray-600 leading-relaxed font-light">
            {t.contact.desc || "Whether arranging shipping vessels for bulk spice operations or planning custom clinical healing admissions, our representatives provide elite corporate care."}
          </p>
        </div>

        {/* Info Blocks and Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Corporate and Clinic Details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            {/* Pillar A: Trade Desk */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-slate-50 shadow-sm space-y-4">
              <span className="text-[9px] font-mono tracking-widest text-orange-600 font-semibold uppercase block">
                {t.contact.exportDesk || "EXPORT LOGISTICS DESK"}
              </span>
              <h2 className="font-serif text-xl font-semibold text-gray-900">
                {t.contact.cargoAffairs || "Commodity & Sea Cargo Affairs"}
              </h2>
              
              <div className="space-y-3 text-xs text-gray-700">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span>B 501 Springwood, Near HP Petrol Pump, Mharunji, Pune – 411057, Maharashtra, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>+91 22 8390 1204</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>sales@dharaaveda.com</span>
                </div>
              </div>
            </div>

            {/* Pillar B: Sanctuary */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-slate-50 shadow-sm space-y-4">
              <span className="text-[9px] font-mono tracking-widest text-orange-600 font-semibold uppercase block">
                {t.contact.sanctuaryAdmissions || "SANCTUARY VILLA ADMISSIONS"}
              </span>
              <h2 className="font-serif text-xl font-semibold text-gray-900">
                {t.contact.healingReserves || "Holistic Healing Reserves"}
              </h2>
              
              <div className="space-y-3 text-xs text-gray-700">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span>B 501 Springwood, Near HP Petrol Pump, Mharunji, Pune – 411057, Maharashtra, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>+91 4936 290 831</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>sales@dharaaveda.com</span>
                </div>
              </div>
            </div>

            {/* Trade desk stats */}
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-[10px] font-mono text-gray-600 flex items-center space-x-3">
              <Clock className="w-5 h-5 text-orange-600 shrink-0" />
              <span>{t.contact.responseRate || "Average response rate of commodity contract brokers is 24 business hours."}</span>
            </div>
          </div>

          {/* Dynamic Message Board Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl">
            {success ? (
              <div className="py-12 text-center space-y-5">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 border border-orange-200 animate-bounce">
                  <CheckCircle className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="font-serif text-xl text-gray-900 font-bold">
                  {t.contact.transmissionSealed || "Transmission Sealed"}
                </h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  {transmissionDescMessage}
                </p>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                  }}
                  className="px-6 py-2 border border-orange-500 text-xs font-mono uppercase tracking-widest text-orange-500 hover:bg-orange-500 hover:text-white transition-all rounded-full cursor-pointer"
                >
                  {t.contact.sendAnother || "Send Another Message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs text-gray-600 font-sans">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-center rounded">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="text-left">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-1.5">
                      {t.contact.labelName || "Your Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.contact.placeholderName || "e.g. Heinrich Müller"}
                      className="w-full bg-slate-50 border border-gray-300 focus:border-orange-500 rounded-lg px-3 py-2.5 text-gray-900 outline-none placeholder-gray-400 transition-colors focus:bg-white"
                    />
                  </div>

                  <div className="text-left">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-1.5">
                      {t.contact.labelEmail || "Email Address *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.contact.placeholderEmail || "sales@dharaaveda.com"}
                      className="w-full bg-slate-50 border border-gray-300 focus:border-orange-500 rounded-lg px-3 py-2.5 text-gray-900 outline-none placeholder-gray-400 transition-colors focus:bg-white"
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-1.5">
                    {t.contact.labelPhone || "Direct Contact Phone"}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.contact.placeholderPhone || "+49 40 128459"}
                    className="w-full bg-slate-50 border border-gray-300 focus:border-orange-500 rounded-lg px-3 py-2.5 text-gray-900 outline-none placeholder-gray-400 transition-colors focus:bg-white"
                  />
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-1.5">
                    {t.contact.labelMessage || "Your Inquiries / Requirements *"}
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.placeholderMessage || "Describe your bulk spices cargo requirements, clinical therapy intents, or secure scheduling queries..."}
                    className="w-full bg-slate-50 border border-gray-300 focus:border-orange-500 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 outline-none transition-colors resize-none focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer flex items-center justify-center space-x-2 py-3.5 bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 rounded-xl font-bold tracking-widest uppercase text-xs shadow-md shadow-orange-500/10"
                >
                  {loading ? (
                    <span>{t.contact.transmitting || "Transmitting Dispatch..."}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t.contact.submit || "Transmit Dispatch"}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
