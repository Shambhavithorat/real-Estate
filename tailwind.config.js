/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#002D52', // Deep Navy Blue
          hover: '#001A33',
        },
        secondary: {
          DEFAULT: '#0A422D', // Forest Emerald Green
        },
        accent: {
          DEFAULT: '#C5A059', // Champagne Gold
          hover: '#A88746',
        },
        dark: {
          bg: '#1A1A1A', // Charcoal for Footer
          card: '#111111',
          nav: 'rgba(26, 26, 26, 0.9)',
        },
        light: {
          bg: '#F9F9F9', // Off-white for main body
          card: '#FFFFFF',
          text: '#333333', // Body Text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 30px rgba(0, 45, 82, 0.1)',
        'glow': '0 0 20px rgba(197, 160, 89, 0.3)',
      }
    },
  },
  plugins: [],
}
