import React, { useState, useEffect } from "react";
import { Sparkles, CalendarRange, Clock, CheckCircle, Mail, User, Phone, BookOpen, ChevronRight, ChevronLeft, ShieldCheck, AlertCircle, RefreshCw, Download, Share2 } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { TherapyService, Booking } from "../types";
import { api } from "../lib/api";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";
import { sendEmail } from "../services/emailService";
import { EMAIL_TO, PHONE_NUMBER } from "../lib/constants";
import { downloadReceipt, shareReceipt } from "../utils/pdfGenerator";


const saveBookingToLocalStorage = (booking: Booking) => {
  try {
    const existing = localStorage.getItem("dharaaveda_bookings");
    const bookings = existing ? JSON.parse(existing) : [];
    if (!bookings.some((b: Booking) => b.bookingId === booking.bookingId)) {
      bookings.push(booking);
      localStorage.setItem("dharaaveda_bookings", JSON.stringify(bookings));
    }
  } catch (err) {
    console.error("Failed to persist booking in localStorage:", err);
  }
};

interface BookingFormProps {
  preselectedServiceId?: string;
  onSuccess?: () => void;
}

export default function BookingForm({ preselectedServiceId = "", onSuccess }: BookingFormProps) {
  const navigate = useNavigate();

  const { lang } = useLanguage();
  const t = staticTranslations[lang] || staticTranslations.en;

  const [step, setStep] = useState(1);
  const [services, setServices] = useState<TherapyService[]>([]);
  const [selectedService, setSelectedService] = useState(preselectedServiceId);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [busySlots, setBusySlots] = useState<{ time: string; service: string }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Custom Calendar States
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-indexed

  // Razorpay Checkout states
  const [rzpOrderId, setRzpOrderId] = useState("");
  const [isMockPayment, setIsMockPayment] = useState(false);
  const [paymentKeyId, setPaymentKeyId] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [pdfMessage, setPdfMessage] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });

  const sendBookingEmail = async (booking: Booking) => {
    try {
      await sendEmail({
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        subject: `New Booking Confirmed: ${booking.service} (ID: ${booking.bookingId})`,
        message: `Booking Reference ID: ${booking.bookingId}\nService: ${booking.service}\nScheduled Date: ${booking.date}\nTime Slot: ${booking.time}\nAmount Charged: ₹${booking.amount}\nNotes: ${booking.notes || "None"}`,
        inquiryType: "Booking Request",
        pageSource: "/booking"
      });
    } catch (err) {
      console.error("Failed to send booking email:", err);
    }
  };

  const handleDownload = async () => {
    if (!confirmedBooking) return;
    setDownloading(true);
    setPdfMessage({ type: "", text: "" });
    try {
      const success = await downloadReceipt(confirmedBooking);
      if (success) {
        setPdfMessage({ type: "success", text: "Receipt downloaded successfully." });
      } else {
        setPdfMessage({ type: "error", text: "PDF generation failed. Please try again." });
      }
    } catch (err: any) {
      setPdfMessage({ type: "error", text: err.message || "Failed to generate receipt." });
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!confirmedBooking) return;
    setSharing(true);
    setPdfMessage({ type: "", text: "" });
    try {
      const res = await shareReceipt(confirmedBooking);
      if (res.success) {
        setPdfMessage({ type: "success", text: "Receipt shared successfully." });
      } else if (res.error) {
        setPdfMessage({ type: "error", text: res.error });
      }
    } catch (err: any) {
      setPdfMessage({ type: "error", text: err.message || "Failed to share receipt." });
    } finally {
      setSharing(false);
    }
  };



  // Load services and set preselected if matches
  useEffect(() => {
    async function loadServices() {
      try {
        const data = await api.getServices();
        // Display only Bach Flower and Rekkhanoho Therapy as bookable options
        const filtered = data.filter(s => s.id === "bach-flower" || s.id === "reiki-aurasoma");
        setServices(filtered);
        
        if (preselectedServiceId) {
          const matched = filtered.find(s => s.id === preselectedServiceId);
          if (matched) {
            setSelectedService(matched.id);
            setStep(2); // Auto advance to calendar if preselected
          }
        } else if (filtered.length > 0 && !selectedService) {
          setSelectedService(filtered[0].id);
        }
      } catch (err) {
        console.error("Error loading services for booking form:", err);
      }
    }
    loadServices();
  }, [preselectedServiceId]);

  // Load busy slots when date changes
  useEffect(() => {
    if (date) {
      async function checkSlots() {
        setLoadingSlots(true);
        try {
          const slots = await api.getBusySlots(date);
          setBusySlots(slots);
        } catch (err) {
          console.error("Error checking busy slots:", err);
        } finally {
          setLoadingSlots(false);
        }
      }
      checkSlots();
    }
  }, [date]);

  const activeService = services.find((s) => s.id === selectedService);
  const activeServiceName = activeService?.translations?.[lang]?.name || activeService?.name || "Therapy Session";

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep(2);
  };

  const handleDateSelect = (selectedDateStr: string) => {
    setDate(selectedDateStr);
    setTime(""); // Reset time selection on date change
    setStep(3);
  };

  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime);
    setStep(4);
  };

  // Dynamic Razorpay Script Loader
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Initiate Booking
  const handleProceedToPayment = async () => {
    setError("");

    if (!name || !email || !phone) {
      setError("Please fill in your name, email and direct mobile number.");
      setStep(4);
      return;
    }

    setLoading(true);

    try {
      const orderRes = await api.createPaymentOrder(2000);

      setRzpOrderId(orderRes.orderId);
      setPaymentKeyId(orderRes.keyId);

      if (orderRes.isMock) {
        setIsMockPayment(true);
        setStep(5);
      } else {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error("Failed to load Razorpay payment gateway script. Please verify internet connection.");
        }

        const options = {
          key: orderRes.keyId,
          amount: orderRes.amount,
          currency: orderRes.currency,
          name: "DharaAveda Sanctuary",
          description: `${activeServiceName} Booking`,
          order_id: orderRes.orderId,
          handler: async function (response: any) {
            setLoading(true);
            try {
              const verifyRes = await api.verifyPaymentAndBook({
                razorpayOrderId: orderRes.orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              }, {
                name,
                email,
                phone,
                service: activeServiceName,
                date,
                time,
                notes: notes || "Standard therapy residency request.",
                amount: 2000
              });

              if (verifyRes.success) {
                saveBookingToLocalStorage(verifyRes.booking);
                setConfirmedBooking(verifyRes.booking);
                setStep(6);
                await sendBookingEmail(verifyRes.booking);
                if (onSuccess) onSuccess();
              } else {
                setError("Payment signature verification failed.");
              }
            } catch (err: any) {
              setError(err.message || "Payment verification failed.");
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            name,
            email,
            contact: phone
          },
          theme: {
            color: "#FA980F" // Saffron accent
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          setError(`Transaction declined: ${response.error.description}`);
          setLoading(false);
        });
        rzp.open();
      }
    } catch (err: any) {
      setError(err.message || "Failed to initiate booking transaction.");
    } finally {
      setLoading(false);
    }
  };

  // Mock Payment Controls
  const handleMockPaymentAction = async (isSuccess: boolean) => {
    setLoading(true);
    setError("");
    try {
      if (isSuccess) {
        const verifyRes = await api.verifyPaymentAndBook({
          razorpayOrderId: rzpOrderId,
          razorpayPaymentId: "pay_mock_" + Math.random().toString(36).substring(2, 10),
          razorpaySignature: "sig_mock_" + Math.random().toString(36).substring(2, 10)
        }, {
          name,
          email,
          phone,
          service: activeServiceName,
          date,
          time,
          notes: notes || "Standard therapy residency request.",
          amount: 2000
        });

        if (verifyRes.success) {
          saveBookingToLocalStorage(verifyRes.booking);
          setConfirmedBooking(verifyRes.booking);
          setStep(6);
          await sendBookingEmail(verifyRes.booking);
          if (onSuccess) onSuccess();
        } else {
          setError("Mock payment confirmation failed.");
        }
      } else {
        setError("Mock payment was cancelled by user.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to log mock verification.");
    } finally {
      setLoading(false);
    }
  };

  // Generate Calendar Grid Days
  const getDaysInMonthGrid = () => {
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = endOfMonth.getDate();
    const startDayOfWeek = startOfMonth.getDay(); // 0 is Sun

    const cells: (Date | null)[] = [];

    // Prefix empty cells
    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push(null);
    }

    // Month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(currentYear, currentMonth, d));
    }

    return cells;
  };

  const handlePrevMonth = () => {
    const today = new Date();
    if (currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
      return; // prevent going into the past
    }
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const timeSlots = [
    { value: "08:00 AM", label: "08:00 AM", name: "Sunrise Dew Intake" },
    { value: "11:00 AM", label: "11:00 AM", name: "Solar Zenith Sync" },
    { value: "02:30 PM", label: "02:30 PM", name: "Afternoon Starlight" },
    { value: "05:30 PM", label: "05:30 PM", name: "Wayanad Sunset Calm" }
  ];

  return (
    <div className="w-full font-sans text-gray-900">
      {/* Steps Header Navigation */}
      {step <= 5 && (
        <div className="flex justify-between items-center px-6 sm:px-10 py-4 border-b border-gray-100 bg-slate-50 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500 font-semibold select-none">
          <div className="flex items-center space-x-2">
            <span className={`flex items-center justify-center w-5 h-5 rounded-full border text-[9px] ${step >= 1 ? 'border-[#FA980F] bg-[#FA980F] text-white' : 'border-gray-300'}`}>1</span>
            <span className={step === 1 ? 'text-gray-900 font-bold' : ''}>Therapy</span>
          </div>
          <div className="w-4 h-0.5 bg-gray-200" />
          <div className="flex items-center space-x-2">
            <span className={`flex items-center justify-center w-5 h-5 rounded-full border text-[9px] ${step >= 2 ? 'border-[#FA980F] bg-[#FA980F] text-white' : 'border-gray-300'}`}>2</span>
            <span className={step === 2 ? 'text-gray-900 font-bold' : ''}>Date</span>
          </div>
          <div className="w-4 h-0.5 bg-gray-200" />
          <div className="flex items-center space-x-2">
            <span className={`flex items-center justify-center w-5 h-5 rounded-full border text-[9px] ${step >= 3 ? 'border-[#FA980F] bg-[#FA980F] text-white' : 'border-gray-300'}`}>3</span>
            <span className={step === 3 ? 'text-gray-900 font-bold' : ''}>Time</span>
          </div>
          <div className="w-4 h-0.5 bg-gray-200" />
          <div className="flex items-center space-x-2">
            <span className={`flex items-center justify-center w-5 h-5 rounded-full border text-[9px] ${step >= 4 ? 'border-[#FA980F] bg-[#FA980F] text-white' : 'border-gray-300'}`}>4</span>
            <span className={step === 4 ? 'text-gray-900 font-bold' : ''}>Details</span>
          </div>
          <div className="w-4 h-0.5 bg-gray-200" />
          <div className="flex items-center space-x-2">
            <span className={`flex items-center justify-center w-5 h-5 rounded-full border text-[9px] ${step >= 5 ? 'border-[#FA980F] bg-[#FA980F] text-white' : 'border-gray-300'}`}>5</span>
            <span className={step === 5 ? 'text-gray-900 font-bold' : ''}>Payment</span>
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="p-6 sm:p-10 text-left">
        {error && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: SERVICE SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900">Select Your Sanctuary Therapy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => handleServiceSelect(srv.id)}
                  className={`p-6 border rounded-2xl cursor-pointer hover:border-[#FA980F] hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between ${
                    selectedService === srv.id ? 'border-[#FA980F] bg-orange-50/20 ring-1 ring-[#FA980F]' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-mono tracking-widest text-[#FA980F] uppercase font-bold">{srv.category}</span>
                      <span className="text-xs font-bold text-gray-900">{srv.pricing}</span>
                    </div>
                    <h4 className="font-serif text-base font-semibold group-hover:text-[#FA980F] transition-colors">{srv.translations?.[lang]?.name || srv.name}</h4>
                    <p className="text-xs text-gray-650 leading-relaxed font-light">{srv.translations?.[lang]?.description || srv.description}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4 text-[10px] font-mono uppercase tracking-widest text-[#FA980F] font-bold">
                    <span>{srv.duration} Session</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">Choose <ChevronRight className="w-3.5 h-3.5" /></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: CUSTOM CALENDAR DATE SELECT */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900">Select Session Date</h3>
              <button
                onClick={() => setStep(1)}
                className="flex items-center space-x-1 text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-gray-950 font-bold border border-gray-200 px-3 py-1.5 rounded-full"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            {/* Custom Monthly Calendar Frame */}
            <div className="max-w-md mx-auto border border-gray-200 rounded-3xl bg-white overflow-hidden shadow-sm">
              <div className="flex justify-between items-center p-4 px-6 bg-slate-50 border-b border-gray-250">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 rounded-full border border-gray-200 hover:bg-white text-gray-650 hover:text-gray-900 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-serif text-sm font-semibold tracking-wide text-gray-900">
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-1 rounded-full border border-gray-200 hover:bg-white text-gray-650 hover:text-gray-900 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>

              <div className="p-4 pt-0 grid grid-cols-7 gap-1.5 text-center">
                {getDaysInMonthGrid().map((day, idx) => {
                  if (!day) return <div key={idx} />;

                  const today = new Date();
                  today.setHours(0,0,0,0);
                  const isPast = day < today;
                  const dateStr = day.toISOString().split("T")[0];
                  const isSelected = date === dateStr;

                  return (
                    <button
                      key={idx}
                      disabled={isPast}
                      onClick={() => handleDateSelect(dateStr)}
                      className={`w-9.5 h-9.5 rounded-xl text-xs flex items-center justify-center font-semibold transition-all select-none cursor-pointer ${
                        isSelected
                          ? "bg-[#FA980F] text-white shadow-md shadow-[#FA980F]/20 font-bold scale-105"
                          : isPast
                          ? "text-gray-350 cursor-not-allowed"
                          : "text-gray-800 hover:bg-slate-100"
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: TIME SLOT SELECTION */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900">Select Available Time Slot</h3>
              <button
                onClick={() => setStep(2)}
                className="flex items-center space-x-1 text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-gray-950 font-bold border border-gray-200 px-3 py-1.5 rounded-full"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            <div className="p-4 border border-gray-150 rounded-2xl bg-slate-50/50 flex justify-between items-center text-xs">
              <p className="text-gray-600">Selected Date: <strong className="text-gray-900">{date}</strong></p>
              <button onClick={() => setStep(2)} className="text-[10px] font-mono text-[#FA980F] font-bold hover:underline">Change</button>
            </div>

            {loadingSlots ? (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-6 h-6 animate-spin text-[#FA980F] mx-auto" />
                <p className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Consulting residency slots...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {timeSlots.map((slot) => {
                  const isBooked = busySlots.some(b => b.time === slot.value);
                  const isSelected = time === slot.value;
                  return (
                    <button
                      key={slot.value}
                      disabled={isBooked}
                      onClick={() => handleTimeSelect(slot.value)}
                      className={`p-5 rounded-2xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#FA980F] bg-orange-50/20 ring-1 ring-[#FA980F]"
                          : isBooked
                          ? "border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed"
                          : "border-gray-200 bg-white hover:border-[#FA980F] hover:shadow-md"
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="font-mono text-xs font-bold text-gray-900 flex items-center space-x-1.5">
                          <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FA980F]' : 'text-gray-400'}`} />
                          <span>{slot.label}</span>
                        </span>
                        <p className="text-[10px] text-gray-500">{slot.name}</p>
                      </div>
                      <span className={`text-[9px] font-mono uppercase font-bold px-2 py-1 rounded ${
                        isSelected
                          ? "bg-[#FA980F] text-white"
                          : isBooked
                          ? "bg-red-50 text-red-500"
                          : "bg-slate-50 text-gray-500"
                      }`}>
                        {isBooked ? "Booked" : isSelected ? "Selected" : "Available"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* STEP 4: CUSTOMER DETAILS FORM */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900">Enter Details</h3>
              <button
                onClick={() => setStep(3)}
                className="flex items-center space-x-1 text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-gray-950 font-bold border border-gray-200 px-3 py-1.5 rounded-full"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setStep(5); }} className="space-y-4 font-sans text-xs text-gray-650">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[9px] font-mono uppercase tracking-widest text-gray-600 mb-1.5 font-bold">Your Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-450" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Heinrich Müller"
                      className="w-full bg-slate-50 border border-gray-350 focus:border-[#FA980F] rounded-xl pl-10 pr-3 py-2.5 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono uppercase tracking-widest text-gray-600 mb-1.5 font-bold">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-450" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={`e.g. ${EMAIL_TO}`}
                      className="w-full bg-slate-50 border border-gray-350 focus:border-[#FA980F] rounded-xl pl-10 pr-3 py-2.5 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono uppercase tracking-widest text-gray-600 mb-1.5 font-bold">Direct Mobile Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-450" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={`e.g. ${PHONE_NUMBER}`}
                    className="w-full bg-slate-50 border border-gray-350 focus:border-[#FA980F] rounded-xl pl-10 pr-3 py-2.5 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono uppercase tracking-widest text-gray-600 mb-1.5 font-bold">Symptoms, Notes or Special Requests (Optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention any adaptogenic preferences or specific somatic distress fields..."
                  className="w-full bg-slate-50 border border-gray-350 focus:border-[#FA980F] rounded-xl px-3 py-2 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none transition-colors resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer flex items-center justify-center space-x-2 py-3.5 bg-black text-white hover:bg-gray-800 transition-colors rounded-xl font-bold tracking-widest uppercase text-xs shadow-md mt-4"
              >
                <span>Continue to Summary</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 5: BOOKING SUMMARY & PAYMENT GATES */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900">Payment &amp; Booking Confirmation</h3>
              <button
                onClick={() => setStep(4)}
                className="flex items-center space-x-1 text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-gray-950 font-bold border border-gray-200 px-3 py-1.5 rounded-full"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            {/* Summary details card */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-slate-50 space-y-4">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#FA980F] font-bold">Booking Details Summary</span>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <p className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Therapy Modality</p>
                  <p className="font-serif text-sm font-semibold text-gray-900 mt-0.5">{activeServiceName}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Session Rate</p>
                  <p className="font-serif text-sm font-semibold text-[#FA980F] mt-0.5">₹2,000</p>
                </div>
                <div>
                  <p className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Scheduled Date</p>
                  <p className="font-serif text-sm font-semibold text-gray-900 mt-0.5">{date}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Time Slot</p>
                  <p className="font-serif text-sm font-semibold text-gray-900 mt-0.5">{time} (1 Hour)</p>
                </div>
                <div className="col-span-2 border-t border-gray-200 pt-3 mt-1">
                  <p className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Patient Information</p>
                  <p className="font-bold text-gray-800 mt-0.5">{name} <span className="font-mono font-medium text-gray-400">({phone})</span></p>
                  <p className="text-gray-500 font-mono text-[10px]">{email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 font-sans text-xs text-gray-650">
              {isMockPayment ? (
                // Dev-friendly Mock checkout verification controls
                <div className="p-6 border border-luxury-gold/25 bg-gray-950 text-white rounded-2xl text-center space-y-4">
                  <ShieldCheck className="w-10 h-10 text-[#FA980F] mx-auto animate-pulse" />
                  <div className="space-y-1.5">
                    <h4 className="font-mono text-xs font-bold uppercase text-[#FA980F] tracking-widest">Mock Payment Control Panel</h4>
                    <p className="text-[10px] text-gray-400 font-mono max-w-xs mx-auto leading-relaxed">
                      API keys missing. Test transaction outcomes using developer handles below:
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center pt-2">
                    <button
                      onClick={() => handleMockPaymentAction(true)}
                      disabled={loading}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      {loading && <RefreshCw className="w-3 animate-spin" />}
                      <span>Simulate Success</span>
                    </button>
                    <button
                      onClick={() => handleMockPaymentAction(false)}
                      disabled={loading}
                      className="px-5 py-2.5 bg-red-650 hover:bg-red-750 text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider"
                    >
                      Simulate Fail
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleProceedToPayment}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-[#FA980F] hover:bg-orange-600 text-white transition-colors rounded-xl font-bold tracking-widest uppercase text-xs shadow-md shadow-[#FA980F]/20 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Contacting Payment Portals...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Proceed to Pay ₹2,000</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 6: BOOKING CONFIRMED SUCCESS PAGE */}
        {step === 6 && confirmedBooking && (
          <div className="py-6 text-center space-y-6 font-sans animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold tracking-wide uppercase text-gray-900">
                Residency Booking Confirmed!
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Thank you. Your appointment has been secured, and a confirmation email was successfully dispatched to <strong className="text-gray-700">{confirmedBooking.email}</strong>.
              </p>
            </div>

            {/* Receipt PDF status toast */}
            {pdfMessage.text && (
              <div className={`p-4 rounded-xl text-xs max-w-md mx-auto flex items-center justify-center space-x-2 border transition-all duration-300 ${
                pdfMessage.type === "success" 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                  : "bg-red-50 border-red-200 text-red-700"
              }`}>
                {pdfMessage.type === "success" ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                )}
                <span className="font-medium">{pdfMessage.text}</span>
              </div>
            )}

            {/* Receipt Reference Slip card */}
            <div className="p-6 bg-white border border-gray-200 rounded-[24px] max-w-md mx-auto text-xs text-gray-700 space-y-4 shadow-sm">
              <p className="text-gray-400 font-mono text-[9px] uppercase tracking-[0.2em] border-b border-gray-100 pb-3 text-center">Receipt Reference Slip</p>
              
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Booking ID</span>
                <span className="font-mono font-bold text-gray-900">{confirmedBooking.bookingId}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-3">
                <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Therapy Type</span>
                <span className="font-bold text-gray-950">{confirmedBooking.service}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-3">
                <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Date</span>
                <span className="font-bold text-gray-950">{confirmedBooking.date}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-3">
                <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Arrival Time</span>
                <span className="font-bold text-gray-950">{confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-3">
                <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Duration</span>
                <span className="font-semibold text-gray-800">1 Hour</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-3 font-bold">
                <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Amount Paid</span>
                <span className="text-[#FA980F] text-sm">₹{confirmedBooking.amount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Receipt Actions Row */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2 text-xs font-mono">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-grow cursor-pointer flex items-center justify-center space-x-2 py-3.5 bg-[#FA980F] hover:bg-orange-600 text-white font-bold uppercase rounded-xl tracking-wider transition-all duration-200 active:scale-98 shadow-md hover:shadow-orange-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Receipt (PDF)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                disabled={sharing}
                className="cursor-pointer flex items-center justify-center space-x-2 py-3.5 px-6 border border-gray-250 hover:border-gray-950 text-gray-700 hover:text-gray-950 font-bold uppercase rounded-xl tracking-wider transition-all bg-white disabled:opacity-50"
                title="Share Booking Details"
              >
                {sharing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                <span>Share</span>
              </button>
            </div>

            {/* Standard navigation options */}
            <div className="border-t border-gray-100 pt-6 mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto text-xs font-mono">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-md text-center cursor-pointer"
              >
                Go to Home Page
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedService("");
                  setDate("");
                  setTime("");
                  setPhone("");
                  setNotes("");
                  setError("");
                  setConfirmedBooking(null);
                  setIsMockPayment(false);
                  setPdfMessage({ type: "", text: "" });
                }}
                className="px-6 py-3 border border-gray-300 hover:border-gray-950 text-gray-700 hover:text-gray-950 font-bold uppercase tracking-wider rounded-xl transition-all text-center bg-white cursor-pointer"
              >
                Book Another Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
