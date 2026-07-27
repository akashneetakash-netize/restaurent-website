'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, UtensilsCrossed } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { StorytellingScrollCanvas } from '@/components/StorytellingScrollCanvas';
import { NightExperienceSection } from '@/components/NightExperienceSection';
import { FavoritesShowcaseSection } from '@/components/FavoritesShowcaseSection';
import { HouseOfDrinksSection } from '@/components/HouseOfDrinksSection';
import { AfterDrinksStorytellerCanvas } from '@/components/AfterDrinksStorytellerCanvas';
import { MenuSlicesAccordion } from '@/components/MenuSlicesAccordion';
import { TheSpaceGallery } from '@/components/TheSpaceGallery';
import { ContactReservationSection } from '@/components/ContactReservationSection';
import { DigitalMenu } from '@/components/DigitalMenu';
import { LiveOrderTracker } from '@/components/LiveOrderTracker';
import { WaitlistQueue } from '@/components/WaitlistQueue';
import { CartDrawer } from '@/components/CartDrawer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { HavenPaymentModal } from '@/components/HavenPaymentModal';

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  return (
    <div className="min-h-screen bg-haven-bg text-haven-text-primary selection:bg-haven-gold selection:text-black">
      {/* Top Navigation */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPayment={() => setIsPaymentOpen(true)}
      />

      {/* SECTION 1 - HERO SECTION WITH FIRST HERO IMAGE */}
      <section className="relative min-h-screen flex flex-col justify-between items-center text-center px-4 pt-32 pb-16 overflow-hidden">
        {/* Fullscreen Hero Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
            alt="Haven Luxury Sanctuary"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
        </div>

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-haven-gold/40 bg-black/60 backdrop-blur-md shadow-gold-sm text-haven-gold text-xs font-serif uppercase tracking-widest"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Smart Luxury Restaurant & Lounge Sanctuary
        </motion.div>

        {/* Main Title & Subtitle */}
        <div className="relative z-10 max-w-4xl space-y-6 my-auto">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-widest text-white drop-shadow-2xl"
          >
            HAVEN
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-xl sm:text-3xl italic tracking-wider text-haven-gold font-light"
          >
            Restaurant & Lounge • Where Gastronomy Meets Real-Time Artistry
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-xs sm:text-sm text-haven-text-secondary max-w-xl mx-auto leading-relaxed"
          >
            An ultra-luxury dining sanctuary synchronized in real time with our master kitchen. Zero sold-out surprises, predictive ingredient craftsmanship, and instant table reservations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => {
                const section = document.getElementById('reservations') || document.getElementById('contact') || document.getElementById('form-section');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/reservations';
                }
              }}
              className="px-8 py-4 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest shadow-gold-lg hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Table</span>
            </button>
            <Link
              href="#menu"
              className="px-8 py-4 rounded-full border border-haven-gold/50 bg-black/60 text-haven-gold hover:border-haven-gold text-xs font-bold uppercase tracking-widest backdrop-blur-md transition flex items-center justify-center gap-2"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Explore Digital Menu</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 flex flex-col items-center gap-2 text-haven-gold/70 text-[10px] font-mono tracking-widest uppercase"
        >
          <span>Scroll To Explore Haven Story</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-haven-gold to-transparent animate-bounce" />
        </motion.div>
      </section>

      {/* SECTION 2 - CANVAS SCROLL STORYTELLING USING EXTRACTED_RESTURENT 300 FRAMES */}
      <section id="experience">
        <StorytellingScrollCanvas />
      </section>

      {/* SECTION 3 - "DESIGNED FOR A BETTER NIGHT EXPERIENCE" */}
      <NightExperienceSection />

      {/* SECTION 4 - "IN THE HEART OF EVERY CUP" FAVORITES COLLAGE */}
      <FavoritesShowcaseSection />

      {/* SECTION 5 - "HOUSE OF DRINKS" RED COCKTAIL ALCHEMY */}
      <HouseOfDrinksSection />

      {/* SECTION 6 - CANVAS SCROLL STORYTELLING AFTER HOUSE OF DRINKS */}
      <AfterDrinksStorytellerCanvas />

      {/* SECTION 7 - "A CURATION KITCHEN MENU" SLICES ACCORDION */}
      <MenuSlicesAccordion />

      {/* SECTION 8 - "THE SPACE" GALLERY */}
      <TheSpaceGallery />

      {/* SECTION 9 - DIGITAL MENU & LIVE ORDER TRACKER */}
      <div id="menu">
        <DigitalMenu />
      </div>
      <LiveOrderTracker />
      <WaitlistQueue />

      {/* SECTION 10 - FINAL SECTION: CONTACT & TABLE RESERVATION */}
      <ContactReservationSection />

      {/* FOOTER */}
      <footer className="border-t border-haven-gold/20 py-12 px-4 sm:px-6 lg:px-8 text-center text-xs text-haven-text-muted bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex justify-center items-center gap-2 font-serif text-lg font-bold text-haven-gold">
            <Sparkles className="w-4 h-4" />
            HAVEN RESTAURANT & LOUNGE
          </div>
          <p className="max-w-md mx-auto text-haven-text-secondary">
            VibeAthon 6.0 Compliant • Full Bronze → Platinum Operations Platform
          </p>
          <p>© 2026 Haven Restaurant & Lounge. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenPayment={() => setIsPaymentOpen(true)}
      />

      {/* Multi-Method Payment Modal */}
      <HavenPaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
      />

      {/* AI Assistant Floating Widget */}
      <AIAssistantWidget />
    </div>
  );
}
