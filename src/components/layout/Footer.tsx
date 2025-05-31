import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ShoppingBag
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                ShopHub
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your one-stop destination for all your shopping needs with the best deals and quality products.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                aria-label="Facebook"
                className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                aria-label="Instagram"
                className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                aria-label="YouTube"
                className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/products" 
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories" 
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link 
                  to="/deals" 
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  Hot Deals
                </Link>
              </li>
              <li>
                <Link 
                  to="/new-arrivals" 
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link 
                  to="/become-seller" 
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link 
                  to="/shipping" 
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns" 
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link 
                  to="/track-order" 
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">
                  123 Commerce Street, Shopping District, CA 90210
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">
                  support@shophub.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Stay updated with the latest products, offers, and news.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/privacy-policy" 
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service" 
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 text-sm"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 text-sm"
              >
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;