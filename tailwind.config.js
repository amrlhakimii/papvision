/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // #14B8A6 — Primary teal (cervical screening awareness color)
        brand: {
          50:  '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // #3FC1C9 — Teal accent
        accent: {
          50:  '#e8f9fa',
          100: '#c3eff2',
          200: '#87dfe5',
          300: '#4bcfd8',
          400: '#3FC1C9',
          500: '#2fa5ac',
          600: '#228990',
          700: '#166c73',
          800: '#0a5056',
          900: '#033439',
        },
        // #FC5185 — Pink highlight (CTAs, challenge, alerts)
        highlight: {
          50:  '#fff0f5',
          100: '#ffd6e6',
          200: '#ffadcd',
          300: '#ff84b4',
          400: '#fc5b94',
          500: '#FC5185',
          600: '#e03570',
          700: '#bd1a5b',
          800: '#9a0046',
          900: '#780031',
        },
        // #F5F5F5 — Surface / background
        surface: {
          50:  '#F5F5F5',
          100: '#ebebeb',
          200: '#e0e0e0',
          800: '#2a2a2a',
          900: '#1a1a1a',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':  'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
