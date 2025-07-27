import { useState } from 'react';
import { createProductCategory } from '../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import SnackbarAlert from './SnackbarAlert';

function NewCategoryForm() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProductCategory({
        categoryName,
        categoryDescription,
      });

      setCategoryName('');
      setCategoryDescription('');
      setSnackbarMessage('Category created successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error creating category:', error);
      setSnackbarMessage('Failed to create category.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: 'white',
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5" align="center">
        Create New Category
      </Typography>

      <TextField
        label="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
        fullWidth
      />

      <TextField
        label="Category Description"
        value={categoryDescription}
        onChange={(e) => setCategoryDescription(e.target.value)}
        multiline
        rows={3}
        fullWidth
      />

      <Button variant="contained" type="submit" color="primary">
        Create Category
      </Button>

      <SnackbarAlert
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
}

export default NewCategoryForm;
