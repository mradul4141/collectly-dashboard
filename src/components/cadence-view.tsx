"use client";

import { CheckCircle2, Copy, MessageCircle, Mail, Smartphone, Link as LinkIcon, Check, Settings2 } from "lucide-react";

export function CadenceView() {
  return (
    <div className="flex flex-col gap-6">
      {/* Sub-banner */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[24px] p-6 flex items-start justify-between">
        <div>
          <div className="text-[10px] font-bold text-orange-500 tracking-wider mb-2 uppercase flex items-center gap-2">
            <Settings2 className="w-3 h-3" /> Automation Settings <span className="text-gray-700">•</span> Trade-Specific Cadence
          </div>
          <h3 className="text-[18px] font-bold text-white mb-2">Polite 5-Step Reminder Cadence</h3>
          <p className="text-[12px] font-medium text-gray-400 max-w-2xl leading-relaxed">
            Designed around behavioral psychology: light early heads-ups, polite check-ins before friction develops, and an escalation ladder that creates a phone call task before legal debt collection is ever considered.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <div>
            <div className="text-[12px] font-bold text-emerald-400">Auto-Stop Rule Enforced</div>
            <div className="text-[10px] text-emerald-600 font-medium">Cancels remaining steps if paid early</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
        {/* Left: Milestones */}
        <div className="flex flex-col">
          <h4 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-4">Cadence Milestones</h4>
          <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
            
            {/* Step 1 */}
            <div className="bg-[#111] border-2 border-orange-500 rounded-[16px] p-5 shadow-sm relative group cursor-pointer">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 w-2 h-8 bg-orange-500 rounded-r-md"></div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-bold text-white"><span className="text-gray-500 mr-2 font-mono">01.</span> -3 Days Before Due</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded uppercase">Friendly Tone</span>
              </div>
              <h5 className="font-bold text-[14px] text-white mb-1">Friendly Upcoming Notice</h5>
              <p className="text-[12px] text-gray-400">Gentle heads-up with the invoice attached and direct one-click payment link.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[16px] p-5 opacity-60 hover:opacity-100 hover:border-[#333] transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-bold text-white"><span className="text-gray-600 mr-2 font-mono">02.</span> On Due Date</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-[#1a1a1a] text-gray-300 border border-[#333] rounded uppercase">Neutral Tone</span>
              </div>
              <h5 className="font-bold text-[14px] text-white mb-1">Due Today Notice</h5>
              <p className="text-[12px] text-gray-400">Neutral, straightforward notice confirming invoice is due today with payment link.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[16px] p-5 opacity-60 hover:opacity-100 hover:border-[#333] transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-bold text-white"><span className="text-gray-600 mr-2 font-mono">03.</span> +3 Days Overdue</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded uppercase">Polite Tone</span>
              </div>
              <h5 className="font-bold text-[14px] text-white mb-1">Gentle Nudge</h5>
              <p className="text-[12px] text-gray-400">Polite check-in asking if there were any issues receiving the invoice.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[16px] p-5 opacity-60 hover:opacity-100 hover:border-[#333] transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-bold text-white"><span className="text-gray-600 mr-2 font-mono">04.</span> +7 Days Overdue</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded uppercase">Firm Tone</span>
              </div>
              <h5 className="font-bold text-[14px] text-white mb-1">Account Warning</h5>
              <p className="text-[12px] text-gray-400">Professional notice warning about potential late fees and service pauses.</p>
            </div>
            
          </div>
        </div>

        {/* Right: Preview */}
        <div className="flex flex-col bg-[#0a0a0a] border border-[#1a1a1a] rounded-[24px] p-6">
          <div className="mb-6">
            <h4 className="text-[15px] font-bold text-white mb-1 flex items-center gap-2">
              <span className="text-[12px] text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">-3d</span> Friendly Upcoming Notice
            </h4>
            <p className="text-[12px] text-gray-400 mb-4">Gentle heads-up with the invoice attached and direct one-click payment link.</p>
            
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-md text-[12px] font-bold shadow-sm hover:bg-emerald-600 transition-colors">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111] border border-[#333] text-gray-300 rounded-md text-[12px] font-semibold hover:bg-[#1a1a1a] transition-colors">
                <Mail className="w-3.5 h-3.5" /> Email
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111] border border-[#333] text-gray-300 rounded-md text-[12px] font-semibold hover:bg-[#1a1a1a] transition-colors">
                <Smartphone className="w-3.5 h-3.5" /> SMS
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end mb-3">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Client Preview Simulation</span>
            <button className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 hover:text-white transition-colors">
              <Copy className="w-3 h-3" /> Copy Template
            </button>
          </div>

          <div className="rounded-[20px] p-1 h-full relative overflow-hidden flex flex-col bg-[#0f1115] border border-[#1f232b]">
            {/* WhatsApp Mock */}
            <div className="bg-[#1f2c34] text-white p-3 rounded-t-[16px] flex justify-between items-center shadow-md z-10 border-b border-[#2a3942]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold">DP</div>
                <div>
                  <div className="text-[13px] font-bold flex items-center gap-1">
                    Collectly Bot <span className="bg-emerald-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px]"><Check className="w-2 h-2" /></span>
                  </div>
                  <div className="text-[10px] text-emerald-200/60">Official Business Account</div>
                </div>
              </div>
              <div className="text-[10px] text-slate-400">Meta Utility (T0.145)</div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto bg-cover" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", opacity: 0.9 }}>
              <div className="bg-[#202c33] border border-[#2a3942] rounded-xl rounded-tl-none p-3 max-w-[85%] shadow-sm mb-3 relative">
                <p className="text-[13px] text-gray-200 leading-relaxed mb-3">
                  Hello Dave Miller, just a gentle heads-up that invoice *INV-2026-088 ($4,200)* will be due on 17 Sep 2026. Tap below to pay quickly:
                </p>
                <div className="w-full bg-[#2a3942] rounded-lg p-2 flex items-center justify-center gap-1.5 text-blue-400 text-[12px] font-bold cursor-pointer hover:bg-[#324550] transition-colors">
                  <LinkIcon className="w-3.5 h-3.5" /> Pay $4,200 via Stripe
                </div>
                <div className="text-right mt-1 flex justify-end items-center gap-1">
                  <span className="text-[9px] text-gray-400">10:42 AM</span>
                  <div className="flex -space-x-1 opacity-70">
                    <Check className="w-3 h-3 text-emerald-500" />
                    <Check className="w-3 h-3 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
