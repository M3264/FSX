import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AnalyticsProvider from './context/AnalyticsContext';
import { useAnalytics } from './context/AnalyticsContext';
import usePageViewTiming from './hooks/usePageViewTiming';
import { OrganizationStructuredData, WebsiteStructuredData } from './components/StructuredData';

// Déclaration de type pour window.gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Composant pour suivre les changements de page
function RouteTracker() {
  const location = useLocation();
  const { trackPageView } = useAnalytics();
  
  // Hook pour mesurer le temps passé sur les pages
  usePageViewTiming();
  
  useEffect(() => {
    // Ne s'exécute que côté client
    if (typeof window !== 'undefined') {
      // Envoi de la vue de page à Google Analytics
      trackPageView(location.pathname + location.search);
      
      // Ajouter des informations supplémentaires personnalisées
      if (document.referrer && window.gtag) {
        window.gtag('set', 'referrer', document.referrer);
      }
      
      // Suivre les paramètres de recherche s'ils existent
      if (location.search && window.gtag) {
        window.gtag('event', 'search_params', {
          search_term: location.search
        });
      }
    }
  }, [location, trackPageView]);
  
  return null;
}

// Composant principal de l'App 
function App() {
  return (
    <AnalyticsProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Données structurées pour le SEO */}
        <OrganizationStructuredData />
        <WebsiteStructuredData />
        <Navbar />
        <RouteTracker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </AnalyticsProvider>
  );
}

export default App;