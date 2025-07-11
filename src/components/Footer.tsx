
import { Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gold/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">ML</span>
              </div>
              <span className="text-xl font-bold">Minneapolis Limo</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your premier luxury transportation service in the Twin Cities. 
              Professional, reliable, and comfortable rides to anywhere you need to go.
            </p>
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold text-gold">Contact</h3>
              <a href="tel:+16129995382" className="text-gray-300 hover:text-gold transition-colors">(612) 999-5382</a>
              <a href="mailto:info@minneapolis-limo.com" className="text-gray-300 hover:text-gold transition-colors">info@minneapolis-limo.com</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Book Now
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Fleet
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">Service Hours</h3>
            <div className="space-y-2 text-gray-300">
              <div>24/7 Airport Service</div>
              <div>Corporate: 6 AM - 10 PM</div>
              <div>Events: By Appointment</div>
              <div className="pt-2 text-sm">
                Emergency service available
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/30 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 Minneapolis Limo. All rights reserved. Licensed & Insured.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gold text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-gold text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
