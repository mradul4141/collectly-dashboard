import { CadenceView } from "@/components/cadence-view";
import Link from "next/link";

export default function CadencePage() {
  return (
    <div className="h-full flex flex-col max-w-[1200px] mx-auto">

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-1">5-Step Polite Reminder Cadence</h2>
          <p className="text-sm font-medium text-gray-400">Multi-channel ladder for WhatsApp Business API, Email, and SMS.</p>
        </div>
        <Link href="/dashboard" className="text-[13px] font-bold text-gray-400 hover:text-white transition-colors">
          &lt;- Back to Dashboard
        </Link>
      </div>

      <CadenceView />
    </div>
  );
}
