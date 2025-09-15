const React = require("react");
const { renderToString } = require("react-dom/server");
const { StaticRouter } = require("react-router-dom");
import { renderToPipeableStream } from "react-dom/server";
const Resolver = require("./resolver");
const { getMetaData } = require("./headers.html.js");
// const { createClient } = require('redis');
const redis = require("./redis.js");

// Import du composant App
const App = require("../../client/App").default;

// Configuration des meta données par page

const pageMetaData = {
  "/": {
    title: "FAMOUS-TECH - Solutions Digitales Innovantes en Haïti",
    description:
      "Famous-Tech - Votre partenaire de confiance pour le développement web et mobile en Haïti. Transformez vos idées en solutions digitales.",
    url: "https://www.famoustech.xyz",
  },
  "/services": {
    title: "Nos Services - FAMOUS-TECH",
    description:
      "Découvrez nos services de développement web, applications mobiles, et solutions digitales sur mesure en Haïti.",
    url: "https://www.famoustech.xyz/services",
  },
  "/about": {
    title: "À Propos - FAMOUS-TECH",
    description:
      "Apprenez-en plus sur Famous-Tech, votre équipe de développement digital en Haïti.",
    url: "https://www.famoustech.xyz/about",
  },
  "/contact": {
    title: "Contactez-nous - FAMOUS-TECH",
    description:
      "Contactez Famous-Tech pour vos projets de développement web et mobile en Haïti.",
    url: "https://www.famoustech.xyz/contact",
  },
  "/portfolio": {
    title: "Portfolio de  FAMOUS-TECH",
    description:
      "Découvrez nos réalisations et projets en développement web et mobile.",
    url: "https://www.famoustech.xyz/portfolio",
  },
};

const getPageMeta = (path) => {
  const cleanPath = path.split("?")[0].split("#")[0];
  return pageMetaData[cleanPath] || pageMetaData["/"];
};

async function SetCache(url, cachekey, fullHTML) {
  try {
    await redis.setEx(cachekey, 604800, fullHTML);
    console.log(`CACHE SET SUCCESFULLY FOR route : ${url}`);
  } catch (error) {
    console.warn(
      `WARNING, Cache wasn't set correctly, we got this error : ${error}`
    );
  }
}

class Renderer {
  constructor(url, res) {
    this.url = url;
    this.res = res;
  }

  async renderToString(url) {
    try {
      const context = {};
      const cachekey = `SSR:${url}`;
      const assets = new Resolver();
      const cssFile = assets.getCSS();
      const jsFile = assets.getBundle();
      const cachedHTML = await redis.get(cachekey);

      let appHTML = "";

      if (cachedHTML) {
        appHTML = cachedHTML;

        console.log(`Used cache for ${url}`);
        return appHTML;
      }

      appHTML = renderToString(
        React.createElement(
          StaticRouter,
          {
            location: url,
            context,
          },
          React.createElement(App)
        )
      );

      if (context.url) {
        console.warn(`Request was Redirected to: ${context.url}`);
        return;
      }

      const pageMeta = getPageMeta(url);
      var fullHTML = `
      <!DOCTYPE html>
        <html lang="fr-HT">
        <head>
      <!-- <style src="${cssFile}></style> -->
          ${getMetaData(pageMeta)}
        </head>
        <body>
          <div id="root">${appHTML}</div>
          <script src="${jsFile}" defer></script>
        </body>
        </html>
        `;

      await SetCache(url, cachekey, fullHTML), { EX: 60 * 60 * 24 }; // Now it's 1 day for each SSR page

      return fullHTML;
    } catch (error) {
      console.error("Error rendering the page", error);

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
  }

  async renderToStream(url, res) {
    try {
      const context = {};
      const assets = new Resolver();
      const pageMeta = getPageMeta(url);
      const cssFile = await assets.getCSS();
      const jsFile = await assets.getBundle();
      const { pipe } = renderToPipeableStream(
        React.createElement(
          StaticRouter,
          { location: url, context },
          React.createElement(App)
        ),
        {
          onShellReady() {
            res.setHeader("content-type", "text/html; charset=utf-8");
            res.write(`<!DOCTYPE html>
              <html lang="fr-HT">
              <head>
                <link rel="stylesheet" href="${cssFile}" />
                ${getMetaData(pageMeta)}
              </head>
              <body>
                <div id="root">`);

            pipe(res);
            res.write(`</div>
              <script src="${jsFile}" defer></script>
              </body>
              </html>`);

            res.end();
          },
        }
      );
    } catch (error) {
      console.error(`ERROR WHILE STREAMING THE PAGE : ${error}`);
    }
  }
}

module.exports = { Renderer };
