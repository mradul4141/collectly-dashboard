import { CollectlyBoard } from "@/components/collectly-board";

export default function BalanceCashPage() {
  return (
    <div className="h-full flex flex-col max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-1">Balance & Cash Flow</h2>
          <p className="text-sm font-medium text-gray-400">Live view of total liquid balance and pending gateways across all trades.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-[20px] px-4 py-2 shadow-sm text-right">
            <div className="text-[10px] font-bold text-gray-500 tracking-wider">TOTAL LIQUID BALANCE</div>
            <div className="text-xl font-extrabold text-white">$142,500.00</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-[20px] px-4 py-2 shadow-sm text-right">
            <div className="text-[10px] font-bold text-emerald-600 tracking-wider">PENDING IN GATEWAYS</div>
            <div className="text-xl font-extrabold text-emerald-700">$24,100.00</div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mb-6">
        {["All Trades", "Agencies", "Coaching/Tutors", "Contractors", "Suppliers"].map(tab => (
          <button key={tab} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${tab === "All Trades" ? "bg-white text-black shadow-sm" : "bg-[#0a0a0a] border border-[#222] text-gray-300 hover:bg-[#111]"}`}>
            {tab}
          </button>
        ))}
      </div>

      <CollectlyBoard />
    </div>
  );
}
