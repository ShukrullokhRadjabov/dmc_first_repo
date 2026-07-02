/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0A',
          darker: '#121212',
          dark: '#161616',
          surface: '#1A1A1A',
          card: '#1A1A1A',
          border: '#262626',
          muted: '#333333',
          green: '#10B981',
          'green-dim': '#059669',
          'green-dark': '#047857',
          text: '#F5F5F5',
          'text-muted': '#A3A3A3',
          'text-dim': '#6B6B6B',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(16,185,129,0.3)' },
          '50%': { boxShadow: '0 0 0 8px rgba(16,185,129,0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'green-sm': '0 2px 8px rgba(16,185,129,0.08)',
        'green-md': '0 4px 12px rgba(16,185,129,0.08)',
        'green-lg': '0 8px 24px rgba(16,185,129,0.1)',
        'card': '0 4px 12px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
