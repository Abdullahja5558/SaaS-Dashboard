"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Alex Thompson",
    role: "CEO, TechFlow",
    content: "Corelytics transformed our data strategy. The real-time insights allowed us to pivot faster than ever before.",
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    name: "Sarah Chen",
    role: "Product Manager, InnovateX",
    content: "The cleanest UI I've ever seen in a SaaS dashboard. It's not just beautiful; it's incredibly powerful.",
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  {
    name: "Michael Ross",
    role: "Founder, ScaleUp",
    content: "We saved 20+ hours a week on manual reporting. Corelytics paid for itself in the first month.",
    avatar: "https://i.pravatar.cc/150?u=3"
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director, GlobalReach",
    content: "The predictive AI is a game changer. We can now anticipate market trends before they even happen.",
    avatar: "https://i.pravatar.cc/150?u=4"
  },
  {
    name: "David Kim",
    role: "CTO, DataSync",
    content: "Integration was seamless. We connected our entire stack in under 10 minutes. Highly recommended.",
    avatar: "https://i.pravatar.cc/150?u=5"
  },
  {
    name: "Jessica Walsh",
    role: "Design Lead, CreativePulse",
    content: "As a designer, I appreciate the attention to detail. The glassmorphic aesthetic is simply stunning.",
    avatar: "https://i.pravatar.cc/150?u=6"
  },
  {
    name: "Omar Al-Fayed",
    role: "E-commerce Manager, LuxeStore",
    content: "Our conversion rates skyrocketed after we started using the customer behavioral analytics.",
    avatar: "https://i.pravatar.cc/150?u=7"
  },
  {
    name: "Lisa Vanderpump",
    role: "Owner, Restaurateur",
    content: "Managing multiple locations used to be a nightmare. Corelytics brought everything into one place.",
    avatar: "https://i.pravatar.cc/150?u=8"
  },
  {
    name: "Tom Hardy",
    role: "Operations Manager, FastLogistics",
    content: "The mobile responsiveness is perfect. I can check my business vitals from anywhere in the world.",
    avatar: "https://i.pravatar.cc/150?u=9"
  },
  {
    name: "Sophia Loren",
    role: "HR Director, PeopleFirst",
    content: "Even for non-technical staff, the dashboard is incredibly intuitive. The learning curve is zero.",
    avatar: "https://i.pravatar.cc/150?u=10"
  }
];

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % reviews.length);
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-black uppercase tracking-widest mb-8"
           >
             Trusted by Leaders
           </motion.div>
           <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">What our clients <span className="italic text-primary">say.</span></h2>
        </div>

        <div className="relative flex items-center justify-center">
           <button 
             onClick={prev}
             className="absolute left-0 z-20 w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg -translate-x-1/2 md:translate-x-0"
           >
              <ChevronLeft size={20} />
           </button>

           <div className="w-full max-w-4xl overflow-hidden px-4">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={index}
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -50 }}
                   transition={{ duration: 0.5, ease: "easeInOut" }}
                   className="glass-card p-12 md:p-20 rounded-[48px] border border-border/50 text-center relative"
                 >
                    <Quote className="absolute top-10 left-10 text-primary/10 w-24 h-24 -z-10" />
                    <div className="flex justify-center gap-1 mb-8">
                       {[1,2,3,4,5].map(i => <Star key={i} size={20} className="fill-amber-500 text-amber-500" />)}
                    </div>
                    <p className="text-2xl md:text-3xl font-medium italic leading-relaxed mb-12">"{reviews[index].content}"</p>
                    <div className="flex flex-col items-center gap-4">
                       <img src={reviews[index].avatar} alt={reviews[index].name} className="w-16 h-16 rounded-2xl object-cover shadow-xl" />
                       <div>
                          <h4 className="font-black text-xl">{reviews[index].name}</h4>
                          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">{reviews[index].role}</p>
                       </div>
                    </div>
                 </motion.div>
              </AnimatePresence>
           </div>

           <button 
             onClick={next}
             className="absolute right-0 z-20 w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg translate-x-1/2 md:translate-x-0"
           >
              <ChevronRight size={20} />
           </button>
        </div>

        <div className="flex justify-center gap-3 mt-12">
           {reviews.map((_, i) => (
             <button
               key={i}
               onClick={() => setIndex(i)}
               className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-primary' : 'w-2 bg-secondary'}`}
             />
           ))}
        </div>
      </div>
    </section>
  );
}
