import emailjs from "@emailjs/browser";
import { EMAIL_TO } from "../lib/constants";

export interface EmailParams {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: "Contact" | "Export Inquiry" | "Therapy/Wellness Inquiry" | "Request Quote" | "Booking Request";
  pageSource: string;
}

/**
 * Reusable function to send emails via EmailJS.
 * It reads environment variables and sends the inquiry payload to sales@dharaaveda.com.
 */
export async function sendEmail(params: EmailParams): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error("[EmailService] EmailJS configuration is missing in environment variables:", {
      VITE_EMAILJS_SERVICE_ID: serviceId ? "Configured" : "Missing",
      VITE_EMAILJS_TEMPLATE_ID: templateId ? "Configured" : "Missing",
      VITE_EMAILJS_PUBLIC_KEY: publicKey ? "Configured" : "Missing",
    });
    throw new Error("Email service configuration is incomplete on this site. Please configure EmailJS environment variables.");
  }

  // Define email template parameters
  const templateParams = {
    name: params.name,
    email: params.email,
    phone: params.phone,
    subject: params.subject,
    message: params.message,
    inquiryType: params.inquiryType,
    pageSource: params.pageSource,
    to_email: EMAIL_TO,
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log("[EmailService] Email dispatched successfully:", response.status, response.text);
  } catch (error: any) {
    console.error("[EmailService] Failed to dispatch email via EmailJS:", error);
    throw new Error(error?.text || error?.message || "Failed to send email inquiry.");
  }
}
