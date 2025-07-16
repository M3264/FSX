import React from 'react';
import { Mail, Clock, Phone } from 'lucide-react';

let ReactGA: typeof import('react-ga') | undefined = undefined;
if (typeof window !== 'undefined') {
  ReactGA = require('react-ga');
}

function Footer() {
  // Fonction pour suivre les clics sur les liens du footer
  const handleFooterLinkClick = (linkName: string) => {
    if (ReactGA) {
      ReactGA.event({
        category: 'Footer',
        action: 'Clic sur lien',
        label: linkName
      });
    }
  };

  return (
    <footer className="bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            FAMOUS-TECH
          </h3>
          <p className="text-gray-400">
            Transformez vos idees en oeuvre d'art digital
          </p>
        </div>
        
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <div className="space-y-2 text-gray-400">
            <a 
              href="mailto:famoustechgroup@proton.me" 
              className="flex items-center justify-center gap-2 hover:text-purple-400 transition-colors"
              onClick={() => handleFooterLinkClick('Email')}
            >
              <Mail size={16} />
              famoustechgroup@proton.me
            </a>
            <div className="flex items-center justify-center gap-2">
              <Phone size={16} />
              +509 44156629
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock size={16} />
              Lun-Ven: 9h-17h
            </div>
          </div>
        </div>

        <div className="text-center md:text-right">
          <h4 className="text-lg font-semibold mb-4">Suivez-moi</h4>
          <div className="flex justify-center md:justify-end space-x-4">
            <a 
              href="https://github.com/Famous-Tech" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              onClick={() => handleFooterLinkClick('GitHub')}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a 
              href="https://www.tiktok.com/@techfamous" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              onClick={() => handleFooterLinkClick('TikTok')}
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>© 2025 FAMOUS-TECH. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;