const express = require('express');
const router = express.Router();

const healthRoutes = require('./health');
const ssrRoutes = require('./ssr');


router.use('/health', healthRoutes);

// Catch all route for the SSR
router.use('/', ssrRoutes);

module.exports = router;
