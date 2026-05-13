"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, ChevronRight, Check } from "lucide-react";
import Link from "next/link";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function UpgradeModal({ isOpen, onClose, message }: UpgradeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-card border border-primary/20 rounded-[32px] md:rounded-[40px] p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 md:p-6">
              <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary mb-6 md:mb-8">
              <Zap size={28} className="md:w-8 md:h-8" fill="currentColor" />
            </div>

            <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-3 md:mb-4">Time to Upgrade.</h3>
            <p className="text-sm md:text-base text-muted-foreground font-medium mb-8 md:mb-10 leading-relaxed">
              {message} Upgrade to a Professional plan to unlock unlimited potential and advanced features.
            </p>

            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
               {[
                 "Unlimited Data Points",
                 "AI Predictive Insights",
                 "Priority 24/7 Support",
                 "Custom Reports & Analytics"
               ].map((f, i) => (
                 <div key={i} className="flex items-center gap-3 font-bold text-[13px] md:text-sm">
                   <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                     <Check size={12} />
                   </div>
                   {f}
                 </div>
               ))}
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <Link 
                href="/pricing" 
                onClick={onClose}
                className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-primary text-primary-foreground text-center font-black text-sm md:text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                VIEW PRICING PLANS
              </Link>
              <button 
                onClick={onClose}
                className="w-full py-3 text-[12px] md:text-sm font-black text-muted-foreground hover:text-foreground transition-colors"
              >
                NOT NOW, THANKS
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
