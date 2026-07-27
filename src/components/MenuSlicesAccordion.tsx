'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SliceItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const MENU_SLICES: SliceItem[] = [
  {
    id: 'candlelit',
    title: 'Candlelit Dining',
    subtitle: 'Private evening tables',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'steak',
    title: 'Smoked Steak',
    subtitle: 'A5 Miyazaki Wagyu',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'espresso',
    title: 'Espresso Bar',
    subtitle: 'Single origin roasts',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'morning',
    title: 'Morning Plate',
    subtitle: 'Artisanal brioche & fruits',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rooftop',
    title: 'Rooftop Selection',
    subtitle: 'Panoramic skyline view',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'beer',
    title: 'Craft Beer',
    subtitle: 'Micro-brewery taps',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'chef',
    title: "Chef's Plate",
    subtitle: 'Seasonal tasting menu',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'kitchen',
    title: 'Kitchen Craft',
    subtitle: 'Woodfire flame technique',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop',
  },
];

export function MenuSlicesAccordion() {
  const [activeIndex, setActiveIndex] = useState<number>(3); // Morning Plate expanded by default

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] text-white border-t border-haven-gold/10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-serif uppercase tracking-[0.3em] text-haven-gold">CUISINE SHOWCASE</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-haven-text-primary">
            A curation kitchen menu
          </h2>
          <p className="font-sans text-xs sm:text-sm text-haven-text-secondary">
            Honest plates built around clean ingredients and careful prep.
          </p>
        </div>

        {/* Expandable Image Accordion Slices */}
        <div className="flex flex-col md:flex-row h-[520px] w-full gap-2 overflow-hidden rounded-3xl p-2 bg-haven-card border border-haven-gold/20 shadow-2xl">
          {MENU_SLICES.map((slice, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={slice.id}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out"
                style={{
                  flex: isActive ? 3.5 : 0.8,
                }}
              >
                {/* Background Image */}
                <img
                  src={slice.image}
                  alt={slice.title}
                  className="w-full h-full object-cover"
                />

                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                {/* Vertical Title Label for Unfocused Slices */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <span className="font-serif text-sm font-semibold text-white/80 whitespace-nowrap md:-rotate-90 tracking-widest uppercase">
                      {slice.title}
                    </span>
                  </div>
                )}

                {/* Expanded Card Details */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-haven-gold/30 space-y-1"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-haven-gold">
                      FEATURED SELECTION
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {slice.title}
                    </h3>
                    <p className="font-sans text-xs text-[#E8D5A3]">
                      {slice.subtitle}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
