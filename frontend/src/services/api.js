import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getProducts = () => API.get('/read-products');
export const createProduct = (data) => API.post('/create-product', data);
export const updateProduct = (id, data) => API.put(`/update-product?id=${id}`, data);
export const deleteProduct = (id) => API.delete(`/delete-product?id=${id}`);
export const getProductCategories = () => API.get('/read-products-category');
export const createProductCategory = (data) => API.post('/create-category', data);
