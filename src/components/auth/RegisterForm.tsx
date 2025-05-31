import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useAuthStore } from "../../store/authStore";
import { RegisterData } from "../../types";

const RegisterForm: React.FC = () => {
  const { register: registerUser, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);
      toast.success(
        "Registration successful! Please check your email for verification."
      );
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Failed to register");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create Your Account
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Join ShopHub and discover amazing products
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Full Name"
          className="h-10 text-white"
          leftIcon={<User className="h-5 w-5 text-gray-400" />}
          error={errors.name?.message}
          fullWidth
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />

        <Input
          label="Email Address"
          className="h-10 text-white"
          type="email"
          leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
          error={errors.email?.message}
          fullWidth
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email",
            },
          })}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            className="h-10 pr-12 text-white"
            leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
            helperText="Must be at least 6 characters with a number and special character"
            error={errors.password?.message}
            fullWidth
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-6 flex items-center justify-center h-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            className="h-10 pr-12 text-white"
            type={showConfirmPassword ? "text" : "password"}
            leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
            error={errors.confirmPassword?.message}
            fullWidth
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "The passwords do not match",
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-6 flex items-center justify-center h-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={toggleConfirmPasswordVisibility}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          leftIcon={<UserPlus className="h-5 w-5" />}
          fullWidth
          className="mt-6"
        >
          Create Account
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 hover:underline transition-colors"
          >
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
