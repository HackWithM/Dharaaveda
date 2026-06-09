import React, { useState } from "react";
import { X, Send, CheckCircle, Loader } from "lucide-react";
import { Product } from "../types";
import { api } from "../lib/api";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";

interface InquiryModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function InquiryModal({ product, onClose }: InquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { lang } = useLanguage();
  const t = staticTranslations[lang] || staticTranslations.en;

  if (!product) return null;

  const pTrans = t.products?.items?.[product.id];
  const productName = pTrans?.name || product.name;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !quantity) {
      setError(t.product.inquiryErrorFields || "Please fill out all mandatory fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.createInquiry({
        name,
        email,
        phone,
        company,
        productName: productName,
        quantity,
        message: message || `Trade request inquiring about premium product ${productName}, min order specs.`
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit trading inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div 
        id="inquiry-modal"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl glass-panel-dark p-6 sm:p-8"
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 -mr-16 -mt-16 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-left">
            <span className="text-[10px] font-mono tracking-[0.3em] text-luxury-gold uppercase block mb-1">
              INT TRADE ENQUIRY
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white">
              {t.product.inquiryRequestQuote || "Request Quotation"}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {t.product.inquiryDirectAccess || "Direct access to our Agricultural Export Desk for"} <span className="text-luxury-gold font-semibold">{productName}</span>.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-luxury-gold/10 border border-luxury-gold animate-bounce">
              <CheckCircle className="w-8 h-8 text-luxury-gold" />
            </div>
            <h4 className="font-serif text-lg text-white">
              {t.product.inquirySuccessTitle || "Quotation Request Logged"}
            </h4>
            <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
              {t.product.inquirySuccessDesc || "Your trade desk ticket has been initialized. A dedicated cargo specialist will review your cargo specifications within 24 standard business hours."}
            </p>
            <button
              onClick={onClose}
              className="cursor-pointer px-6 py-2 border border-luxury-gold text-xs font-mono uppercase tracking-widest text-luxury-gold hover:bg-luxury-gold hover:text-luxury-green-deep transition-all duration-300 rounded"
            >
              {t.product.inquiryCloseWindow || "Close Window"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            {error && (
              <div className="p-3 bg-red-950/40 border border-red-500/20 text-red-300 rounded text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  {t.product.inquiryLabelName || "Full Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.product.inquiryPlaceholderName || "e.g. Elena Rostova"}
                  className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>

              <div className="text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  {t.product.inquiryLabelEmail || "Corporate Email *"}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.product.inquiryPlaceholderEmail || "partner@tradehouse.com"}
                  className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  {t.product.inquiryLabelCompany || "Company / Organization"}
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={t.product.inquiryPlaceholderCompany || "e.g. Hanseatic Spices GmbH"}
                  className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>

              <div className="text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  {t.product.inquiryLabelQuantity || "Target Quantity (e.g. Tons) *"}
                </label>
                <input
                  type="text"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder={t.product.inquiryPlaceholderQuantity || "e.g. 5 Metric Tons"}
                  className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                {t.contact.labelPhone || "Direct Contact Phone"}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+49 40 1234567"
                className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none transition-colors"
              />
            </div>

            <div className="text-left">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                Custom Port Destination / Packing Demands
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.product.inquiryPlaceholderMessage || "Mention specific vacuum-seal requests, harbor ports of choice (e.g. Rotterdam, Hamburg), and phytosanitary certificate needs..."}
                className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-lg px-3 py-2 text-white placeholder-gray-500 outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 cursor-pointer flex items-center justify-center space-x-2 py-3 border border-luxury-gold bg-luxury-gold/10 hover:bg-luxury-gold text-luxury-gold hover:text-luxury-green-deep transition-all duration-300 hover:shadow-lg rounded-xl font-semibold tracking-widest uppercase text-xs"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>{t.product.inquiryLoggingSpecs || "Logging Cargo Specs..."}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t.product.inquirySubmit || "Transmit Inquiry"}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
