import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "motion/react";

// ─── Path Point Helper ───────────────────────────────────────────────────────
function getPointOnPath(
  el: SVGPathElement | null,
  fraction: number
): { x: number; y: number } | null {
  if (!el) return null;
  try {
    const len = el.getTotalLength();
    if (len === 0) return null;
    const p = el.getPointAtLength(Math.min(fraction, 0.9999) * len);
    return { x: p.x, y: p.y };
  } catch (e) {
    return null;
  }
}

// ─── Particle / Spark Types ───────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; decay: number;
  size: number;
}
interface Spark {
  x: number; y: number;
  angle: number; speed: number;
  life: number;
}

export default function ScrollEnergyLine() {
  // ── Refs ───────────────────────────────────────────────────────────────────
  const pathRef = useRef<SVGPathElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const rafRef = useRef<number>(0);
  const prevProgressRef = useRef<number>(0);

  // ── Dimensions & Path State ────────────────────────────────────────────────
  const [dimensions, setDimensions] = useState({ width: 1440, height: 4000 });
  const [pathData, setPathData] = useState("");

  // ── Scroll Tracking ────────────────────────────────────────────────────────
  // Decreased stiffness (45) and adjusted damping (22) for a silkier, floatier scroll lag
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 45, damping: 22, restDelta: 0.0005 });

  // ── Derived Motion Values ──────────────────────────────────────────────────
  const lineOpacity = useTransform(spring, [0, 0.02], [0, 0.9]);
  const coreOpacity = useTransform(spring, [0, 0.02], [0, 0.75]);
  const whiteOpacity = useTransform(spring, [0, 0.02], [0, 0.85]);
  const containerY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // ── Spawn Particles & Sparks ───────────────────────────────────────────────
  const spawnParticles = useCallback((x: number, y: number, speed: number) => {
    // Reduced particle density for a subtle gold-dust trail
    const n = Math.ceil(speed * 4) + 1;
    for (let i = 0; i < n; i++) {
      particlesRef.current.push({
        x, y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.7) * 1.0,
        life: 1,
        decay: 0.012 + Math.random() * 0.015,
        size: 0.6 + Math.random() * 1.4, // Significantly smaller particles (0.6px - 2.0px)
      });
    }
  }, []);

  const spawnSparks = useCallback((x: number, y: number) => {
    const n = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      sparksRef.current.push({
        x, y,
        angle: Math.random() * Math.PI * 2,
        speed: 1.5 + Math.random() * 2.5,
        life: 1,
      });
    }
  }, []);

  // ── Recalculate Path based on Section Elements ────────────────────────────
  const updatePath = useCallback(() => {
    const width = window.innerWidth;
    const height = document.documentElement.scrollHeight || document.body.scrollHeight || 4000;
    setDimensions({ width, height });

    const sectionIds = [
      "hero",
      "about",
      "categories",
      "why-choose-us",
      "statistics",
      "process",
      "markets",
      "certifications",
      "faq"
    ];

    const coords: { id: string; y: number; height: number }[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const y = rect.top + window.scrollY;
        coords.push({ id, y, height: rect.height });
      }
    });

    const isMobile = width < 768;
    const margin = isMobile ? width * 0.22 : width * 0.08;
    const leftX = margin;
    const rightX = width - margin;

    if (coords.length === 0) {
      // Fallback path if elements are not rendered yet
      let fallbackPath = `M ${leftX} 150`;
      const steps = 9;
      const stepHeight = height / steps;
      for (let i = 1; i <= steps; i++) {
        const targetY = i * stepHeight;
        const targetX = i % 2 === 0 ? leftX : rightX;
        const prevX = (i - 1) % 2 === 0 ? leftX : rightX;
        const prevY = (i - 1) * stepHeight + (i === 1 ? 150 : 0);
        
        const cp1_x = prevX + (targetX - prevX) * 0.5;
        const cp1_y = prevY;
        const cp2_x = prevX + (targetX - prevX) * 0.5;
        const cp2_y = targetY;
        
        fallbackPath += ` C ${cp1_x} ${cp1_y}, ${cp2_x} ${cp2_y}, ${targetX} ${targetY}`;
      }
      setPathData(fallbackPath);
      return;
    }

    // Dynamic serpentine path connecting all sections
    let path = "";
    const startY = coords[0].y + (isMobile ? 120 : 150);
    path += `M ${leftX} ${startY}`;

    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];

      const targetY = curr.y + curr.height / 2;
      const targetX = i % 2 === 0 ? leftX : rightX;
      
      const prevX = (i - 1) % 2 === 0 ? leftX : rightX;
      const prevY = i === 1 ? startY : (prev.y + prev.height / 2);

      const cp1_x = prevX + (targetX - prevX) * 0.5;
      const cp1_y = prevY;
      const cp2_x = prevX + (targetX - prevX) * 0.5;
      const cp2_y = targetY;

      path += ` C ${cp1_x} ${cp1_y}, ${cp2_x} ${cp2_y}, ${targetX} ${targetY}`;
    }

    // Connect to the page bottom
    const lastCoord = coords[coords.length - 1];
    const lastY = height;
    const lastX = coords.length % 2 === 0 ? leftX : rightX;
    const prevX = (coords.length - 1) % 2 === 0 ? leftX : rightX;
    const prevY = lastCoord.y + lastCoord.height / 2;

    const cp1_x = prevX + (lastX - prevX) * 0.5;
    const cp1_y = prevY;
    const cp2_x = prevX + (lastX - prevX) * 0.5;
    const cp2_y = lastY;

    path += ` C ${cp1_x} ${cp1_y}, ${cp2_x} ${cp2_y}, ${lastX} ${lastY}`;
    setPathData(path);
  }, []);

  // ── Layout Observers & Listeners ──────────────────────────────────────────
  useEffect(() => {
    updatePath();

    window.addEventListener("resize", updatePath, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updatePath();
      });
      resizeObserver.observe(document.body);
    }

    // Fallback interval to ensure sync with dynamic assets/accordions
    const interval = setInterval(updatePath, 1500);

    return () => {
      window.removeEventListener("resize", updatePath);
      if (resizeObserver) resizeObserver.disconnect();
      clearInterval(interval);
    };
  }, [updatePath]);

  // ── Spawn Particles & Sparks when scroll changes ───────────────────────────
  useMotionValueEvent(spring, "change", (latest) => {
    const delta = Math.abs(latest - prevProgressRef.current);
    prevProgressRef.current = latest;
    if (delta < 0.0005) return;

    const pt = getPointOnPath(pathRef.current, latest);
    if (pt) spawnParticles(pt.x, pt.y, delta * 180);
  });

  // ── Global Mouse Move Spark Trigger ────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (Math.random() > 0.35) return;
      const pt = getPointOnPath(pathRef.current, prevProgressRef.current);
      if (!pt) return;
      
      const canvasY = pt.y - window.scrollY;
      const dist = Math.hypot(e.clientX - pt.x, e.clientY - canvasY);
      
      if (dist < 80 && Math.random() > 0.45) {
        spawnSparks(pt.x, pt.y);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [spawnSparks]);

  // ── Canvas Draw Loop ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollY = window.scrollY;

      // ── Draw particles ────────────────────────────────────────────────────
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01; // softer float gravity
        p.life -= p.decay;

        const a = Math.max(0, p.life);
        const canvasY = p.y - scrollY;

        if (canvasY > -50 && canvasY < canvas.height + 50) {
          // Outer gold glow (soft blur)
          ctx.save();
          ctx.globalAlpha = a * 0.5;
          ctx.shadowBlur = 6; // Softer blur
          ctx.shadowColor = "#c5a059";
          ctx.fillStyle = `rgba(197,160,89,${a * 0.8})`;
          ctx.beginPath();
          ctx.arc(p.x, canvasY, p.size * a, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // White hot core (soft and small)
          ctx.save();
          ctx.globalAlpha = a * 0.4;
          ctx.fillStyle = "#fff8e7";
          ctx.beginPath();
          ctx.arc(p.x, canvasY, p.size * a * 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ── Draw sparks ───────────────────────────────────────────────────────
      sparksRef.current = sparksRef.current.filter((s) => s.life > 0);
      for (const s of sparksRef.current) {
        const travel = s.speed * (1 - s.life + 0.05);
        const ex = s.x + Math.cos(s.angle) * travel * 8; // Shorter spark trails
        const ey = s.y + Math.sin(s.angle) * travel * 8;

        const canvasSY = s.y - scrollY;
        const canvasEY = ey - scrollY;

        if (
          (canvasSY > -50 && canvasSY < canvas.height + 50) ||
          (canvasEY > -50 && canvasEY < canvas.height + 50)
        ) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, s.life) * 0.7;
          ctx.strokeStyle = `rgba(255,230,120,${s.life})`;
          ctx.lineWidth = 0.7; // Thinner spark lines
          ctx.shadowBlur = 3; // Softer spark blur
          ctx.shadowColor = "#f3efe6";
          ctx.beginPath();
          ctx.moveTo(s.x, canvasSY);
          ctx.lineTo(ex, canvasEY);
          ctx.stroke();
          ctx.restore();
        }
        s.life -= 0.045; // Slower spark fade
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full pointer-events-none z-[2]" style={{ height: dimensions.height }}>
      {/* Particle Canvas (Fixed to Viewport) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[3]"
        style={{ mixBlendMode: "screen" }}
      />

      {/* SVG Container (Absolute, spans full page height) */}
      <motion.div
        style={{ y: containerY }}
        className="absolute inset-0 w-full pointer-events-none will-change-transform"
      >
        <svg
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Soft Wide Glow Filter */}
            <filter id="eline-glow-outer" x="-300%" y="-5%" width="700%" height="110%">
              <feGaussianBlur stdDeviation="16" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1.2 0 0 0 0.05  0.9 0 0 0 0.02  0 0 0 0 0  0 0 0 0.45 0"
                result="colored"
              />
              <feMerge>
                <feMergeNode in="colored" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Soft Mid Glow Filter */}
            <filter id="eline-glow-mid" x="-120%" y="-3%" width="340%" height="106%">
              <feGaussianBlur stdDeviation="5.5" />
            </filter>

            {/* Soft Core Blur Filter */}
            <filter id="eline-glow-core" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>

          {/* Invisible reference path for length calculations */}
          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="transparent"
            strokeWidth={1}
          />

          {/* Layer 1: Wide Ambient Gold Glow (Thinner & Softer) */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#c5a059"
            strokeWidth={10} // Reduced thickness from 18
            strokeLinecap="round"
            filter="url(#eline-glow-outer)"
            style={{ pathLength: spring, opacity: lineOpacity }}
            initial={{ pathLength: 0 }}
          />

          {/* Layer 2: Mid Gold Glow (Thinner & Softer) */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#c5a059"
            strokeWidth={3} // Reduced thickness from 5
            strokeLinecap="round"
            filter="url(#eline-glow-mid)"
            style={{ pathLength: spring, opacity: coreOpacity }}
            initial={{ pathLength: 0 }}
          />

          {/* Layer 3: Glowing Pulsing Flow (Infinite Animation - Thinner & Blurry) */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#ffffff"
            strokeWidth={1.6} // Reduced thickness from 2.4
            strokeLinecap="round"
            strokeDasharray="60 220"
            filter="url(#eline-glow-core)" // Applied blur filter to eliminate hard vector edges
            animate={{ strokeDashoffset: [0, -280] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            style={{ pathLength: spring, opacity: whiteOpacity }}
            initial={{ pathLength: 0 }}
          />

          {/* Layer 4: Extremely Thin Soft Filament Core (No borders/harsh edges) */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#ffffff"
            strokeWidth={0.8} // Reduced thickness from 1.2
            strokeLinecap="round"
            filter="url(#eline-glow-core)" // Applied blur filter to eliminate hard vector edges
            style={{ pathLength: spring, opacity: whiteOpacity }}
            initial={{ pathLength: 0 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
