import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, User, Heart, ShoppingCart, Search, 
  Menu, X, ChevronDown, LogOut, Sun, Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'seller') return '/seller';
    return '/profile';
  };
  
  return (
    <header 
      className={`sticky top-0 z-10 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-800 shadow' 
          : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">ShopHub</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Products
            </Link>
            <div className="relative group">
              <button className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/categories/electronics" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Electronics
                </Link>
                <Link to="/categories/clothing" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Clothing
                </Link>
                <Link to="/categories/home" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Home & Kitchen
                </Link>
                <Link to="/categories/books" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Books
                </Link>
              </div>
            </div>
          </nav>
          
          {/* Search, Cart, User */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </form>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {isAuthenticated ? (
              <>
                <Link to="/wishlist" className="relative text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                  <Heart className="h-6 w-6" />
                </Link>
                <Link to="/cart" className="relative text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <div className="relative">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20">
                      <Link
                        to={getDashboardLink()}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="hidden md:inline-block px-4 py-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden md:inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-800 pt-16 md:hidden">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
            </form>
            
            <nav className="space-y-4">
              <Link
                to="/"
                className="block text-lg font-medium text-gray-700 dark:text-gray-200"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block text-lg font-medium text-gray-700 dark:text-gray-200"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <div className="py-2">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Categories</p>
                <div className="pl-4 space-y-2">
                  <Link
                    to="/categories/electronics"
                    className="block text-gray-600 dark:text-gray-400"
                    onClick={toggleMenu}
                  >
                    Electronics
                  </Link>
                  <Link
                    to="/categories/clothing"
                    className="block text-gray-600 dark:text-gray-400"
                    onClick={toggleMenu}
                  >
                    Clothing
                  </Link>
                  <Link
                    to="/categories/home"
                    className="block text-gray-600 dark:text-gray-400"
                    onClick={toggleMenu}
                  >
                    Home & Kitchen
                  </Link>
                  <Link
                    to="/categories/books"
                    className="block text-gray-600 dark:text-gray-400"
                    onClick={toggleMenu}
                  >
                    Books
                  </Link>
                </div>
              </div>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="block text-lg font-medium text-gray-700 dark:text-gray-200"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block text-lg font-medium text-gray-700 dark:text-gray-200"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block text-lg font-medium text-gray-700 dark:text-gray-200"
                    onClick={toggleMenu}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block text-lg font-medium text-gray-700 dark:text-gray-200"
                    onClick={toggleMenu}
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/cart"
                    className="block text-lg font-medium text-gray-700 dark:text-gray-200"
                    onClick={toggleMenu}
                  >
                    Cart
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="block text-lg font-medium text-red-600 dark:text-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="pt-4 flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="w-full py-2 text-center text-blue-600 dark:text-blue-400 font-medium border border-blue-600 dark:border-blue-400 rounded-lg"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full py-2 text-center bg-blue-600 text-white font-medium rounded-lg"
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;