export type UserRole = 'Admin' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  business_name: string;
  business_category: string;
  role: UserRole;
  plan: 'Free' | 'Pro' | 'Enterprise';
  avatar_url?: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  customer_name: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
  category: string;
  date: string;
  created_at: string;
}

export interface Product {
  id: string;
  user_id: string;
  name: string;
  sales_count: number;
  revenue: number;
  category: string;
}

export interface Analytic {
  id: string;
  user_id: string;
  month: string;
  revenue: number;
  orders: number;
  new_users: number;
}

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
}

export type BusinessCategory = 'E-commerce' | 'Restaurant' | 'Agency' | 'SaaS' | 'Retail' | 'Healthcare' | 'Freelancer';
