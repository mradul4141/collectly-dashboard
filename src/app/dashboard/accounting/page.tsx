import { ShieldCheck, FileText, AlertTriangle } from "lucide-react";

export default function AccountingPage() {
  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-1">Accounting & Section 43B Compliance</h2>
          <p className="text-sm font-medium text-gray-400">Monitor MSME compliance limits and general ledger exports.</p>
        </div>
        <button className="bg-white text-black font-bold text-[13px] px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
          Export Ledger (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0a0a0a] p-6 rounded-[24px] border border-[#222] shadow-sm">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-400 mb-1">Compliance Shield Status</h3>
          <div className="text-2xl font-extrabold text-white">Protected</div>
          <p className="text-[12px] font-medium text-emerald-600 mt-2">No MSME defaults detected.</p>
        </div>

        <div className="bg-[#0a0a0a] p-6 rounded-[24px] border border-[#222] shadow-sm">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-400 mb-1">Approaching 45-Day Limit</h3>
          <div className="text-2xl font-extrabold text-white">3 Invoices</div>
          <p className="text-[12px] font-medium text-amber-600 mt-2">Action required to maintain tax deduction.</p>
        </div>

        <div className="bg-[#0a0a0a] p-6 rounded-[24px] border border-[#222] shadow-sm">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-400 mb-1">Tax Disallowed Amount</h3>
          <div className="text-2xl font-extrabold text-white">$0.00</div>
          <p className="text-[12px] font-medium text-gray-500 mt-2">For current financial year.</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#222] rounded-[24px] p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[#111] rounded-full border border-[#1a1a1a] flex items-center justify-center mb-4">
          <FileText className="w-6 h-6 text-gray-500" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Accounting Integrations</h3>
        <p className="text-sm font-medium text-gray-400 max-w-md mb-6">Connect QuickBooks, Xero, or Tally to automatically push settled invoices to your ledger.</p>
        <button className="px-6 py-2.5 bg-[#0a0a0a] border border-[#222] text-gray-300 font-bold text-sm rounded-lg hover:bg-[#111] transition-colors shadow-sm">
          Browse Integrations
        </button>
      </div>
    </div>
  );
}
