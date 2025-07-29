import React, { useEffect } from 'react';
import { ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';

// Images à précharger immédiatement
const criticalImages = [
  "/images/unsplash-photo-1451187580459-43490279c0fa.webp", // Hero background
  "/images/unsplash-photo-1460925895917-afdab827c52f.webp", // Premier service
  "/images/unsplash-photo-1504639725590-34d0984388bd.webp", // Deuxième service
];

// Images à précharger après le chargement initial
const secondaryImages = [
  "/images/unsplash-photo-1552664730-d307ca884978.webp",
  "/images/fcc-project.webp"
];

// Routes internes à précharger
const internalRoutes = ['/contact', '/projects', '/services'];

function Home() {
  useEffect(() => {
    // 1. Préchargement immédiat et agressif des images critiques
    const preloadCriticalImages = () => {
      criticalImages.forEach(src => {
        // Méthode 1: Link preload dans le head
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
        
        // Méthode 2: Image object pour forcer le cache immédiatement
        const img = new Image();
        img.src = src;
      });
    };

    // 2. Préchargement immédiat des images secondaires (pas de délai)
    const preloadSecondaryImages = () => {
      secondaryImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    // 3. Préchargement des routes internes
    const preloadInternalRoutes = () => {
      setTimeout(() => {
        internalRoutes.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
      }, 100); // Délai réduit
    };

    // 4. Préchargement DNS pour les domaines externes
    const preloadDNS = () => {
      const dnsPreload = document.createElement('link');
      dnsPreload.rel = 'dns-prefetch';
      dnsPreload.href = '//images.unsplash.com';
      document.head.appendChild(dnsPreload);
    };

    // Exécution immédiate de tous les préchargements
    preloadCriticalImages();
    preloadSecondaryImages();
    preloadInternalRoutes();
    preloadDNS();

    // Nettoyage au démontage du composant
    return () => {
      // Retirer les liens de préchargement pour éviter l'accumulation
      const preloadLinks = document.querySelectorAll('link[rel="preload"], link[rel="prefetch"]');
      preloadLinks.forEach(link => {
        if (link.getAttribute('href')?.includes('/images/') || 
            internalRoutes.includes(link.getAttribute('href') || '')) {
          link.remove();
        }
      });
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"></div>
          <div className="w-full h-full">
            <OptimizedImage
              src="/images/unsplash-photo-1451187580459-43490279c0fa.webp"
              alt="Background"
              className="w-full h-full object-cover opacity-10"
              priority={true}
            />
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Ou imajine, nou kreye
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Développeur web passionné, je transforme vos idées en réalités digitales innovantes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center justify-center gap-2 group"
            >
              <MessageSquare size={20} />
              Demande un devis
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/projects"
              className="border border-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-600/20 transition-colors inline-flex items-center justify-center gap-2"
            >
              <ChevronDown size={22} className="animate-bounce" />
              Voir mes projets
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Services d'excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sites Web Modernes",
                description: "Des sites web performants et responsifs",
                image: "/images/unsplash-photo-1460925895917-afdab827c52f.webp"
              },
              {
                title: "Solutions Digitales",
                description: "Automatisation et outils sur mesure",
                image: "/images/unsplash-photo-1504639725590-34d0984388bd.webp"
              },
              {
                title: "Consultation technique",
                description: "Expertise et accompagnement",
                image: "/images/unsplash-photo-1552664730-d307ca884978.webp"
              }
            ].map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl aspect-[4/3]"
              >
                <OptimizedImage
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  priority={index < 2} // Seules les 2 premières images sont prioritaires
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              Découvrir tous les services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <OptimizedImage
              src="/images/fcc-project.webp"
              alt="FCC"
              className="w-full h-full md:h-96 lg:h-[600px] object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent flex items-center">
              <div className="p-8 md:p-16 max-w-2xl">
                <h3 className="text-2xl md:text-4xl font-bold mb-4">FCC</h3>
                <p className="text-gray-300 text-lg mb-8">
                  Un site vitrine attractif, realiste et optimise afin de convertir les visiteurs en acheteurs.
                </p>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Voir le projet
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;