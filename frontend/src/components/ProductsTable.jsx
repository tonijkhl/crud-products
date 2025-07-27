import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, updateProduct } from '../services/api';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField
} from '@mui/material';

function ProductsTable() {
  const [products, setProducts] = useState([]);

  // Dialog state
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    product_name: '',
    product_price: '',
    product_description: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(deleteId);
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error('Error deleting product:', err);
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };


  const handleOpenUpdateDialog = (product) => {
    setCurrentProduct(product);
    setFormValues({
      product_name: product.product_name,
      product_price: product.product_price,
      product_description: product.product_description,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async () => {
    try {
      console.log('Updating product with:', currentProduct.product_id, formValues);
      await updateProduct(currentProduct.product_id, {
        product_name: formValues.product_name,
        product_price: parseFloat(formValues.product_price),
        product_description: formValues.product_description,
      });
      fetchProducts();
      handleClose();
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ p: 2 }}>Product List</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Price ($)</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No products found.</TableCell>
              </TableRow>
            ) : (
              products.map(product => (
                <TableRow key={product.product_id}>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.product_price}</TableCell>
                  <TableCell>{product.product_description}</TableCell>
                  <TableCell>{product.category_name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleOpenUpdateDialog(product)}
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(product.product_id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Product Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="product_name"
            value={formValues.product_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="product_price"
            type="number"
            value={formValues.product_price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="product_description"
            value={formValues.product_description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleCancel}>
        <DialogTitle>
          Are you sure you want to delete this product?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="outlined">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductsTable;
