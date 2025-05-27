import api from './apiService';
import { Cart, CartItem } from '../types/Cart';
import { Product } from '../types/Product';

export const cartService = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get('/api/v1/carts');
    return response.data;
  },
  
  addToCart: async (productId: string, quantity: number): Promise<Cart> => {
    const response = await api.post('/api/v1/carts/item', { productId, quantity });
    return response.data;
  },
  
  removeFromCart: async (itemId: string): Promise<Cart> => {
    const response = await api.delete(`/api/v1/carts/item/${itemId}`);
    return response.data;
  },
  
  updateCartItemQuantity: async (itemId: string, quantity: number): Promise<Cart> => {
    const response = await api.put(`/api/v1/carts/${itemId}`, { quantity });
    return response.data;
  },
  
  clearCart: async (): Promise<void> => {
    await api.delete('/api/v1/carts/clear');
  },
  
  // For guest cart functionality
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/api/v1/products/${id}`);
    return response.data;
  },
};