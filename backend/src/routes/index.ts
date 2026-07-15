import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Razorpay from "razorpay";
import fs from "fs";
import path from "path";
import { requireAuth, optionalAuth, AuthenticatedRequest } from "../middleware/auth.middleware";
import { AboutContent } from "../models/About";
import { Booking } from "../models/Booking";
import { Inquiry } from "../models/Inquiry";
import { Product } from "../models/Product";
import { ScreenshotReview } from "../models/ScreenshotReview";
import { TherapyService } from "../models/Service";
import { Testimonial } from "../models/Testimonial";
import { sendConfirmationEmail, sendBookingNotificationEmail, sendInquiryNotificationEmail } from "../services/email.service";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const router = Router();

const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1599940778173-e270d47be24e?auto=format&fit=crop&q=80&w=800";
const DEFAULT_SERVICE_IMAGE =
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800";
const DEFAULT_TESTIMONIAL_IMAGE =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200";

const DEFAULT_ABOUT = {
  _id: "about_vikranti",
  aboutText:
    "DharaAveda blends agricultural trade, traditional wellness, and holistic care through a grounded founder-led practice.",
  philosophy:
    "Service, clarity, and care guide every DharaAveda offering, from export relationships to wellness consultations.",
  profileImage:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
  name: "Vikranti Yogesh Sainee",
  role: "Technology Professional, Wellness Practitioner & Spiritual Teacher",
  showReviews: true,
  showAbout: true
};

function asyncHandler(handler: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function stripIds<T extends Record<string, unknown>>(body: T): Partial<T> {
  const { id, _id, __v, ...rest } = body;
  void id;
  void _id;
  void __v;
  return rest as Partial<T>;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }
  return secret;
}

router.get(
  "/products",
  asyncHandler(async (_req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  })
);

router.post(
  "/products",
  requireAuth,
  asyncHandler(async (req, res) => {
    const product = await Product.create({
      _id: "p_" + Date.now().toString(),
      name: req.body.name || "Unnamed Trade Product",
      category: req.body.category || "General Agriculture",
      images: req.body.images?.length ? req.body.images : [DEFAULT_PRODUCT_IMAGE],
      description: req.body.description || "",
      pricing: req.body.pricing || "Inquire for quote",
      specifications: {
        origin: req.body.specifications?.origin || "Kerala, India",
        packaging: req.body.specifications?.packaging || "Standard Sacks",
        purity: req.body.specifications?.purity || "98%",
        grade: req.body.specifications?.grade || "Premium",
        minOrder: req.body.specifications?.minOrder || "100 kg",
        ...(req.body.specifications || {})
      }
    });

    res.status(201).json(product);
  })
);

router.put(
  "/products/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, stripIds(req.body), {
      new: true,
      runValidators: true
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(product);
  })
);

router.delete(
  "/products/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(deleted);
  })
);

router.get(
  "/services",
  asyncHandler(async (_req, res) => {
    const services = await TherapyService.find();
    res.json(services);
  })
);

router.post(
  "/services",
  requireAuth,
  asyncHandler(async (req, res) => {
    const service = await TherapyService.create({
      _id: "srv_" + Date.now().toString(),
      name: req.body.name || "Unnamed Holistic Attunement",
      category: req.body.category || "Therapy",
      description: req.body.description || req.body.story || "Holistic therapy service",
      benefits: req.body.benefits || [],
      duration: req.body.duration || "60 min",
      pricing: req.body.pricing || "Ask for details",
      image: req.body.image || DEFAULT_SERVICE_IMAGE,
      story: req.body.story || req.body.description || "Personalized therapeutic care.",
      ctaText: req.body.ctaText,
      ctaLink: req.body.ctaLink,
      highlight: req.body.highlight,
      timeline: req.body.timeline?.length
        ? req.body.timeline
        : [{ title: "Intake", description: "Initial consultation and personalized guidance." }],
      translations: req.body.translations || {}
    });

    res.status(201).json(service);
  })
);

router.put(
  "/services/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const service = await TherapyService.findByIdAndUpdate(req.params.id, stripIds(req.body), {
      new: true,
      runValidators: true
    });

    if (!service) {
      res.status(404).json({ error: "Service not found" });
      return;
    }

    res.json(service);
  })
);

router.delete(
  "/services/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const deleted = await TherapyService.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Service not found" });
      return;
    }

    res.json(deleted);
  })
);

router.get(
  "/testimonials",
  asyncHandler(async (_req, res) => {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  })
);

