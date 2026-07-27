<div align="center">

# 🍽️ Haven Sanctuary

### *A Luxury Indian Restaurant Experience — Powered by AI*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![SendGrid](https://img.shields.io/badge/SendGrid-Email-blue?logo=sendgrid)](https://sendgrid.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com/)

> **Haven Sanctuary** is a full-stack, production-ready luxury restaurant website built for Bandra West, Mumbai. It combines immersive storytelling animations, an AI concierge powered by Groq, real-time kitchen management, OTP email authentication via SendGrid, and a complete payment flow — all wrapped in a premium dark-gold aesthetic.

</div>

---

## ✨ Features

### 🏠 Immersive Homepage
- **Cinematic Hero Section** with animated parallax and a gold-gradient "Reserve Table" CTA that smooth-scrolls to the reservation form
- **Storytelling Scroll Canvas** — frame-by-frame canvas animation triggered by scroll position to reveal the restaurant's story
- **After Drinks Storyteller Canvas** — a second sequential canvas animation for the evening experience
- **Favorites Showcase** — horizontally scrollable signature dish cards with hover animations
- **House of Drinks Section** — curated cocktail and beverage showcase with signature gold card design
- **Night Experience Section** — immersive dusk-to-night atmosphere reveal
- **The Space Gallery** — full-width photo gallery with lightbox-style reveal
- **Contact & Reservation Section** — full reservation form with date/time validation, WhatsApp pre-fill link, and SendGrid email confirmation

### 🤖 AI Sommelier (Groq-Powered)
- Floating AI chat widget powered by **Groq LLaMA** via a secure backend API
- Context-aware responses: live menu items, table status, and order data are injected into every prompt
- **Role-based quick prompts**:
  - **Customer** → wine pairings, chef signatures, vegetarian options, table booking
  - **Staff / Kitchen** → pending orders, table overview, sold-out marking
  - **Manager** → daily performance, inventory warnings, peak hour prediction
- Animated chat drawer with message timestamps and AI/user avatars

### 🔐 Authentication (Email OTP via SendGrid + Redis)
- User signs up → 6-digit OTP generated and sent to their **email via SendGrid**
- OTP stored in **Upstash Redis** with a **10-minute TTL**
- **Rate limiting**: max 5 OTP requests per email per hour
- OTP is verified server-side and deleted immediately after use (one-time use)
- Clean 6-digit input boxes with auto-focus progression
- **Google OAuth** quick sign-in option
- Role-based access: `customer`, `staff`, `admin`

### 📋 Digital Menu
- Full menu with categories: Starters, Mains, Breads, Beverages, Desserts
- Add-to-cart with quantity controls
- Signature dish badges, calorie counts, prep time indicators
- Responsive grid layout with hover micro-animations

### 🛒 Cart & Checkout
- Slide-out Cart Drawer with live total calculation
- Dedicated `/checkout` page
- Seamless transition to payment modal

### 💳 Payment Flow (HavenPaymentModal)
- Multi-step payment modal supporting:
  - **Credit/Debit Card** — with 3D flip animation on focus, real-time card number formatting, Luhn validation, expiry/CVV checks
  - **UPI** — QR code display + UPI ID input
  - **Wallets** — PhonePe, Google Pay, Paytm
- **Payment Timer** — 10-minute countdown with visual urgency indicator
- On success:
  - Sends **payment receipt email via SendGrid** to the guest
  - Opens a **WhatsApp pre-filled message** to the restaurant with transaction details
  - Creates a live order in the kitchen system
  - Displays animated success screen with transaction reference

### 🍳 Kitchen & Operations (Staff Dashboard)
- **KDS Kanban Board** — drag-free order pipeline: Pending → Preparing → Ready → Served
- **Live Order Tracker** — real-time order status feed visible to customers at `/`
- **Table Map Grid** — interactive floor plan showing occupied/available/reserved tables
- **Waitlist Queue** — manage walk-in guest queue with estimated wait times
- **Staff Dashboard** at `/dashboard` — role-gated for `staff` and `admin` roles

### 📧 Email Notifications (SendGrid)
| Trigger | Recipient | Content |
|---|---|---|
| OTP Request | Guest | 6-digit verification code |
| Reservation Confirmed | Guest + Restaurant | Booking details, table number, date/time |
| Payment Confirmed | Guest | Transaction ID, amount, itemised summary |

