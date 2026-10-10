"use client";

import { useState } from "react";
import { Sparkles, Send, FileText, CheckCircle2, ListTodo, FolderKanban, Lightbulb, Clock, ArrowRight } from "lucide-react";
import { AIReviewModal } from "@/components/ai-review-modal";
import { AIExtractionResult, Task } from "@/lib/workspace-types";

export default function CaptureInboxPage() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState<{ result: AIExtractionResult; mode: "live_ai" | "demo_local" } | null>(null);
  const [recentTasks, setRecentTasks] = useState<Task[]>([
    {
      id: "task-demo-1",
      user_id: "demo",
      title: "Review Q4 proposal and adjust milestone deliverables",
      project_name: "Client Deliverables",
      priority: "high",
      status: "todo",
      due_date: "This Friday",
      is_completed: false,
      ai_generated: true,
      created_at: new Date().toISOString()
    },
    {
      id: "task-demo-2",
      user_id: "demo",
      title: "Schedule onboarding sync with design team",
      project_name: "Internal Ops",
      priority: "medium",
      status: "in_progress",
      due_date: "Next Monday",
      is_completed: false,
      ai_generated: false,
      created_at: new Date().toISOString()
    }
  ]);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputText })
      });

      const data = await res.json();
      if (data.success && data.result) {
        setReviewData({ result: data.result, mode: data.mode });
      }
    } catch (err) {
      console.error("Extraction error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveTasks = (approvedTasks: any[], projectName?: string) => {
    const newTasks: Task[] = approvedTasks.map((t) => ({
      id: t.id,
      user_id: "current_user",
      title: t.title,
      project_name: projectName || "General",
      priority: t.priority || "medium",
      status: "todo",
      due_date: t.dueDate || "Pending",
      is_completed: false,
      ai_generated: true,
      created_at: new Date().toISOString()
    }));

    setRecentTasks([...newTasks, ...recentTasks]);
    setReviewData(null);
    setInputText("");
    setSuccessBanner(`Successfully added ${newTasks.length} approved task(s) to your workspace!`);
    setTimeout(() => setSuccessBanner(null), 5000);
  };

  const handleTemplateExample = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 animate-fade-in p-2">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
              Collectly 2.0 Engine
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Inbox & AI Capture</h1>
          <p className="text-sm text-gray-400 mt-1">
            Dump scattered thoughts, emails, meeting transcripts, or voice notes. Let AI structure them into tasks with human review.
          </p>
        </div>
      </div>

      {successBanner && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Main Capture Box */}
      <div className="bg-[#111114] border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            Quick Capture Text or Notes
          </label>
          <span className="text-xs text-gray-500">Supports multi-line text, meeting bullets & emails</span>
        </div>

        <textarea
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="e.g. Prepare the revised proposal for my client by Friday. Update the pricing and send a confirmation message..."
          className="w-full bg-[#0a0a0c] border border-gray-800/80 rounded-xl p-4 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500/80 transition-all resize-y"
        />

        {/* Quick Idea Templates */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Try an example:
          </span>
          <button
            onClick={() => handleTemplateExample("Revise client proposal by Friday, schedule review call with Sarah, and email invoice summary.")}
            className="text-xs bg-gray-900 hover:bg-gray-800 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-800 transition-colors"
          >
            Client Proposal & Invoice
          </button>
          <button
            onClick={() => handleTemplateExample("Write outline for YouTube video by Wednesday, record intro on Thursday, and publish by Sunday.")}
            className="text-xs bg-gray-900 hover:bg-gray-800 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-800 transition-colors"
          >
            Content Creator Schedule
          </button>
          <button
            onClick={() => handleTemplateExample("Finish Chapter 4 study notes, submit calculus assignment by tomorrow 5 PM, review flashcards.")}
            className="text-xs bg-gray-900 hover:bg-gray-800 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-800 transition-colors"
          >
            Student Study Plan
          </button>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleProcess}
            disabled={isLoading || !inputText.trim()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Extract Action Items
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feed of Processed Tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-indigo-400" />
            Recently Captured & Approved Tasks ({recentTasks.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="bg-[#111114] border border-gray-800 hover:border-gray-700/80 rounded-xl p-4 transition-all flex flex-col justify-between gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold text-gray-200">{task.title}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    task.priority === "urgent"
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      : task.priority === "high"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-800/60">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FolderKanban className="w-3.5 h-3.5 text-indigo-400" />
                  {task.project_name || "General"}
                </span>

                <div className="flex items-center gap-3">
                  {task.due_date && (
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      {task.due_date}
                    </span>
                  )}
                  {task.ai_generated && (
                    <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 font-bold">
                      AI
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {reviewData && (
        <AIReviewModal
          initialResult={reviewData.result}
          mode={reviewData.mode}
          onClose={() => setReviewData(null)}
          onApprove={handleApproveTasks}
        />
      )}
    </div>
  );
}
