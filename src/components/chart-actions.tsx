"use client";

import { Send, FileText, ClipboardList, UploadCloud, FolderPlus, Calculator } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ChartAndActions() {
  const data = [30, 45, 80, 50, 40, 20, 95, 70, 85, 40, 30, 75];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 350, damping: 24 } as any }
  };

  const quickActions = [
    {
      title: "DISPATCH INVOICE",
      sub: "Stripe & Escrow Links",
      icon: FileText,
      href: "/dashboard/invoices"
    },
    {
      title: "TRANSMIT PROPOSAL",
      sub: "Auto-Cadence Cadence",
      icon: Send,
    },
    {
      title: "ISSUE CONTRACT",
      sub: "Milestone Orbital Terms",
      icon: ClipboardList,
    },
    {
      title: "INGEST PAYLOAD",
      sub: "Import CSV / Registry",
      icon: FolderPlus,
    },
    {
      title: "INITIATE MISSION",
      sub: "Retainer Deliverables",
      icon: UploadCloud,
    },
    {
      title: "AUDIT TAX LEDGER",
      sub: "Sec 43B 45-Day Countdown",
      icon: Calculator,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2">
      {/* Earnings Over Time Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="bg-white border-2 border-[#0A0A0A] rounded-[24px] p-6 shadow-[5px_5px_0px_#0A0A0A] flex flex-col justify-between"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display text-sm tracking-wide text-[#0A0A0A] uppercase">
                REVENUE DISPATCH
              </h3>
              <span className="font-label text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#0A0A0A] text-white border border-[#0A0A0A] tracking-wider uppercase">
                PEAK: FEB ($24.8K)
              </span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 font-label text-[10px] text-[#0A0A0A] font-bold tracking-wider uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0A0A0A]"></span> FLIGHT WORK
              </div>
              <div className="flex items-center gap-1.5 font-label text-[10px] text-[#0A0A0A]/70 font-bold tracking-wider uppercase">
                <span className="w-2.5 h-2.5 rounded-full border border-[#0A0A0A] bg-[#DEDEC8]"></span> AUTO-RECOVERED
              </div>
            </div>
          </div>
          
          <select className="font-label text-[11px] font-bold text-[#0A0A0A] bg-[#DEDEC8] border-2 border-[#0A0A0A] rounded-full px-3 py-1 outline-none shadow-[2px_2px_0px_#0A0A0A] cursor-pointer">
            <option>CYCLE 2026 // LUNAR</option>
          </select>
        </div>
        
        {/* Vintage Bar Chart */}
        <div className="flex-1 flex items-end justify-between gap-2 h-44 pt-4 border-b-2 border-[#0A0A0A]">
          {data.map((pct, i) => (
            <div key={i} className="relative group w-full flex flex-col justify-end h-full">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${pct}%` }}
                transition={{ delay: 0.3 + (i * 0.04), duration: 0.6, type: "spring", bounce: 0.2 }}
                className={`w-full rounded-t-sm border-t-2 border-x-2 border-[#0A0A0A] transition-all hover:brightness-90 ${
                  i === 1 || i === 6 ? "bg-[#0A0A0A]" : "bg-[#0A0A0A]/85 hover:bg-[#0A0A0A]"
                }`}
              >
                {/* Vintage hatch lines on higher bars */}
                {pct > 50 && (
                  <div className="w-full h-2 border-b border-white/20"></div>
                )}
              </motion.div>
              <div className="font-label text-[9px] text-[#0A0A0A] text-center mt-2 font-bold tracking-wider">{months[i]}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions (2x3 Grid) */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {quickActions.map((qa, idx) => {
          const Icon = qa.icon;
          const CardContent = (
            <div className="bg-white border-2 border-[#0A0A0A] rounded-[18px] p-4 flex flex-col items-start justify-between gap-3 h-full shadow-[3px_3px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#0A0A0A] transition-all text-left w-full group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center border border-[#0A0A0A] group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <span className="font-label text-[12px] font-bold text-[#0A0A0A] block tracking-wide uppercase leading-tight">
                  {qa.title}
                </span>
                <span className="text-[10px] font-sans text-[#0A0A0A]/70 block mt-0.5">
                  {qa.sub}
                </span>
              </div>
            </div>
          );

          return (
            <motion.div key={idx} variants={item} whileTap={{ scale: 0.98 }}>
              {qa.href ? (
                <Link href={qa.href} className="block h-full">
                  {CardContent}
                </Link>
              ) : (
                <button type="button" className="block w-full h-full text-left">
                  {CardContent}
                </button>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
