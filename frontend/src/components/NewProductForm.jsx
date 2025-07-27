import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Select, MenuItem,
  InputLabel, FormControl, Box, Typography,
} from '@mui/material';
import { getProductCategories, createProduct } from '../services/api';
import SnackbarAlert from './SnackbarAlert';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getProductCategories();
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem('user_id');

    if (!user_id) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Something went wrong. UserID not found in local storage.');
      setSnackbarOpen(true);

      return;
    }

    const newProduct = {
      product_name: productName,
      product_price: parseFloat(productPrice),
      product_description: productDescription,
      category_id: categoryId,
      user_id,
    };

    try {
      await createProduct(newProduct);

      setSnackbarSeverity('success');
      setSnackbarMessage('Product created successfully!');
      setSnackbarOpen(true);

      // Reset form fields
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setCategoryId('');
    } catch (err) {
      console.error('Failed to create product:', err);
      setSnackbarMessage('Error creating product');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, mx: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h5" component="h2">Add New Product</Typography>

      <TextField
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />

      <TextField
        label="Price"
        type="number"
        inputProps={{ step: '0.01' }}
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        required
      />

      <TextField
        label="Description"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        multiline
        rows={3}
      />

      <FormControl fullWidth required>
        <InputLabel>Category</InputLabel>
        <Select
          value={categoryId}
          label="Category"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Create Product
      </Button>

      <SnackbarAlert
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
};

export default AddProductForm;
