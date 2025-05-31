import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, TrendingUp, Gift, Truck } from 'lucide-react';
import { productApi, categoryApi } from '../lib/api';
import ProductGrid from '../components/products/ProductGrid';
import Button from '../components/ui/Button';
import { Category, Product } from '../types';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      try {
        // Fetch featured products (sorting by highest rated)
        const featuredResponse = await productApi.getAll({ 
          sort: 'ratings',
          order: 'desc',
          limit: 8 
        });
        setFeaturedProducts(featuredResponse.data.products);
        
        // Fetch new arrivals (sorting by newest)
        const newArrivalsResponse = await productApi.getAll({ 
          sort: 'createdAt',
          order: 'desc',
          limit: 8 
        });
        setNewArrivals(newArrivalsResponse.data.products);
        
        // Fetch categories
        const categoriesResponse = await categoryApi.getAll();
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHomeData();
  }, []);
  
  // Sample hero images
  const heroImage = 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroImage} 
            alt="Shopping experience"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover Amazing Products for Your Lifestyle
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Shop the latest trends with incredible deals and exclusive offers.
              Your one-stop destination for all your shopping needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button 
                  variant="primary" 
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Shop Now
                </Button>
              </Link>
              <Link to="/categories">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Shop by Category
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Explore our wide range of categories and find exactly what you need
              </p>
            </div>
            <Link to="/categories" className="mt-4 md:mt-0">
              <Button 
                variant="outline"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                View All Categories
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex flex-col items-center animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                </div>
              ))
            ) : (
              // If categories are available, show them
              categories.slice(0, 6).map((category) => (
                <Link 
                  key={category.id}
                  to={`/categories/${category.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex flex-col items-center transition-transform hover:scale-105"
                >
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-16 h-16 object-cover rounded-full mb-4"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                      <ShoppingBag className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                    </div>
                  )}
                  <h3 className="text-center font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our most popular products based on sales and customer ratings
              </p>
            </div>
            <Link to="/products" className="mt-4 md:mt-0">
              <Button 
                variant="outline"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                View All Products
              </Button>
            </Link>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            isLoading={isLoading} 
            emptyMessage="No featured products found"
          />
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-primary-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Why Shop With Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with these amazing benefits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Free shipping on all orders over $50. We deliver to your doorstep with care.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quality Products</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We ensure that all products meet the highest quality standards before listing.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure Payments</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your payment information is always secure. We use industry-leading encryption.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Exclusive Deals</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get access to exclusive deals and promotions available only to our customers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                New Arrivals
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                The latest additions to our product catalog
              </p>
            </div>
            <Link to="/new-arrivals" className="mt-4 md:mt-0">
              <Button 
                variant="outline"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                View All New Arrivals
              </Button>
            </Link>
          </div>
          
          <ProductGrid 
            products={newArrivals} 
            isLoading={isLoading} 
            emptyMessage="No new arrivals found"
          />
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-primary-100 mb-8">
              Stay updated with the latest products, exclusive offers, and promotions. 
              Get special discounts available only to our subscribers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                required
              />
              <Button 
                type="submit" 
                className="bg-white text-primary-600 hover:bg-primary-50 px-6"
              >
                Subscribe
              </Button>
            </form>
            <p className="mt-4 text-sm text-primary-200">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;