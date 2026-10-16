"use client";

import { Search, Compass, Sparkles, Radio, Timer } from "lucide-react";
import { TelescopeIllustration } from "@/components/illustrations/retro-space";

export function Topbar() {
  return (
    <header className="bg-[#DEDEC8] border-b-2 border-[#0A0A0A] px-6 py-3.5 z-10 sticky top-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Left: Astronaut Mission Status */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#0A0A0A] border-2 border-[#0A0A0A] flex items-center justify-center text-[#FFFFFF] sticker-shadow-sm flex-shrink-0">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xs text-[#0A0A0A] tracking-wider uppercase">
              ORBITAL STATION // 01
            </h1>
            <span className="font-label text-[9px] bg-[#FFFFFF] border border-[#0A0A0A] px-1.5 py-0.2 rounded font-bold">
              SYS OK
            </span>
          </div>
          <span className="font-label text-[10px] text-[#555555]">
            COLLECTLY AUTONOMOUS AR & WORKSPACE
          </span>
        </div>
      </div>

      {/* Middle & Right: Zine Controls */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-[#0A0A0A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="SEARCH LOGS / TASKS..." 
            className="w-full bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-xl py-1.5 pl-8 pr-3 font-mono text-[11px] text-[#0A0A0A] placeholder-[#888888] outline-none sticker-shadow-sm focus:shadow-[4px_4px_0px_#0A0A0A] transition-all"
          />
        </div>

        {/* Space Flight Timer Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border-2 border-[#0A0A0A] sticker-shadow-sm">
          <Timer className="w-3.5 h-3.5 text-[#0A0A0A]" />
          <span className="font-label text-[11px] text-[#555555]">T-PLUS:</span>
          <span className="font-mono text-xs font-bold text-[#0A0A0A]">04:20:18</span>
        </div>

        {/* Mode Sticker */}
        <span className="font-label text-[10px] px-2.5 py-1.5 rounded-xl bg-[#0A0A0A] text-[#FFFFFF] font-bold tracking-wider sticker-shadow-sm">
          SPACE-ZINE ACTIVE
        </span>
      </div>
    </header>
  );
}
