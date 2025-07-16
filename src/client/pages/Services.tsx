import React from 'react';
import { Code2, Rocket, Zap, PenTool, Globe, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';
import { WebPageStructuredData } from '../components/StructuredData';

function Services() {
  const services = [
    {
      icon: <Code2 size={40} />,
      title: "Création de Sites Web",
      description: "Des sites web modernes, rapides et responsifs adaptés à vos besoins",
      features: [
        "Sites vitrines professionnels",
        "Applications web complexes",
        "E-commerce sur mesure",
        "Interfaces administrateur"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1500"
    },
    {
      icon: <Rocket size={40} />,
      title: "Automatisation",
      description: "Optimisez votre workflow avec des solutions d'automatisation intelligentes",
      features: [
        "Bots sur mesure",
        "Scripts d'automatisation",
        "Intégration & Création d'API",
        "Workflow automation"
      ],
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=1500"
    },
    {
      icon: <PenTool size={40} />,
      title: "Refonte CV",
      description: "Des CV modernes et percutants pour booster votre carrière + Portfolio professionel pour vous demarquer des autres",
      features: [
        "Design professionnel",
        "Optimisation ATS",
        "Versions digitales",
        "Personal branding"
      ],
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1500"
    },
    {
      icon: <Globe size={40} />,
      title: "Conseil Digital",
      description: "Accompagnement stratégique pour votre transformation digitale",
      features: [
        "Audit technique",
        "Stratégie digitale",
        "Optimisation performance",
        "Veille technologique"
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1500"
    }
  ];

  return (
    <main className="pt-16">
      <WebPageStructuredData
        title="Services de Développement Web et Solutions Digitales - FAMOUS-TECH"
        description="Découvrez nos services de développement web, automatisation, refonte de CV et conseil digital. Solutions sur mesure pour votre transformation digitale en Haïti."
        path="/services"
        image="https://www.famoustech.xyz/logo.png"
      />

      {/* Hero Section */}
      <section 
        className="relative py-20 px-4"
        aria-label="Introduction"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Services Professionnels
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Des solutions digitales sur mesure pour répondre à vos besoins spécifiques
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            aria-label="Demander un devis pour nos services"
          >
            <MessageSquare size={20} aria-hidden="true" />
            Demander un devis
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section 
        className="py-20 px-4"
        aria-labelledby="services-grid-title"
      >
        <div className="max-w-7xl mx-auto">
          <h2 id="services-grid-title" className="sr-only">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <article key={index} className="group">
                <div className="relative h-64 mb-8 rounded-xl overflow-hidden">
                  <OptimizedImage
                    src={service.image}
                    alt={`${service.title} - ${service.description}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="text-purple-400 mb-4" aria-hidden="true">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </div>
                </div>
                <ul className="space-y-3" aria-label={`Fonctionnalités de ${service.title}`}>
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <Zap size={16} className="text-purple-400" aria-hidden="true" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        className="py-20 px-4 bg-gray-900/50"
        aria-labelledby="faq-title"
      >
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-title" className="text-3xl font-bold text-center mb-12">
            Questions Fréquentes
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "Combien coûte un site web ?",
                answer: "Le coût varie selon vos besoins spécifiques. Contactez-moi pour un devis personnalisé."
              },
              {
                question: "Est-ce que c'est cher ?",
                answer: "Tous mes services sont réflechis de maniere a ce que tous les type de budgets puissent obtenir leur site web."
              },
              {
                question: "Quels sont les délais moyens ?",
                answer: "Les délais dépendent de la complexité du projet. Un site vitrine prend environ 1-2 semaines."
              },
              {
                question: "Quelles technologies utilisez-vous ?",
                answer: "Je travaille principalement avec React, Node.js, PostgreSQL et les dernières technologies web."
              }
            ].map((faq, index) => (
              <article
                key={index}
                className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Services;