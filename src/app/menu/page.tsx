'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { DigitalMenu } from '@/components/DigitalMenu';
import { CartDrawer } from '@/components/CartDrawer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';

export default function MenuPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-haven-bg text-haven-text-primary">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      <main className="pt-16">
        <DigitalMenu />
      </main>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AIAssistantWidget />
    </div>
  );
}
