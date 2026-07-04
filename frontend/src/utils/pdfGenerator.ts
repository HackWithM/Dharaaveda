import { jsPDF } from "jspdf";
import { Booking } from "../types";

// Helper to convert image URL to base64
const getBase64ImageFromUrl = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        try {
          const dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new Error("Canvas context is null"));
      }
    };
    img.onerror = (e) => reject(e);
  });
};

/**
 * Dynamically generates a premium PDF receipt for a booking
 */
export const generateBookingPDF = async (booking: Booking): Promise<jsPDF> => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const primaryColor = { r: 250, g: 152, b: 15 }; // Saffron #FA980F
  const darkCharcoal = { r: 17, g: 24, b: 39 };  // #111827
  const grayLabel = { r: 107, g: 114, b: 128 }; // #6B7280
  const lightBorder = { r: 229, g: 231, b: 235 }; // #E5E7EB
  const greenPaid = { r: 16, g: 185, b: 129 }; // #10B981

  // 1. Draw outer thin decorative border
  doc.setDrawColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setLineWidth(0.5);
  doc.rect(8, 8, 194, 281); // A4 is 210 x 297

  doc.setDrawColor(lightBorder.r, lightBorder.g, lightBorder.b);
  doc.rect(9.5, 9.5, 191, 278);

  // 2. Draw Top Saffron Color Accent bar
  doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.rect(10, 10, 190, 4, "F");

  // 3. Logo & Title Block
  let logoLoaded = false;
  try {
    // Try to load the logo relative to current origin
    const logoBase64 = await getBase64ImageFromUrl("/images/logo/logo.png");
    doc.addImage(logoBase64, "PNG", 20, 22, 16, 16);
    logoLoaded = true;
  } catch (err) {
    console.warn("Could not load PNG logo for PDF, drawing luxury vector emblem:", err);
  }

  if (!logoLoaded) {
    // Fallback: draw luxury geometric seal logo
    doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.ellipse(28, 30, 8, 8, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.text("DA", 28, 33.5, { align: "center" });
  }

  // Company Name
  doc.setTextColor(darkCharcoal.r, darkCharcoal.g, darkCharcoal.b);
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text("DHARAAVEDA", 42, 29);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(grayLabel.r, grayLabel.g, grayLabel.b);
  doc.text("SANCTUARY & AGRICULTURAL TRADE", 42, 33.5);

  // Invoice Meta Right-Aligned
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.text("RECEIPT REFERENCE SLIP", 190, 28, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(grayLabel.r, grayLabel.g, grayLabel.b);
  doc.text(`Booking Ref: ${booking.bookingId}`, 190, 33, { align: "right" });
  doc.text(`Status: Paid`, 190, 37, { align: "right" });

  // Divider Line
  doc.setDrawColor(lightBorder.r, lightBorder.g, lightBorder.b);
  doc.setLineWidth(0.3);
  doc.line(20, 44, 190, 44);

  // 4. Main Title
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(darkCharcoal.r, darkCharcoal.g, darkCharcoal.b);
  doc.text("Residency Booking Confirmation", 105, 54, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(grayLabel.r, grayLabel.g, grayLabel.b);
  doc.text(
    "Thank you. Your therapeutic residency has been secured at our Wayanad retreat.",
    105,
    60,
    { align: "center" }
  );

  // 5. Details Container Box
  const boxY = 68;
  const boxHeight = 120;
  doc.setFillColor(249, 250, 251); // Light slate bg
  doc.setDrawColor(lightBorder.r, lightBorder.g, lightBorder.b);
  doc.roundedRect(20, boxY, 170, boxHeight, 3, 3, "FD");

  // Grid/List rows
  const startXKey = 28;
  const startXValue = 182; // Right-aligned values
  let currentY = boxY + 12;

  const drawRow = (key: string, value: string, isPaidStatus = false, isAmount = false) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(grayLabel.r, grayLabel.g, grayLabel.b);
    doc.text(key.toUpperCase(), startXKey, currentY);

    if (isPaidStatus) {
      // Draw a small "PAID" green badge
      doc.setFillColor(greenPaid.r, greenPaid.g, greenPaid.b);
      // Small rounded rectangle for Paid badge
      doc.roundedRect(startXValue - 14, currentY - 3.5, 14, 5, 1, 1, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.text("PAID", startXValue - 7, currentY, { align: "center" });
    } else {
      doc.setTextColor(darkCharcoal.r, darkCharcoal.g, darkCharcoal.b);
      if (isAmount) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
      } else {
        doc.setFont("helvetica", "semibold");
      }
      doc.setFontSize(10);
      doc.text(value, startXValue, currentY, { align: "right" });
    }

    // Row divider
    currentY += 4;
    doc.setDrawColor(243, 244, 246); // even lighter border
    doc.line(28, currentY, 182, currentY);
    currentY += 8;
  };

  drawRow("Booking ID", booking.bookingId);
  drawRow("Therapy Type", booking.service);
  drawRow("Scheduled Date", booking.date);
  drawRow("Arrival Time", booking.time);
  drawRow("Duration", "1 Hour");
  drawRow("Customer Email", booking.email);
  drawRow("Transaction ID", booking.razorpayPaymentId || "N/A");
  drawRow("Payment Status", "Paid", true);
  
  // Format amount with currency code
  const formattedAmount = `INR ${booking.amount.toLocaleString("en-IN")}.00`;
  drawRow("Amount Paid", formattedAmount, false, true);

  // 6. Security & Policy Information Box
  const infoY = 196;
  doc.setFillColor(254, 248, 238); // Cream/Saffron hint bg
  doc.setDrawColor(253, 224, 170); // Border color
  doc.roundedRect(20, infoY, 170, 32, 2, 2, "FD");

  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("SANCTUARY ADMISSIONS & POLICIES", 26, infoY + 6);

  doc.setTextColor(darkCharcoal.r, darkCharcoal.g, darkCharcoal.b);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text("• Secrecy Intake: All biofield mapping and consultation files remain protected under certified NDA protocols.", 26, infoY + 12);
  doc.text("• Arrival Protocol: Please arrive 15 minutes before your zenith slot to align with Wayanad retreat atmospheres.", 26, infoY + 18);
  doc.text("• Cancellation: Inform the trade/admission council desk 24 hours prior to reschedule slots without forfeiture.", 26, infoY + 24);

  // 7. Footer section
  const footerY = 245;
  doc.setDrawColor(lightBorder.r, lightBorder.g, lightBorder.b);
  doc.line(20, footerY, 190, footerY);

  doc.setFont("times", "italic");
  doc.setFontSize(9);
  doc.setTextColor(grayLabel.r, grayLabel.g, grayLabel.b);
  doc.text("Harmonizing Vedic Agriculture & Aura Modalities", 105, footerY + 6, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text("Wayanad Highlands, Kerala, India  |  Corporate: Mharunji, Pune – 411057, Maharashtra", 105, footerY + 11, { align: "center" });
  
  // Generated time metadata
  const generatedTimeStr = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  });
  doc.setTextColor(156, 163, 175);
  doc.setFontSize(7);
  doc.text(`Generated dynamically on: ${generatedTimeStr}`, 105, footerY + 17, { align: "center" });

  return doc;
};

