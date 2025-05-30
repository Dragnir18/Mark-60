import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-electric-blue text-3xl font-bold mb-4">NSTNT</div>
            <p className="text-slate-400 mb-6">
              Cutting-edge technology solutions for businesses of all sizes. Hardware, services, and cybersecurity expertise.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-electric-blue transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-electric-blue transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-electric-blue transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-electric-blue transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-electric-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-electric-blue transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-electric-blue transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-electric-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-electric-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/hardware" className="text-slate-400 hover:text-electric-blue transition-colors">
                  Hardware
                </Link>
              </li>
              <li>
                <Link to="/category/cybersecurity" className="text-slate-400 hover:text-electric-blue transition-colors">
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link to="/category/peripherals" className="text-slate-400 hover:text-electric-blue transition-colors">
                  Peripherals
                </Link>
              </li>
              <li>
                <Link to="/category/software" className="text-slate-400 hover:text-electric-blue transition-colors">
                  Software Solutions
                </Link>
              </li>
              <li>
                <Link to="/special-offers" className="text-slate-400 hover:text-electric-blue transition-colors">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={18} className="text-electric-blue mt-0.5 mr-3" />
                <span className="text-slate-400">contact@nstnt.tech</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="text-electric-blue mt-0.5 mr-3" />
                <span className="text-slate-400">+33 (0)1 23 45 67 89</span>
              </li>
              <li className="text-slate-400">
                123 Tech Boulevard,<br />
                75001 Paris,<br />
                France
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} NSTNT Technologies. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <Link to="/privacy-policy" className="text-slate-400 hover:text-electric-blue transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-slate-400 hover:text-electric-blue transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="text-slate-400 hover:text-electric-blue transition-colors">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;