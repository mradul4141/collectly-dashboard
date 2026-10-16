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
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } as any }
  };

  const cards = [
    {
      icon: Folder,
      label: "TOTAL PROJECTS",
      value: "455",
      badge: "+16.4%",
      detail: "Across all orbital missions",
    },
    {
      icon: PenTool,
      label: "ACTIVE FLIGHTS",
      value: "55",
      badge: "-4.8%",
      detail: "In-progress telemetry sprints",
    },
    {
      icon: CheckSquare,
      label: "COMPLETED MISSIONS",
      value: "400",
      badge: "+12.8%",
      detail: "Delivered to ground stations",
    },
    {
      icon: Clock,
      label: "LOGGED FLIGHT TIME",
      value: "600",
      unit: "HRS",
      badge: "-1.2%",
      detail: "Cycle 41 telemetry log",
    },
  ];

  return (
    <div className="relative mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="font-label text-[11px] tracking-widest uppercase text-[#0A0A0A] font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#0A0A0A] inline-block animate-pulse"></span>
          ORBITAL TELEMETRY GAUGES // SECTOR 7
        </span>
        <span className="bg-[#0A0A0A] text-white font-label text-[10px] tracking-wider px-2.5 py-0.5 rounded-full border border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
          DATA FEED: VERIFIED
        </span>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className="bg-white border-2 border-[#0A0A0A] rounded-[20px] p-5 shadow-[4px_4px_0px_#0A0A0A] flex flex-col justify-between relative overflow-hidden transition-all group"
            >
              {/* Corner screw detail */}
              <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full border border-[#0A0A0A]/40 flex items-center justify-center">
                <div className="w-1 h-px bg-[#0A0A0A]/60 rotate-45"></div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center border border-[#0A0A0A]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-label text-[10px] tracking-wider px-2 py-0.5 rounded-full bg-[#DEDEC8] text-[#0A0A0A] border border-[#0A0A0A] font-bold">
                    {c.badge}
                  </span>
                </div>
                <p className="font-label text-[11px] font-bold text-[#0A0A0A]/70 uppercase tracking-widest">{c.label}</p>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline gap-1">
                  <p className="text-[34px] leading-none font-bold text-[#0A0A0A] font-display tracking-tight">
                    {c.value}
                  </p>
                  {c.unit && (
                    <span className="font-label text-xs font-bold text-[#0A0A0A]/70">{c.unit}</span>
                  )}
                </div>
                <p className="text-[11px] text-[#0A0A0A]/60 font-sans mt-2">{c.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
