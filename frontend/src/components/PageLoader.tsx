import React from "react";
import { motion } from "motion/react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050d0a] text-white">
      {/* Background ambient gold lights */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none animate-pulse duration-3000" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none animate-pulse duration-3000 delay-1000" />

      <div className="relative flex flex-col items-center">
        {/* Animated Brand Diamond Logo */}
        <motion.div
          animate={{
            rotate: [45, 225, 45],
            borderColor: ["rgba(201, 164, 92, 0.3)", "rgba(201, 164, 92, 0.8)", "rgba(201, 164, 92, 0.3)"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 border-2 border-luxury-gold rotate-45 flex items-center justify-center shadow-lg shadow-luxury-gold/10"
        >
          <motion.span
            animate={{
              rotate: [-45, -225, -45],
              color: ["#ffffff", "#C9A45C", "#ffffff"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-xs font-bold font-mono tracking-wider block"
          >
            DA
          </motion.span>
        </motion.div>

        {/* Dynamic loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-col items-center text-center space-y-1"
        >
          <h2 className="text-sm font-light tracking-[0.3em] uppercase text-white">
            Dhara<span className="text-[#C9A45C] font-semibold">Aveda</span>
          </h2>
          <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-gray-400">
            Aligning Auric Vibrations
          </p>
        </motion.div>

        {/* Dynamic pulsing loading bar */}
        <div className="w-24 h-[1px] bg-white/10 mt-6 relative overflow-hidden rounded-full">
          <motion.div
            animate={{
              left: ["-100%", "100%"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
