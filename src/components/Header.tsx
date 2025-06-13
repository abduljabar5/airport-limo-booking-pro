
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigateToBooking = () => {
    window.location.href = '/booking';
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gold/30 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">ML</span>
            </div>
            <span className="text-xl font-bold text-white">Minneapolis Limo</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-300 hover:text-gold transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('fleet')}
              className="text-gray-300 hover:text-gold transition-colors"
            >
              Fleet
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-gold transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-300 hover:text-gold transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+16125551234" className="flex items-center space-x-2 text-gray-300 hover:text-gold transition-colors">
              <Phone className="w-4 h-4" />
              <span>(612) 555-1234</span>
            </a>
            <Button 
              onClick={navigateToBooking}
              className="bg-gold hover:bg-gold-600 text-black font-semibold"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-gold/30">
            <div className="px-4 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full text-left text-gray-300 hover:text-gold transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('fleet')}
                className="block w-full text-left text-gray-300 hover:text-gold transition-colors"
              >
                Fleet
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-gray-300 hover:text-gold transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left text-gray-300 hover:text-gold transition-colors"
              >
                FAQ
              </button>
              <div className="pt-4 border-t border-gold/30 space-y-3">
                <a href="tel:+16125551234" className="flex items-center space-x-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>(612) 555-1234</span>
                </a>
                <Button 
                  onClick={navigateToBooking}
                  className="w-full bg-gold hover:bg-gold-600 text-black font-semibold"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
