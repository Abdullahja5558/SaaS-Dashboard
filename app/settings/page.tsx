"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUser } from "@/hooks/useUser";
import { User, BusinessCategory } from "@/lib/types";
import { 
  User as UserIcon, 
  Building2, 
  Mail, 
  Lock, 
  Trash2, 
  Shield, 
  Save,
  LogOut,
  Camera
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { auth } from "@/lib/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const categories: BusinessCategory[] = ['E-commerce', 'Restaurant', 'Agency', 'SaaS', 'Retail', 'Healthcare', 'Freelancer'];

export default function SettingsPage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    business_name: user?.business_name || "",
    business_category: user?.business_category as BusinessCategory || "SaaS",
    avatar_url: user?.avatar_url || "",
    password: user?.password || "",
  });

  if (!user) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sb_users')
        .update(formData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      auth.setSession(data);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("CRITICAL: This will permanently delete your account and all associated data. Continue?")) return;
    try {
      const { error } = await supabase.from('sb_users').delete().eq('id', user.id);
      if (error) throw error;
      auth.clearSession();
      toast.success("Account deleted");
      router.push("/onboarding");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences and business profile.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
        
            <div className="glass-card rounded-3xl p-8 border border-white/5">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <UserIcon size={20} className="text-primary" />
                Personal Information
              </h3>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold text-primary border-4 border-background overflow-hidden">
                      {user.avatar_url ? <img src={user.avatar_url} alt="" /> : user.name[0]}
                    </div>
                    <button type="button" className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg group-hover:scale-110 transition-transform">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.role} • Joined {new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Full Name</label>
                    <div className="relative group">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                      <input
                        type="text"
                        className="w-full bg-secondary/50 border-none rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-primary/50 outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                      <input
                        type="email"
                        className="w-full bg-secondary/50 border-none rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-primary/50 outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold ml-1">Avatar URL</label>
                    <div className="relative group">
                      <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                      <input
                        type="text"
                        placeholder="https://example.com/avatar.png"
                        className="w-full bg-secondary/50 border-none rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-primary/50 outline-none"
                        value={formData.avatar_url}
                        onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all"
                  >
                    <Save size={18} />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>

            {/* Business Section */}
            <div className="glass-card rounded-3xl p-8 border border-white/5">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Building2 size={20} className="text-primary" />
                Business Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Business Name</label>
                  <input
                    type="text"
                    className="w-full bg-secondary/50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 outline-none"
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Business Category</label>
                  <select
                    className="w-full bg-secondary/50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 outline-none"
                    value={formData.business_category}
                    onChange={(e) => setFormData({ ...formData, business_category: e.target.value as BusinessCategory })}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Security Card */}
            <div className="glass-card rounded-3xl p-6 border border-white/5 bg-primary/5">
              <h4 className="font-bold flex items-center gap-2 mb-4">
                <Shield size={18} className="text-primary" />
                Security
              </h4>
              <p className="text-xs text-muted-foreground mb-4">Update your password to keep your account secure.</p>
              <div className="space-y-4">
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" size={18} />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full bg-background border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <button 
                  onClick={handleUpdateProfile}
                  className="w-full bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-bold hover:bg-primary/90 transition-all"
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="glass-card rounded-3xl p-6 border border-red-500/20 bg-red-500/5">
              <h4 className="font-bold flex items-center gap-2 mb-4 text-red-500">
                <Trash2 size={18} />
                Danger Zone
              </h4>
              <p className="text-xs text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-500 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-red-600 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
