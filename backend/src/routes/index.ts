import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { requireAuth, optionalAuth, AuthenticatedRequest } from "../middleware/auth.middleware";
import { AboutContent } from "../models/About";
import { Booking } from "../models/Booking";
import { Inquiry } from "../models/Inquiry";
import { Product } from "../models/Product";
import { ScreenshotReview } from "../models/ScreenshotReview";
import { TherapyService } from "../models/Service";
import { Testimonial } from "../models/Testimonial";

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

router.post(
  "/bookings",
  asyncHandler(async (req, res) => {
    const booking = await Booking.create({
      _id: "bk_" + Date.now().toString(),
      name: req.body.name || "",
      email: req.body.email || "",
      phone: req.body.phone || "",
      service: req.body.service || "",
      date: req.body.date || "",
      time: req.body.time || "",
      notes: req.body.notes || "",
      status: "pending"
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

router.post(
  "/screenshot-reviews",
  requireAuth,
  asyncHandler(async (req, res) => {
    const review = await ScreenshotReview.create({
      _id: "sr_" + Date.now().toString(),
      imageUrl: req.body.imageUrl || "",
      caption: req.body.caption || "Client review screenshot",
      platform: req.body.platform || "whatsapp",
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

