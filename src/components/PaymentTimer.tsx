'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, AlertTriangle } from 'lucide-react';
import { useStore } from '@/lib/store';

export const PaymentTimer: React.FC = () => {
  const router = useRouter();
  const { paymentTimerSeconds, isPaymentTimerActive, cancelPaymentTimer } = useStore();

  const minutes = Math.floor(paymentTimerSeconds / 60);
  const seconds = paymentTimerSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLowTime = paymentTimerSeconds <= 60;

  // Handle expiration redirect
  useEffect(() => {
    if (isPaymentTimerActive && paymentTimerSeconds === 0) {
      alert('Payment session expired. Please try again.');
      cancelPaymentTimer();
      router.push('/menu');
    }
  }, [paymentTimerSeconds, isPaymentTimerActive, cancelPaymentTimer, router]);

  if (!isPaymentTimerActive) return null;

  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-300 ${
      isLowTime
        ? 'border-red-500/80 bg-red-950/40 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse'
        : 'border-haven-gold/40 bg-haven-card/80 text-haven-gold shadow-gold-sm backdrop-blur-md'
    }`}>
      {isLowTime ? (
        <AlertTriangle className="w-4 h-4 text-red-400 animate-bounce" />
      ) : (
        <Clock className="w-4 h-4 text-haven-gold" />
      )}
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-haven-text-muted font-sans font-semibold">
          Complete Payment In
        </span>
        <span className="font-mono text-base font-bold tracking-wider leading-none">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};
