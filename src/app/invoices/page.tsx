import { OngoingTable } from "@/components/ongoing-table";

export default function InvoicesPage() {
  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">All Client Invoices</h2>
          <p className="text-sm font-medium text-slate-500">Integrated with Stripe & Razorpay direct payment links.</p>
        </div>
        <button className="bg-slate-900 text-white font-bold text-[13px] px-5 py-2 rounded-full hover:bg-slate-800 transition-colors shadow-sm">
          + New Invoice / CSV
        </button>
      </div>

      <OngoingTable />
    </div>
  );
}
