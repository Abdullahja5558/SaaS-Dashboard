"use client";

import { motion } from "framer-motion";
import { Check, ZapIcon, Sun, Moon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function PricingPage() {
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

      <div className="pt-32 md:pt-40 pb-24 md:pb-32 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-6 md:mb-8"
        >
          Pricing Plans
        </motion.div>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tighter mb-8 md:mb-10 leading-tight">
          Scale at your <br /> own <span className="italic text-primary">pace.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-16 md:mb-20 font-medium leading-relaxed">
          Transparent pricing for businesses of all sizes. No hidden fees, ever.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              name: "Starter",
              price: "0",
              desc: "Perfect for exploring core features.",
              features: ["1,000 Data Points", "Basic Analytics", "1 User Profile", "Standard Support"],
              cta: "Start for Free",
              popular: false
            },
            {
              name: "Professional",
              price: "49",
              desc: "The choice for growing businesses.",
              features: ["Unlimited Data Points", "AI Predictive Insights", "5 User Profiles", "Priority Support", "Custom Reports"],
              cta: "Get Started",
              popular: true
            },
            {
              name: "Enterprise",
              price: "99",
              desc: "Ultimate power for global teams.",
              features: ["Dedicated Infrastructure", "Military-grade Security", "Unlimited Users", "24/7 Phone Support", "Custom Integrations"],
              cta: "Contact Sales",
              popular: false
            }
          ].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative glass-card p-8 md:p-12 rounded-[32px] md:rounded-[48px] border ${plan.popular ? 'border-primary shadow-2xl shadow-primary/10 bg-primary/5' : 'border-border/50'} text-left flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-5 md:mb-6">
                <span className="text-3xl md:text-4xl font-black">${plan.price}</span>
                <span className="text-muted-foreground font-bold text-sm md:text-base">/month</span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground mb-8 md:mb-10 font-medium leading-relaxed">{plan.desc}</p>
              
              <ul className="space-y-3 md:space-y-4 mb-10 md:mb-12 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 font-bold text-[13px] md:text-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                      <Check size={12} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link 
                href={plan.name === 'Enterprise' ? "/login" : "/onboarding"} 
                className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl text-center font-black transition-all text-sm md:text-base ${plan.popular ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-secondary hover:bg-border/50'}`}
              >
                {plan.cta}
              </Link>
              {plan.name !== 'Starter' && (
                <Link href="/login" className="mt-4 text-[10px] md:text-xs font-black text-center text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                  Talk to an Expert
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32 p-8 md:p-12 rounded-[32px] md:rounded-[48px] bg-secondary/30 border border-border/50 max-w-4xl mx-auto"
        >
           <h2 className="text-2xl md:text-3xl font-black mb-4">Have questions?</h2>
           <p className="text-sm md:text-base text-muted-foreground font-medium mb-8 leading-relaxed">Our team is here to help you choose the right plan for your business.</p>
           <Link href="/login" className="inline-flex items-center gap-2 bg-foreground text-background px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-base font-black hover:scale-105 transition-all">
              CONTACT OUR TEAM <ArrowRight size={18} />
           </Link>
        </motion.div>
      </div>
    </div>
  );
}
