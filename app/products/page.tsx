"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUser } from "@/hooks/useUser";
import { useSupabaseData } from "@/hooks/useSupabase";
import { Product } from "@/lib/types";
import { Package, Plus, Edit2, Trash2, Search, TrendingUp, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";
import UpgradeModal from "@/components/ui/UpgradeModal";

export default function ProductsPage() {
  const { user } = useUser();
  const { data: products, loading, refetch } = useSupabaseData<Product>('sb_products', user?.id);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    sales_count: "",
    revenue: "",
    category: "General"
  });

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  if (!user) return null;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    // Check limit for Free plan (5 products)
    if (!product && (user.plan === 'Free' || !user.plan) && products.length >= 5) {
      setIsUpgradeModalOpen(true);
      return;
    }
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        sales_count: String(product.sales_count),
        revenue: String(product.revenue),
        category: product.category || "General"
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: "", sales_count: "", revenue: "", category: "General" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        sales_count: Number(formData.sales_count),
        revenue: Number(formData.revenue),
        category: formData.category,
        user_id: user.id
      };

      if (editingProduct) {
        const { error } = await supabase.from('sb_products').update(payload).eq('id', editingProduct.id);
        if (error) throw error;
        toast.success("Product updated");
      } else {
        const { error } = await supabase.from('sb_products').insert([payload]);
        if (error) throw error;
        toast.success("Product added");
      }
      setIsModalOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      const { error } = await supabase.from('sb_products').delete().eq('id', id);
      if (error) throw error;
      toast.success("Product removed");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Products Inventory</h1>
            <p className="text-muted-foreground mt-1">Manage your catalog and track product performance.</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-primary text-primary-foreground rounded-xl px-4 py-2.5 font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={20} />
            New Product
          </button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-secondary/50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary">
                      <Package size={24} />
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 rounded-lg bg-background/50 hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-lg bg-background/50 hover:bg-destructive hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{product.category}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-secondary/30">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                        <ShoppingCart size={12} />
                        Sales
                      </div>
                      <p className="font-bold">{product.sales_count}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-secondary/30">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                        <TrendingUp size={12} />
                        Revenue
                      </div>
                      <p className="font-bold">${product.revenue.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
                      <span>Performance</span>
                      <span>{Math.min(100, Math.round((product.revenue / 10000) * 100))}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (product.revenue / 10000) * 100)}%` }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProduct ? "Edit Product" : "New Product"}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Product Name</label>
              <input
                type="text"
                required
                className="w-full bg-secondary/50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Sales Count</label>
                <input
                  type="number"
                  required
                  className="w-full bg-secondary/50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 outline-none"
                  value={formData.sales_count}
                  onChange={(e) => setFormData({ ...formData, sales_count: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Revenue ($)</label>
                <input
                  type="number"
                  required
                  className="w-full bg-secondary/50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 outline-none"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Category</label>
              <input
                type="text"
                className="w-full bg-secondary/50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 outline-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold mt-4 hover:bg-primary/90 transition-all"
            >
              {editingProduct ? "Update Product" : "Create Product"}
            </button>
          </form>
        </Modal>

        <UpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          message="You've reached the limit of 5 products on the Starter plan."
        />
      </div>
    </DashboardLayout>
  );
}
