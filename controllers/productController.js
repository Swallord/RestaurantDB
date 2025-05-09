// controllers/productController.js
const productService = require('../services/productService');

const registerProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const newProduct = await productService.createProduct(name, price, stock);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listAvailableProducts = async (req, res) => {
  try {
    const availableProducts = await productService.getAvailableProducts();
    res.status(200).json(availableProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerProduct,
  listAvailableProducts,
};