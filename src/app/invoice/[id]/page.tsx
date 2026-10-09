"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Printer, Download, ArrowLeft, CheckCircle2, Building, Calendar, Hash, FileText } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function InvoicePrintView() {
  const params = useParams();
  const invoiceId = params?.id as string;
  const [invoice, setInvoice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchInvoice() {
      if (!invoiceId) return;
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("invoices")
          .select("*, clients(*)")
          .eq("id", invoiceId)
          .single();

        if (error) throw error;
        setInvoice(data);
      } catch (err) {
        console.error("Failed to load invoice", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchInvoice();
  }, [invoiceId, supabase]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
        <p className="text-gray-400">Invoice not found or deleted.</p>
        <Link href="/dashboard/invoices" className="text-orange-500 text-sm font-bold flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Back to Invoices
        </Link>
      </div>
    );
  }

  const clientName = invoice.clients?.name || "Client Name";
  const clientCompany = invoice.clients?.company || "Company Ltd.";
  const clientEmail = invoice.clients?.email || "billing@client.com";
  const invoiceNumber = invoice.invoice_number || `INV-${invoice.id.slice(0, 8).toUpperCase()}`;
  const amount = Number(invoice.amount || 0);
  const formattedDate = invoice.created_at ? new Date(invoice.created_at).toLocaleDateString() : "Today";
  const dueDate = invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "Net 30";

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200 py-10 px-4 print:p-0 print:bg-white print:text-black">
      {/* Control Bar (Hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link 
          href="/dashboard/invoices" 
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Invoices
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-500/20"
          >
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Printable Invoice Sheet */}
      <div className="max-w-4xl mx-auto bg-[#141414] border border-gray-800 rounded-3xl p-8 md:p-14 shadow-2xl print:border-none print:shadow-none print:bg-white print:p-0">
        
        {/* Invoice Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-gray-800 print:border-gray-200 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-serif font-bold text-lg">
                C
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-white print:text-black">Collectly</span>
            </div>
            <p className="text-xs text-gray-400 print:text-gray-600">Automated Financial Receivables</p>
            <p className="text-xs text-gray-500 print:text-gray-500 mt-1">support@collectly.app</p>
          </div>

          <div className="text-left md:text-right">
            <h1 className="text-3xl font-serif font-bold text-white print:text-black tracking-tight mb-2">INVOICE</h1>
            <div className="space-y-1 text-xs">
              <p className="text-gray-400 print:text-gray-600"><strong className="text-white print:text-black">Invoice No:</strong> {invoiceNumber}</p>
              <p className="text-gray-400 print:text-gray-600"><strong className="text-white print:text-black">Issued:</strong> {formattedDate}</p>
              <p className="text-gray-400 print:text-gray-600"><strong className="text-white print:text-black">Due Date:</strong> {dueDate}</p>
            </div>
          </div>
        </div>

        {/* Billed To / From */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 border-b border-gray-800 print:border-gray-200 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 print:text-gray-400 block mb-2">Billed To</span>
            <h3 className="text-base font-bold text-white print:text-black">{clientName}</h3>
            <p className="text-gray-400 print:text-gray-700 font-medium mt-0.5">{clientCompany}</p>
            <p className="text-gray-500 print:text-gray-500 mt-0.5">{clientEmail}</p>
          </div>

          <div className="md:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 print:text-gray-400 block mb-2">Payment Status</span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              invoice.status === 'paid' 
                ? 'bg-emerald-500/10 text-emerald-400 print:text-emerald-700 border border-emerald-500/20' 
                : 'bg-orange-500/10 text-orange-400 print:text-orange-700 border border-orange-500/20'
            }`}>
              {invoice.status}
            </span>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 print:border-gray-200 text-[11px] uppercase tracking-wider text-gray-400 print:text-gray-600 font-bold">
                <th className="py-3 px-2">Description</th>
                <th className="py-3 px-2 text-center">Qty</th>
                <th className="py-3 px-2 text-right">Rate</th>
                <th className="py-3 px-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40 print:divide-gray-200 text-xs">
              <tr>
                <td className="py-4 px-2 font-medium text-white print:text-black">
                  {invoice.description || "Professional Services & Automated Workflow Retainer"}
                </td>
                <td className="py-4 px-2 text-center text-gray-400 print:text-gray-600">1</td>
                <td className="py-4 px-2 text-right font-mono text-gray-300 print:text-gray-700">${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="py-4 px-2 text-right font-mono font-bold text-white print:text-black">${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Summary */}
        <div className="flex flex-col items-end border-t border-gray-800 print:border-gray-200 pt-6">
          <div className="w-full md:w-64 space-y-2 text-xs">
            <div className="flex justify-between text-gray-400 print:text-gray-600">
              <span>Subtotal:</span>
              <span className="font-mono text-white print:text-black">${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-gray-400 print:text-gray-600">
              <span>Tax / GST (0%):</span>
              <span className="font-mono text-white print:text-black">$0.00</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white print:text-black border-t border-gray-800 print:border-gray-200 pt-3">
              <span>Total Due:</span>
              <span className="font-mono text-orange-400 print:text-black">${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-14 pt-8 border-t border-gray-900 print:border-gray-200 text-[11px] text-gray-500 print:text-gray-400 text-center">
          <p>Thank you for your business. For bank transfer or wire assistance, please reference your invoice number.</p>
          <p className="mt-1">Generated electronically via Collectly SaaS.</p>
        </div>

      </div>
    </div>
  );
}
