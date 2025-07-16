import { Code2, Database, Server, Cpu, Globe, Rocket } from 'lucide-react';
import React from "react"

function About() {
  const skills = [
    { name: 'React', icon: <Code2 size={24} />, level: '50%' },
    { name: 'Node.js', icon: <Server size={24} />, level: '90%' },
    { name: 'PostgreSQL', icon: <Database size={24} />, level: '85%' },
    { name: 'Docker', icon: <Cpu size={24} />, level: '40%' },
    { name: 'Three.js', icon: <Globe size={24} />, level: '50%' },
    { name: 'CI/CD', icon: <Rocket size={24} />, level: '55%' }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Texte à gauche */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Développeur Web Passionné
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Je m'appelle <strong>Azor Wollden's Habby-Shaï</strong>, connu en ligne sous le nom <strong>FAMOUS-TECH</strong>. Je suis un jeune développeur web haïtien passionné par la technologie, spécialisé dans la création de sites vitrines, d’API performantes et de solutions numériques sur mesure. Ma mission : concevoir des expériences utilisateur fluides, modernes et centrées sur les besoins réels des utilisateurs. J’aide les particuliers et petites entreprises à bâtir leur présence en ligne de manière simple, élégante et efficace.
              </p>
              <div className="space-y-4 text-gray-300">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  +3 ans d'expérience en développement web
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Spécialiste en Backend Node.js
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Passionné par les nouvelles technologies et l’innovation
                </p>
              </div>
              <p className="text-center mt-8 italic text-gray-400">— FAMOUS-TECH</p>
            </div>

            {/* Image à droite */}
            <div className="relative flex justify-center">
              <img
                src="/images/portrait.png"
                alt="Portrait de Azor Wollden's Habby-Shaï - FAMOUS-TECH"
                className="rounded-2xl shadow-2xl object-cover max-h-[500px] w-auto mx-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Compétences Techniques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-purple-400 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-600 transition-all duration-1000 ease-out group-hover:opacity-100 opacity-80"
                    style={{ width: skill.level }}
                  ></div>
                </div>
                <p className="text-right mt-2 text-sm text-gray-400">{skill.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Parcours Professionnel
          </h2>
          <div className="space-y-12">
            {[
              {
                year: '2024',
                title: 'Finalisation de mon apprentissage en Node.js',
                description: 'Création de solutions web sur mesure pour des clients internationaux'
              },
              {
                year: '2023',
                title: 'Développeur Front-end',
                description: "Développement d'interfaces utilisateur modernes avec React"
              },
              {
                year: '2023',
                title: 'Développeur Junior',
                description: 'Premiers pas dans le développement web professionnel'
              }
            ].map((experience, index) => (
              <div key={index} className="relative pl-8 md:pl-0">
                <div className="md:grid md:grid-cols-5 md:gap-8">
                  <div className="md:col-span-1 flex items-center md:justify-end">
                    <div className="text-purple-400 font-bold">{experience.year}</div>
                  </div>
                  <div className="md:col-span-4">
                    <div className="bg-gray-800/50 p-6 rounded-xl relative">
                      <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-8 h-[2px] bg-purple-400 hidden md:block"></div>
                      <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
                      <p className="text-gray-300">{experience.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;