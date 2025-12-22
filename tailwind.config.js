/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./dist/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: { 
          50: '#f0f9ff', 
          100: '#e0f2fe', 
          500: '#0ea5e9', 
          600: '#0284c7', 
          700: '#0369a1' 
        },
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(14, 165, 233, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'zoom-in': 'zoomIn 0.2s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'enter': 'enter 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: { 
          '0%': { opacity: '0' }, 
          '100%': { opacity: '1' } 
        },
        zoomIn: { 
          '0%': { opacity: '0', transform: 'scale(0.95)' }, 
          '100%': { opacity: '1', transform: 'scale(1)' } 
        },
        slideUp: { 
          '0%': { opacity: '0', transform: 'translateY(20px)' }, 
          '100%': { opacity: '1', transform: 'translateY(0)' } 
        },
        enter: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [],
}