router.post(
  "/testimonials",
  optionalAuth,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const city = req.body.city || "";
    const testimonial = await Testimonial.create({
      _id: "t_" + Date.now().toString(),
      name: req.body.name || "Anonymous",
      role: req.body.role || city || "Wellness Visitor",
      city,
      content: req.body.content || "Shared wellness feedback.",
      image: req.body.image || DEFAULT_TESTIMONIAL_IMAGE,
      rating: req.body.rating || 5,
      type: req.body.type || "wellness",
      approved: req.user ? Boolean(req.body.approved) : false,
      translations: req.body.translations || {}
    });

    res.status(201).json(testimonial);
  })
);

router.put(
  "/testimonials/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, stripIds(req.body), {
      new: true,
      runValidators: true
    });

    if (!testimonial) {
      res.status(404).json({ error: "Testimonial not found" });
      return;
    }

    res.json(testimonial);
  })
);

router.delete(
  "/testimonials/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Testimonial not found" });
      return;
    }

    res.json(deleted);
  })
);

router.get(
  "/bookings",
  requireAuth,
  asyncHandler(async (_req, res) => {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  })
);

router.get(
  "/bookings/busy-slots",
  asyncHandler(async (req, res) => {
    const { date } = req.query;
    if (!date) {
      res.status(400).json({ error: "Date parameter is required." });
      return;
    }
    const busy = await Booking.find(
      { date: String(date), status: { $in: ["confirmed", "completed"] }, paymentStatus: "paid" },
      { time: 1, service: 1 }
    );
    res.json(busy);
  })
);

router.post(
  "/bookings/initiate",
  asyncHandler(async (req, res) => {
    const { service, date, time, name, email, phone, notes } = req.body;

    if (!service || !date || !time || !name || !email || !phone) {
      res.status(400).json({ error: "Missing required fields for booking." });
      return;
    }

    // Restrict already booked time slots for this service
    const existingBooking = await Booking.findOne({
      service,
      date,
      time,
      status: { $in: ["confirmed", "completed"] },
      paymentStatus: "paid"
    });

    if (existingBooking) {
      res.status(400).json({ error: "This time slot is already booked. Please choose another slot." });
      return;
    }

    const amount = 2000; // ₹2,000 per session

    let orderId = "";
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
      try {
        const rzp = new Razorpay({
          key_id: keyId,
          key_secret: keySecret
        });

        const order = await rzp.orders.create({
          amount: amount * 100, // in paise
          currency: "INR",
          receipt: "receipt_bk_" + Date.now().toString().substring(5)
        });
        orderId = order.id;
      } catch (err: any) {
        console.error("Razorpay order creation failed:", err);
        res.status(500).json({ error: "Failed to initiate payment gateway: " + err.message });
        return;
      }
    } else {
      // Mock order creation for local testing
      orderId = "order_mock_" + Math.random().toString(36).substring(2, 15);
      console.warn("Razorpay API keys not set. Running in MOCK payment mode.");
    }

    const booking = await Booking.create({
      _id: "bk_" + Date.now().toString(),
      bookingId: "BK-" + Math.floor(100000 + Math.random() * 900000),
      name,
      email,
      phone,
      service,
      date,
      time,
      notes: notes || "",
      amount,
      paymentStatus: "pending",
      status: "pending",
      razorpayOrderId: orderId
    });

    res.status(201).json({
      booking,
      keyId: keyId || "rzp_test_mock_key_id",
      isMock: !keyId
    });
  })
);

router.post(
  "/bookings/verify-payment",
  asyncHandler(async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId) {
      res.status(400).json({ error: "Missing verification credentials." });
      return;
    }

    let isValid = false;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keySecret && !razorpayOrderId.startsWith("order_mock_")) {
      try {
        const hmac = crypto.createHmac("sha256", keySecret);
        hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
        const generatedSignature = hmac.digest("hex");
        isValid = generatedSignature === razorpaySignature;
      } catch (err) {
        console.error("Signature verification error:", err);
      }
    } else {
      // Mock validation succeeds for pay_mock_ prefixes
      isValid = razorpayPaymentId.startsWith("pay_mock_") || razorpayOrderId.startsWith("order_mock_");
    }

    if (isValid) {
      const booking = await Booking.findOneAndUpdate(
        { razorpayOrderId },
        {
          status: "confirmed",
          paymentStatus: "paid",
          razorpayPaymentId,
          razorpaySignature
        },
        { new: true }
      );

      if (!booking) {
        res.status(404).json({ error: "Associated booking order not found." });
        return;
      }

      // Send email confirmation
      await sendConfirmationEmail(booking);
      await sendBookingNotificationEmail(booking);

      res.json({ success: true, booking });
    } else {
      await Booking.findOneAndUpdate(
        { razorpayOrderId },
        { status: "cancelled", paymentStatus: "failed" }
      );
      res.status(400).json({ error: "Payment verification failed. Invalid transaction signature." });
    }
  })
);

