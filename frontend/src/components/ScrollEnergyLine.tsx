import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const isWellness = location.pathname.includes("/wellness");

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
  // Silkier scroll lag matching the premium aesthetic
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 40, damping: 24, restDelta: 0.0005 });

  // ── Derived Motion Values ──────────────────────────────────────────────────
  const lineOpacity = useTransform(spring, [0, 0.02], [0, 0.75]);
  const coreOpacity = useTransform(spring, [0, 0.02], [0, 0.65]);
  const whiteOpacity = useTransform(spring, [0, 0.02], [0, 0.75]);
  const containerY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // ── Spawn Particles & Sparks ───────────────────────────────────────────────
  const spawnParticles = useCallback((x: number, y: number, speed: number) => {
    // Extremely subtle, fine gold-dust trail
    const n = Math.min(2, Math.ceil(speed * 1.2));
    for (let i = 0; i < n; i++) {
      particlesRef.current.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.7) * 0.4,
        life: 1.0,
        decay: 0.015 + Math.random() * 0.02,
        size: 0.4 + Math.random() * 0.9, // Ultra-fine particles (0.4px - 1.3px)
      });
    }
  }, []);

  const spawnSparks = useCallback((x: number, y: number) => {
    // Spawn only 1 spark occasionally for mouse proximity
    if (Math.random() > 0.4) return;
    sparksRef.current.push({
      x, y,
      angle: Math.random() * Math.PI * 2,
      speed: 1.0 + Math.random() * 1.5,
      life: 1.0,
    });
  }, []);

  // ── Calculate Left-Side Curved Path ────────────────────────────────────────
  const updatePath = useCallback(() => {
    const width = window.innerWidth;
    const height = document.documentElement.scrollHeight || document.body.scrollHeight || 4000;
    setDimensions({ width, height });

    const isMobile = width < 768;
    // Keep strictly on the left margin
    const leftX = isMobile ? 24 : 64;
    const sway = isMobile ? 6 : 14;
    const step = isMobile ? 250 : 350;

    const startY = isMobile ? 120 : 150;
    let path = `M ${leftX} ${startY}`;

    const numSteps = Math.ceil((height - startY) / step);
    let prevX = leftX;
    let prevY = startY;

    for (let i = 1; i <= numSteps; i++) {
      const targetY = Math.min(height, startY + i * step);
      // Generate a smooth wave using sine
      const targetX = leftX + Math.sin(i * 1.2) * sway;
      const dy = targetY - prevY;

      // Control points for a vertical-oriented smooth S-curve
      const cp1_x = prevX;
      const cp1_y = prevY + dy * 0.4;
      const cp2_x = targetX;
      const cp2_y = targetY - dy * 0.4;

      path += ` C ${cp1_x} ${cp1_y}, ${cp2_x} ${cp2_y}, ${targetX} ${targetY}`;

      prevX = targetX;
      prevY = targetY;
    }

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

    // Dynamic sync sync with accordions/assets
    const interval = setInterval(updatePath, 2000);

    return () => {
      window.removeEventListener("resize", updatePath);
      if (resizeObserver) resizeObserver.disconnect();
      clearInterval(interval);
    };
  }, [updatePath]);

  // ── Spawn Particles when scroll progress changes ───────────────────────────
  useMotionValueEvent(spring, "change", (latest) => {
    const delta = Math.abs(latest - prevProgressRef.current);
    prevProgressRef.current = latest;
    if (delta < 0.0005) return;

    const pt = getPointOnPath(pathRef.current, latest);
    if (pt) spawnParticles(pt.x, pt.y, delta * 150);
  });

  // ── Subtle Mouse Move Spark Trigger ────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (Math.random() > 0.25) return;
      const pt = getPointOnPath(pathRef.current, prevProgressRef.current);
      if (!pt) return;
      
      const canvasY = pt.y - window.scrollY;
      const dist = Math.hypot(e.clientX - pt.x, e.clientY - canvasY);
      
      if (dist < 60) {
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

      const accentColor = isWellness ? "#79FA0F" : "#FA980F";
      const rgbAccent = isWellness ? "121,250,15" : "250,152,15";
      const coreColor = isWellness ? "#e5fccf" : "#ffedd5";

      // ── Draw particles ────────────────────────────────────────────────────
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.008; // very soft float gravity
        p.life -= p.decay;

        const a = Math.max(0, p.life);
        const canvasY = p.y - scrollY;

        if (canvasY > -50 && canvasY < canvas.height + 50) {
          // Soft glow
          ctx.save();
          ctx.globalAlpha = a * 0.4;
          ctx.shadowBlur = 4;
          ctx.shadowColor = accentColor;
          ctx.fillStyle = `rgba(${rgbAccent},${a * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.x, canvasY, p.size * a, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // White hot core
          ctx.save();
          ctx.globalAlpha = a * 0.3;
          ctx.fillStyle = coreColor;
          ctx.beginPath();
          ctx.arc(p.x, canvasY, p.size * a * 0.25, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ── Draw sparks ───────────────────────────────────────────────────────
      sparksRef.current = sparksRef.current.filter((s) => s.life > 0);
      for (const s of sparksRef.current) {
        const travel = s.speed * (1 - s.life + 0.05);
        const ex = s.x + Math.cos(s.angle) * travel * 6;
        const ey = s.y + Math.sin(s.angle) * travel * 6;

        const canvasSY = s.y - scrollY;
        const canvasEY = ey - scrollY;

        if (
          (canvasSY > -50 && canvasSY < canvas.height + 50) ||
          (canvasEY > -50 && canvasEY < canvas.height + 50)
        ) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, s.life) * 0.4;
          ctx.strokeStyle = `rgba(${rgbAccent},${s.life})`;
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 2;
          ctx.shadowColor = coreColor;
          ctx.beginPath();
          ctx.moveTo(s.x, canvasSY);
          ctx.lineTo(ex, canvasEY);
          ctx.stroke();
          ctx.restore();
        }
        s.life -= 0.05;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isWellness]);

  return (
    <div className="absolute inset-0 w-full pointer-events-none z-[1]" style={{ height: dimensions.height }}>
      {/* Particle Canvas (Fixed to Viewport, behind content) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[1]"
      />

      {/* SVG Container (Absolute, spans full page height, behind content) */}
      <motion.div
        style={{ y: containerY }}
        className="absolute inset-0 w-full pointer-events-none will-change-transform z-[1]"
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
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1.2 0 0 0 0.05  0.9 0 0 0 0.02  0 0 0 0 0  0 0 0 0.4 0"
                result="colored"
              />
              <feMerge>
                <feMergeNode in="colored" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Soft Mid Glow Filter */}
            <filter id="eline-glow-mid" x="-120%" y="-3%" width="340%" height="106%">
              <feGaussianBlur stdDeviation="3" />
            </filter>

            {/* Soft Core Blur Filter */}
            <filter id="eline-glow-core" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.8" />
            </filter>

            {/* Dynamic Energy Gradient */}
            <linearGradient id="energy-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isWellness ? "#79FA0F" : "#FA980F"} />
              <stop offset="50%" stopColor={isWellness ? "#5dc206" : "#e08200"} />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>
          </defs>

          {/* Invisible reference path for length calculations */}
          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="transparent"
            strokeWidth={1}
          />

          {/* Layer 1: Wide Ambient Gold Glow (Thin & Soft) */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="url(#energy-gradient)"
            strokeWidth={6}
            strokeLinecap="round"
            filter="url(#eline-glow-outer)"
            style={{ pathLength: spring, opacity: lineOpacity }}
            initial={{ pathLength: 0 }}
          />

          {/* Layer 2: Mid Gold Glow (Thin & Soft) */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="url(#energy-gradient)"
            strokeWidth={1.5}
            strokeLinecap="round"
            filter="url(#eline-glow-mid)"
            style={{ pathLength: spring, opacity: coreOpacity }}
            initial={{ pathLength: 0 }}
          />

          {/* Layer 3: Glowing Pulsing Flow (Infinite Animation - Blurry core) */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#ffffff"
            strokeWidth={1.0}
            strokeLinecap="round"
            strokeDasharray="40 180"
            filter="url(#eline-glow-core)"
            animate={{ strokeDashoffset: [0, -220] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            style={{ pathLength: spring, opacity: whiteOpacity }}
            initial={{ pathLength: 0 }}
          />

          {/* Layer 4: Extremely Thin Soft Filament Core */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#ffffff"
            strokeWidth={0.5}
            strokeLinecap="round"
            filter="url(#eline-glow-core)"
            style={{ pathLength: spring, opacity: whiteOpacity }}
            initial={{ pathLength: 0 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
