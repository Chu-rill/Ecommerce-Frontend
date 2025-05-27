import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import CategoryCard from '../components/category/CategoryCard';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { Product } from '../types/Product';
import { Category } from '../types/Category';
import Carousel from '../components/ui/Carousel';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [featured, newProducts, popular, cats] = await Promise.all([
          productService.getProducts({ featured: true, limit: 4 }),
          productService.getProducts({ sort: 'createdAt', limit: 8 }),
          productService.getProducts({ sort: 'sold', limit: 4 }),
          categoryService.getCategories(),
        ]);
        
        setFeaturedProducts(featured.products);
        setNewArrivals(newProducts.products);
        setBestSellers(popular.products);
        setCategories(cats.slice(0, 6));
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Placeholder for hero carousel
  const heroSlides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: 'New Summer Collection',
      description: 'Check out our latest arrivals for the summer season.',
      link: '/categories/summer',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: 'Tech Gadgets Sale',
      description: 'Up to 40% off on select electronics.',
      link: '/categories/electronics',
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: 'Home Decor Collection',
      description: 'Transform your space with our home decor items.',
      link: '/categories/home',
    },
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <Carousel slides={heroSlides} />
      
      {/* Featured Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <Link
              to="/categories"
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View All
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {isLoading
              ? Array(6).fill(0).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-200 animate-pulse rounded-lg h-40"
                  />
                ))
              : categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link
              to="/products?featured=true"
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View All
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array(4).fill(0).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-200 animate-pulse rounded-lg h-80"
                  />
                ))
              : featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>
      
      {/* Promo Banner */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Summer Sale is On!</h2>
              <p className="text-blue-100 text-lg mb-6">
                Get up to 50% off on selected items. Limited time offer.
              </p>
              <Link
                to="/products?sale=true"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Shop Now
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Summer Sale"
                className="rounded-lg object-cover h-64 w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
            <Link
              to="/products?sort=newest"
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View All
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array(8).fill(0).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-200 animate-pulse rounded-lg h-80"
                  />
                ))
              : newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>
      
      {/* Best Sellers */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
            <Link
              to="/products?sort=popular"
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View All
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array(4).fill(0).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-200 animate-pulse rounded-lg h-80"
                  />
                ))
              : bestSellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">
                We ensure that all products meet our high quality standards before they reach you.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                We deliver your orders promptly to your doorstep without any delays.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Your payments are secure with our robust payment systems and encryption.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;