import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuthStore } from '../../store/authStore';
import { LoginCredentials } from '../../types';

const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginCredentials>();
  
  const onSubmit = async (data: LoginCredentials) => {
    try {
      await login(data);
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Sign in to your account to continue
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
          error={errors.email?.message}
          fullWidth
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Please enter a valid email',
            },
          })}
        />
        
        <Input
          label="Password"
          type="password"
          leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
          error={errors.password?.message}
          fullWidth
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>
          
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Forgot password?
          </Link>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          leftIcon={<LogIn className="h-5 w-5" />}
          fullWidth
        >
          Sign In
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;