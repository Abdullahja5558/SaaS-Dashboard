"use client";

import LandingPage from "@/components/landing/LandingPage";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  Search, 
  Cpu, 
  Database, 
  Layers,
  ArrowRight,
  ZapIcon
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function FeaturesPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Mini Nav */}
      <nav className="fixed top-0 w-full z-[100] border-b border-border/40 bg-background/60 backdrop-blur-2xl px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ZapIcon className="text-primary" size={24} fill="currentColor" />
          <span className="font-display font-black text-2xl tracking-tighter">CORELYTICS</span>
        </Link>
        <div className="flex items-center gap-6">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <Link href="/onboarding" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-black">
            GET STARTED
          </Link>
        </div>
      </nav>

      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8"
          >
            Capabilities <br />
            <span className="text-primary italic">Redefined.</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Corelytics is more than just a dashboard. It's a high-performance 
            engine designed to handle massive data complexity with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {[
            {
              title: "AI Analysis Engine",
              desc: "Our proprietary AI models analyze your data in real-time to find trends that humans miss. Automated anomaly detection and growth forecasting included.",
              icon: <Cpu size={40} className="text-primary" />,
              img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
            },
            {
              title: "Global Data Mesh",
              desc: "Connect to any database, anywhere. Corelytics uses a distributed mesh architecture to sync your data with millisecond latency regardless of scale.",
              icon: <Database size={40} className="text-purple-500" />,
              img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card rounded-[48px] overflow-hidden border border-border/50 group"
            >
              <div className="p-12">
                <div className="w-20 h-20 rounded-[28px] bg-secondary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-medium">{item.desc}</p>
                <div className="aspect-video rounded-[32px] overflow-hidden border border-border/40">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Smart Filtering", icon: <Search /> },
             { title: "Team Roles", icon: <Users /> },
             { title: "Security Protocols", icon: <Shield /> },
             { title: "Custom Plugins", icon: <Layers /> },
             { title: "Live Sync", icon: <Zap /> },
             { title: "Visual Exports", icon: <BarChart3 /> },
           ].map((item, i) => (
             <div key={i} className="glass-card p-10 rounded-[36px] border border-border/50 flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                   {item.icon}
                </div>
                <h4 className="text-xl font-black">{item.title}</h4>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
