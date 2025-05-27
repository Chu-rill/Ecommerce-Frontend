import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RootLayout from '../layouts/RootLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Public Pages
import Home from '../pages/Home';
import ProductDetail from '../pages/products/ProductDetail.tsx';
import ProductsPage from '../pages/products/ProductsPage';
import CategoryPage from '../pages/products/CategoryPage';

// User Pages
import Profile from '../pages/user/Profile';
import Orders from '../pages/user/Orders';
import Cart from '../pages/user/Cart';
import Checkout from '../pages/user/Checkout';
import Wishlist from '../pages/user/Wishlist';

// Seller Pages
import SellerDashboard from '../pages/seller/SellerDashboard';
import SellerProducts from '../pages/seller/SellerProducts';
import SellerOrders from '../pages/seller/SellerOrders';
import SellerAnalytics from '../pages/seller/SellerAnalytics';
import AddProduct from '../pages/seller/AddProduct';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminSellers from '../pages/admin/AdminSellers';
import AdminCategories from '../pages/admin/AdminCategories';

const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: string }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      
      {/* Main Routes */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="categories/:id" element={<CategoryPage />} />
        
        {/* User Routes */}
        <Route path="profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path="orders" element={
          <ProtectedRoute><Orders /></ProtectedRoute>
        } />
        <Route path="cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        <Route path="checkout" element={
          <ProtectedRoute><Checkout /></ProtectedRoute>
        } />
        <Route path="wishlist" element={
          <ProtectedRoute><Wishlist /></ProtectedRoute>
        } />
        
        {/* Seller Routes */}
        <Route path="seller" element={
          <ProtectedRoute requiredRole="seller"><DashboardLayout /></ProtectedRoute>
        }>
          <Route index element={<SellerDashboard />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="analytics" element={<SellerAnalytics />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="admin" element={
          <ProtectedRoute requiredRole="admin"><DashboardLayout /></ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="sellers" element={<AdminSellers />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;