import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ""
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        success: false,
        message: "Veuillez remplir tous les champs obligatoires."
      });
      return;
    }
    setIsSubmitting(true);
    if (typeof window !== "undefined") {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        setSubmitStatus({
          success: true,
          message: "Votre message a été envoyé avec succès !"
        });
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
        setSubmitStatus({
          success: false,
          message: "Une erreur est survenue. Veuillez réessayer."
        });
      }
    }
    setIsSubmitting(false);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "pt-16" }, /* @__PURE__ */ React.createElement("section", { className: "relative py-20 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-4xl md:text-5xl font-bold mb-6" }, "Parlons de votre projet"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-300 text-lg mb-8" }, "Une idée ? Un projet ? N'hésitez pas à me contacter pour en discuter. Je vous répondrai dans les plus brefs délais."), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-purple-600/20 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement(Mail, { className: "text-purple-400", size: 24 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold" }, "Email"), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "mailto:famoustechgroup@proton.me",
      className: "text-gray-300 hover:text-purple-400 transition-colors"
    },
    "famoustechgroup@proton.me"
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-purple-600/20 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement(Phone, { className: "text-purple-400", size: 24 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold" }, "Téléphone"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-300" }, "+509 44156629"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-purple-600/20 p-3 rounded-lg" }, /* @__PURE__ */ React.createElement(MapPin, { className: "text-purple-400", size: 24 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold" }, "Localisation"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-300" }, "Port-au-Prince, Haïti"))))), /* @__PURE__ */ React.createElement("div", { className: "bg-gray-800/50 p-8 rounded-2xl" }, /* @__PURE__ */ React.createElement("form", { className: "space-y-6", onSubmit: handleSubmit }, submitStatus.message && /* @__PURE__ */ React.createElement("div", { className: `p-4 rounded-lg ${submitStatus.success ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}` }, submitStatus.message), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "name", className: "block text-sm font-medium mb-2" }, "Nom"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      id: "name",
      value: formData.name,
      onChange: handleChange,
      className: "w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600",
      placeholder: "Votre nom",
      required: true
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "email", className: "block text-sm font-medium mb-2" }, "Email"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      id: "email",
      value: formData.email,
      onChange: handleChange,
      className: "w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600",
      placeholder: "votre@email.com",
      required: true
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "subject", className: "block text-sm font-medium mb-2" }, "Sujet"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      id: "subject",
      value: formData.subject,
      onChange: handleChange,
      className: "w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600",
      placeholder: "Sujet de votre message"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "message", className: "block text-sm font-medium mb-2" }, "Message"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      id: "message",
      rows: 4,
      value: formData.message,
      onChange: handleChange,
      className: "w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600",
      placeholder: "Votre message...",
      required: true
    }
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      disabled: isSubmitting,
      className: "w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
    },
    isSubmitting ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" }), "Envoi en cours...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Send, { size: 20 }), "Envoyer")
  )), /* @__PURE__ */ React.createElement("div", { className: "mt-6 text-center text-gray-400 flex items-center justify-center gap-2" }, /* @__PURE__ */ React.createElement(Clock, { size: 20 }), "Je réponds sous 24h maximum"))))), /* @__PURE__ */ React.createElement("section", { className: "py-20 px-4 bg-gray-900/50" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-3xl mx-auto" }, /* @__PURE__ */ React.createElement("h2", { className: "text-3xl font-bold text-center mb-12" }, "Questions Fréquentes"), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, [
    {
      question: "Comment se déroule une collaboration ?",
      answer: "Après notre premier contact, nous discutons de votre projet en détail. Je vous propose ensuite un devis et un planning précis."
    },
    {
      question: "Quels sont vos tarifs ?",
      answer: "Les tarifs varient selon la complexité et l'envergure du projet. Contactez-moi pour obtenir un devis personnalisé."
    },
    {
      question: "Combien de temps pour réaliser mon projet ?",
      answer: "Les délais dépendent de la nature du projet. Un site vitrine prend généralement entre 1-3 semaines, une application web plus complexe 1-2 mois."
    }
  ].map((faq, index) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: index,
      className: "bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800 transition-colors"
    },
    /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold mb-3" }, faq.question),
    /* @__PURE__ */ React.createElement("p", { className: "text-gray-300" }, faq.answer)
  ))))));
}
export {
  Contact as default
};
