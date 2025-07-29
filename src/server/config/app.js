const express = require('express');
const errorHandler = require('../middleware/errorHandler');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const redis = require('../utils/redis'); // Assure-toi que c'est bien un client connecté

let cacheOptions = {
  maxAge: '2y',
  etag: false
};

const app = express();

// Sécurité
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'", 
      "https://cdn.tailwindcss.com", 
      "https://googletagmanager.com", 
      "https://www.google-analytics.com", 
      "https://www.gstatic.com"
    ],
    imgSrc: [
      "'self'", 
      "data:", 
      "https://unsplash.com", 
      "https://images.unsplash.com", 
      "https://files.catbox.moe", 
      "https://media.istockphoto.com", 
      "https://cdn.famoustech.xyz"
    ],
    styleSrc: [
      "'self'", 
      "'unsafe-inline'", 
      "https://cdn.tailwindcss.com"
    ],
    fontSrc: ["'self'"]
  }
}));

app.use(compression());

// Middleware Redis Cache
async function redisImageCache(req, res, next) {
  try {
    const key = `IMG:${req.originalUrl}`;
    const cached = await redis.get(key);
    if (cached) {
      console.log(`[CACHE-HIT] ${key}`);
      res.setHeader('Content-Type', 'image/*');
      return res.end(Buffer.from(cached, 'base64'));
    }
    
    // capture response to cache
    const originalSend = res.send.bind(res);
    res.send = (body) => {
      if (res.get('Content-Type')?.startsWith('image')) {
        redis.set(key, body.toString('base64'), { EX: 60 * 60 * 24 }); // 1 jour
        console.log(`[CACHE-SET] ${key}`);
      }
      return originalSend(body);
    };
    
    next();
  } catch (error) {
    console.error('[REDIS-CACHE-ERROR]', error);
    next(); // fail silently
  }
}

// Appliquer le cache Redis avant de servir les images
app.use('/images', redisImageCache);
app.use('/favicons', redisImageCache);

// Serve images after the middleware correctly set caches
app.use('/assets', express.static(path.join(__dirname, '../../client/public/assets/assets'), cacheOptions));
app.use('/favicons', express.static(path.join(__dirname, '../images/favicons'), cacheOptions));
app.use('/images', express.static(path.join(__dirname, '../images'), cacheOptions));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Autres fichiers statiques
app.use(express.static('/www'));
app.use(express.static('public'));
app.use(express.static('dist/client'));

// Gestion des erreurs
app.use(errorHandler);

module.exports = app;
