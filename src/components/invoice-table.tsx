"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, Filter, MoreHorizontal, ArrowUpRight, DollarSign, Calendar, Clock, AlertCircle, Printer, Download } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function InvoiceTable({ refreshKey = 0 }: { refreshKey?: number }) {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const supabase = createClient();

  useEffect(() => {
    fetchInvoices();
  }, [refreshKey]);

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          id,
          invoice_number,
          amount,
          status,
          due_date,
          description,
          platform,
          cadence,
          payment_link,
          clients (name, company)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setInvoices(data);
    } catch (err) {
      console.error("Failed to fetch invoices", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (invoiceId: string, newStatus: string) => {
    try {
      // Optimistic update
      setInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: newStatus } : inv));
      const { error } = await supabase
        .from('invoices')
        .update({ status: newStatus })
        .eq('id', invoiceId);
      if (error) throw error;
    } catch (err) {
      console.error("Failed to update invoice status", err);
      fetchInvoices();
    }
  };

  // Helper to style badges based on status
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: <DollarSign className="w-3 h-3" /> };
      case 'overdue':
        return { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', icon: <AlertCircle className="w-3 h-3" /> };
      case 'promised':
        return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: <Calendar className="w-3 h-3" /> };
      case 'disputed':
        return { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: <AlertCircle className="w-3 h-3" /> };
      case 'due_soon':
      default:
        return { color: 'text-gray-300', bg: 'bg-[#1a1a1a]', border: 'border-[#333]', icon: <Clock className="w-3 h-3" /> };
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.invoice_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clients?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clients?.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    if (filteredInvoices.length === 0) return;
    const headers = ["Invoice Number", "Client Name", "Company", "Amount", "Due Date", "Status", "Platform"];
    const rows = filteredInvoices.map(inv => [
      inv.invoice_number || "",
      `"${inv.clients?.name || ""}"`,
      `"${inv.clients?.company || ""}"`,
      inv.amount || 0,
      inv.due_date || "",
      inv.status || "",
      inv.platform || "MANUAL"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `collectly_invoices_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] rounded-[24px]">
      {/* Table Toolbar */}
      <div className="px-6 py-5 border-b border-[#1a1a1a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-[15px] text-white">All Invoices</h3>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#1a1a1a] text-gray-300">
            {filteredInvoices.length} of {invoices.length}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#111] border border-[#222] rounded-full pl-9 pr-4 py-1.5 text-[13px] text-white font-medium outline-none focus:border-orange-500 transition-colors w-[200px] placeholder:text-gray-600"
            />
          </div>

          {/* Status Filter Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111] border border-[#222] rounded-full px-3 py-1.5 text-[12px] font-bold text-gray-300 outline-none focus:border-orange-500 transition-colors cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="due_soon">Due Soon</option>
            <option value="overdue">Overdue</option>
            <option value="promised">Promised</option>
            <option value="disputed">Disputed</option>
            <option value="paid">Paid</option>
          </select>

          {/* Export CSV Button */}
          <button 
            onClick={handleExportCSV}
            title="Export filtered invoices to CSV"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111] border border-[#222] text-gray-300 text-[12px] font-bold hover:bg-[#1a1a1a] hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-orange-500" />
            Export CSV
          </button>
        </div>
      </div>
      
      {/* Table Body */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 w-[15%]">Invoice ID</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 w-[20%]">Client</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 w-[15%]">Amount</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 w-[15%]">Due Date</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 w-[15%]">Status</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 w-[15%]">Platform</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-500 w-[5%] text-right"></th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv, i) => {
                const statusObj = getStatusConfig(inv.status);
                
                return (
                  <tr key={i} className="border-b border-[#1a1a1a] last:border-0 hover:bg-[#111]/60 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[13px] text-gray-300 group-hover:text-white transition-colors">{inv.invoice_number}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[13px] text-white">{inv.clients?.name || 'Unknown'}</span>
                        <span className="text-[11px] font-semibold text-gray-500">{inv.clients?.company || 'No Company'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-[14px] text-white">
                        ${Number(inv.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[13px] text-gray-400">
                        {new Date(inv.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={inv.status}
                        onChange={(e) => handleUpdateStatus(inv.id, e.target.value)}
                        className={`text-[11px] font-bold capitalize px-2.5 py-1 rounded-full border outline-none cursor-pointer transition-all ${statusObj.bg} ${statusObj.border} ${statusObj.color} bg-opacity-80 hover:opacity-100`}
                      >
                        <option value="due_soon" className="bg-[#111] text-gray-300">Due Soon</option>
                        <option value="overdue" className="bg-[#111] text-rose-400">Overdue</option>
                        <option value="promised" className="bg-[#111] text-blue-400">Promised</option>
                        <option value="disputed" className="bg-[#111] text-amber-400">Disputed</option>
                        <option value="paid" className="bg-[#111] text-emerald-400">Paid</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[12px] font-bold text-gray-400 px-2 py-1 bg-[#151515] rounded-md border border-[#222]">
                        {inv.platform || 'MANUAL'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      <a 
                        href={`/invoice/${inv.id}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        title="Print / Download PDF" 
                        className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      >
                        <Printer className="w-4 h-4" />
                      </a>
                      {inv.payment_link && (
                        <a href={inv.payment_link} target="_blank" rel="noreferrer" title="Open Stripe Payment Link" className="p-1.5 rounded-md hover:bg-orange-500/10 text-orange-500 transition-colors">
                          <DollarSign className="w-4 h-4" />
                        </a>
                      )}
                      <button className="p-1.5 rounded-md hover:bg-[#222] text-gray-500 hover:text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#111] border border-[#222] flex items-center justify-center mb-3">
                        <Search className="w-5 h-5 text-gray-500" />
                      </div>
                      <p className="text-sm font-bold text-white mb-1">No invoices found</p>
                      <p className="text-xs font-medium text-gray-500">Try adjusting your search criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
