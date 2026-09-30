/** Compiled Tailwind for totaltowncar.com (replaces the CDN runtime on every page).
 *  Build:  npm run css   (writes css/tailwind.css)
 *  Palette mirrors the inline config the pages used with the CDN. */
module.exports = {
  content: ['./*.html', './app.js', './nav.js', './tools/service-pages/*.py', './tools/service-pages/quote_widget.html'],
  theme: {
    extend: {
      colors: {
        gold: { 50: '#fefdf8', 100: '#fef9e7', 200: '#fdf0c4', 300: '#fce38a', 400: '#D4AF37', 500: '#C4A030', 600: '#B8960A', 700: '#8B7209', 800: '#6B5807', 900: '#4A3D05' },
        obsidian: { 50: '#f7f7f8', 100: '#eeeef0', 200: '#d9d9dd', 300: '#b8b8bf', 400: '#91919c', 500: '#737380', 600: '#5d5d68', 700: '#4c4c55', 800: '#28282d', 900: '#18181b', 950: '#0a0a0b' }
      },
      fontFamily: { display: ['Cormorant Garamond', 'serif'], sans: ['Outfit', 'system-ui', 'sans-serif'] },
      letterSpacing: { luxe: '0.2em' }
    }
  },
  safelist: ['show', 'hidden', 'rotate-180', 'opacity-40', 'pointer-events-none', 'bg-gold-400/10', 'text-white', 'text-obsidian-300', 'text-obsidian-400', 'grayscale', 'line-through', 'opacity-60', 'menu-open'],
  plugins: []
};
