"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Clock } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { motion } from "framer-motion";

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 border-b bg-background/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search analytics, transactions..."
            className="w-full bg-secondary/50 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border">
          <Clock size={16} />
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="p-2 rounded-full hover:bg-secondary transition-colors relative">
            <Bell size={20} className="text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