### 📱 WhatsApp Integration
- Reservation confirmation → pre-filled WhatsApp message to guest's number (or restaurant fallback)
- Payment confirmation → pre-filled WhatsApp message to restaurant number
- Uses `wa.me` deep-link format — no API keys required

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS + custom design tokens |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **AI** | Groq API (LLaMA 3) |
| **Email** | SendGrid (`@sendgrid/mail`) |
| **OTP Store** | Upstash Redis (`@upstash/redis`) |
| **Auth** | NextAuth.js v4 |
| **State** | Zustand (via custom store context) |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage (all sections assembled)
│   ├── layout.tsx                  # Root layout with fonts & metadata
│   ├── globals.css                 # Global styles & design tokens
│   ├── menu/page.tsx               # Digital menu page
│   ├── reservations/page.tsx       # Reservations page
│   ├── checkout/page.tsx           # Checkout page
│   ├── dashboard/page.tsx          # Staff/Admin dashboard
│   └── api/
│       ├── ai/chat/route.ts        # Groq AI chat endpoint
│       ├── auth/send-otp/route.ts  # OTP generation + SendGrid email
│       ├── auth/verify-otp/route.ts # OTP verification + Redis delete
│       ├── send-confirmation/route.ts      # Reservation email
│       └── send-payment-confirmation/route.ts # Payment receipt email
├── components/
│   ├── Navbar.tsx                  # Responsive navbar with role badges
│   ├── AuthModal.tsx               # Email OTP auth modal
│   ├── AIAssistantWidget.tsx       # Floating AI Sommelier chat
│   ├── DigitalMenu.tsx             # Full menu with cart controls
│   ├── HavenPaymentModal.tsx       # Multi-method payment modal
│   ├── ContactReservationSection.tsx # Reservation form + WhatsApp
│   ├── CartDrawer.tsx              # Slide-out shopping cart
│   ├── KDSKanban.tsx               # Kitchen Display System
│   ├── LiveOrderTracker.tsx        # Real-time order status
│   ├── TableMapGrid.tsx            # Restaurant floor plan
│   ├── WaitlistQueue.tsx           # Walk-in queue management
│   ├── StorytellingScrollCanvas.tsx # Scroll-triggered canvas animation
│   ├── AfterDrinksStorytellerCanvas.tsx # Evening story animation
│   ├── FavoritesShowcaseSection.tsx # Signature dishes showcase
│   ├── HouseOfDrinksSection.tsx    # Cocktail & drinks section
│   ├── TheSpaceGallery.tsx         # Photo gallery
│   ├── Card3D.tsx                  # 3D tilt card component
│   ├── PaymentTimer.tsx            # Payment countdown timer
│   └── ...
└── lib/
    ├── store.tsx                   # Global state (Zustand)
    ├── redis.ts                    # Upstash Redis client
    ├── auth.ts                     # NextAuth configuration
    ├── emailValidation.ts          # Email format validator
    ├── cardValidation.ts           # Luhn card number validator
    ├── format.ts                   # Price & date formatters
    └── validation.ts               # General form validators
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Accounts at: [Groq](https://console.groq.com), [Upstash](https://upstash.com), [SendGrid](https://sendgrid.com)

### 1. Clone the repository

```bash
git clone https://github.com/akashneetakash-netize/restaurent-website.git
cd restaurent-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
# Auth
NEXTAUTH_SECRET=your_long_random_secret
NEXTAUTH_URL=http://localhost:3000

# AI (Groq)
GROQ_API_KEY=gsk_your_groq_api_key

# Upstash Redis (OTP storage)
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# SendGrid (Email)
SENDGRID_API_KEY=SG.your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
RESTAURANT_EMAIL=restaurant@yourdomain.com

# WhatsApp (public)
NEXT_PUBLIC_RESTAURANT_WHATSAPP=919876543210
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Import Project** → select your repo
3. Add all environment variables from `.env.example` in the Vercel dashboard under **Settings → Environment Variables**
4. Update `NEXTAUTH_URL` to your Vercel deployment URL (e.g. `https://haven-sanctuary.vercel.app`)
5. Click **Deploy** ✅

> [!IMPORTANT]
> After deploying, update `NEXTAUTH_URL` to your actual Vercel URL, otherwise auth redirects will fail.

---

## 🔑 API Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/send-otp` | Generates & emails 6-digit OTP (rate limited: 5/hr) |
| `POST` | `/api/auth/verify-otp` | Verifies OTP and deletes from Redis |
| `POST` | `/api/send-confirmation` | Sends reservation confirmation email |
| `POST` | `/api/send-payment-confirmation` | Sends payment receipt email |
| `POST` | `/api/ai/chat` | Streams AI Sommelier response from Groq |

---

## 🎨 Design System

The project uses a custom Tailwind design system with premium tokens:

| Token | Value | Usage |
|---|---|---|
| `haven-bg` | `#0D0C14` | Page background |
| `haven-card` | `#16141F` | Card surfaces |
| `haven-surface` | `#1E1C29` | Input backgrounds |
| `haven-gold` | `#C9A034` | Primary accent, CTAs |
| `haven-text-primary` | `#F5F0E8` | Headings |
| `haven-text-secondary` | `#B8AFA0` | Body text |
| `bg-gold-gradient` | `linear-gradient(...)` | Buttons, highlights |

---

## 📸 Pages Overview

| Route | Description |
|---|---|
| `/` | Full homepage — hero, storytelling, menu preview, gallery, reservations |
| `/menu` | Complete digital menu with cart |
| `/reservations` | Dedicated reservation page |
| `/checkout` | Checkout with payment modal |
| `/dashboard` | Staff/Admin operations dashboard (role-gated) |

---

## 🛡️ Security

- `.env.local` is **gitignored** — secrets are never committed
- OTPs are stored in Redis with a 10-minute expiry and deleted on first use
- Rate limiting prevents OTP spam (max 5 requests per email per hour)
- All API routes are server-side only — no secrets exposed to the browser

---

## 📄 License

This project was built for **Vibeathon 2026** — a luxury restaurant hackathon experience.

---

<div align="center">

Built with ❤️ for **Haven Sanctuary, Bandra West, Mumbai**

*"Where every meal is a memory."*

</div>
