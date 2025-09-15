import { Code2, Server, Database, Cpu, Globe, Rocket } from "lucide-react";
import React from "react";
function About() {
  const skills = [
    { name: "React", icon: /* @__PURE__ */ React.createElement(Code2, { size: 24 }), level: "50%" },
    { name: "Node.js", icon: /* @__PURE__ */ React.createElement(Server, { size: 24 }), level: "90%" },
    { name: "PostgreSQL", icon: /* @__PURE__ */ React.createElement(Database, { size: 24 }), level: "85%" },
    { name: "Docker", icon: /* @__PURE__ */ React.createElement(Cpu, { size: 24 }), level: "40%" },
    { name: "Three.js", icon: /* @__PURE__ */ React.createElement(Globe, { size: 24 }), level: "50%" },
    { name: "CI/CD", icon: /* @__PURE__ */ React.createElement(Rocket, { size: 24 }), level: "55%" }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "pt-16" }, /* @__PURE__ */ React.createElement("section", { className: "relative py-20 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-4xl md:text-5xl font-bold mb-6" }, "Développeur Web Passionné"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-300 text-lg mb-8 leading-relaxed" }, "Je m'appelle ", /* @__PURE__ */ React.createElement("strong", null, "Azor Wollden's Habby-Shaï"), ", connu en ligne sous le nom ", /* @__PURE__ */ React.createElement("strong", null, "FAMOUS-TECH"), ". Je suis un jeune développeur web haïtien passionné par la technologie, spécialisé dans la création de sites vitrines, d’API performantes et de solutions numériques sur mesure. Ma mission : concevoir des expériences utilisateur fluides, modernes et centrées sur les besoins réels des utilisateurs. J’aide les particuliers et petites entreprises à bâtir leur présence en ligne de manière simple, élégante et efficace."), /* @__PURE__ */ React.createElement("div", { className: "space-y-4 text-gray-300" }, /* @__PURE__ */ React.createElement("p", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 bg-purple-400 rounded-full" }), "+3 ans d'expérience en développement web"), /* @__PURE__ */ React.createElement("p", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 bg-purple-400 rounded-full" }), "Spécialiste en Backend Node.js"), /* @__PURE__ */ React.createElement("p", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 bg-purple-400 rounded-full" }), "Passionné par les nouvelles technologies et l’innovation")), /* @__PURE__ */ React.createElement("p", { className: "text-center mt-8 italic text-gray-400" }, "— FAMOUS-TECH")), /* @__PURE__ */ React.createElement("div", { className: "relative flex justify-center" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "/images/portrait.webp",
      alt: "Portrait de Azor Wollden's Habby-Shaï - FAMOUS-TECH",
      className: "rounded-2xl shadow-2xl object-cover max-h-[500px] w-auto mx-auto"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent rounded-2xl" }))))), /* @__PURE__ */ React.createElement("section", { className: "py-20 px-4 bg-gray-900/50" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("h2", { className: "text-3xl md:text-4xl font-bold text-center mb-16" }, "Compétences Techniques"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" }, skills.map((skill, index) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: index,
      className: "bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800 transition-all group"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-purple-400 group-hover:scale-110 transition-transform" }, skill.icon), /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold" }, skill.name)),
    /* @__PURE__ */ React.createElement("div", { className: "h-2 bg-gray-700 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "h-full bg-gradient-to-r from-purple-400 to-pink-600 transition-all duration-1000 ease-out group-hover:opacity-100 opacity-80",
        style: { width: skill.level }
      }
    )),
    /* @__PURE__ */ React.createElement("p", { className: "text-right mt-2 text-sm text-gray-400" }, skill.level)
  ))))), /* @__PURE__ */ React.createElement("section", { className: "py-20 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("h2", { className: "text-3xl md:text-4xl font-bold text-center mb-16" }, "Parcours Professionnel"), /* @__PURE__ */ React.createElement("div", { className: "space-y-12" }, [
    {
      year: "2024",
      title: "Finalisation de mon apprentissage en Node.js",
      description: "Création de solutions web sur mesure pour des clients internationaux"
    },
    {
      year: "2023",
      title: "Développeur Front-end",
      description: "Développement d'interfaces utilisateur modernes avec React"
    },
    {
      year: "2023",
      title: "Développeur Junior",
      description: "Premiers pas dans le développement web professionnel"
    }
  ].map((experience, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: "relative pl-8 md:pl-0" }, /* @__PURE__ */ React.createElement("div", { className: "md:grid md:grid-cols-5 md:gap-8" }, /* @__PURE__ */ React.createElement("div", { className: "md:col-span-1 flex items-center md:justify-end" }, /* @__PURE__ */ React.createElement("div", { className: "text-purple-400 font-bold" }, experience.year)), /* @__PURE__ */ React.createElement("div", { className: "md:col-span-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gray-800/50 p-6 rounded-xl relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-8 h-[2px] bg-purple-400 hidden md:block" }), /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold mb-2" }, experience.title), /* @__PURE__ */ React.createElement("p", { className: "text-gray-300" }, experience.description))))))))));
}
export {
  About as default
};
