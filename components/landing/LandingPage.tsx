"use client";

import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
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
  DollarSign,
  Activity,
  BarChart2,
  Menu,
  X
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
  const { scrollYProgress, scrollY } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7, 0.9], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 z-[100] flex justify-center transition-all duration-500 w-full ${
            isScrolled ? 'pt-4 px-4 sm:px-6' : 'pt-0 px-0'
          }`}
        >
          <div className={`w-full flex items-center justify-between transition-all duration-500 overflow-hidden ${
          isScrolled 
            ? 'max-w-5xl h-16 rounded-[32px] bg-background/80 backdrop-blur-2xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-5 sm:px-8' 
            : 'max-w-7xl h-20 bg-background/60 backdrop-blur-xl border-b border-border/40 px-6 sm:px-8 mx-auto'
        }`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/favicon.ico" alt="Corelytics Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md" />
            <span className="font-display font-black text-xl sm:text-2xl tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              CORELYTICS
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-[13px] font-bold uppercase tracking-widest text-muted-foreground/80">
            {[{label:'Features',href:'/features'},{label:'Pricing',href:'/pricing'},{label:'Company',href:'/about'}].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden px-3 py-1.5 rounded-lg hover:text-primary transition-colors duration-300"
              >
                <span className="absolute inset-0 bg-primary/8 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-lg" />
                <span className="relative">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary/80 flex items-center justify-center hover:scale-110 transition-transform duration-300 active:scale-95 border border-border/50"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
              </button>
            )}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="group relative flex items-center overflow-hidden px-5 py-2 sm:py-2.5 rounded-xl border border-border/60 text-xs sm:text-sm font-black tracking-tight transition-all duration-300 hover:border-primary/50"
              >
                <span className="absolute inset-0 bg-primary translate-y-[105%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative group-hover:text-primary-foreground transition-colors duration-300">LOG IN</span>
              </Link>
              <Link 
                href="/onboarding" 
                className="group relative bg-primary text-primary-foreground px-5 sm:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black tracking-tight overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 active:scale-95"
              >
                <span className="absolute inset-0 bg-white/25 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-400 ease-out" />
                <span className="relative flex items-center gap-2">
                  GET STARTED <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                </span>
              </Link>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-secondary/80 rounded-xl border border-border/50 active:scale-95 transition-transform"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-2xl lg:hidden flex flex-col pt-28 px-6 pb-8 border-b border-border/50 overflow-y-auto"
          >
            <div className="flex flex-col gap-8 items-center text-center mt-10">
              {[{label:'Features',href:'/features'},{label:'Pricing',href:'/pricing'},{label:'Company',href:'/about'}].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-display font-black tracking-tighter hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full h-px bg-border/50 my-10"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4 w-full max-w-sm mx-auto"
            >
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 rounded-xl border-2 border-border/60 text-sm font-black tracking-widest uppercase text-center hover:bg-secondary transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/onboarding"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground text-sm font-black tracking-widest uppercase text-center shadow-[0_10px_30px_rgba(99,102,241,0.3)]"
              >
                Get Started Free
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section ref={targetRef} className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 px-5 sm:px-6 overflow-hidden">

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

            <motion.div
              style={{ opacity, y }}
              className="flex flex-col items-start order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-secondary/80 border border-border/60 text-[11px] font-black uppercase tracking-[0.22em] text-primary mb-8 shadow-sm"
              >
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                AI-Powered Business Intelligence
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-[40px] leading-[1.1] sm:text-6xl lg:text-[62px] xl:text-[76px] font-display font-black sm:leading-[1.05] tracking-[-0.04em] mb-6 sm:mb-7"
              >
                Data that{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Speaks Your
                </span>
                <br />
                Language.
              </motion.h1>

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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 w-full sm:w-auto"
              >
                <Link
                  href="/onboarding"
                  className="group relative flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-2xl text-base font-black overflow-hidden transition-all duration-300 active:scale-95"
                >
                  <span className="absolute inset-0 bg-primary translate-y-[105%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative flex items-center gap-3">
                    Get Started Free
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
                <button className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-border/50 hover:bg-secondary transition-all font-black text-base">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Play size={13} fill="currentColor" />
                  </div>
                  Watch Demo
                </button>
              </motion.div>

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

            <motion.div
              style={{ opacity, scale }}
              className="relative flex items-center justify-center order-1 lg:order-2"
            >
              
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-primary/15 via-purple-500/10 to-pink-500/5 blur-[60px]" />

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

      {/* ─── Live Intelligence Showcase ─── */}
      <section className="py-24 md:py-32 relative z-20 overflow-hidden">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/6 blur-[120px] rounded-full" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-black uppercase tracking-[0.22em] text-primary mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Live Intelligence
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-5">
              Your Data,{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent italic">Alive.</span>
            </h2>
            <p className="text-muted-foreground/80 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
              Real-time charts, instant transaction feeds, and AI-powered metrics — all in one unified command centre.
            </p>
          </motion.div>

          {/* Dashboard mockup card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            {/* Floating accent cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-4 md:-left-10 z-30 flex items-center gap-3 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl px-4 py-3 rounded-2xl will-change-transform"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500">
                <TrendingUp size={16} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Revenue</p>
                <p className="text-lg font-black text-emerald-500 leading-none">+24.8%</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -right-4 md:-right-10 z-30 flex items-center gap-3 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl px-4 py-3 rounded-2xl will-change-transform"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                <Users size={16} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Active Users</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-lg font-black leading-none">1,847</p>
                </div>
              </div>
            </motion.div>

            {/* Main dashboard glass panel */}
            <div className="relative z-10 glass-card rounded-[32px] md:rounded-[48px] p-3 md:p-5 border border-border/40 shadow-[0_40px_120px_rgba(0,0,0,0.12)] overflow-hidden">
              {/* Inner top bar */}
              <div className="flex items-center justify-between px-4 py-3 mb-4 border-b border-border/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                    <Zap size={14} fill="currentColor" className="text-primary-foreground" />
                  </div>
                  <span className="font-black text-sm tracking-tight">CORELYTICS</span>
                  <span className="flex items-center gap-1.5 ml-3 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
                </div>
              </div>

              {/* Dashboard body: 3-col layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 pb-2">

                {/* Left: KPI cards */}
                <div className="flex flex-col gap-3">
                  {[
                    { icon: <DollarSign size={16} />, label: 'Total Revenue', value: '$128,400', change: '+18.2%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { icon: <ShoppingCart size={16} />, label: 'Orders', value: '3,842', change: '+9.4%', color: 'text-primary', bg: 'bg-primary/10' },
                    { icon: <Users size={16} />, label: 'New Users', value: '924', change: '+31.7%', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                  ].map((kpi, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i + 0.3, duration: 0.5, ease: 'easeOut' }}
                      className="p-4 rounded-2xl bg-background/60 border border-border/40 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-8 h-8 rounded-xl ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                          {kpi.icon}
                        </div>
                        <span className={`text-[10px] font-black ${kpi.color}`}>{kpi.change}</span>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">{kpi.label}</p>
                      <p className="text-xl font-black tracking-tight">{kpi.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Center: Revenue bar chart */}
                <div className="md:col-span-1 p-4 rounded-2xl bg-background/60 border border-border/40 backdrop-blur-sm flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Revenue</p>
                      <p className="text-lg font-black">Monthly Trend</p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <BarChart2 size={16} />
                    </div>
                  </div>
                  <div className="flex-1 flex items-end gap-1.5">
                    {[40, 65, 45, 80, 60, 90, 70, 85, 55, 95, 75, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.04 * i + 0.5, duration: 0.5, ease: 'easeOut' }}
                        style={{ height: `${h}%`, originY: 1 }}
                        className={`flex-1 rounded-t-md ${
                          i === 11 ? 'bg-primary shadow-[0_0_12px_rgba(99,102,241,0.4)]' : 'bg-primary/25'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => (
                      <span key={i} className="flex-1 text-center text-[8px] font-bold text-muted-foreground/60">{m}</span>
                    ))}
                  </div>
                </div>

                {/* Right: Live transaction feed */}
                <div className="p-4 rounded-2xl bg-background/60 border border-border/40 backdrop-blur-sm flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Transactions</p>
                      <p className="text-lg font-black">Live Feed</p>
                    </div>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black">
                      <Activity size={10} />
                      Real-time
                    </span>
                  </div>
                  <div className="space-y-2.5 flex-1">
                    {[
                      { name: 'Sarah M.', amount: '+$420', time: '2s ago', type: 'credit', color: 'text-emerald-500' },
                      { name: 'James K.', amount: '-$89', time: '18s ago', type: 'debit', color: 'text-red-400' },
                      { name: 'Priya L.', amount: '+$1,250', time: '1m ago', type: 'credit', color: 'text-emerald-500' },
                      { name: 'Tobi A.', amount: '+$340', time: '3m ago', type: 'credit', color: 'text-emerald-500' },
                      { name: 'Mei Z.', amount: '-$210', time: '5m ago', type: 'debit', color: 'text-red-400' },
                    ].map((tx, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i + 0.4, duration: 0.4, ease: 'easeOut' }}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-background/50 border border-border/30"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/40 to-purple-500/40 flex items-center justify-center text-[10px] font-black text-primary">
                            {tx.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-black leading-none">{tx.name}</p>
                            <p className="text-[9px] text-muted-foreground mt-0.5">{tx.time}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-black ${tx.color}`}>{tx.amount}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
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
                    <img src="/favicon.ico" alt="Corelytics" className="w-8 h-8 object-contain rounded-md" />
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
    </main>
  );
}
