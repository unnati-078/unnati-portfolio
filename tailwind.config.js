/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['var(--font-dm-serif)', 'serif'],
        'sans': ['var(--font-plus-jakarta)', 'ui-sans-serif', 'system-ui'],
        'elegant': ['var(--font-dm-serif)', 'serif'],
        'modern': ['var(--font-plus-jakarta)', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a'
        },
        accent: {
          DEFAULT: '#ddb892',
          gold: '#ddb892',
          amber: '#ddb892'
        },
        text: {
          primary: '#f8f8f2',
          secondary: '#e5e7eb',
          muted: '#9ca3af'
        },
        surface: {
          DEFAULT: '#1f1f1f',
          light: '#2a2a2a',
          dark: '#0f0f0f'
        },
        border: {
          DEFAULT: '#374151',
          light: '#4b5563'
        }
      },
      boxShadow: {
        'soft': '0 10px 40px rgba(0,0,0,0.2)',
        'elegant': '0 20px 60px rgba(0,0,0,0.3)',
        'glow': '0 0 20px rgba(221, 184, 146, 0.1)'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(249, 210, 157, 0.1)' },
          '100%': { boxShadow: '0 0 30px rgba(249, 210, 157, 0.2)' }
        }
      }
    },
  },
  plugins: [],
}
