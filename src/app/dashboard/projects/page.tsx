import { CollectlyBoard } from "@/components/collectly-board";
import Link from "next/link";

export default function BoardPage() {
  return (
    <div className="h-full flex flex-col max-w-[1400px] mx-auto">

      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-1">Receivables Board (Section 6)</h2>
          <p className="text-sm font-medium text-gray-400">Four core states: Due Soon. Overdue. Promised, and Disputed + Settled accounts.</p>
        </div>
        <Link href="/dashboard" className="text-[13px] font-bold text-gray-400 hover:text-white transition-colors">
          &lt;- Back to Dashboard
        </Link>
      </div>

      <CollectlyBoard />
    </div>
  );
}
