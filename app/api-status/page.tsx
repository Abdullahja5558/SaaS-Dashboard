"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, CheckCircle2, AlertCircle, AlertTriangle, Clock,
  Server, Database, Globe, Shield, Cpu, BarChart3,
  RefreshCw, ExternalLink, ArrowRight, Activity
} from "lucide-react";
import { useState, useEffect } from "react";

type StatusType = "operational" | "degraded" | "outage" | "maintenance";

interface Service {
  name: string;
  status: StatusType;
  uptime: string;
  latency: string;
  icon: React.ReactNode;
  description: string;
}

const services: Service[] = [
  { name: "API Gateway", status: "operational", uptime: "99.98%", latency: "12ms", icon: <Globe size={20} />, description: "Core REST API serving all client requests" },
  { name: "Authentication Service", status: "operational", uptime: "99.99%", latency: "8ms", icon: <Shield size={20} />, description: "OAuth 2.0 & JWT token management" },
  { name: "Analytics Engine", status: "operational", uptime: "99.95%", latency: "34ms", icon: <BarChart3 size={20} />, description: "Real-time data processing and aggregation" },
  { name: "Database Cluster", status: "operational", uptime: "99.99%", latency: "5ms", icon: <Database size={20} />, description: "Primary Supabase Postgres cluster" },
  { name: "Dashboard App", status: "operational", uptime: "99.97%", latency: "180ms", icon: <Cpu size={20} />, description: "Web application hosting & CDN" },
  { name: "Webhooks Service", status: "degraded", uptime: "98.12%", latency: "92ms", icon: <Server size={20} />, description: "Event delivery and retry mechanisms" },
  { name: "Email Notifications", status: "operational", uptime: "99.90%", latency: "420ms", icon: <Activity size={20} />, description: "Transactional email and alert delivery" },
];

const pastIncidents = [
  { date: "May 10, 2026", title: "Webhooks intermittent delays", duration: "47 min", status: "resolved" as const, description: "Webhook delivery was delayed for some customers due to queue saturation. All events were eventually delivered." },
  { date: "Apr 28, 2026", title: "Scheduled database maintenance", duration: "15 min", status: "resolved" as const, description: "Planned maintenance window for index optimization. Brief read-only window during off-peak hours." },
  { date: "Apr 14, 2026", title: "API elevated error rates", duration: "23 min", status: "resolved" as const, description: "A deployment caused elevated 5xx errors. Rolled back within 23 minutes, all systems restored." },
];

