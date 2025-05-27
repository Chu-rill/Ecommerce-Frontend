export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'seller' | 'user';
  isVerified: boolean;
  isActive: boolean;
  phone?: string;
  address?: Address;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}