import { Product, TherapyService, Booking, Inquiry, Testimonial, QuickStats, AboutVikranti, ScreenshotReview } from "../types";

const RAW_BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = (RAW_BASE_URL || "").replace(/\/+$/, "");
const DEBUG_API = import.meta.env.DEV;

// In-memory request promise cache
const promiseCache = new Map<string, Promise<any>>();

function buildApiUrl(endpoint: string): string {
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint;
  }

  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${BASE_URL}${normalizedEndpoint}`;
}

function logApiDebug(message: string, details: Record<string, unknown>): void {
  if (DEBUG_API) {
    console.debug(`[api] ${message}`, details);
  }
}

async function parseJsonResponse<T>(response: Response, endpoint: string, requestUrl: string): Promise<T> {
  const contentType = response.headers.get("content-type") || "";
  const responseText = await response.text();
  const responseUrl = response.url || requestUrl;

  logApiDebug("response", {
    endpoint,
    requestUrl,
    responseUrl,
    status: response.status,
    ok: response.ok,
    redirected: response.redirected,
    contentType: contentType || "(missing)",
  });

  if (response.status === 204) {
    return undefined as T;
  }

  if (!contentType.toLowerCase().includes("application/json")) {
    const preview = responseText.replace(/\s+/g, " ").trim().slice(0, 240);
    console.error("[api] Expected JSON response but received non-JSON content.", {
      endpoint,
      requestUrl,
      responseUrl,
      status: response.status,
      redirected: response.redirected,
      contentType: contentType || "(missing)",
      preview,
    });

    throw new Error(
      `Expected JSON from ${endpoint}, but received ${contentType || "unknown content type"} from ${responseUrl}.`
    );
  }

  let data: any = null;
  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error("[api] Failed to parse JSON response.", {
        endpoint,
        requestUrl,
        responseUrl,
        status: response.status,
        contentType,
        preview: responseText.replace(/\s+/g, " ").trim().slice(0, 240),
        error,
      });
      throw error;
    }
  }

  if (!response.ok) {
    throw new Error(data?.error || `HTTP error! status: ${response.status}`);
  }

  return data as T;
}

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const method = options?.method || "GET";
  const isCacheable = method.toUpperCase() === "GET";
  const requestUrl = buildApiUrl(endpoint);
  const cacheKey = `${method.toUpperCase()}:${requestUrl}`;

  if (!isCacheable) {
    // Clear cache because a write occurred
    promiseCache.clear();
  } else {
    // Request deduplication & cache lookup
    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(cacheKey) as Promise<T>;
    }
  }

  const promise = (async () => {
    const adminToken = localStorage.getItem("dharaSavedToken");
    const token = adminToken;
    const authHeaders = token ? { "Authorization": `Bearer ${token}` } : {};

    logApiDebug("request", {
      endpoint,
      requestUrl,
      method: method.toUpperCase(),
      baseUrl: BASE_URL || "(same origin)",
      viteApiUrl: RAW_BASE_URL || "(not set)",
    });

    const response = await fetch(requestUrl, {
      ...options,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...authHeaders,
        ...(options?.headers || {}),
      },
    });

    return parseJsonResponse<T>(response, endpoint, requestUrl);
  })();

  if (isCacheable) {
    promiseCache.set(cacheKey, promise);
    // Cleanup if promise failed
    promise.catch(() => {
      if (promiseCache.get(cacheKey) === promise) {
        promiseCache.delete(cacheKey);
      }
    });
  }

  return promise;
}

export const api = {
  // Products
  async getProducts(): Promise<Product[]> {
    return fetchApi<Product[]>("/api/products");
  },
  async createProduct(product: Partial<Product>): Promise<Product> {
    return fetchApi<Product>("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
  },
  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return fetchApi<Product>(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    });
  },
  async deleteProduct(id: string): Promise<Product> {
    return fetchApi<Product>(`/api/products/${id}`, {
      method: "DELETE",
    });
  },

  // Services
  async getServices(): Promise<TherapyService[]> {
    return fetchApi<TherapyService[]>("/api/services");
  },
  async createService(service: Partial<TherapyService>): Promise<TherapyService> {
    return fetchApi<TherapyService>("/api/services", {
      method: "POST",
      body: JSON.stringify(service),
    });
  },
  async updateService(id: string, service: Partial<TherapyService>): Promise<TherapyService> {
    return fetchApi<TherapyService>(`/api/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(service),
    });
  },
  async deleteService(id: string): Promise<TherapyService> {
    return fetchApi<TherapyService>(`/api/services/${id}`, {
      method: "DELETE",
    });
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return fetchApi<Testimonial[]>("/api/testimonials");
  },
  async createTestimonial(testimonial: Partial<Testimonial>): Promise<Testimonial> {
    return fetchApi<Testimonial>("/api/testimonials", {
      method: "POST",
      body: JSON.stringify(testimonial),
    });
  },
  async updateTestimonial(id: string, testimonial: Partial<Testimonial>): Promise<Testimonial> {
    return fetchApi<Testimonial>(`/api/testimonials/${id}`, {
      method: "PUT",
      body: JSON.stringify(testimonial),
    });
  },
  async deleteTestimonial(id: string): Promise<Testimonial> {
    return fetchApi<Testimonial>(`/api/testimonials/${id}`, {
      method: "DELETE",
    });
  },

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return fetchApi<Booking[]>("/api/bookings");
  },
  async createBooking(booking: Partial<Booking>): Promise<Booking> {
    return fetchApi<Booking>("/api/bookings", {
      method: "POST",
      body: JSON.stringify(booking),
    });
  },
  async updateBooking(id: string, status: 'pending' | 'confirmed' | 'cancelled' | 'completed'): Promise<Booking> {
    return fetchApi<Booking>(`/api/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  },
  async deleteBooking(id: string): Promise<Booking> {
    return fetchApi<Booking>(`/api/bookings/${id}`, {
      method: "DELETE",
    });
  },

  // Inquiries
  async getInquiries(): Promise<Inquiry[]> {
    return fetchApi<Inquiry[]>("/api/inquiries");
  },
  async createInquiry(inquiry: Partial<Inquiry>): Promise<Inquiry> {
    return fetchApi<Inquiry>("/api/inquiries", {
      method: "POST",
      body: JSON.stringify(inquiry),
    });
  },
  async updateInquiry(id: string, status: 'new' | 'reviewed' | 'resolved'): Promise<Inquiry> {
    return fetchApi<Inquiry>(`/api/inquiries/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  },
  async deleteInquiry(id: string): Promise<Inquiry> {
    return fetchApi<Inquiry>(`/api/inquiries/${id}`, {
      method: "DELETE",
    });
  },

  // Stats
  async getQuickStats(): Promise<QuickStats> {
    return fetchApi<QuickStats>("/api/quick-stats");
  },

  // About Vikranti
  async getAboutVikranti(): Promise<AboutVikranti> {
    return fetchApi<AboutVikranti>("/api/about-vikranti");
  },
  async updateAboutVikranti(about: Partial<AboutVikranti>): Promise<AboutVikranti> {
    return fetchApi<AboutVikranti>("/api/about-vikranti", {
      method: "PUT",
      body: JSON.stringify(about),
    });
  },

  // Screenshot Reviews
  async getScreenshotReviews(): Promise<ScreenshotReview[]> {
    return fetchApi<ScreenshotReview[]>("/api/screenshot-reviews");
  },
  async createScreenshotReview(review: Partial<ScreenshotReview>): Promise<ScreenshotReview> {
    return fetchApi<ScreenshotReview>("/api/screenshot-reviews", {
      method: "POST",
      body: JSON.stringify(review),
    });
  },
  async deleteScreenshotReview(id: string): Promise<ScreenshotReview> {
    return fetchApi<ScreenshotReview>(`/api/screenshot-reviews/${id}`, {
      method: "DELETE",
    });
  },

  // Login
  async login(username: string, password: string): Promise<{ token: string; success: boolean }> {
    return fetchApi<{ token: string; success: boolean }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  // Firebase Bookings
  async getBusySlots(date: string): Promise<{ time: string; service: string }[]> {
    return fetchApi<{ time: string; service: string }[]>(`/api/bookings/busy-slots?date=${date}`);
  },
  async initiateBooking(bookingData: Partial<Booking>): Promise<{ booking: Booking; keyId: string; isMock: boolean }> {
    return fetchApi<{ booking: Booking; keyId: string; isMock: boolean }>("/api/bookings/initiate", {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
  },
  async verifyPayment(paymentData: { razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature?: string }): Promise<{ success: boolean; booking: Booking }> {
    return fetchApi<{ success: boolean; booking: Booking }>("/api/bookings/verify-payment", {
      method: "POST",
      body: JSON.stringify(paymentData),
    });
  }
};
