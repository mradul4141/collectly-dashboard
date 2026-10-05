import { OngoingTable } from "@/components/ongoing-table";

export default function ClientsPage() {
  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Client Accounts</h2>
          <p className="text-sm font-medium text-slate-500">Active client roster and communication health score.</p>
        </div>
      </div>

      <OngoingTable />
    </div>
  );
}
