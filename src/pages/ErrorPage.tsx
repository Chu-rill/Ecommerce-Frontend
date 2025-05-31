import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";

interface ErrorPageProps {
  code?: string;
  title?: string;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code = "404",
  title = "Page not found",
  message = "The page you're looking for doesn't exist or has been moved.",
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-800">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">
          {code}
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 max-w-md text-center z-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{message}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                leftIcon={<ArrowLeft className="h-5 w-5" />}
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
              <Button
                variant="primary"
                leftIcon={<Home className="h-5 w-5" />}
                onClick={() => navigate("/")}
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
