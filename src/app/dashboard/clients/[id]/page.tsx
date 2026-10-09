"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Send,
  Plus,
  Loader2,
  Trash2
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params?.id as string;
  const supabase = createClient();

  const [client, setClient] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<string[]>([
    "Customer promised payment via NEFT next Monday.",
    "Initial invoice sent on 1st of month. Acknowledged by accounts team."
  ]);

  useEffect(() => {
    async function loadClientData() {
      if (!clientId) return;
      try {
        setIsLoading(true);
        // Load Client
        const { data: clientData, error: clientErr } = await supabase
          .from("clients")
          .select("*")
          .eq("id", clientId)
          .single();

        if (clientErr) throw clientErr;
        setClient(clientData);

        // Load Invoices for this client
        const { data: invData } = await supabase
          .from("invoices")
          .select("*")
          .eq("client_id", clientId)
          .order("created_at", { ascending: false });

        setInvoices(invData || []);
      } catch (err) {
        console.error("Failed to load client details", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadClientData();
  }, [clientId, supabase]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setNotes([noteText, ...notes]);
    setNoteText("");
  };

  const totalBilled = invoices.reduce((acc, inv) => acc + (Number(inv.amount) || 0), 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((acc, inv) => acc + (Number(inv.amount) || 0), 0);
  const totalOutstanding = totalBilled - totalPaid;

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-gray-400">
        <h2 className="text-xl font-bold text-white mb-2">Client Not Found</h2>
        <p className="mb-4 text-sm">The requested client record does not exist or has been deleted.</p>
        <Link 
          href="/dashboard/clients" 
          className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Clients List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full pb-12 flex flex-col gap-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <Link 
          href="/dashboard/clients" 
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Clients
        </Link>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push("/dashboard/invoices")}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-3.5 h-3.5" /> Issue New Invoice
          </button>
        </div>
      </div>

      {/* Client Overview Card */}
      <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-serif font-bold text-2xl shadow-xl shadow-orange-500/10 shrink-0">
            {client.name ? client.name.charAt(0).toUpperCase() : "C"}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-serif font-bold text-white tracking-tight">{client.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active Client
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2 font-medium">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-gray-500" /> {client.company || "Independent"}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-500" /> {client.email || "No email provided"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-500" /> Added {new Date(client.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Balance Figures */}
        <div className="flex gap-4 md:gap-6 border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-8">
          <div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Total Invoiced</span>
            <span className="text-xl font-bold font-mono text-white">${totalBilled.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Outstanding</span>
            <span className="text-xl font-bold font-mono text-orange-400">${totalOutstanding.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Invoice Ledger */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-500" /> Invoice History ({invoices.length})
            </h2>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">
            {invoices.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No invoices found for this client yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-[11px] uppercase tracking-wider text-gray-500">
                    <th className="py-3.5 px-5 font-bold">Invoice #</th>
                    <th className="py-3.5 px-5 font-bold">Due Date</th>
                    <th className="py-3.5 px-5 font-bold">Amount</th>
                    <th className="py-3.5 px-5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 text-xs">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[#161616] transition-colors">
                      <td className="py-3.5 px-5 font-mono font-bold text-white">
                        {inv.invoice_number || `INV-${inv.id.slice(0, 6)}`}
                      </td>
                      <td className="py-3.5 px-5 text-gray-400">
                        {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : "Immediate"}
                      </td>
                      <td className="py-3.5 px-5 font-mono font-bold text-gray-200">
                        ${Number(inv.amount).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          inv.status === "paid" 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : inv.status === "overdue"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right: Internal Notes & Reminders */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" /> Account Activity & Notes
          </h2>

          <div className="bg-[#111] border border-gray-800 rounded-2xl p-5 flex flex-col gap-4">
            <form onSubmit={handleAddNote} className="flex flex-col gap-2">
              <textarea 
                rows={2}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add communication note..."
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder:text-gray-600 outline-none focus:border-orange-500 transition-colors resize-none"
              />
              <button 
                type="submit"
                className="self-end px-3 py-1.5 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3 h-3" /> Post Note
              </button>
            </form>

            <div className="border-t border-gray-800 pt-3 space-y-3">
              {notes.map((n, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-gray-900 rounded-xl p-3 text-xs text-gray-300 leading-relaxed">
                  <p>{n}</p>
                  <span className="text-[10px] text-gray-600 block mt-1.5">Logged recently</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
