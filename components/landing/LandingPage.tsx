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

  // Improved hero persistence: stays visible much longer during scroll
  const opacity = useTransform(scrollYProgress, [0, 0.7, 0.9], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      {/* Dynamic Navbar */}
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

      {/* Hero Section */}
      <section ref={targetRef} className="relative pt-32 pb-20 lg:pt-56 lg:pb-32 flex flex-col items-center justify-center text-center px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <motion.div 
            animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 blur-[100px] md:blur-[140px] rounded-full" 
          />
        </div>

        <motion.div style={{ opacity, scale, y }} className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 md:px-5 py-2 rounded-full bg-secondary/80 border border-border/50 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-6 md:mb-10 shadow-sm"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            AI-POWERED BUSINESS INTELLIGENCE
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-display font-black leading-[1.1] md:leading-[0.9] tracking-[-0.04em] mb-8 md:mb-12 max-w-[1200px]"
          >
            Data that <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent pb-2 md:pb-4 inline-block">
              Speaks Your Language.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10 md:mb-14 font-medium leading-relaxed px-4"
          >
            Corelytics turns complex business data into stunning visual narratives 
            that drive growth, clarity, and decisive action.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <Link 
              href="/onboarding" 
              className="w-full sm:w-auto group bg-foreground text-background px-8 md:px-12 py-4 md:py-6 rounded-[18px] md:rounded-[22px] text-base md:text-lg font-black flex items-center justify-center gap-3 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1 active:scale-95"
            >
              Get Started Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto group flex items-center justify-center gap-4 px-8 md:px-10 py-4 md:py-6 rounded-[18px] md:rounded-[22px] border-2 border-border/50 hover:bg-secondary transition-all font-black text-base md:text-lg">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Play size={14} fill="currentColor" />
              </div>
              Watch Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Live Intelligence Showcase - Ultra Premium Redesign */}
        <div className="mt-20 md:mt-32 relative w-full max-w-7xl mx-auto px-4 lg:px-0 overflow-visible">
           {/* Background Glow - Optimized for Performance */}
           <div className="absolute -top-10 -left-10 w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-primary/10 blur-[80px] md:blur-[160px] rounded-full pointer-events-none opacity-50 will-change-[filter]" />
           <div className="absolute -bottom-10 -right-10 w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-purple-500/10 blur-[80px] md:blur-[160px] rounded-full pointer-events-none opacity-50 will-change-[filter]" />

           <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="relative group will-change-transform"
           >
             {/* Floating Insight Card 1 - Top Left */}
             <motion.div
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
               className="absolute -top-8 -left-2 md:-top-16 md:-left-10 z-20 glass-card p-3 md:p-6 rounded-[20px] md:rounded-[32px] border border-white/40 shadow-xl hidden lg:block will-change-transform"
             >
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 md:w-12 md:h-12 bg-emerald-500/20 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-500">
                   <TrendingUp size={18} className="md:w-5 md:h-5" />
                 </div>
                 <div>
                   <p className="text-[8px] md:text-xs font-black text-muted-foreground uppercase tracking-widest">Growth Rate</p>
                   <p className="text-sm md:text-2xl font-black">+24.8%</p>
                 </div>
               </div>
             </motion.div>

             {/* Floating Insight Card 2 - Bottom Right */}
             <motion.div
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
               className="absolute -bottom-8 -right-2 md:-bottom-16 md:-right-10 z-20 glass-card p-3 md:p-6 rounded-[20px] md:rounded-[32px] border border-white/40 shadow-xl hidden lg:block will-change-transform"
             >
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center text-primary">
                   <Zap size={18} className="md:w-5 md:h-5" fill="currentColor" />
                 </div>
                 <div>
                   <p className="text-[8px] md:text-xs font-black text-muted-foreground uppercase tracking-widest">Active Now</p>
                   <div className="flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                     <p className="text-sm md:text-2xl font-black">1,240</p>
                   </div>
                 </div>
               </div>
             </motion.div>

             <div className="relative z-10 glass-card rounded-[40px] md:rounded-[60px] p-2 md:p-4 border border-white/20 shadow-[0_50px_120px_rgba(0,0,0,0.15)] overflow-hidden [perspective:1000px]">
               <motion.div
                 whileHover={{ scale: 1.005 }}
                 transition={{ duration: 0.5 }}
                 className="relative rounded-[32px] md:rounded-[50px] bg-background border border-border/40 overflow-hidden"
               >
                 <div className="p-6 md:p-14">
                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 md:mb-16">
                     <div className="flex items-center gap-6">
                       <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-[24px] md:rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-primary/20 rotate-3">
                         <BarChart3 size={28} />
                       </div>
                       <div className="text-left">
                         <h4 className="font-black tracking-tighter text-2xl md:text-3xl">Live Intelligence</h4>
                         <div className="flex items-center gap-2 mt-1">
                           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                           <p className="text-[10px] md:text-xs text-muted-foreground font-black uppercase tracking-[0.2em]">Live Data Stream • 20ms Latency</p>
                         </div>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="flex-1 lg:flex-none px-6 py-3 rounded-2xl bg-secondary/80 border border-border/50 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                          <Users size={14} />
                          Overview
                        </div>
                        <div className="flex-1 lg:flex-none px-6 py-3 rounded-2xl bg-primary text-primary-foreground text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                          <TrendingUp size={14} />
                          Analytics
                        </div>
                     </div>
                   </div>

                   <div className="grid grid-cols-12 gap-6 md:gap-12">
                     <div className="col-span-12 xl:col-span-8 space-y-6 md:space-y-12">
                        {/* Main Visualization Card */}
                        <div className="relative group/chart h-[300px] md:h-[450px] bg-secondary/20 rounded-[40px] p-8 md:p-12 border border-border/30 overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover/chart:opacity-100 transition-opacity duration-700" />
                           
                           <div className="relative z-10 flex justify-between items-start mb-12">
                             <div className="text-left">
                               <p className="text-[10px] md:text-xs font-black text-muted-foreground uppercase tracking-[0.3em] mb-2">Total Managed Revenue</p>
                               <h5 className="text-4xl md:text-7xl font-black tracking-tighter">$2.4M<span className="text-primary text-2xl md:text-4xl">.00</span></h5>
                             </div>
                             <div className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 text-[10px] md:text-xs font-black flex items-center gap-2">
                               <TrendingUp size={14} /> +32% THIS MONTH
                             </div>
                           </div>

                           <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 flex items-end gap-2 md:gap-4 px-8 md:px-12 pb-8 md:pb-12">
                             {[50, 70, 45, 90, 65, 100, 80, 50, 85, 40, 60, 30, 75, 95, 60, 80, 45, 70].map((h, i) => (
                               <motion.div
                                 key={i}
                                 initial={{ height: 0 }}
                                 whileInView={{ height: `${h}%` }}
                                 transition={{ delay: i * 0.05, duration: 1 }}
                                 className="flex-1 bg-gradient-to-t from-primary/20 via-primary to-primary rounded-t-2xl shadow-[0_-10px_20px_rgba(99,102,241,0.2)]"
                               />
                             ))}
                           </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                           {[
                             { icon: <ShoppingCart size={20} />, value: "2,840", label: "Orders", color: "text-primary" },
                             { icon: <Users size={20} />, value: "12.5k", label: "Visitors", color: "text-purple-500" },
                             { icon: <Zap size={20} />, value: "99.9%", label: "Uptime", color: "text-amber-500" },
                           ].map((stat, i) => (
                             <div key={i} className="p-6 md:p-8 rounded-[32px] bg-secondary/20 border border-border/30 hover:bg-secondary/40 transition-all group/stat text-left">
                               <div className={`${stat.color} mb-4 group-hover/stat:scale-110 transition-transform`}>{stat.icon}</div>
                               <p className="text-2xl md:text-3xl font-black mb-1">{stat.value}</p>
                               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                             </div>
                           ))}
                        </div>
                     </div>

                     {/* Sidebar Activity Panel */}
                     <div className="col-span-12 xl:col-span-4 glass-card p-6 md:p-10 rounded-[40px] border border-border/50 text-left flex flex-col">
                        <div className="flex items-center justify-between mb-10">
                          <h5 className="font-black text-xs uppercase tracking-widest">Live Activity</h5>
                          <div className="flex gap-1">
                            <span className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                            <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>

                        <div className="space-y-6 flex-1">
                           {[
                             { name: "Global Stack", type: "Enterprise", amt: "$14.2k", status: "Processed" },
                             { name: "Sarah Miller", type: "Professional", amt: "$240", status: "Success" },
                             { name: "FinTech Inc", type: "Starter", amt: "$890", status: "Paid" },
                             { name: "Digital Edge", type: "Professional", amt: "$3.1k", status: "Success" },
                             { name: "Cloud Nine", type: "Enterprise", amt: "$12k", status: "Pending" },
                           ].map((tx, i) => (
                             <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-secondary/10 hover:bg-secondary/30 transition-all group/item border border-transparent hover:border-border/30">
                               <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-background border border-border/50 flex items-center justify-center font-black text-primary text-sm shadow-sm group-hover/item:scale-110 transition-transform">{tx.name[0]}</div>
                                  <div>
                                     <p className="text-sm font-black tracking-tight">{tx.name}</p>
                                     <p className="text-[10px] text-muted-foreground font-black uppercase">{tx.type}</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <p className="text-sm font-black">{tx.amt}</p>
                                  <p className="text-[8px] font-black text-emerald-500 uppercase tracking-tighter">{tx.status}</p>
                               </div>
                             </div>
                           ))}
                        </div>

                        <button className="w-full mt-12 py-5 rounded-3xl bg-foreground text-background text-[11px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                          Access Intelligence Dashboard
                        </button>
                     </div>
                   </div>
                 </div>
               </motion.div>
             </div>
           </motion.div>
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
                    <li><Link href="/login" className="hover:text-primary transition-colors">Contact</Link></li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground mb-10">Resources</h4>
                  <ul className="space-y-5 text-sm font-bold text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">API Status</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
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
