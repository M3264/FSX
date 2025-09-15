import React, { useState } from "react";
import { renderToString } from "react-dom/server";
import { useLocation, Link, Routes, Route, StaticRouter } from "react-router-dom";
import { X, Menu, Mail, Phone, Clock } from "lucide-react";
import { Helmet } from "react-helmet";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navItems = [
    { path: "/", label: "Accueil" },
    { path: "/about", label: "À propos" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projets" },
    { path: "/contact", label: "Contact" }
  ];
  const handleNavClick = (label) => {
    console.log(`Clicked: ${label}`);
  };
  return /* @__PURE__ */ React.createElement("nav", { className: "fixed w-full bg-gray-900/90 backdrop-blur-sm z-50" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between h-16" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/",
      className: "flex-shrink-0",
      onClick: () => handleNavClick("Logo")
    },
    /* @__PURE__ */ React.createElement("span", { className: "font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text" }, "FAMOUS-TECH")
  ), /* @__PURE__ */ React.createElement("div", { className: "hidden md:block" }, /* @__PURE__ */ React.createElement("div", { className: "ml-10 flex items-center space-x-4" }, navItems.map((item) => /* @__PURE__ */ React.createElement(
    Link,
    {
      key: item.path,
      to: item.path,
      className: `px-4 py-2 rounded-lg transition-colors ${isActive(item.path) ? "bg-purple-600 text-white" : "hover:text-purple-400"}`,
      onClick: () => handleNavClick(item.label)
    },
    item.label
  )))), /* @__PURE__ */ React.createElement("div", { className: "md:hidden" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setIsMenuOpen(!isMenuOpen);
      },
      className: "text-gray-300 hover:text-white"
    },
    isMenuOpen ? /* @__PURE__ */ React.createElement(X, { size: 24 }) : /* @__PURE__ */ React.createElement(Menu, { size: 24 })
  )))), isMenuOpen && /* @__PURE__ */ React.createElement("div", { className: "md:hidden" }, /* @__PURE__ */ React.createElement("div", { className: "px-2 pt-2 pb-3 space-y-1" }, navItems.map((item) => /* @__PURE__ */ React.createElement(
    Link,
    {
      key: item.path,
      to: item.path,
      className: `block px-3 py-2 rounded-lg transition-colors ${isActive(item.path) ? "bg-purple-600 text-white" : "hover:text-purple-400"}`,
      onClick: () => {
        setIsMenuOpen(false);
        handleNavClick(`Mobile - ${item.label}`);
      }
    },
    item.label
  )))));
}
function Footer() {
  const handleFooterLinkClick = (linkName) => {
    console.log(`Clicked footer link: ${linkName}`);
  };
  return /* @__PURE__ */ React.createElement("footer", { className: "bg-gray-900 py-12 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8" }, /* @__PURE__ */ React.createElement("div", { className: "text-center md:text-left" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text" }, "FAMOUS-TECH"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400" }, "Transformez vos idees en oeuvre d'art digital")), /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("h4", { className: "text-lg font-semibold mb-4" }, "Contact"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 text-gray-400" }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "mailto:famoustechgroup@proton.me",
      className: "flex items-center justify-center gap-2 hover:text-purple-400 transition-colors",
      onClick: () => handleFooterLinkClick("Email")
    },
    /* @__PURE__ */ React.createElement(Mail, { size: 16 }),
    "famoustechgroup@proton.me"
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-2" }, /* @__PURE__ */ React.createElement(Phone, { size: 16 }), "+509 44156629"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-2" }, /* @__PURE__ */ React.createElement(Clock, { size: 16 }), "Lun-Ven: 9h-17h"))), /* @__PURE__ */ React.createElement("div", { className: "text-center md:text-right" }, /* @__PURE__ */ React.createElement("h4", { className: "text-lg font-semibold mb-4" }, "Suivez-moi"), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center md:justify-end space-x-4" }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://github.com/Famous-Tech",
      className: "text-gray-400 hover:text-purple-400 transition-colors",
      onClick: () => handleFooterLinkClick("GitHub"),
      target: "_blank",
      rel: "noopener noreferrer"
    },
    "GitHub"
  ), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://www.tiktok.com/@techfamous",
      className: "text-gray-400 hover:text-purple-400 transition-colors",
      onClick: () => handleFooterLinkClick("TikTok"),
      target: "_blank",
      rel: "noopener noreferrer"
    },
    "TikTok"
  )))), /* @__PURE__ */ React.createElement("div", { className: "mt-8 text-center text-gray-500 text-sm" }, "© ", (/* @__PURE__ */ new Date()).getFullYear(), " FAMOUS-TECH. Tous droits réservés."));
}
const StructuredData = ({ type, data }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
  return /* @__PURE__ */ React.createElement(Helmet, null, /* @__PURE__ */ React.createElement("script", { type: "application/ld+json" }, JSON.stringify(structuredData)));
};
const OrganizationStructuredData = () => {
  const orgData = {
    name: "FAMOUS-TECH",
    url: "https://www.famoustech.xyz",
    logo: "https://www.famoustech.xyz/logo.png",
    description: "Famous-Tech est une entreprise de développement web et mobile en Haïti, spécialisée dans la création de solutions digitales innovantes.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Port-au-Prince",
      addressLocality: "Port-au-Prince",
      addressRegion: "Ouest",
      postalCode: "HT30",
      addressCountry: "HT"
    },
    sameAs: [
      "https://github.com/Famous-Tech",
      "https://www.tiktok.com/@techfamous"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+509 44156629",
      email: "famoustechgroup@proton.me",
      contactType: "customer service",
      availableLanguage: ["fr", "en", "ht"]
    },
    areaServed: {
      "@type": "Country",
      name: "Haiti"
    },
    foundingDate: "2023",
    founder: {
      "@type": "Person",
      name: "Famous-Tech Team"
    }
  };
  return /* @__PURE__ */ React.createElement(StructuredData, { type: "Organization", data: orgData });
};
const WebsiteStructuredData = () => {
  const websiteData = {
    name: "FAMOUS-TECH - Solutions de développement web et mobile",
    description: "Transformez vos idées en solutions digitales innovantes avec Famous-Tech. Développement web, applications mobiles et stratégies digitales sur mesure en Haïti.",
    url: "https://www.famoustech.xyz",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.famoustech.xyz/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    publisher: {
      "@type": "Organization",
      name: "FAMOUS-TECH",
      logo: {
        "@type": "ImageObject",
        url: "https://www.famoustech.xyz/logo.png"
      }
    }
  };
  return /* @__PURE__ */ React.createElement(StructuredData, { type: "WebSite", data: websiteData });
};
const WebPageStructuredData = ({ title, description, path, image, datePublished, dateModified }) => {
  const pageData = {
    name: title,
    description,
    url: `https://www.famoustech.xyz${path}`,
    ...image && {
      image: {
        "@type": "ImageObject",
        url: image
      }
    },
    ...datePublished && { datePublished },
    ...dateModified && { dateModified },
    publisher: {
      "@type": "Organization",
      name: "FAMOUS-TECH",
      logo: {
        "@type": "ImageObject",
        url: "https://www.famoustech.xyz/logo.png"
      }
    }
  };
  return /* @__PURE__ */ React.createElement(StructuredData, { type: "WebPage", data: pageData });
};
const Home = React.lazy(() => import("./assets/Home-2S34g0HV.mjs"));
const About = React.lazy(() => import("./assets/About-BMiVLYCA.mjs"));
const Services = React.lazy(() => import("./assets/Services-BJ6T8FVt.mjs"));
const Projects = React.lazy(() => import("./assets/Projects-DqE_Fzd_.mjs"));
const Contact = React.lazy(() => import("./assets/Contact-Bt9LsM4z.mjs"));
function App() {
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" }, /* @__PURE__ */ React.createElement(OrganizationStructuredData, null), /* @__PURE__ */ React.createElement(WebsiteStructuredData, null), /* @__PURE__ */ React.createElement(Navbar, null), /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, { path: "/", element: /* @__PURE__ */ React.createElement(Home, null) }), /* @__PURE__ */ React.createElement(Route, { path: "/about", element: /* @__PURE__ */ React.createElement(About, null) }), /* @__PURE__ */ React.createElement(Route, { path: "/services", element: /* @__PURE__ */ React.createElement(Services, null) }), /* @__PURE__ */ React.createElement(Route, { path: "/projects", element: /* @__PURE__ */ React.createElement(Projects, null) }), /* @__PURE__ */ React.createElement(Route, { path: "/contact", element: /* @__PURE__ */ React.createElement(Contact, null) })), /* @__PURE__ */ React.createElement(Footer, null));
}
function render(url) {
  const context = {};
  const html = renderToString(
    /* @__PURE__ */ React.createElement(StaticRouter, { location: url, context }, /* @__PURE__ */ React.createElement(App, null))
  );
  return { html, context };
}
export {
  WebPageStructuredData as W,
  render
};