router.post(
  "/payment/create-order",
  asyncHandler(async (req, res) => {
    const {
      service,
      date,
      time,
      name,
      email,
      phone,
      notes: bookingNotes,
      amount: reqAmount
    } = req.body;

    const amount = reqAmount || 2000; // ₹2,000 per session

    // Guard: reject if this time slot is already booked and paid
    if (service && date && time) {
      const conflict = await Booking.findOne({
        service,
        date,
        time,
        status: { $in: ["confirmed", "completed"] },
        paymentStatus: "paid"
      });
      if (conflict) {
        res.status(400).json({ error: "This time slot is already booked. Please choose another slot." });
        return;
      }
    }

    let orderId = "";
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
      try {
        const rzp = new Razorpay({
          key_id: keyId,
          key_secret: keySecret
        });

        const order = await rzp.orders.create({
          amount: amount * 100, // paise
          currency: "INR",
          receipt: "receipt_pay_" + Date.now().toString().substring(5),
          notes: {
            name: (name || "").substring(0, 254),
            email: (email || "").substring(0, 254),
            phone: (phone || "").substring(0, 254),
            service: (service || "").substring(0, 254),
            date: (date || "").substring(0, 254),
            time: (time || "").substring(0, 254),
            booking_notes: (bookingNotes || "").substring(0, 254),
            amount: String(amount)
          } as any
        });
        orderId = order.id;
      } catch (err: any) {
        console.error("Razorpay order creation failed:", err);
        res.status(500).json({ error: "Failed to initiate payment: " + err.message });
        return;
      }
    } else {
      orderId = "order_mock_" + Math.random().toString(36).substring(2, 15);
      console.warn("Razorpay API keys not set. Running in MOCK payment mode.");
    }

    res.status(201).json({
      orderId,
      amount: amount * 100,
      currency: "INR",
      keyId: keyId || "rzp_test_mock_key_id",
      isMock: !keyId
    });
  })
);

router.post(
  "/payment/verify",
  asyncHandler(async (req, res) => {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      name,
      email,
      phone,
      service,
      date,
      time,
      notes,
      amount
    } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !name || !email || !phone || !service || !date || !time) {
      res.status(400).json({ error: "Missing verification or booking credentials." });
      return;
    }

    let isValid = false;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const keyId = process.env.RAZORPAY_KEY_ID;

    if (keySecret && !razorpayOrderId.startsWith("order_mock_")) {
      try {
        const hmac = crypto.createHmac("sha256", keySecret);
        hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
        const generatedSignature = hmac.digest("hex");
        isValid = generatedSignature === razorpaySignature;
      } catch (err) {
        console.error("Signature verification error:", err);
      }
    } else {
      isValid = razorpayPaymentId.startsWith("pay_mock_") || razorpayOrderId.startsWith("order_mock_");
    }

    if (!isValid) {
      res.status(400).json({ error: "Payment verification failed. Invalid transaction signature." });
      return;
    }

    // Fetch payment method from Razorpay if not mock
    let paymentMethod = "mock";
    if (keyId && keySecret && !razorpayOrderId.startsWith("order_mock_")) {
      try {
        const rzp = new Razorpay({
          key_id: keyId,
          key_secret: keySecret
        });
        const paymentInfo = await rzp.payments.fetch(razorpayPaymentId);
        paymentMethod = paymentInfo.method || "card";
      } catch (err) {
        console.error("Failed to fetch Razorpay payment method details:", err);
      }
    }

    // Save booking to MongoDB only after payment is verified successfully
    const finalAmount = amount || 2000;
    const booking = await Booking.create({
      _id: "bk_" + Date.now().toString(),
      bookingId: "BK-" + Math.floor(100000 + Math.random() * 900000),
      name,
      email,
      phone,
      service,
      date,
      time,
      notes: notes || "",
      amount: finalAmount,
      paymentStatus: "paid",
      status: "confirmed",
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentId: razorpayPaymentId,
      orderId: razorpayOrderId,
      paymentMethod,
      currency: "INR",
      paidAt: new Date()
    });

    // Send emails
    await sendConfirmationEmail(booking);
    await sendBookingNotificationEmail(booking);

    res.status(201).json({ success: true, booking });
  })
);

