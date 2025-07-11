/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './app.js',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 