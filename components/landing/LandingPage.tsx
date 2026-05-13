"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  Star, 
  CheckCircle2,
  Globe,
  PieChart,
  TrendingUp,
  ChevronRight,
  Play,
  Moon,
  Sun,
  Instagram,
  Github,
  Linkedin,
  ShoppingCart,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";

import ReviewsCarousel from "./ReviewsCarousel";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function LandingPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7, 0.9], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
     
      <nav className="fixed top-0 w-full z-[100] border-b border-border/40 bg-background/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary rounded-[14px] flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 rotate-3">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="font-display font-black text-2xl tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              CORELYTICS
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-[13px] font-bold uppercase tracking-widest text-muted-foreground/80">
            <Link href="/features" className="hover:text-primary transition-all">Features</Link>
            <Link href="/pricing" className="hover:text-primary transition-all">Pricing</Link>
            <Link href="/about" className="hover:text-primary transition-all">Company</Link>
          </div>

          <div className="flex items-center gap-6">
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <Link href="/login" className="hidden sm:block text-sm font-black hover:text-primary transition-colors">
              LOG IN
            </Link>
            <Link 
              href="/onboarding" 
              className="group relative bg-primary text-primary-foreground px-8 py-3 rounded-2xl text-sm font-black tracking-tight overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-1 active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative flex items-center gap-2">
                GET STARTED <ChevronRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <section ref={targetRef} className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 px-6 overflow-hidden">

        {/* Ambient background glows */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <motion.div
            animate={{ x: [-80, 80, -80], y: [-40, 40, -40] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/10 blur-[140px] rounded-full"
          />
          <motion.div
            animate={{ x: [60, -60, 60], y: [30, -30, 30] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/8 blur-[120px] rounded-full"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* LEFT: Text Content */}
            <motion.div
              style={{ opacity, y }}
              className="flex flex-col items-start order-2 lg:order-1"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-secondary/80 border border-border/60 text-[11px] font-black uppercase tracking-[0.22em] text-primary mb-8 shadow-sm"
              >
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                AI-Powered Business Intelligence
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-[42px] sm:text-6xl lg:text-[62px] xl:text-[76px] font-display font-black leading-[1.05] tracking-[-0.04em] mb-7"
              >
                Data that{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Speaks Your
                </span>
                <br />
                Language.
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base md:text-lg text-muted-foreground/80 max-w-lg mb-10 font-medium leading-relaxed"
              >
                Corelytics turns complex business data into stunning visual
                narratives that drive growth, clarity, and decisive action — in
                real time.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 w-full sm:w-auto"
              >
                <Link
                  href="/onboarding"
                  className="group flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-2xl text-base font-black transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:-translate-y-1 active:scale-95"
                >
                  Get Started Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-border/50 hover:bg-secondary transition-all font-black text-base">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Play size={13} fill="currentColor" />
                  </div>
                  Watch Demo
                </button>
              </motion.div>

              {/* Social proof row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-wrap items-center gap-6"
              >
                {[
                  { value: "12k+", label: "Businesses" },
                  { value: "99.9%", label: "Uptime SLA" },
                  { value: "$2.4M", label: "Revenue tracked" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-2xl font-black tracking-tighter text-foreground">{s.value}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{s.label}</span>
                  </div>
                ))}
                <div className="hidden sm:block w-px h-10 bg-border/50 mx-1" />
                <div className="flex -space-x-2.5">
                  {["A", "S", "J", "M"].map((l, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br from-primary/80 to-purple-500/80 flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" className="text-amber-400" />)}
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground mt-0.5">5.0 from 2k+ reviews</p>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT: Hero Image */}
            <motion.div
              style={{ opacity, scale }}
              className="relative flex items-center justify-center order-1 lg:order-2"
            >
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-primary/15 via-purple-500/10 to-pink-500/5 blur-[60px]" />

              {/* Floating card — top left */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -left-4 sm:-top-8 sm:-left-8 z-30 flex items-center gap-3 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl px-4 py-3 rounded-2xl"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Growth</p>
                  <p className="text-lg font-black text-emerald-500 leading-none">+24.8%</p>
                </div>
              </motion.div>

              {/* Floating card — bottom right */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-5 -right-4 sm:-bottom-8 sm:-right-8 z-30 flex items-center gap-3 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl px-4 py-3 rounded-2xl"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                  <Zap size={16} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Active Users</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <p className="text-lg font-black leading-none">1,240</p>
                  </div>
                </div>
              </motion.div>

              {/* Live badge — top right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-6 -right-2 sm:top-10 sm:-right-6 z-30 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-xl shadow-primary/25 text-[11px] font-black"
              >
                <CheckCircle2 size={13} /> Live Data
              </motion.div>

              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.015 }}
                className="relative z-20 w-full rounded-[32px] sm:rounded-[40px] overflow-hidden border border-border/30 shadow-[0_40px_100px_rgba(0,0,0,0.18)] bg-secondary/10"
              >
                <Image
                  src="/1.png"
                  alt="Corelytics Dashboard Preview"
                  width={800}
                  height={560}
                  className="w-full h-auto object-cover block"
                  priority
                />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 relative z-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <motion.h2 
             {...fadeInUp}
             className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-20"
           >
              Engineered for <br /> <span className="text-primary italic">Growth.</span>
           </motion.h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { title: "Real-time Tracking", icon: <Zap />, desc: "Monitor every transaction and user action as it happens with zero latency." },
                { title: "Military Security", icon: <Shield />, desc: "Bank-grade encryption and Supabase-powered data protection." },
                { title: "Growth Insights", icon: <TrendingUp />, desc: "AI-powered predictions to help you make smarter business decisions." }
              ].map((f, i) => (
                <motion.div 
                  key={i}
                  {...fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-10 rounded-[40px] border border-border/50 group hover:border-primary/50 transition-colors"
                >
                   <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">{f.icon}</div>
                   <h3 className="text-2xl font-black mb-4 tracking-tight">{f.title}</h3>
                   <p className="text-muted-foreground font-medium leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsCarousel />

      {/* Premium Footer */}
      <footer className="py-24 border-t border-border/40 bg-background">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24 text-center md:text-left">
               <div className="col-span-1">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
                    <Zap className="text-primary" size={28} fill="currentColor" />
                    <span className="font-display font-black text-2xl tracking-tighter">CORELYTICS</span>
                  </div>
                  <p className="text-muted-foreground/80 font-medium leading-relaxed mb-8">
                    Empowering modern businesses with world-class analytics and data visualization.
                  </p>
                  <div className="flex justify-center md:justify-start gap-4">
                     <a href="https://instagram.com/mian.abdullah.9" target="_blank" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                        <Instagram size={18} />
                     </a>
                     <a href="https://github.com/Abdullahja5558" target="_blank" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                        <Github size={18} />
                     </a>
                     <a href="https://www.linkedin.com/in/abdullah-javed-a2b0b0396/" target="_blank" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                        <Linkedin size={18} />
                     </a>
                  </div>
               </div>
               
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground mb-10">Product</h4>
                  <ul className="space-y-5 text-sm font-bold text-muted-foreground">
                    <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                    <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                    <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground mb-10">Company</h4>
                  <ul className="space-y-5 text-sm font-bold text-muted-foreground">
                    <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                    <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                    <li><Link href="/support" className="hover:text-primary transition-colors">Contact</Link></li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground mb-10">Resources</h4>
                  <ul className="space-y-5 text-sm font-bold text-muted-foreground">
                    <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                    <li><Link href="/api-status" className="hover:text-primary transition-colors">API Status</Link></li>
                    <li><Link href="/support" className="hover:text-primary transition-colors">Support</Link></li>
                  </ul>
               </div>
            </div>
            
            <div className="pt-12 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
               <p className="text-[13px] font-bold text-muted-foreground">© 2026 CORELYTICS INC. ALL RIGHTS RESERVED.</p>
               <div className="flex gap-10 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                  <a href="#" className="hover:text-primary transition-colors">Terms</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
