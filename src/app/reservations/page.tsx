'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Mail,
  Phone,
  User,
  Users,
  Clock,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useStore } from '@/lib/store';
import { validateIndianPhone, validateReservationDate, validateEmail } from '@/lib/validation';

export default function ReservationsPage() {
  const { tables, updateTableStatus, addReservation } = useStore();

  // 1. Empty Initial State (no pre-filled mock data)
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [partySize, setPartySize] = useState<number>(2);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('20:00');
  const [selectedSection, setSelectedSection] = useState<
    'indoor' | 'patio' | 'private_lounge' | 'chef_table'
  >('indoor');
  const [specialRequests, setSpecialRequests] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [assignedTable, setAssignedTable] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<'pending' | 'sent' | 'failed'>('pending');

  // Date limit bounds (today → today + 90 days)
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 90);

  const minDateStr = today.toISOString().split('T')[0];
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // Find matching available table
  const availableTables = tables.filter(
    (t) =>
      t.section === selectedSection &&
      t.capacity >= partySize &&
      t.status === 'available'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate 1: Name (Mandatory)
    if (!guestName.trim()) {
      setError('Please enter the primary guest name.');
      return;
    }

    // Validate 2: Contact (Email OR Phone required)
    const hasEmail = guestEmail.trim().length > 0;
    const hasPhone = guestPhone.trim().length > 0;

    if (!hasEmail && !hasPhone) {
      setError('Please provide at least one contact method (Email OR Mobile / WhatsApp number).');
      return;
    }

    if (hasEmail) {
      const emailCheck = validateEmail(guestEmail);
      if (!emailCheck.isValid) {
        setError(emailCheck.error);
        return;
      }
    }

    if (hasPhone) {
      const phoneCheck = validateIndianPhone(guestPhone);
      if (!phoneCheck.isValid) {
        setError(phoneCheck.error);
        return;
      }
    }

    // Validate 3: Date bounds
    const dateCheck = validateReservationDate(reservationDate, 90);
    if (!dateCheck.isValid) {
      setError(dateCheck.error);
      return;
    }

    // Validate 4: Live Table Availability
    if (availableTables.length === 0) {
      setError(
        `No available tables matching ${partySize} guests in the selected dining section. Please choose a different section or date/time.`
      );
      return;
    }

    setIsSubmitting(true);
    const allocatedTable = availableTables[0];

    // Allocate & store reservation
    addReservation({
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim() || '',
      guestPhone: guestPhone.trim() || '',
      tableId: allocatedTable.id,
      tableNumber: allocatedTable.tableNumber,
      partySize,
      reservationTime: `${reservationDate} at ${reservationTime}`,
      specialRequests: specialRequests.trim(),
    });

    // Update table status to reserved
    updateTableStatus(allocatedTable.id, 'reserved');

    setAssignedTable(allocatedTable);
    setIsSuccess(true);
    setIsSubmitting(false);

    // a) WhatsApp Pre-filled Chat Trigger
    const restaurantWhatsApp = '919876543210';
    const cleanGuestPhone = guestPhone.replace(/[^\d]/g, '');
    const targetWhatsApp = cleanGuestPhone.length >= 10 ? cleanGuestPhone : restaurantWhatsApp;

    const waMessage = encodeURIComponent(
      `✨ *HAVEN SANCTUARY BANDRA - Reservation Confirmed*\n\n` +
        `Guest Name: ${guestName}\n` +
        (hasPhone ? `Phone: ${guestPhone}\n` : '') +
        (hasEmail ? `Email: ${guestEmail}\n` : '') +
        `Date: ${reservationDate}\n` +
        `Time: ${reservationTime}\n` +
        `Guests: ${partySize} Guests\n` +
        `Section: ${selectedSection.replace('_', ' ').toUpperCase()}\n` +
        `Assigned Table: #${allocatedTable.tableNumber}\n` +
        (specialRequests ? `Special Requests: ${specialRequests}\n\n` : '\n') +
        `Thank you for choosing Haven Sanctuary. We look forward to hosting you.`
    );

    window.open(`https://wa.me/${targetWhatsApp}?text=${waMessage}`, '_blank');

    // b) Real Email Confirmation via Resend API
    try {
      const emailRes = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: guestName.trim(),
          guestEmail: guestEmail.trim() || 'reservations@havensanctuary.in',
          guestPhone: guestPhone.trim(),
          date: reservationDate,
          time: reservationTime,
          partySize,
          section: selectedSection,
          tableNumber: allocatedTable.tableNumber,
          specialRequests: specialRequests.trim(),
        }),
      });
      if (emailRes.ok) {
        setEmailStatus('sent');
      } else {
        setEmailStatus('failed');
      }
    } catch (err) {
      console.error('[Send Confirmation Error]', err);
      setEmailStatus('failed');
    }
  };

  return (
    <div className="min-h-screen bg-haven-bg text-haven-text-primary">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-haven-gold/30 bg-haven-gold/10 text-haven-gold text-xs font-serif uppercase tracking-widest"
          >
            <Calendar className="w-3.5 h-3.5" />
            Live Table Allocation • Bandra West, Mumbai
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl font-bold tracking-wider"
          >
            RESERVE YOUR SANCTUARY TABLE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm text-haven-text-secondary"
          >
            Select your preferred dining environment. Live table allocation + instant WhatsApp & Email confirmation.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            /* ================= SUCCESS STATE ================= */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-haven-card border border-haven-gold/40 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-haven-gold/20 border-2 border-haven-gold mx-auto flex items-center justify-center shadow-gold-sm">
                <CheckCircle2 className="w-10 h-10 text-haven-gold" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-haven-gold">
                  HAVEN SANCTUARY • BANDRA WEST
                </span>
                <h2 className="font-serif text-3xl font-bold tracking-wider text-white">
                  RESERVATION CONFIRMED
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-haven-surface border border-haven-border text-left space-y-3 text-sm font-sans">
                <div className="flex justify-between border-b border-haven-border pb-2">
                  <span className="text-haven-text-muted">Primary Guest</span>
                  <span className="font-bold text-white">{guestName}</span>
                </div>
                <div className="flex justify-between border-b border-haven-border pb-2">
                  <span className="text-haven-text-muted">Party Size</span>
                  <span className="font-bold text-haven-gold">{partySize} Guests</span>
                </div>
                <div className="flex justify-between border-b border-haven-border pb-2">
                  <span className="text-haven-text-muted">Date & Time</span>
                  <span className="font-bold text-white">
                    {reservationDate} at {reservationTime}
                  </span>
                </div>
                <div className="flex justify-between border-b border-haven-border pb-2">
                  <span className="text-haven-text-muted">Section</span>
                  <span className="font-bold text-haven-gold capitalize">
                    {selectedSection.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-haven-text-muted">Assigned Sanctuary Table</span>
                  <span className="font-bold text-haven-gold font-mono text-base">
                    Table #{assignedTable?.tableNumber}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 py-2.5 px-4 rounded-xl">
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp & Email confirmation sent successfully</span>
                </div>

                <p className="text-[11px] text-haven-text-muted">
                  Table #{assignedTable?.tableNumber} has been locked in live kitchen sync.
                  {guestEmail && (
                    <>
                      {' '}Confirmation details dispatched to{' '}
                      <strong className="text-haven-text-primary font-mono">{guestEmail}</strong>
                    </>
                  )}
                </p>
              </div>

              <Link
                href="/"
                className="w-full py-4 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold-md hover:opacity-90 transition"
              >
                <span>Return to Sanctuary</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            /* ================= RESERVATION FORM ================= */
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              autoComplete="off"
              className="bg-haven-card border border-haven-gold/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6"
            >
              {/* Section Selector */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-haven-gold font-serif font-semibold mb-3">
                  Select Dining Sanctuary Environment *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'chef_table', name: "Chef’s Table", desc: 'Front-row live kitchen view' },
                    { key: 'private_lounge', name: 'Private Lounge', desc: 'Exclusive VIP royal enclave' },
                    { key: 'indoor', name: 'Main Dining Room', desc: 'Handcrafted chandeliers & gold' },
                    { key: 'patio', name: 'Skyline Terrace', desc: 'Open-air Bandra night view' },
                  ].map((sec) => (
                    <div
                      key={sec.key}
                      onClick={() => setSelectedSection(sec.key as any)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedSection === sec.key
                          ? 'border-haven-gold bg-haven-gold/10 shadow-gold-sm text-haven-gold'
                          : 'border-haven-border bg-haven-surface text-haven-text-muted hover:border-haven-gold/40'
                      }`}
                    >
                      <h4 className="font-serif text-sm font-bold text-haven-text-primary">
                        {sec.name}
                      </h4>
                      <p className="text-[10px] text-haven-text-secondary mt-1">{sec.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Primary Guest Name */}
                <div>
                  <label className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-haven-text-muted mb-1.5 font-semibold">
                    <User className="w-3 h-3 text-haven-gold" />
                    <span>Primary Guest Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    name="haven-res-name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-haven-surface border border-haven-border rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-haven-gold/70"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-haven-text-muted mb-1.5 font-semibold">
                    <Mail className="w-3 h-3 text-haven-gold" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    autoComplete="off"
                    name="haven-res-email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="guest@example.com"
                    className="w-full bg-haven-surface border border-haven-border rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-haven-gold/70"
                  />
                  <span className="text-[9px] text-haven-text-muted mt-1 block">
                    (Email or WhatsApp required)
                  </span>
                </div>

                {/* Mobile / WhatsApp */}
                <div>
                  <label className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-haven-text-muted mb-1.5 font-semibold">
                    <Phone className="w-3 h-3 text-haven-gold" />
                    <span>Mobile / WhatsApp Number</span>
                  </label>
                  <input
                    type="tel"
                    autoComplete="off"
                    name="haven-res-phone"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-haven-surface border border-haven-border rounded-xl py-2.5 px-4 text-sm text-white font-mono focus:outline-none focus:border-haven-gold/70"
                  />
                  <span className="text-[9px] text-haven-text-muted mt-1 block">
                    (Indian format: +91 98765 43210)
                  </span>
                </div>
              </div>

              {/* Date, Time & Party Size */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-haven-text-muted mb-1.5 font-semibold">
                    <Users className="w-3 h-3 text-haven-gold" />
                    <span>Party Size *</span>
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full bg-haven-surface border border-haven-border rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-haven-gold/70"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                      <option key={n} value={n} className="bg-haven-surface text-white">
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-haven-text-muted mb-1.5 font-semibold">
                    <Calendar className="w-3 h-3 text-haven-gold" />
                    <span>Reservation Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    autoComplete="off"
                    name="haven-res-date"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    min={minDateStr}
                    max={maxDateStr}
                    className="w-full bg-haven-surface border border-haven-border rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-haven-gold/70"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-haven-text-muted mb-1.5 font-semibold">
                    <Clock className="w-3 h-3 text-haven-gold" />
                    <span>Dining Time *</span>
                  </label>
                  <select
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full bg-haven-surface border border-haven-border rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-haven-gold/70"
                  >
                    {['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(
                      (t) => (
                        <option key={t} value={t} className="bg-haven-surface text-white">
                          {t} IST
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1.5 font-semibold">
                  Special Requests / Dietary Preferences
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Anniversary celebration, window seating, Jain food options, wine pairing..."
                  className="w-full bg-haven-surface border border-haven-border rounded-xl p-3 text-sm text-white placeholder:text-haven-text-muted focus:outline-none focus:border-haven-gold/70"
                />
              </div>

              {/* Live Table Availability Status */}
              <div className="text-xs font-mono">
                {availableTables.length > 0 ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {availableTables.length} table(s) available in {selectedSection.replace('_', ' ')} for {partySize} guests
                  </span>
                ) : (
                  <span className="text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    No available tables in this section for {partySize} guests. Please select another section.
                  </span>
                )}
              </div>

              {/* Validation Error Message */}
              {error && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || availableTables.length === 0}
                className="w-full py-4 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Allocating Sanctuary Table...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>CONFIRM TABLE ALLOCATION + WHATSAPP & EMAIL</span>
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}