"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  Copy, 
  MessageCircle, 
  Mail, 
  Smartphone, 
  Link as LinkIcon, 
  Check, 
  Settings2,
  CheckCheck
} from "lucide-react";

export function CadenceView() {
  const steps = [
    {
      id: 1,
      badge: "-3d",
      days: "-3 Days Before Due",
      tone: "Friendly Tone",
      toneColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      title: "Friendly Upcoming Notice",
      desc: "Gentle heads-up with the invoice attached and direct one-click payment link.",
      channelText: {
        whatsapp: "Hello Dave Miller, just a gentle heads-up that invoice *INV-2026-088 ($4,200)* will be due on 17 Sep 2026. Tap below to pay quickly:",
        email: "Hi Dave,\n\nHope your week is going well. This is a quick note that invoice INV-2026-088 for $4,200 is due in 3 days. A PDF copy is attached for your records.\n\nThank you,\nFinance Operations",
        sms: "Collectly: Dave, invoice INV-2026-088 ($4,200) is due on 17 Sep. Settle early: https://pay.collectly.app/inv-88"
      }
    },
    {
      id: 2,
      badge: "0d",
      days: "On Due Date",
      tone: "Neutral Tone",
      toneColor: "bg-[#1a1a1a] text-gray-300 border-[#333]",
      title: "Due Today Notice",
      desc: "Neutral, straightforward notice confirming invoice is due today with payment link.",
      channelText: {
        whatsapp: "Hello Dave, invoice *INV-2026-088 ($4,200)* is due today. Please tap below to clear the balance:",
        email: "Hi Dave,\n\nThis is a notification that invoice INV-2026-088 for $4,200 is due today. Please arrange payment through your portal link.\n\nBest regards,\nCollectly Billing",
        sms: "Collectly: Invoice INV-2026-088 ($4,200) is due today. One-click link: https://pay.collectly.app/inv-88"
      }
    },
    {
      id: 3,
      badge: "+3d",
      days: "+3 Days Overdue",
      tone: "Polite Tone",
      toneColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      title: "Gentle Nudge",
      desc: "Polite check-in asking if there were any issues receiving the invoice.",
      channelText: {
        whatsapp: "Hi Dave, we noticed invoice *INV-2026-088 ($4,200)* is 3 days past due. Was there any issue processing this? We're here to help:",
        email: "Hi Dave,\n\nJust following up on invoice INV-2026-088 ($4,200), which was due on 17 Sep. Could you confirm if this is scheduled for processing this week?\n\nThank you,\nCollectly Team",
        sms: "Collectly: Invoice INV-2026-088 is 3 days overdue ($4,200). Need assistance? Pay or reply here: https://pay.collectly.app/inv-88"
      }
    },
    {
      id: 4,
      badge: "+7d",
      days: "+7 Days Overdue",
      tone: "Firm Tone",
      toneColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      title: "Account Warning",
      desc: "Professional notice warning about potential late fees and service pauses.",
      channelText: {
        whatsapp: "Dave, invoice *INV-2026-088 ($4,200)* is now 7 days overdue. To prevent account suspension or late penalties, please clear this immediately:",
        email: "Attention: Dave Miller\n\nInvoice INV-2026-088 ($4,200) remains unpaid after 7 days. Under our terms of service, continued non-payment may incur statutory interest.\n\nPlease remit immediately.",
        sms: "URGENT: Invoice INV-2026-088 ($4,200) is 7 days overdue. Pay now to avoid account hold: https://pay.collectly.app/inv-88"
      }
    },
    {
      id: 5,
      badge: "+14d",
      days: "+14 Days Overdue",
      tone: "Escalated",
      toneColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      title: "Escalation & Call Scheduled",
      desc: "Final formal communication before moving account to dispute or debt recovery.",
      channelText: {
        whatsapp: "FINAL NOTICE: Invoice *INV-2026-088 ($4,200)* is 14 days overdue. A representative is scheduled to contact your finance office today.",
        email: "FINAL NOTICE: Unsettled Account INV-2026-088\n\nThis account is 14 days past due. Formal collections procedures will commence if payment is not received within 48 hours.",
        sms: "FINAL NOTICE: $4,200 past due on INV-2026-088. Call scheduled with accounts. Pay immediately: https://pay.collectly.app/inv-88"
      }
    }
  ];

  const [activeStep, setActiveStep] = useState(steps[0]);
  const [activeChannel, setActiveChannel] = useState<"whatsapp" | "email" | "sms">("whatsapp");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeStep.channelText[activeChannel]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sub-banner */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[24px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-orange-500 tracking-wider mb-2 uppercase flex items-center gap-2">
            <Settings2 className="w-3 h-3" /> Automation Settings <span className="text-gray-700">•</span> Trade-Specific Cadence
          </div>
          <h3 className="text-[18px] font-bold text-white mb-2">Polite 5-Step Reminder Cadence</h3>
          <p className="text-[12px] font-medium text-gray-400 max-w-2xl leading-relaxed">
            Designed around behavioral psychology: light early heads-ups, polite check-ins before friction develops, and an escalation ladder that schedules call tasks before collections are considered.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <div>
            <div className="text-[12px] font-bold text-emerald-400">Auto-Stop Rule Enforced</div>
            <div className="text-[10px] text-emerald-600 font-medium">Cancels remaining steps if paid early</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Milestones */}
        <div className="flex flex-col">
          <h4 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-4">Cadence Milestones</h4>
          <div className="flex flex-col gap-3">
            {steps.map((s, idx) => {
              const isSelected = activeStep.id === s.id;
              return (
                <div 
                  key={s.id}
                  onClick={() => setActiveStep(s)}
                  className={`rounded-[16px] p-5 shadow-sm relative group cursor-pointer transition-all ${
                    isSelected 
                      ? "bg-[#111] border-2 border-orange-500" 
                      : "bg-[#0a0a0a] border border-[#1a1a1a] opacity-70 hover:opacity-100 hover:border-[#333]"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 w-2 h-8 bg-orange-500 rounded-r-md"></div>
                  )}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[13px] font-bold text-white">
                      <span className="text-gray-500 mr-2 font-mono">0{idx + 1}.</span> {s.days}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 border rounded uppercase ${s.toneColor}`}>
                      {s.tone}
                    </span>
                  </div>
                  <h5 className="font-bold text-[14px] text-white mb-1">{s.title}</h5>
                  <p className="text-[12px] text-gray-400">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Preview Simulator */}
        <div className="flex flex-col bg-[#0a0a0a] border border-[#1a1a1a] rounded-[24px] p-6 sticky top-6">
          <div className="mb-6">
            <h4 className="text-[15px] font-bold text-white mb-1 flex items-center gap-2">
              <span className="text-[12px] text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                {activeStep.badge}
              </span> 
              {activeStep.title}
            </h4>
            <p className="text-[12px] text-gray-400 mb-4">{activeStep.desc}</p>
            
            {/* Channel Tabs */}
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveChannel("whatsapp")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-bold transition-colors ${
                  activeChannel === "whatsapp" 
                    ? "bg-emerald-500 text-white shadow-sm" 
                    : "bg-[#111] border border-[#333] text-gray-300 hover:bg-[#1a1a1a]"
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </button>
              <button 
                onClick={() => setActiveChannel("email")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-bold transition-colors ${
                  activeChannel === "email" 
                    ? "bg-blue-500 text-white shadow-sm" 
                    : "bg-[#111] border border-[#333] text-gray-300 hover:bg-[#1a1a1a]"
                }`}
              >
                <Mail className="w-3.5 h-3.5" /> Email
              </button>
              <button 
                onClick={() => setActiveChannel("sms")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-bold transition-colors ${
                  activeChannel === "sms" 
                    ? "bg-purple-500 text-white shadow-sm" 
                    : "bg-[#111] border border-[#333] text-gray-300 hover:bg-[#1a1a1a]"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> SMS
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end mb-3">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Client Simulation Preview</span>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy Template"}
            </button>
          </div>

          {/* Device Mock */}
          <div className="rounded-[20px] overflow-hidden flex flex-col bg-[#0f1115] border border-[#1f232b] min-h-[300px]">
            {activeChannel === "whatsapp" && (
              <>
                <div className="bg-[#1f2c34] text-white p-3 flex justify-between items-center shadow-md z-10 border-b border-[#2a3942]">
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

                <div className="p-4 flex-1 bg-[#0b141a]">
                  <div className="bg-[#202c33] border border-[#2a3942] rounded-xl rounded-tl-none p-3.5 max-w-[90%] shadow-sm mb-3">
                    <p className="text-[13px] text-gray-200 leading-relaxed mb-3 whitespace-pre-wrap font-sans">
                      {activeStep.channelText.whatsapp}
                    </p>
                    <div className="w-full bg-[#2a3942] rounded-lg p-2.5 flex items-center justify-center gap-1.5 text-blue-400 text-[12px] font-bold cursor-pointer hover:bg-[#324550] transition-colors">
                      <LinkIcon className="w-3.5 h-3.5" /> Pay $4,200 via Stripe
                    </div>
                    <div className="text-right mt-1.5 flex justify-end items-center gap-1">
                      <span className="text-[9px] text-gray-400">10:45 AM</span>
                      <CheckCheck className="w-3 h-3 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeChannel === "email" && (
              <div className="p-5 flex-1 bg-[#141414] text-xs space-y-4">
                <div className="border-b border-gray-800 pb-3 space-y-1">
                  <p className="text-gray-500"><strong className="text-gray-300">From:</strong> billing@collectly.app</p>
                  <p className="text-gray-500"><strong className="text-gray-300">To:</strong> dave.miller@client.com</p>
                  <p className="text-gray-500"><strong className="text-gray-300">Subject:</strong> Notice: Invoice INV-2026-088 ({activeStep.days})</p>
                </div>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap font-sans text-xs">
                  {activeStep.channelText.email}
                </div>
                <div className="pt-2">
                  <button className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg text-xs">
                    View & Pay Invoice Online &rarr;
                  </button>
                </div>
              </div>
            )}

            {activeChannel === "sms" && (
              <div className="p-5 flex-1 bg-[#0d0d0d] flex flex-col justify-center">
                <div className="bg-[#1f1f1f] border border-gray-800 rounded-2xl p-4 max-w-[85%] text-xs text-gray-200 leading-relaxed shadow-lg">
                  {activeStep.channelText.sms}
                  <div className="text-right text-[10px] text-gray-500 mt-2">Delivered • SMS Carrier</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
