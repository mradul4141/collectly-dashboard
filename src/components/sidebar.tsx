"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Home, 
  Sparkles, 
  CheckSquare, 
  FolderKanban, 
  FileText, 
  Zap, 
  LogOut,
  ChevronDown,
  Users,
  Calculator,
  Compass,
  Radio
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { SpiralLogo } from "@/components/illustrations/retro-space";

export function Sidebar() {
  const [userEmail, setUserEmail] = useState<string>("cosmonaut@collectly.app");
  const [showFinanceTools, setShowFinanceTools] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    }
    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between h-full p-4 bg-[#DEDEC8] border-r-2 border-[#0A0A0A] overflow-y-auto">
      <div>
        {/* Brand Header — Retro Spiral Mark + Chunky Typography */}
        <div className="flex items-center justify-between px-2 py-2 mb-6 border-b-2 border-[#0A0A0A] pb-4">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="transition-transform group-hover:rotate-45 duration-300">
              <SpiralLogo className="w-8 h-8" />
            </div>
            <div>
              <span className="font-display text-[15px] text-[#0A0A0A] tracking-wider block leading-none">
                COLLECTLY
              </span>
              <span className="font-label text-[9px] text-[#555555] block tracking-widest mt-0.5">
                SPACE ZINE V2.0
              </span>
            </div>
          </Link>
          <span className="w-2.5 h-2.5 rounded-full bg-[#0A0A0A] animate-ping" title="Orbit Active" />
        </div>

        {/* Core Workspace Navigation */}
        <nav className="flex flex-col gap-1.5">
          <div className="px-2 py-1 font-label text-[10px] text-[#555555]">
            // MISSION CONTROL
          </div>

          <Link 
            href="/dashboard" 
            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#0A0A0A] text-[#FFFFFF] font-label text-xs sticker-shadow-lift"
          >
            <Compass className="w-4 h-4 text-[#FFFFFF]" />
            <span>OVERVIEW</span>
          </Link>

          <Link 
            href="/dashboard/capture" 
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#FFFFFF] border-2 border-[#0A0A0A] text-[#0A0A0A] font-label text-xs sticker-shadow-lift hover:bg-[#F4F4F0]"
          >
            <div className="flex items-center gap-2.5">
              <Radio className="w-4 h-4 text-[#0A0A0A]" />
              <span>AI CAPTURE</span>
            </div>
            <span className="text-[9px] bg-[#0A0A0A] text-[#FFFFFF] px-1.5 py-0.2 rounded font-mono font-bold">
              AI
            </span>
          </Link>

          <Link 
            href="/dashboard/tasks" 
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FFFFFF] border-2 border-[#0A0A0A] text-[#0A0A0A] font-label text-xs sticker-shadow-lift hover:bg-[#F4F4F0]"
          >
            <CheckSquare className="w-4 h-4 text-[#0A0A0A]" />
            <span>MY TASKS</span>
          </Link>

          <Link 
            href="/dashboard/projects" 
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#FFFFFF] border-2 border-[#0A0A0A] text-[#0A0A0A] font-label text-xs sticker-shadow-lift hover:bg-[#F4F4F0]"
          >
            <div className="flex items-center gap-2.5">
              <FolderKanban className="w-4 h-4 text-[#0A0A0A]" />
              <span>KANBAN BOARD</span>
            </div>
            <span className="text-[9px] border border-[#0A0A0A] px-1 py-0.2 rounded font-mono font-bold">
              GRID
            </span>
          </Link>

          <Link 
            href="/dashboard/documents" 
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FFFFFF] border-2 border-[#0A0A0A] text-[#0A0A0A] font-label text-xs sticker-shadow-lift hover:bg-[#F4F4F0]"
          >
            <FileText className="w-4 h-4 text-[#0A0A0A]" />
            <span>DOCUMENTS & LOGS</span>
          </Link>

          <Link 
            href="/dashboard/automations" 
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FFFFFF] border-2 border-[#0A0A0A] text-[#0A0A0A] font-label text-xs sticker-shadow-lift hover:bg-[#F4F4F0]"
          >
            <Zap className="w-4 h-4 text-[#0A0A0A]" />
            <span>AUTOMATIONS</span>
          </Link>

          {/* Collapsible Finance & Receivables Section */}
          <div className="mt-5 pt-3 border-t-2 border-[#0A0A0A]/20">
            <button
              onClick={() => setShowFinanceTools(!showFinanceTools)}
              className="w-full flex items-center justify-between px-2 py-1 font-label text-[10px] text-[#555555] hover:text-[#0A0A0A] transition-colors cursor-pointer"
            >
              <span>// REVENUE & INVOICES</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFinanceTools ? "rotate-180" : ""}`} />
            </button>

            {showFinanceTools && (
              <div className="flex flex-col gap-1 mt-1 pl-2 border-l-2 border-[#0A0A0A]">
                <Link href="/dashboard/invoices" className="px-2.5 py-1.5 rounded-lg text-[#0A0A0A] hover:bg-[#FFFFFF] font-label text-[11px] transition-colors">
                  • INVOICE LEDGER
                </Link>
                <Link href="/dashboard/clients" className="px-2.5 py-1.5 rounded-lg text-[#0A0A0A] hover:bg-[#FFFFFF] font-label text-[11px] transition-colors">
                  • CLIENT DOSSIERS
                </Link>
                <Link href="/dashboard/review-queue" className="px-2.5 py-1.5 rounded-lg text-[#0A0A0A] hover:bg-[#FFFFFF] font-label text-[11px] transition-colors">
                  • REVIEW QUEUE
                </Link>
                <Link href="/dashboard/taxes" className="px-2.5 py-1.5 rounded-lg text-[#0A0A0A] hover:bg-[#FFFFFF] font-label text-[11px] transition-colors">
                  • MSME 43B COMPLIANCE
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Cosmonaut Profile Footer */}
      <div className="pt-4 border-t-2 border-[#0A0A0A]">
        <div className="bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-xl p-3 mb-2 sticker-shadow-sm">
          <span className="font-label text-[9px] text-[#555555] block">// LOGGED IN AS</span>
          <span className="font-mono text-xs font-bold text-[#0A0A0A] block truncate">{userEmail}</span>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#0A0A0A] text-[#FFFFFF] font-label text-xs sticker-shadow-lift cursor-pointer hover:bg-[#222222]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>ABORT / LOG OUT</span>
        </button>
      </div>
    </aside>
  );
}
