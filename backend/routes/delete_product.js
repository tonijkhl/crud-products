const express = require('express'); 
const router = express.Router();
const { pool } = require('../db');

// DELETE /api/delete-product?id=example-uuid
router.delete('/delete-product', async (req, res) => {
  const productId = req.query.id; // product id as a query in parameter

  if (!productId) {
    return res.status(400).json({ error: 'Missing product ID in query' });
  }

  try {
    await pool.query('SELECT delete_product($1)', [productId]);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
