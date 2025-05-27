import api from './apiService';
import { Category } from '../types/Category';

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/api/v1/categories');
    return response.data;
  },
  
  getCategoryById: async (id: string): Promise<Category> => {
    const response = await api.get(`/api/v1/categories/${id}`);
    return response.data;
  },
  
  createCategory: async (categoryData: Partial<Category>): Promise<Category> => {
    const response = await api.post('/api/v1/categories', categoryData);
    return response.data;
  },
  
  updateCategory: async (id: string, categoryData: Partial<Category>): Promise<Category> => {
    const response = await api.put(`/api/v1/categories/${id}`, categoryData);
    return response.data;
  },
  
  deleteCategory: async (id: string): Promise<void> => {
    await api.delete(`/api/v1/categories/${id}`);
  },
};