import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Sparkles, CalendarRange, CheckCircle2, ChevronRight, MessageSquare, Quote, Star, Compass, Play, Instagram, MessageCircle, Eye, X, Globe, ChevronDown, RefreshCw } from "lucide-react";
import { TherapyService, Testimonial, AboutVikranti, ScreenshotReview } from "../types";
import { api } from "../lib/api";
import { staticTranslations, LanguageCode } from "../lib/translations";
import { useLanguage } from "../lib/LanguageContext";
import { IMAGES } from "../data/images";
import OptimizedImage from "../components/OptimizedImage";

const BookingForm = lazy(() => import("../components/BookingForm"));

export default function Wellness() {
  const [services, setServices] = useState<TherapyService[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedServiceForStory, setSelectedServiceForStory] = useState<TherapyService | null>(null);
  const [aboutVikranti, setAboutVikranti] = useState<AboutVikranti | null>(null);
  const [screenshotReviews, setScreenshotReviews] = useState<ScreenshotReview[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Booking Form modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState("");
  
  // Review submission modal states
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    rating: 5,
    content: "",
    image: IMAGES.avatars.lotus as string,
  });

  const { lang } = useLanguage();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Prevent background scroll when booking modal is open
  useEffect(() => {
    if (isBookingModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isBookingModalOpen]);

  const rootT = staticTranslations[lang] || staticTranslations.en;
  const t = {
    ...rootT.wellness,
    booking: rootT.booking,
    wellness: rootT.wellness
  } as any;

  async function loadWellnessData() {
    try {
      setLoading(true);
      const [srvData, testData, aboutData, reviewsData] = await Promise.all([
        api.getServices(),
        api.getTestimonials(),
        api.getAboutVikranti().catch(() => null),
        api.getScreenshotReviews().catch(() => []),
      ]);
      setServices(srvData);
      setTestimonials(testData.filter((t) => t.type === "wellness" && (t.approved === undefined || t.approved === true)));
      setAboutVikranti(aboutData);
      setScreenshotReviews(reviewsData);
      if (srvData.length > 0) {
        setSelectedServiceForStory(srvData[0]);
      }
    } catch (err) {
      console.error("Error loading wellness division elements:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWellnessData();

    // Dynamically preload above-the-fold critical hero images for the Wellness page
    const criticalImages = [
      IMAGES.therapy.heroBg,
      IMAGES.therapy.heroAtmosphere
    ];
    const linkElements: HTMLLinkElement[] = [];

    criticalImages.forEach((url) => {
      if (url) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = url;
        document.head.appendChild(link);
        linkElements.push(link);
      }
    });

    return () => {
      linkElements.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError("");
    
    if (!formData.name.trim()) {
      setReviewError(t.wellness.reviewErrorName || "Full Name is required");
      return;
    }
    if (!formData.content.trim()) {
      setReviewError(t.wellness.reviewErrorContent || "Review Message is required");
      return;
    }
    if (formData.rating < 1 || formData.rating > 5) {
      setReviewError(t.wellness.reviewErrorRating || "Rating must be between 1 and 5 stars");
      return;
    }

    try {
      setSubmittingReview(true);
      
      // Determine final "role" to display or custom formatting
      const finalRole = formData.city.trim() 
        ? `${formData.city.trim()}`
        : (t.wellness.reviewTitleDefault || "Wellness Visitor");

      await api.createTestimonial({
        name: formData.name.trim(),
        role: finalRole,
        city: formData.city.trim(),
        content: formData.content.trim(),
        image: formData.image,
        rating: formData.rating,
        type: "wellness",
        approved: false // Default to unapproved until admin reviews
      });

      setSubmitSuccess(true);
      // Wait a moment, then load to verify (though user is unapproved, let database refresh)
      loadWellnessData();
    } catch (err: any) {
      setReviewError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen pt-24 font-sans relative">
      {/* Absolute Ambient elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-therapy-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-therapy-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Action Button (CTA) requested on Wellness section to scroll or go to Booking */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setBookingServiceId("");
            setIsBookingModalOpen(true);
          }}
          id="floating-booking-btn"
          className="cursor-pointer flex items-center space-x-2 px-6 py-3.5 bg-therapy-500 text-white hover:bg-therapy-600 rounded-full font-bold uppercase tracking-wider text-xs shadow-2xl transition-all hover:scale-105 active:scale-95 duration-300 pointer-events-auto hover:shadow-therapy-500/20"
        >
          <CalendarRange className="w-4 h-4" />
          <span>{t.floatingCTAText}</span>
        </button>
      </div>

      {/* 1. EMOTIONAL STORYTELLING HERO */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-slate-50 to-white border-b border-gray-200">
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-5 pointer-events-none" 
          style={{ backgroundImage: `url('${IMAGES.therapy.heroBg}')` }}
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-therapy-50 border border-therapy-200 text-[10px] font-mono uppercase tracking-widest text-therapy-600 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-therapy-500" />
              <span>{t.heroBadge}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl tracking-wide text-gray-900 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-lg font-light">
              {t.heroDesc}
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#wellness-modalities"
                className="px-6 py-3 border border-therapy-500 text-xs font-semibold tracking-widest uppercase text-therapy-500 hover:bg-therapy-50 transition-all rounded-full text-center"
              >
                {t.heroExploreBtn}
              </a>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-gray-200 h-[340px] shadow-2xl">
            <OptimizedImage
              src={IMAGES.therapy.heroAtmosphere}
              alt="Luxury Meditation Atmosphere"
              className="w-full h-full filter brightness-95"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={true}
            />
            {/* Glowing orb visual representing Reiki life force */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-therapy-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC SERVICE LOADING & HEALING TIMELINE */}
      <section id="wellness-modalities" className="py-24 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-therapy-600 font-bold">{t.modalitiesBadge}</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-gray-900">{t.modalitiesTitle}</h2>
            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed text-center">
              {t.modalitiesDesc}
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 border-2 border-therapy-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-mono tracking-wider text-gray-400">{t.modalityNoServices}</p>
            </div>
          ) : (
            <div className="space-y-24">
              {services.map((srv, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={srv.id}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-gray-200 pt-16 ${
                      srv.id === "bach-flower" ? "border-t-0 pt-0" : ""
                    }`}
                  >
                    {/* Visual Media Block */}
                    <div className={`lg:col-span-12 xl:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      <div className="relative rounded-3xl overflow-hidden border border-gray-200 h-[340px] shadow-2xl group">
                        <OptimizedImage
                          src={srv.image || IMAGES.therapy.bachFlowerService}
                          alt={srv.translations?.[lang]?.name || srv.name}
                          className="w-full h-full"
                          imgClassName="filter brightness-95 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1200px) 100vw, 40vw"
                          priority={idx === 0}
                        />
                        {/* Shadow over card */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-left">
                          <span className="text-[10px] font-mono text-therapy-400 tracking-widest uppercase block mb-1 font-bold">
                            {srv.translations?.[lang]?.category || srv.category}
                          </span>
                          <p className="text-sm font-semibold text-white">{srv.duration} | {srv.pricing}</p>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Story & Session Timeline Columns */}
                    <div className={`lg:col-span-12 xl:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"} space-y-6`}>
                      <span className="text-[10px] font-mono tracking-[0.3em] text-therapy-600 uppercase block font-bold text-left">
                        {lang === "mr" ? "उपचार पद्धती" : lang === "hi" ? "चिकित्सा पद्धति" : "MODALITY RESIDENCE"} {idx + 1}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-gray-900 font-semibold text-left">
                        {srv.translations?.[lang]?.name || srv.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-light text-left">
                        {srv.translations?.[lang]?.story || srv.translations?.[lang]?.description || srv.story || srv.description}
                      </p>

                      {/* Benefits Tag Pills */}
                      <div className="flex flex-wrap gap-2.5 pt-2">
                        {(srv.translations?.[lang]?.benefits || srv.benefits).map((ben, n) => (
                          <span
                            key={n}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-therapy-100 bg-therapy-50 text-[10px] text-therapy-700 font-sans font-bold"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-therapy-500" />
                            <span>{ben}</span>
                          </span>
                        ))}
                      </div>

                      {/* Healing Timeline / Detailed consultation steps */}
                      {srv.timeline && srv.timeline.length > 0 && (
                        <div className="pt-6 space-y-4 border-t border-gray-200">
                          <p className="text-[10px] font-mono uppercase tracking-wider text-therapy-600 font-bold text-left">
                            {t.modalityTimelineTitle}
                          </p>
                          <div className="relative pl-6 border-l border-gray-200 space-y-6 text-left">
                            {(srv.translations?.[lang]?.timeline || srv.timeline).map((step, sIdx) => (
                              <div key={sIdx} className="relative text-xs">
                                {/* Dot */}
                                <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-therapy-500 ring-4 ring-white" />
                                <h4 className="font-bold text-gray-900 tracking-wide">{step.title}</h4>
                                <p className="text-gray-500 mt-1">{step.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 flex">
                        <button
                          onClick={() => {
                            setBookingServiceId(srv.id);
                            setIsBookingModalOpen(true);
                          }}
                          className="cursor-pointer inline-flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-therapy-600 hover:text-white transition-all border border-therapy-200 hover:border-transparent px-6 py-3 rounded-full bg-therapy-50/55 hover:bg-therapy-500 shadow-sm"
                        >
                          <span>
                            {srv.id === "bach-flower" 
                              ? "Book Consultation" 
                              : srv.id === "reiki-aurasoma" 
                              ? "Schedule Healing Session" 
                              : "Request Appointment"}
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. TESTIMONIAL GALLERY */}
      <section className="py-24 px-4 bg-[#f8fafc] border-t border-b border-gray-200 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-therapy-600 font-bold">{t.testimonialsBadge}</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-gray-900">{t.testimonialsTitle}</h2>
            <div className="w-12 h-[1.5px] bg-therapy-500 mx-auto mt-4" />
          </div>

          {/* Average Rating & Write a Review Prominent Callout Card */}
          <div className="bg-white border border-gray-200 shadow-md p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-6">
              <div className="bg-therapy-50 border border-therapy-200 p-4 rounded-xl text-center min-w-[100px] flex flex-col items-center justify-center">
                <span className="text-3xl font-serif text-therapy-600 font-bold">
                  {testimonials.length > 0 
                    ? (testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length).toFixed(1) 
                    : "5.0"}
                </span>
                <div className="flex justify-center gap-0.5 mt-1.5">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const avgVal = testimonials.length > 0
                      ? Math.round(testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length)
                      : 5;
                    return (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < avgVal
                            ? "fill-therapy-500 text-therapy-500"
                            : "text-gray-200"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-serif text-lg text-gray-900 font-medium">
                  {lang === "en" ? "Attuned Satisfaction Rating" : lang === "mr" ? "संतुष्ट हितचिंतेचे मोजमाप" : "संतुष्ट समीक्षा रेटिंग"}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {lang === "en" 
                    ? `Based on ${testimonials.length} verified spiritual resonance testimonials.`
                    : lang === "mr"
                    ? `एकूण ${testimonials.length} प्रमाणित आध्यात्मिक प्रतिक्रियांवर आधारित.`
                    : `कुल ${testimonials.length} सत्यापित आध्यात्मिक प्रतिक्रियाओं पर आधारित।`
                  }
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsReviewModalOpen(true);
                setSubmitSuccess(false);
                setFormData({
                  name: "",
                  city: "",
                  rating: 5,
                  content: "",
                  image: IMAGES.avatars.lotus,
                });
                setReviewError("");
              }}
              className="w-full md:w-auto px-6 py-3.5 bg-therapy-500 hover:bg-therapy-600 text-white text-xs font-bold font-mono tracking-widest uppercase rounded-full transition-all hover:scale-[1.03] duration-300 shadow-md shadow-therapy-500/10 flex items-center justify-center space-x-2 cursor-pointer border border-transparent"
            >
              <MessageSquare className="w-4 h-4" />
              <span>
                {lang === "en" ? "Write a Review" : lang === "mr" ? "अभिप्राय लिहा" : "समीक्षा लिखें"}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-8">
            {testimonials.length === 0 ? (
              <div className="col-span-2 text-center text-xs text-gray-500 italic py-8">
                {t.testimonialsNoData}
              </div>
            ) : (
              testimonials.map((test) => (
                <div
                  key={test.id}
                  className="rounded-2xl p-6 sm:p-8 border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-therapy-500/30 transition-all duration-300 relative flex flex-col justify-between"
                >
                  <Quote className="absolute right-6 top-6 w-10 h-10 text-therapy-500/5" />
                  <div className="space-y-4 text-left">
                    <div className="flex gap-1">
                      {Array.from({ length: test.rating }).map((_, r) => (
                        <Star key={r} className="w-3.5 h-3.5 fill-therapy-500 text-therapy-500" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm italic text-gray-600 leading-relaxed">
                      "{test.translations?.[lang]?.content || test.content}"
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 pt-6 border-t border-gray-100 mt-6 text-left">
                    <OptimizedImage
                      src={test.image}
                      alt={test.translations?.[lang]?.name || test.name}
                      className="w-10 h-10 rounded-full border border-therapy-500/30"
                      widths={[100]}
                      sizes="40px"
                    />
                    <div className="space-y-0.5">
                      <h4 className="font-serif text-xs font-semibold text-gray-900 tracking-wide">{test.translations?.[lang]?.name || test.name}</h4>
                      <p className="text-[10px] font-mono text-gray-500 leading-none">
                        {test.translations?.[lang]?.role || test.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Write a Review Submission Modal/Form Overlay */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300 animate-fadeIn">
          <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl max-w-lg w-full relative space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-2 hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitSuccess ? (
              <form onSubmit={handleReviewSubmit} className="space-y-5">
                <div className="space-y-1 text-left">
                  <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-therapy-600 uppercase font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>{lang === "en" ? "Visitor Sanctuary Echo" : lang === "mr" ? "हितचिंतकाचे अनुभव" : "आगंतुक अनुभव"}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-gray-900">
                    {lang === "en" ? "Share Your Sanctuary Review" : lang === "mr" ? "आपला अनुभव शेअर करा" : "समीक्षा दर्ज करें"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {lang === "en" 
                      ? "Your feedback directs our communal path and is approved by our sanctuary moderator."
                      : lang === "mr"
                      ? "आपल्या अभिप्रायामुळे इतरांना मदत होईल. आपला अनुभव ॲडमिन मंजुरीसाठी पाठवला आहे."
                      : "आपकी अमूल्य समीक्षा दूसरों का मार्गदर्शन करेगी। सभी समीक्षाएं एडमिन की अनुमति के बाद ही प्रदर्शित होंगी।"
                    }
                  </p>
                </div>

                {reviewError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg font-sans text-left">
                    {reviewError}
                  </div>
                )}

                <div className="space-y-4 font-sans text-xs text-left">
                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-700 mb-1.5 font-bold">
                      {t.wellness.reviewNameLabel || "Full Name*"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.booking.placeholderName || "e.g. Marie Lindqvist"}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-therapy-500 rounded-lg p-3 text-gray-900 outline-none transition-colors"
                    />
                  </div>

                  {/* City Input */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-700 mb-1.5 font-bold">
                      {t.wellness.reviewCityLabel || "City / Country (Optional)"}
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Stockholm, Sweden"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-therapy-500 rounded-lg p-3 text-gray-900 outline-none transition-colors"
                    />
                  </div>

                  {/* Clickable Star Rating Selection */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-700 mb-1.5 font-bold">
                      {t.wellness.labelResonanceRating || "Quantum Resonance Rating*"}
                    </label>
                    <div className="flex items-center space-x-1.5 bg-gray-50 border border-gray-200 p-2 px-3 rounded-lg w-fit">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          type="button"
                          key={starVal}
                          onClick={() => setFormData({ ...formData, rating: starVal })}
                          className="hover:scale-110 active:scale-95 transition-transform p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              starVal <= formData.rating
                                ? "fill-therapy-500 text-therapy-500"
                                : "text-gray-300 hover:text-therapy-500/50"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-[10px] font-mono text-therapy-600/80 pl-2 font-bold uppercase">
                        {formData.rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Review Message Textarea */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-700 mb-1.5 font-bold">
                      Review Message*
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder={t.wellness.placeholderReview || "Describe your feelings, emotional balance or physical relief..."}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-therapy-500 rounded-lg p-3 text-gray-900 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Custom Pre-Selected Avatars Selection */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-700 mb-2 font-bold">
                      {t.wellness.labelSilhouette || "Select Silhouette Portrait (Optional)"}
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      {[
                        { id: "lotus", url: IMAGES.avatars.lotus },
                        { id: "retreat", url: IMAGES.avatars.retreat },
                        { id: "yogi", url: IMAGES.avatars.yogi },
                        { id: "pilgrim", url: IMAGES.avatars.pilgrim }
                      ].map((av) => (
                        <button
                          type="button"
                          key={av.id}
                          onClick={() => setFormData({ ...formData, image: av.url })}
                          className={`relative rounded-full p-0.5 border transition-all ${
                            formData.image === av.url ? "border-therapy-500 scale-105" : "border-transparent hover:border-therapy-500/20"
                          } cursor-pointer`}
                        >
                          <OptimizedImage
                            src={av.url}
                            alt={av.id}
                            className="w-10 h-10 rounded-full"
                            widths={[80]}
                            sizes="40px"
                          />
                          {formData.image === av.url && (
                            <span className="absolute -bottom-1 -right-1 bg-therapy-500 text-white rounded-full p-0.5 text-[8px] font-extrabold flex items-center justify-center w-3.5 h-3.5 border border-white">
                              ✓
                            </span>
                          )}
                        </button>
                      ))}
                      <div className="flex-1 min-w-[150px]">
                        <input
                          type="text"
                          value={(Object.values(IMAGES.avatars) as string[]).includes(formData.image) ? "" : formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value || IMAGES.avatars.lotus })}
                          placeholder="Or input custom photo URL..."
                          className="w-full bg-gray-50 border border-gray-200 focus:border-therapy-500 rounded-lg p-2 text-[10px] text-gray-900 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-5 py-2.5 border border-gray-200 text-gray-600 hover:text-gray-800 rounded-full transition-colors cursor-pointer"
                  >
                    {t.wellness.btnDiscard || "Discard"}
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="px-6 py-2.5 bg-therapy-500 hover:bg-therapy-600 text-white font-bold uppercase tracking-wider rounded-full transition-all disabled:opacity-40 flex items-center space-x-1.5 cursor-pointer shadow-md shadow-therapy-500/10"
                  >
                    {submittingReview ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>{t.wellness.reviewTransmitting || "Transmitting..."}</span>
                      </>
                    ) : (
                      <span>{t.wellness.btnSubmitReview || "Submit Review"}</span>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              // Success Screen Block with animation
              <div className="py-8 text-center space-y-6 flex flex-col items-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-therapy-50 border border-therapy-200 flex items-center justify-center text-therapy-500 mb-2 scale-up">
                  <CheckCircle2 className="w-10 h-10 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-2xl text-gray-900 font-bold">
                    {t.wellness.reviewSuccessTitle || "Echo Received!"}
                  </h4>
                  <p className="text-sm text-gray-600 max-w-sm leading-relaxed px-2 font-sans font-light">
                    {t.wellness.reviewSuccessDesc || "Thank you for sharing your attuned experience. Your review has been saved in the registry and will appear live once reviewed and approved by our Sanctuary Moderator."}
                  </p>
                </div>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-8 py-3 bg-therapy-500 hover:bg-therapy-600 text-white font-semibold font-mono text-xs tracking-wider uppercase rounded-full transition-colors cursor-pointer w-full max-w-xs shadow-md shadow-therapy-500/10"
                >
                  {t.wellness.btnPerfect || "Perfect"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}



      {/* 3.5. SOCIAL MEDIA TESTIMONIAL SCREENSHOTS (WhatsApp & Instagram) */}
      {(!aboutVikranti || aboutVikranti.showReviews) && (
        <section className="py-24 px-4 bg-white border-t border-gray-200 relative z-10">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-therapy-600">{t.reviewsBadge}</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-gray-900 font-bold"> {t.reviewsTitle}</h2>
              <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                {t.reviewsDesc}
              </p>
              <div className="w-12 h-[1.5px] bg-therapy-500 mx-auto mt-4" />
            </div>

            {screenshotReviews.length === 0 ? (
              <div className="text-center py-12 text-xs text-gray-500 italic">
                {t.reviewsEmpty}
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {screenshotReviews.map((rev, index) => (
                  <div
                    key={rev.id || index}
                    onClick={() => setPreviewImage(rev.imageUrl)}
                    className="break-inside-avoid bg-white rounded-2xl border border-gray-200 overflow-hidden group hover:border-therapy-300 transition-all duration-300 shadow-md hover:shadow-xl cursor-zoom-in relative flex flex-col p-4 space-y-4 hover:-translate-y-1"
                  >
                    {/* Visual Media with Zoom & Badge */}
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-50 border border-gray-100">
                      <OptimizedImage
                        src={rev.imageUrl}
                        alt={rev.translations?.[lang]?.caption || rev.caption}
                        className="w-full h-full"
                        imgClassName="filter brightness-95 transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="flex items-center space-x-1.5 text-xs text-white font-mono uppercase tracking-wider bg-black/70 px-4 py-2 border border-therapy-500/20 backdrop-blur-md rounded-full">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{t.reviewsExpand}</span>
                        </span>
                      </div>

                      {/* Platform Badges */}
                      <div className="absolute top-3 left-3 z-10">
                        {rev.platform === "whatsapp" ? (
                          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#128C7E]/90 border border-[#25D366]/30 backdrop-blur-md text-[9px] font-mono text-white">
                            <MessageCircle className="w-3 h-3 text-[#25D366] fill-[#25D366]" />
                            <span>{t.badgeWhatsapp}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#833AB4]/90 via-[#FD1D1D]/90 to-[#FCB045]/90 border border-white/10 backdrop-blur-md text-[9px] font-mono text-white">
                            <Instagram className="w-3 h-3 text-white" />
                            <span>{t.badgeInstagram}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta Section */}
                    <div className="pt-1 select-none">
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light italic">
                        "{rev.translations?.[lang]?.caption || rev.caption}"
                      </p>
                    </div>

                    {/* Small aesthetic corner accents */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-therapy-500/20 rounded-tr" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-therapy-500/20 rounded-bl" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3.6. ABOUT VIKRANTI FOUNDER SECTION */}
      {(!aboutVikranti || aboutVikranti.showAbout) && (
        <section className="py-24 px-4 bg-slate-50 relative overflow-hidden z-10 border-t border-gray-200">
          {/* Spiritual ambient glowing orb */}
          <div className="absolute top-1/2 left-1/2 -not-sr-only -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-therapy-500/5 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Founder luxury framed profile area */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group p-4">
                  {/* Outer decorative halo borders */}
                  <div className="absolute inset-0 border border-therapy-500/15 rounded-3xl scale-95 transition-transform duration-700 group-hover:scale-100" />
                  <div className="absolute inset-2 border border-therapy-500/10 rounded-2xl scale-[0.98] rotate-2 transition-transform duration-700 group-hover:-rotate-2" />
                  
                  {/* Glow backlight shadow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-therapy-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative rounded-2xl overflow-hidden border border-therapy-500/30 w-[280px] sm:w-[320px] aspect-[4/5] shadow-2xl bg-white">
                    <OptimizedImage
                      src={aboutVikranti?.profileImage || IMAGES.therapy.founderPortrait}
                      alt={aboutVikranti?.name || "Dr. Vikranti"}
                      className="w-full h-full"
                      imgClassName="filter brightness-95 saturation-95 transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 280px, 320px"
                    />
                    
                    {/* Small aesthetic display corner accents inside */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-therapy-500" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-therapy-500" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-therapy-500" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-therapy-500" />
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative content & Wellness philosophy */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono tracking-[0.44em] text-therapy-600 block uppercase">
                    {t.aboutBadge}
                  </span>
                  <p className="font-serif italic text-4xl sm:text-5xl text-gray-900 font-bold tracking-wide">
                    {aboutVikranti?.translations?.[lang]?.name || aboutVikranti?.name || "Dr. Vikranti"}
                  </p>
                  <p className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase -mt-1.5 font-semibold">
                    {aboutVikranti?.translations?.[lang]?.role || aboutVikranti?.role || "Founder & Resonance Alchemist"}
                  </p>
                  <div className="w-16 h-[1.5px] bg-[#D4AF37]/40" />
                </div>

                <div className="space-y-5 text-gray-750 leading-relaxed font-sans font-light text-xs sm:text-sm">
                  {(() => {
                    const textVal = aboutVikranti?.translations?.[lang]?.aboutText || aboutVikranti?.aboutText;
                    if (textVal) {
                      return textVal.split("\n\n").map((para, pIdx) => (
                        <p key={pIdx}>
                          {para}
                        </p>
                      ));
                    }
                    return (
                      <p>
                        Vikranti is an attuned spiritual practitioner with deep family lineage in biofield healing and adaptogenic botanicals. Sourcing knowledge from traditional teachers across the Western Ghats and certified in Usui Shiki Ryoho Reiki as well as classical Edward Bach flower therapy, she serves as the master conduit of DharaAveda's energy restoration programs.
                      </p>
                    );
                  })()}
                </div>

                {/* Philosophy box (glass card) */}
                <div className="rounded-2xl p-6 sm:p-8 bg-white border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/5 rounded-full blur-xl pointer-events-none" />
                  <span className="text-[9px] font-mono text-[#D4AF37] tracking-widest uppercase block mb-3">{t.aboutPhilosophyTitle}</span>
                  <p className="text-xs italic text-gray-750 leading-relaxed font-light">
                    "{aboutVikranti?.translations?.[lang]?.philosophy || aboutVikranti?.philosophy || "Sacred healing is the silent space between actions. We do not inject wellness; we peel back the layers of cognitive noise, sensory overload, and biological residue so that your intrinsic life force can flow uninhibited."}"
                  </p>
                </div>

                <div className="pt-4 text-left">
                  <button
                    onClick={() => {
                      setBookingServiceId("");
                      setIsBookingModalOpen(true);
                    }}
                    className="cursor-pointer inline-flex items-center space-x-2.5 px-6 py-3 bg-therapy-500 hover:bg-therapy-600 text-white rounded-full font-mono font-bold text-[10px] tracking-widest uppercase shadow-md hover:shadow-lg transition-all hover:scale-[1.03]"
                  >
                    <CalendarRange className="w-4 h-4" />
                    <span>Book Consultation</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Modern Lightbox Preview overlay */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-all duration-300"
          onClick={() => setPreviewImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200 hover:scale-105"
            onClick={() => setPreviewImage(null)}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div
            className="max-w-4xl max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Expanded Testimonial Screen"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[80vh] object-contain rounded-xl border border-therapy-500/20 shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* 3.8. FAQS COLLAPSIBLE LUXURY ACCORDION */}
      <section className="py-24 px-4 bg-white border-t border-gray-200 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-therapy-600">{t.faqBadge}</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-gray-900 font-bold">{t.faqTitle}</h2>
            <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
              {t.faqDesc}
            </p>
            <div className="w-12 h-[1.5px] bg-therapy-500 mx-auto mt-4" />
          </div>

          <div className="space-y-4 pt-4">
            {t.faqItems.map((item: { question: string; answer: string }, fIdx: number) => (
              <div key={fIdx} className="border border-gray-200 rounded-2xl bg-slate-50 overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === fIdx ? null : fIdx)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-100 transition-colors duration-200 pointer-events-auto"
                >
                  <span className="font-serif text-sm sm:text-base font-semibold text-gray-900">{item.question}</span>
                  <ChevronDown className={`w-4 h-4 text-therapy-500 transition-transform duration-300 ${openFaqIdx === fIdx ? "rotate-180" : ""}`} />
                </button>
                {openFaqIdx === fIdx && (
                  <div className="p-6 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200 bg-white">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SANCTUARY INFO LOCATION MATTERS */}
      <section className="py-20 px-4 bg-slate-50 border-t border-gray-200 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-therapy-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.25em] text-therapy-600 uppercase block">{t.locationBadge}</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">{t.locationTitle}</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans font-light">
                {t.locationDesc}
              </p>
            </div>

            <div className="aspect-video relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg h-52 w-full">
              <OptimizedImage
                src={IMAGES.therapy.sanctuaryLocation}
                alt="Wayanad highland retreat"
                className="w-full h-full"
                imgClassName="filter brightness-90"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 text-xs text-white">
                <Compass className="w-4 h-4 text-therapy-500" />
                <span className="font-mono text-[10px]">{t.locationBanner}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ELEGANT THERAPY PAGE FOOTER CTA */}
      <section className="py-24 px-4 bg-slate-50 border-t border-gray-200 text-center relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-therapy-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-therapy-600">Begin your alignment journey</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-gray-900 font-bold leading-snug">
            Ready to Restore Your True Vibrational Rhythm?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto font-light font-sans">
            Whether seeking Bach flower emotional support or deep Usui Reiki alignment, our master-craft practitioners are here to guide you back into resonance. Space is limited inside our forest garden sanctuaries.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setBookingServiceId("");
                setIsBookingModalOpen(true);
              }}
              className="cursor-pointer inline-flex items-center space-x-3 px-10 py-4 bg-therapy-500 hover:bg-therapy-600 text-white font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300 hover:scale-[1.04] shadow-md hover:shadow-therapy-500/20"
            >
              <CalendarRange className="w-4.5 h-4.5" />
              <span>Schedule Healing Session</span>
            </button>
          </div>
        </div>
      </section>

      {/* Immersive Booking Scheduler Modal Overlay */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300 animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl border border-gray-200 bg-white shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
            {/* Top Mesh line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-therapy-500/70 to-transparent" />
            
            {/* Modal Header inside Form wrapper */}
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="cursor-pointer p-2 rounded-full text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all border border-gray-200"
                title="Close Scheduler"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Booking Form Container */}
            <div className="flex-1 overflow-y-auto pt-8 pb-4 custom-scrollbar">
              <Suspense fallback={
                <div className="py-20 text-center space-y-4">
                  <div className="w-10 h-10 border-2 border-therapy-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-mono tracking-wider text-gray-500">Loading sanctuary booking interface...</p>
                </div>
              }>
                <BookingForm preselectedServiceId={bookingServiceId} onSuccess={() => {
                  // Standard success displays inside BookingForm
                }} />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
