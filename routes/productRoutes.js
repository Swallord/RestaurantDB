// routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/products', productController.registerProduct);
router.get('/products/available', productController.listAvailableProducts);

module.exports = router;