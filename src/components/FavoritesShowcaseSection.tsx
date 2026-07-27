'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';

export function FavoritesShowcaseSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-haven-bg border-t border-haven-gold/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Pill */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-haven-gold/40 bg-haven-gold/10 text-haven-gold text-xs font-serif tracking-widest uppercase shadow-gold-sm"
          >
            ORDER ONLINE ✦
          </motion.div>
        </div>

        {/* 3 Column Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* ========== Card 1 Left ========== */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group relative bg-haven-card border border-haven-border/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            <div className="relative h-96 overflow-hidden">
              <motion.img
                src="https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop"
                alt="Haven Cocktail"
                initial={{ scale: 1.2, filter: 'blur(10px)' }}
                whileInView={{ scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-haven-card via-black/30 to-transparent" />
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: false }}
                className="absolute bottom-6 left-6 right-6 space-y-2"
              >
                <span className="text-xs uppercase tracking-widest text-haven-gold font-serif">Haven</span>
                <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                  A cozy place made with love
                </h3>
              </motion.div>
            </div>

            <div className="p-6 bg-haven-card border-t border-haven-border/50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-serif tracking-wider text-haven-text-secondary uppercase">
                  OUR FAVORITES
                </span>
                <ArrowUpRight className="w-4 h-4 text-haven-gold" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=200',
                  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=200',
                  'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=200',
                ].map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt={`Fav ${i + 1}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    viewport={{ once: false }}
                    className="w-full h-16 object-cover rounded-xl border border-haven-gold/20"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ========== Card 2 Center ========== */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group relative bg-haven-card border border-haven-gold/40 rounded-3xl overflow-hidden shadow-2xl min-h-[500px] flex flex-col justify-end p-8"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1000&auto=format&fit=crop"
              alt="Lounge Experience"
              initial={{ scale: 1.25, filter: 'blur(12px)' }}
              whileInView={{ scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              viewport={{ once: false }}
              className="relative z-10 space-y-4"
            >
              <span className="text-xs uppercase tracking-widest text-haven-gold font-serif bg-black/60 px-3 py-1 rounded-full border border-haven-gold/30">
                THE KITCHEN
              </span>
              <h3 className="font-serif text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                In the heart of every cup
              </h3>
              <p className="font-sans text-sm text-[#E8D5A3]/90 max-w-sm">
                Where botanical spirits, warm lighting, and elevated dining meet in perfect harmony.
              </p>
            </motion.div>
          </motion.div>

          {/* ========== Card 3 Right ========== */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group relative bg-haven-card border border-haven-border/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-6"
          >
            <div className="relative h-72 rounded-2xl overflow-hidden mb-6">
              <motion.img
                src="https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=800&auto=format&fit=crop"
                alt="Smoked Cocktail"
                initial={{ scale: 1.2, filter: 'blur(10px)' }}
                whileInView={{ scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: false }}
                className="absolute bottom-4 left-4 right-4"
              >
                <h4 className="font-serif text-2xl font-bold text-white">
                  Of the city, every cap
                </h4>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                viewport={{ once: false }}
                className="p-4 rounded-2xl bg-haven-surface border border-haven-gold/20 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-haven-gold" />
                  <div>
                    <p className="text-xs font-bold text-white">Mon – Sun</p>
                    <p className="text-[11px] text-haven-text-secondary">5:00 PM – 2:00 AM</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase bg-haven-gold/20 text-haven-gold px-2 py-0.5 rounded font-mono">
                  Open
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                viewport={{ once: false }}
              >
                <Link
                  href="/reservations"
                  className="w-full py-4 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold-md hover:opacity-90 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a Table</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}