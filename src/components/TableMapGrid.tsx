'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Armchair,
} from 'lucide-react';
import { useStore, RestaurantTable } from '@/lib/store';

export const TableMapGrid: React.FC = () => {
  const { tables, updateTableStatus } = useStore();
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [message, setMessage] = useState<string | null>(null);

  const filteredTables = tables.filter(
    (t) => selectedSection === 'all' || t.section === selectedSection
  );

  const getStatusBadge = (status: RestaurantTable['status']) => {
    switch (status) {
      case 'available':
        return {
          label: 'Available',
          color: 'bg-green-950/80 text-green-400 border-green-500/40',
          next: 'reserved' as const,
          nextLabel: 'Mark Reserved',
        };
      case 'reserved':
        return {
          label: 'Reserved',
          color: 'bg-amber-950/80 text-amber-400 border-amber-500/40',
          next: 'occupied' as const,
          nextLabel: 'Seat Guest',
        };
      case 'occupied':
        return {
          label: 'Occupied',
          color: 'bg-red-950/80 text-red-400 border-red-500/40',
          next: 'cleaning' as const,
          nextLabel: 'Mark Cleaning',
        };
      case 'cleaning':
        return {
          label: 'Cleaning',
          color: 'bg-blue-950/80 text-blue-400 border-blue-500/40',
          next: 'available' as const,
          nextLabel: 'Mark Available',
        };
    }
  };

  const handleStatusChange = (table: RestaurantTable) => {
    const badge = getStatusBadge(table.status);
    updateTableStatus(table.id, badge.next);

    // Live feedback message
    setMessage(`Table #${table.tableNumber} → ${badge.next.toUpperCase()}`);
    setTimeout(() => setMessage(null), 2500);
  };

  // Stats
  const availableCount = tables.filter((t) => t.status === 'available').length;
  const occupiedCount = tables.filter((t) => t.status === 'occupied').length;
  const reservedCount = tables.filter((t) => t.status === 'reserved').length;

  return (
    <div className="bg-haven-card border border-haven-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Live Message Toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 right-4 z-20 px-4 py-2 rounded-xl bg-haven-gold text-black text-xs font-bold shadow-gold-md"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-haven-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-haven-gold font-serif text-sm uppercase tracking-widest mb-1">
            <LayoutGrid className="w-4 h-4" />
            Live Restaurant Floorplan
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-wider text-haven-text-primary">
            TABLE OCCUPANCY MANAGEMENT
          </h2>
        </div>

        {/* Live Stats */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-950/50 border border-green-500/30 text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            {availableCount} Available
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            {reservedCount} Reserved
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            {occupiedCount} Occupied
          </div>
        </div>
      </div>

      {/* Section Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {['all', 'indoor', 'patio', 'private_lounge', 'chef_table'].map((sec) => (
          <button
            key={sec}
            onClick={() => setSelectedSection(sec)}
            className={`px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition ${
              selectedSection === sec
                ? 'bg-gold-gradient text-black shadow-gold-sm'
                : 'bg-haven-surface text-haven-text-muted hover:text-haven-text-primary border border-haven-border'
            }`}
          >
            {sec.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredTables.map((table, index) => {
            const badge = getStatusBadge(table.status);

            return (
              <motion.div
                key={table.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`p-5 rounded-2xl border transition-all duration-300 bg-haven-surface flex flex-col justify-between ${
                  table.status === 'occupied'
                    ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.12)]'
                    : table.status === 'reserved'
                    ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.12)]'
                    : table.status === 'cleaning'
                    ? 'border-blue-500/40'
                    : 'border-haven-border hover:border-haven-gold/50'
                }`}
              >
                {/* Top */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-haven-text-muted font-semibold">
                      {table.section.replace('_', ' ')}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-haven-text-primary flex items-center gap-2">
                      <Armchair className="w-4 h-4 text-haven-gold" />
                      Table #{table.tableNumber}
                    </h4>
                  </div>

                  <span
                    className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border ${badge.color}`}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-haven-border/50">
                  <span className="flex items-center gap-1.5 text-xs text-haven-text-secondary font-mono">
                    <Users className="w-3.5 h-3.5 text-haven-gold" />
                    {table.capacity} Guests
                  </span>

                  <button
                    onClick={() => handleStatusChange(table)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-haven-gold/40 text-haven-gold text-[10px] font-semibold uppercase tracking-wider hover:bg-haven-gold hover:text-black transition"
                  >
                    <RefreshCw className="w-3 h-3" />
                    {badge.nextLabel}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="pt-4 border-t border-haven-border/40 flex flex-wrap gap-4 text-[11px] text-haven-text-muted">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" /> Available
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Reserved
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Occupied
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Cleaning
        </div>
      </div>
    </div>
  );
};