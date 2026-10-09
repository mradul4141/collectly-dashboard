import { Lightbulb } from "lucide-react";

export function Banner() {
  return (
    <div className="glass rounded-[24px] p-6 flex items-center justify-between mb-8">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="font-bold text-[14px] text-slate-900 tracking-wider">HOW COLLECTLY KEEPS CASH FLOW FLOWING</h2>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Live System</span>
          </div>
          <p className="text-[12px] font-medium text-slate-500">
            Track projects, bill hours, and let polite automated WhatsApp/Email reminders recover overdue invoices with direct Stripe & Razorpay links.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white/50">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span className="text-[12px] font-bold text-slate-700">Auto-Stop: Active</span>
        </div>
        <button className="bg-slate-900 text-white font-bold text-[12px] px-5 py-2 rounded-full hover:bg-slate-800 transition-colors shadow-sm">
          Inspect Cadence
        </button>
      </div>
    </div>
  );
}
