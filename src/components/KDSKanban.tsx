'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Clock, CheckCircle2, AlertCircle, Sparkles, ArrowRight, ToggleLeft, ToggleRight } from 'lucide-react';
import { useStore, Order } from '@/lib/store';
import { formatPrice } from '@/lib/format';

export const KDSKanban: React.FC = () => {
  const { orders, updateOrderStatus, menuItems, toggleItemAvailability } = useStore();

  const columns: { key: Order['orderStatus']; title: string; color: string }[] = [
    { key: 'pending', title: 'New Orders', color: 'border-amber-500/50 text-amber-400' },
    { key: 'in_kitchen', title: 'In Kitchen Prep', color: 'border-blue-500/50 text-blue-400' },
    { key: 'ready', title: 'Ready to Serve', color: 'border-green-500/50 text-green-400' },
    { key: 'served', title: 'Served & Completed', color: 'border-haven-gold/50 text-haven-gold' },
  ];

  return (
    <div className="space-y-10">
      {/* Real-time Kitchen ↔ Guest Sync Control Panel */}
      <div className="bg-haven-card border border-haven-gold/30 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-haven-border pb-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-haven-gold font-serif text-sm uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-haven-gold" />
              Kitchen Live Stock & Dish Availability Override
            </div>
            <p className="text-xs text-haven-text-secondary mt-0.5">
              Toggle any item below to instantly mark it as <strong className="text-haven-gold">Sold Out</strong> across all live guest menus.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border flex items-center justify-between transition ${
                item.isAvailable
                  ? 'bg-haven-surface border-haven-border/80'
                  : 'bg-red-950/40 border-red-500/50'
              }`}
            >
              <div className="truncate pr-2">
                <h5 className="font-serif text-xs font-bold text-haven-text-primary truncate">
                  {item.name}
                </h5>
                <span className="text-[10px] text-haven-gold font-mono">{formatPrice(item.price)}</span>
              </div>

              <button
                onClick={() => toggleItemAvailability(item.id)}
                className={`p-1 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition ${
                  item.isAvailable
                    ? 'text-green-400 hover:text-green-300'
                    : 'text-red-400 hover:text-red-300'
                }`}
                title="Toggle Live Availability"
              >
                {item.isAvailable ? (
                  <>
                    <ToggleRight className="w-6 h-6 text-green-400" />
                    <span className="text-[9px]">IN STOCK</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-6 h-6 text-red-400" />
                    <span className="text-[9px] font-bold">SOLD OUT</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban Order Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((col) => {
          const colOrders = orders.filter((o) => o.orderStatus === col.key);
          return (
            <div key={col.key} className="bg-haven-card border border-haven-border/70 rounded-2xl p-4 flex flex-col h-[600px]">
              {/* Column Header */}
              <div className={`flex items-center justify-between pb-3 mb-4 border-b ${col.color}`}>
                <h3 className="font-serif text-base font-bold tracking-wider">{col.title}</h3>
                <span className="w-6 h-6 rounded-full bg-haven-surface border border-current text-xs font-mono font-bold flex items-center justify-center">
                  {colOrders.length}
                </span>
              </div>

              {/* Order Cards */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {colOrders.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-haven-text-muted text-xs font-serif italic text-center p-4">
                    No orders in this stage
                  </div>
                ) : (
                  colOrders.map((order) => (
                    <motion.div
                      layout
                      key={order.id}
                      className="bg-haven-surface border border-haven-border/80 rounded-xl p-4 shadow-md hover:border-haven-gold/40 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-xs font-bold text-haven-gold">
                          {order.orderNumber}
                        </span>
                        <span className="text-[10px] text-haven-text-muted font-mono">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-haven-text-primary truncate">
                        {order.guestName}
                      </p>
                      <p className="text-[10px] text-haven-text-muted">
                        {order.orderType === 'dine_in' ? `Dine-In • Table #${order.tableNumber || 1}` : 'Takeaway'}
                      </p>

                      {/* Items List */}
                      <div className="my-3 space-y-1 border-t border-b border-haven-border/40 py-2">
                        {order.items.map((i, idx) => (
                          <div key={idx} className="flex justify-between text-xs text-haven-text-secondary">
                            <span>{i.quantity}x {i.menuItem.name}</span>
                            <span className="font-mono text-[10px] text-haven-gold">{formatPrice(i.menuItem.price * i.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-bold text-haven-text-primary">
                          Total: {formatPrice(order.totalAmount)}
                        </span>

                        {/* Status Advancement Button */}
                        {col.key === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'in_kitchen')}
                            className="px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-500/40 text-[10px] font-bold uppercase tracking-wider hover:bg-blue-900 transition flex items-center gap-1"
                          >
                            <span>Prep Order</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}

                        {col.key === 'in_kitchen' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="px-2.5 py-1 rounded bg-green-950 text-green-300 border border-green-500/40 text-[10px] font-bold uppercase tracking-wider hover:bg-green-900 transition flex items-center gap-1"
                          >
                            <span>Mark Ready</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}

                        {col.key === 'ready' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'served')}
                            className="px-2.5 py-1 rounded bg-haven-gold/20 text-haven-gold border border-haven-gold/40 text-[10px] font-bold uppercase tracking-wider hover:bg-haven-gold/30 transition flex items-center gap-1"
                          >
                            <span>Mark Served</span>
                            <CheckCircle2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
