"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Utensils, 
  Rocket, 
  Laptop, 
  Store, 
  Stethoscope, 
  UserCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  User,
  ShieldCheck
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { seedUserData } from "@/lib/seed";
import { auth } from "@/lib/auth";
import { BusinessCategory, UserRole } from "@/lib/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const categories: { id: BusinessCategory; name: string; icon: any; description: string }[] = [
  { id: 'E-commerce', name: 'E-commerce', icon: ShoppingBag, description: 'Online store, shopify' },
  { id: 'Restaurant', name: 'Restaurant', icon: Utensils, description: 'Food, dining, cafe' },
  { id: 'Agency', name: 'Agency', icon: Rocket, description: 'Marketing, design, dev' },
  { id: 'SaaS', name: 'SaaS', icon: Laptop, description: 'Software as a service' },
  { id: 'Retail', name: 'Retail', icon: Store, description: 'Physical store, boutique' },
  { id: 'Healthcare', name: 'Healthcare', icon: Stethoscope, description: 'Clinic, medical, health' },
  { id: 'Freelancer', name: 'Freelancer', icon: UserCircle, description: 'Solo professional' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    business_name: "",
    business_category: "SaaS" as BusinessCategory,
    role: "Admin" as UserRole,
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Check if email already exists
      const { data: existingUser } = await supabase
        .from('sb_users')
        .select('id')
        .eq('email', formData.email)
        .single();

      if (existingUser) {
        throw new Error("This email is already registered. Please login or use a different email.");
      }

      // 1. Create User
      const { data: newUser, error: userError } = await supabase
        .from('sb_users')
        .insert([{
          name: formData.name,
          email: formData.email,
          password: formData.password,
          business_name: formData.business_name,
          business_category: formData.business_category,
          role: formData.role,
        }])
        .select()
        .single();

      if (userError) {
        if (userError.code === '23505') {
          throw new Error("This email is already registered. Please login or use a different email.");
        }
        throw userError;
      }

      // 2. Seed Data
      await seedUserData(newUser.id, formData.business_category);

      // 3. Set Session
      auth.setSession(newUser);

      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-purple-500/20 blur-[120px]"
        />
      </div>

      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <motion.div
                animate={{
                  backgroundColor: step >= s ? "var(--primary)" : "var(--secondary)",
                  scale: step === s ? 1.2 : 1
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              >
                {step > s ? <CheckCircle2 size={16} className="text-white" /> : s}
              </motion.div>
              {s < 3 && (
                <div className="w-12 h-1 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: step > s ? "100%" : "0%" }}
                    className="h-full bg-primary"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card rounded-3xl p-8 shadow-2xl"
        >
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-display font-bold mb-2">Create your account</h1>
                <p className="text-muted-foreground">Join thousands of businesses scaling with CORELYTICS.</p>
              </div>
              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" size={20} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-secondary/50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" size={20} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-secondary/50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <button
                disabled={!formData.name || !formData.email}
                onClick={nextStep}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                Next Step <ArrowRight size={20} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-display font-bold mb-2">Your Business</h1>
                <p className="text-muted-foreground">Tell us about what you're building.</p>
              </div>
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Business Name"
                  className="w-full bg-secondary/50 border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/50 outline-none text-lg font-semibold"
                  value={formData.business_name}
                  onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = formData.business_category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setFormData({ ...formData, business_category: cat.id })}
                        className={cn(
                          "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center",
                          isActive ? "border-primary bg-primary/5 shadow-lg scale-105" : "border-secondary hover:border-primary/50"
                        )}
                      >
                        <Icon size={24} className={isActive ? "text-primary" : "text-muted-foreground"} />
                        <span className="text-xs font-bold">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-secondary text-foreground py-4 rounded-xl font-bold hover:bg-secondary/80 transition-all"
                >
                  Back
                </button>
                <button
                  disabled={!formData.business_name}
                  onClick={nextStep}
                  className="flex-[2] bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  Almost there <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-display font-bold mb-2">Final Step</h1>
                <p className="text-muted-foreground">Set your password and choose your role.</p>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, role: 'Admin' })}
                    className={cn(
                      "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3",
                      formData.role === 'Admin' ? "border-primary bg-primary/5" : "border-secondary"
                    )}
                  >
                    <ShieldCheck size={32} className={formData.role === 'Admin' ? "text-primary" : "text-muted-foreground"} />
                    <div className="text-center">
                      <p className="font-bold">Admin</p>
                      <p className="text-[10px] text-muted-foreground">Full access control</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, role: 'Viewer' })}
                    className={cn(
                      "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3",
                      formData.role === 'Viewer' ? "border-primary bg-primary/5" : "border-secondary"
                    )}
                  >
                    <UserCircle size={32} className={formData.role === 'Viewer' ? "text-primary" : "text-muted-foreground"} />
                    <div className="text-center">
                      <p className="font-bold">Viewer</p>
                      <p className="text-[10px] text-muted-foreground">Read-only access</p>
                    </div>
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" size={20} />
                  <input
                    type="password"
                    placeholder="Secure Password"
                    className="w-full bg-secondary/50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 outline-none"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-secondary text-foreground py-4 rounded-xl font-bold hover:bg-secondary/80 transition-all"
                >
                  Back
                </button>
                <button
                  disabled={!formData.password || loading}
                  onClick={handleSubmit}
                  className="flex-[2] bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Launch Dashboard"} <Rocket size={20} />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account? <a href="/login" className="text-primary font-bold hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
