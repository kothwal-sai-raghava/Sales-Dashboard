// routes/analytics.js
const express = require('express');
const router = express.Router();
const { aggregateRevenue, regionStats, topProducts, topCustomers } = require('../controllers/analytics');

router.get('/revenue', aggregateRevenue);
router.get('/region-stats', regionStats);
router.get('/top-products', topProducts);
router.get('/top-customers', topCustomers);

module.exports = router;