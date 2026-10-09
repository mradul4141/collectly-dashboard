"use client";

import { Folder, PenTool, CheckSquare, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function StatCards() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } as any }
  };

  return (
    <div className="relative">
      <div className="absolute -top-4 right-0 bg-orange-500/10 text-orange-500 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-500/20">PREVIEW DATA</div>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
      <motion.div variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="glass-card p-5 flex flex-col justify-between cursor-default transition-shadow hover:shadow-orange-500/5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-500/10 border border-orange-500/20 rounded-md text-orange-500">
              <Folder className="w-4 h-4" />
            </div>
            <p className="text-[12px] font-semibold text-gray-400">Total projects</p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-[32px] leading-none font-bold text-white font-serif tracking-tight">455</p>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mb-1">
            +16.4%
          </span>
        </div>
        <p className="text-[11px] font-medium text-gray-500 mt-3">Across all client retainers</p>
      </motion.div>

      <motion.div variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="glass-card p-5 flex flex-col justify-between cursor-default transition-shadow hover:shadow-orange-500/5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-500/10 border border-orange-500/20 rounded-md text-orange-500">
              <PenTool className="w-4 h-4" />
            </div>
            <p className="text-[12px] font-semibold text-gray-400">Active projects</p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-[32px] leading-none font-bold text-white font-serif tracking-tight">55</p>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-1">
            -4.8%
          </span>
        </div>
        <p className="text-[11px] font-medium text-gray-500 mt-3">In progress milestone sprints</p>
      </motion.div>

      <motion.div variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="glass-card p-5 flex flex-col justify-between cursor-default transition-shadow hover:shadow-orange-500/5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-500/10 border border-orange-500/20 rounded-md text-orange-500">
              <CheckSquare className="w-4 h-4" />
            </div>
            <p className="text-[12px] font-semibold text-gray-400">Completed projects</p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-[32px] leading-none font-bold text-white font-serif tracking-tight">400</p>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mb-1">
            +12.8%
          </span>
        </div>
        <p className="text-[11px] font-medium text-gray-500 mt-3">Successfully delivered</p>
      </motion.div>

      <motion.div variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="glass-card p-5 flex flex-col justify-between cursor-default transition-shadow hover:shadow-orange-500/5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-500/10 border border-orange-500/20 rounded-md text-orange-500">
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-[12px] font-semibold text-gray-400">Total hours worked</p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-[32px] leading-none font-bold text-white font-serif tracking-tight">600<span className="text-lg font-sans text-gray-500">hrs</span></p>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-1">
            -1.2%
          </span>
        </div>
        <p className="text-[11px] font-medium text-gray-500 mt-3">Logged this billing cycle</p>
      </motion.div>
      </motion.div>
    </div>
  );
}
