'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, MapPin, Sparkles, Play, Pause } from 'lucide-react';

interface SpaceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

const SPACE_GALLERY_ITEMS: SpaceItem[] = [
  {
    id: 'lounge-bar',
    title: 'The Amber Lounge Bar',
    category: 'Lounge & Bar',
    description: 'Custom marble bar top, low-key pendant lighting, and plush velvet seating designed for private conversation.',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'patio-terrace',
    title: 'Garden Patio Terrace',
    category: 'Outdoor Terrace',
    description: 'Open-air courtyard surrounded by lush greenery, fire pits, and subtle acoustic resonance.',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'greenhouse',
    title: 'Botanical Glasshouse',
    category: 'Private Glasshouse',
    description: 'Enclosed glass atrium with panoramic garden views and climate-controlled botanical ambience.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'intimate-booth',
    title: 'Intimate Candle Nook',
    category: 'Main Dining Room',
    description: 'Secluded booths featuring hand-worked wood accents and warm candlelit table settings.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'grand-hall',
    title: 'Grand Dining Sanctuary',
    category: 'Main Hall',
    description: 'High-ceiling dining area showcasing architectural craftsmanship and bespoke acoustic design.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'wine-cellar',
    title: 'Vintage Reserve Wine Cellar',
    category: 'Private Tasting Vault',
    description: 'Climate-controlled sommelier vault holding over 2,400 rare vintage bottles from Bordeaux and Napa Valley.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'rooftop-lounge',
    title: 'Skyline Rooftop Vista',
    category: 'Rooftop Bar',
    description: '360-degree skyline panorama featuring heated leather loungers and outdoor fire tables.',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'chef-table',
    title: "The Chef's Omakase Counter",
    category: 'Interactive Kitchen',
    description: 'Exclusive 8-seat marble counter right in front of the woodfire grill and plating line.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'speakeasy',
    title: 'The Velvet Speakeasy',
    category: 'Hidden Lounge',
    description: 'Discreet door behind the wine cellar leading to a dark mahogany cocktail room with live vinyl jazz.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'courtyard-fire',
    title: 'Courtyard Fire Pit',
    category: 'Outdoor Lounge',
    description: 'Custom granite fire pit surrounded by cedar benches and night sky illumination.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
  },
];

export function TheSpaceGallery() {
  const [selectedItem, setSelectedItem] = useState<SpaceItem | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Split images for dual-row scrolling reels
  const row1 = [...SPACE_GALLERY_ITEMS, ...SPACE_GALLERY_ITEMS];
  const row2 = [...SPACE_GALLERY_ITEMS.slice().reverse(), ...SPACE_GALLERY_ITEMS.slice().reverse()];

  return (
    <section id="space" className="py-28 bg-[#0A0A0A] text-haven-text-primary border-t border-haven-gold/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-haven-gold/10 pb-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-[0.3em] text-haven-gold bg-haven-gold/10 px-3 py-1 rounded-full border border-haven-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              ARCHITECTURAL SANCTUARY
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-[#F5F0E8]">
              The Space
            </h2>
            <p className="font-sans text-sm text-haven-text-secondary max-w-xl">
              A setting designed with soft tones, layered lighting, and thoughtful details. Moving continuously like a live video reel.
            </p>
          </div>

          {/* Autoplay Toggle Control */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="px-5 py-2.5 rounded-full border border-haven-gold/40 bg-haven-card hover:bg-haven-gold hover:text-black text-haven-gold text-xs font-bold uppercase tracking-widest transition flex items-center gap-2 shadow-gold-sm"
          >
            {isAutoPlay ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Auto-Reel</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Play Auto-Reel</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Row 1: Infinite Moving Images (Left to Right Reel) */}
      <div className="mt-8 relative w-full overflow-hidden py-4">
        <div
          className={`flex gap-6 w-max ${
            isAutoPlay ? 'animate-marquee-left' : ''
          }`}
        >
          {row1.map((item, idx) => (
            <div
              key={`row1-${item.id}-${idx}`}
              onClick={() => setSelectedItem(item)}
              className="group relative w-80 sm:w-96 h-64 rounded-3xl overflow-hidden cursor-pointer border border-haven-gold/20 shadow-2xl bg-haven-card shrink-0 transition-transform duration-500 hover:scale-105 hover:border-haven-gold"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-black/50 transition-colors" />

              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <span className="text-[10px] font-serif uppercase tracking-widest text-haven-gold bg-black/60 px-2.5 py-0.5 rounded border border-haven-gold/30">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-haven-gold transition-colors drop-shadow-md">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md text-haven-gold opacity-0 group-hover:opacity-100 transition-opacity border border-haven-gold/30">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Infinite Moving Images (Right to Left Reel) */}
      <div className="mt-4 relative w-full overflow-hidden py-4">
        <div
          className={`flex gap-6 w-max ${
            isAutoPlay ? 'animate-marquee-right' : ''
          }`}
        >
          {row2.map((item, idx) => (
            <div
              key={`row2-${item.id}-${idx}`}
              onClick={() => setSelectedItem(item)}
              className="group relative w-80 sm:w-96 h-64 rounded-3xl overflow-hidden cursor-pointer border border-haven-gold/20 shadow-2xl bg-haven-card shrink-0 transition-transform duration-500 hover:scale-105 hover:border-haven-gold"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-black/50 transition-colors" />

              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <span className="text-[10px] font-serif uppercase tracking-widest text-haven-gold bg-black/60 px-2.5 py-0.5 rounded border border-haven-gold/30">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-haven-gold transition-colors drop-shadow-md">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md text-haven-gold opacity-0 group-hover:opacity-100 transition-opacity border border-haven-gold/30">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-haven-card border border-haven-gold/40 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 text-white hover:text-haven-gold transition-colors border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-80 md:h-[450px] relative">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-haven-gold bg-haven-gold/10 px-3 py-1 rounded-full border border-haven-gold/30">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedItem.category}
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-white">
                      {selectedItem.title}
                    </h3>
                    <p className="font-sans text-sm text-haven-text-secondary leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-haven-border/60 flex items-center justify-between">
                    <p className="text-xs font-serif text-haven-gold uppercase tracking-widest">
                      Reservations Available Daily
                    </p>
                    <a
                      href="#contact"
                      onClick={() => setSelectedItem(null)}
                      className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest shadow-gold-md hover:opacity-90 transition"
                    >
                      Book Table
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
