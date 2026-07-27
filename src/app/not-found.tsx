'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const textRef = useRef<HTMLDivElement>(null);
  const [scaleY, setScaleY] = useState<number>(1);

  useEffect(() => {
    const updateScale = () => {
      if (textRef.current) {
        const offsetH = textRef.current.offsetHeight;
        if (offsetH > 0) {
          const dynamicScaleY = window.innerHeight / offsetH;
          setScaleY(dynamicScaleY);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0A0A] flex flex-col items-center justify-center text-center select-none">
      {/* BACKGROUND LAYER (404 Text + White Oval) */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
        style={{
          opacity: 0.8,
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Centered White "404" Text */}
          <div
            ref={textRef}
            className="text-[#FFFFFF] font-black leading-none tracking-tighter whitespace-nowrap"
            style={{
              fontSize: 'clamp(200px, 48vw, 800px)',
              transform: `scale(1.15, ${scaleY * 1.4})`,
              transformOrigin: 'center',
            }}
          >
            404
          </div>

          {/* White Oval Overlaid over "404" Text */}
          <div
            className="absolute rounded-full bg-[#FFFFFF] h-[22vh] sm:h-[26vh] md:h-[50vh]"
            style={{
              width: 'clamp(120px, 20vw, 400px)',
              transform: `scaleY(${scaleY * 1.4})`,
              transformOrigin: 'center',
            }}
          />
        </div>
      </div>

      {/* FOREGROUND LUXURY CONTENT */}
      <div className="relative z-10 max-w-xl px-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-haven-gold/40 bg-haven-card/90 text-haven-gold text-xs font-serif uppercase tracking-widest backdrop-blur-md shadow-gold-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Uncharted Culinary Territory
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-serif text-4xl sm:text-6xl font-bold tracking-wider text-[#F5F0E8] drop-shadow-2xl"
        >
          This table doesn’t exist.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sans text-xs sm:text-sm text-[#A39E93] leading-relaxed max-w-md mx-auto"
        >
          The page or dining seating you are searching for has dissolved into history. Allow us to escort you back to our main lounge.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest shadow-gold-lg hover:opacity-90 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Haven</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
