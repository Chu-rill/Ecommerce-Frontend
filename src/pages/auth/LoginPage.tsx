import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import { ShoppingBag, Clock, Truck, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 flex items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden max-w-5xl mx-auto bg-white dark:bg-gray-900">
          {/* Left Column - Brand and Welcome */}
          <div className="lg:w-1/2 relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800"></div>

            {/* Decorative geometric shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 -translate-x-16"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 translate-x-24"></div>
              <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-white/15 rounded-full"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center text-white">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <ShoppingBag className="h-10 w-10" />
                </div>
                <span className="ml-3 text-3xl font-bold">ShopHub</span>
              </div>

              <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
              <p className="text-lg mb-8 leading-relaxed max-w-md">
                Sign in to access your account, track orders, and enjoy a
                personalized shopping experience.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-left">
                  <Clock className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="text-sm">Quick and easy checkout</span>
                </div>
                <div className="flex items-center text-left">
                  <Truck className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="text-sm">
                    Track your orders in real-time
                  </span>
                </div>
                <div className="flex items-center text-left">
                  <Heart className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="text-sm">Save your favorite items</span>
                </div>
              </div>

              <p className="text-sm opacity-90">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium underline hover:no-underline transition-all"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="lg:w-1/2 bg-white dark:bg-gray-900 p-8 md:p-12">
            <div className="lg:hidden flex items-center justify-center mb-8">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-full">
                <ShoppingBag className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                ShopHub
              </span>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
