const React = require("react");
const { renderToString } = require("react-dom/server");
const { StaticRouter } = require("react-router-dom");
const { renderToPipeableStream } = require("react-dom/server");
const Resolver = require("./resolver");
const { getMetaData } = require("./headers.html.js");
const redis = require("./redis.js");

// --- Meta Data ---
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

// --- Redis cache helper ---
async function SetCache(url, cachekey, fullHTML) {
  try {
    await redis.setEx(cachekey, 60 * 60 * 24, fullHTML); // 1 jour
    console.log(`CACHE SET SUCCESSFULLY for route : ${url}`);
  } catch (error) {
    console.warn(
      `WARNING, Cache wasn't set correctly, got error : ${error}`
    );
  }
}

class Renderer {
  constructor(url, res, method) {
    this.url = url;
    this.res = res;
    this.method = method
  }

  
  async renderPage(method){
    if (!method){
      throw new Error("method is required, make sure to use the method parameter while calling the Renderer Method ")
    }
    if (method.match("stream")){
      await this._renderToStream(this.url, this.res)
    }
    else if(method.match("string")) {
      await this._renderToString(this.url)
    }
  }


  /*
  The _getPageKey function is designed for a development use only
  You will have to edit this for each new page
  NOTICE : it's only used in the renderToPieapableStream method,
  as each pages will have their one JavaScript file after the build process

  */
  async _getPageKey(url){
    const keys = {
      "/": "../pages/Home.tsx",
      "/contact": "../pages/Contact.tsx",
      "/projects": "../pages/Projects.tsx",
      "/services": "../pages/Services.tsx",
      "/about": "../pages/About.tsx"
    }
    // console.log(url)
    return keys[url] || null;
  }
  async _loadApp() {
    
    const mod = await import("../../../dist/server/entry-server.mjs"); // This might possibly change depending on your project structure
    return mod.default; 
  }

  /* WARNING :
    renderToString function will NOT work
    if you are using React.Lazy and Suspense in your React project.
    That's why FSX uses by default a Stream based Server Side Rendering
    for compatibility & Performance.
    Feel free to change the "method" parameter in `src/server/routes/ssr.js`
    As FSX uses renderToPipeableStream by default, we highly recommend to use it
    Because _renderToString may not work as excepted
  */
  async _renderToString(url) {
    try {
      const context = {};
      const cachekey = `SSR:${url}`;
      const assets = new Resolver();
      const cssFile = await assets.getCSS();
      const jsFile = await assets.getSingleBundle(); 
      const cachedHTML = await redis.get(cachekey);

      if (cachedHTML) {
        console.log(`Used cache for ${url}`);
        return cachedHTML;
      }

      const EntryServer = await this._loadApp();

      const appHTML = renderToString(
        React.createElement(
          StaticRouter,
          { location: url, context },
          React.createElement(EntryServer, { url })
        )
      );

      if (context.url) {
        console.warn(`Request was redirected to: ${context.url}`);
        return;
      }

      const pageMeta = getPageMeta(url);
      const fullHTML = `
      <!DOCTYPE html>
      <html lang="fr-HT">
      <head>
        <link rel="stylesheet" href="${cssFile}">
        ${getMetaData(pageMeta)}
      </head>
      <body>
        <div id="root">${appHTML}</div>
        <script src="${jsFile}" defer></script>
      </body>
      </html>
      `;

      await SetCache(url, cachekey, fullHTML);

      return fullHTML;
    } catch (error) {
      console.error("Error rendering the page", error);
      return `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Error- FSX RENDERING FAILED</title>
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

  async _renderToStream(url, res) {
    try {
      const context = {};
      let pageKey = await this._getPageKey(url)
      const assets = new Resolver();
      const pageMeta = getPageMeta(url);
      const cssFile = await assets.getCSS();
      const jsFiles = await assets.getChunksPerPage(pageKey);
      
      if (!jsFiles) {
        console.error(`No JS files found for page key: ${pageKey}`);
        return res.status(404).send('Page not found');
      }
      
      const scriptFiles = [...jsFiles].map(f => `<script type="module" src="/dist/${f}" defer></script>`).join("\n")

      const EntryServer = await this._loadApp();

      const { pipe } = renderToPipeableStream(
        React.createElement(
          StaticRouter,
          { location: url, context },
          React.createElement(EntryServer, { url })
        ),
        {
          onShellReady() {
            if (res.writableEnded) return;
            res.setHeader("content-type", "text/html; charset=utf-8");
            res.write(`<!DOCTYPE html>
              <html lang="fr-HT">
              <head>
                <link rel="stylesheet" href="/dist/${cssFile}" />
                ${getMetaData(pageMeta)}
              </head>
              <body>
                <div id="root">`);
            pipe(res);
          },
          onAllReady() {
            if (res.writableEnded) return;
            res.write(`</div>
              ${scriptFiles}
              </body>
              </html>`);
            res.end();
          },
          onError(error) {
            console.error('Streaming error:', error);
            if (!res.headersSent) {
              res.status(500).send('Internal Server Error');
            }
          }
        }
      );
    } catch (error) {
      console.error(`ERROR WHILE STREAMING THE PAGE : ${error}`);
      if (!res.headersSent) {
        res.status(500).send('Internal Server Error');
      }
    }
  }
}

module.exports = { Renderer };
