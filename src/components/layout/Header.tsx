import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  LogOut,
  Heart,
  ShoppingBag
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useThemeStore } from '../../store/themeStore';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { getCartItemsCount } = useCartStore();
  const { theme, setTheme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Listen for scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Toggle theme between light/dark
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const cartItemsCount = getCartItemsCount();
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              ShopHub
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
              Products
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
              Categories
            </Link>
            {user?.role === 'seller' && (
              <Link to="/seller/dashboard" className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                Seller Dashboard
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                Admin Dashboard
              </Link>
            )}
          </nav>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button 
              aria-label="Search"
              className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {/* Wishlist */}
            <Link 
              to="/wishlist"
              aria-label="Wishlist"
              className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
            >
              <Heart className="h-5 w-5" />
            </Link>
            
            {/* Cart */}
            <Link 
              to="/cart"
              aria-label="Shopping Cart"
              className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {/* Auth Actions */}
            {user ? (
              <div className="relative hidden md:block">
                <Link to="/profile" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.name}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg absolute top-full left-0 right-0 border-t border-gray-200 dark:border-gray-800 animate-slide-down">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="py-2 text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                Home
              </Link>
              <Link to="/products" className="py-2 text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                Products
              </Link>
              <Link to="/categories" className="py-2 text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                Categories
              </Link>
              {user?.role === 'seller' && (
                <Link to="/seller/dashboard" className="py-2 text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                  Seller Dashboard
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link to="/admin/dashboard" className="py-2 text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                  Admin Dashboard
                </Link>
              )}
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {user ? (
                  <>
                    <Link to="/profile\" className="py-2 flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                      <User className="mr-2 h-5 w-5" /> My Profile
                    </Link>
                    <button 
                      onClick={logout}
                      className="py-2 w-full flex items-center text-left text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                    >
                      <LogOut className="mr-2 h-5 w-5" /> Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/login" className="w-full">
                      <Button variant="outline" fullWidth>
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" className="w-full">
                      <Button variant="primary" fullWidth>
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;