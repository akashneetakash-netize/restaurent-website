'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPayment?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onOpenPayment }) => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, startPaymentTimer } = useStore();

  if (!isOpen) return null;

  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + tax;

  const handleProceedToCheckout = () => {
    startPaymentTimer();
    onClose();
    if (onOpenPayment) {
      onOpenPayment();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-haven-card border-l border-haven-gold/30 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-haven-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-haven-gold" />
                <h2 className="font-serif text-xl font-bold tracking-wider text-haven-text-primary">
                  YOUR SANCTUARY SELECTION
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-haven-text-muted hover:text-haven-gold transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-haven-text-muted py-12">
                  <Sparkles className="w-12 h-12 text-haven-gold/30 mb-3" />
                  <p className="font-serif text-lg text-haven-text-secondary">Your Selection is Empty</p>
                  <p className="text-xs mt-1">Explore our digital menu to add signature culinary creations.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="flex gap-4 p-3 bg-haven-surface border border-haven-border/60 rounded-xl items-center"
                  >
                    <img
                      src={item.menuItem.imageUrl}
                      alt={item.menuItem.name}
                      className="w-16 h-16 rounded-lg object-cover border border-haven-gold/20"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-haven-text-primary truncate">
                        {item.menuItem.name}
                      </h4>
                      <p className="text-xs text-haven-gold font-mono font-medium mt-0.5">
                        {formatPrice(item.menuItem.price)}
                      </p>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateCartQuantity(item.menuItem.id, -1)}
                          className="w-6 h-6 rounded bg-haven-card border border-haven-border flex items-center justify-center text-haven-text-muted hover:text-haven-gold text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-semibold text-haven-text-primary px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.menuItem.id, 1)}
                          className="w-6 h-6 rounded bg-haven-card border border-haven-border flex items-center justify-center text-haven-text-muted hover:text-haven-gold text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.menuItem.id)}
                      className="p-2 text-haven-text-muted hover:text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-haven-border bg-haven-surface/50 space-y-3">
                <div className="flex justify-between text-xs text-haven-text-secondary font-sans">
                  <span>Subtotal</span>
                  <span className="font-mono text-haven-text-primary">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-haven-text-secondary font-sans">
                  <span>Estimated Tax (10%)</span>
                  <span className="font-mono text-haven-text-primary">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-haven-border/60 pt-2 flex justify-between font-serif text-lg font-bold text-haven-gold">
                  <span>Total</span>
                  <span className="font-mono">{formatPrice(grandTotal)}</span>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full mt-4 py-3.5 rounded-xl bg-gold-gradient hover:opacity-90 text-black font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-gold-md transition"
                >
                  <span>Proceed to Luxury Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
