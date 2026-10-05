"use client";

import Link from "next/link";
import { Home, Users, Layout, Clock, FileText, Send, CheckSquare, DollarSign, PieChart, Calculator, HelpCircle } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 flex-shrink-0 glass flex flex-col justify-between h-full p-4 overflow-y-auto bg-[#FBFBFA]">
      <div>
        <div className="flex items-center justify-between px-3 py-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1e2336] flex items-center justify-center">
              {/* Using a generic globe icon to mimic the Dreelio logo in the new screenshot */}
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>
            </div>
            <span className="font-bold text-[18px] text-slate-900 tracking-tight">Dreelio</span>
          </div>
          <button className="w-7 h-7 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm">
            <span className="text-[12px] font-bold">&lt;</span>
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] bg-[#EAE8E1] text-slate-900 font-bold text-[13px] transition-colors">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link href="/clients" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 font-semibold text-[13px] transition-colors">
            <Users className="w-4 h-4" />
            Clients
          </Link>
          <Link href="/board" className="flex items-center justify-between px-3 py-2.5 rounded-[12px] text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 font-semibold text-[13px] transition-colors">
            <div className="flex items-center gap-3">
              <Layout className="w-4 h-4" />
              Projects & Board
            </div>
            <span className="text-[9px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">Kanban</span>
          </Link>
          <Link href="/time" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 font-semibold text-[13px] transition-colors">
            <Clock className="w-4 h-4" />
            Time tracking
          </Link>

          <div className="mt-8 mb-2 px-3 text-[10px] font-bold text-slate-400 tracking-wider">TOOLS</div>

          <Link href="/invoices" className="flex items-center justify-between px-3 py-2.5 rounded-[12px] text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 font-semibold text-[13px] transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4" />
              Invoices
            </div>
            <span className="text-[9px] font-bold bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-700">Chasing</span>
          </Link>
          <Link href="/cadence" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 font-semibold text-[13px] transition-colors">
            <Send className="w-4 h-4" />
            Reminder Cadence
          </Link>
          <Link href="/review" className="flex items-center justify-between px-3 py-2.5 rounded-[12px] text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 font-semibold text-[13px] transition-colors">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-4 h-4" />
              Review Queue
            </div>
            <span className="text-[10px] font-bold bg-amber-200 px-1.5 py-0.5 rounded text-amber-800">2</span>
          </Link>
          <Link href="/balance" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 font-semibold text-[13px] transition-colors">
            <DollarSign className="w-4 h-4" />
            Balance & Cash
          </Link>
          <Link href="/accounting" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 font-semibold text-[13px] transition-colors">
            <PieChart className="w-4 h-4" />
            Accounting
          </Link>
          <Link href="/taxes" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 font-semibold text-[13px] transition-colors">
            <Calculator className="w-4 h-4" />
            Taxes & 43B
          </Link>
        </nav>
      </div>
      
      <div className="mt-8">
        <div className="mb-2 px-3 text-[10px] font-bold text-slate-400 tracking-wider">ADMINISTRATION</div>
        <Link href="/support" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 font-semibold text-[13px] transition-colors mb-2">
          <HelpCircle className="w-4 h-4" />
          Support
        </Link>
        <div className="flex items-center gap-3 px-3 py-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
            L
          </div>
          <div>
            <div className="font-bold text-[13px] text-slate-900">Leonardo</div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