// ─── Razorpay Webhook (fail-safe) ──────────────────────────────────────────
// Razorpay calls this server-side endpoint when a payment is captured.
// It guarantees the booking is saved even when the user's browser closes
// before the frontend can call /api/payment/verify.
//
// IMPORTANT: express.raw() must be registered for this route in server.ts
// BEFORE express.json(), otherwise signature verification will always fail.
router.post(
  "/webhook/razorpay",
  asyncHandler(async (req, res) => {
    const signature = req.headers["x-razorpay-signature"] as string | undefined;
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Always respond 200 quickly so Razorpay doesn't retry unnecessarily
    if (!webhookSecret) {
      console.warn("RAZORPAY_WEBHOOK_SECRET not set — webhook received but not processed.");
      res.json({ received: true });
      return;
    }

    if (!signature) {
      res.status(400).json({ error: "Missing X-Razorpay-Signature header." });
      return;
    }

    // req.body is a raw Buffer because of express.raw() in server.ts
    const rawBody = req.body as Buffer;

    // Verify webhook signature
    const hmac = crypto.createHmac("sha256", webhookSecret);
    hmac.update(rawBody);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== signature) {
      console.error("[Webhook] Signature mismatch — possible forged request.");
      res.status(400).json({ error: "Invalid webhook signature." });
      return;
    }

    let payload: any;
    try {
      payload = JSON.parse(rawBody.toString("utf-8"));
    } catch {
      res.status(400).json({ error: "Malformed JSON payload." });
      return;
    }

    const event: string = payload.event || "";

    // Only handle payment.captured; acknowledge everything else silently
    if (event !== "payment.captured") {
      res.json({ received: true });
      return;
    }

    const payment = payload.payload?.payment?.entity;
    if (!payment) {
      console.error("[Webhook] Missing payment entity in payload.");
      res.json({ received: true });
      return;
    }

    const razorpayOrderId: string = payment.order_id || "";
    const razorpayPaymentId: string = payment.id || "";
    const notes: Record<string, string> = payment.notes || {};

    // ── Idempotency guard ────────────────────────────────────────────────────
    // The frontend /api/payment/verify endpoint may have already created the
    // booking. If so, skip silently so we never duplicate a booking.
    const existingBooking = await Booking.findOne({
      $or: [{ razorpayOrderId }, { orderId: razorpayOrderId }]
    });

    if (existingBooking) {
      console.log(`[Webhook] Booking already exists for order ${razorpayOrderId} — skipping.`);
      res.json({ received: true });
      return;
    }

    // ── Reconstruct booking from order notes ─────────────────────────────────
    const name = notes.name || "Unknown";
    const email = notes.email || "";
    const phone = notes.phone || "";
    const service = notes.service || "Therapy Session";
    const date = notes.date || "";
    const time = notes.time || "";
    const bookingNotes = notes.booking_notes || "";
    const finalAmount = parseInt(notes.amount || "2000", 10);

    if (!email || !date || !time) {
      console.error("[Webhook] Critical booking details missing in order notes:", notes);
      // Acknowledge anyway — retrying won't fix missing notes
      res.json({ received: true });
      return;
    }

    try {
      const booking = await Booking.create({
        _id: "bk_wh_" + Date.now().toString(),
        bookingId: "BK-" + Math.floor(100000 + Math.random() * 900000),
        name,
        email,
        phone,
        service,
        date,
        time,
        notes: bookingNotes,
        amount: finalAmount,
        paymentStatus: "paid",
        status: "confirmed",
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature: "", // not available in webhook payload
        paymentId: razorpayPaymentId,
        orderId: razorpayOrderId,
        paymentMethod: payment.method || "unknown",
        currency: payment.currency || "INR",
        paidAt: new Date()
      });

      await sendConfirmationEmail(booking);
      await sendBookingNotificationEmail(booking);

      console.log(`[Webhook] Booking ${booking.bookingId} created for order ${razorpayOrderId}.`);
    } catch (err) {
      // Log but still return 200 — retrying a failed DB write risks duplicates
      console.error("[Webhook] Failed to persist booking:", err);
    }

    res.json({ received: true });
  })
);

router.post(
  "/bookings",
  asyncHandler(async (req, res) => {
    // Legacy support fallback
    const booking = await Booking.create({
      _id: "bk_" + Date.now().toString(),
      bookingId: "BK-" + Math.floor(100000 + Math.random() * 900000),
      name: req.body.name || "",
      email: req.body.email || "",
      phone: req.body.phone || "",
      service: req.body.service || "",
      date: req.body.date || "",
      time: req.body.time || "",
      notes: req.body.notes || "",
      amount: 2000,
      paymentStatus: "paid", // auto-confirm for direct creations
      status: "confirmed"
    });

    res.status(201).json(booking);
  })
);

