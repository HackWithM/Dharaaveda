import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import { IMAGES } from "./data/images";

// Helper to wrap lazy imports with preloading capabilities for immediate responses
type PreloadableLazyComponent<T extends React.ComponentType<any>> =
  React.LazyExoticComponent<T> & { preload: () => Promise<{ default: T }> };

const lazyWithPreload = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): PreloadableLazyComponent<T> => {
  const Component = lazy(importFunc) as PreloadableLazyComponent<T>;
  Component.preload = importFunc;
  return Component;
};

// Route-Based Lazy Loading with Prefetch support
export const Home = lazyWithPreload(() => import("./pages/Home"));
export const Export = lazyWithPreload(() => import("./pages/Export"));
export const Wellness = lazyWithPreload(() => import("./pages/Wellness"));
export const Booking = lazyWithPreload(() => import("./pages/Booking"));
export const Contact = lazyWithPreload(() => import("./pages/Contact"));
export const AdminLogin = lazyWithPreload(() => import("./pages/AdminLogin"));
export const AdminDashboard = lazyWithPreload(() => import("./pages/AdminDashboard"));
export const MyBookings = lazyWithPreload(() => import("./pages/MyBookings"));

// Scroll Restoration helper - requestAnimationFrame optimized to prevent main-thread block
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as any });
    };
    const frameId = requestAnimationFrame(handleScrollToTop);
    return () => cancelAnimationFrame(frameId);
  }, [pathname]);
  return null;
}

// Wrapper layout for public facing pages that need Navbar and Footer
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050d0a] text-white">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/export" element={<Export />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    // 1. Eagerly warm up the bundle chunk cache for public pages
    const prefetchTimer = setTimeout(() => {
      Home.preload().catch(() => {});
      Export.preload().catch(() => {});
      Wellness.preload().catch(() => {});
      Booking.preload().catch(() => {});
      Contact.preload().catch(() => {});
      MyBookings.preload().catch(() => {});
    }, 1200);

    return () => {
      clearTimeout(prefetchTimer);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Admin Dashboard & Login route blocks */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Public Routes mapped under the matching PublicLayout layout */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
