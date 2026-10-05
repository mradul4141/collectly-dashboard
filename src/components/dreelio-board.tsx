"use client";

import { Search } from "lucide-react";

export function DreelioBoard() {
  return (
    <div className="flex-1 flex flex-col mt-4">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search client, invoice #..." 
            className="w-full bg-white/60 border border-slate-200 rounded-full py-1.5 pl-9 pr-4 text-[12px] font-medium text-slate-700 outline-none focus:bg-white focus:border-slate-300 transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-6">
          <button className="text-[12px] font-bold text-slate-900 border-b-2 border-slate-900 pb-1">All Trades (10)</button>
          <button className="text-[12px] font-bold text-slate-500 pb-1 hover:text-slate-700">Agencies</button>
          <button className="text-[12px] font-bold text-slate-500 pb-1 hover:text-slate-700">Coaching/Tutors</button>
          <button className="text-[12px] font-bold text-slate-500 pb-1 hover:text-slate-700">Contractors</button>
          <button className="text-[12px] font-bold text-slate-500 pb-1 hover:text-slate-700">Suppliers (43B)</button>
        </div>
      </div>

      <div className="flex gap-4 items-stretch h-full overflow-hidden pb-4">
        {/* Due Soon */}
        <div className="flex flex-col flex-1 glass-card rounded-[24px] overflow-hidden">
          <div className="p-5 border-t-[3px] border-blue-400">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-[14px] text-slate-900 flex items-center gap-2">
                <span className="text-blue-500">⏱️</span> Due Soon
              </h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">0</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Total: $0</p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Pre-due heads up (-3d) & due today (0d)</p>
          </div>
          <div className="flex-1 bg-slate-50/50 p-4 flex items-center justify-center">
            <span className="text-[12px] font-semibold text-slate-400">No invoices</span>
          </div>
        </div>

        {/* Overdue */}
        <div className="flex flex-col flex-1 glass-card rounded-[24px] overflow-hidden">
          <div className="p-5 border-t-[3px] border-rose-500">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-[14px] text-slate-900 flex items-center gap-2">
                <span className="text-rose-500">⚠️</span> Overdue
              </h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded">0</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Total: $0</p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Polite +3d, firm +7d, +14d escalated</p>
          </div>
          <div className="flex-1 bg-slate-50/50 p-4 flex items-center justify-center">
            <span className="text-[12px] font-semibold text-slate-400">No invoices</span>
          </div>
        </div>

        {/* Promised to Pay */}
        <div className="flex flex-col flex-1 glass-card rounded-[24px] overflow-hidden">
          <div className="p-5 border-t-[3px] border-amber-500">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-[14px] text-slate-900 flex items-center gap-2">
                <span className="text-amber-500">🤝</span> Promised to Pay
              </h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">1</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Total: $3,400</p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Chasing paused until agreed promise date</p>
          </div>
          <div className="flex-1 bg-slate-50/50 p-3 flex flex-col gap-3">
            <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[#ECEAE4] hover:shadow-md transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[9px] font-bold text-slate-400">INV-2026-091</span>
                <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded">STRIPE</span>
              </div>
              <h4 className="font-bold text-[13px] text-slate-900">Elena Rostova</h4>
              <p className="text-[10px] text-slate-500 mb-3">Nova Brands Digital</p>
              <p className="text-[11px] font-semibold text-slate-700 mb-4">Shopify Plus Redesign - Milestone 3</p>
              
              <div className="flex justify-between items-end mb-4">
                <span className="text-[15px] font-bold text-slate-900">$3,400</span>
                <div className="text-right">
                  <div className="text-[9px] font-semibold text-slate-400">Due 2026-09-22</div>
                  <div className="text-[10px] font-bold text-amber-600">Pay: 2026-10-06</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-[#ECEAE4]">
                <span className="text-[10px] font-bold text-slate-500">Cadence: +7d</span>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 cursor-pointer"><span className="text-emerald-500">✓</span> Paid</span>
                  <span className="text-[10px] font-bold text-slate-400 cursor-pointer">Dispute</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disputed */}
        <div className="flex flex-col flex-1 glass-card rounded-[24px] overflow-hidden">
          <div className="p-5 border-t-[3px] border-purple-500">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-[14px] text-slate-900 flex items-center gap-2">
                <span className="text-purple-500">❓</span> Disputed
              </h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">0</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Total: $0</p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Sequences halted; owner action required</p>
          </div>
          <div className="flex-1 bg-slate-50/50 p-4 flex items-center justify-center">
            <span className="text-[12px] font-semibold text-slate-400">No invoices</span>
          </div>
        </div>
      </div>
    </div>
  );
}
