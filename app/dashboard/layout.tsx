"use client";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useUser } from "@/hooks/useUser";
import Spinner from "@/components/ui/Spinner";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 blur-[100px]" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-8 relative"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                borderRadius: ["24%", "50%", "24%"]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 bg-primary/10 border-2 border-primary/20 flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary-rgb),0.15)]"
            >
              <Zap size={40} className="text-primary animate-pulse" fill="currentColor" />
            </motion.div>
            <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl -z-10 animate-pulse" />
          </div>
          
          <div className="flex flex-col items-center">
            <h2 className="font-display font-black text-3xl tracking-[-0.05em] text-foreground">CORELYTICS</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-2">Synchronizing Intelligence</p>
            <div className="w-40 h-1 bg-secondary rounded-full mt-6 overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/2 bg-primary shadow-[0_0_15px_var(--primary)]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col transition-all duration-300 md:pl-[280px]">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-10 w-full max-w-[1600px] mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
