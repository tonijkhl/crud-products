import { initializeDatabase } from './db.js';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
