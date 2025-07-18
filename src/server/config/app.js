const express = require('express');
const errorHandler = require('../middleware/errorHandler');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet')

let cacheOptions = {
  maxAge: '2y',
  etag: false,
  
}


const app = express();


app.use(helmet())
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://cdn.tailwindcss.com", "unsafe-inline", "https://googletagmanager.com", "https://www.google-analytics.com", "https://www.gstatic.com"],
    imgSrc: ["'self'", "data:", "https://unsplash.com", "https://images.unsplash.com", "https://files.catbox.moe", "https://cdn.famoustech.xyz" ], // I will create a CDN in future
    styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
    fontSrc: ["'self'"]
  }
}))
app.use(compression())

// server my assets and favicons
app.use('/assets', require('express').static(path.join(__dirname, '../../client/public/assets/assets'), cacheOptions));
app.use('/favicons', require('express').static(path.join(__dirname, '../server/images/favicons'), cacheOptions));


// Middleware pour parser JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static('/www'));
app.use(express.static('public'));
app.use('/images', require('express').static(path.join(__dirname, '../images'), cacheOptions));
app.use(express.static('dist/client'));


app.use(errorHandler);

module.exports = app;
