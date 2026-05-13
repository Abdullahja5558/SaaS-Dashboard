"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const themes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "night", icon: Moon, label: "Night", className: "text-purple-500" },
  ];

  return (
    <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-full border">
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.name;
        return (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={cn(
              "relative p-1.5 rounded-full transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
            title={t.label}
          >
            {isActive && (
              <motion.div
                layoutId="theme-active"
                className="absolute inset-0 bg-background rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon size={16} className={cn("relative z-10", t.name === 'night' && isActive && "text-purple-500")} />
          </button>
        );
      })}
    </div>
  );
}
