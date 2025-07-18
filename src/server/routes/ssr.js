const express = require('express');
const router = express.Router();
const { renderPage } = require('../utils/renderer');
const path = require('path');
let robotsFile = path.resolve(__dirname + '/../www/robots.txt')
let sitemapFile = path.resolve(__dirname + '/../www/sitemap.xml')

// Route catch-all pour le SSR
router.get('{/*splat}', async (req, res) => {
  try {
    // Vérifier que l'URL est valide
    if (!req.url || req.url.includes('..')) {
      return res.status(400).send('Invalid URL');
    }
    else if (req.url === "/robots.txt" ){
     return res.status(200).sendFile(robotsFile)
    }
    else if (req.url.includes("sitemap.xml")){
      return res.status(200).sendFile(sitemapFile)
    }

    console.log('Rendering SSR for:', req.url);
    
    const html = await renderPage(req.url);
    res.send(html);
    
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

module.exports = router;