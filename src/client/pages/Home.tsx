import React, { useEffect } from 'react';
import { ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';

// Liste de toutes les images à précharger
const imagesToPreload = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  "https://files.catbox.moe/b8is2m.jpeg"
];

function Home() {
  // Fonction de préchargement des images
  useEffect(() => {
    const preloadImages = () => {
      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"></div>
          {/* Image d'arrière-plan avec style amélioré */}
          <div className="w-full h-full">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072"
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
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Solutions Digitales",
                description: "Automatisation et outils sur mesure",
                image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Consultation technique",
                description: "Expertise et accompagnement",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
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
                  priority={index < 2}
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
              src="https://files.catbox.moe/b8is2m.jpeg"
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
