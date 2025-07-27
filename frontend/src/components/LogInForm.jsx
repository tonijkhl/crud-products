import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { logIn } from '../services/api';
import SnackbarAlert from './SnackbarAlert';
import { useNavigate } from 'react-router-dom';

const LogInForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await logIn({ email, password });

      const { user_id } = res.data;
      localStorage.setItem('user_id', user_id);

      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      if (onLogin) onLogin(user_id);

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      console.error('Login failed:', err);
      setSnackbarMessage('Invalid credentials or server error');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ maxWidth: 400, mx: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h5">Login</Typography>

      <TextField
        label="Email"
        type="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" variant="contained" color="primary">
        Log In
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

export default LogInForm;
