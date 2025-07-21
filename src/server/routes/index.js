const express = require('express');
const router = express.Router();

const healthRoutes = require('./health');
const ssrRoutes = require('./ssr');
const cacheRoutes = require('./cache')

// Routes spécifiques d'abord
router.use('/health', healthRoutes);

router.use('/cache', cacheRoutes)

// Route catch-all pour le SSR
router.use('/', ssrRoutes);

module.exports = router;
