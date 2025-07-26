const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// POST /api/create-category
router.post('/create-category', async (req, res) => {
  const { categoryName, categoryDescription } = req.body;

  if (!categoryName) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  try {
    const result = await pool.query(
      `SELECT create_product_category($1, $2) AS category_id`,
      [categoryName, categoryDescription || null]
    );

    res.status(201).json({
      message: 'Category created successfully',
      categoryId: result.rows[0].category_id
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      error: error.message || 'Database error'
    });
  }
});

module.exports = router;