"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart3, 
  ArrowLeftRight, 
  Package, 
  Users, 
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { User } from "@/lib/types";
import { supabase } from "@/lib/supabase";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { name: "Products", href: "/products", icon: Package },
  { name: "Users", href: "/users", icon: Users, adminOnly: true },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const session = auth.getSession();
    if (session) {
      setUser(session);
      fetchUnreadCount(session.id);
    }

    // Auto-collapse on smaller screens/tablets
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchUnreadCount = async (userId: string) => {
    const { count } = await supabase
      .from('sb_notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    
    setUnreadCount(count || 0);
  };

  const handleLogout = () => {
    auth.clearSession();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <>
    <motion.aside
      initial={false}
      animate={{ 
        width: isCollapsed ? 88 : 280,
        x: 0 
      }}
      className="hidden md:flex fixed left-0 top-0 h-screen bg-card border-r border-border/40 z-50 flex-col shadow-[20px_0_40px_rgba(0,0,0,0.02)]"
    >
      <div className="p-6 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary rounded-[14px] flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 rotate-3">
                <Zap size={22} fill="currentColor" />
              </div>
              <span className="font-display font-black text-xl tracking-tighter bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                CORELYTICS
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          if (item.adminOnly && user.role !== 'Admin') return null;
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "group relative flex items-center h-12 rounded-[18px] px-4 transition-all duration-300",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon size={20} className={cn("min-w-[20px]", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-4 font-black text-[13px] uppercase tracking-widest"
                  >
                    {item.name}
                  </motion.span>
                )}
                
                {item.name === "Notifications" && unreadCount > 0 && (
                  <div className={cn(
                    "absolute right-4 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white shadow-lg",
                    isCollapsed && "top-1 right-1"
                  )}>
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-border/40 space-y-6">
        {!isCollapsed && (
          <div className="flex items-center gap-4 px-2">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border-2 border-background overflow-hidden shadow-inner">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <Users size={24} className="text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black truncate">{user.name}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary truncate">{user.role}</p>
            </div>
          </div>
        )}
        
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center h-12 rounded-[18px] px-4 text-rose-500 hover:bg-rose-500/10 transition-all font-black text-[13px] uppercase tracking-widest",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut size={20} className="min-w-[20px]" />
          {!isCollapsed && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </motion.aside>

    {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 h-20 bg-background/80 backdrop-blur-2xl border border-border/40 z-[60] flex items-center justify-around px-4 rounded-[32px] shadow-2xl will-change-transform">
        {navItems.slice(0, 5).map((item) => {
          if (item.adminOnly && user.role !== 'Admin') return null;
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex flex-col items-center gap-1.5 p-2 transition-all",
              isActive ? "text-primary scale-110" : "text-muted-foreground"
            )}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-black uppercase tracking-tighter">{item.name.slice(0, 5)}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
