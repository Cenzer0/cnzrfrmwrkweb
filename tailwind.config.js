/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./views/**/*.{html,ejs}",
    "./public/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        // Retro pixel art palette
        pixel: {
          bg: '#1a1c2c',
          dark: '#0f0f1e',
          purple: '#5d275d',
          pink: '#b13e53',
          orange: '#ef7d57',
          yellow: '#ffcd75',
          lime: '#a7f070',
          green: '#38b764',
          blue: '#257179',
          cyan: '#29adff',
          white: '#f4f4f4',
          gray: '#566c86',
        },
        anime: {
          primary: '#ff6b9d',
          secondary: '#c06c84',
          accent: '#f67280',
          dark: '#355c7d',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'pixel-float': 'pixelFloat 2s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        pixelFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-2px, 2px)' },
          '66%': { transform: 'translate(2px, -2px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0,0,0,0.8)',
        'pixel-hover': '6px 6px 0px 0px rgba(0,0,0,0.8)',
        'neon': '0 0 10px currentColor, 0 0 20px currentColor',
      },
    },
  },
  plugins: [],
}
