"use client";

import { motion } from "framer-motion";
import { ZapIcon, Sun, Moon, Globe, Target, Heart } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <nav className="fixed top-0 w-full z-[100] border-b border-border/40 bg-background/60 backdrop-blur-2xl px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ZapIcon className="text-primary" size={24} fill="currentColor" />
          <span className="font-display font-black text-2xl tracking-tighter">CORELYTICS</span>
        </Link>
        <div className="flex items-center gap-6">
          {mounted && (
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>
      </nav>

      <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-10 leading-tight"
            >
              We believe in <br /> <span className="text-primary italic">Clarity.</span>
            </motion.h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              Corelytics was founded with a single mission: to empower businesses by 
              stripping away the noise of raw data and revealing the truth beneath.
            </p>
          </div>
          <div className="aspect-square rounded-[64px] bg-secondary flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-primary/10 animate-pulse" />
             <ZapIcon size={200} className="text-primary/20" fill="currentColor" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Our Mission", icon: <Target />, desc: "To provide every entrepreneur with the same analytical power as Fortune 500 companies." },
            { title: "Our Values", icon: <Heart />, desc: "Radical transparency, speed of execution, and design excellence in everything we build." },
            { title: "Global Impact", icon: <Globe />, desc: "Helping teams across 6 continents make smarter, data-driven decisions every single day." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-12 rounded-[48px] border border-border/50"
            >
              <div className="w-16 h-16 rounded-[22px] bg-primary/10 text-primary flex items-center justify-center mb-8">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black mb-4">{item.title}</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
