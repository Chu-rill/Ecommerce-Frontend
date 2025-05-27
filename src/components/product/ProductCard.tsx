import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
  };
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Added to wishlist!');
  };
  
  return (
    <Link
      to={`/products/${product.id}`}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
        {/* Product image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.images[0] || 'https://images.pexels.com/photos/4226866/pexels-photo-4226866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
          />
          
          {/* Sale badge */}
          {product.salePrice && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Sale
            </span>
          )}
          
          {/* Actions */}
          <div 
            className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center gap-2 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="bg-white p-2 rounded-full text-gray-800 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <ShoppingCart size={18} />
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-white p-2 rounded-full text-gray-800 hover:bg-red-500 hover:text-white transition-colors"
            >
              <Heart size={18} />
            </button>
          </div>
        </div>
        
        {/* Product info */}
        <div className="p-4">
          <h3 className="text-gray-700 font-medium truncate">{product.name}</h3>
          
          {/* Category */}
          <p className="text-gray-500 text-sm mb-2">{product.category}</p>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  fill={index < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  className={index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.numReviews})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              {product.salePrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-800 font-bold">${product.salePrice.toFixed(2)}</span>
                  <span className="text-gray-500 text-sm line-through">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-gray-800 font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {product.freeShipping && (
              <span className="text-green-600 text-xs">Free Shipping</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;