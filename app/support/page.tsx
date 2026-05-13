"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, MessageCircle, Mail, Phone, BookOpen, BarChart3,
  ChevronRight, ArrowRight, Send, CheckCircle2, Clock,
  Headphones, Sparkles, Users, ExternalLink, Star
} from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How do I reset my API key?",
    a: "Navigate to Dashboard → Settings → API Keys. Click 'Regenerate Key'. Note: your old key will be invalidated immediately.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, and wire transfer for Enterprise plans.",
  },
  {
    q: "Can I export my data?",
    a: "Yes. From any data table, click the Export button to download as CSV or PDF. Bulk exports are available via the API.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — all plans include a 14-day free trial, no credit card required. You get full access to all features.",
  },
  {
    q: "How do I upgrade or downgrade my plan?",
    a: "Go to Settings → Billing → Change Plan. Upgrades take effect immediately; downgrades apply at the next billing cycle.",
  },
  {
    q: "What is your SLA uptime guarantee?",
    a: "We guarantee 99.9% uptime on all paid plans. Enterprise customers receive a dedicated SLA with financial credits.",
  },
];

const channels = [
  {
    icon: <MessageCircle size={24} />,
    title: "Live Chat",
    desc: "Chat with our support team in real time. Fastest response.",
    badge: "Avg. 2 min reply",
    badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    action: "Start Chat",
    color: "text-primary bg-primary/10 border-primary/20",
  },
  {
    icon: <Mail size={24} />,
    title: "Email Support",
    desc: "Send a detailed request. We'll get back within a few hours.",
    badge: "< 4 hour SLA",
    badgeColor: "text-primary bg-primary/10 border-primary/20",
    action: "Send Email",
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: <Phone size={24} />,
    title: "Phone & Call",
    desc: "Schedule a call with a dedicated support engineer.",
    badge: "Enterprise only",
    badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    action: "Book a Call",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
];

const resources = [
  { icon: <BookOpen size={20} />, title: "Documentation", desc: "Full guides, tutorials & API reference.", href: "/docs", color: "text-primary" },
  { icon: <BarChart3 size={20} />, title: "API Status", desc: "Check real-time service health.", href: "/api-status", color: "text-emerald-500" },
  { icon: <Users size={20} />, title: "Community", desc: "Join 5,000+ developers on Discord.", href: "#", color: "text-purple-500" },
  { icon: <Star size={20} />, title: "Feature Requests", desc: "Vote on what we build next.", href: "#", color: "text-amber-500" },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="border border-border/40 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span className="font-black text-sm">{q}</span>
        <ChevronRight
          size={16}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-6 text-sm text-muted-foreground font-medium leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function SupportPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "", type: "general" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-[100] border-b border-border/40 bg-background/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="font-black text-xl tracking-tighter">CORELYTICS</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors hidden sm:block">Docs</Link>
            <Link href="/api-status" className="hidden sm:flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              API Status
            </Link>
            <Link href="/dashboard" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-[12px] font-black uppercase tracking-wider hover:opacity-90 transition-opacity">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-24">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-20 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Headphones size={12} />
              24/7 Support & Contact
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-5">
              We&apos;re here to{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                help you
              </span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
              Reach our expert team through any channel. We pride ourselves on fast, thoughtful, and genuinely helpful support.
            </p>
          </motion.div>
        </section>

        {/* Support Channels */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {channels.map((ch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-7 rounded-3xl border border-border/40 bg-background hover:border-primary/30 hover:-translate-y-1 transition-all group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${ch.color}`}>
                  {ch.icon}
                </div>
                <h3 className="font-black text-lg tracking-tight mb-2">{ch.title}</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-5">{ch.desc}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${ch.badgeColor}`}>
                    {ch.badge}
                  </span>
                  <button className="flex items-center gap-1.5 text-sm font-black text-primary group-hover:gap-2.5 transition-all">
                    {ch.action} <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Main Content: Form + FAQ */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-black tracking-tight mb-2">Send a Message</h2>
                <p className="text-muted-foreground font-medium text-sm">Fill out the form and our team will respond within hours.</p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground font-medium max-w-xs leading-relaxed">
                    We&apos;ve received your message and will get back to you within 4 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "", type: "general" }); }}
                    className="mt-8 px-6 py-3 rounded-xl bg-secondary text-sm font-black hover:bg-secondary/80 transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Type selector */}
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-3">Request Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["general", "billing", "technical"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormState(s => ({ ...s, type }))}
                          className={`py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
                            formState.type === type
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                              : "bg-secondary border border-border/40 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Full Name</label>
                      <input
                        required
                        value={formState.name}
                        onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl border border-border/50 bg-secondary/30 text-sm font-medium outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Email Address</label>
                      <input
                        required
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-border/50 bg-secondary/30 text-sm font-medium outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Subject</label>
                    <input
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState(s => ({ ...s, subject: e.target.value }))}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3.5 rounded-xl border border-border/50 bg-secondary/30 text-sm font-medium outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Message</label>
                    <textarea
                      required
                      rows={6}
                      value={formState.message}
                      onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                      placeholder="Describe your issue or question in detail..."
                      className="w-full px-4 py-3.5 rounded-xl border border-border/50 bg-secondary/30 text-sm font-medium outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all resize-none placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-primary text-primary-foreground font-black tracking-wide hover:-translate-y-0.5 active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground font-medium">
                    <Clock size={12} />
                    Average response time: under 4 hours
                  </div>
                </form>
              )}
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-black tracking-tight mb-2">Frequently Asked</h2>
                <p className="text-muted-foreground font-medium text-sm">Quick answers to the most common questions.</p>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Resource Links */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black tracking-tight mb-2">More Resources</h2>
            <p className="text-muted-foreground font-medium text-sm">Find the answers you need faster.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((res, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <Link
                  href={res.href}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-border/40 bg-background hover:border-primary/30 hover:-translate-y-1 transition-all group block"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-secondary group-hover:scale-110 transition-transform ${res.color}`}>
                    {res.icon}
                  </div>
                  <div>
                    <p className="font-black text-sm mb-0.5 group-hover:text-primary transition-colors">{res.title}</p>
                    <p className="text-xs text-muted-foreground font-medium leading-snug">{res.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden p-10 md:p-14 rounded-3xl bg-gradient-to-br from-primary/15 via-purple-500/8 to-transparent border border-primary/20 text-center"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <Sparkles size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">
                Still need help?
              </h2>
              <p className="text-muted-foreground font-medium max-w-lg mx-auto mb-8 leading-relaxed">
                Our enterprise support team is available around the clock. Upgrade to unlock priority support and dedicated account management.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/pricing" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-black hover:-translate-y-1 transition-all shadow-xl shadow-primary/20">
                  Upgrade Plan <ArrowRight size={16} />
                </Link>
                <Link href="/docs" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary border border-border/50 font-black hover:bg-secondary/80 transition-all">
                  Browse Docs <ExternalLink size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
