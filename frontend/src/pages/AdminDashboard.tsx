import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Lock, LayoutDashboard, Grid, HeartHandshake, FileCheck, CalendarCheck, 
  Trash2, Plus, LogOut, CheckCircle2, RefreshCw, Layers, Edit3, X, Sparkles, Mail, FileText, Settings, Image, Star
} from "lucide-react";
import { Product, TherapyService, Booking, Inquiry, Testimonial, QuickStats, AboutVikranti, ScreenshotReview } from "../types";
import { api } from "../lib/api";
import { IMAGES } from "../data/images";

type Tab = "overview" | "products" | "services" | "testimonials" | "inquiries" | "bookings" | "wellness-settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [authorized, setAuthorized] = useState(false);
  const [stats, setStats] = useState<QuickStats>({ totalInquiries: 0, totalBookings: 0, totalProducts: 0, totalServices: 0 });
  
  // Loaded dynamic sets
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<TherapyService[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [aboutVikranti, setAboutVikranti] = useState<AboutVikranti | null>(null);
  const [screenshotReviews, setScreenshotReviews] = useState<ScreenshotReview[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // About form states
  const [vName, setVName] = useState("");
  const [vRole, setVRole] = useState("");
  const [vImage, setVImage] = useState("");
  const [vText, setVText] = useState("");
  const [vPhilosophy, setVPhilosophy] = useState("");
  const [vShowReviews, setVShowReviews] = useState(true);
  const [vShowAbout, setVShowAbout] = useState(true);

  // Screenshot review states
  const [revUrl, setRevUrl] = useState("");
  const [revCaption, setRevCaption] = useState("");
  const [revPlatform, setRevPlatform] = useState<'whatsapp' | 'instagram'>("whatsapp");
  const [savingAbout, setSavingAbout] = useState(false);
  const [addingReview, setAddingReview] = useState(false);

  // Dialog/Modal Add States
  const [showProductForm, setShowProductForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);

  // Form State: Product Add
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState("Spices & Condiments");
  const [pPrice, setPPrice] = useState("");
  const [pImg, setPImg] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pOrigin, setPOrigin] = useState("");
  const [pPkg, setPPkg] = useState("");
  const [pPurity, setPPurity] = useState("");
  const [pGrade, setPGrade] = useState("");
  const [pMinOrder, setPMinOrder] = useState("");

  // Form State: Service Add
  const [sName, setSName] = useState("");
  const [sCategory, setSCategory] = useState("Vibrational Healing");
  const [sDuration, setSDuration] = useState("60 Minutes");
  const [sPrice, setSPrice] = useState("$95.00 / Session");
  const [sImg, setSImg] = useState("");
  const [sStory, setSStory] = useState("");
  const [sBenefits, setSBenefits] = useState("");

  // Form State: Testimonial Add
  const [tName, setTName] = useState("");
  const [tRole, setTRole] = useState("");
  const [tContent, setTContent] = useState("");
  const [tImg, setTImg] = useState("");
  const [tRating, setTRating] = useState(5);
  const [tType, setTType] = useState<"export" | "wellness">("wellness");

  // Form State: Testimonial Edit/Approve
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [editTName, setEditTName] = useState("");
  const [editTRole, setEditTRole] = useState("");
  const [editTCity, setEditTCity] = useState("");
  const [editTContent, setEditTContent] = useState("");
  const [editTImg, setEditTImg] = useState("");
  const [editTRating, setEditTRating] = useState(5);
  const [editTType, setEditTType] = useState<"export" | "wellness">("wellness");
  const [editTApproved, setEditTApproved] = useState(false);

  const verifyAuth = () => {
    const token = localStorage.getItem("dharaSavedToken");
    if (!token) {
      navigate("/admin/login");
    } else {
      setAuthorized(true);
    }
  };

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [pData, sData, tData, bData, iData, statsData, aboutData, reviewsData] = await Promise.all([
        api.getProducts(),
        api.getServices(),
        api.getTestimonials(),
        api.getBookings(),
        api.getInquiries(),
        api.getQuickStats(),
        api.getAboutVikranti().catch(() => null),
        api.getScreenshotReviews().catch(() => [])
      ]);
      
      setProducts(pData);
      setServices(sData);
      setTestimonials(tData);
      setBookings(bData);
      setInquiries(iData);
      setStats(statsData);
      if (aboutData) {
        setAboutVikranti(aboutData);
        setVName(aboutData.name || "Dr. Vikranti");
        setVRole(aboutData.role || "Founder & Resonance Alchemist");
        setVImage(aboutData.profileImage || "");
        setVText(aboutData.aboutText || "");
        setVPhilosophy(aboutData.philosophy || "");
        setVShowReviews(aboutData.showReviews !== false);
        setVShowAbout(aboutData.showAbout !== false);
      }
      setScreenshotReviews(reviewsData);
    } catch (err: any) {
      setError(err.message || "Failed to synchronise data with backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  useEffect(() => {
    if (authorized) {
      loadAllData();
    }
  }, [authorized]);

  const handleLogout = () => {
    localStorage.removeItem("dharaSavedToken");
    navigate("/admin/login");
  };

  // Product CRUD
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pPrice) return;
    try {
      await api.createProduct({
        name: pName,
        category: pCategory,
        images: [pImg || IMAGES.export.products.defaultProduct],
        description: pDesc,
        pricing: pPrice,
        specifications: {
          origin: pOrigin || "Kerala, India",
          packaging: pPkg || "Standard Sacks",
          purity: pPurity || "98%",
          grade: pGrade || "Premium",
          minOrder: pMinOrder || "100 kg"
        }
      });
      setShowProductForm(false);
      // Reset
      setPName(""); setPPrice(""); setPImg(""); setPDesc(""); setPOrigin(""); setPPkg(""); setPPurity(""); setPGrade(""); setPMinOrder("");
      loadAllData();
    } catch (err) {
      alert("Error creating product");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Remove this premium trade product from listings?")) return;
    try {
      await api.deleteProduct(id);
      loadAllData();
    } catch (err) {
      alert("Error deleting product");
    }
  };

  // Service CRUD
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sName) return;
    try {
      await api.createService({
        name: sName,
        category: sCategory,
        duration: sDuration,
        pricing: sPrice,
        image: sImg || IMAGES.therapy.heroBg,
        story: sStory,
        benefits: sBenefits.split(",").map(b => b.trim()).filter(Boolean),
        timeline: [
          { title: "Intake diagnostics", description: "Reviewing active stress and auric fields." },
          { title: "Quantum resonance alignment", description: "Targeting blockages to restore flow." }
        ]
      });
      setShowServiceForm(false);
      // Reset
      setSName(""); setSStory(""); setSImg(""); setSBenefits("");
      loadAllData();
    } catch (err) {
      alert("Error adding therapy service");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to remove this therapy model?")) return;
    try {
      await api.deleteService(id);
      loadAllData();
    } catch (err) {
      alert("Error deleting service");
    }
  };

  // Testimonials CRUD
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tName || !tContent) return;
    try {
      await api.createTestimonial({
        name: tName,
        role: tRole || "Client",
        content: tContent,
        image: tImg || IMAGES.therapy.founder,
        rating: tRating,
        type: tType,
        approved: true // Created by Admin is auto-approved
      });
      setShowTestimonialForm(false);
      setTName(""); setTRole(""); setTContent(""); setTImg("");
      loadAllData();
    } catch (err) {
      alert("Failed to write testimonial");
    }
  };

  const handleToggleApproveTestimonial = async (id: string, currentApproved: boolean) => {
    try {
      await api.updateTestimonial(id, { approved: !currentApproved });
      loadAllData();
    } catch (err) {
      alert("Failed to update approval status.");
    }
  };

  const startEditTestimonial = (t: Testimonial) => {
    setEditingTestimonial(t);
    setEditTName(t.name);
    setEditTRole(t.role);
    setEditTCity(t.city || "");
    setEditTContent(t.content);
    setEditTImg(t.image);
    setEditTRating(t.rating);
    setEditTType(t.type);
    setEditTApproved(t.approved);
  };

  const handleEditTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    try {
      await api.updateTestimonial(editingTestimonial.id, {
        name: editTName,
        role: editTRole,
        city: editTCity,
        content: editTContent,
        image: editTImg,
        rating: editTRating,
        type: editTType,
        approved: editTApproved
      });
      setEditingTestimonial(null);
      loadAllData();
    } catch (err) {
      alert("Failed to save edited feedback record");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer feedback?")) return;
    try {
      await api.deleteTestimonial(id);
      loadAllData();
    } catch (err) {
      alert("Failed to delete testimonial");
    }
  };

  // Booking updates
  const handleUpdateBookingStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      await api.updateBooking(id, status);
      loadAllData();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Delete this appointment slip from database?")) return;
    try {
      await api.deleteBooking(id);
      loadAllData();
    } catch (err) {
      alert("Failed to delete booking");
    }
  };

  // Inquiry updates
  const handleUpdateInquiryStatus = async (id: string, status: 'new' | 'reviewed' | 'resolved') => {
    try {
      await api.updateInquiry(id, status);
      loadAllData();
    } catch (err) {
      alert("Failed to update inquiry status");
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Delete this trade ticket record?")) return;
    try {
      await api.deleteInquiry(id);
      loadAllData();
    } catch (err) {
      alert("Failed to delete inquiry log");
    }
  };

  // About Vikranti CRUD
  const handleUpdateAboutSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingAbout(true);
      const updated = await api.updateAboutVikranti({
        name: vName,
        role: vRole,
        profileImage: vImage,
        aboutText: vText,
        philosophy: vPhilosophy,
        showReviews: vShowReviews,
        showAbout: vShowAbout
      });
      setAboutVikranti(updated);
      alert("Spiritual Sanctuary Settings Saved Successfully.");
    } catch (err) {
      alert("Failed to save spiritual sanctuary settings.");
    } finally {
      setSavingAbout(false);
    }
  };

  // Screenshot review CRUD
  const handleAddReviewScreenshot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revUrl) return;
    try {
      setAddingReview(true);
      await api.createScreenshotReview({
        imageUrl: revUrl,
        caption: revCaption || "Client direct review",
        platform: revPlatform
      });
      setRevUrl("");
      setRevCaption("");
      const reviews = await api.getScreenshotReviews();
      setScreenshotReviews(reviews);
      alert("Social Screenshot Review Registered.");
    } catch (err) {
      alert("Error uploading screenshot review specification");
    } finally {
      setAddingReview(false);
    }
  };

  const handleDeleteReviewScreenshot = async (id: string) => {
    if (!confirm("Delete this social review screenshot from Wayanad archives?")) return;
    try {
      await api.deleteScreenshotReview(id);
      const reviews = await api.getScreenshotReviews();
      setScreenshotReviews(reviews);
    } catch (err) {
      alert("Error deleting review screenshot");
    }
  };

  if (!authorized) return null;

  return (
    <div className="bg-[#050d0a] text-white min-h-screen pt-24 font-sans relative">
      <div className="absolute top-0 left-0 w-full h-[320px] bg-gradient-to-b from-luxury-green-mid to-[#050d0a] border-b border-luxury-gold/5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20 space-y-8">
        
        {/* Welcome Header Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0d1b24]/50 border border-luxury-gold/15 p-6 rounded-2xl backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-luxury-gold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Attuned Security System Secure</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wide">
              DharaAveda Console Panel
            </h1>
            <p className="text-xs text-gray-400">
              Enterprise management for Agricultural trade catalog and Holistic resonance appointments database in sync.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={loadAllData}
              disabled={loading}
              className="flex items-center space-x-1.5 px-3 py-2 border border-luxury-gold/10 text-[10px] font-mono uppercase tracking-wider text-gray-300 hover:border-luxury-gold/35 rounded-lg hover:text-white"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 px-4 py-2 bg-red-950/40 border border-red-500/20 text-red-300 hover:bg-red-500 hover:text-white transition-all rounded-lg text-xs font-mono uppercase tracking-wider"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Quick statistics grids */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl border border-luxury-gold/10 bg-white/5 space-y-1.5 shadow-md">
            <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block">Pending Inquiries</span>
            <p className="font-serif text-3xl font-extrabold text-luxury-gold">{stats.totalInquiries}</p>
          </div>
          <div className="p-5 rounded-xl border border-luxury-gold/10 bg-white/5 space-y-1.5 shadow-md">
            <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block">Active Bookings</span>
            <p className="font-serif text-3xl font-extrabold text-luxury-gold">{stats.totalBookings}</p>
          </div>
          <div className="p-5 rounded-xl border border-luxury-gold/10 bg-white/5 space-y-1.5 shadow-md">
            <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block">Listed Trade Products</span>
            <p className="font-serif text-3xl font-extrabold text-luxury-gold">{stats.totalProducts}</p>
          </div>
          <div className="p-5 rounded-xl border border-luxury-gold/10 bg-[#0d1b24]/20 space-y-1.5 shadow-md border-r-emerald-500/20">
            <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block">Thermal Modalities</span>
            <p className="font-serif text-3xl font-extrabold text-luxury-gold">{stats.totalServices}</p>
          </div>
        </div>

        {/* Workspace Tab bar */}
        <div className="border-b border-luxury-gold/15 flex flex-wrap gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 border-b-2 hover:text-white transition-colors ${
              activeTab === "overview" ? "border-luxury-gold text-luxury-gold font-bold" : "border-transparent text-gray-400"
            }`}
          >
            Overview Panel
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2.5 border-b-2 hover:text-white transition-colors ${
              activeTab === "products" ? "border-luxury-gold text-luxury-gold font-bold" : "border-transparent text-gray-400"
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2.5 border-b-2 hover:text-white transition-colors ${
              activeTab === "services" ? "border-luxury-gold text-luxury-gold font-bold" : "border-transparent text-gray-400"
            }`}
          >
            Therapies ({services.length})
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-4 py-2.5 border-b-2 hover:text-white transition-colors ${
              activeTab === "testimonials" ? "border-luxury-gold text-luxury-gold font-bold" : "border-transparent text-gray-400"
            }`}
          >
            Testimonial Center
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2.5 border-b-2 hover:text-white transition-colors ${
              activeTab === "inquiries" ? "border-luxury-gold text-luxury-gold font-bold" : "border-transparent text-gray-400"
            }`}
          >
            Log Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2.5 border-b-2 hover:text-white transition-colors ${
              activeTab === "bookings" ? "border-luxury-gold text-luxury-gold font-bold" : "border-transparent text-gray-400"
            }`}
          >
            Appointments ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("wellness-settings")}
            className={`px-4 py-2.5 border-b-2 hover:text-white transition-colors ${
              activeTab === "wellness-settings" ? "border-luxury-gold text-luxury-gold font-bold" : "border-transparent text-gray-400"
            }`}
          >
            Wellness Settings
          </button>
        </div>

        {/* Tab content bodies */}
        <div className="bg-[#0b1a13]/40 border border-luxury-gold/5 p-6 rounded-2xl shadow-xl">
          {loading ? (
            <div className="py-12 text-center text-xs text-gray-400 font-mono tracking-wider">
              Downloading records ledger cache...
            </div>
          ) : activeTab === "overview" ? (
            /* Tab: OVERVIEW */
            <div className="space-y-8 text-xs sm:text-sm font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recent Inquiries List Widget */}
                <div className="space-y-4">
                  <div className="border-b border-luxury-gold/10 pb-2 flex justify-between items-center">
                    <h3 className="font-serif text-lg text-white">Recent Sea Cargo Inquiries</h3>
                    <button onClick={() => setActiveTab("inquiries")} className="text-luxury-gold hover:underline text-xs font-mono">View All</button>
                  </div>
                  {inquiries.slice(0, 3).length === 0 ? (
                    <p className="text-gray-500 italic text-xs py-4">No recent inquiries found.</p>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.slice(0, 3).map(i => (
                        <div key={i.id} className="p-4 rounded-lg bg-white/5 border border-luxury-gold/10 flex justify-between items-center">
                          <div className="space-y-1">
                            <p className="font-bold text-white text-xs">{i.name} <span className="font-mono text-[9px] text-gray-500">({i.company || "General"})</span></p>
                            <p className="text-xs text-luxury-gold font-mono">{i.productName || "General Message Board"}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase ${
                            i.status === "new" ? "bg-red-950 text-red-300" : i.status === "reviewed" ? "bg-orange-950 text-orange-300" : "bg-emerald-950 text-emerald-300"
                          }`}>
                            {i.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Bookings Widget */}
                <div className="space-y-4">
                  <div className="border-b border-luxury-gold/10 pb-2 flex justify-between items-center">
                    <h3 className="font-serif text-lg text-white">Recent Therapy Bookings</h3>
                    <button onClick={() => setActiveTab("bookings")} className="text-luxury-gold hover:underline text-xs font-mono">View All</button>
                  </div>
                  {bookings.slice(0, 3).length === 0 ? (
                    <p className="text-gray-500 italic text-xs py-4">No pending admissions found.</p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 3).map(b => (
                        <div key={b.id} className="p-4 rounded-lg bg-white/5 border border-luxury-gold/10 flex justify-between items-center">
                          <div className="space-y-1">
                            <p className="font-bold text-white text-xs">{b.name}</p>
                            <p className="text-xs text-gray-300 flex items-center space-x-1">
                              <span className="text-luxury-gold font-semibold">{b.service}</span>
                              <span className="text-gray-500 font-mono text-[10px]">— {b.date}</span>
                            </p>
                          </div>
                          <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase ${
                            b.status === "pending" ? "bg-orange-950 text-orange-300" : b.status === "confirmed" ? "bg-emerald-950 text-emerald-300" : "bg-slate-850 text-slate-400"
                          }`}>
                            {b.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : activeTab === "products" ? (
            /* Tab: PRODUCTS */
            <div className="space-y-6 text-xs">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-xl">Crop Catalogue Operations</h3>
                <button
                  onClick={() => setShowProductForm(!showProductForm)}
                  className="cursor-pointer flex items-center space-x-1 border border-luxury-gold text-luxury-gold px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg hover:bg-luxury-gold hover:text-black transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showProductForm ? "Cancel Add" : "Add Product"}</span>
                </button>
              </div>

              {showProductForm && (
                <form onSubmit={handleAddProduct} className="p-5 border border-luxury-gold/20 rounded-xl bg-[#0d1c24] space-y-4 max-w-3xl">
                  <h4 className="font-serif text-white uppercase text-sm border-b border-luxury-gold/10 pb-1.5">Cargo Spec Form</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Product Cargo Name</label>
                      <input type="text" required value={pName} onChange={e => setPName(e.target.value)} placeholder="e.g. Purified Shilajit Resin" className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded p-2 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Catalog Category</label>
                      <select value={pCategory} onChange={e => setPCategory(e.target.value)} className="w-full bg-[#0d1c24] border border-luxury-gold/20 focus:border-luxury-gold rounded p-2 text-white outline-none">
                        <option value="Spices & Condiments">Spices &amp; Condiments</option>
                        <option value="Essential Oils">Essential Oils</option>
                        <option value="Natural Therapeutics">Natural Therapeutics</option>
                        <option value="Herbal Extracts">Herbal Extracts</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Pricing (FOB terms)</label>
                      <input type="text" required value={pPrice} onChange={e => setPPrice(e.target.value)} placeholder="e.g. $14.00 - $18.00 / kg" className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded p-2 text-white outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Primary photo URL (leave empty for default)</label>
                      <input type="text" value={pImg} onChange={e => setPImg(e.target.value)} placeholder="https://unsplash..." className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded p-2 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Cargo Description</label>
                      <input type="text" value={pDesc} onChange={e => setPDesc(e.target.value)} placeholder="Deep aromatic properties..." className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded p-2 text-white outline-none" />
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 rounded border border-luxury-gold/10 grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <p className="col-span-2 sm:col-span-5 text-[9px] uppercase tracking-wider text-luxury-gold">Freight Ledger Specifications</p>
                    <div>
                      <label className="block text-[8px] font-mono uppercase text-gray-400 mb-1">Origin</label>
                      <input type="text" value={pOrigin} onChange={e => setPOrigin(e.target.value)} placeholder="Kerala, India" className="w-full bg-white/5 border border-luxury-gold/20 rounded p-1.5 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono uppercase text-gray-400 mb-1">Packaging</label>
                      <input type="text" value={pPkg} onChange={e => setPPkg(e.target.value)} placeholder="Kraft Sacks" className="w-full bg-white/5 border border-luxury-gold/20 rounded p-1.5 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono uppercase text-gray-400 mb-1">Purity</label>
                      <input type="text" value={pPurity} onChange={e => setPPurity(e.target.value)} placeholder="99.5%" className="w-full bg-white/5 border border-luxury-gold/20 rounded p-1.5 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono uppercase text-gray-400 mb-1">Grade</label>
                      <input type="text" value={pGrade} onChange={e => setPGrade(e.target.value)} placeholder="Gold Premium" className="w-full bg-white/5 border border-luxury-gold/20 rounded p-1.5 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono uppercase text-gray-400 mb-1">Min Order</label>
                      <input type="text" value={pMinOrder} onChange={e => setPMinOrder(e.target.value)} placeholder="100 kg" className="w-full bg-white/5 border border-luxury-gold/20 rounded p-1.5 text-white outline-none" />
                    </div>
                  </div>

                  <button type="submit" className="px-6 py-2 border border-luxury-gold bg-luxury-gold text-black font-mono uppercase tracking-widest text-xs rounded hover:bg-luxury-gold-dark transition-colors">
                    Add Cargo to Manifest
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                  <div key={p.id} className="p-4 rounded-xl border border-luxury-gold/15 bg-white/5 flex flex-col justify-between space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif text-sm text-white font-semibold">{p.name}</h4>
                        <span className="text-[9px] font-mono text-luxury-gold">{p.category}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-550/15"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-1 text-[10px] font-mono text-gray-400 border-t border-luxury-gold/10 pt-2">
                      <p><strong>FOB pricing:</strong> {p.pricing}</p>
                      <p><strong>Min specs:</strong> {p.specifications.origin || "India"} / {p.specifications.minOrder || "100kg"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === "services" ? (
            /* Tab: SERVICES */
            <div className="space-y-6 text-xs">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-xl">Sanctuary Therapy Services</h3>
                <button
                  onClick={() => setShowServiceForm(!showServiceForm)}
                  className="cursor-pointer flex items-center space-x-1 border border-luxury-gold text-luxury-gold px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg hover:bg-luxury-gold hover:text-black transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showServiceForm ? "Cancel Add" : "Add Service"}</span>
                </button>
              </div>

              {showServiceForm && (
                <form onSubmit={handleAddService} className="p-5 border border-luxury-gold/20 rounded-xl bg-[#0b1a13]/80 space-y-4 max-w-3xl">
                  <h4 className="font-serif text-white uppercase text-sm border-b border-luxury-gold/10 pb-1.5 font-semibold">Therapeutic Attunement Form</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Service / Therapy Name</label>
                      <input type="text" required value={sName} onChange={e => setSName(e.target.value)} placeholder="e.g. Energy attunements" className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded p-2 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Aesthetic Category</label>
                      <input type="text" required value={sCategory} onChange={e => setSCategory(e.target.value)} placeholder="e.g. Chakra Balance" className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded p-2 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Duration Spec</label>
                      <input type="text" required value={sDuration} onChange={e => setSDuration(e.target.value)} placeholder="e.g. 75 Minutes" className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded p-2 text-white outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Pricing FOB</label>
                      <input type="text" required value={sPrice} onChange={e => setSPrice(e.target.value)} placeholder="e.g. $120.00 / Session" className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded p-2 text-white outline-none" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Primary Portrait image URL</label>
                      <input type="text" value={sImg} onChange={e => setSImg(e.target.value)} placeholder="https://unsplash..." className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded p-2 text-white outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Narrative storytelling story</label>
                    <textarea rows={3} value={sStory} onChange={e => setSStory(e.target.value)} placeholder="Describe the ancestral origin background..." className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded p-2 text-white outline-none resize-none" />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Benefits (Comma-separated pills)</label>
                    <input type="text" value={sBenefits} onChange={e => setSBenefits(e.target.value)} placeholder="Chakra balance, Pain alleviation, Mental flow" className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded p-2 text-white outline-none" />
                  </div>

                  <button type="submit" className="px-6 py-2 border border-luxury-gold bg-luxury-gold text-black font-mono uppercase tracking-widest text-xs rounded hover:bg-luxury-gold-dark transition-colors">
                    Add Sacred Attunement
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map(s => (
                  <div key={s.id} className="p-5 rounded-xl border border-luxury-gold/15 bg-white/5 flex flex-col justify-between space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif text-base text-white font-semibold">{s.name}</h4>
                        <span className="text-[9px] font-mono text-luxury-gold">{s.category}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteService(s.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-550/15"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-400 text-xs italic line-clamp-2">{s.description}</p>
                    <p className="text-[10px] text-luxury-gold font-mono uppercase">{s.duration} | {s.pricing}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === "testimonials" ? (
            /* Tab: TESTIMONIALS / REVIEW MODERATION BOARD */
            <div className="space-y-6 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl text-white">Feedback Registry & Testimonials</h3>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-mono">Modulate and authenticate seeker experience dispatches</p>
                </div>
                <button
                  onClick={() => setShowTestimonialForm(!showTestimonialForm)}
                  className="cursor-pointer flex items-center space-x-1.5 border border-luxury-gold text-luxury-gold px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg hover:bg-luxury-gold hover:text-black transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showTestimonialForm ? "Cancel Add" : "Create Testimonial"}</span>
                </button>
              </div>

              {showTestimonialForm && (
                <form onSubmit={handleAddTestimonial} className="p-5 border border-luxury-gold/20 rounded-xl bg-white/5 space-y-4 max-w-3xl">
                  <h4 className="font-serif text-white uppercase text-xs border-b border-luxury-gold/10 pb-1.5 font-semibold tracking-wide">New Attunement Record</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Client / Trade Representative Name</label>
                      <input type="text" required value={tName} onChange={e => setTName(e.target.value)} placeholder="e.g. Heinrich Müller" className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold/60 rounded p-2 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Company / Sanctuary Role</label>
                      <input type="text" value={tRole} onChange={e => setTRole(e.target.value)} placeholder="e.g. Seeker / Wellness Enthusiast" className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold/60 rounded p-2 text-white outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Feedback Group</label>
                      <select value={tType} onChange={e => setTType(e.target.value as any)} className="w-full bg-[#0b1a13] border border-luxury-gold/20 rounded p-2 text-white outline-none">
                        <option value="wellness">Holistic Wellness Therapy</option>
                        <option value="export">Agricultural Export</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Rating Stars (1-5)</label>
                      <input type="number" min="1" max="5" value={tRating} onChange={e => setTRating(parseInt(e.target.value))} className="w-full bg-white/5 border border-luxury-gold/20 rounded p-2 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Client micro picture URL</label>
                      <input type="text" value={tImg} onChange={e => setTImg(e.target.value)} placeholder="https://images.unsplash..." className="w-full bg-white/5 border border-luxury-gold/20 rounded p-2 text-white outline-none font-sans" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Testimonial Content</label>
                    <textarea rows={3} required value={tContent} onChange={e => setTContent(e.target.value)} placeholder="Explain the emotional wellness or clinical relief benefits felt..." className="w-full bg-white/5 border border-luxury-gold/20 rounded p-2 text-white outline-none resize-none" />
                  </div>

                  <button type="submit" className="px-6 py-2 border border-luxury-gold bg-luxury-gold text-black font-mono uppercase tracking-widest text-xs rounded hover:bg-luxury-gold-dark transition-colors cursor-pointer font-bold">
                    Preserve & Publish Live
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {testimonials.length === 0 ? (
                  <p className="text-gray-500 italic py-8 text-center border border-dashed border-luxury-gold/10 rounded-2xl bg-white/[0.01]">
                    No reviews or testimonials registered in the sanctuary core.
                  </p>
                ) : (
                  testimonials.map(t => {
                    const isApproved = t.approved === undefined || t.approved === true;
                    return (
                      <div key={t.id} className="p-5 rounded-2xl border border-luxury-gold/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={t.image || IMAGES.avatars.yogi}
                            alt={t.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-full object-cover border border-luxury-gold/20 shadow-md flex-shrink-0"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap text-left">
                              <span className="font-bold text-white text-sm">{t.name}</span>
                              <span className="font-mono text-[9px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
                                {t.role || "Visitor"} {t.city ? `• ${t.city}` : ""}
                              </span>
                            </div>
                            <p className="text-gray-300 italic max-w-xl leading-relaxed text-left">"{t.content}"</p>
                            <div className="flex items-center gap-3 pt-0.5">
                              <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${
                                t.type === "wellness" 
                                  ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" 
                                  : "border-indigo-500/20 text-indigo-400 bg-indigo-500/5"
                              }`}>
                                {t.type}
                              </span>
                              <span className="text-luxury-gold font-mono text-[10px] flex items-center gap-0.5">
                                {Array.from({ length: t.rating }).map((_, st) => (
                                  <Star key={st} className="w-3 h-3 fill-luxury-gold text-luxury-gold inline-block" />
                                ))}
                                <span className="ml-1 text-gray-400">({t.rating}/5)</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Moderation Controls Area */}
                        <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 border-luxury-gold/5 pt-4 md:pt-0">
                          {/* Visibility Status Badge */}
                          <div className="mr-2">
                            {isApproved ? (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span>Approved</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                <span>Pending</span>
                              </span>
                            )}
                          </div>

                          {/* Quick Toggle Moderation Action */}
                          <button
                            onClick={() => handleToggleApproveTestimonial(t.id, isApproved)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors border cursor-pointer ${
                              isApproved 
                                ? "border-amber-500/30 text-amber-400 hover:bg-amber-500/10" 
                                : "border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
                            }`}
                          >
                            {isApproved ? "Hold Post" : "Approve"}
                          </button>

                          {/* Surgical Edit Action */}
                          <button
                            onClick={() => startEditTestimonial(t)}
                            className="p-2 rounded-lg border border-luxury-gold/15 text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all cursor-pointer"
                            title="Edit feedback content"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Action */}
                          <button
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="p-2 rounded-lg border border-red-500/25 text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                            title="Permanently remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Edit Testimonial Dialog/Modal Backdrop */}
              {editingTestimonial && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
                  <div className="bg-[#050d0a] border border-luxury-gold/25 p-6 sm:p-8 rounded-2xl max-w-lg w-full relative space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
                    <button
                      onClick={() => setEditingTestimonial(null)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div>
                      <h3 className="font-serif text-lg text-white font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-luxury-gold animate-pulse" />
                        <span>Edit Testimonial / Review</span>
                      </h3>
                      <p className="text-[9px] text-gray-500 font-mono mt-1 uppercase">ID: {editingTestimonial.id}</p>
                    </div>

                    <form onSubmit={handleEditTestimonialSubmit} className="space-y-4 text-xs font-sans">
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={editTName}
                          onChange={(e) => setEditTName(e.target.value)}
                          className="w-full bg-white/5 border border-luxury-gold/20 rounded-lg p-2.5 text-white outline-none focus:border-luxury-gold/60"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Company / Role</label>
                          <input
                            type="text"
                            value={editTRole}
                            onChange={(e) => setEditTRole(e.target.value)}
                            placeholder="e.g. Seeker"
                            className="w-full bg-white/5 border border-luxury-gold/20 rounded-lg p-2.5 text-white outline-none focus:border-luxury-gold/60"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">City / Country</label>
                          <input
                            type="text"
                            value={editTCity}
                            onChange={(e) => setEditTCity(e.target.value)}
                            placeholder="e.g. Pune"
                            className="w-full bg-white/5 border border-luxury-gold/20 rounded-lg p-2.5 text-white outline-none focus:border-luxury-gold/60"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Rating Stars (1-5)</label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={editTRating}
                            onChange={(e) => setEditTRating(parseInt(e.target.value) || 5)}
                            className="w-full bg-white/5 border border-luxury-gold/20 rounded-lg p-2.5 text-white outline-none focus:border-luxury-gold/60"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Category Group</label>
                          <select
                            value={editTType}
                            onChange={(e) => setEditTType(e.target.value as any)}
                            className="w-full bg-[#050d0a] border border-luxury-gold/20 rounded-lg p-2.5 text-white outline-none"
                          >
                            <option value="wellness">Holistic Wellness Therapy</option>
                            <option value="export">Agricultural Export</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Portrait Photo URL</label>
                        <input
                          type="text"
                          value={editTImg}
                          onChange={(e) => setEditTImg(e.target.value)}
                          className="w-full bg-white/5 border border-luxury-gold/20 rounded-lg p-2.5 text-white outline-none focus:border-luxury-gold/60 font-sans text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Testimonial Message</label>
                        <textarea
                          rows={4}
                          required
                          value={editTContent}
                          onChange={(e) => setEditTContent(e.target.value)}
                          className="w-full bg-white/5 border border-luxury-gold/20 rounded-lg p-2.5 text-white outline-none focus:border-luxury-gold/60 resize-none leading-relaxed"
                        />
                      </div>

                      <div className="flex items-center space-x-2.5 bg-white/[0.02] p-3 rounded-lg border border-luxury-gold/10">
                        <input
                          type="checkbox"
                          id="edit-t-approved"
                          checked={editTApproved}
                          onChange={(e) => setEditTApproved(e.target.checked)}
                          className="w-4 h-4 rounded border-luxury-gold/25 text-luxury-gold focus:ring-luxury-gold/50 bg-[#050d0a] cursor-pointer"
                        />
                        <label htmlFor="edit-t-approved" className="font-mono text-[9px] uppercase text-white cursor-pointer select-none">
                          Approve and publish live on public website feed
                        </label>
                      </div>

                      <div className="pt-4 flex justify-end space-x-3 text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => setEditingTestimonial(null)}
                          className="px-5 py-2.5 border border-white/10 text-gray-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-luxury-gold hover:bg-luxury-gold-dark text-[#050d0a] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === "inquiries" ? (
            /* Tab: INQUIRIES */
            <div className="space-y-4 text-xs font-sans">
              <h3 className="font-serif text-xl border-b border-luxury-gold/10 pb-2">Global Trading Inquiry Database</h3>
              {inquiries.length === 0 ? (
                <p className="text-gray-500 italic py-6 text-center">No inquiry dispatches logged in the secure register.</p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-luxury-gold/10">
                  <table className="w-full text-left bg-black/20 text-xs">
                    <thead>
                      <tr className="bg-white/5 font-mono text-[9px] uppercase tracking-widest text-luxury-gold border-b border-luxury-gold/15">
                        <th className="p-4">Applicant</th>
                        <th className="p-4">Division / Target Good</th>
                        <th className="p-4">Message Context</th>
                        <th className="p-4">Trade Status</th>
                        <th className="p-4 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-luxury-gold/10">
                      {inquiries.map(inq => (
                        <tr key={inq.id} className="hover:bg-white/5">
                          <td className="p-4 space-y-0.5">
                            <p className="font-bold text-white">{inq.name}</p>
                            <p className="text-gray-400 font-mono text-[10px]">{inq.email}</p>
                            <p className="text-gray-500 font-mono text-[9px]">{inq.phone || "No phone"}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-luxury-gold">{inq.productName || "General Message Desk"}</p>
                            <p className="text-[10px] text-gray-400 font-mono">{inq.company || "Generic Corporation"}</p>
                            {inq.quantity && <p className="text-[10px] text-gray-400 font-mono">Volume: {inq.quantity}</p>}
                          </td>
                          <td className="p-4 max-w-xs truncate text-gray-300 italic">
                            "{inq.message}"
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                              className={`px-2 py-1.5 rounded bg-black/50 font-mono text-[10px] uppercase border outline-none cursor-pointer ${
                                inq.status === "new" ? "text-red-300 border-red-500/25" : inq.status === "reviewed" ? "text-orange-300 border-orange-500/25" : "text-emerald-300 border-emerald-500/25"
                              }`}
                            >
                              <option value="new">New Inquiry</option>
                              <option value="reviewed">Under Review</option>
                              <option value="resolved">Resolved Ticket</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button onClick={() => handleDeleteInquiry(inq.id)} className="p-1 rounded text-red-400 hover:bg-red-550/15">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : activeTab === "bookings" ? (
            /* Tab: BOOKINGS */
            <div className="space-y-4 text-xs font-sans">
              <h3 className="font-serif text-xl border-b border-luxury-gold/10 pb-2">Sacred Residency Sanctuary Calendar</h3>
              {bookings.length === 0 ? (
                <p className="text-gray-500 italic py-6 text-center">No patient calendars booked in Wayanad ledgers.</p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-luxury-gold/10">
                  <table className="w-full text-left bg-black/20 text-xs">
                    <thead>
                      <tr className="bg-white/5 font-mono text-[9px] uppercase tracking-widest text-luxury-gold border-b border-luxury-gold/15">
                        <th className="p-4">Visitor</th>
                        <th className="p-4">Modality Requested</th>
                        <th className="p-4">Date / Standard Time</th>
                        <th className="p-4">Admissions Status</th>
                        <th className="p-4 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-luxury-gold/10">
                      {bookings.map(b => (
                        <tr key={b.id} className="hover:bg-white/5">
                          <td className="p-4 space-y-0.5">
                            <p className="font-bold text-white">{b.name}</p>
                            <p className="text-gray-400 font-mono text-[10px]">{b.email}</p>
                            <p className="text-gray-500 font-mono text-[9px]">{b.phone}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-white">{b.service}</p>
                            <p className="text-gray-400 italic text-[10px]">Notes: "{b.notes || "None"}"</p>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <p className="font-mono text-white font-semibold">{b.date}</p>
                            <p className="text-gray-400 text-[10px] font-mono">{b.time}</p>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <select
                              value={b.status}
                              onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                              className={`px-2 py-1.5 rounded bg-black/50 font-mono text-[10px] uppercase border outline-none cursor-pointer ${
                                b.status === "pending" ? "text-orange-300 border-orange-500/25" : b.status === "confirmed" ? "text-emerald-300 border-emerald-500/25" : "text-gray-400 border-gray-500/25"
                              }`}
                            >
                              <option value="pending">Pending Attune</option>
                              <option value="confirmed">Confirmed Admission</option>
                              <option value="cancelled">Cancelled Admission</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button onClick={() => handleDeleteBooking(b.id)} className="p-1 rounded text-red-400 hover:bg-red-550/15">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            /* Tab: WELLNESS SETTINGS */
            <div className="space-y-8 text-xs font-sans animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* 1. Profile and Story Form */}
                <div className="p-6 rounded-xl border border-luxury-gold/10 bg-white/5 space-y-6">
                  <div className="border-b border-luxury-gold/10 pb-2 flex justify-between items-center">
                    <h3 className="font-serif text-lg text-white">Founder Profile &amp; Narrative</h3>
                    <Settings className="w-5 h-5 text-luxury-gold" />
                  </div>

                  <form onSubmit={handleUpdateAboutSettings} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Founder Display Name</label>
                        <input type="text" required value={vName} onChange={e => setVName(e.target.value)} className="w-full bg-white/5 border border-luxury-gold/20 rounded p-2 text-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Founder Executive Role</label>
                        <input type="text" required value={vRole} onChange={e => setVRole(e.target.value)} className="w-full bg-white/5 border border-luxury-gold/20 rounded p-2 text-white outline-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Profile Photo URL</label>
                      <input type="text" required value={vImage} onChange={e => setVImage(e.target.value)} className="w-full bg-white/5 border border-luxury-gold/20 rounded p-2 text-white outline-none" />
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Storytelling Biography (Separate double newline for paragraphs)</label>
                      <textarea rows={6} required value={vText} onChange={e => setVText(e.target.value)} className="w-full bg-white/5 border border-luxury-gold/20 rounded p-2 text-white outline-none resize-none" />
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Resonance Philosophy Statement</label>
                      <textarea rows={3} required value={vPhilosophy} onChange={e => setVPhilosophy(e.target.value)} className="w-full bg-white/5 border border-luxury-gold/20 rounded p-2 text-white outline-none" />
                    </div>

                    {/* Section Toggles */}
                    <div className="p-3 bg-black/40 rounded border border-luxury-gold/10 space-y-3">
                      <p className="text-[9px] font-mono uppercase text-luxury-gold">Division Visibility Overrides</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Display "About Vikranti" Story Module</span>
                        <input 
                          type="checkbox" 
                          checked={vShowAbout} 
                          onChange={e => setVShowAbout(e.target.checked)}
                          className="w-4 h-4 accent-luxury-gold rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Display "Social Media Reviews" Gallery</span>
                        <input 
                          type="checkbox" 
                          checked={vShowReviews} 
                          onChange={e => setVShowReviews(e.target.checked)}
                          className="w-4 h-4 accent-luxury-gold rounded"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={savingAbout}
                      className="cursor-pointer w-full py-2.5 border border-luxury-gold bg-luxury-gold text-black font-mono uppercase tracking-widest text-xs rounded hover:bg-luxury-gold-dark font-bold transition-all"
                    >
                      {savingAbout ? "Saving Settings..." : "Sync Spiritual Sanctuary"}
                    </button>
                  </form>
                </div>

                {/* 2. Review Screenshots Form & List */}
                <div className="space-y-6">
                  
                  {/* Upload Review */}
                  <div className="p-6 rounded-xl border border-luxury-gold/10 bg-white/5 space-y-4">
                    <div className="border-b border-luxury-gold/10 pb-2 flex justify-between items-center">
                      <h3 className="font-serif text-lg text-white">Add Review Screenshot</h3>
                      <Image className="w-5 h-5 text-luxury-gold" />
                    </div>

                    <form onSubmit={handleAddReviewScreenshot} className="space-y-4">
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Screenshot Image URL</label>
                        <input 
                          type="text" 
                          required 
                          value={revUrl} 
                          onChange={e => setRevUrl(e.target.value)} 
                          placeholder="https://images.unsplash..." 
                          className="w-full bg-white/5 border border-luxury-gold/20 rounded p-2 text-white outline-none" 
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Social Platform</label>
                          <select 
                            value={revPlatform} 
                            onChange={e => setRevPlatform(e.target.value as any)}
                            className="w-full bg-[#0b1a13] border border-luxury-gold/20 rounded p-2 text-white outline-none"
                          >
                            <option value="whatsapp">WhatsApp Message</option>
                            <option value="instagram">Instagram Direct</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1">Client Quote / Caption</label>
                          <input 
                            type="text" 
                            required 
                            value={revCaption} 
                            onChange={e => setRevCaption(e.target.value)} 
                            placeholder="e.g. Reiki review is unbelievable" 
                            className="w-full bg-white/5 border border-luxury-gold/20 rounded p-2 text-white outline-none" 
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={addingReview}
                        className="cursor-pointer w-full py-2 border border-luxury-gold bg-luxury-gold text-black font-mono uppercase tracking-widest text-xs rounded hover:bg-luxury-gold-dark font-bold transition-all"
                      >
                        {addingReview ? "Registering..." : "Add to Client Archives"}
                      </button>
                    </form>
                  </div>

                  {/* List screenshots */}
                  <div className="p-6 rounded-xl border border-luxury-gold/10 bg-white/5 space-y-4">
                    <h4 className="font-serif text-white uppercase text-xs border-b border-luxury-gold/10 pb-2 font-bold tracking-wider">
                      Archived Screenshot Manifest ({screenshotReviews.length})
                    </h4>

                    {screenshotReviews.length === 0 ? (
                      <p className="text-gray-500 italic text-center py-4 text-xs">No screenshot reviews uploaded.</p>
                    ) : (
                      <div className="max-h-[350px] overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                        {screenshotReviews.map(rev => (
                          <div key={rev.id} className="p-3 rounded-lg border border-luxury-gold/10 bg-black/30 flex items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={rev.imageUrl} 
                                alt={rev.caption} 
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded object-cover border border-luxury-gold/20" 
                              />
                              <div className="space-y-0.5">
                                <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                                  rev.platform === 'whatsapp' ? 'bg-[#128C7E]/20 text-emerald-400 border border-[#25D366]/20' : 'bg-[#833AB4]/20 text-purple-400 border border-[#FD1D1D]/25'
                                }`}>
                                  {rev.platform}
                                </span>
                                <p className="text-gray-200 text-xs font-light line-clamp-1 italic">"{rev.caption}"</p>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteReviewScreenshot(rev.id)}
                              className="p-1.5 text-red-400 hover:bg-red-500/15 rounded hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
