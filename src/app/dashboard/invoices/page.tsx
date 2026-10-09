"use client";

import { useState } from "react";
import { InvoiceTable } from "@/components/invoice-table";
import { CSVUploadModal } from "@/components/csv-upload-modal";
import { CreateInvoiceModal } from "@/components/create-invoice-modal";

export default function InvoicesPage() {
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-1">Invoice Import & Management</h2>
          <p className="text-sm font-medium text-gray-400">Track all issued invoices, payment status, and automated chasing cadences.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsCsvModalOpen(true)}
            className="px-4 py-2 text-sm font-bold text-gray-300 bg-[#0a0a0a] border border-[#222] rounded-lg shadow-sm hover:bg-[#111] transition-colors"
          >
            Import Invoices / CSV
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-white text-black font-bold text-[13px] px-5 py-2 rounded-[20px] hover:bg-gray-200 transition-colors shadow-sm"
          >
            Create Invoice
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[#0a0a0a] border border-[#1a1a1a] rounded-[24px] shadow-sm">
        <InvoiceTable refreshKey={refreshKey} />
      </div>

      <CSVUploadModal isOpen={isCsvModalOpen} onClose={() => setIsCsvModalOpen(false)} />
      <CreateInvoiceModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={() => setRefreshKey(prev => prev + 1)}
      />
    </div>
  );
}
