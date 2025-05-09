// routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/orders', orderController.createNewOrder);
router.get('/orders/:id', orderController.getOrderDetailsById);

module.exports = router;