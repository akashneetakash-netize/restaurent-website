'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, ChevronRight, Info } from 'lucide-react';

interface Cocktail {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  recipe: { ingredient: string; measure: string }[];
}

const COCKTAILS: Cocktail[] = [
  {
    id: 'golden-elixir',
    name: 'Golden Elixir',
    subtitle: 'Vodka, passion fruit, honey',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
    recipe: [
      { ingredient: 'Craft Vodka', measure: '45 ml' },
      { ingredient: 'Passion Fruit Juice', measure: '30 ml' },
      { ingredient: 'Wild Honey Syrup', measure: '15 ml' },
      { ingredient: 'Fresh Lime Juice', measure: '10 ml' },
    ],
  },
  {
    id: 'smoked-ruby',
    name: 'Smoked Ruby',
    subtitle: 'Smoked bourbon, campari',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
    recipe: [
      { ingredient: 'Smoked Rye Bourbon', measure: '50 ml' },
      { ingredient: 'Campari Bitter', measure: '20 ml' },
      { ingredient: 'Sweet Vermouth', measure: '20 ml' },
      { ingredient: 'Flamed Orange Peel', measure: '1 twist' },
    ],
  },
  {
    id: 'velvet-cloud',
    name: 'Velvet Cloud',
    subtitle: 'Elderflower, gin, lemon',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=800&auto=format&fit=crop',
    recipe: [
      { ingredient: 'Botanical Gin', measure: '40 ml' },
      { ingredient: 'St-Germain Liqueur', measure: '20 ml' },
      { ingredient: 'Lemon Juice', measure: '15 ml' },
      { ingredient: 'Organic Egg White', measure: '1' },
    ],
  },
  {
    id: 'berry-fusion',
    name: 'Berry Fusion',
    subtitle: 'Wild berry, rum, mint',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop',
    recipe: [
      { ingredient: 'Spiced Dark Rum', measure: '45 ml' },
      { ingredient: 'Wild Berry Puree', measure: '30 ml' },
      { ingredient: 'Fresh Spearmint', measure: '10 leaves' },
      { ingredient: 'Artisanal Soda Water', measure: '60 ml' },
    ],
  },
];

export function HouseOfDrinksSection() {
  const [activeDrink, setActiveDrink] = useState<string | null>(null); // ← changed

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#8B0000] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#660000] via-[#8B0000] to-[#4A0000] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/20 pb-8 gap-4">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              className="flex items-center gap-2 text-haven-gold font-serif text-xs uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full w-fit border border-haven-gold/30"
            >
              <Wine className="w-3.5 h-3.5" />
              House of Drinks
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false }}
              className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-white"
              style={{ transformStyle: 'preserve-3d' }}
            >
              Craft Cocktail Alchemy
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: false }}
            className="font-sans text-xs sm:text-sm text-white/80 max-w-md leading-relaxed"
          >
            Hand-cut ice spheres, flamed botanical oils, and rare house infusions crafted by our master mixologists.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1400px' }}>
          {COCKTAILS.map((drink, index) => {
            const isActive = activeDrink === drink.id;

            return (
              <motion.div
                key={drink.id}
                onClick={() => setActiveDrink(isActive ? null : drink.id)} // ← toggle
                initial={{
                  opacity: 0,
                  y: 90,
                  rotateX: 25,
                  rotateY: index % 2 === 0 ? -15 : 15,
                  scale: 0.88,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  rotateY: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: false, margin: '-40px' }}
                whileHover={{
                  y: -14,
                  rotateX: 6,
                  rotateY: index % 2 === 0 ? 5 : -5,
                  scale: 1.04,
                  transition: { type: 'spring', stiffness: 280, damping: 18 },
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-500 relative flex flex-col justify-between ${
                  isActive
                    ? 'border-haven-gold bg-black/80 shadow-2xl ring-2 ring-haven-gold/50'
                    : 'border-white/20 bg-black/40 hover:border-white/40'
                }`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-haven-gold border border-haven-gold/30 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    <span>RECIPE</span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white flex items-center justify-between">
                      <span>{drink.name}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-haven-gold transition-transform duration-300 ${
                          isActive ? 'rotate-90' : ''
                        }`}
                      />
                    </h3>
                    <p className="font-sans text-xs text-white/70 mt-1">{drink.subtitle}</p>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="pt-3 border-t border-white/20 space-y-2 text-xs font-mono bg-black/40 p-3 rounded-xl overflow-hidden"
                      >
                        <div className="text-[10px] uppercase font-serif tracking-widest text-haven-gold">
                          INGREDIENTS
                        </div>
                        {drink.recipe.map((item) => (
                          <div key={item.ingredient} className="flex justify-between text-white/90">
                            <span>{item.ingredient}</span>
                            <span className="text-haven-gold font-bold">{item.measure}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}