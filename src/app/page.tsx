import { Banner } from "@/components/banner";
import { StatCards } from "@/components/stat-cards";
import { ChartAndActions } from "@/components/chart-actions";

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span className="text-[12px] font-medium text-slate-500">Live Receivables & Project Telemetry</span>
        </div>
        <div className="flex items-center gap-1 bg-white/50 rounded-full p-0.5 border border-slate-200">
          <button className="px-3 py-1 bg-white rounded-full text-[11px] font-bold text-slate-900 shadow-sm border border-slate-100">
            Dreelio Standard
          </button>
          <button className="px-3 py-1 rounded-full text-[11px] font-bold text-slate-500 hover:text-slate-900">
            Cash Chasing Mode
          </button>
        </div>
      </div>

      <StatCards />
      <ChartAndActions />
    </div>
  );
}
