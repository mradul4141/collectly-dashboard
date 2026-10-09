"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, Users, Layout, Clock, FileText, Send, CheckSquare, DollarSign, PieChart, Calculator, HelpCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

export function Sidebar() {
  const [userEmail, setUserEmail] = useState<string>("admin@collectly.app");
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
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } as any }
  };

  return (
    <div className="w-64 flex-shrink-0 flex flex-col justify-between h-full p-4 overflow-y-auto bg-[#0a0a0a] border-r border-gray-900">
      <div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-between px-3 py-2 mb-6">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <img src="/logo.jpg" alt="Collectly Logo" className="w-full h-full object-cover" />
            </motion.div>
            <span className="font-bold text-[18px] text-white tracking-tight font-serif">Collectly</span>
          </div>
          <button className="w-7 h-7 rounded-full border border-gray-800 bg-[#111] flex items-center justify-center text-gray-500 hover:text-white transition-colors">
            <span className="text-[12px] font-bold">&lt;</span>
          </button>
        </motion.div>

        <motion.nav variants={container} initial="hidden" animate="show" className="flex flex-col gap-1">
          <motion.div variants={item} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] bg-gray-900 text-white font-bold text-[13px] transition-colors shadow-sm border border-gray-800">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </motion.div>
          <motion.div variants={item} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/clients" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <Users className="w-4 h-4" />
              Clients
            </Link>
          </motion.div>
          <motion.div variants={item} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/projects" className="flex items-center justify-between px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <div className="flex items-center gap-3">
                <Layout className="w-4 h-4" />
                Projects & Board
              </div>
              <span className="text-[9px] font-bold bg-gray-800 px-1.5 py-0.5 rounded text-gray-300">Kanban</span>
            </Link>
          </motion.div>
          <motion.div variants={item} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/time-tracking" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <Clock className="w-4 h-4" />
              Time tracking
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-8 mb-2 px-3 text-[10px] font-bold text-gray-600 tracking-wider">TOOLS</motion.div>

          <motion.div variants={item} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/invoices" className="flex items-center justify-between px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                Invoices
              </div>
              <span className="text-[9px] font-bold bg-orange-500/10 px-1.5 py-0.5 rounded text-orange-500 border border-orange-500/20">Chasing</span>
            </Link>
          </motion.div>
          <motion.div variants={item} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/cadence" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <Send className="w-4 h-4" />
              Reminder Cadence
            </Link>
          </motion.div>
          <motion.div variants={item} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/review-queue" className="flex items-center justify-between px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <div className="flex items-center gap-3">
                <CheckSquare className="w-4 h-4" />
                Review Queue
              </div>
              <span className="text-[10px] font-bold bg-rose-500/10 px-1.5 py-0.5 rounded text-rose-500 border border-rose-500/20">2</span>
            </Link>
          </motion.div>
          <motion.div variants={item} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/balance-cash" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <DollarSign className="w-4 h-4" />
              Balance & Cash
            </Link>
          </motion.div>
          <motion.div variants={item} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/analytics" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <PieChart className="w-4 h-4" />
              Analytics & Reports
            </Link>
          </motion.div>
          <motion.div variants={item} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/accounting" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <Calculator className="w-4 h-4" />
              Accounting
            </Link>
          </motion.div>
          <motion.div variants={item} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/taxes" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors">
              <Calculator className="w-4 h-4" />
              Taxes & 43B
            </Link>
          </motion.div>
        </motion.nav>
      </div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
        <div className="mb-2 px-3 text-[10px] font-bold text-gray-600 tracking-wider">ADMINISTRATION</div>
        <motion.div whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
          <Link href="/support" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors mb-1">
            <HelpCircle className="w-4 h-4" />
            Support
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-gray-400 hover:bg-gray-900 hover:text-white font-medium text-[13px] transition-colors mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            Settings
          </Link>
        </motion.div>
        <div className="flex items-center justify-between px-3 py-2 bg-[#111] border border-gray-900 rounded-[14px]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-500 font-bold text-xs uppercase shrink-0">
              {userEmail.charAt(0)}
            </div>
            <div className="truncate">
              <div className="font-bold text-[12px] text-white truncate max-w-[120px]">{userEmail.split('@')[0]}</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
              </div>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            title="Log Out"
            className="p-1.5 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
