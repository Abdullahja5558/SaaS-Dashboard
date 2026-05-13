"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface KPICardProps {
  title: string;
  value: string | number;
  trend: number;
  data: { value: number }[];
  icon: React.ReactNode;
  color?: string;
}

export default function KPICard({ title, value, trend, data, icon, color = "primary" }: KPICardProps) {
  const isPositive = trend >= 0;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group"
    >
      <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r", 
        color === "primary" ? "from-primary to-purple-500" : "from-emerald-500 to-teal-500"
      )} />
      
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2 rounded-xl bg-secondary group-hover:scale-110 transition-transform")}>
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
        )}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(trend)}%
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-display font-bold mt-1 text-foreground">{value}</h3>
      </div>

      <div className="h-16 mt-4 -mx-6 -mb-6 opacity-50">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3} />
                <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={2}
              fill={`url(#gradient-${title})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
