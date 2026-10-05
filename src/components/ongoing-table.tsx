"use client";

import { ExternalLink, ChevronUp } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    name: "Asana website audit",
    invoice: "INV-2026-088",
    amount: "$4,200",
    client: "Asana",
    clientColor: "bg-rose-500",
    priority: "High",
    priorityColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    priorityDot: "bg-emerald-500",
    deadlineDate: "23 Aug, 2026",
    deadlineStatus: "Due in 2 days",
    deadlineColor: "text-emerald-600",
  },
  {
    name: "Marketing workshop",
    invoice: "INV-2026-094",
    amount: "$2,850",
    client: "LinkedIn",
    clientColor: "bg-blue-600",
    priority: "Medium",
    priorityColor: "text-amber-700 bg-amber-50 border-amber-200",
    priorityDot: "bg-amber-500",
    deadlineDate: "25 Aug, 2026",
    deadlineStatus: "Scheduled",
    deadlineColor: "text-slate-500",
  },
  {
    name: "KYC verification app",
    invoice: "INV-2026-099",
    amount: "$650",
    client: "Slack",
    clientColor: "bg-emerald-600",
    priority: "Low",
    priorityColor: "text-rose-700 bg-rose-50 border-rose-200",
    priorityDot: "bg-rose-500",
    deadlineDate: "29 Aug, 2026",
    deadlineStatus: "Scheduled",
    deadlineColor: "text-slate-500",
  },
  {
    name: "Stripe gateway payment engine",
    invoice: "INV-2026-105",
    amount: "$5,600",
    client: "Stripe Inc",
    clientColor: "bg-indigo-600",
    priority: "High",
    priorityColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    priorityDot: "bg-emerald-500",
    deadlineDate: "02 Sep, 2026",
    deadlineStatus: "Due in 2 days",
    deadlineColor: "text-emerald-600",
  },
  {
    name: "Q3 Retainer UX Architecture",
    invoice: "INV-2026-091",
    amount: "$3,400",
    client: "Figma Community",
    clientColor: "bg-slate-900",
    priority: "High",
    priorityColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    priorityDot: "bg-emerald-500",
    deadlineDate: "05 Sep, 2026",
    deadlineStatus: "Due in 2 days",
    deadlineColor: "text-emerald-600",
  },
];

export function OngoingTable() {
  return (
    <div className="glass-card rounded-[24px] overflow-hidden flex-1">
      <div className="px-6 py-5 border-b border-[#ECEAE4] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ChevronUp className="w-4 h-4 text-slate-400" />
          <h3 className="font-bold text-[15px] text-slate-900">Ongoing</h3>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">5</span>
        </div>
        <Link href="/board" className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          Switch to 4-Column Board
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#ECEAE4]">
              <th className="px-6 py-4 text-[12px] font-semibold text-slate-500 w-[30%]">Name</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-slate-500 w-[15%]">Client</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-slate-500 w-[15%]">Priority</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-slate-500 w-[15%]">Deadline</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-slate-500 w-[15%]">Assigned team</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-slate-500 w-[10%] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj, i) => (
              <tr key={i} className="border-b border-[#ECEAE4] last:border-0 hover:bg-slate-50/50 transition-colors relative group">
                <td className="px-6 py-4">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="font-bold text-[13px] text-slate-900 mb-0.5">{proj.name}</div>
                  <div className="text-[11px] font-semibold text-slate-400 flex gap-1">
                    {proj.invoice} <span className="text-slate-300">•</span> {proj.amount}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${proj.clientColor}`}></div>
                    <span className="font-semibold text-[13px] text-slate-700">{proj.client}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold ${proj.priorityColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${proj.priorityDot}`}></span>
                    {proj.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-[12px] text-slate-700 mb-0.5">{proj.deadlineDate}</div>
                  <div className={`text-[10px] font-bold flex items-center gap-1 ${proj.deadlineColor}`}>
                    <span className="w-1 h-1 rounded-full bg-current"></span> {proj.deadlineStatus}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white z-20"></div>
                    <div className="w-6 h-6 rounded-full bg-amber-100 border-2 border-white z-10"></div>
                    <div className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white z-0"></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3 text-[12px] font-bold">
                    <span className="text-slate-400 hover:text-slate-700 cursor-pointer">Follow-up</span>
                    <span className="text-emerald-600 hover:text-emerald-700 cursor-pointer">Settle</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
