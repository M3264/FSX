const express = require('express');
const errorHandler = require('../middleware/errorHandler');
const path = require('path');
let cacheOptions = {
  maxAge: '2y',
  etag: false
}


const app = express();
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
