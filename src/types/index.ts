export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'client' | 'admin' | 'technicien' | 'manager';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  description: string;
  technicalDetails?: string;
  features: string[];
  images: string[];
  stock: number;
  rating?: number;
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  price: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'en_attente' | 'confirmée' | 'en_préparation' | 'expédiée' | 'livrée';
  totalPrice: number;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface TechnicalRequest {
  id: string;
  userId: string;
  serviceId: string;
  description: string;
  status: 'en_attente' | 'assignée' | 'en_cours' | 'terminée';
  technicianId?: string;
  appointmentDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  subCategories?: Category[];
}

export interface ProductFilters {
  category?: string;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}