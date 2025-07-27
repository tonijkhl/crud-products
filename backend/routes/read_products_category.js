const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET /api/read-products-category
router.get('/read-products-category', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM category_view');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
