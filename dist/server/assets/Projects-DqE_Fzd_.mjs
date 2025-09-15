import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { O as OptimizedImage } from "./OptimizedImage-CF4kBoMF.mjs";
import { W as WebPageStructuredData } from "../entry-server.mjs";
import "react-dom/server";
import "react-helmet";
function Projects() {
  const projects = [
    {
      title: "FCC Flowers - Landing Page",
      description: "Site vitrine élégant pour FCC (Florestal Creative Company), leader haïtien en décoration florale et événementielle. Design moderne, responsive et optimisé pour la conversion avec intégration d'outils d'analyse de trafic.",
      image: "https://files.catbox.moe/jgq278.png",
      tags: ["React", "Node.js", "Google Analytics", "TailwindCSS"],
      link: "https://fcc.famoustech.xyz/"
    },
    {
      title: "Gift of Chain",
      description: "Plateforme innovante de dons en crypto-monnaies pour les personnes en difficulté mais en capacité d'investir. Système sécurisé de paiement crypto, gestion automatisée des transactions et notifications par email. Solution transparente et décentralisée pour faciliter les dons internationaux.",
      image: "https://media.istockphoto.com/id/1495603724/fr/photo/%C3%A0-venir-bient%C3%B4t-banni%C3%A8re-de-panneaux-n%C3%A9on-collection-de-panneaux-de-signalisation-de-lumi%C3%A8re.webp?a=1&b=1&s=612x612&w=0&k=20&c=pgiu5_buIAKek-kIo3ExlXchO9q5Y1UqJJgU0UCz6eA=",
      tags: ["React", "Web3", "PostgreSQL", "Node.js"],
      link: "https://gochaiti.com/"
    },
    {
      title: "CAS Digital",
      description: "Plateforme e-commerce spécialisée dans la vente de produits numériques et recharges de jeux en ligne en Haïti. Interface utilisateur intuitive et systeme de gestion des visites.",
      image: "https://files.catbox.moe/6jd5fr.jpeg",
      tags: ["React", "TailwindCSS", "Node.js", "MongoDB"],
      link: "https://cas.famoustech.xyz/"
    }
  ];
  return /* @__PURE__ */ React.createElement("main", { className: "pt-16" }, /* @__PURE__ */ React.createElement(
    WebPageStructuredData,
    {
      title: "Projets de Développement Web et Solutions Digitales en Haïti - FAMOUS-TECH",
      description: "Découvrez nos réalisations en développement web en Haïti : sites vitrines, plateformes e-commerce et solutions blockchain innovantes. Expertise technique et créative pour la transformation digitale des entreprises haïtiennes.",
      path: "/projects",
      image: "https://www.famoustech.xyz/logo.png"
    }
  ), /* @__PURE__ */ React.createElement(
    "section",
    {
      className: "relative py-20 px-4",
      "aria-label": "Introduction"
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto text-center" }, /* @__PURE__ */ React.createElement("h1", { className: "text-4xl md:text-6xl font-bold mb-6" }, "Nos Réalisations"), /* @__PURE__ */ React.createElement("p", { className: "text-xl text-gray-300 mb-12 max-w-3xl mx-auto" }, "Découvrez nos projets innovants en développement web et solutions digitales en Haïti"))
  ), /* @__PURE__ */ React.createElement(
    "section",
    {
      className: "py-20 px-4",
      "aria-labelledby": "projects-grid-title"
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("h2", { id: "projects-grid-title", className: "sr-only" }, "Liste des Projets"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" }, projects.map((project, index) => /* @__PURE__ */ React.createElement(
      "article",
      {
        key: index,
        className: "bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors"
      },
      /* @__PURE__ */ React.createElement("div", { className: "relative h-48" }, /* @__PURE__ */ React.createElement(
        OptimizedImage,
        {
          src: project.image,
          alt: `${project.title} - ${project.description}`,
          className: "w-full h-full object-cover",
          priority: index === 0
        }
      )),
      /* @__PURE__ */ React.createElement("div", { className: "p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-bold mb-2" }, project.title), /* @__PURE__ */ React.createElement("p", { className: "text-gray-300 mb-4" }, project.description), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2 mb-6" }, project.tags.map((tag, tagIndex) => /* @__PURE__ */ React.createElement(
        "span",
        {
          key: tagIndex,
          className: "px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm"
        },
        tag
      ))), /* @__PURE__ */ React.createElement(
        "a",
        {
          href: project.link,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center gap-2 text-gray-300 hover:text-white transition-colors",
          "aria-label": `Visiter ${project.title}`
        },
        /* @__PURE__ */ React.createElement(ExternalLink, { size: 20, "aria-hidden": "true" }),
        "Voir le projet"
      ))
    ))))
  ), /* @__PURE__ */ React.createElement(
    "section",
    {
      className: "py-20 px-4 bg-gray-900/50",
      "aria-label": "Appel à l'action"
    },
    /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl mx-auto text-center" }, /* @__PURE__ */ React.createElement("h2", { className: "text-3xl font-bold mb-6" }, "Vous avez un projet digital ?"), /* @__PURE__ */ React.createElement("p", { className: "text-xl text-gray-300 mb-8" }, "Transformez votre vision en réalité avec nos solutions digitales sur mesure en Haïti"), /* @__PURE__ */ React.createElement(
      Link,
      {
        to: "/contact",
        className: "inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors",
        "aria-label": "Contactez-nous pour votre projet digital"
      },
      "Démarrer votre projet",
      /* @__PURE__ */ React.createElement(ArrowRight, { size: 20, "aria-hidden": "true" })
    ))
  ));
}
export {
  Projects as default
};
