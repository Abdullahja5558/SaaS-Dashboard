"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, BookOpen, Code2, Terminal, ChevronRight, Search, ArrowRight,
  FileText, Layers, Cpu, Shield, Globe, Database, BarChart3,
  Copy, Check, ExternalLink, Menu, X
} from "lucide-react";
import { useState } from "react";

const sidebarSections = [
  {
    title: "Getting Started",
    icon: <BookOpen size={16} />,
    items: ["Introduction", "Quick Start", "Installation", "Authentication"],
  },
  {
    title: "Core Concepts",
    icon: <Layers size={16} />,
    items: ["Dashboard Overview", "Analytics Engine", "Data Pipeline", "Permissions"],
  },
  {
    title: "API Reference",
    icon: <Code2 size={16} />,
    items: ["REST Endpoints", "Webhooks", "Rate Limits", "Error Codes"],
  },
  {
    title: "Integrations",
    icon: <Globe size={16} />,
    items: ["Supabase", "Stripe", "Slack", "Zapier"],
  },
  {
    title: "Security",
    icon: <Shield size={16} />,
    items: ["Data Encryption", "RLS Policies", "OAuth 2.0", "Audit Logs"],
  },
];

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group rounded-2xl overflow-hidden border border-border/50 bg-[#0d0d14] my-4">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/30 bg-white/5">
        <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{language}</span>
        <button onClick={handleCopy} className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors">
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-5 text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("Introduction");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-[100] border-b border-border/40 bg-background/80 backdrop-blur-2xl">
        <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Zap size={18} fill="currentColor" />
              </div>
              <span className="font-black text-xl tracking-tighter">CORELYTICS</span>
              <span className="hidden sm:block px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">Docs</span>
            </Link>
          </div>
          <div className="flex-1 max-w-md hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-secondary/60 border border-border/50">
            <Search size={16} className="text-muted-foreground flex-shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="bg-transparent text-sm font-medium w-full outline-none placeholder:text-muted-foreground/60"
            />
            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-background border border-border/50 text-[10px] font-black text-muted-foreground">⌘K</kbd>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/api-status" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 text-[11px] font-black uppercase tracking-wider border border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              All Systems Operational
            </Link>
            <Link href="/dashboard" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-[12px] font-black uppercase tracking-wider hover:opacity-90 transition-opacity">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex pt-16 max-w-screen-2xl mx-auto">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-16 h-[calc(100vh-4rem)] w-72 flex-shrink-0 overflow-y-auto border-r border-border/40 bg-background/95 backdrop-blur-xl z-50 lg:z-auto transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="p-6 space-y-6">
            {sidebarSections.map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-primary">{section.icon}</span>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{section.title}</h4>
                </div>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => { setActiveSection(item); setSidebarOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          activeSection === item
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                        }`}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-6 md:px-12 py-12">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-8">
              <span>Docs</span>
              <ChevronRight size={12} />
              <span className="text-primary">{activeSection}</span>
            </div>

            {/* Page Title */}
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-5"
              >
                <FileText size={12} />
                Documentation
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                {activeSection}
              </h1>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                Everything you need to integrate, configure, and scale with Corelytics.
                Built for developers who move fast.
              </p>
            </div>

            {/* Quick Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {[
                { icon: <Terminal size={20} />, label: "REST API", desc: "Full CRUD endpoints", color: "text-primary bg-primary/10 border-primary/20" },
                { icon: <Database size={20} />, label: "Real-time", desc: "WebSocket streams", color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
                { icon: <Cpu size={20} />, label: "99.9% Uptime", desc: "SLA guaranteed", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-5 rounded-2xl border bg-background ${card.color} flex items-start gap-4`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color}`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="font-black text-sm">{card.label}</p>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Introduction Content */}
            <div className="space-y-10">
              <section>
                <h2 className="text-2xl font-black tracking-tight mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-black">1</span>
                  Getting Started
                </h2>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  Welcome to the Corelytics developer documentation. Our API is built on REST principles
                  with JSON payloads, predictable resource-oriented URLs, and uses standard HTTP response codes.
                </p>
                <div className="mt-6 p-5 rounded-2xl border border-border/50 bg-secondary/20">
                  <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-2">Base URL</p>
                  <code className="text-sm font-mono text-primary">https://api.corelytics.io/v1</code>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-black">2</span>
                  Installation
                </h2>
                <p className="text-muted-foreground leading-relaxed font-medium mb-4">
                  Install the official Corelytics SDK using your preferred package manager:
                </p>
                <CodeBlock code={`# npm
npm install @corelytics/sdk

# yarn
yarn add @corelytics/sdk

# pnpm
pnpm add @corelytics/sdk`} language="bash" />
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-black">3</span>
                  Authentication
                </h2>
                <p className="text-muted-foreground leading-relaxed font-medium mb-4">
                  Corelytics uses API keys to authenticate requests. You can view and manage your API keys in the Dashboard settings.
                </p>
                <CodeBlock code={`import { Corelytics } from '@corelytics/sdk';

const client = new Corelytics({
  apiKey: process.env.CORELYTICS_API_KEY,
  environment: 'production', // or 'sandbox'
});

// Verify connection
const status = await client.ping();
console.log(status); // { ok: true, latency: 12 }`} language="typescript" />
                <div className="mt-6 p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
                    <Shield size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-amber-500 mb-1">Security Notice</p>
                    <p className="text-sm text-muted-foreground font-medium">Never expose your API key in client-side code. Always use environment variables and server-side calls.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight mb-6">Core Endpoints</h2>
                <div className="space-y-3">
                  {[
                    { method: "GET", path: "/analytics/overview", desc: "Fetch aggregated business metrics" },
                    { method: "GET", path: "/transactions", desc: "List all transactions with filters" },
                    { method: "POST", path: "/transactions", desc: "Create a new transaction record" },
                    { method: "GET", path: "/products", desc: "Retrieve product catalog" },
                    { method: "PUT", path: "/products/:id", desc: "Update product details" },
                    { method: "GET", path: "/users", desc: "List all business users" },
                  ].map((ep, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/40 hover:border-primary/30 hover:bg-secondary/20 transition-all group cursor-pointer"
                    >
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex-shrink-0 ${
                        ep.method === "GET" ? "bg-emerald-500/10 text-emerald-500" :
                        ep.method === "POST" ? "bg-primary/10 text-primary" :
                        ep.method === "PUT" ? "bg-amber-500/10 text-amber-500" :
                        "bg-red-500/10 text-red-500"
                      }`}>
                        {ep.method}
                      </span>
                      <code className="text-sm font-mono text-foreground flex-1">{ep.path}</code>
                      <span className="text-xs text-muted-foreground font-medium hidden sm:block">{ep.desc}</span>
                      <ExternalLink size={14} className="text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Next Steps */}
              <section className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent border border-primary/20">
                <h3 className="text-xl font-black tracking-tight mb-3">Ready to explore more?</h3>
                <p className="text-muted-foreground font-medium mb-6">Check the API reference or join our developer community.</p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setActiveSection("REST Endpoints")} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-black hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20">
                    API Reference <ArrowRight size={16} />
                  </button>
                  <Link href="/support" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary border border-border/50 text-sm font-black hover:bg-secondary/80 transition-all">
                    Contact Support <ExternalLink size={16} />
                  </Link>
                </div>
              </section>
            </div>
          </motion.div>
        </main>

        {/* Right TOC */}
        <aside className="hidden xl:block w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-6 border-l border-border/30">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-5">On This Page</p>
          <ul className="space-y-2">
            {["Getting Started", "Installation", "Authentication", "Core Endpoints"].map((item) => (
              <li key={item}>
                <a className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors block py-1">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-8 border-t border-border/30">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Resources</p>
            <div className="space-y-2">
              <Link href="/api-status" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                API Status
              </Link>
              <Link href="/support" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink size={13} />
                Support
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
