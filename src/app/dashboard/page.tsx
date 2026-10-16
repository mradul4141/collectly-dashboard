import { StatCards } from "@/components/stat-cards";
import { ChartAndActions } from "@/components/chart-actions";
import { StarryBlob } from "@/components/illustrations/retro-space";

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto space-y-4">
      {/* Top telemetry sub-bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#0A0A0A]/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0A0A0A] border border-white"></div>
          <span className="font-label text-xs tracking-wider uppercase font-bold text-[#0A0A0A]">
            ORBITAL SECTOR A-4 // TELEMETRY & FLIGHT LOG
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#DEDEC8] rounded-full p-1 border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
            <button className="px-3 py-1 bg-[#0A0A0A] rounded-full font-label text-[10px] uppercase tracking-wider font-bold text-white shadow-sm transition-colors">
              STANDARD FLIGHT
            </button>
            <button className="px-3 py-1 rounded-full font-label text-[10px] uppercase tracking-wider font-bold text-[#0A0A0A] hover:bg-black/5 transition-colors">
              AR RECON MODE
            </button>
          </div>
        </div>
      </div>

      <StatCards />
      <ChartAndActions />
    </div>
  );
}
