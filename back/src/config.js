
const API_BASE_URL_PRODUCT = "http://localhost:8085"; 

export { API_BASE_URL_PRODUCT };

import axios from 'axios';
import { API_BASE_URL_PRODUCT } from './config';

// Fonction pour obtenir la liste des produits
export function fetchProducts() {
  return axios.get(`${API_BASE_URL_PRODUCT}/products`);
}

// Fonction pour créer un nouveau produit
export function createProduct(productData) {
  return axios.post(`${API_BASE_URL_PRODUCT}/products`, productData);
}

// Fonction pour mettre à jour un produit existant
export function updateProduct(productId, productData) {
  return axios.put(`${API_BASE_URL_PRODUCT}/products/${productId}`, productData);
}

// Fonction pour supprimer un produit
export function deleteProduct(productId) {
  return axios.delete(`${API_BASE_URL_PRODUCT}/products/${productId}`);
}
