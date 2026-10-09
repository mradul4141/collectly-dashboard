"use client";

import { useState } from "react";
import { 
  Check, 
  Clock, 
  Play, 
  SkipForward, 
  Mail, 
  Smartphone, 
  MessageCircle, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Sliders, 
  X,
  Send
} from "lucide-react";

export default function ReviewQueuePage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      client: "Dave Miller",
      amount: 4200,
      invoice: "INV-2026-088",
      channel: "WhatsApp",
      scheduledFor: "Today, 10:45 AM",
      preview: "Hello Dave Miller, just a gentle heads-up that invoice INV-2026-088 ($4,200) will be due on 17 Sep 2026. Tap below to pay quickly:",
      status: "pending",
      urgency: "normal",
      icon: <MessageCircle className="w-3.5 h-3.5" />
    },
    {
      id: 2,
      client: "Sarah Jenkins",
      amount: 1850,
      invoice: "INV-2026-042",
      channel: "Email",
      scheduledFor: "Today, 2:00 PM",
      preview: "Hi Sarah. This is an automated reminder that your balance of $1,850 is now 5 days overdue. Please settle via the gateway link below.",
      status: "pending",
      urgency: "medium",
      icon: <Mail className="w-3.5 h-3.5" />
    },
    {
      id: 3,
      client: "TechFlow Agency",
      amount: 12400,
      invoice: "INV-2026-019",
      channel: "SMS",
      scheduledFor: "Tomorrow, 9:00 AM",
      preview: "TechFlow: Urgent notice regarding invoice INV-2026-019. $12,400 is 11 days overdue. Please call us to resolve this.",
      status: "pending",
      urgency: "high",
      icon: <Smartphone className="w-3.5 h-3.5" />
    }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [autoApproveUnder, setAutoApproveUnder] = useState("1000");

  const showNotification = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = (id: number) => {
    const target = messages.find(m => m.id === id);
    setMessages(prev => prev.filter(m => m.id !== id));
    showNotification(`Approved & dispatched reminder to ${target?.client || "client"} via ${target?.channel}.`);
  };

  const handleSnooze = (id: number) => {
    const target = messages.find(m => m.id === id);
    setMessages(prev => prev.filter(m => m.id !== id));
    showNotification(`Snoozed ${target?.client}'s reminder for 24 hours.`);
  };

  const handleApproveAll = () => {
    const count = messages.length;
    setMessages([]);
    showNotification(`Successfully approved all ${count} queue reminders!`);
  };

  return (
    <div className="h-full flex flex-col max-w-[1000px] mx-auto relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161616] border border-emerald-500/30 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-3xl font-serif font-bold tracking-tight text-white">Owner Review Queue</h2>
          </div>
          <p className="text-sm font-medium text-gray-400">Pre-flight approval safety net before automated messages are dispatched.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="px-4 py-2 text-sm font-bold text-gray-300 bg-[#111] border border-[#222] rounded-[14px] shadow-sm hover:bg-[#1a1a1a] hover:text-white transition-colors flex items-center gap-2"
          >
            <Sliders className="w-4 h-4 text-orange-500" /> Auto-Rules
          </button>
          {messages.length > 0 && (
            <button 
              onClick={handleApproveAll}
              className="px-5 py-2 text-sm font-bold text-black bg-white rounded-[14px] shadow-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Approve All ({messages.length})
            </button>
          )}
        </div>
      </div>

      {/* Warning / Status Banner */}
      {messages.length > 0 ? (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-[16px] p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-orange-400">{messages.length} Messages waiting for manual approval</h4>
            <p className="text-[12px] text-orange-500/80 mt-0.5">These reminders are paused safely. Click Approve to dispatch immediately.</p>
          </div>
        </div>
      ) : (
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-12 text-center my-8">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Queue is Clear</h3>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">All outbound debt-collection sequence reminders have been reviewed and dispatched.</p>
        </div>
      )}

      {/* Queue List */}
      <div className="flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[24px] p-6 flex flex-col md:flex-row gap-6 hover:border-[#333] transition-colors group">
            
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-between">
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center font-bold text-white text-sm">
                    {msg.client.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{msg.client}</h3>
                    <div className="text-[12px] font-medium text-gray-500 flex gap-2 items-center mt-0.5">
                      <span className="font-mono">{msg.invoice}</span> 
                      <span className="text-gray-700">•</span> 
                      <span className={
                        msg.urgency === 'high' ? 'text-rose-400 font-bold' :
                        msg.urgency === 'medium' ? 'text-orange-400 font-bold' :
                        'text-emerald-400 font-bold'
                      }>
                        ${msg.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#111] border border-[#222] text-gray-300 text-[11px] font-bold">
                    {msg.icon} {msg.channel}
                  </span>
                  <div className="text-[11px] font-medium text-orange-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {msg.scheduledFor}
                  </div>
                </div>
              </div>

              {/* Message Bubble */}
              <div className="bg-[#111] border border-[#222] rounded-[16px] rounded-tl-sm p-4 relative">
                <p className="text-[13px] text-gray-300 leading-relaxed">{msg.preview}</p>
                <div className="mt-3 flex items-center gap-1.5 text-blue-400 text-[12px] font-bold">
                  <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  </div>
                  Attached: Payment Link via Stripe
                </div>
              </div>
            </div>
            
            {/* Right Actions */}
            <div className="flex flex-row md:flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-[#1a1a1a] pt-4 md:pt-0 md:pl-6 w-full md:w-48">
              <button 
                onClick={() => handleApprove(msg.id)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-[14px] text-[13px] font-bold hover:bg-emerald-600 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <Play className="w-4 h-4 fill-current" /> Approve
              </button>
              <button 
                onClick={() => handleSnooze(msg.id)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#111] text-gray-400 border border-[#222] rounded-[14px] text-[13px] font-bold hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                <SkipForward className="w-4 h-4" /> Snooze
              </button>
            </div>
            
          </div>
        ))}
      </div>

      {/* Auto-Rules Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0f0f0f] border border-gray-800 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-serif font-bold text-white">Auto-Approval Guardrails</h3>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs text-gray-400">
              <div>
                <label className="block font-bold text-gray-300 mb-2">Auto-approve invoices under amount ($):</label>
                <input 
                  type="number"
                  value={autoApproveUnder}
                  onChange={(e) => setAutoApproveUnder(e.target.value)}
                  className="w-full bg-[#181818] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-500"
                />
                <span className="text-[11px] text-gray-500 mt-1 block">Invoices below this threshold skip manual review.</span>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-800 text-orange-500 accent-orange-500 w-4 h-4" />
                  <span className="text-gray-300 font-medium">Require manual approval on third (escalated) reminders</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-800 text-orange-500 accent-orange-500 w-4 h-4" />
                  <span className="text-gray-300 font-medium">Pause cadence if debtor disputes invoice</span>
                </label>
              </div>

              <button
                onClick={() => {
                  setIsSettingsOpen(false);
                  showNotification("Guardrail rules saved successfully.");
                }}
                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors mt-4 text-xs"
              >
                Save Guardrail Rules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
