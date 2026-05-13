"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUser } from "@/hooks/useUser";
import { useSupabaseData } from "@/hooks/useSupabase";
import { Analytic } from "@/lib/types";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";
import { Download, Calendar, TrendingUp, ShoppingCart, Users as UsersIcon } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AnalyticsPage() {
  const { user } = useUser();
  const { data: analytics, loading } = useSupabaseData<Analytic>('sb_analytics', user?.id);
  const [range, setRange] = useState("Last 6 months");

  if (!user) return null;

  const totalRevenue = analytics.reduce((acc, curr) => acc + Number(curr.revenue), 0);
  const totalOrders = analytics.reduce((acc, curr) => acc + curr.orders, 0);
  const avgOrders = totalOrders / (analytics.length || 1);

  const handleExport = () => {
    const doc = new jsPDF();
    
    // Add Brand Name
    doc.setFontSize(22);
    doc.setTextColor(99, 102, 241); // Primary color
    doc.text("CORELYTICS", 14, 22);
    
    // Add Report Info
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("ANALYTICS PERFORMANCE REPORT", 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 36);
    doc.text(`Business: ${user.business_name}`, 14, 42);
    doc.text(`Period: ${range}`, 14, 48);
    
    // Add Summary Section
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Executive Summary", 14, 60);
    doc.setFontSize(10);
    doc.text(`Total Revenue: $${totalRevenue.toLocaleString()}`, 14, 68);
    doc.text(`Total Orders: ${totalOrders.toLocaleString()}`, 14, 74);
    doc.text(`Avg. Orders/Month: ${avgOrders.toFixed(1)}`, 14, 80);
    
    // Add Table
    const tableData = analytics.map(a => [
      a.month,
      `$${a.revenue.toLocaleString()}`,
      a.orders.toLocaleString(),
      a.new_users.toLocaleString()
    ]);

    autoTable(doc, {
      startY: 90,
      head: [['Month', 'Revenue', 'Orders', 'New Users']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillStyle: 'fill', fillColor: [99, 102, 241], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      margin: { top: 90 },
    });

    doc.save(`Corelytics_Analytics_${new Date().getTime()}.pdf`);
    import("sonner").then(({ toast }) => toast.success("Analytics PDF Generated Successfully"));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Analytics Insights</h1>
            <p className="text-muted-foreground mt-1">Deep dive into your business performance metrics.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-secondary/50 rounded-xl px-4 py-2 border flex items-center gap-2 text-sm font-medium">
              <Calendar size={18} />
              {range}
            </div>
            <button
              onClick={handleExport}
              className="bg-primary text-primary-foreground rounded-xl px-4 py-2 font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <Download size={18} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">${totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                <ShoppingCart size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold">{totalOrders.toLocaleString()}</h3>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                <UsersIcon size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Orders/Mo</p>
                <h3 className="text-2xl font-bold">{avgOrders.toFixed(1)}</h3>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="glass-card rounded-3xl p-8 border border-white/5">
              <h3 className="text-xl font-display font-bold mb-8">Revenue Performance</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 border border-white/5">
              <h3 className="text-xl font-display font-bold mb-8">Orders vs Growth</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)' }}
                    />
                    <Legend iconType="circle" />
                    <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="new_users" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