router.put(
  "/bookings/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    res.json(booking);
  })
);

router.delete(
  "/bookings/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    res.json(deleted);
  })
);

router.get(
  "/inquiries",
  requireAuth,
  asyncHandler(async (_req, res) => {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  })
);

router.post(
  "/inquiries",
  asyncHandler(async (req, res) => {
    const inquiry = await Inquiry.create({
      _id: "inq_" + Date.now().toString(),
      name: req.body.name || "",
      email: req.body.email || "",
      phone: req.body.phone || "",
      company: req.body.company || "",
      productName: req.body.productName || "",
      quantity: req.body.quantity || "",
      message: req.body.message || "",
      status: "new"
    });

    // Send inquiry notification to admin
    await sendInquiryNotificationEmail(inquiry);

    res.status(201).json(inquiry);
  })
);

router.put(
  "/inquiries/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      res.status(404).json({ error: "Inquiry not found" });
      return;
    }

    res.json(inquiry);
  })
);

router.delete(
  "/inquiries/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const deleted = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Inquiry not found" });
      return;
    }

    res.json(deleted);
  })
);

router.get(
  "/quick-stats",
  requireAuth,
  asyncHandler(async (_req, res) => {
    const [totalInquiries, totalBookings, totalProducts, totalServices] = await Promise.all([
      Inquiry.countDocuments(),
      Booking.countDocuments(),
      Product.countDocuments(),
      TherapyService.countDocuments()
    ]);

    res.json({ totalInquiries, totalBookings, totalProducts, totalServices });
  })
);

router.get(
  "/about-vikranti",
  asyncHandler(async (_req, res) => {
    const about = await AboutContent.findOne();
    res.json(about || DEFAULT_ABOUT);
  })
);

router.put(
  "/about-vikranti",
  requireAuth,
  asyncHandler(async (req, res) => {
    const existing = await AboutContent.findOne();
    if (existing) {
      existing.set(stripIds(req.body));
      await existing.save();
      res.json(existing);
      return;
    }

    const about = await AboutContent.create({
      ...DEFAULT_ABOUT,
      ...stripIds(req.body),
      _id: DEFAULT_ABOUT._id
    });
    res.json(about);
  })
);

router.get(
  "/screenshot-reviews",
  asyncHandler(async (_req, res) => {
    const reviews = await ScreenshotReview.find();
    res.json(reviews);
  })
);

const getBaseUrl = (req: Request) => {
  const host = req.get("host") || "";
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
  return `${protocol}://${host}`;
};

router.get(
  "/screenshot-reviews/image/:id",
  asyncHandler(async (req, res) => {
    const review = await ScreenshotReview.findById(req.params.id);
    if (!review || !review.imageData) {
      res.status(404).json({ error: "Image not found in Wayanad archives" });
      return;
    }
    const mimeType = review.imageMimeType || "image/png";
    const buffer = Buffer.from(review.imageData, "base64");
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.send(buffer);
  })
);

router.post(
  "/screenshot-reviews",
  requireAuth,
  asyncHandler(async (req, res) => {
    let imageUrl = req.body.imageUrl || "";
    let imageData = "";
    let imageMimeType = "";
    const reviewId = "sr_" + Date.now().toString();

    // Parse base64 data and store in MongoDB
    if (imageUrl && imageUrl.startsWith("data:image/")) {
      const match = imageUrl.match(/^data:(image\/[a-zA-Z0-9+]+);base64,(.+)$/);
      if (match) {
        imageMimeType = match[1];
        imageData = match[2];
        imageUrl = `${getBaseUrl(req)}/api/screenshot-reviews/image/${reviewId}`;
      }
    }

    const review = await ScreenshotReview.create({
      _id: reviewId,
      imageUrl: imageUrl,
      caption: req.body.caption || "Client review screenshot",
      platform: req.body.platform || "whatsapp",
      imageData: imageData || undefined,
      imageMimeType: imageMimeType || undefined,
      translations: req.body.translations || {}
    });

    res.status(201).json(review);
  })
);

router.delete(
  "/screenshot-reviews/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const deleted = await ScreenshotReview.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Review not found" });
      return;
    }

    res.json(deleted);
  })
);

router.post(
  "/auth/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (username !== "admin" || password !== "admin123") {
      res.status(401).json({ error: "Invalid credentials. Use admin / admin123." });
      return;
    }

    const token = jwt.sign({ username: "admin", role: "admin" }, getJwtSecret(), {
      subject: "admin",
      expiresIn: "12h"
    });

    res.json({ token, success: true });
  })
);

export default router;

