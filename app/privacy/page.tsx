"use client";

import { motion } from "framer-motion";
import { ZapIcon, Sun, Moon, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function PrivacyPage() {
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

      <div className="pt-40 pb-32 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-20">
           <div className="w-20 h-20 rounded-[28px] bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-8">
              <ShieldCheck size={40} />
           </div>
           <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-6">Privacy Policy</h1>
           <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Last Updated: May 2026</p>
        </div>

        <div className="glass-card p-12 rounded-[48px] border border-border/50 space-y-12 text-muted-foreground font-medium leading-relaxed">
           <section>
              <h2 className="text-2xl font-black text-foreground mb-4">1. Data Collection</h2>
              <p>We collect information you provide directly to us when you create an account, such as your name, email address, and business details. We also collect data from the third-party platforms you integrate with Corelytics.</p>
           </section>
           
           <section>
              <h2 className="text-2xl font-black text-foreground mb-4">2. Use of Information</h2>
              <p>Your data is used solely to provide and improve the services we offer. We do not sell your personal or business data to third parties. We use anonymized, aggregated data for system performance monitoring.</p>
           </section>

           <section>
              <h2 className="text-2xl font-black text-foreground mb-4">3. Security Measures</h2>
              <p>Corelytics employs industry-standard security protocols, including end-to-end encryption and regular security audits. Access to sensitive data is restricted to authorized personnel only.</p>
           </section>

           <section>
              <h2 className="text-2xl font-black text-foreground mb-4">4. Your Rights</h2>
              <p>You have the right to access, update, or delete your information at any time. You can request a full export of your data through the settings dashboard.</p>
           </section>
        </div>
      </div>
    </div>
  );
}
