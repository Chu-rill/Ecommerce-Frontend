export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  categoryId: string;
  stock: number;
  images: string[];
  brand: string;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  freeShipping: boolean;
  sellerId: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}