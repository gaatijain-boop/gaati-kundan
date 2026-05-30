/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C6973F',
          light: '#E2C27D',
          dark: '#A67C2E',
          50:  '#FDF8EE',
          100: '#F8EDCF',
          200: '#F0D99F',
          300: '#E5C06A',
          400: '#C6973F',
          500: '#A67C2E',
          600: '#856220',
          700: '#634815',
        },
        charcoal: {
          DEFAULT: '#1C1C1E',
          light:   '#2C2C2E',
          soft:    '#3A3A3C',
          muted:   '#48484A',
        },
        luxury: {
          black:       '#111111',
          white:       '#FFFFFF',
          'off-white': '#FAFAFA',
          gray:        '#6E6E73',
          'light-gray':'#E5E5EA',
          'soft-bg':   '#F5F5F7',
          blush:       '#FDF0F3',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-in-out',
        'slide-up':   'slideUp 0.6s ease-out',
        'shimmer':    'shimmer 2s linear infinite',
        'float':      'float 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:   { '0%': { opacity: '0' },                              '100%': { opacity: '1' } },
        slideUp:  { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' },              '100%': { backgroundPosition: '200% 0' } },
        float:    { '0%, 100%': { transform: 'translateY(0)' },           '50%':  { transform: 'translateY(-10px)' } },
        pulseGold:{ '0%, 100%': { boxShadow: '0 0 0 0 rgba(198,151,63,.4)' }, '50%': { boxShadow: '0 0 0 10px rgba(198,151,63,0)' } },
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #C6973F 0%, #E2C27D 50%, #C6973F 100%)',
        'charcoal-gradient':'linear-gradient(135deg, #111111 0%, #2C2C2E 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, #f5f5f7 25%, #e5e5ea 50%, #f5f5f7 75%)',
      },
      boxShadow: {
        'gold':      '0 4px 20px rgba(198,151,63,.28)',
        'gold-lg':   '0 8px 40px rgba(198,151,63,.38)',
        'luxury':    '0 20px 60px rgba(0,0,0,.14)',
        'card':      '0 2px 16px rgba(0,0,0,.06)',
        'card-hover':'0 10px 40px rgba(0,0,0,.12)',
      },
      letterSpacing: {
        luxury: '0.15em',
        ultra:  '0.3em',
      },
    },
  },
  plugins: [],
};
