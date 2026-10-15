import { WorkspaceBoard } from "@/components/workspace-board";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function ProjectsBoardPage() {
  return (
    <div className="h-full flex flex-col max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
              Workspace Execution
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white">Projects & Kanban Board</h1>
          <p className="text-sm text-gray-400 mt-1">
            Track multi-stage workflows from initial To-Do to Review and Completion.
          </p>
        </div>

        <Link
          href="/dashboard/capture"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Capture New Project Task
        </Link>
      </div>

      <WorkspaceBoard />
    </div>
  );
}
