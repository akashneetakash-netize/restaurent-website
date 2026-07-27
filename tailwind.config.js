/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        haven: {
          bg: '#0A0A0A',
          card: '#111111',
          surface: '#181818',
          border: '#262626',
          gold: {
            DEFAULT: '#C9A227',
            light: '#E8D5A3',
            dark: '#8C6F19',
            metallic: '#D4AF37',
            glow: 'rgba(201, 162, 39, 0.25)',
          },
          text: {
            primary: '#F5F0E8',
            secondary: '#A39E93',
            muted: '#6B665C',
          },
          accent: {
            red: '#E53E3E',
            green: '#38A169',
            amber: '#D69E2E',
          }
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(201, 162, 39, 0.15)',
        'gold-md': '0 4px 20px rgba(201, 162, 39, 0.25)',
        'gold-lg': '0 8px 32px rgba(201, 162, 39, 0.35)',
        'gold-glow': '0 0 40px rgba(201, 162, 39, 0.2)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E8D5A3 0%, #C9A227 50%, #8C6F19 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(232, 213, 163, 0.3), transparent)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
      },
    },
  },
  plugins: [],
};
