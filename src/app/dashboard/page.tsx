'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  UtensilsCrossed,
  LayoutGrid,
  Boxes,
  TrendingUp,
  BrainCircuit,
  Sparkles,
  IndianRupee,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Bell
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { KDSKanban } from '@/components/KDSKanban';
import { TableMapGrid } from '@/components/TableMapGrid';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/format';

export default function DashboardPage() {
  const { currentUser, orders, tables, inventory, notifications } = useStore();
  const [activeTab, setActiveTab] = useState<'kds' | 'tables' | 'inventory' | 'analytics' | 'ai'>('kds');

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 14890);
  const activeOrdersCount = orders.filter((o) => o.orderStatus !== 'served').length;
  const occupiedTables = tables.filter((t) => t.status === 'occupied').length;
  const lowStockCount = inventory.filter((i) => i.quantity <= i.reorderLevel).length;

  return (
    <div className="min-h-screen bg-haven-bg text-haven-text-primary">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Top Operational Command Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-haven-card border border-haven-gold/30 rounded-3xl shadow-2xl">
          <div>
            <div className="inline-flex items-center gap-2 text-haven-gold font-serif text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              HAVEN OPERATIONS COMMAND CENTER
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-wider text-haven-text-primary">
              STAFF & ADMIN CONTROL PORTAL
            </h1>
            <p className="text-xs text-haven-text-secondary mt-0.5">
              Logged in as: <strong className="text-haven-gold">{currentUser?.name || 'Lord Alistair'}</strong> ({currentUser?.role || 'admin'})
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            {[
              { id: 'kds', label: 'Kitchen KDS', icon: UtensilsCrossed },
              { id: 'tables', label: 'Table Map', icon: LayoutGrid },
              { id: 'inventory', label: 'Inventory', icon: Boxes },
              { id: 'analytics', label: 'Sales & Analytics', icon: TrendingUp },
              { id: 'ai', label: 'Gemini AI Insights', icon: BrainCircuit },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? 'bg-gold-gradient text-black shadow-gold-sm'
                      : 'bg-haven-surface text-haven-text-muted hover:text-haven-text-primary border border-haven-border'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-haven-card border border-haven-gold/30 shadow-gold-sm">
            <div className="flex justify-between items-center text-haven-text-muted mb-2">
              <span className="text-[10px] uppercase tracking-widest font-semibold">Today’s Live Revenue</span>
              <IndianRupee className="w-5 h-5 text-haven-gold" />
            </div>
            <span className="font-mono text-3xl font-bold text-haven-gold">{formatPrice(totalRevenue)}</span>
            <span className="block text-[10px] text-green-400 mt-1 font-mono">+18.4% vs last weekend</span>
          </div>

          <div className="p-6 rounded-2xl bg-haven-card border border-haven-gold/30 shadow-gold-sm">
            <div className="flex justify-between items-center text-haven-text-muted mb-2">
              <span className="text-[10px] uppercase tracking-widest font-semibold">Active Kitchen Orders</span>
              <UtensilsCrossed className="w-5 h-5 text-haven-gold" />
            </div>
            <span className="font-mono text-3xl font-bold text-haven-text-primary">{activeOrdersCount || 4} Orders</span>
            <span className="block text-[10px] text-amber-400 mt-1 font-mono">Avg prep time: 14 mins</span>
          </div>

          <div className="p-6 rounded-2xl bg-haven-card border border-haven-gold/30 shadow-gold-sm">
            <div className="flex justify-between items-center text-haven-text-muted mb-2">
              <span className="text-[10px] uppercase tracking-widest font-semibold">Table Occupancy Rate</span>
              <Users className="w-5 h-5 text-haven-gold" />
            </div>
            <span className="font-mono text-3xl font-bold text-haven-text-primary">
              {Math.round((occupiedTables / tables.length) * 100)}% Occupied
            </span>
            <span className="block text-[10px] text-haven-text-secondary mt-1 font-mono">{occupiedTables} of {tables.length} tables active</span>
          </div>

          <div className="p-6 rounded-2xl bg-haven-card border border-haven-gold/30 shadow-gold-sm">
            <div className="flex justify-between items-center text-haven-text-muted mb-2">
              <span className="text-[10px] uppercase tracking-widest font-semibold">Low Stock Warnings</span>
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <span className="font-mono text-3xl font-bold text-amber-400">{lowStockCount || 1} Alert</span>
            <span className="block text-[10px] text-amber-300 mt-1 font-mono">A5 Wagyu Beef below reorder</span>
          </div>
        </div>

        {/* TAB 1: KITCHEN DISPLAY SYSTEM */}
        {activeTab === 'kds' && <KDSKanban />}

        {/* TAB 2: INTERACTIVE TABLE MAP */}
        {activeTab === 'tables' && <TableMapGrid />}

        {/* TAB 3: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="bg-haven-card border border-haven-gold/30 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-haven-border pb-4">
              <h2 className="font-serif text-2xl font-bold tracking-wider text-haven-text-primary">
                INGREDIENT STOCK & AUTOMATED DEDUCTION
              </h2>
              <span className="text-xs text-haven-gold font-serif italic">Auto-Deducted On Order Complete</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventory.map((item) => {
                const isLow = item.quantity <= item.reorderLevel;
                const percentage = Math.min(100, Math.round((item.quantity / (item.reorderLevel * 2)) * 100));
                return (
                  <div
                    key={item.id}
                    className={`p-5 rounded-2xl bg-haven-surface border space-y-3 ${
                      isLow ? 'border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-haven-border'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif text-lg font-bold text-haven-text-primary">{item.name}</h4>
                        <span className="text-xs text-haven-text-muted font-mono">{formatPrice(item.costPerUnit)} / {item.unit}</span>
                      </div>

                      {isLow && (
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/40 text-[9px] font-bold uppercase tracking-wider animate-pulse">
                          Low Stock
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-haven-text-secondary">Quantity</span>
                        <span className={`font-bold ${isLow ? 'text-amber-400' : 'text-haven-gold'}`}>
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-haven-card overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${isLow ? 'bg-amber-500' : 'bg-gold-gradient'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-haven-text-muted mt-1 block font-mono">Reorder Threshold: {item.reorderLevel} {item.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: SALES ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-haven-card border border-haven-gold/30 rounded-3xl p-8 shadow-2xl space-y-6">
            <h2 className="font-serif text-2xl font-bold tracking-wider text-haven-text-primary">
              REAL-TIME SALES & POPULAR DISH DISTRIBUTION
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-haven-surface border border-haven-border space-y-4">
                <h4 className="font-serif text-lg font-bold text-haven-gold">Top Grossing Signature Dishes</h4>
                <div className="space-y-3 text-xs font-sans">
                  {[
                    { name: 'Dry-Aged Prime Ribeye (16oz)', revenue: '₹6,240', pct: 85 },
                    { name: 'Wagyu Beef Carpaccio', revenue: '₹3,420', pct: 65 },
                    { name: 'Black Truffle Tagliatelle', revenue: '₹2,760', pct: 50 },
                    { name: 'Ember & Gold Old Fashioned', revenue: '₹1,920', pct: 40 },
                  ].map((d, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-haven-text-primary">{d.name}</span>
                        <span className="font-mono text-haven-gold">{d.revenue}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-haven-card overflow-hidden">
                        <div className="h-full bg-gold-gradient" style={{ width: `${d.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-haven-surface border border-haven-border space-y-4">
                <h4 className="font-serif text-lg font-bold text-haven-gold">Peak Service Demand Heatmap</h4>
                <p className="text-xs text-haven-text-secondary">Peak guest order density occurs between 8:00 PM – 10:00 PM on Friday and Saturday evenings.</p>
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {['6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM', '1 AM'].map((h, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl text-center border font-mono text-xs font-bold ${
                        i === 2 || i === 3 || i === 4
                          ? 'bg-haven-gold/20 border-haven-gold text-haven-gold shadow-gold-sm'
                          : 'bg-haven-card border-haven-border text-haven-text-muted'
                      }`}
                    >
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PLATINUM GEMINI AI INSIGHTS */}
        {activeTab === 'ai' && (
          <div className="bg-haven-card border border-haven-gold/30 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-haven-border pb-4">
              <BrainCircuit className="w-8 h-8 text-haven-gold animate-pulse" />
              <div>
                <h2 className="font-serif text-2xl font-bold tracking-wider text-haven-text-primary">
                  GEMINI PLATINUM OPERATIONAL FORECASTING
                </h2>
                <span className="text-xs text-haven-gold font-sans uppercase tracking-widest">
                  AI-Powered Predictive Restaurant Intelligence
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-haven-surface border border-haven-gold/30 space-y-3">
                <div className="flex items-center gap-2 text-haven-gold font-serif text-sm font-bold">
                  <Sparkles className="w-4 h-4" />
                  Predictive Ingredient Demand
                </div>
                <p className="text-xs text-haven-text-secondary leading-relaxed">
                  Based on upcoming weekend reservations and past consumption, A5 Wagyu Beef demand is projected to spike by 35%. Reorder 2.5kg by Thursday morning to avoid stockout.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-haven-surface border border-haven-gold/30 space-y-3">
                <div className="flex items-center gap-2 text-haven-gold font-serif text-sm font-bold">
                  <Users className="w-4 h-4" />
                  Roster & Staffing Optimization
                </div>
                <p className="text-xs text-haven-text-secondary leading-relaxed">
                  Chef Table reservations reach 100% capacity at 8:30 PM. Schedule +2 senior sommeliers and +1 sous chef for peak shift coverage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-haven-surface border border-haven-gold/30 space-y-3">
                <div className="flex items-center gap-2 text-haven-gold font-serif text-sm font-bold">
                  <TrendingUp className="w-4 h-4" />
                  Menu Profitability Insight
                </div>
                <p className="text-xs text-haven-text-secondary leading-relaxed">
                  Black Truffle Tagliatelle exhibits a 78% margin. Pairing with 2017 Barolo increases average table spend by ₹42 per guest.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
