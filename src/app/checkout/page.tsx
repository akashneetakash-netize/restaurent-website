'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { HavenPaymentModal } from '@/components/HavenPaymentModal';

export default function CheckoutPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-haven-bg text-haven-text-primary selection:bg-haven-gold selection:text-black">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      <main className="pt-28 pb-16 px-4 flex items-center justify-center">
        <HavenPaymentModal
          isOpen={true}
          onClose={() => {
            window.location.href = '/';
          }}
          amount={240.00}
        />
      </main>
    </div>
  );
}
