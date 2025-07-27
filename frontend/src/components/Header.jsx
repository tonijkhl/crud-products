import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';


function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          My Website
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={RouterLink} to="/" color="inherit">
            Home
          </Button>
          <Button component={RouterLink} to="/products" color="inherit">
            Products
          </Button>
          <Button color="inherit">
            New Product
          </Button>
          <Button component={RouterLink} to="/categories" color="inherit">
            Categories
          </Button>
          <Button component={RouterLink} to="/new-category" color="inherit">
            Add Category
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
