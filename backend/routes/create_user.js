const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require('../db');

// POST /api/create-user
router.post('/create-user', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      `SELECT create_user($1, $2, $3, $4) AS user_id`,
      [firstName, lastName, email, hashedPassword]
    );

    res.status(201).json({
      message: 'User created successfully',
      userId: result.rows[0].user_id
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
