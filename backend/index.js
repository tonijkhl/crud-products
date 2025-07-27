const express = require('express');
const cors = require('cors');
const createUserRoute = require('./routes/create_user');
const loginRoute = require('./routes/login');
const createProductCategoryRoute = require('./routes/create_product_category');
const readProductsCategoryRoute = require('./routes/read_products_category')

const createProductRoute = require('./routes/create_product');
const readProductsRoute = require('./routes/read_products');
const updateProductRoute = require('./routes/update_product');
const deleteProductsRoute = require('./routes/delete_product');

require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware to enable CORS
app.use(cors({
  origin: 'http://127.0.0.1:5173',  // '*' it's for all origins
  credentials: false                // true for implementing cookies/auth headers
}));

// Middleware to parse JSON request bodies
app.use(express.json());

app.use('/api', createUserRoute);
app.use('/api', loginRoute);
app.use('/api', createProductCategoryRoute);
app.use('/api', readProductsCategoryRoute);

app.use('/api', createProductRoute);
app.use('/api', readProductsRoute);
app.use('/api', updateProductRoute);
app.use('/api', deleteProductsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});