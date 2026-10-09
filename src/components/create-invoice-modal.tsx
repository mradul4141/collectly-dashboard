"use client";

import { useState, useEffect } from "react";
import { X, Loader2, DollarSign, Calendar, FileText, User, Link as LinkIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { generatePaymentLink } from "@/actions/stripe";

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateInvoiceModal({ isOpen, onClose, onSuccess }: CreateInvoiceModalProps) {
  const [clients, setClients] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingClients, setIsLoadingClients] = useState(false);
  
  const [formData, setFormData] = useState({
    clientId: "",
    invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    amount: "",
    dueDate: "",
    description: "",
  });

  const supabase = createClient();

  useEffect(() => {
    if (isOpen) {
      fetchClients();
      // Generate a new random invoice number each time it opens
      setFormData(prev => ({
        ...prev,
        invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`
      }));
    }
  }, [isOpen]);

  const fetchClients = async () => {
    setIsLoadingClients(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('clients')
        .select('id, name, company')
        .eq('user_id', user.id)
        .order('name');
      
      if (data) {
        setClients(data);
        if (data.length > 0 && !formData.clientId) {
          setFormData(prev => ({ ...prev, clientId: data[0].id }));
        }
      }
    }
    setIsLoadingClients(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientId) {
      alert("Please select a client.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('invoices')
        .insert({
          user_id: user.id,
          client_id: formData.clientId,
          invoice_number: formData.invoiceNumber,
          amount: Number(formData.amount),
          due_date: formData.dueDate,
          description: formData.description,
          status: 'due_soon', // default status
          platform: 'MANUAL',
          cadence: 'Standard Follow-up'
        })
        .select();

      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Invoice was not returned from Supabase.");

      const invoiceId = data[0].id;
      
      // Attempt to generate a Stripe payment link
      try {
        const stripeRes = await generatePaymentLink(invoiceId, Number(formData.amount), formData.description);
        
        if (stripeRes.success && stripeRes.url) {
          // You could also do a second update here if not handled inside the action,
          // but the action already attempts to update it.
          console.log("Stripe payment link generated:", stripeRes.url);
        }
      } catch (stripeErr) {
        console.error("Could not generate Stripe link immediately:", stripeErr);
        // We don't block the UI if Stripe fails, the invoice was still created.
      }

      onSuccess();
      onClose();
      // Reset form
      setFormData({
        clientId: clients.length > 0 ? clients[0].id : "",
        invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
        amount: "",
        dueDate: "",
        description: "",
      });
    } catch (err: any) {
      console.error("Error creating invoice:", err);
      alert(err.message || "Failed to create invoice");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#0a0a0a] border border-[#222] rounded-[24px] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1a1a1a] flex justify-between items-center bg-[#111]">
          <h3 className="text-lg font-bold text-white font-serif">Create New Invoice</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 rounded-full hover:bg-[#222]">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[80vh]">
          
          {/* Client Selection */}
          <div>
            <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Client</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <select 
                value={formData.clientId}
                onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                className="w-full bg-[#111] border border-[#222] rounded-xl pl-10 pr-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all appearance-none"
                required
                disabled={isLoadingClients}
              >
                <option value="" disabled>Select a client...</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name} {client.company ? `(${client.company})` : ''}
                  </option>
                ))}
              </select>
              {isLoadingClients && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 animate-spin" />}
            </div>
            {clients.length === 0 && !isLoadingClients && (
              <p className="text-xs text-rose-400 mt-1 ml-1">You need to add a client first.</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Invoice Number */}
            <div>
              <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Invoice ID</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                  className="w-full bg-[#111] border border-[#222] rounded-xl pl-10 pr-4 py-3 text-sm text-gray-300 font-mono font-medium outline-none focus:border-orange-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="0.00"
                  className="w-full bg-[#111] border border-[#222] rounded-xl pl-10 pr-4 py-3 text-sm text-white font-bold outline-none focus:border-orange-500 transition-all placeholder:text-gray-600"
                  required
                />
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Due Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="date" 
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full bg-[#111] border border-[#222] rounded-xl pl-10 pr-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all css-calendar-icon-white"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Description (Optional)</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="e.g. Website redesign project phase 1"
              rows={3}
              className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all placeholder:text-gray-600 resize-none"
            />
          </div>
          
          {/* Footer Actions */}
          <div className="mt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#111] text-gray-300 font-bold rounded-xl py-3 hover:bg-[#1a1a1a] transition-colors border border-[#222]"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || clients.length === 0}
              className="flex-1 bg-white text-black font-bold rounded-xl py-3 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
