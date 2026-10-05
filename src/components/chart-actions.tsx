"use client";

import { Send, FileText, ClipboardList, UploadCloud, FolderPlus, Calculator } from "lucide-react";
import Link from "next/link";

export function ChartAndActions() {
  const data = [30, 45, 80, 50, 40, 20, 95, 70, 85, 40, 30, 75];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[320px] mt-5">
      {/* Earnings Over Time Chart */}
      <div className="glass-card rounded-[24px] p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-[15px] text-slate-900">Earning over time</h3>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">Peak: Feb ($24.8k)</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Billable Work
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold">
                <span className="w-2 h-2 rounded-full bg-sky-300"></span> Auto-Recovered AR
              </div>
            </div>
          </div>
          
          <select className="text-[11px] font-bold text-slate-600 bg-slate-50/50 border border-slate-200 rounded-md px-2 py-1 outline-none appearance-none">
            <option>Month (2026)</option>
          </select>
        </div>
        
        <div className="flex-1 flex items-end justify-between gap-3 h-full">
          {data.map((pct, i) => (
            <div key={i} className="relative group w-full flex flex-col justify-end h-full">
              <div 
                className="w-full bg-gradient-to-t from-blue-100/50 to-blue-400/80 rounded-t-md transition-all hover:brightness-110 shadow-sm" 
                style={{ height: `${pct}%` }}
              ></div>
              <div className="text-[9px] text-slate-400 text-center mt-2 font-bold">{months[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions (2x3 Grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="#" className="glass-card rounded-[20px] p-4 flex flex-col items-start justify-center gap-2 group">
          <div className="p-2 rounded-xl bg-white border border-slate-100 text-slate-600 mb-1 group-hover:scale-105 transition-transform shadow-sm">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[12px] font-bold text-slate-800 block">Send an invoice</span>
            <span className="text-[10px] font-semibold text-slate-400">Stripe & UPI links</span>
          </div>
        </Link>
        <button className="glass-card rounded-[20px] p-4 flex flex-col items-start justify-center gap-2 group text-left">
          <div className="p-2 rounded-xl bg-white border border-slate-100 text-slate-600 mb-1 group-hover:scale-105 transition-transform shadow-sm">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[12px] font-bold text-slate-800 block">Draft a proposal</span>
            <span className="text-[10px] font-semibold text-slate-400">Polite auto-chasing</span>
          </div>
        </button>
        <button className="glass-card rounded-[20px] p-4 flex flex-col items-start justify-center gap-2 group text-left">
          <div className="p-2 rounded-xl bg-white border border-slate-100 text-slate-600 mb-1 group-hover:scale-105 transition-transform shadow-sm">
            <ClipboardList className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[12px] font-bold text-slate-800 block">Create a contract</span>
            <span className="text-[10px] font-semibold text-slate-400">Milestone terms</span>
          </div>
        </button>
        <button className="glass-card rounded-[20px] p-4 flex flex-col items-start justify-center gap-2 group text-left">
          <div className="p-2 rounded-xl bg-white border border-slate-100 text-slate-600 mb-1 group-hover:scale-105 transition-transform shadow-sm">
            <FolderPlus className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[12px] font-bold text-slate-800 block">Add a form</span>
            <span className="text-[10px] font-semibold text-slate-400">Import CSV / Excel</span>
          </div>
        </button>
        <button className="glass-card rounded-[20px] p-4 flex flex-col items-start justify-center gap-2 group text-left">
          <div className="p-2 rounded-xl bg-white border border-slate-100 text-slate-600 mb-1 group-hover:scale-105 transition-transform shadow-sm">
            <UploadCloud className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[12px] font-bold text-slate-800 block">Create a project</span>
            <span className="text-[10px] font-semibold text-slate-400">Retainer deliverables</span>
          </div>
        </button>
        <button className="glass-card rounded-[20px] p-4 flex flex-col items-start justify-center gap-2 group text-left">
          <div className="p-2 rounded-xl bg-white border border-slate-100 text-slate-600 mb-1 group-hover:scale-105 transition-transform shadow-sm">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[12px] font-bold text-slate-800 block">File Tax</span>
            <span className="text-[10px] font-semibold text-slate-400">Sec 43B 45-day tracking</span>
          </div>
        </button>
      </div>
    </div>
  );
}
