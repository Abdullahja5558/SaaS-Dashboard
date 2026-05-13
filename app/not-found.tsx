"use client";

import { motion } from "framer-motion";
import { ZapIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute inset-0 bg-primary/5 blur-[120px] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-32 h-32 bg-secondary rounded-[40px] flex items-center justify-center text-primary mb-12 shadow-xl"
      >
        <ZapIcon size={64} fill="currentColor" />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[120px] md:text-[200px] font-display font-black leading-none tracking-tighter text-foreground/5 mb-4"
      >
        404
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative -mt-20 md:-mt-32"
      >
        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">Lost in Space.</h2>
        <p className="text-xl text-muted-foreground max-w-md mx-auto mb-10 font-medium">
          The page you're looking for doesn't exist or has been moved to another dimension.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-black transition-all hover:shadow-[0_20px_40px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-1 active:scale-95"
        >
          <ArrowLeft size={20} />
          BACK TO REALITY
        </Link>
      </motion.div>
    </div>
  );
}
