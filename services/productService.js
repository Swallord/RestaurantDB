// services/productService.js
const pool = require('../config/database');

const createProduct = async (name, price, stock) => {
  const query = 'INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *';
  const values = [name, price, stock];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

const getAvailableProducts = async () => {
  const query = 'SELECT id, name, price, stock FROM products WHERE stock > 0';
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching available products:', error);
    throw error;
  }
};

module.exports = {
  createProduct,
  getAvailableProducts,
};