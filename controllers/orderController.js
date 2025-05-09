// controllers/orderController.js
const orderService = require('../services/orderService');

const createNewOrder = async (req, res) => {
  try {
    const { customerName, products } = req.body;
    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Products array is required and cannot be empty.' });
    }
    // Validate each product in the array
    for (const product of products) {
      if (!product.id || !Number.isInteger(product.id) || !product.quantity || !Number.isInteger(product.quantity) || product.quantity <= 0) {
        return res.status(400).json({ error: 'Each product in the order must have a valid id and quantity.' });
      }
    }

    const newOrder = await orderService.createOrder(customerName, products);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDetails = await orderService.getOrderDetails(id);
    if (!orderDetails) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewOrder,
  getOrderDetailsById,
};