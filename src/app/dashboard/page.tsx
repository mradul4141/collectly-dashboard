import { Banner } from "@/components/banner";
import { StatCards } from "@/components/stat-cards";
import { ChartAndActions } from "@/components/chart-actions";

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
          <span className="text-[12px] font-medium text-gray-500">Live Receivables & Project Telemetry</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            Make it visible
          </button>
          <div className="flex items-center gap-1 bg-[#111] rounded-full p-0.5 border border-[#222] shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
            <button className="px-3 py-1 bg-white rounded-full text-[11px] font-bold text-black shadow-sm border border-transparent transition-colors">
              Collectly Standard
            </button>
            <button className="px-3 py-1 rounded-full text-[11px] font-bold text-gray-500 hover:text-white transition-colors">
              Cash Chasing Mode
            </button>
          </div>
        </div>
      </div>

      <StatCards />
      <ChartAndActions />
    </div>
  );
}
