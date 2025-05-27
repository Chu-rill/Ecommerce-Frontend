import api from './apiService';
import { Product } from '../types/Product';

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ProductQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}

export const productService = {
  getProducts: async (params: ProductQueryParams = {}): Promise<ProductsResponse> => {
    const response = await api.get('/api/v1/products', { params });
    return response.data;
  },
  
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/api/v1/products/${id}`);
    return response.data;
  },
  
  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    const response = await api.post('/api/v1/products', productData);
    return response.data;
  },
  
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/api/v1/products/${id}`, productData);
    return response.data;
  },
  
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/api/v1/products/${id}`);
  },
  
  uploadProductImages: async (formData: FormData): Promise<{ urls: string[] }> => {
    const response = await api.post('/api/v1/products/upload-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getProductReviews: async (productId: string): Promise<any[]> => {
    const response = await api.get(`/api/v1/products/${productId}/reviews`);
    return response.data;
  },
  
  addProductReview: async (productId: string, reviewData: any): Promise<any> => {
    const response = await api.post(`/api/v1/products/${productId}/reviews`, reviewData);
    return response.data;
  },
};