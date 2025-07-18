import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À propos' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projets' },
    { path: '/contact', label: 'Contact' }
  ];

  // Fonction pour suivre les clics sur les liens de navigation
  const handleNavClick = (label: string) => {
    console.log(`Clicked: ${label}`);
  };

  return (
    <nav className="fixed w-full bg-gray-900/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex-shrink-0"
            onClick={() => handleNavClick('Logo')}
          >
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              FAMOUS-TECH
            </span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-purple-600 text-white'
                      : 'hover:text-purple-400'
                  }`}
                  onClick={() => handleNavClick(item.label)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => {
                console.log("Navbar clicked");
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-purple-600 text-white'
                    : 'hover:text-purple-400'
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  handleNavClick(`Mobile - ${item.label}`);
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;