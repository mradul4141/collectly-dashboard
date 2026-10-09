"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MessageSquare, 
  Mail, 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  FileQuestion,
  ExternalLink
} from "lucide-react";

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });

  const faqs = [
    {
      q: "How does Collectly chase overdue payments automatically?",
      a: "Collectly connects with your invoice provider (like Stripe or CSV uploads) and triggers customizable reminder ladders via email, SMS, and WhatsApp based on payment milestones."
    },
    {
      q: "What is the Section 43B(h) compliance feature?",
      a: "For businesses invoicing registered MSME vendors or buyers, Indian tax law mandates invoice clearance within 45 days. Collectly monitors these deadlines and raises priority alerts before filing periods."
    },
    {
      q: "Can I pause automatic sequences for specific clients?",
      a: "Yes. From the Kanban Board or Client Detail page, simply move the card to 'Promised to Pay' or 'Disputed' to immediately pause automated communications."
    },
    {
      q: "How secure is client financial data?",
      a: "We use Supabase Row-Level Security (RLS) coupled with encrypted SSL connections and never store raw cardholder details."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-orange-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-gray-900 bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-gray-400">Support Desk Active</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20 mb-4">
              <HelpCircle className="w-3.5 h-3.5" /> 24/7 Priority Assistance
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-white">
              How can we help your team today?
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Find instant answers to common questions or open a direct ticket with our product and integrations specialists.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* FAQ Column */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-orange-500" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-[#111] border border-gray-900 rounded-2xl p-5 hover:border-gray-800 transition-colors"
                >
                  <h3 className="text-sm font-bold text-gray-200 mb-2 flex items-start justify-between gap-4">
                    <span>{faq.q}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Documentation Banner */}
            <div className="bg-gradient-to-r from-orange-500/10 via-transparent to-transparent border border-orange-500/20 rounded-2xl p-6 mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Developer API & Webhooks Docs</h4>
                <p className="text-xs text-gray-400">Read our guides on connecting custom CRM hooks & Stripe webhooks.</p>
              </div>
              <Link 
                href="/dashboard/settings" 
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#1a1a1a] text-white hover:bg-[#252525] border border-gray-800 transition-colors shrink-0"
              >
                View Settings <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Ticket Form Column */}
          <div className="lg:col-span-5">
            <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Open a Ticket</h3>
                  <p className="text-xs text-gray-500">Typical response time: under 2 hours</p>
                </div>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Ticket Submitted!</h4>
                  <p className="text-xs text-gray-400 max-w-xs mb-6">
                    Our team received your message and will reach out to <strong className="text-white">{formData.email || "your email"}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "general", message: "" });
                    }}
                    className="text-xs font-bold text-orange-500 hover:text-orange-400"
                  >
                    Send another inquiry &rarr;
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">Work Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 outline-none focus:border-orange-500 transition-colors"
                    >
                      <option value="general">General Support</option>
                      <option value="invoices">Invoice & Stripe Syncing</option>
                      <option value="cadence">WhatsApp & Cadence Setup</option>
                      <option value="compliance">Section 43B & Tax Reports</option>
                      <option value="billing">Account & Plan Upgrade</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">Message</label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Describe the issue or question in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black font-bold text-sm py-3.5 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10 mt-2"
                  >
                    <Send className="w-4 h-4" /> Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
