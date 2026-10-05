"use client";

import { MoreHorizontal } from "lucide-react";

type Invoice = {
  client: string;
  id: string;
  amount: string;
  dueDate: string;
  statusText: string;
  statusColor: string;
};

const dueSoon: Invoice[] = [
  { client: "Client Name", id: "#INV-1024", amount: "$3,450.00", dueDate: "Oct 28, 2023", statusText: "7 Days Remaining", statusColor: "bg-emerald-100 text-emerald-700" },
  { client: "Client Name", id: "#INV-1025", amount: "$3,450.00", dueDate: "Oct 28, 2023", statusText: "7 Days Remaining", statusColor: "bg-emerald-100 text-emerald-700" },
  { client: "Client Name", id: "#INV-1024", amount: "$3,450.00", dueDate: "Oct 28, 2023", statusText: "7 Days Remaining", statusColor: "bg-emerald-100 text-emerald-700" },
];

const overdue: Invoice[] = [
  { client: "Client Name", id: "#INV-1024", amount: "$3,450.00", dueDate: "Oct 28, 2023", statusText: "14 Days Late", statusColor: "bg-rose-100 text-rose-700" },
  { client: "Client Name", id: "#INV-1024", amount: "$2,850.00", dueDate: "Oct 28, 2023", statusText: "14 Days Late", statusColor: "bg-rose-100 text-rose-700" },
  { client: "Client Name", id: "#INV-1024", amount: "$7,850.00", dueDate: "Oct 28, 2023", statusText: "14 Days Late", statusColor: "bg-rose-100 text-rose-700" },
];

const promised: Invoice[] = [
  { client: "Client Jenkins", id: "#INV-1024", amount: "$3,450.00", dueDate: "Oct 28, 2023", statusText: "Nov 2", statusColor: "bg-emerald-100 text-emerald-700" },
  { client: "Client Jenkins", id: "#INV-1023", amount: "$1,850.00", dueDate: "Oct 28, 2023", statusText: "Nov 2", statusColor: "bg-emerald-100 text-emerald-700" },
  { client: "Client Jenkins", id: "#INV-1023", amount: "$1,950.00", dueDate: "Oct 28, 2023", statusText: "Nov 2", statusColor: "bg-emerald-100 text-emerald-700" },
];

const disputed: Invoice[] = [
  { client: "Sarah Jenkins", id: "#INV-1025", amount: "$1,500.00", dueDate: "Oct 28, 2023", statusText: "Review Required", statusColor: "bg-rose-100 text-rose-700" },
  { client: "Sarah Jenkins", id: "#INV-1025", amount: "$1,500.00", dueDate: "Oct 28, 2023", statusText: "Review Required", statusColor: "bg-rose-100 text-rose-700" },
];

function Column({ title, count, invoices, bgClass }: { title: string, count: number, invoices: Invoice[], bgClass: string }) {
  return (
    <div className={`flex flex-col flex-1 rounded-[24px] overflow-hidden ${bgClass} border border-[#ECEAE4] bg-opacity-30`}>
      <div className="p-4 flex justify-between items-start">
        <div>
          <h3 className="font-bold text-slate-800 text-[15px]">{title}</h3>
          <p className="text-xs font-semibold text-slate-500">{count} Invoices</p>
        </div>
        <button className="text-slate-400 hover:text-slate-700">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div className="px-3 pb-4 flex flex-col gap-3">
        {invoices.map((inv, i) => (
          <div key={i} className="bg-white rounded-[20px] p-4 shadow-sm border border-[#ECEAE4] hover:shadow-md transition-all cursor-pointer">
            <h4 className="font-bold text-[14px] text-slate-800 mb-4">{inv.client}</h4>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-500">Invoice ID</span>
              <span className="text-xs font-bold text-slate-800">{inv.id}</span>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-500">Amount Owed</span>
              <span className="text-xs font-bold text-slate-800">{inv.amount}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-slate-500">Due Date</span>
              <span className="text-xs font-bold text-slate-800">{inv.dueDate}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-500">Status Tag</span>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${inv.statusColor}`}>
                {inv.statusText}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function KanbanBoard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-[#ECEAE4] bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50">
            &lt;
          </button>
          <button className="w-8 h-8 rounded-full border border-[#ECEAE4] bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50">
            &gt;
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 items-stretch">
        <Column title="Due Soon" count={3} invoices={dueSoon} bgClass="bg-slate-100" />
        <Column title="Overdue" count={8} invoices={overdue} bgClass="bg-rose-50" />
        <Column title="Promised to Pay" count={4} invoices={promised} bgClass="bg-emerald-50" />
        <Column title="Disputed" count={2} invoices={disputed} bgClass="bg-slate-100" />
      </div>
    </div>
  );
}
