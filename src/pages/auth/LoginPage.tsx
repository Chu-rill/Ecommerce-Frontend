import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden max-w-5xl mx-auto">
          {/* Left Column - Image and Brand */}
          <div className="lg:w-1/2 relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800"></div>
            <img
              src="https://images.pexels.com/photos/5632382/pexels-photo-5632382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Shopping"
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
              <div className="flex items-center mb-4">
                <ShoppingBag className="h-10 w-10" />
                <span className="ml-2 text-3xl font-bold">ShopHub</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
              <p className="mb-6">
                Sign in to access your account, track orders, and enjoy a personalized shopping experience.
              </p>
              <p className="text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium underline">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
          
          {/* Right Column - Login Form */}
          <div className="lg:w-1/2 bg-white dark:bg-gray-900 p-8 md:p-12">
            <div className="lg:hidden flex items-center justify-center mb-8">
              <ShoppingBag className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">ShopHub</span>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;