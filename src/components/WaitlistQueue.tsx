'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const WaitlistQueue: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [queueEntry, setQueueEntry] = useState<{ position: number; estMins: number } | null>(null);

  const handleJoinQueue = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!email.trim() && !phone.trim()) {
      setError('Please provide either Email or Mobile number.');
      return;
    }

    // Simple email check
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    // Indian phone check
    if (phone && !/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone.replace(/\s/g, ''))) {
      setError('Please enter a valid Indian mobile number (e.g. +91 9876543210)');
      return;
    }

    // Calculate mock queue position
    const pos = Math.floor(3 + Math.random() * 5);
    const est = pos * 8;

    setQueueEntry({ position: pos, estMins: est });
  };

  return (
    <section id="waitlist" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-haven-card border border-haven-gold/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Background Ambient Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-haven-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-haven-gold/30 bg-haven-gold/10 text-haven-gold text-xs font-serif uppercase tracking-widest mb-4"
            >
              <Users className="w-3.5 h-3.5" />
              Live Lounge Queue & Walk-In Waitlist
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-haven-text-primary mb-4"
            >
              IMMEDIATE WAITLIST & WALK-IN STATUS
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-sm text-haven-text-secondary leading-relaxed mb-6"
            >
              Arriving without a prior reservation? Register on our live digital queue. 
              You will receive SMS & email notifications as your private lounge or dining table prepares.
            </motion.p>

            {/* Current Stats */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -6 }}
                className="p-4 rounded-2xl bg-haven-surface border border-haven-border"
              >
                <span className="block text-xs uppercase tracking-widest text-haven-text-muted">Current Queue</span>
                <span className="font-mono text-2xl font-bold text-haven-gold mt-1 block">4 Parties Ahead</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -6 }}
                className="p-4 rounded-2xl bg-haven-surface border border-haven-border"
              >
                <span className="block text-xs uppercase tracking-widest text-haven-text-muted">Avg. Wait Time</span>
                <span className="font-mono text-2xl font-bold text-haven-gold mt-1 block">15-20 Mins</span>
              </motion.div>
            </div>
          </div>

          {/* Right Form or Position Status */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-haven-surface p-6 sm:p-8 rounded-2xl border border-haven-border"
          >
            <AnimatePresence mode="wait">
              {queueEntry ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-haven-gold/20 border border-haven-gold mx-auto flex items-center justify-center shadow-gold-sm">
                    <CheckCircle2 className="w-8 h-8 text-haven-gold" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-haven-text-primary">
                    YOU ARE IN QUEUE!
                  </h3>
                  <div className="py-4 px-6 rounded-2xl bg-haven-card border border-haven-gold/40 inline-block my-2">
                    <span className="text-xs uppercase tracking-widest text-haven-text-muted block">Queue Position</span>
                    <span className="font-mono text-4xl font-bold text-haven-gold">#{queueEntry.position}</span>
                  </div>
                  <p className="text-xs text-haven-text-secondary flex items-center justify-center gap-1.5 font-mono">
                    <Clock className="w-4 h-4 text-haven-gold" />
                    Estimated Wait: ~{queueEntry.estMins} Minutes
                  </p>
                  <p className="text-[11px] text-haven-text-muted">
                    Confirmation sent to{' '}
                    <strong className="text-haven-text-primary">
                      {email || phone}
                    </strong>
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleJoinQueue}
                  className="space-y-4"
                >
                  <h3 className="font-serif text-lg font-bold text-haven-text-primary uppercase tracking-wider mb-2">
                    Join Live Lounge Queue
                  </h3>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1 font-semibold">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-haven-card border border-haven-border rounded-xl py-2.5 px-4 text-xs text-haven-text-primary focus:outline-none focus:border-haven-gold/70"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1 font-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-haven-card border border-haven-border rounded-xl py-2.5 px-4 text-xs text-haven-text-primary focus:outline-none focus:border-haven-gold/70"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1 font-semibold">
                        Party Size
                      </label>
                      <select
                        value={partySize}
                        onChange={(e) => setPartySize(Number(e.target.value))}
                        className="w-full bg-haven-card border border-haven-border rounded-xl py-2.5 px-3 text-xs text-haven-text-primary focus:outline-none focus:border-haven-gold/70"
                      >
                        {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1 font-semibold">
                      Mobile / WhatsApp (for SMS)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-haven-card border border-haven-border rounded-xl py-2.5 px-4 text-xs text-haven-text-primary focus:outline-none focus:border-haven-gold/70"
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-400 text-xs">
                      {error}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold-sm hover:opacity-90 transition mt-4"
                  >
                    <span>Enter Digital Queue</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};