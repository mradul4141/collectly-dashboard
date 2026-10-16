"use client";

import { Search, Compass, Menu, Timer } from "lucide-react";

interface TopbarProps {
  onOpenMobileMenu?: () => void;
}

export function Topbar({ onOpenMobileMenu }: TopbarProps) {
  return (
    <header className="bg-[#DEDEC8] border-b-2 border-[#0A0A0A] px-4 sm:px-6 py-3 z-10 sticky top-0 flex items-center justify-between gap-3">
      {/* Left: Mobile Menu Toggle + Station Badge */}
      <div className="flex items-center gap-2.5">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl bg-white border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] active:translate-x-0 active:translate-y-0 text-[#0A0A0A]"
            aria-label="Open mission menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <div className="w-8 h-8 rounded-xl bg-[#0A0A0A] border-2 border-[#0A0A0A] flex items-center justify-center text-[#FFFFFF] shadow-[2px_2px_0px_#0A0A0A] flex-shrink-0">
          <Compass className="w-4 h-4" />
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-display text-[11px] sm:text-xs text-[#0A0A0A] tracking-wider uppercase">
              ORBITAL STATION
            </h1>
            <span className="font-label text-[8px] sm:text-[9px] bg-[#FFFFFF] border border-[#0A0A0A] px-1.5 py-0.2 rounded font-bold">
              SYS OK
            </span>
          </div>
          <span className="font-label text-[9px] sm:text-[10px] text-[#555555] hidden sm:block">
            COLLECTLY AUTONOMOUS WORKSPACE
          </span>
        </div>
      </div>

      {/* Right: Zine Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Space Flight Timer Pill */}
        <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
          <Timer className="w-3.5 h-3.5 text-[#0A0A0A]" />
          <span className="font-label text-[10px] text-[#555555] hidden sm:inline">T+:</span>
          <span className="font-mono text-[11px] sm:text-xs font-bold text-[#0A0A0A]">04:20:18</span>
        </div>

        {/* Mode Sticker */}
        <span className="font-label text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-[#0A0A0A] text-[#FFFFFF] font-bold tracking-wider shadow-[2px_2px_0px_#0A0A0A] whitespace-nowrap">
          ZINE V2.0
        </span>
      </div>
    </header>
  );
}
