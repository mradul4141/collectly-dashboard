"use client";

import { CheckCircle2, Copy } from "lucide-react";

export function CadenceView() {
  return (
    <div className="flex flex-col gap-6">
      {/* Sub-banner */}
      <div className="glass-card rounded-[24px] p-6 flex items-start justify-between">
        <div>
          <div className="text-[10px] font-bold text-slate-400 tracking-wider mb-2 uppercase">
            Section 6 Architecture <span className="mx-1 text-slate-300">•</span> Trade-Specific Cadence
          </div>
          <h3 className="text-[18px] font-bold text-slate-900 mb-2">Polite 5-Step Reminder Cadence</h3>
          <p className="text-[12px] font-medium text-slate-500 max-w-2xl leading-relaxed">
            Designed around behavioral psychology: light early heads-ups, polite check-ins before friction develops, and an escalation ladder that creates a phone call task before legal debt collection is ever considered.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <div>
            <div className="text-[12px] font-bold text-emerald-900">Auto-Stop Rule Enforced</div>
            <div className="text-[10px] text-emerald-600">Cancels remaining steps if paid early</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
        {/* Left: Milestones */}
        <div className="flex flex-col">
          <h4 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-4">Cadence Milestones</h4>
          <div className="flex flex-col gap-3 overflow-y-auto pr-2">
            
            {/* Step 1 */}
            <div className="bg-white border-2 border-emerald-500 rounded-[16px] p-5 shadow-sm relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 w-2 h-8 bg-emerald-500 rounded-r-md"></div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-bold text-slate-900"><span className="text-slate-400 mr-2">01.</span> -3 Days Before Due</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase">Friendly Tone</span>
              </div>
              <h5 className="font-bold text-[14px] text-slate-900 mb-1">Friendly Upcoming Notice</h5>
              <p className="text-[12px] text-slate-500">Gentle heads-up with the invoice attached and direct one-click payment link.</p>
            </div>

            {/* Step 2 */}
            <div className="glass-card rounded-[16px] p-5 border border-[#ECEAE4] opacity-60">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-bold text-slate-900"><span className="text-slate-400 mr-2">02.</span> On Due Date</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded uppercase">Neutral Tone</span>
              </div>
              <h5 className="font-bold text-[14px] text-slate-900 mb-1">Due Today Notice</h5>
              <p className="text-[12px] text-slate-500">Neutral, straightforward notice confirming invoice is due today with payment link.</p>
            </div>

            {/* Step 3 */}
            <div className="glass-card rounded-[16px] p-5 border border-[#ECEAE4] opacity-60">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-bold text-slate-900"><span className="text-slate-400 mr-2">03.</span> +3 Days Overdue</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded uppercase">Polite Tone</span>
              </div>
              <h5 className="font-bold text-[14px] text-slate-900 mb-1">Gentle Nudge</h5>
              <p className="text-[12px] text-slate-500">Polite check-in asking if there were any issues receiving the invoice.</p>
            </div>
            
          </div>
        </div>

        {/* Right: Preview */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h4 className="text-[15px] font-bold text-slate-900 mb-1 flex items-center gap-2">
              <span className="text-[12px] text-slate-400">-3d</span> Friendly Upcoming Notice
            </h4>
            <p className="text-[12px] text-slate-500 mb-4">Gentle heads-up with the invoice attached and direct one-click payment link.</p>
            
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-md text-[12px] font-bold shadow-sm">
                <span className="text-sm">💬</span> WhatsApp
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-md text-[12px] font-semibold hover:bg-slate-50">
                <span>✉️</span> Email
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-md text-[12px] font-semibold hover:bg-slate-50">
                <span>📱</span> SMS
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Client Preview Simulation</span>
            <button className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-slate-600">
              <Copy className="w-3 h-3" /> Copy Template
            </button>
          </div>

          <div className="glass-card rounded-[20px] p-1 h-full relative overflow-hidden flex flex-col bg-[#efeae2]">
            {/* WhatsApp Mock */}
            <div className="bg-[#075E54] text-white p-3 rounded-t-[16px] flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-[10px] font-bold border border-emerald-600">DP</div>
                <div>
                  <div className="text-[13px] font-bold flex items-center gap-1">
                    DuePulse Billing <span className="bg-emerald-400 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px]">✓</span>
                  </div>
                  <div className="text-[10px] text-emerald-100">Official Business Account</div>
                </div>
              </div>
              <div className="text-[10px] text-emerald-200">Meta Utility (T0.145)</div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
              <div className="bg-white rounded-xl rounded-tl-none p-3 max-w-[85%] shadow-sm mb-3">
                <p className="text-[13px] text-slate-800 leading-relaxed mb-3">
                  Hello Dave Miller 👋 Just a gentle heads-up that invoice INV-2026-088 ($4,200) will be due on 17 Sep 2026. Tap below to pay quickly:
                </p>
                <div className="w-full bg-slate-50 border border-slate-100 rounded-lg p-2 flex items-center justify-center text-blue-600 text-[12px] font-bold cursor-pointer hover:bg-blue-50 transition-colors">
                  🔗 Pay $4,200 via Stripe
                </div>
                <div className="text-right mt-1">
                  <span className="text-[9px] text-slate-400">10:42 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
