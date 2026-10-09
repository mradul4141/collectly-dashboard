"use client";

import { motion } from "framer-motion";
import { Download, AlertTriangle, CheckCircle, Calculator, FileText, ChevronDown } from "lucide-react";

export default function TaxesPage() {
  const reports = [
    { id: 1, period: "Q3 2026", status: "Ready", generated: "Oct 1, 2026", size: "1.2 MB" },
    { id: 2, period: "Q2 2026", status: "Filed", generated: "Jul 2, 2026", size: "1.4 MB" },
    { id: 3, period: "Q1 2026", status: "Filed", generated: "Apr 3, 2026", size: "1.1 MB" },
    { id: 4, period: "FY 2025", status: "Filed", generated: "Jan 15, 2026", size: "4.5 MB" },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 mt-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white font-bold tracking-tight">Taxes & Section 43B</h1>
          <p className="text-gray-400 mt-1">Manage your MSME compliance and generate tax-ready reports.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-bold hover:bg-gray-200 transition-colors">
          <Calculator className="w-4 h-4" /> Run Compliance Check
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Compliance Warning Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-[#111] border border-orange-500/30 rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Section 43B(h) Warning</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                You have <strong className="text-white">3 invoices</strong> exceeding the 45-day limit for MSME payments. Under Section 43B(h) of the Income Tax Act, these amounts may be disallowed as deductions in the current financial year unless paid before March 31st.
              </p>
              <button className="text-orange-500 text-sm font-bold hover:text-orange-400 transition-colors">
                View Affected Invoices &rarr;
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111] border border-gray-800 rounded-2xl p-6"
        >
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Tax Year 2026-27</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-gray-400 text-sm">Collected</span>
                <span className="text-white font-bold">$124,500</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-gray-400 text-sm">GST Liable</span>
                <span className="text-white font-bold">$22,410</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <h2 className="text-xl font-bold text-white mb-4">Tax Reports & Documents</h2>
      <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-[11px] uppercase tracking-wider text-gray-500">
              <th className="font-bold py-4 px-6">Period</th>
              <th className="font-bold py-4 px-6">Generated On</th>
              <th className="font-bold py-4 px-6">Size</th>
              <th className="font-bold py-4 px-6">Status</th>
              <th className="font-bold py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-[#1a1a1a] transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-gray-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-white text-sm">{report.period}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-400">{report.generated}</td>
                <td className="py-4 px-6 text-sm text-gray-500 font-mono">{report.size}</td>
                <td className="py-4 px-6">
                  {report.status === "Ready" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3" /> {report.status}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-800 text-gray-400 border border-gray-700">
                      {report.status}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
