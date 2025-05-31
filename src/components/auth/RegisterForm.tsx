import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuthStore } from '../../store/authStore';
import { RegisterData } from '../../types';

const RegisterForm: React.FC = () => {
  const { register: registerUser, isLoading } = useAuthStore();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<RegisterData>();
  
  const password = watch('password');
  
  const onSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);
      toast.success('Registration successful! Please check your email for verification.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Failed to register');
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create an Account</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Join ShopHub and discover amazing products
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Full Name"
          leftIcon={<User className="h-5 w-5 text-gray-400" />}
          error={errors.name?.message}
          fullWidth
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          })}
        />
        
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
          helperText="Must be at least 8 characters with a number and special character"
          error={errors.password?.message}
          fullWidth
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
              message: 'Password must contain a number and special character',
            },
          })}
        />
        
        <Input
          label="Confirm Password"
          type="password"
          leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
          error={errors.confirmPassword?.message}
          fullWidth
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => 
              value === password || 'The passwords do not match',
          })}
        />
        
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            I agree to the{' '}
            <Link 
              to="/terms-of-service" 
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link 
              to="/privacy-policy" 
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          leftIcon={<UserPlus className="h-5 w-5" />}
          fullWidth
        >
          Create Account
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;