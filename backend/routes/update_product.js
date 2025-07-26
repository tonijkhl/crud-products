const express = require('express'); 
const router = express.Router();
const { pool } = require('../db');

// PUT /api/update-products?id=example-uuid
router.put('/update-product', async (req, res) => {
  const productId = req.query.id;
  const {
    product_name,
    product_price,
    product_description,
    category_id,
    user_id
  } = req.body;

  // Validate input
  if (
    !productId ||
    !product_name || 
    !product_price || 
    !category_id || 
    !user_id
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await pool.query(
      'SELECT update_product($1, $2, $3, $4, $5, $6)',
      [
        productId,
        product_name,
        product_price,
        product_description || null,
        category_id,
        user_id
      ]
    );

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;