const statusConfig = {
  operational: {
    label: "Operational",
    icon: <CheckCircle2 size={15} />,
    bar: "bg-emerald-500",
    text: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  degraded: {
    label: "Degraded Performance",
    icon: <AlertTriangle size={15} />,
    bar: "bg-amber-500",
    text: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  outage: {
    label: "Outage",
    icon: <AlertCircle size={15} />,
    bar: "bg-red-500",
    text: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  maintenance: {
    label: "Maintenance",
    icon: <Clock size={15} />,
    bar: "bg-blue-500",
    text: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
};

function UptimeBars({ status }: { status: StatusType }) {
  const bars = Array.from({ length: 90 }, (_, i) => {
    if (status === "degraded" && (i === 71 || i === 55)) return "amber";
    if (status === "outage" && i > 85) return "red";
    return "green";
  });
  return (
    <div className="flex items-end gap-0.5 h-8">
      {bars.map((color, i) => (
        <div
          key={i}
          className={`w-1 rounded-sm transition-all hover:opacity-100 ${
            color === "green" ? "bg-emerald-500/70 h-full hover:bg-emerald-500" :
            color === "amber" ? "bg-amber-500 h-3/4" :
            "bg-red-500 h-1/2"
          }`}
          style={{ opacity: i < 85 ? 0.6 + (i / 85) * 0.4 : 1 }}
        />
      ))}
    </div>
  );
}

export default function ApiStatusPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const allOperational = services.every(s => s.status === "operational");
  const hasIssues = services.some(s => s.status === "outage");
  const hasDegraded = services.some(s => s.status === "degraded");

  const overallStatus = hasIssues ? "outage" : hasDegraded ? "degraded" : "operational";
  const overallConfig = statusConfig[overallStatus];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setRefreshing(false);
    }, 1200);
  };

  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-[100] border-b border-border/40 bg-background/80 backdrop-blur-2xl">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="font-black text-xl tracking-tighter">CORELYTICS</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors hidden sm:block">Docs</Link>
            <Link href="/support" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors hidden sm:block">Support</Link>
            <Link href="/dashboard" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-[12px] font-black uppercase tracking-wider hover:opacity-90 transition-opacity">Dashboard</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Hero Status Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl border ${overallConfig.bg} ${overallConfig.border} mb-8`}>
              <span className={`${overallConfig.text} ${overallStatus === "operational" ? "animate-pulse" : ""}`}>
                {overallConfig.icon}
              </span>
              <span className={`font-black text-sm uppercase tracking-widest ${overallConfig.text}`}>
                {allOperational ? "All Systems Operational" : overallConfig.label}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              API Status
            </h1>
            <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto">
              Real-time health monitoring for all Corelytics services and infrastructure.
            </p>

            {/* Last Updated */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="text-xs text-muted-foreground font-bold">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-all text-xs font-black"
              >
                <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </motion.div>

          {/* Overall Uptime Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { label: "Overall Uptime", value: "99.97%", color: "text-emerald-500" },
              { label: "Avg Latency", value: "24ms", color: "text-primary" },
              { label: "Incidents (30d)", value: "2", color: "text-amber-500" },
              { label: "Services Online", value: `${services.filter(s => s.status === "operational").length}/${services.length}`, color: "text-foreground" },
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-2xl border border-border/40 bg-secondary/20 text-center">
                <p className={`text-2xl md:text-3xl font-black ${stat.color} mb-1`}>{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Services List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black tracking-tight">Service Health</h2>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full" />Operational</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500 rounded-full" />Degraded</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-red-500 rounded-full" />Outage</div>
              </div>
            </div>

            <div className="space-y-3">
              {services.map((service, i) => {
                const cfg = statusConfig[service.status];
                return (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.07 }}
                    className="p-5 md:p-6 rounded-2xl border border-border/40 bg-background hover:border-border/60 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Icon + Name */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg} ${cfg.text}`}>
                          {service.icon}
                        </div>
                        <div>
                          <p className="font-black text-sm">{service.name}</p>
                          <p className="text-xs text-muted-foreground font-medium">{service.description}</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 flex-shrink-0">
                        <div className="text-center hidden md:block">
                          <p className="text-xs font-black text-foreground">{service.uptime}</p>
                          <p className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">Uptime</p>
                        </div>
                        <div className="text-center hidden md:block">
                          <p className="text-xs font-black text-foreground">{service.latency}</p>
                          <p className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">Latency</p>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${cfg.bg} ${cfg.border} border`}>
                          <span className={cfg.text}>{cfg.icon}</span>
                          <span className={`text-[10px] font-black uppercase tracking-wider ${cfg.text}`}>{cfg.label}</span>
                        </div>
                      </div>
                    </div>

                    {/* Uptime bars */}
                    <div className="mt-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">90-day uptime</span>
                        <span className="text-[9px] font-black text-muted-foreground">Today</span>
                      </div>
                      <UptimeBars status={service.status} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Past Incidents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-black tracking-tight mb-6">Past Incidents</h2>
            <div className="space-y-4">
              {pastIncidents.map((incident, i) => (
                <div key={i} className="p-6 rounded-2xl border border-border/40 bg-background">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                        <p className="font-black text-sm">{incident.title}</p>
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-wider border border-emerald-500/20">
                          Resolved
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed pl-7">{incident.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-black text-foreground">{incident.date}</p>
                      <p className="text-[10px] text-muted-foreground font-bold">Duration: {incident.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Subscribe Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-xl font-black tracking-tight mb-1">Subscribe to Status Updates</h3>
              <p className="text-muted-foreground font-medium text-sm">Get notified instantly when an incident is created or resolved.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/support" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-black hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20">
                Subscribe <ArrowRight size={16} />
              </Link>
              <Link href="/docs" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary border border-border/50 text-sm font-black hover:bg-secondary/80 transition-all">
                View Docs <ExternalLink size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
