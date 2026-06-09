import React, { useState, useEffect } from "react";
import { CalendarRange, Clock, Sparkles, CheckCircle, Mail, User, Phone, BookOpen } from "lucide-react";
import { TherapyService } from "../types";
import { api } from "../lib/api";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";

interface BookingFormProps {
  preselectedServiceId?: string;
  onSuccess?: () => void;
}

export default function BookingForm({ preselectedServiceId = "", onSuccess }: BookingFormProps) {
  const [services, setServices] = useState<TherapyService[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState(preselectedServiceId);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { lang } = useLanguage();
  const t = staticTranslations[lang] || staticTranslations.en;

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await api.getServices();
        setServices(data);
        if (!selectedService && data.length > 0) {
          setSelectedService(data[0].id);
        }
      } catch (err) {
        console.error("Error loading services for booking form:", err);
      }
    }
    loadServices();
  }, []);

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedService(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  const activeService = services.find((s) => s.id === selectedService);
  const activeServiceName = activeService?.translations?.[lang]?.name || activeService?.name || selectedService;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !date || !time || !selectedService) {
      setError(t.booking.errorFields || "Please fill in all required fields marked with *.");
      return;
    }

    setLoading(true);

    try {
      await api.createBooking({
        name,
        email,
        phone,
        service: activeServiceName,
        date,
        time,
        notes: notes || "Standard therapy appointment request.",
      });

      setSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit booking inquiry.");
    } finally {
      setLoading(false);
    }
  };

  const successMessage = (t.booking.successDesc || "Thank you, {name}. Your appointment request for {service} has been logged in our secure sanctuary ledger.")
    .replace("{name}", name)
    .replace("{service}", activeServiceName);

  return (
    <div id="booking-form-card" className="w-full max-w-2xl mx-auto rounded-3xl glass-panel-dark overflow-hidden shadow-2xl relative">
      {/* Visual Ambient Grid */}
      <div className="absolute inset-0 bg-radial-[circle_at_top,_rgba(197,160,89,0.05),_transparent] opacity-50 pointer-events-none" />

      <div className="p-6 sm:p-10 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-luxury-gold/5 border border-luxury-gold/20 mb-3 text-[10px] font-mono uppercase tracking-widest text-luxury-gold">
            <Sparkles className="w-3 h-3" />
            <span>{t.booking.scheduler || "Harmonic Residency Scheduler"}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white">
            {t.booking.title || "Schedule Your Therapy"}
          </h2>
          <p className="text-xs text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
            {t.booking.formDesc || "Reserve custom-blended Bach flower, Reiki alignment, or deep quartz therapeutic sound healing."}
          </p>
        </div>

        {success ? (
          <div className="py-12 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 animate-pulse">
              <CheckCircle className="w-10 h-10 text-luxury-gold" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl text-white">
                {t.booking.successTitle || "Residency Reservation Initiated"}
              </h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                {successMessage}
              </p>
            </div>
            <div className="p-4 bg-luxury-gold/5 border border-luxury-gold/10 rounded-xl max-w-sm mx-auto text-left space-y-2 text-xs">
              <p className="text-gray-400 font-mono text-[10px] uppercase tracking-wider border-b border-luxury-gold/15 pb-1">
                {t.booking.slipTitle || "Requested Session Slip"}
              </p>
              <p className="text-gray-300"><strong className="text-luxury-gold">{t.booking.date || "Date"}:</strong> {date}</p>
              <p className="text-gray-300"><strong className="text-luxury-gold">{t.booking.hour || "Hour"}:</strong> {time}</p>
              <p className="text-gray-400 text-[10px] mt-1 italic">
                {t.booking.note || "Our clinic coordinator will call or email you to finalize the bio-resonance intake files."}
              </p>
            </div>
            <button
              onClick={() => {
                setSuccess(false);
                setName("");
                setEmail("");
                setPhone("");
                setDate("");
                setTime("");
                setNotes("");
              }}
              className="mt-4 px-6 py-2 border border-luxury-gold text-xs font-mono uppercase tracking-widest text-luxury-gold hover:bg-luxury-gold hover:text-luxury-green-deep transition-all rounded-full cursor-pointer"
            >
              {t.booking.anotherBtn || "Book Another Session"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs text-gray-300 font-sans">
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-500/20 text-red-300 rounded text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  {t.booking.labelName || "Your Full Name *"}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-luxury-gold/50" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.booking.placeholderName || "e.g. Heinrich Müller"}
                    className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  {t.booking.labelEmail || "Contact Email Address *"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-luxury-gold/50" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.booking.placeholderEmail || "e.g. heinrich@wellbeing.com"}
                    className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  {t.booking.labelPhone || "Direct Phone *"}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-luxury-gold/50" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.booking.placeholderPhone || "+91 99042 12345"}
                    className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  {t.booking.labelService || "Therapeutic Attunement Service *"}
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 w-4 h-4 text-luxury-gold/50" />
                  <select
                    required
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#0b1a13] border border-luxury-gold/20 focus:border-luxury-gold rounded-xl pl-10 pr-3 py-3 text-white appearance-none outline-none transition-all"
                  >
                    {services.length === 0 ? (
                      <option value="">{t.booking.loadingModalities || "Loading Sacred Modalities..."}</option>
                    ) : (
                      services.map((srv) => {
                        const srvName = srv.translations?.[lang]?.name || srv.name;
                        return (
                          <option key={srv.id} value={srv.id} className="bg-luxury-green text-white">
                            {srvName} ({srv.duration} | {srv.pricing})
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  {t.booking.labelDate || "Intake Residency Date *"}
                </label>
                <div className="relative">
                  <CalendarRange className="absolute left-3 top-3 w-4 h-4 text-luxury-gold/50" />
                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-xl pl-10 pr-3 py-2.5 text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  {t.booking.labelTime || "Preferred Arrival Time *"}
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-4 h-4 text-luxury-gold/50" />
                  <select
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#0b1a13] border border-luxury-gold/20 focus:border-luxury-gold rounded-xl pl-10 pr-3 py-3 text-white appearance-none outline-none transition-all"
                  >
                    <option value="" className="text-gray-500">{t.booking.pickSlot || "Pick Slot..."}</option>
                    <option value="08:00 AM" className="bg-luxury-green">{t.booking.slot1 || "08:00 AM - Sunrise Dew Intake"}</option>
                    <option value="11:00 AM" className="bg-luxury-green">{t.booking.slot2 || "11:00 AM - Solar Zenith Sync"}</option>
                    <option value="02:30 PM" className="bg-luxury-green">{t.booking.slot3 || "02:30 PM - Afternoon Starlight"}</option>
                    <option value="05:30 PM" className="bg-luxury-green">{t.booking.slot4 || "05:30 PM - Wayanad Sunset Calm"}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="text-left">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                {t.booking.labelNotes || "Energetic Symptoms, Stress Triggers or Food Preferences"}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.booking.placeholderNotes || "Mention any physical pain, life blockages, emotional distress patterns, or if you prefer a female/male practitioner..."}
                className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-xl px-3 py-2 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer flex items-center justify-center space-x-2 py-3.5 border border-luxury-gold bg-luxury-gold/15 hover:bg-luxury-gold text-luxury-gold hover:text-[#050d0a] transition-all duration-300 rounded-xl font-bold tracking-widest uppercase text-xs glow-btn-gold"
            >
              {loading ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>{t.booking.submitting || "Submitting Ledger Reservation..."}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.booking.submit || "Attune Booking Ledgers"}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
