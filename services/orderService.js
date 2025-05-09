const pool = require('../config/database');

const createOrder = async (customerName, products) => {
  try {
    await pool.query('BEGIN');

    let totalOrder = 0;
    const validatedProducts = [];

    for (const product of products) {
      // Get price from DB
      const priceResult = await pool.query('SELECT price, stock FROM products WHERE id = $1', [product.id]);
      if (priceResult.rows.length === 0) {
        throw new Error(`Product with ID ${product.id} not found.`);
      }

      const { price, stock } = priceResult.rows[0];

      if (stock < product.quantity) {
        throw new Error(`Insufficient stock for product ID ${product.id}.`);
      }

      const subtotal = price * product.quantity;
      totalOrder += subtotal;

      validatedProducts.push({
        id: product.id,
        quantity: product.quantity,
        price,
        subtotal
      });
    }

    const orderQuery = 'INSERT INTO orders (customer_name, total) VALUES ($1, $2) RETURNING id, created_at';
    const orderValues = [customerName, totalOrder];
    const orderResult = await pool.query(orderQuery, orderValues);
    const orderId = orderResult.rows[0].id;
    const createdAt = orderResult.rows[0].created_at;

    const orderItemsQuery = 'INSERT INTO order_items (order_id, product_id, quantity, subtotal) VALUES ($1, $2, $3, $4)';
    for (const product of validatedProducts) {
      const orderItemsValues = [orderId, product.id, product.quantity, product.subtotal];
      await pool.query(orderItemsQuery, orderItemsValues);

      const updateStockQuery = 'UPDATE products SET stock = stock - $1 WHERE id = $2';
      const updateStockValues = [product.quantity, product.id];
      await pool.query(updateStockQuery, updateStockValues);
    }

    await pool.query('COMMIT');
    return {
      id: orderId,
      customer_name: customerName,
      total: totalOrder,
      created_at: createdAt,
      items: validatedProducts.map(p => ({
        product_id: p.id,
        quantity: p.quantity,
        subtotal: p.subtotal
      }))
    };
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error creating order:', error);
    throw error;
  }
};

module.exports = {
  createOrder,
  // You'll need to add the getOrderDetails function here as well
  getOrderDetails: async (orderId) => {
    try {
      const orderResult = await pool.query('SELECT id, customer_name, total, created_at FROM orders WHERE id = $1', [orderId]);
      if (orderResult.rows.length === 0) {
        return null; // Order not found
      }
      const order = orderResult.rows[0];

      const orderItemsResult = await pool.query(
        'SELECT oi.product_id, p.name, oi.quantity, oi.subtotal ' +
        'FROM order_items oi ' +
        'JOIN products p ON oi.product_id = p.id ' +
        'WHERE oi.order_id = $1',
        [orderId]
      );
      order.items = orderItemsResult.rows;

      return order;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },
};