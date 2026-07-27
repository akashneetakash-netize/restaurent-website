'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ShoppingBag,
  Flame,
  Clock,
  Wine,
  Search,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/format';

export const DigitalMenu: React.FC = () => {
  const { categories, menuItems, addToCart } = useStore();
  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlySignatures, setOnlySignatures] = useState<boolean>(false);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCatId === 'all' || item.categoryId === selectedCatId;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSignature = !onlySignatures || item.isSignature;
    return matchesCategory && matchesSearch && matchesSignature;
  });

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ========== HEADER ========== */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-haven-gold/30 bg-haven-gold/10 text-haven-gold text-xs font-serif uppercase tracking-widest mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Real-Time Synchronized Gastronomy
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false }}
          className="font-serif text-4xl sm:text-5xl font-bold tracking-wider text-haven-text-primary mb-4"
        >
          DIGITAL SELECTION & LIVE KITCHEN MENU
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false }}
          className="font-sans text-sm text-haven-text-secondary leading-relaxed"
        >
          Crafted with rare artisanal ingredients. Live inventory sync ensures dishes are always prepared fresh at peak perfection.
        </motion.p>
      </div>

      {/* ========== CONTROLS ========== */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: false }}
        className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-haven-card p-4 rounded-2xl border border-haven-gold/20 shadow-gold-sm"
      >
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-haven-gold/60" />
          <input
            type="text"
            placeholder="Search Wagyu, Truffle, Cocktails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-haven-surface border border-haven-border rounded-xl py-2 pl-10 pr-4 text-xs text-haven-text-primary placeholder:text-haven-text-muted focus:outline-none focus:border-haven-gold/60"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCatId('all')}
            className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition ${
              selectedCatId === 'all'
                ? 'bg-gold-gradient text-black shadow-gold-sm'
                : 'bg-haven-surface text-haven-text-muted hover:text-haven-text-primary border border-haven-border'
            }`}
          >
            All Selections
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition ${
                selectedCatId === cat.id
                  ? 'bg-gold-gradient text-black shadow-gold-sm'
                  : 'bg-haven-surface text-haven-text-muted hover:text-haven-text-primary border border-haven-border'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOnlySignatures(!onlySignatures)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition ${
            onlySignatures
              ? 'border-haven-gold text-haven-gold bg-haven-gold/10 shadow-gold-sm'
              : 'border-haven-border text-haven-text-muted hover:text-haven-text-primary'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-haven-gold" />
          <span>Chef Signatures Only</span>
        </button>
      </motion.div>

      {/* ========== MENU CARDS ========== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1200px' }}>
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 80, rotateX: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{
                duration: 0.75,
                delay: index * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: false, margin: '-50px' }}
              whileHover={{
                y: -14,
                rotateX: 5,
                rotateY: 6,
                scale: 1.035,
                transition: { type: 'spring', stiffness: 260, damping: 18 },
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className={`relative bg-haven-card border rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl transition-shadow duration-300 ${
                item.isAvailable
                  ? 'border-haven-border hover:border-haven-gold/50 hover:shadow-gold-md'
                  : 'border-red-900/40 opacity-75 grayscale-[30%]'
              }`}
            >
              {/* ========== IMAGE: Blurry → Sharp + Zoom ========== */}
              <div className="relative h-56 w-full overflow-hidden">
                <motion.img
                  src={item.imageUrl}
                  alt={item.name}
                  initial={{ scale: 1.25, filter: 'blur(12px)', opacity: 0.6 }}
                  whileInView={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.09 + 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: false }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-haven-card via-transparent to-transparent" />

                {item.isSignature && (
                  <div className="absolute top-3 left-3 bg-gold-gradient text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-gold-sm flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-black" />
                    Signature
                  </div>
                )}

                <div
                  className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 border ${
                    item.isAvailable
                      ? 'bg-green-950/80 text-green-400 border-green-500/40'
                      : 'bg-red-950/90 text-red-400 border-red-500/60 animate-pulse'
                  }`}
                >
                  {item.isAvailable ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      Available Live
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 text-red-400" />
                      Sold Out
                    </>
                  )}
                </div>
              </div>

              {/* ========== TEXT CONTENT: rises from bottom ========== */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.09 + 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: false }}
                className="p-6 flex-1 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold tracking-wide text-haven-text-primary">
                      {item.name}
                    </h3>
                    <span className="font-mono text-xl font-bold text-haven-gold ml-2">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  <p className="text-xs text-haven-text-secondary leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {item.pairingNote && (
                    <div className="mt-3 p-2.5 rounded-xl bg-haven-surface border border-haven-gold/20 flex items-start gap-2 text-[11px] text-haven-gold/90 font-serif italic">
                      <Wine className="w-4 h-4 text-haven-gold shrink-0 mt-0.5" />
                      <span>{item.pairingNote}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-haven-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] text-haven-text-muted uppercase tracking-wider font-sans">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-haven-gold/70" />
                      {item.prepTimeMins} mins
                    </span>
                    <span>{item.calories} kcal</span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.isAvailable}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition ${
                      item.isAvailable
                        ? 'bg-gold-gradient text-black hover:opacity-90 shadow-gold-sm'
                        : 'bg-haven-surface text-haven-text-muted border border-haven-border cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{item.isAvailable ? 'Add to Selection' : 'Sold Out'}</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};