import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartService } from '../services/cartService';
import { CartItem } from '../types/Cart';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCart();
    } else {
      // Handle guest cart from localStorage
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        const parsedCart = JSON.parse(guestCart);
        setCartItems(parsedCart);
        calculateTotals(parsedCart);
      } else {
        setCartItems([]);
        setTotalItems(0);
        setTotalPrice(0);
      }
    }
  }, [isAuthenticated, user]);
  
  const fetchCart = async () => {
    try {
      const cart = await cartService.getCart();
      setCartItems(cart.items);
      calculateTotals(cart.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load your cart');
    }
  };
  
  const calculateTotals = (items: CartItem[]) => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const price = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    
    setTotalItems(itemCount);
    setTotalPrice(price);
  };
  
  const addToCart = async (productId: string, quantity: number) => {
    try {
      if (isAuthenticated) {
        const updatedCart = await cartService.addToCart(productId, quantity);
        setCartItems(updatedCart.items);
        calculateTotals(updatedCart.items);
      } else {
        // Handle guest cart
        const product = await cartService.getProductById(productId);
        const newItem: CartItem = {
          id: Date.now().toString(),
          product,
          quantity,
        };
        
        const updatedCart = [...cartItems, newItem];
        setCartItems(updatedCart);
        calculateTotals(updatedCart);
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      }
      
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };
  
  const removeFromCart = async (itemId: string) => {
    try {
      if (isAuthenticated) {
        const updatedCart = await cartService.removeFromCart(itemId);
        setCartItems(updatedCart.items);
        calculateTotals(updatedCart.items);
      } else {
        // Handle guest cart
        const updatedCart = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCart);
        calculateTotals(updatedCart);
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      }
      
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };
  
  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      if (quantity < 1) {
        return removeFromCart(itemId);
      }
      
      if (isAuthenticated) {
        const updatedCart = await cartService.updateCartItemQuantity(itemId, quantity);
        setCartItems(updatedCart.items);
        calculateTotals(updatedCart.items);
      } else {
        // Handle guest cart
        const updatedCart = cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        setCartItems(updatedCart);
        calculateTotals(updatedCart);
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };
  
  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await cartService.clearCart();
      } else {
        localStorage.removeItem('guestCart');
      }
      
      setCartItems([]);
      setTotalItems(0);
      setTotalPrice(0);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};