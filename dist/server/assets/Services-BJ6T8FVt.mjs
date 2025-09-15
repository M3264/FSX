import React from "react";
import { MessageSquare, Zap, Code2, Rocket, PenTool, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { O as OptimizedImage } from "./OptimizedImage-CF4kBoMF.mjs";
import { W as WebPageStructuredData } from "../entry-server.mjs";
import "react-dom/server";
import "react-helmet";
function Services() {
  const services = [
    {
      icon: /* @__PURE__ */ React.createElement(Code2, { size: 40 }),
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
      icon: /* @__PURE__ */ React.createElement(Rocket, { size: 40 }),
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
      icon: /* @__PURE__ */ React.createElement(PenTool, { size: 40 }),
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
      icon: /* @__PURE__ */ React.createElement(Globe, { size: 40 }),
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
  return /* @__PURE__ */ React.createElement("main", { className: "pt-16" }, /* @__PURE__ */ React.createElement(
    WebPageStructuredData,
    {
      title: "Services de Développement Web et Solutions Digitales - FAMOUS-TECH",
      description: "Découvrez nos services de développement web, automatisation, refonte de CV et conseil digital. Solutions sur mesure pour votre transformation digitale en Haïti.",
      path: "/services",
      image: "https://www.famoustech.xyz/logo.png"
    }
  ), /* @__PURE__ */ React.createElement(
    "section",
    {
      className: "relative py-20 px-4",
      "aria-label": "Introduction"
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto text-center" }, /* @__PURE__ */ React.createElement("h1", { className: "text-4xl md:text-6xl font-bold mb-6" }, "Services Professionnels"), /* @__PURE__ */ React.createElement("p", { className: "text-xl text-gray-300 mb-12 max-w-3xl mx-auto" }, "Des solutions digitales sur mesure pour répondre à vos besoins spécifiques"), /* @__PURE__ */ React.createElement(
      Link,
      {
        to: "/contact",
        className: "inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors",
        "aria-label": "Demander un devis pour nos services"
      },
      /* @__PURE__ */ React.createElement(MessageSquare, { size: 20, "aria-hidden": "true" }),
      "Demander un devis"
    ))
  ), /* @__PURE__ */ React.createElement(
    "section",
    {
      className: "py-20 px-4",
      "aria-labelledby": "services-grid-title"
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("h2", { id: "services-grid-title", className: "sr-only" }, "Nos Services"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12" }, services.map((service, index) => /* @__PURE__ */ React.createElement("article", { key: index, className: "group" }, /* @__PURE__ */ React.createElement("div", { className: "relative h-64 mb-8 rounded-xl overflow-hidden" }, /* @__PURE__ */ React.createElement(
      OptimizedImage,
      {
        src: service.image,
        alt: `${service.title} - ${service.description}`,
        className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-110",
        priority: index < 2
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 p-6" }, /* @__PURE__ */ React.createElement("div", { className: "text-purple-400 mb-4", "aria-hidden": "true" }, service.icon), /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-bold mb-2" }, service.title), /* @__PURE__ */ React.createElement("p", { className: "text-gray-300" }, service.description))), /* @__PURE__ */ React.createElement("ul", { className: "space-y-3", "aria-label": `Fonctionnalités de ${service.title}` }, service.features.map((feature, fIndex) => /* @__PURE__ */ React.createElement("li", { key: fIndex, className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Zap, { size: 16, className: "text-purple-400", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("span", { className: "text-gray-300" }, feature))))))))
  ), /* @__PURE__ */ React.createElement(
    "section",
    {
      className: "py-20 px-4 bg-gray-900/50",
      "aria-labelledby": "faq-title"
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl mx-auto" }, /* @__PURE__ */ React.createElement("h2", { id: "faq-title", className: "text-3xl font-bold text-center mb-12" }, "Questions Fréquentes"), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, [
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
    ].map((faq, index) => /* @__PURE__ */ React.createElement(
      "article",
      {
        key: index,
        className: "bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800 transition-colors"
      },
      /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold mb-3" }, faq.question),
      /* @__PURE__ */ React.createElement("p", { className: "text-gray-300" }, faq.answer)
    ))))
  ));
}
export {
  Services as default
};
