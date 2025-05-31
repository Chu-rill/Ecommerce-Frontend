import axios from "axios";

// Create an axios instance with default configuration
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://recapify.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    // Return a standardized error object
    return Promise.reject({
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default api;

// Auth endpoints
export const authApi = {
  register: (data: any) => api.post("/api/v1/auth/signup", data),
  login: (data: any) => api.post("/api/v1/auth/login", data),
  validateOtp: (data: any) => api.post("/api/v1/auth/validate-otp", data),
  requestPasswordReset: (data: any) =>
    api.post("/api/v1/auth/reset-password", data),
  confirmPasswordReset: (data: any) =>
    api.post("/api/v1/auth/confirm-reset", data),
  subscribeNewsletter: (data: any) => api.post("/api/v1/auth/newsletter", data),
};

// User endpoints
export const userApi = {
  getAll: () => api.get("/api/v1/users"),
  getById: (id: string) => api.get(`/api/v1/users/${id}`),
  update: (id: string, data: any) => api.put(`/api/v1/users/${id}`, data),
  delete: (id: string) => api.delete(`/api/v1/users/${id}`),
  uploadProfilePicture: (data: FormData) =>
    api.post("/api/v1/users/upload-profile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// Product endpoints
export const productApi = {
  getAll: (params?: any) => api.get("/api/v1/products", { params }),
  getById: (id: string) => api.get(`/api/v1/products/${id}`),
  create: (data: any) => api.post("/api/v1/products", data),
  update: (id: string, data: any) => api.put(`/api/v1/products/${id}`, data),
  delete: (id: string) => api.delete(`/api/v1/products/${id}`),
  uploadImages: (data: FormData) =>
    api.post("/api/v1/products/upload-images", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// Category endpoints
export const categoryApi = {
  getAll: () => api.get("/api/v1/categories"),
  getById: (id: string) => api.get(`/api/v1/categories/${id}`),
  create: (data: any) => api.post("/api/v1/categories", data),
  update: (id: string, data: any) => api.put(`/api/v1/categories/${id}`, data),
  delete: (id: string) => api.delete(`/api/v1/categories/${id}`),
};

// Cart endpoints
export const cartApi = {
  getAll: () => api.get("/api/v1/carts"),
  getById: (id: string) => api.get(`/api/v1/carts/${id}`),
  create: (data: any) => api.post("/api/v1/carts", data),
  addItem: (data: any) => api.post("/api/v1/carts/item", data),
  update: (cartId: string, data: any) =>
    api.put(`/api/v1/carts/${cartId}`, data),
  delete: (id: string) => api.delete(`/api/v1/carts/${id}`),
  removeItem: (id: string) => api.delete(`/api/v1/carts/item/${id}`),
  clear: (id: string) => api.delete(`/api/v1/carts/clear/${id}`),
};

// Admin endpoints
export const adminApi = {
  blockUser: (data: any) => api.post("/api/v1/admin/block-user", data),
  unblockUser: (data: any) => api.post("/api/v1/admin/unblock-user", data),
  deleteUser: (data: any) => api.post("/api/v1/admin/delete-user", data),
  approveProduct: (data: any) =>
    api.post("/api/v1/admin/approve-product", data),
  approveSeller: (data: any) => api.post("/api/v1/admin/approve-seller", data),
  getUnapprovedProducts: () => api.get("/api/v1/admin/products"),
};

// Seller endpoints
export const sellerApi = {
  createSellerAccount: (data: any) => api.post("/api/v1/seller", data),
};
