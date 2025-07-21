const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const Getter = require('./resolver');
const { getMetaData  } = require('./headers.html.js');
const { createClient } = require('redis');




// Import du composant App
const App = require('../../client/App').default;

// startRedis();

// Configuration des meta données par page

const pageMetaData = {
  '/': {
    title: 'FAMOUS-TECH - Solutions Digitales Innovantes en Haïti',
    description: 'Famous-Tech - Votre partenaire de confiance pour le développement web et mobile en Haïti. Transformez vos idées en solutions digitales.',
    url: 'https://www.famoustech.xyz'
  },
  '/services': {
    title: 'Nos Services - FAMOUS-TECH',
    description: 'Découvrez nos services de développement web, applications mobiles, et solutions digitales sur mesure en Haïti.',
    url: 'https://www.famoustech.xyz/services'
  },
  '/about': {
    title: 'À Propos - FAMOUS-TECH',
    description: 'Apprenez-en plus sur Famous-Tech, votre équipe de développement digital en Haïti.',
    url: 'https://www.famoustech.xyz/about'
  },
  '/contact': {
    title: 'Contactez-nous - FAMOUS-TECH',
    description: 'Contactez Famous-Tech pour vos projets de développement web et mobile en Haïti.',
    url: 'https://www.famoustech.xyz/contact'
  },
  '/portfolio': {
    title: 'Portfolio de  FAMOUS-TECH',
    description: 'Découvrez nos réalisations et projets en développement web et mobile.',
    url: 'https://www.famoustech.xyz/portfolio'
  }
};


const getPageMeta = (path) => {
  const cleanPath = path.split('?')[0].split('#')[0];
  return pageMetaData[cleanPath] || pageMetaData['/'];
};

async function getAssets() {
  try {
    const scriptfile = await Getter.GetManifest();
    const stylesfile = await Getter.GetCSS();
    return {
      scriptfile,
      stylesfile
    };
  } catch (error) {
    console.error('Erreur lors du chargement des assets:', error);
    return {
      scriptfile: '/js/bundle.js'
    };
  }
}

async function SetCache(url, cachekey, fullHTML){
  try {
     const redis = createClient(); 
     await redis.connect();
    await redis.setEx(cachekey, 604800, fullHTML);
    console.log(`CACHE SET SUCCESFULLY FOR route : ${url}`)
  
} catch(error){
  console.warn(`WARNING, Cache wasn't set correctly, we got this error : ${error}`)
}}


const renderPage = async (url) => {
  try {
    const redis = createClient(); // Default it's localhost:6379, so i don't need to add custom Settings like PG, It's so coooool.
    await redis.connect();
    const context = {};
    const cachekey = `SSR:${url}`
    const assets = await getAssets();
    const cachedHTML = await redis.get(cachekey)

    let appHTML = ""

    if (cachedHTML){
        appHTML = cachedHTML

      console.log(`Used cache for ${url}`)
        return appHTML;
    }

     appHTML = renderToString(
      React.createElement(StaticRouter, {
        location: url,
        context
      }, React.createElement(App))
    );

    if (context.url) {
      throw new Error(`Redirect to: ${context.url}`);
    }

    const pageMeta = getPageMeta(url);
    var fullHTML = `
    <!DOCTYPE html>
      <html lang="fr-HT">
      <head>
        ${getMetaData(pageMeta, assets)}
      </head>
      <body>
        <div id="root">${appHTML}</div>
        <script src="${assets.scriptfile}" defer></script>
      </body>
      </html>
      `
     
      await SetCache(url, cachekey, fullHTML);
      
      return fullHTML;
      

  } catch (error) {
    console.error('Erreur lors du rendu de la page:', error);

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Erreur - FAMOUS-TECH</title>
      </head>
      <body>
        <div id="root">
          <h1>Une erreur s'est produite</h1>
          <p>Veuillez réessayer plus tard.</p>
        </div>
      </body>
      </html>
    `;
  }
};

module.exports = { renderPage };
