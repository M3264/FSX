import React, { useState } from 'react';
import { Send, Clock, Mail, Phone, MapPin } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        success: false,
        message: 'Veuillez remplir tous les champs obligatoires.'
      });
      return;
    }

    setIsSubmitting(true);
    
    // Vérification si nous sommes côté client
    if (typeof window !== 'undefined') {
      try {
        // Pour l'instant, simuler l'envoi (vous ajouterez l'API plus tard)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Réinitialiser le formulaire après succès
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setSubmitStatus({
          success: true,
          message: 'Votre message a été envoyé avec succès !'
        });
      } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        setSubmitStatus({
          success: false,
          message: 'Une erreur est survenue. Veuillez réessayer.'
        });
      }
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Parlons de votre projet
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                Une idée ? Un projet ? N'hésitez pas à me contacter pour en discuter. Je vous répondrai dans les plus brefs délais.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <Mail className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href="mailto:famoustechgroup@proton.me"
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      famoustechgroup@proton.me
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <Phone className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Téléphone</h3>
                    <p className="text-gray-300">+509 44156629</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <MapPin className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Localisation</h3>
                    <p className="text-gray-300">Port-au-Prince, Haïti</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-2xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {submitStatus.message && (
                  <div className={`p-4 rounded-lg ${submitStatus.success ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                    {submitStatus.message}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Nom</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Sujet de votre message"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Votre message..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Envoyer
                    </>
                  )}
                </button>
              </form>
              <div className="mt-6 text-center text-gray-400 flex items-center justify-center gap-2">
                <Clock size={20} />
                Je réponds sous 24h maximum
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Questions Fréquentes
          </h2>
          <div className="space-y-6">
            {[
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
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;