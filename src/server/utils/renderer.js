const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const Getter = require('./resolver');

// Import du composant App
const App = require('../../client/App').default;

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
    return {
      scriptfile
    };
  } catch (error) {
    console.error('Erreur lors du chargement des assets:', error);
    return {
      scriptfile: '/js/bundle.js'
    };
  }
}

const getMetaData = (pageMeta, assets) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageMeta.title,
    description: pageMeta.description,
    url: pageMeta.url,
    publisher: {
      "@type": "Organization",
      name: "FAMOUS-TECH",
      logo: {
        "@type": "ImageObject",
        url: "https://www.famoustech.xyz/logo.png"
      }
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FAMOUS-TECH",
    url: "https://www.famoustech.xyz",
    logo: "https://www.famoustech.xyz/logo.png",
    description: "Famous-Tech est une entreprise de développement web et mobile en Haïti, spécialisée dans la création de solutions digitales innovantes.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Port-au-Prince",
      addressLocality: "Port-au-Prince",
      addressRegion: "Ouest",
      postalCode: "HT6110",
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
      availableLanguage: ["fr"]    },
    areaServed: {
      "@type": "Country",
      name: "Haiti"
    },
    foundingDate: "2023",
    founder: {
      "@type": "Person",
      name: "Famous-Tech"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FAMOUS-TECH - Solutions de développement web et mobile",
    description: "Transformez vos idées en solutions digitales innovantes avec Famous-Tech. Développement web, applications mobiles et stratégies digitales sur mesure en Haïti.",
    url: "https://www.famoustech.xyz",
    publisher: {
      "@type": "Organization",
      name: "FAMOUS-TECH",
      logo: {
        "@type": "ImageObject",
        url: "https://www.famoustech.xyz/logo.png"
      }
    }
  };

  return `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicons/icon.png" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="description" content="${pageMeta.description}" />
    <meta name="keywords" content="Famous-Tech, développement web Haïti, applications mobiles, solutions digitales" />
    <meta name="author" content="Famous-Tech" />
    <meta property="og:title" content="${pageMeta.title}" />
    <meta property="og:description" content="${pageMeta.description}" />
    <meta property="og:image" content="https://www.famoustech.xyz/logo.png" />
    <meta property="og:url" content="${pageMeta.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Famous-Tech" />
    <meta property="og:locale" content="fr_FR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageMeta.title}" />
    <meta name="twitter:description" content="${pageMeta.description}" />
    <meta name="twitter:image" content="https://www.famoustech.xyz/logo.png" />
    <meta name="twitter:creator" content="@famoustech_ht" />
    <title>${pageMeta.title}</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
    <link rel="manifest" href="/favicons/site.webmanifest" />
    <link rel="canonical" href="${pageMeta.url}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Structured Data JSON-LD -->
    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
    <script type="application/ld+json">${JSON.stringify(organizationData)}</script>
    <script type="application/ld+json">${JSON.stringify(websiteData)}</script>
  `;
};


const renderPage = async (url) => {
  try {
    const context = {};
    const assets = await getAssets();

    const appHTML = renderToString(
      React.createElement(StaticRouter, {
        location: url,
        context
      }, React.createElement(App))
    );

    if (context.url) {
      throw new Error(`Redirect to: ${context.url}`);
    }

    const pageMeta = getPageMeta(url);

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        ${getMetaData(pageMeta, assets)}
      </head>
      <body>
        <div id="root">${appHTML}</div>
        <script src="${assets.scriptfile}"></script>
      </body>
      </html>
    `;
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
