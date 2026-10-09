"use client";

import { Search, Play, Sparkles, Folder, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export function Topbar() {
  return (
    <header className="bg-[#000000] flex flex-col justify-center px-8 py-5 z-10 sticky top-0 border-b border-[#1a1a1a]">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="group relative cursor-pointer">
              <div className="flex items-center gap-2 hover:bg-[#111] px-2 py-1 -ml-2 rounded-lg transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#222] overflow-hidden shadow-inner flex-shrink-0">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Leo" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-[16px] font-bold text-white tracking-tight flex items-center gap-1.5 font-serif">
                    Leonardo <span className="text-[9px] text-gray-500 font-sans">▼</span>
                  </h1>
                  <span className="text-[11px] font-medium text-gray-400 -mt-0.5">Collectly - Payment Chasing SaaS</span>
                </div>
              </div>
            </div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 ml-2"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
              ></motion.div>
              <span className="text-[10px] font-bold text-orange-500">Auto-Stop Shield Active</span>
            </motion.div>
          </div>
        </div>
        
        <div className="relative w-80">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search projects, clients, or invoice #..." 
            className="w-full bg-[#111] border border-[#222] rounded-full py-2 pl-9 pr-4 text-[12px] font-medium text-white outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 transition-all placeholder:text-gray-500 shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
          />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, staggerChildren: 0.05 }}
        className="flex items-center gap-3"
      >
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-[#333] text-white hover:bg-[#222] transition-colors shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-[12px] font-bold">Anti-gravity</span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0a0a] border border-[#222] text-gray-300 hover:bg-[#111] transition-colors shadow-sm">
          <Folder className="w-3.5 h-3.5 text-orange-500" />
          <span className="text-[12px] font-bold">Google Drive</span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0a0a] border border-[#222] text-gray-300 hover:bg-[#111] transition-colors shadow-sm">
          <span className="text-[12px] font-bold">Board</span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 hover:bg-orange-500/20 transition-colors shadow-sm">
          <DollarSign className="w-3.5 h-3.5 text-orange-500" />
          <span className="text-[12px] font-bold">USD</span>
        </motion.button>
        
        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 px-1 py-1 rounded-full bg-[#0a0a0a] border border-[#222] pl-4 shadow-sm cursor-pointer">
          <span className="text-[12px] font-bold text-gray-300">Timer: <span className="font-mono ml-1">0:00:00</span></span>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
            <Play className="w-3 h-3 fill-current ml-0.5" />
          </motion.button>
        </motion.div>

        <motion.select whileHover={{ scale: 1.02 }} className="text-[12px] font-bold text-gray-300 bg-[#0a0a0a] border border-[#222] rounded-full px-4 py-1.5 outline-none appearance-none pr-8 relative shadow-sm cursor-pointer">
          <option>Freelancers & Agencies</option>
        </motion.select>
      </motion.div>
    </header>
  );
}
