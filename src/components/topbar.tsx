"use client";

import { Search, Play } from "lucide-react";

export function Topbar() {
  return (
    <header className="bg-[#FBFBFA] flex flex-col justify-center px-8 py-5 z-10 sticky top-0 border-b border-[#ECEAE4]">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[22px] font-bold text-slate-900">Hello, Leonardo</h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-bold text-emerald-700">Auto-Stop Shield Active</span>
            </div>
          </div>
          <p className="text-[12px] font-medium text-slate-500">
            Freelancers & Digital Agencies <span className="mx-1 text-slate-300">•</span> <span className="text-slate-800 font-bold">Design & Dev Retainers</span>
          </p>
        </div>
        
        <div className="relative w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search projects, clients, or invoice #..." 
            className="w-full bg-white border border-[#ECEAE4] rounded-full py-2 pl-9 pr-4 text-[12px] font-medium text-slate-700 outline-none focus:border-slate-300 transition-all placeholder:text-slate-400 shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 hover:bg-purple-100 transition-colors">
          <span className="text-sm">✨</span>
          <span className="text-[12px] font-bold">Anti-gravity</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <span className="text-amber-500 text-sm">📁</span>
          <span className="text-[12px] font-bold">Google Drive</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <span className="text-[12px] font-bold">Board</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100 transition-colors shadow-sm">
          <span className="text-emerald-500 text-sm">💲</span>
          <span className="text-[12px] font-bold">USD</span>
        </button>
        
        <div className="flex items-center gap-3 px-1 py-1 rounded-full bg-white border border-slate-200 pl-4 shadow-sm">
          <span className="text-[12px] font-bold text-slate-700">Timer: <span className="font-mono ml-1">0:00:00</span></span>
          <button className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center">
            <Play className="w-3 h-3 fill-current ml-0.5" />
          </button>
        </div>

        <select className="text-[12px] font-bold text-slate-700 bg-white border border-slate-200 rounded-full px-4 py-1.5 outline-none appearance-none pr-8 relative shadow-sm">
          <option>Freelancers & Agencies</option>
        </select>
      </div>
    </header>
  );
}
