'use client';

import React from 'react';
import { motion } from 'framer-motion';

const EXPERIENCE_CARDS = [
  {
    title: 'Crafted Cocktails',
    subtitle: 'Balanced flavors, quality ingredients',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Ambience',
    subtitle: 'Warm lighting & intimate seating',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Music',
    subtitle: 'Soundtrack that complements the mood',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Service',
    subtitle: 'Attentive and friendly',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop',
  },
];

export function NightExperienceSection() {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-haven-bg text-haven-text-primary border-t border-haven-gold/10">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        
        {/* ========== HEADER - Strong bottom to top motion ========== */}
        <div className="max-w-3xl mx-auto space-y-5">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-6xl italic font-light tracking-wide text-[#F5F0E8]"
          >
            Designed for a better night experience
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-sm sm:text-base text-haven-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            HAVEN brings together crafted drinks, warm ambience, and a relaxed social setting. Every detail is shaped to create a smooth and memorable evening.
          </motion.p>
        </div>

        {/* ========== 4 CARDS ========== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {EXPERIENCE_CARDS.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 70, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{
                duration: 0.8,
                delay: idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group relative bg-haven-card border border-haven-gold/20 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              {/* Image - Blurry → Sharp + Zoom */}
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={card.image}
                  alt={card.title}
                  initial={{ scale: 1.25, filter: 'blur(12px)', opacity: 0.6 }}
                  whileInView={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: idx * 0.12 + 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: false }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-haven-card via-transparent to-transparent opacity-80" />
              </div>

              {/* Card Title + Subtitle - bottom to top */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.12 + 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: false }}
                className="p-6 text-center space-y-2 bg-haven-card"
              >
                <h3 className="font-serif text-xl font-bold text-haven-text-primary group-hover:text-haven-gold transition-colors">
                  {card.title}
                </h3>
                <p className="font-sans text-xs text-haven-text-secondary">
                  {card.subtitle}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}