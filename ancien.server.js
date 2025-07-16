// First BIIIIG Project i made at without vibe coding
// But i was in obligation to fix conflicts using chatGPT because it's the first time i use Nodejs simple and React with Typescript in a single project.
require('esbuild-register/dist/node').register();
require('dotenv').config();
const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const Getter   = require('./resolver');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser JSON (si vous ajoutez des APIs plus tard)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static('public'));
app.use(express.static('dist/client'));

// Import du composant App
const App = require('../client/App').default;

// Routes spécifiques d'abord (pour éviter le conflit avec le catch-all)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});


const scriptFile = Getter.GetManifest()
// Route catch-all pour le SSR (doit être la dernière)
app.get('/', (req, res) => {
  try {
    // Vérifier que l'URL est valide
    if (!req.url || req.url.includes('..')) {
      return res.status(400).send('Invalid URL');
    }

    console.log('Rendering SSR for:', req.url);
    
    const context = {};
    
    const appHTML = renderToString(
      React.createElement(StaticRouter, { 
        location: req.url, 
        context 
      }, React.createElement(App))
    );

    // Vérifier si StaticRouter a détecté une redirection
    if (context.url) {
      return res.redirect(301, context.url);
    }

    const metaData = `
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="description" content="Famous-Tech - Votre partenaire de confiance pour le développement web et mobile en Haïti..." />
      <meta name="keywords" content="Famous-Tech, développement web Haïti..." />
      <meta name="author" content="Famous-Tech" />
      <meta name="geo.region" content="HT" />
      <meta name="geo.placename" content="Port-au-Prince" />
      <meta name="geo.position" content="18.5944;-72.3074" />
      <meta name="ICBM" content="18.5944, -72.3074" />
      <meta property="og:title" content="FAMOUS-TECH - Solutions Digitales Innovantes en Haïti" />
      <meta property="og:description" content="Transformez vos idées en solutions digitales..." />
      <meta property="og:image" content="https://www.famoustech.xyz/logo.png" />
      <meta property="og:url" content="https://www.famoustech.xyz" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="FAMOUS-TECH - Solutions Digitales Innovantes en Haïti" />
      <meta name="twitter:description" content="Transformez vos idées en solutions digitales..." />
      <meta name="twitter:image" content="https://www.famoustech.xyz/logo.png" />
      <title>FAMOUS-TECH - Développement Web & Mobile</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="canonical" href="https://www.famoustech.xyz" />
      <script src="https://cdn.tailwindcss.com"></script>
    `;

    const fullHTML = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        ${metaData}
      </head>
      <body>
        <div id="root">${appHTML}</div>
        <script src=${scriptFile} ></script>
      </body>
      </html>
    `;
    // console.log(appHTML)
    res.send(fullHTML);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <title>Erreur</title>
      </head>
      <body>
        <h1>Erreur du serveur</h1>
        <p>Une erreur est survenue lors du rendu de la page.</p>
      </body>
      </html>
    `);
  }
});


app.listen(PORT, () => {
  console.log(`✅ SSR server is running on http://localhost:${PORT}`);
});