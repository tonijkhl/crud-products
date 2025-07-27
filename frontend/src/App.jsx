import { Container } from "@mui/material";
import Header from "./components/Header";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import NewCategoryForm from './pages/NewCategoryPage';
import ProductsPage from './pages/ProductsPage';
function App() {

  return (
    <Router>
      <Container sx={{ bgcolor: 'tomato', height: '100vh'}}>
        <Header />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/new-category" element={<NewCategoryForm />} />
          {/* Define your routes here  */}
        </Routes>
      </Container>
    </Router>
  );
}
export default App;