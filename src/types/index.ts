// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  USER = 'user',
  SELLER = 'seller',
  ADMIN = 'admin',
}

// Authentication types
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface ConfirmResetData {
  token: string;
  password: string;
  confirmPassword: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  categoryId: string;
  seller: User;
  sellerId: string;
  stock: number;
  ratings: number;
  numReviews: number;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  products: Product[];
  page: number;
  pages: number;
  count: number;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: 'price' | 'createdAt' | 'ratings';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Category types
export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Cart types
export interface CartItem {
  id: string;
  product: Product;
  productId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  user: User;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

// Order types
export interface Order {
  id: string;
  user: User;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentResult {
  id: string;
  status: string;
  updateTime: string;
  emailAddress: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

// Review types
export interface Review {
  id: string;
  user: User;
  userId: string;
  product: Product;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}