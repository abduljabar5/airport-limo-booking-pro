# Minneapolis Limo - HTML/CSS/JS Version

This is a converted version of the Minneapolis Limo React website, now running entirely on HTML, CSS, and JavaScript.

## Features

### ✅ Complete Conversion
- **Home Page**: All sections converted (Hero, Price Estimator, About, Services, Fleet, Testimonials, FAQ, Footer)
- **Booking Page**: Full booking form with price estimation
- **Detailed Booking Page**: Complete booking form with validation
- **404 Page**: Custom error page
- **Responsive Design**: Works on all devices
- **Client-side Routing**: SPA-style navigation without page reloads

### 🎨 Styling
- **Tailwind CSS**: Complete styling with custom gold theme
- **Lucide Icons**: Vector icons throughout the interface
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Hover effects and transitions
- **Modern UI**: Glass-morphism effects and gradients

### 🚀 Functionality
- **Price Calculation**: Real-time price estimation based on distance and vehicle type
- **Form Validation**: Client-side validation for all forms
- **Smooth Scrolling**: Navigation to sections within the page
- **Mobile Menu**: Collapsible mobile navigation
- **FAQ Accordion**: Expandable FAQ sections
- **Booking Flow**: Multi-step booking process

## Files Structure

```
├── index.html          # Main HTML file
├── styles.css          # Main CSS file with Tailwind and custom styles
├── app.js             # Main JavaScript file with all functionality
├── public/            # Static assets (images, icons)
└── README-HTML.md     # This file
```

## How to Run

### Option 1: Simple HTTP Server
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option 2: Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

### Option 3: Any Web Server
Deploy the files to any web server (Apache, Nginx, etc.)

## Key Features

### 🌟 Exact Replica
- **Identical Appearance**: Pixel-perfect recreation of the original React website
- **Same Functionality**: All interactive features work exactly the same
- **Performance**: Faster loading without React overhead

### 📱 Mobile Responsive
- **Responsive Design**: Works perfectly on all screen sizes
- **Touch-friendly**: Optimized for mobile interactions
- **Fast Loading**: No framework overhead

### 🎯 Interactive Elements
- **Price Estimator**: Calculate ride prices based on locations and vehicle type
- **Booking Forms**: Complete booking flow with validation
- **Navigation**: Smooth scrolling and routing
- **FAQ Section**: Collapsible questions and answers

## Technical Details

### Libraries Used
- **Tailwind CSS**: For styling (loaded via CDN)
- **Lucide Icons**: For vector icons (loaded via CDN)
- **Vanilla JavaScript**: No frameworks required

### Browser Compatibility
- **Modern Browsers**: Works in all modern browsers
- **ES6 Features**: Uses modern JavaScript features
- **Mobile Support**: Full mobile browser support

## Customization

### Colors
The gold theme can be customized in the `styles.css` file by modifying the CSS variables:
```css
:root {
    --gold: 45 100% 51%;
    --gold-dark: 38 92% 45%;
}
```

### Content
All content can be modified directly in the `app.js` file within the render functions.

### Styling
Additional styles can be added to `styles.css` or by modifying the Tailwind configuration in `index.html`.

## Advantages of HTML/CSS/JS Version

1. **No Build Process**: No compilation or bundling required
2. **Faster Loading**: No framework overhead
3. **SEO Friendly**: Better search engine optimization
4. **Easy Deployment**: Can be deployed anywhere
5. **Simple Maintenance**: Easy to understand and modify
6. **Lighter Weight**: Smaller file sizes
7. **Better Performance**: Faster rendering and interactions

## Original Features Preserved

- ✅ Smooth scrolling navigation
- ✅ Price calculation algorithms
- ✅ Form validation
- ✅ Responsive design
- ✅ Mobile menu
- ✅ FAQ accordion
- ✅ Booking flow
- ✅ Route handling
- ✅ Interactive elements
- ✅ Styling and animations

## Usage

1. Open `index.html` in a web browser
2. Navigate through the site using the header menu
3. Use the price estimator to get quotes
4. Complete the booking process
5. All functionality works exactly like the original React version

The website is now ready to use and deploy without any React dependencies! 