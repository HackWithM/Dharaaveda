export interface Product {
  id: string;
  name: string;
  category: string;
  images: string[];
  description: string;
  pricing: string;
  specifications: {
    origin: string;
    packaging: string;
    purity: string;
    grade: string;
    minOrder: string;
    [key: string]: string;
  };
  createdAt: string;
}

export interface TherapyService {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  duration: string;
  pricing: string;
  image: string;
  story: string;
  ctaText?: string;
  ctaLink?: string;
  highlight?: string;
  timeline: {
    title: string;
    description: string;
  }[];
  translations?: Record<string, {
    name?: string;
    category?: string;
    description?: string;
    story?: string;
    benefits?: string[];
    ctaText?: string;
    ctaLink?: string;
    highlight?: string;
    timeline?: { title: string; description: string }[];
  }>;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city?: string;
  content: string;
  image: string;
  rating: number;
  type: 'export' | 'wellness';
  approved: boolean;
  translations?: Record<string, {
    name?: string;
    role?: string;
    content?: string;
  }>;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  productName?: string;
  quantity?: string;
  message: string;
  status: 'new' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface QuickStats {
  totalInquiries: number;
  totalBookings: number;
  totalProducts: number;
  totalServices: number;
}

export interface AboutVikranti {
  aboutText: string;
  philosophy: string;
  profileImage: string;
  name: string;
  role: string;
  showReviews: boolean;
  showAbout: boolean;
  translations?: Record<string, {
    name?: string;
    role?: string;
    aboutText?: string;
    philosophy?: string;
  }>;
}

export interface ScreenshotReview {
  id: string;
  imageUrl: string;
  caption: string;
  platform: 'whatsapp' | 'instagram';
  translations?: Record<string, {
    caption?: string;
  }>;
}

