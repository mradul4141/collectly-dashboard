"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { MobileBottomNav } from "@/components/mobile-nav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-screen p-0 md:p-4 bg-[#DEDEC8] flex items-center justify-center relative overflow-hidden">
      
      {/* Mobile Slide-Over Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-[#0A0A0A]/60 backdrop-blur-xs z-50 md:hidden transition-opacity"
        />
      )}

      {/* Mobile Slide-Over Drawer Content */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] md:hidden transform transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setMobileMenuOpen(false)} className="h-full w-full shadow-2xl" />
      </div>

      {/* Main Retro Device Container */}
      <div className="w-full h-screen md:h-[96vh] rounded-none md:rounded-[24px] border-0 md:border-2 border-[#0A0A0A] bg-[#FFFFFF] shadow-none md:shadow-[8px_8px_0px_#0A0A0A] overflow-hidden flex flex-col md:flex-row relative">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex" />

        {/* Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F4F0]">
          <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
          <main className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-8 pb-24 md:pb-8">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Dock */}
      <MobileBottomNav />
    </div>
  );
}
