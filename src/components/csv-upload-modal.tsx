"use client";

import { useState } from "react";
import { X, UploadCloud, FileSpreadsheet, ClipboardPaste, Link as LinkIcon, Database } from "lucide-react";

interface CSVUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CSVUploadModal({ isOpen, onClose }: CSVUploadModalProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "paste" | "gateway">("upload");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm p-4">
      <div className="bg-[#0a0a0a] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
          <div>
            <h2 className="text-xl font-bold text-white">Import Invoices</h2>
            <p className="text-sm font-medium text-gray-400 mt-1">Upload files, paste data, or sync with payment gateways.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:bg-slate-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex border-b border-[#1a1a1a] px-6">
          <button 
            onClick={() => setActiveTab("upload")}
            className={`py-4 px-4 text-[13px] font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "upload" ? "border-slate-900 text-white" : "border-transparent text-gray-400 hover:text-gray-300"}`}
          >
            <FileSpreadsheet className="w-4 h-4" /> Upload CSV/Excel
          </button>
          <button 
            onClick={() => setActiveTab("paste")}
            className={`py-4 px-4 text-[13px] font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "paste" ? "border-slate-900 text-white" : "border-transparent text-gray-400 hover:text-gray-300"}`}
          >
            <ClipboardPaste className="w-4 h-4" /> Paste Data
          </button>
          <button 
            onClick={() => setActiveTab("gateway")}
            className={`py-4 px-4 text-[13px] font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "gateway" ? "border-slate-900 text-white" : "border-transparent text-gray-400 hover:text-gray-300"}`}
          >
            <LinkIcon className="w-4 h-4" /> Gateway Synced
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === "upload" && (
            <div className="border-2 border-dashed border-[#222] rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-[#111] hover:bg-[#1a1a1a] transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-[#0a0a0a] rounded-full shadow-sm flex items-center justify-center mb-4 text-blue-500">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Drag & drop files here</h3>
              <p className="text-sm font-medium text-gray-400 mb-6">Supports .csv, .xlsx, .pdf up to 10MB</p>
              <button className="px-6 py-2.5 bg-white text-black font-bold text-sm rounded-lg hover:bg-slate-800 transition-colors">
                Browse Files
              </button>
            </div>
          )}

          {activeTab === "paste" && (
            <div className="flex flex-col h-full">
              <p className="text-sm text-gray-400 mb-3 font-medium">Paste your tabular data directly from Excel or Google Sheets.</p>
              <textarea 
                className="w-full flex-1 min-h-[200px] border border-[#222] rounded-xl p-4 text-sm font-mono text-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Invoice ID	Client	Amount	Due Date..."
              ></textarea>
            </div>
          )}

          {activeTab === "gateway" && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="flex gap-4 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 cursor-pointer hover:bg-indigo-100 transition-colors">
                  <span className="font-bold text-indigo-600">Stripe</span>
                </div>
                <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
                  <span className="font-bold text-blue-600">Razorpay</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 text-center max-w-sm font-medium">Connect your payment gateways to automatically sync invoices and detect settlements instantly.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-[#1a1a1a] bg-[#111] flex justify-between items-center">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-[#222] text-gray-300 font-bold text-sm rounded-lg hover:bg-[#1a1a1a] transition-colors">
            <Database className="w-4 h-4 text-emerald-600" /> Load Sample Invoices
          </button>
          
          <div className="flex gap-3">
            <button onClick={onClose} className="px-5 py-2.5 bg-[#0a0a0a] border border-[#222] text-gray-300 font-bold text-sm rounded-lg hover:bg-[#1a1a1a] transition-colors">
              Cancel
            </button>
            <button className="px-5 py-2.5 bg-white text-black font-bold text-sm rounded-lg hover:bg-slate-800 transition-colors opacity-50 cursor-not-allowed">
              Import Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
