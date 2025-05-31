import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Product } from '../../types';
import { formatCurrency, truncateText } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isLoading } = useCartStore();
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await addToCart(product, 1);
      toast.success(`Added ${product.name} to cart`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to add item to cart');
    }
  };
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`Added ${product.name} to wishlist`);
    // Implement wishlist functionality
  };
  
  // Default image if no images are available
  const productImage = product.images && product.images.length > 0
    ? product.images[0]
    : 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=600';
  
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="block relative pb-[100%] overflow-hidden">
        <img
          src={productImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleAddToWishlist}
            className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 shadow-md transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
          <span>{product.category.name}</span>
        </div>
        
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {truncateText(product.name, 60)}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center text-warning-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{product.ratings.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            ({product.numReviews} reviews)
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatCurrency(product.price)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;