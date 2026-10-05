"use client";

import { Folder, PenTool, CheckSquare, Clock } from "lucide-react";

export function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="glass-card rounded-[24px] p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 rounded-md text-slate-700">
              <Folder className="w-4 h-4" />
            </div>
            <p className="text-[12px] font-semibold text-slate-700">Total projects</p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-[32px] leading-none font-bold text-slate-900">455</p>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mb-1">
            +16.4%
          </span>
        </div>
        <p className="text-[11px] font-medium text-slate-400 mt-3">Across all client retainers</p>
      </div>

      <div className="glass-card rounded-[24px] p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 rounded-md text-slate-700">
              <PenTool className="w-4 h-4" />
            </div>
            <p className="text-[12px] font-semibold text-slate-700">Active projects</p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-[32px] leading-none font-bold text-slate-900">55</p>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 mb-1">
            -4.8%
          </span>
        </div>
        <p className="text-[11px] font-medium text-slate-400 mt-3">In progress milestone sprints</p>
      </div>

      <div className="glass-card rounded-[24px] p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 rounded-md text-slate-700">
              <CheckSquare className="w-4 h-4" />
            </div>
            <p className="text-[12px] font-semibold text-slate-700">Completed projects</p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-[32px] leading-none font-bold text-slate-900">400</p>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mb-1">
            +12.8%
          </span>
        </div>
        <p className="text-[11px] font-medium text-slate-400 mt-3">Successfully delivered</p>
      </div>

      <div className="glass-card rounded-[24px] p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 rounded-md text-slate-700">
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-[12px] font-semibold text-slate-700">Total hours worked</p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-[32px] leading-none font-bold text-slate-900 tracking-tight">600hrs</p>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 mb-1">
            -1.2%
          </span>
        </div>
        <p className="text-[11px] font-medium text-slate-400 mt-3">Logged this billing cycle</p>
      </div>
    </div>
  );
}
