import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartApi } from '../lib/api';
import { Cart, CartItem, Product } from '../types';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

interface CartStore extends CartState {
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartItemsCount: () => number;
  getCartTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      error: null,

      fetchCart: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartApi.getById(userId);
          set({ cart: response.data, isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          // If cart doesn't exist, create a new one
          if (error.status === 404) {
            try {
              const createResponse = await cartApi.create({ userId });
              set({ cart: createResponse.data, isLoading: false, error: null });
            } catch (createError: any) {
              set({ isLoading: false, error: createError.message });
            }
          }
        }
      },

      addToCart: async (product, quantity) => {
        set({ isLoading: true, error: null });
        try {
          const { cart } = get();
          if (!cart) throw new Error('Cart not found');
          
          const response = await cartApi.addItem({
            cartId: cart.id,
            productId: product.id,
            quantity
          });
          
          set({ cart: response.data, isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      removeFromCart: async (itemId) => {
        set({ isLoading: true, error: null });
        try {
          await cartApi.removeItem(itemId);
          
          // Update local cart state after successful removal
          const { cart } = get();
          if (cart) {
            const updatedItems = cart.items.filter(item => item.id !== itemId);
            const updatedTotalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
            const updatedTotalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            set({
              cart: {
                ...cart,
                items: updatedItems,
                totalItems: updatedTotalItems,
                totalPrice: updatedTotalPrice
              },
              isLoading: false
            });
          }
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      updateQuantity: async (itemId, quantity) => {
        set({ isLoading: true, error: null });
        try {
          const { cart } = get();
          if (!cart) throw new Error('Cart not found');
          
          // Find the item to update
          const itemToUpdate = cart.items.find(item => item.id === itemId);
          if (!itemToUpdate) throw new Error('Item not found in cart');
          
          // Update the cart with the new quantity
          const response = await cartApi.update(cart.id, {
            items: cart.items.map(item => 
              item.id === itemId 
                ? { ...item, quantity } 
                : item
            )
          });
          
          set({ cart: response.data, isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const { cart } = get();
          if (!cart) throw new Error('Cart not found');
          
          await cartApi.clear(cart.id);
          set({ 
            cart: { ...cart, items: [], totalItems: 0, totalPrice: 0 },
            isLoading: false
          });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      getCartItemsCount: () => {
        const { cart } = get();
        if (!cart) return 0;
        return cart.totalItems;
      },

      getCartTotal: () => {
        const { cart } = get();
        if (!cart) return 0;
        return cart.totalPrice;
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);