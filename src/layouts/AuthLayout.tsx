import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 justify-center items-center">
        <div className="max-w-md text-white">
          <ShoppingBag className="h-16 w-16 mb-8" />
          <h1 className="text-4xl font-bold mb-6">Welcome to ShopHub</h1>
          <p className="text-xl mb-6">Your one-stop destination for all your shopping needs.</p>
          <p className="text-blue-200">Join thousands of users shopping with confidence and convenience.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ShopHub</span>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;