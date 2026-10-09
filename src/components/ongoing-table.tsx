"use client";

import { useEffect, useState } from "react";
import { ExternalLink, ChevronUp, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export function OngoingTable() {
  const [clients, setClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', company: '', email: '' });

  const supabase = createClient();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select(`
          id,
          name,
          company,
          email,
          created_at,
          invoices (
            id,
            amount,
            status
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const enrichedClients = data.map((client: any) => {
          const totalInvoices = client.invoices?.length || 0;
          const totalOutstanding = client.invoices
            ?.filter((inv: any) => inv.status !== 'paid')
            ?.reduce((sum: number, inv: any) => sum + Number(inv.amount), 0) || 0;
          
          return {
            ...client,
            totalInvoices,
            totalOutstanding,
            color: ["bg-blue-600", "bg-emerald-600", "bg-rose-500", "bg-amber-500", "bg-indigo-600"][Math.floor(Math.random() * 5)]
          };
        });
        
        setClients(enrichedClients);
      }
    } catch (err) {
      console.error("Failed to fetch clients", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      const { error } = await supabase
        .from('clients')
        .insert([{
          user_id: user.id,
          name: newClient.name,
          company: newClient.company,
          email: newClient.email
        }]);

      if (error) throw error;

      // Close modal, reset form, and refresh data
      setIsAddModalOpen(false);
      setNewClient({ name: '', company: '', email: '' });
      fetchClients();
      
    } catch (error) {
      console.error("Failed to add client", error);
      alert("Failed to add client.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="glass-card rounded-[24px] overflow-hidden flex-1 flex flex-col relative z-0">
        <div className="px-6 py-5 border-b border-[#1a1a1a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChevronUp className="w-4 h-4 text-gray-500" />
            <h3 className="font-bold text-[15px] text-white">Client Roster</h3>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#1a1a1a] text-gray-300">{clients.length}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/projects" className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-400 hover:text-white transition-colors">
              Switch to 4-Column Board
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 text-[12px] font-bold bg-white text-black px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Client
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="px-6 py-4 text-[12px] font-semibold text-gray-400 w-[25%]">Contact Name</th>
                  <th className="px-6 py-4 text-[12px] font-semibold text-gray-400 w-[25%]">Agency / Company</th>
                  <th className="px-6 py-4 text-[12px] font-semibold text-gray-400 w-[25%]">Email Address</th>
                  <th className="px-6 py-4 text-[12px] font-semibold text-gray-400 w-[15%]">Active Invoices</th>
                  <th className="px-6 py-4 text-[12px] font-semibold text-gray-400 w-[10%] text-right">Outstanding</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, i) => (
                  <tr key={i} className="border-b border-[#1a1a1a] last:border-0 hover:bg-[#111]/50 transition-colors relative group">
                    <td className="px-6 py-4">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${client.color}`}>
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-bold text-[13px] text-white">{client.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[13px] text-gray-300">{client.company}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[13px] text-gray-400">{client.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#222] bg-[#111] text-[11px] font-bold text-gray-300">
                        {client.totalInvoices} Invoices
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-bold text-[14px] text-white">
                        ${client.totalOutstanding.toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </div>
                    </td>
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm font-medium">
                      No clients found. Add your first client to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-[24px] p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white font-serif">Add New Client</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddClient} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Contact Name</label>
                <input 
                  type="text" 
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  placeholder="e.g. Elena Rostova" 
                  className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all placeholder:text-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Agency / Company</label>
                <input 
                  type="text" 
                  value={newClient.company}
                  onChange={(e) => setNewClient({...newClient, company: e.target.value})}
                  placeholder="e.g. Nova Brands Digital" 
                  className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all placeholder:text-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  placeholder="e.g. elena@novabrands.com" 
                  className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all placeholder:text-gray-700"
                  required
                />
              </div>
              
              <div className="mt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-bold rounded-xl py-3 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
