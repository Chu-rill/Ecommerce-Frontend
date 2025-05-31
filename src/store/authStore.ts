import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { authApi } from '../lib/api';
import { AuthState, LoginCredentials, RegisterData, User, UserRole } from '../types';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  checkAuth: () => boolean;
  isAdmin: () => boolean;
  isSeller: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(credentials);
          const { token, user } = response.data;
          
          set({ 
            token, 
            user, 
            isLoading: false,
            error: null 
          });
          
          return response.data;
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.message || 'Failed to login' 
          });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(data);
          return response.data;
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.message || 'Failed to register' 
          });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },

      checkAuth: () => {
        const { token } = get();
        if (!token) return false;
        
        try {
          const decoded: any = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          return decoded.exp > currentTime;
        } catch (error) {
          return false;
        }
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === UserRole.ADMIN;
      },

      isSeller: () => {
        const { user } = get();
        return user?.role === UserRole.SELLER;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);