/**
 * Triggers a browser download of the receipt PDF
 */
export const downloadReceipt = async (booking: Booking): Promise<boolean> => {
  try {
    const doc = await generateBookingPDF(booking);
    const pdfBytes = doc.output("arraybuffer");
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(pdfBlob);

    const filename = `Booking_Receipt_${booking.bookingId}.pdf`;

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.type = "application/pdf";

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

    return true;
  } catch (err) {
    console.error("PDF download failed:", err);
    return false;
  }
};

/**
 * Shares the receipt PDF directly via Web Share API
 */
export const shareReceipt = async (booking: Booking): Promise<{ success: boolean; error?: string }> => {
  try {
    const doc = await generateBookingPDF(booking);
    const pdfBlob = doc.output("blob");
    const filename = `Booking_Receipt_${booking.bookingId}.pdf`;
    const file = new File([pdfBlob], filename, { type: "application/pdf" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: `Residency Booking Confirmation`,
        text: `Here is your DharaAveda Sanctuary booking confirmation for ${booking.service}.`
      });
      return { success: true };
    } else {
      return { success: false, error: "Web sharing not supported on this browser or platform." };
    }
  } catch (err: any) {
    console.error("PDF sharing failed:", err);
    return { success: false, error: err.message || "Failed to share receipt." };
  }
};
