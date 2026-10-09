"use client";

import { Send, FileText, ClipboardList, UploadCloud, FolderPlus, Calculator } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ChartAndActions() {
  const data = [30, 45, 80, 50, 40, 20, 95, 70, 85, 40, 30, 75];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } as any }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[320px] mt-5">
      {/* Earnings Over Time Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="glass-card rounded-[24px] p-6 flex flex-col justify-between"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-serif font-bold text-lg text-white tracking-tight">Earning over time</h3>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">Peak: Feb ($24.8k)</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-white"></span> Billable Work
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span> Auto-Recovered AR
              </div>
            </div>
          </div>
          
          <select className="text-[11px] font-bold text-gray-400 bg-[#111] border border-[#222] rounded-md px-2 py-1 outline-none appearance-none cursor-pointer hover:bg-[#1a1a1a] transition-colors">
            <option>Month (2026)</option>
          </select>
        </div>
        
        <div className="flex-1 flex items-end justify-between gap-3 h-full">
          {data.map((pct, i) => (
            <div key={i} className="relative group w-full flex flex-col justify-end h-full">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${pct}%` }}
                transition={{ delay: 0.5 + (i * 0.05), duration: 0.8, type: "spring", bounce: 0.2 }}
                className="w-full bg-gradient-to-t from-orange-500/20 to-orange-500/80 rounded-t-md transition-all hover:brightness-110 shadow-sm" 
              ></motion.div>
              <div className="text-[9px] text-gray-500 text-center mt-2 font-bold">{months[i]}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions (2x3 Grid) */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div variants={item} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href="/dashboard/invoices" className="glass-card rounded-[20px] p-4 flex flex-col items-start justify-center gap-2 group h-full">
            <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 mb-1 group-hover:scale-110 transition-transform shadow-sm">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[12px] font-bold text-white block">Send an invoice</span>
              <span className="text-[10px] font-semibold text-gray-500">Stripe & UPI links</span>
            </div>
          </Link>
        </motion.div>
        
        <motion.button variants={item} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="glass-card rounded-[20px] p-4 flex flex-col items-start justify-center gap-2 group text-left w-full h-full">
          <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 mb-1 group-hover:scale-110 transition-transform shadow-sm">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[12px] font-bold text-white block">Draft a proposal</span>
            <span className="text-[10px] font-semibold text-gray-500">Polite auto-chasing</span>
          </div>
        </motion.button>
        
        <motion.button variants={item} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="glass-card rounded-[20px] p-4 flex flex-col items-start justify-center gap-2 group text-left w-full h-full">
          <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 mb-1 group-hover:scale-110 transition-transform shadow-sm">
            <ClipboardList className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[12px] font-bold text-white block">Create a contract</span>
            <span className="text-[10px] font-semibold text-gray-500">Milestone terms</span>
          </div>
        </motion.button>
        
        <motion.button variants={item} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="glass-card rounded-[20px] p-4 flex flex-col items-start justify-center gap-2 group text-left w-full h-full">
          <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 mb-1 group-hover:scale-110 transition-transform shadow-sm">
            <FolderPlus className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[12px] font-bold text-white block">Add a form</span>
            <span className="text-[10px] font-semibold text-gray-500">Import CSV / Excel</span>
          </div>
        </motion.button>
        
        <motion.button variants={item} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="glass-card rounded-[20px] p-4 flex flex-col items-start justify-center gap-2 group text-left w-full h-full">
          <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 mb-1 group-hover:scale-110 transition-transform shadow-sm">
            <UploadCloud className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[12px] font-bold text-white block">Create a project</span>
            <span className="text-[10px] font-semibold text-gray-500">Retainer deliverables</span>
          </div>
        </motion.button>
        
        <motion.button variants={item} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="glass-card rounded-[20px] p-4 flex flex-col items-start justify-center gap-2 group text-left w-full h-full">
          <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 mb-1 group-hover:scale-110 transition-transform shadow-sm">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[12px] font-bold text-white block">File Tax</span>
            <span className="text-[10px] font-semibold text-gray-500">Sec 43B 45-day tracking</span>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
