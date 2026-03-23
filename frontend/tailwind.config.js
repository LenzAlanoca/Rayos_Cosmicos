/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de cielo nocturno
        'sky-dark': {
          50: '#f0f4ff',
          100: '#dce5ff',
          200: '#c0d4ff',
          300: '#97b7ff',
          400: '#6886ff',
          500: '#3d5aff',
          600: '#2847e3',
          700: '#1e36c4',
          800: '#1b2e9e',
          900: '#1a2d7f',
          950: '#0f1b4a',
        },
        'cosmic': {
          50: '#fafbfe',
          100: '#f2f5fd',
          200: '#e1e8fc',
          300: '#c9d6f9',
          400: '#a8bef5',
          500: '#7d9ff0',
          600: '#5d7ce9',
          700: '#4b63d7',
          800: '#3f52b8',
          900: '#2f3e8c',
          950: '#1b2453',
        },
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 5px rgba(61, 90, 255, 0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 20px rgba(61, 90, 255, 0.6)' },
        },
      },
      backgroundImage: {
        'gradient-cosmos': 'linear-gradient(135deg, #0f1b4a 0%, #1b2d7f 50%, #2847e3 100%)',
        'gradient-night': 'linear-gradient(180deg, #0f1b4a 0%, #1a2d7f 50%, #2f3e8c 100%)',
      },
    },
  },
  plugins: [],
}
