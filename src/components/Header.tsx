import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  
  const { user, signOut } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-electric-blue text-3xl font-bold">NSTNT</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-electric-blue transition-colors"
            >
              Accueil
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-electric-blue transition-colors"
            >
              Produits
            </Link>
            <Link
              to="/services"
              className="text-white hover:text-electric-blue transition-colors"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-electric-blue transition-colors"
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-electric-blue transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              className="text-white hover:text-electric-blue transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {user ? (
              <div className="relative group">
                <button className="text-white hover:text-electric-blue transition-colors flex items-center space-x-2">
                  <User size={20} />
                  <span className="hidden md:block">{user.firstName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Mon profil
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Mes commandes
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth/signin"
                className="text-white hover:text-electric-blue transition-colors"
              >
                <User size={20} />
              </Link>
            )}

            <Link
              to="/cart"
              className="text-white hover:text-electric-blue transition-colors relative"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-electric-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 mt-3">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="block py-2 text-white hover:text-electric-blue"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/products"
              className="block py-2 text-white hover:text-electric-blue"
              onClick={() => setMobileMenuOpen(false)}
            >
              Produits
            </Link>
            <Link
              to="/services"
              className="block py-2 text-white hover:text-electric-blue"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block py-2 text-white hover:text-electric-blue"
              onClick={() => setMobileMenuOpen(false)}
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-white hover:text-electric-blue"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;