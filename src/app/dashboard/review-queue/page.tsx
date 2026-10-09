"use client";

import { Check, Clock, Play, SkipForward, Mail, Smartphone, MessageCircle, AlertTriangle, ShieldCheck } from "lucide-react";

export default function ReviewQueuePage() {
  const pendingMessages = [
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
  ];

  return (
    <div className="h-full flex flex-col max-w-[1000px] mx-auto">
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
          <button className="px-4 py-2 text-sm font-bold text-gray-300 bg-[#111] border border-[#222] rounded-[14px] shadow-sm hover:bg-[#1a1a1a] hover:text-white transition-colors flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" /> Auto-Approve Settings
          </button>
          <button className="px-5 py-2 text-sm font-bold text-black bg-white rounded-[14px] shadow-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Check className="w-4 h-4" /> Approve All (3)
          </button>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-[16px] p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-orange-400">3 Messages waiting for manual approval</h4>
          <p className="text-[12px] text-orange-500/80 mt-0.5">These messages are scheduled to go out soon. If not approved, they will be paused automatically.</p>
        </div>
      </div>

      {/* Queue List */}
      <div className="flex flex-col gap-4">
        {pendingMessages.map((msg) => (
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
                <div className="mt-3 flex items-center gap-1.5 text-blue-400 text-[12px] font-bold cursor-pointer hover:text-blue-300 transition-colors w-max">
                  <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  </div>
                  Attached: Payment Link via Stripe
                </div>
              </div>
            </div>
            
            {/* Right Actions */}
            <div className="flex flex-row md:flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-[#1a1a1a] pt-4 md:pt-0 md:pl-6 w-full md:w-48">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-[14px] text-[13px] font-bold hover:bg-emerald-600 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Play className="w-4 h-4 fill-current" /> Approve
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#111] text-gray-400 border border-[#222] rounded-[14px] text-[13px] font-bold hover:bg-[#1a1a1a] hover:text-white transition-colors">
                <SkipForward className="w-4 h-4" /> Snooze
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
