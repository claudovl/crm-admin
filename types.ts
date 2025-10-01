export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  registrationDate: string;
  totalSpent: number;
  lastOrderDate: string;
  status: 'Active' | 'Inactive' | 'Banned';
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'Published' | 'Draft' | 'Archived';
  dateAdded: string;
  imageUrl: string;
}

export interface Sale {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  productName: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

export type Page = 'dashboard' | 'customers' | 'catalog' | 'settings';