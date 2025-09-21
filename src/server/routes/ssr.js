const express = require("express");
const router = express.Router();
const { Renderer } = require("../utils/renderer");
const path = require("path");
const Resolver = require("../utils/resolver");

let robotsFile = path.resolve(__dirname, "../www/robots.txt");
let sitemapFile = path.resolve(__dirname, "../www/sitemap.xml");

const assets = new Resolver();

// Route catch-all for SSR
router.get("{/*splat}", async (req, res) => {
  try {
    const assets = new Resolver();

    // Validate URL
    if (!req.url || req.url.includes("..")) {
      return res.status(400).send("Invalid URL");
    }

    // Special rules
    if (req.url === "/robots.txt") {
      return res.status(200).sendFile(robotsFile);
    } else if (req.url.includes("sitemap.xml")) {
      return res.status(200).sendFile(sitemapFile);
    }

    // Default SSR rendering
    await new Renderer(req.url, res).renderToStream(req.url, res);
  } catch (error) {
    console.error("SSR Error:", error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Server Error</title>
      </head>
      <body>
        <h1>Internal Server Error</h1>
        <p>An error occurred while rendering the page.</p>
      </body>
      </html>
    `);
  }
});

module.exports = router;
