'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, Sparkles, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, KeyRound } from 'lucide-react';
import { validateEmail } from '@/lib/emailValidation';
import { useStore, UserRole } from '@/lib/store';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { setCurrentUser, addNotification } = useStore();
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Email Validation State
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState(false);

  // Resend Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mode === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [mode, resendTimer]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (val.trim()) {
      const res = validateEmail(val);
      setEmailError(res.error);
    } else {
      setEmailError(null);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleGenerateOtp = async () => {
    setIsSending(true);
    setOtpError(null);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEmailError(data.error || 'Failed to send OTP');
      } else {
        setResendTimer(30);
        setCanResend(false);
        addNotification('OTP Verification Email Sent', `Verification code sent to ${email}`, 'system');
        setMode('otp');
      }
    } catch (err) {
      setEmailError('Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setEmailError(emailCheck.error);
      return;
    }

    if (mode === 'signup') {
      await handleGenerateOtp();
      return;
    }

    if (mode === 'otp') {
      setIsVerifying(true);
      setOtpError(null);
      const code = otp.join('');

      try {
        const res = await fetch('/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: code }),
        });

        const data = await res.json();
        
        if (!res.ok) {
          setOtpError(data.error || 'Invalid OTP');
          setIsVerifying(false);
          return;
        }

        // Successfully authenticate
        const newUser = {
          id: `usr-${Date.now()}`,
          email: email.trim(),
          name: fullName || email.split('@')[0],
          role: role,
          loyaltyPoints: role === 'customer' ? 500 : 0,
        };

        setCurrentUser(newUser);
        setAuthSuccess(true);
        addNotification('Welcome to Haven Sanctuary', `Authenticated as ${newUser.name} (${newUser.role})`, 'system');

        setTimeout(() => {
          setAuthSuccess(false);
          onClose();
        }, 1200);
      } catch (err) {
        setOtpError('Failed to verify OTP. Try again.');
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handleGoogleOAuth = () => {
    // Simulate a clean Google OAuth — only name + email from Google profile
    // Do NOT pre-fill any reservation or payment forms
    const googleUser = {
      id: `usr-google-${Date.now()}`,
      email: 'guest@gmail.com',
      name: fullName.trim() || 'Google Guest',
      role: 'customer' as UserRole,
      loyaltyPoints: 500,
    };
    setCurrentUser(googleUser);
    setAuthSuccess(true);
    addNotification(
      'Signed in with Google',
      `Welcome, ${googleUser.name}. Your session is ready.`,
      'system'
    );
    setTimeout(() => {
      setAuthSuccess(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-haven-card border border-haven-gold/30 rounded-2xl p-6 sm:p-8 shadow-gold-lg overflow-hidden"
        >
          {/* Top Gold Shimmer Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-haven-text-muted hover:text-haven-gold transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 text-haven-gold font-serif text-2xl font-bold tracking-wider mb-1">
              <Sparkles className="w-5 h-5 text-haven-gold" />
              HAVEN SANCTUARY
            </div>
            <p className="font-sans text-xs text-haven-text-secondary uppercase tracking-widest">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Guest Account' : 'Verify Email OTP'}
            </p>
          </div>

          {authSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center flex flex-col items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-14 h-14 text-haven-gold animate-bounce" />
              <h3 className="font-serif text-xl text-haven-text-primary font-bold">Authentication Successful</h3>
              <p className="text-xs text-haven-text-secondary">Welcome to Haven Restaurant & Lounge</p>
            </motion.div>
          ) : (
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1.5 font-semibold">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-haven-gold/60" />
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      name="haven-fullname"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-haven-surface border border-haven-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-haven-text-primary placeholder:text-haven-text-muted focus:outline-none focus:border-haven-gold/70"
                    />
                  </div>
                </div>
              )}

              {mode !== 'otp' && (
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1.5 font-semibold">
                    Email Address <span className="text-haven-gold">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-haven-gold/60" />
                    <input
                      type="email"
                      required
                      autoComplete="off"
                      name="haven-email"
                      placeholder="user@example.com"
                      value={email}
                      onChange={handleEmailChange}
                      className={`w-full bg-haven-surface border rounded-xl py-2.5 pl-10 pr-4 text-sm text-haven-text-primary placeholder:text-haven-text-muted focus:outline-none transition ${
                        emailError
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-haven-border focus:border-haven-gold/70'
                      }`}
                    />
                  </div>
                  {emailError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 mt-1.5 text-red-400 text-xs"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{emailError}</span>
                    </motion.div>
                  )}
                </div>
              )}

              {mode !== 'otp' && (
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1.5 font-semibold">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-haven-gold/60" />
                    <input
                      type="password"
                      required
                      autoComplete="new-password"
                      name="haven-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-haven-surface border border-haven-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-haven-text-primary placeholder:text-haven-text-muted focus:outline-none focus:border-haven-gold/70"
                    />
                  </div>
                </div>
              )}

              {/* Role Selection */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-haven-text-muted mb-1.5 font-semibold">
                    Account Role
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['customer', 'staff', 'admin'] as UserRole[]).map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setRole(r)}
                        className={`py-2 text-xs rounded-lg border font-medium capitalize transition ${
                          role === r
                            ? 'border-haven-gold bg-haven-gold/10 text-haven-gold shadow-gold-sm'
                            : 'border-haven-border bg-haven-surface text-haven-text-muted hover:text-haven-text-primary'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* OTP VERIFICATION STEP WITH INSTANT CODE DISPLAY & AUTO-FILL */}
              {mode === 'otp' && (
                <div className="space-y-4">
                  {/* PROFESSIONAL OTP NOTIFICATION BANNER */}
                  <div className="bg-haven-surface border border-haven-gold/20 rounded-xl p-4 text-center space-y-2">
                    <div className="flex items-center justify-center gap-1.5 text-haven-gold text-xs font-semibold">
                      <KeyRound className="w-4 h-4" />
                      <span>WhatsApp Verification</span>
                    </div>
                    <p className="text-xs text-haven-text-secondary leading-relaxed">
                      OTP has been sent to your WhatsApp number.
                    </p>
                  </div>

                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-14 text-center bg-haven-surface border border-haven-border rounded-xl text-xl text-haven-text-primary placeholder:text-haven-text-muted focus:outline-none focus:border-haven-gold/70 transition font-mono"
                      />
                    ))}
                  </div>

                  {otpError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 mt-2 text-red-400 text-xs justify-center"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{otpError}</span>
                    </motion.div>
                  )}

                  {/* Resend Action */}
                  <div className="flex items-center justify-end text-xs pt-1">
                    <button
                      type="button"
                      disabled={!canResend}
                      onClick={handleGenerateOtp}
                      className="text-haven-text-muted hover:text-haven-gold transition disabled:opacity-50 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>{canResend ? 'Resend OTP' : `Resend (${resendTimer}s)`}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending || isVerifying || Boolean(emailError)}
                className="w-full py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-sm tracking-wider uppercase transition shadow-gold-sm hover:opacity-90 flex items-center justify-center gap-2 mt-6"
              >
                <span>
                  {mode === 'login'
                    ? 'Log In'
                    : mode === 'signup'
                    ? (isSending ? 'Sending OTP...' : 'Continue')
                    : (isVerifying ? 'Verifying...' : 'Verify OTP')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Google OAuth Button */}
              {mode !== 'otp' && (
                <button
                  type="button"
                  onClick={handleGoogleOAuth}
                  className="w-full py-2.5 rounded-xl border border-haven-border bg-haven-surface hover:border-haven-gold/50 text-haven-text-primary text-xs font-medium tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              )}

              {/* Toggle mode */}
              <div className="text-center pt-2">
                {mode === 'login' ? (
                  <p className="text-xs text-haven-text-muted">
                    New guest?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-haven-gold font-semibold underline"
                    >
                      Create Account
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-haven-text-muted">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-haven-gold font-semibold underline"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
