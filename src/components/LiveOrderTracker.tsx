'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  CheckCircle2,
  UtensilsCrossed,
  ChefHat,
  Sparkles,
  ArrowRight,
  Package,
} from 'lucide-react';
import { useStore, Order } from '@/lib/store';
import { formatPrice } from '@/lib/format';

export const LiveOrderTracker: React.FC = () => {
  const { orders, updateOrderStatus, currentUser } = useStore();

  // Get the most recent active order for the current user (or latest overall)
  const activeOrder: Order | null =
    orders.find(
      (o) =>
        o.orderStatus !== 'completed' &&
        o.orderStatus !== 'served' &&
        (!currentUser || o.guestName === currentUser.name || o.userId === currentUser.id)
    ) || orders[0] || null;

  const steps: { key: Order['orderStatus']; label: string; icon: any }[] = [
    { key: 'pending', label: 'Received', icon: Clock },
    { key: 'in_kitchen', label: 'In Kitchen Prep', icon: ChefHat },
    { key: 'ready', label: 'Ready to Serve', icon: UtensilsCrossed },
    { key: 'served', label: 'Served', icon: CheckCircle2 },
  ];

  const getStepIndex = (status: Order['orderStatus']) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'in_kitchen':
        return 1;
      case 'ready':
        return 2;
      case 'served':
      case 'completed':
        return 3;
      default:
        return 0;
    }
  };

  const currentStepIdx = activeOrder ? getStepIndex(activeOrder.orderStatus) : -1;

  // Live countdown timer
  const [estimatedMins, setEstimatedMins] = useState(14);

  useEffect(() => {
    if (!activeOrder || currentStepIdx >= 3) return;

    const timer = setInterval(() => {
      setEstimatedMins((prev) => (prev > 1 ? prev - 1 : 8));
    }, 12000);

    return () => clearInterval(timer);
  }, [activeOrder, currentStepIdx]);

  // Auto-progress simulation (for demo / live feel)
  useEffect(() => {
    if (!activeOrder || activeOrder.id === 'ord-demo') return;
    if (currentStepIdx >= 3) return;

    const autoAdvance = setTimeout(() => {
      const stageSequence: Order['orderStatus'][] = [
        'pending',
        'in_kitchen',
        'ready',
        'served',
      ];
      const nextStatus = stageSequence[currentStepIdx + 1];
      if (nextStatus) {
        updateOrderStatus(activeOrder.id, nextStatus);
      }
    }, 18000); // advances every 18 seconds

    return () => clearTimeout(autoAdvance);
  }, [activeOrder, currentStepIdx, updateOrderStatus]);

  const handleNextStage = () => {
    if (!activeOrder) return;
    const stageSequence: Order['orderStatus'][] = [
      'pending',
      'in_kitchen',
      'ready',
      'served',
    ];
    const nextIdx = Math.min(currentStepIdx + 1, 3);
    updateOrderStatus(activeOrder.id, stageSequence[nextIdx]);
  };

  // No active order state
  if (!activeOrder) {
    return (
      <section id="order-tracker" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="bg-haven-card border border-haven-gold/20 rounded-3xl p-10 text-center shadow-2xl"
        >
          <Package className="w-12 h-12 text-haven-gold/50 mx-auto mb-4" />
          <h3 className="font-serif text-2xl text-haven-text-primary mb-2">
            No Active Order
          </h3>
          <p className="text-sm text-haven-text-secondary">
            Place an order from the menu and it will appear here live.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="order-tracker" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-haven-card border border-haven-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Top Gold Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-haven-border pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-haven-gold font-serif text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Live Kitchen Sync Order Tracker
            </div>
            <h2 className="font-serif text-2xl font-bold tracking-wider text-haven-text-primary flex items-center gap-3">
              <span>ORDER #{activeOrder.orderNumber}</span>
              <span className="text-xs font-mono font-normal bg-emerald-950 text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                {activeOrder.paymentStatus.toUpperCase()}
              </span>
            </h2>
            <p className="text-xs text-haven-text-secondary mt-1">
              Guest: {activeOrder.guestName || 'Valued Guest'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {currentStepIdx < 3 && (
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-haven-text-muted uppercase tracking-widest block">
                  Estimated Time
                </span>
                <span className="font-mono text-xl font-bold text-haven-gold">
                  {estimatedMins} Mins Remaining
                </span>
              </div>
            )}

            {currentStepIdx < 3 && (
              <button
                onClick={handleNextStage}
                className="px-4 py-2 rounded-xl bg-haven-surface border border-haven-gold/40 hover:border-haven-gold text-haven-gold text-xs font-serif uppercase tracking-wider flex items-center gap-1.5 transition shadow-gold-sm"
              >
                <span>Advance Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Stepper */}
        <div className="relative my-10 px-2 sm:px-6">
          <div className="absolute top-6 left-10 right-10 h-1 bg-haven-border z-0" />
          <motion.div
            className="absolute top-6 left-10 h-1 bg-gold-gradient z-0"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStepIdx / 3) * 100}%` }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />

          <div className="relative z-10 flex justify-between">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      isCurrent
                        ? 'bg-haven-gold text-black border-haven-gold scale-110 shadow-gold-md animate-pulse'
                        : isCompleted
                        ? 'bg-haven-card border-haven-gold text-haven-gold'
                        : 'bg-haven-surface border-haven-border text-haven-text-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-serif font-semibold mt-3 tracking-wider uppercase text-center max-w-[90px] ${
                      isCurrent
                        ? 'text-haven-gold font-bold'
                        : isCompleted
                        ? 'text-haven-text-primary'
                        : 'text-haven-text-muted'
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mt-6 p-5 rounded-2xl bg-haven-surface border border-haven-border/60"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-serif text-xs font-bold text-haven-text-primary uppercase tracking-wider">
              Dishes in Preparation ({activeOrder.items.length} Items)
            </h4>
            <span className="font-mono text-sm text-haven-gold font-bold">
              Total: {formatPrice(activeOrder.totalAmount)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeOrder.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: false }}
                className="flex items-center justify-between p-3 rounded-xl bg-haven-card border border-haven-border/40"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-haven-gold font-bold text-sm">
                    {item.quantity}x
                  </span>
                  <span className="text-xs text-haven-text-secondary truncate">
                    {item.menuItem.name}
                  </span>
                </div>
                <span className="font-mono text-xs text-white/60">
                  {formatPrice(item.menuItem.price)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Completed Message */}
        <AnimatePresence>
          {currentStepIdx >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center"
            >
              <p className="text-emerald-400 font-serif text-sm">
                Your order has been served. Enjoy your evening at Haven.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};