import { CadenceView } from "@/components/cadence-view";
import Link from "next/link";

export default function CadencePage() {
  return (
    <div className="h-full flex flex-col max-w-[1200px] mx-auto">

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">5-Step Polite Reminder Cadence</h2>
          <p className="text-sm font-medium text-slate-500">Multi-channel ladder for WhatsApp Business API, Email, and SMS.</p>
        </div>
        <Link href="/" className="text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors">
          &lt;- Back to Home
        </Link>
      </div>

      <CadenceView />
    </div>
  );
}
