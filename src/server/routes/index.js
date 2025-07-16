const express = require('express');
const router = express.Router();

const healthRoutes = require('./health');
const ssrRoutes = require('./ssr');

// Routes spécifiques d'abord
router.use('/health', healthRoutes);

// Route catch-all pour le SSR
router.use('/', ssrRoutes);

module.exports = router;
