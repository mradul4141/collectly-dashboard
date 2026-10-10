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
  FileCode, 
  Settings, 
  Users, 
  Calculator, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  Layers
} from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

export function Sidebar() {
  const [userEmail, setUserEmail] = useState<string>("user@collectly.app");
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="w-64 flex-shrink-0 flex flex-col justify-between h-full p-4 overflow-y-auto bg-[#0a0a0c] border-r border-gray-900">
      <div>
        {/* Brand Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between px-3 py-2 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-indigo-600/20 border border-indigo-500/30">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <span className="font-bold text-[17px] text-white tracking-tight font-serif">Collectly</span>
              <span className="text-[10px] font-bold text-indigo-400 block -mt-1">Workspace 2.0</span>
            </div>
          </div>
        </motion.div>

        {/* Core Workspace Navigation */}
        <motion.nav variants={container} initial="hidden" animate="show" className="flex flex-col gap-1">
          <div className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Workspace</div>

          <motion.div variants={item}>
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] bg-gray-900 text-white font-semibold text-[13px] border border-gray-800">
              <Home className="w-4 h-4 text-indigo-400" />
              Overview
            </Link>
          </motion.div>

          <motion.div variants={item}>
            <Link href="/dashboard/capture" className="flex items-center justify-between px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Inbox & AI Capture
              </div>
              <span className="text-[9px] font-bold bg-indigo-500/10 px-1.5 py-0.5 rounded text-indigo-400 border border-indigo-500/20">AI</span>
            </Link>
          </motion.div>

          <motion.div variants={item}>
            <Link href="/dashboard/tasks" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              My Tasks
            </Link>
          </motion.div>

          <motion.div variants={item}>
            <Link href="/dashboard/projects" className="flex items-center justify-between px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <div className="flex items-center gap-3">
                <FolderKanban className="w-4 h-4 text-blue-400" />
                Projects & Board
              </div>
              <span className="text-[9px] font-bold bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">Kanban</span>
            </Link>
          </motion.div>

          {/* Finance & Invoicing Tools (Preserved from 1.0) */}
          <div className="mt-6">
            <button
              onClick={() => setShowFinanceTools(!showFinanceTools)}
              className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider hover:text-gray-300 transition-colors"
            >
              <span>Finance & Invoices</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFinanceTools ? "rotate-180" : ""}`} />
            </button>

            {showFinanceTools && (
              <div className="flex flex-col gap-1 pl-2 border-l border-gray-800/80 mt-1">
                <Link href="/dashboard/invoices" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white text-xs">
                  <FileText className="w-3.5 h-3.5" />
                  Invoices Ledger
                </Link>
                <Link href="/dashboard/clients" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white text-xs">
                  <Users className="w-3.5 h-3.5" />
                  Clients
                </Link>
                <Link href="/dashboard/review-queue" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white text-xs">
                  <CheckSquare className="w-3.5 h-3.5" />
                  Review Queue
                </Link>
                <Link href="/dashboard/taxes" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white text-xs">
                  <Calculator className="w-3.5 h-3.5" />
                  Taxes & MSME
                </Link>
              </div>
            )}
          </div>
        </motion.nav>
      </div>

      {/* User Session Footer */}
      <div className="mt-8 pt-4 border-t border-gray-900">
        <div className="flex items-center justify-between px-2 mb-3">
          <div className="overflow-hidden">
            <span className="text-xs font-semibold text-gray-200 block truncate">{userEmail}</span>
            <span className="text-[10px] text-gray-500">Free Tier</span>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-all border border-gray-800/60 hover:border-rose-500/20"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
