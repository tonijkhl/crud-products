const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// POST /api/create-product
router.post('/create-product', async (req, res) => {
  const {
    product_name,
    product_price,
    category_id,
    user_id,
    product_description // optional
  } = req.body;

  // Basic input validation
  if (!product_name || !product_price || !category_id || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `SELECT create_product($1, $2, $3, $4, $5) AS product_id`,
      [product_name, product_price, category_id, user_id, product_description || null]
    );

    const newProductId = result.rows[0].product_id;
    res.status(201).json({ message: 'Product created', product_id: newProductId });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
