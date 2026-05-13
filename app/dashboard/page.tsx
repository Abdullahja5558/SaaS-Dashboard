"use client";

import { useUser } from "@/hooks/useUser";
import DashboardLayout from "@/components/layout/DashboardLayout";
import KPICard from "@/components/ui/KPICard";
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import { useSupabaseData } from "@/hooks/useSupabase";
import { Transaction, Analytic, Product } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";

export default function DashboardPage() {
  const { user } = useUser();
  const { data: transactions, loading: transLoading } = useSupabaseData<Transaction>('sb_transactions', user?.id);
  const { data: analytics, loading: analyticsLoading } = useSupabaseData<Analytic>('sb_analytics', user?.id);
  const { data: products, loading: productsLoading } = useSupabaseData<Product>('sb_products', user?.id);

  if (!user) return null;

  const totalRevenue = transactions?.reduce((acc, curr) => acc + (curr.status === 'Paid' ? Number(curr.amount) : 0), 0) || 0;
  const totalOrders = transactions?.length || 0;
  const totalProducts = products?.length || 0;

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <div className="space-y-6 md:space-y-10 pb-24 md:pb-32">
      {/* Welcome Section - Premium Header */}
      <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-foreground p-6 md:p-16 text-background group">
        <div className="absolute top-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-primary/20 blur-[60px] md:blur-[100px] rounded-full -mr-20 md:-mr-40 -mt-20 md:-mt-40 group-hover:bg-primary/30 transition-colors" />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          <h1 className="text-3xl md:text-6xl font-display font-black tracking-tighter leading-tight">
            Welcome back, <br className="sm:hidden" /><span className="text-primary italic">{user.name.split(' ')[0]}</span>.
          </h1>
          <p className="text-sm md:text-xl text-background/60 mt-3 md:mt-4 max-w-xl font-medium leading-relaxed">
            Your business, <span className="text-white font-bold">{user.business_name}</span>, is summarized below. 
            {totalOrders > 0 && <span> We've processed {totalOrders} events recently.</span>}
          </p>
        </motion.div>
      </div>

      {/* KPI Grid - Responsive Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <KPICard
          title="Net Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          trend={12.4}
          data={analytics.length > 0 ? analytics.map(a => ({ value: a.revenue })) : [{value: 0}, {value: 0}, {value: 0}]}
          icon={<DollarSign size={24} />}
          color="primary"
        />
        <KPICard
          title="Total Volume"
          value={totalOrders}
          trend={-2.1}
          data={analytics.length > 0 ? analytics.map(a => ({ value: a.orders })) : [{value: 0}, {value: 0}, {value: 0}]}
          icon={<ShoppingCart size={24} />}
          color="secondary"
        />
        <KPICard
          title="New Users"
          value={analytics.reduce((acc, curr) => acc + curr.new_users, 0)}
          trend={28.5}
          data={analytics.length > 0 ? analytics.map(a => ({ value: a.new_users })) : [{value: 0}, {value: 0}, {value: 0}]}
          icon={<Users size={24} />}
          color="emerald"
        />
        <KPICard
          title="Active Products"
          value={totalProducts}
          trend={5.1}
          data={[{value: 10}, {value: 15}, {value: 12}, {value: 20}]}
          icon={<TrendingUp size={24} />}
          color="amber"
        />
      </div>

      {/* Main Charts - High End Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass-card rounded-[32px] md:rounded-[48px] p-6 md:p-10 border border-border/50"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-10">
             <div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight mb-1">Performance</h3>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">Revenue metrics over time</p>
             </div>
             <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-secondary text-[10px] md:text-xs font-bold hover:bg-border transition-colors">MONTHLY</button>
                <button className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-primary text-primary-foreground text-[10px] md:text-xs font-bold">YEARLY</button>
             </div>
          </div>
          <div className="h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.length > 0 ? analytics : [{month: 'Jan', revenue: 0}]}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: 600 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: 600 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderRadius: '16px md:24px', 
                    border: '1px solid var(--border)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    padding: '12px md:16px'
                  }}
                />
                <Bar dataKey="revenue" fill="url(#barGradient)" radius={[8, 8, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-[32px] md:rounded-[48px] p-6 md:p-10 border border-border/50"
        >
          <h3 className="text-xl md:text-2xl font-black tracking-tight mb-8 md:mb-10">User Growth</h3>
          <div className="h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.length > 0 ? analytics : [{month: 'Jan', new_users: 0}]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: 600 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderRadius: '16px', 
                    border: '1px solid var(--border)',
                    padding: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="new_users" 
                  stroke="var(--primary)" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: 'var(--primary)', strokeWidth: 2, stroke: 'var(--card)' }}
                  activeDot={{ r: 7, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section: Modern Transactions & Category Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        <div className="lg:col-span-2 glass-card rounded-[32px] md:rounded-[48px] p-6 md:p-10 border border-border/50">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <h3 className="text-xl md:text-2xl font-black tracking-tight">Recent Activity</h3>
            <button className="text-primary text-[10px] md:text-sm font-black flex items-center gap-2 hover:underline uppercase tracking-widest">
              Ledger <ArrowRight size={14} />
            </button>
          </div>
          {transLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {transactions?.slice(0, 6).map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 md:p-6 rounded-[24px] md:rounded-[32px] bg-secondary/30 hover:bg-secondary/50 transition-all border border-transparent hover:border-border/50 group"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-background border border-border/50 flex items-center justify-center text-primary font-black text-lg md:text-xl shadow-sm group-hover:scale-110 transition-transform">
                      {tx.customer_name[0]}
                    </div>
                    <div>
                      <p className="font-black text-sm md:text-lg tracking-tight">{tx.customer_name}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-base md:text-xl mb-1">${tx.amount}</p>
                    <Badge variant={tx.status === 'Paid' ? 'success' : tx.status === 'Pending' ? 'warning' : 'error'}>
                      {tx.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-card rounded-[32px] md:rounded-[48px] p-6 md:p-10 border border-border/50">
          <h3 className="text-xl md:text-2xl font-black tracking-tight mb-8 md:mb-10">Categories</h3>
          <div className="h-48 md:h-64 mb-8 md:mb-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={products?.slice(0, 5).map(p => ({ name: p.name, value: p.revenue }))}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {products?.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {products?.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/20 border border-transparent hover:border-border/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: COLORS[i % COLORS.length], color: COLORS[i % COLORS.length] }} />
                  <span className="text-xs font-bold truncate max-w-[100px] md:max-w-[120px]">{p.name}</span>
                </div>
                <span className="font-black text-xs">${p.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
