export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        },
        // Dark theme colors
        dark: {
          bg: '#222222',
          'bg-secondary': '#1c1c1c',
          'bg-card': '#2b2b2b',
          'bg-input': '#333333',
          text: '#eeeeee',
          'text-secondary': '#aaaaaa',
          'text-muted': '#888888',
          border: '#444444',
          'border-light': '#555555',
          accent: '#2e6096',
          'accent-hover': '#2a5489',
          success: '#4caf50',
          warning: '#ff9800',
          danger: '#e53935',
          info: '#2196f3'
        }
      },
      animation: {
        'ticker-scroll': 'ticker-scroll 30s infinite linear',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-300%)' }
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        bounceIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3)'
          },
          '50%': {
            transform: 'scale(1.05)'
          },
          '70%': {
            transform: 'scale(0.9)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)'
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)'
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)'
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)'
          }
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
