import { Container } from "@mui/material";
import Header from "./components/Header";
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import NewCategoryPage from './pages/NewCategoryPage';
import ProductsPage from './pages/ProductsPage';
import NewProductPage from './pages/NewProductPage';
import LogInPage from "./pages/LogInPage";

function App() {

  return (
    <Router>
      <Container sx={{ bgcolor: '#fffff', height: '100vh'}}>
        <Header />
        <Routes>
          <Route path="/" element={<Typography 
                            variant="h2" component="div">
                            Home Page
                          </Typography>} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/new-product" element={<NewProductPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/new-category" element={<NewCategoryPage />} />
          <Route path="/log-in" element={<LogInPage />} />
          {/* Define your routes here  */}
        </Routes>
      </Container>
    </Router>
  );
}
export default App;