import { supabase } from './supabase';
import { BusinessCategory } from './types';

const CATEGORY_DATA: Record<BusinessCategory, { products: string[], customers: string[] }> = {
  'Restaurant': {
    products: ["Biryani", "Burger", "Pizza", "BBQ Platter", "Chai Latte"],
    customers: ["Ahmed", "Sara", "Bilal", "Fatima", "Usman"]
  },
  'E-commerce': {
    products: ["Running Shoes", "Leather Bag", "Smart Watch", "Headphones", "Jacket"],
    customers: ["John", "Emma", "Liam", "Olivia", "Noah"]
  },
  'Agency': {
    products: ["SEO Package", "Web Design", "Logo Design", "Social Media", "Google Ads"],
    customers: ["TechCorp", "CreativeHub", "StartupX", "GlobalSolutions", "MediaFlow"]
  },
  'SaaS': {
    products: ["Starter Plan", "Pro Plan", "Enterprise", "API Access", "White Label"],
    customers: ["DevStudio", "CloudSystems", "DataInsight", "NextGen", "AlphaStream"]
  },
  'Retail': {
    products: ["Electronics", "Clothing", "Furniture", "Groceries", "Sports Gear"],
    customers: ["Mike", "Sophie", "David", "Anna", "Tom"]
  },
  'Healthcare': {
    products: ["Consultation", "Lab Tests", "Physiotherapy", "X-Ray", "Ultrasound"],
    customers: ["Alice", "Bob", "Charlie", "Diana", "Edward"]
  },
  'Freelancer': {
    products: ["Website Dev", "Mobile App", "UI/UX Design", "Copywriting", "Branding"],
    customers: ["Client A", "Client B", "Client C", "Client D", "Client E"]
  }
};

export async function seedUserData(userId: string, category: BusinessCategory) {
  const data = CATEGORY_DATA[category];
  
  // 1. Seed Products
  const products = data.products.map(name => ({
    user_id: userId,
    name,
    sales_count: Math.floor(Math.random() * 100),
    revenue: Math.floor(Math.random() * 5000) + 1000,
    category: 'General'
  }));
  await supabase.from('sb_products').insert(products);

  // 2. Seed Transactions
  const transactions = Array.from({ length: 20 }).map((_, i) => {
    const amount = Math.floor(Math.random() * 500) + 50;
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      user_id: userId,
      customer_name: data.customers[Math.floor(Math.random() * data.customers.length)],
      amount,
      status: ['Paid', 'Pending', 'Failed'][Math.floor(Math.random() * 3)],
      category: data.products[Math.floor(Math.random() * data.products.length)],
      date: date.toISOString().split('T')[0]
    };
  });
  await supabase.from('sb_transactions').insert(transactions);

  // 3. Seed Analytics (Last 6 months)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const analytics = months.map(month => ({
    user_id: userId,
    month,
    revenue: Math.floor(Math.random() * 10000) + 5000,
    orders: Math.floor(Math.random() * 200) + 50,
    new_users: Math.floor(Math.random() * 50) + 10
  }));
  await supabase.from('sb_analytics').insert(analytics);

  // 4. Seed Notifications
  const notifications = [
    { user_id: userId, message: 'Welcome to your dashboard!', type: 'info' },
    { user_id: userId, message: 'Your first data seed is complete.', type: 'success' },
    { user_id: userId, message: 'Check out the analytics tab for insights.', type: 'info' }
  ];
  await supabase.from('sb_notifications').insert(notifications);
}
