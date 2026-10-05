import { DreelioBoard } from "@/components/dreelio-board";
import Link from "next/link";

export default function BoardPage() {
  return (
    <div className="h-full flex flex-col max-w-[1400px] mx-auto">

      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Receivables Board (Section 6)</h2>
          <p className="text-sm font-medium text-slate-500">Four core states: Due Soon. Overdue. Promised, and Disputed + Settled accounts.</p>
        </div>
        <Link href="/" className="text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors">
          &lt;- Back to Home
        </Link>
      </div>

      <DreelioBoard />
    </div>
  );
}
