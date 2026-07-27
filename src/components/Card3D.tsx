'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Sparkles } from 'lucide-react';

interface Card3DProps {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  isFlipped: boolean;
  isSubmitting?: boolean;
  isSuccess?: boolean;
}

export const Card3D: React.FC<Card3DProps> = ({
  cardName,
  cardNumber,
  expiry,
  cvv,
  isFlipped,
  isSubmitting = false,
  isSuccess = false,
}) => {
  const formatDisplayNumber = () => {
    if (!cardNumber) return '4532 •••• •••• 8892';
    return cardNumber;
  };

  return (
    <div className="w-full max-w-[420px] h-[250px] [perspective:1000px] my-6">
      <motion.div
        className="relative w-full h-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] shadow-gold-glow"
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: isSuccess ? [1, 1.05, 1] : 1,
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* FRONT FACE - Metallic Gold Luxury Visa Card */}
        <div className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1E1B18] via-[#111111] to-[#0A0A0A] border border-haven-gold/40 shadow-2xl [backface-visibility:hidden]">
          {/* Subtle gold metallic shimmer overlay */}
          <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_top_left,rgba(232,213,163,0.15),transparent_60%)] pointer-events-none" />

          {/* Top Row: Chip + NFC + Bank Brand */}
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
              {/* EMV Chip */}
              <div className="w-12 h-9 rounded-md bg-gradient-to-tr from-[#D4AF37] via-[#E8D5A3] to-[#8C6F19] p-[2px] shadow-inner flex items-center justify-center">
                <div className="w-full h-full border border-[#8C6F19]/40 rounded grid grid-cols-2 gap-1 p-1">
                  <div className="border-r border-b border-[#8C6F19]/30" />
                  <div className="border-b border-[#8C6F19]/30" />
                </div>
              </div>
              <Wifi className="w-6 h-6 text-haven-gold/80 rotate-90" />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 font-serif text-haven-gold tracking-wider text-sm font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-haven-gold" />
                HAVEN BLACK
              </div>
              <span className="text-[10px] text-haven-gold/60 uppercase tracking-widest">Reserve Elite</span>
            </div>
          </div>

          {/* Middle Row: Card Number */}
          <div className="relative z-10 my-2">
            <div className="font-mono text-xl md:text-2xl tracking-[0.25em] text-haven-text-primary drop-shadow">
              {formatDisplayNumber()}
            </div>
          </div>

          {/* Bottom Row: Cardholder Name + Expiry + VISA logo */}
          <div className="flex justify-between items-end relative z-10">
            <div>
              <div className="text-[9px] uppercase tracking-widest text-haven-gold/60">Cardholder</div>
              <div className="font-sans text-sm font-medium tracking-wider text-haven-text-primary uppercase truncate max-w-[180px]">
                {cardName || 'LORD ALISTAIR'}
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-haven-gold/60">Expires</div>
              <div className="font-mono text-sm font-medium tracking-wider text-haven-text-primary">
                {expiry || '12/28'}
              </div>
            </div>
            <div className="font-serif italic font-bold text-2xl tracking-tighter text-haven-gold drop-shadow-sm">
              VISA
            </div>
          </div>
        </div>

        {/* BACK FACE - Magnetic Stripe & CVV Strip */}
        <div className="absolute inset-0 w-full h-full rounded-2xl py-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#111111] via-[#1A1816] to-[#0A0A0A] border border-haven-gold/40 shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {/* Black Magnetic Stripe */}
          <div className="w-full h-12 bg-black shadow-inner my-2" />

          {/* Signature & CVV Strip */}
          <div className="px-6 my-2">
            <div className="flex justify-between items-center text-[10px] text-haven-gold/70 uppercase tracking-widest mb-1">
              <span>Authorized Signature</span>
              <span>CVV / CVC</span>
            </div>
            <div className="w-full h-10 bg-white/90 rounded flex items-center justify-end px-4 shadow-inner">
              <span className="font-mono text-black font-bold text-lg tracking-widest">
                {cvv || '•••'}
              </span>
            </div>
          </div>

          {/* Disclaimer text */}
          <div className="px-6 text-[9px] text-haven-text-muted/70 leading-relaxed font-sans">
            This Haven Black Privilege Card remains property of Haven Restaurant & Lounge N.V. Issued for VIP guests only.
          </div>
        </div>
      </motion.div>
    </div>
  );
};
