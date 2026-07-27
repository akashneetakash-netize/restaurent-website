'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Mail, CheckCircle2, Sparkles, ArrowRight, AlertCircle, Users } from 'lucide-react';
import { validateIndianPhone, validateReservationDate, validateEmail } from '@/lib/validation';

export function ContactReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '19:30',
    guests: '2 Guests',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Date limits: today -> today + 60 days
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Name validation
    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    // 2. Contact validation (Email OR Phone required)
    const hasEmail = formData.email.trim().length > 0;
    const hasPhone = formData.phone.trim().length > 0;

    if (!hasEmail && !hasPhone) {
      setError('Please enter either your Email address or Mobile / WhatsApp number.');
      return;
    }

    if (hasEmail) {
      const emailCheck = validateEmail(formData.email);
      if (!emailCheck.isValid) {
        setError(emailCheck.error);
        return;
      }
    }

    if (hasPhone) {
      const phoneCheck = validateIndianPhone(formData.phone);
      if (!phoneCheck.isValid) {
        setError(phoneCheck.error);
        return;
      }
    }

    // 3. Date validation
    const dateCheck = validateReservationDate(formData.date, 60);
    if (!dateCheck.isValid) {
      setError(dateCheck.error);
      return;
    }

    setIsSubmitting(true);

    const tableNumber = Math.floor(Math.random() * 30) + 1;

    // Trigger WhatsApp pre-filled chat
    const restaurantWhatsApp = process.env.NEXT_PUBLIC_RESTAURANT_WHATSAPP || '919876543210';
    const cleanGuestPhone = formData.phone.replace(/[^\d]/g, '').replace(/^0/, '91');
    const targetPhone = cleanGuestPhone.length >= 10 ? cleanGuestPhone : restaurantWhatsApp;

    const waText = encodeURIComponent(
      `✨ *HAVEN SANCTUARY — Reservation Confirmed!*\n\n` +
        `👤 Guest: ${formData.name}\n` +
        `📅 Date: ${formData.date}\n` +
        `🕖 Time: ${formData.time}\n` +
        `👥 Party Size: ${formData.guests}\n` +
        `🍽️ Table: #${tableNumber}\n` +
        (formData.notes ? `📝 Special Requests: ${formData.notes}\n` : '') +
        `\nWe look forward to welcoming you at Haven Sanctuary, Bandra West, Mumbai.`
    );

    window.open(`https://wa.me/${targetPhone}?text=${waText}`, '_blank');

    // Send Email Confirmation via SendGrid
    try {
      await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: formData.name.trim(),
          guestEmail: formData.email.trim(),
          guestPhone: formData.phone.trim(),
          reservationDate: formData.date,
          reservationTime: formData.time,
          partySize: formData.guests,
          section: 'Main Dining Room',
          tableNumber: String(tableNumber),
          specialRequests: formData.notes.trim(),
        }),
      });
    } catch (err) {
      console.error('[Confirmation Email Error]', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="reservations" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-haven-bg overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-haven-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-haven-gold/30 bg-haven-gold/10 text-haven-gold text-xs font-serif uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Sanctuary Dining & Contact • Bandra West
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold tracking-wider text-white"
          >
            EXPERIENCE THE HAVEN SANCTUARY
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm text-haven-text-secondary"
          >
            Reserve your royal table or reach out to our concierge team at Bandra West, Mumbai.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Indian Contact & Location Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="lg:col-span-5 space-y-8 bg-haven-card border border-haven-gold/30 rounded-3xl p-8 shadow-2xl"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-serif uppercase tracking-[0.3em] text-haven-gold">
                ROYAL INDIAN HOSPITALITY
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">HAVEN SANCTUARY MUMBAI</h3>
              <p className="text-xs text-haven-text-secondary leading-relaxed">
                Situated in the heart of Bandra West, Haven Sanctuary blends modern culinary luxury with centuries-old Indian royal dining traditions.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-haven-surface border border-haven-gold/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-haven-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Sanctuary Address</h4>
                  <p className="text-xs text-haven-text-secondary mt-1">
                    Haven Sanctuary, Hill Road, Opposite St. Andrew’s Church, Bandra West, Mumbai, Maharashtra 400050
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-haven-surface border border-haven-gold/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-haven-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Concierge & WhatsApp</h4>
                  <p className="text-xs text-haven-gold font-mono font-bold mt-1">+91 98765 43210</p>
                  <p className="text-[10px] text-haven-text-muted">Instant WhatsApp booking available</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-haven-surface border border-haven-gold/30 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-haven-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Email Reservations</h4>
                  <p className="text-xs text-white font-mono mt-1">reservations@havensanctuary.in</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-haven-surface border border-haven-gold/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-haven-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Dining Hours</h4>
                  <p className="text-xs text-haven-text-secondary mt-1">
                    Lunch: 12:30 PM – 3:30 PM | Dinner: 7:00 PM – 1:00 AM IST
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="lg:col-span-7 bg-haven-card border border-haven-gold/30 rounded-3xl p-8 sm:p-10 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-haven-gold/20 border-2 border-haven-gold mx-auto flex items-center justify-center shadow-gold-sm">
                    <CheckCircle2 className="w-8 h-8 text-haven-gold" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-white">RESERVATION RECEIVED</h3>
                    <p className="text-xs text-haven-gold font-semibold uppercase tracking-wider">
                      Confirmation will be sent to your WhatsApp and Email
                    </p>
                    <p className="text-xs text-haven-text-secondary max-w-md mx-auto leading-relaxed pt-2">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Our royal concierge team at Bandra West has reserved your dining window for{' '}
                      <strong className="text-haven-gold">{formData.date} at {formData.time}</strong>.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        date: '',
                        time: '19:30',
                        guests: '2 Guests',
                        notes: '',
                      });
                    }}
                    className="px-8 py-3.5 rounded-full bg-haven-surface border border-haven-gold/40 text-haven-gold font-bold text-xs uppercase tracking-widest hover:bg-haven-gold/10 transition"
                  >
                    Make Another Booking
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
                  <div className="flex items-center justify-between border-b border-haven-border pb-4">
                    <h3 className="font-serif text-xl font-bold text-white">RESERVE A TABLE</h3>
                    <span className="text-[10px] text-haven-gold font-serif uppercase tracking-widest">
                      Live Allocation
                    </span>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      name="haven-contact-name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-haven-surface border border-haven-border/80 text-white focus:outline-none focus:border-haven-gold text-sm"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1 font-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        autoComplete="off"
                        name="haven-contact-email"
                        placeholder="guest@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-haven-surface border border-haven-border/80 text-white focus:outline-none focus:border-haven-gold text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1 font-semibold">
                        Mobile / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        autoComplete="off"
                        name="haven-contact-phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-haven-surface border border-haven-border/80 text-white font-mono focus:outline-none focus:border-haven-gold text-sm"
                      />
                    </div>
                  </div>

                  {/* Date, Time & Guests Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1 font-semibold">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        autoComplete="off"
                        name="haven-contact-date"
                        min={today}
                        max={maxDateStr}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-haven-surface border border-haven-border/80 text-white focus:outline-none focus:border-haven-gold text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1 font-semibold">
                        Time *
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-haven-surface border border-haven-border/80 text-white focus:outline-none focus:border-haven-gold text-sm"
                      >
                        {['12:30', '13:00', '13:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(
                          (t) => (
                            <option key={t} value={t} className="bg-haven-surface text-white">
                              {t} IST
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1 font-semibold">
                        Party Size *
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-haven-surface border border-haven-border/80 text-white focus:outline-none focus:border-haven-gold text-sm"
                      >
                        {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '6 Guests', '8+ VIP Guests'].map((g) => (
                          <option key={g} value={g} className="bg-haven-surface text-white">
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1 font-semibold">
                      Special Requests / Occasion
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Anniversary, dietary preferences, window table..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-haven-surface border border-haven-border/80 text-white placeholder:text-haven-text-muted focus:outline-none focus:border-haven-gold text-sm"
                    />
                  </div>

                  {/* Error Message Display */}
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-400 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold-md hover:opacity-90 transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Sending Confirmation...</span>
                      </div>
                    ) : (
                      <>
                        <span>CONFIRM RESERVATION & WHATSAPP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}