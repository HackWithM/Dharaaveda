import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Download, Share2, FileText, CheckCircle, AlertCircle, X, Sparkles, ChevronRight, RefreshCw, Mail, Phone, CalendarRange } from "lucide-react";
import { Booking } from "../types";
import { downloadReceipt, shareReceipt } from "../utils/pdfGenerator";
import { useLanguage } from "../lib/LanguageContext";
import { staticTranslations } from "../lib/translations";
import { useSeo } from "../lib/useSeo";

export default function MyBookings() {
  const { lang } = useLanguage();
  const t = staticTranslations[lang] || staticTranslations.en;

  // SEO details
  useSeo("My Bookings | DharaAveda Sanctuary", "View details and download PDF receipts for your scheduled therapy residencies at DharaAveda Sanctuary.");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Actions states
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [sharingId, setSharingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dharaaveda_bookings");
      if (stored) {
        const parsed = JSON.parse(stored) as Booking[];
        // Sort bookings chronologically, newest first
        parsed.sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime());
        setBookings(parsed);
      }
    } catch (err) {
      console.error("Failed to load local bookings:", err);
    }
  }, []);

  const handleDownload = async (booking: Booking, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDownloadingId(booking.bookingId);
    setActionMessage({ type: "", text: "" });
    try {
      const success = await downloadReceipt(booking);
      if (success) {
        setActionMessage({ type: "success", text: "Receipt downloaded successfully." });
      } else {
        setActionMessage({ type: "error", text: "Failed to generate PDF receipt." });
      }
    } catch (err: any) {
      setActionMessage({ type: "error", text: err.message || "Failed to generate receipt." });
    } finally {
      setDownloadingId(null);
    }
  };

  const handleShare = async (booking: Booking, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSharingId(booking.bookingId);
    setActionMessage({ type: "", text: "" });
    try {
      const res = await shareReceipt(booking);
      if (res.success) {
        setActionMessage({ type: "success", text: "Receipt shared successfully." });
      } else if (res.error) {
        setActionMessage({ type: "error", text: res.error });
      }
    } catch (err: any) {
      setActionMessage({ type: "error", text: err.message || "Failed to share receipt." });
    } finally {
      setSharingId(null);
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen pt-28 pb-24 px-4 font-sans relative">
      {/* Golden/Saffron Radial Glow Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-radial-[circle_at_top,_var(--color-orange-500)_0%,_transparent_60%] opacity-5 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Page Title & Header */}
        <div className="text-left space-y-4 border-b border-gray-100 pb-6">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[10px] font-mono text-orange-600 font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Sacred Ledger</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-gray-900 leading-tight">
            My Bookings
          </h1>
          <p className="text-xs sm:text-sm text-gray-650 leading-relaxed font-light max-w-xl">
            Track your scheduled high-vibrational therapy sessions and download or share your premium residency receipts.
          </p>
        </div>

        {/* Action Status Notification */}
        {actionMessage.text && (
          <div className={`p-4 rounded-xl text-xs flex items-center justify-between border transition-all duration-300 ${
            actionMessage.type === "success" 
              ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            <div className="flex items-center space-x-2">
              {actionMessage.type === "success" ? (
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              <span className="font-medium">{actionMessage.text}</span>
            </div>
            <button onClick={() => setActionMessage({ type: "", text: "" })} className="p-1 hover:bg-black/5 rounded-full">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Bookings List Section */}
        {bookings.length === 0 ? (
          /* PERSISTENT EMPTY STATE */
          <div className="border border-gray-150 rounded-[32px] bg-slate-50/50 p-8 sm:p-16 text-center space-y-6 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 border border-orange-200 text-[#FA980F] mb-2">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">No Residencies Scheduled</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed font-light font-sans">
                You haven't scheduled any therapy sessions yet. Let's align your energy field and attune your bio-frequencies today.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/booking"
                className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#FA980F] hover:bg-orange-600 text-white font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300 shadow-md hover:shadow-orange-500/10 cursor-pointer"
              >
                <CalendarRange className="w-4 h-4" />
                <span>Schedule Session</span>
              </Link>
            </div>
          </div>
        ) : (
          /* BOOKINGS LIST */
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                onClick={() => {
                  setSelectedBooking(booking);
                  setActionMessage({ type: "", text: "" });
                }}
                className="group border border-gray-200 hover:border-[#FA980F] rounded-2xl p-5 bg-white hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
              >
                <div className="space-y-3 flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-mono font-bold text-gray-400 bg-gray-105 border border-gray-200 px-2 py-0.5 rounded">
                      {booking.bookingId}
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-emerald-50 border border-emerald-200 text-emerald-600 px-2 py-0.5 rounded uppercase">
                      PAID
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-base font-bold text-gray-900 group-hover:text-[#FA980F] transition-colors">
                    {booking.service}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{booking.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{booking.time}</span>
                    </span>
                  </div>
                </div>

                {/* Actions column */}
                <div className="flex items-center gap-2 border-t border-gray-100 pt-3 sm:border-t-0 sm:pt-0 shrink-0">
                  <button
                    onClick={(e) => handleDownload(booking, e)}
                    disabled={downloadingId === booking.bookingId}
                    className="p-2.5 text-gray-500 hover:text-[#FA980F] hover:bg-orange-50/50 rounded-xl transition-all disabled:opacity-50"
                    title="Download PDF Receipt"
                  >
                    {downloadingId === booking.bookingId ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-[#FA980F]" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={(e) => handleShare(booking, e)}
                    disabled={sharingId === booking.bookingId}
                    className="p-2.5 text-gray-500 hover:text-gray-950 hover:bg-gray-100 rounded-xl transition-all"
                    title="Share Receipt"
                  >
                    {sharingId === booking.bookingId ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  <button className="flex items-center space-x-0.5 px-3 py-2 bg-gray-50 group-hover:bg-[#FA980F] text-gray-600 group-hover:text-white rounded-xl text-[10px] font-mono uppercase tracking-wider font-bold transition-all ml-2">
                    <span>View Slip</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DETAIL VIEW MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          {/* Modal Backdrop Click handler */}
          <div className="fixed inset-0" onClick={() => setSelectedBooking(null)} />

          {/* Modal Content container */}
          <div className="relative bg-white border border-gray-200 rounded-[28px] max-w-md w-full p-6 space-y-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setSelectedBooking(null)}
                className="cursor-pointer p-2 rounded-full text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all border border-gray-200"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Confirmed / Slip header */}
            <div className="text-center space-y-4 pt-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-gray-900 uppercase tracking-wide">Booking Reference Slip</h3>
                <p className="text-[10px] text-gray-500 font-mono">Status: Persisted Paid Account</p>
              </div>
            </div>

            {/* Slip rows */}
            <div className="p-5 bg-slate-50 border border-gray-200 rounded-2xl text-xs space-y-3.5">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-450 font-mono text-[9px] uppercase tracking-wider">Booking ID</span>
                <span className="font-mono font-bold text-gray-900">{selectedBooking.bookingId}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-3">
                <span className="text-gray-450 font-mono text-[9px] uppercase tracking-wider">Therapy Type</span>
                <span className="font-bold text-gray-950">{selectedBooking.service}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-3">
                <span className="text-gray-450 font-mono text-[9px] uppercase tracking-wider">Date</span>
                <span className="font-bold text-gray-950">{selectedBooking.date}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-3">
                <span className="text-gray-450 font-mono text-[9px] uppercase tracking-wider">Arrival Time</span>
                <span className="font-bold text-gray-950">{selectedBooking.time}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-3">
                <span className="text-gray-450 font-mono text-[9px] uppercase tracking-wider">Duration</span>
                <span className="font-semibold text-gray-800">1 Hour</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-3">
                <span className="text-gray-450 font-mono text-[9px] uppercase tracking-wider">Customer Email</span>
                <span className="font-semibold text-gray-900 break-all max-w-[200px] text-right">{selectedBooking.email}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-3">
                <span className="text-gray-450 font-mono text-[9px] uppercase tracking-wider">Transaction ID</span>
                <span className="font-mono font-medium text-gray-700">{selectedBooking.razorpayPaymentId || "Mock-Checkout"}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-3 font-bold">
                <span className="text-gray-450 font-mono text-[9px] uppercase tracking-wider">Amount Paid</span>
                <span className="text-[#FA980F] text-sm">₹{selectedBooking.amount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Actions panel */}
            <div className="flex flex-col gap-3 font-mono text-xs">
              <button
                onClick={() => handleDownload(selectedBooking)}
                disabled={downloadingId === selectedBooking.bookingId}
                className="cursor-pointer flex items-center justify-center space-x-2 py-3.5 bg-[#FA980F] hover:bg-orange-600 text-white font-bold uppercase rounded-xl tracking-wider transition-all duration-200 active:scale-98 disabled:opacity-50"
              >
                {downloadingId === selectedBooking.bookingId ? (
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
                onClick={() => handleShare(selectedBooking)}
                disabled={sharingId === selectedBooking.bookingId}
                className="cursor-pointer flex items-center justify-center space-x-2 py-3.5 border border-gray-350 hover:border-gray-950 text-gray-700 hover:text-gray-950 font-bold uppercase rounded-xl tracking-wider transition-all bg-white disabled:opacity-50"
              >
                {sharingId === selectedBooking.bookingId ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                <span>Share Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
