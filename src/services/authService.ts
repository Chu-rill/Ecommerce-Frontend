import api from './apiService';
import { User } from '../types/User';

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/api/v1/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: Partial<User>): Promise<AuthResponse> => {
    const response = await api.post('/api/v1/auth/signup', userData);
    return response.data;
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/api/v1/users/profile');
    return response.data;
  },
  
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put(`/api/v1/users/${userData.id}`, userData);
    return response.data;
  },
  
  requestPasswordReset: async (email: string): Promise<void> => {
    await api.post('/api/v1/auth/reset-password', { email });
  },
  
  confirmPasswordReset: async (token: string, password: string): Promise<void> => {
    await api.post('/api/v1/auth/confirm-reset', { token, password });
  },
  
  uploadProfileImage: async (formData: FormData): Promise<{ imageUrl: string }> => {
    const response = await api.post('/api/v1/users/upload-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};