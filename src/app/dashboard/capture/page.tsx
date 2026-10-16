"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, FileText, ListTodo, FolderKanban, Lightbulb, Clock, Radio } from "lucide-react";
import { AIReviewModal } from "@/components/ai-review-modal";
import { AIExtractionResult, Task } from "@/lib/workspace-types";
import { AstronautIllustration, UfoIllustration, StarryBlob } from "@/components/illustrations/retro-space";

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
    setSuccessBanner(`TRANSMISSION PROCESSED: ${newTasks.length} APPROVED TASK(S) ADDED TO WORKSPACE.`);
    setTimeout(() => setSuccessBanner(null), 5000);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Header with floating illustrations */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#0A0A0A] pb-5 relative">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label text-[10px] bg-[#0A0A0A] text-[#FFFFFF] px-2 py-0.5 rounded font-bold tracking-widest">
              COLLECTLY AI RECEIVER // FREQ 1420 MHZ
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl text-[#0A0A0A] tracking-wider uppercase mt-1">
            INBOX & TRANSMISSION CAPTURE
          </h1>
          <p className="font-label text-xs text-[#555555] tracking-wider mt-1">
            PASTE RAW TRANSMISSIONS, MEMOS, OR BRIEFS FOR AI STRUCTURAL DECODING
          </p>
        </div>

        <div className="hidden sm:block">
          <UfoIllustration className="w-20 h-16" />
        </div>
      </div>

      {successBanner && (
        <div className="p-4 bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-2xl flex items-center gap-3 text-[#0A0A0A] font-mono text-xs font-bold sticker-shadow">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Main Capture Box */}
      <div className="bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-[24px] p-6 shadow-[6px_6px_0px_#0A0A0A] relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 border-b-2 border-[#0A0A0A]/10 pb-3">
          <label className="font-label text-xs font-bold text-[#0A0A0A] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0A0A0A]" />
            RAW TRANSMISSION INPUT (UNSTRUCTURED TEXT)
          </label>
          <span className="font-mono text-[10px] text-[#555555]">ENCRYPTED LOCAL PARSER</span>
        </div>

        <textarea
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="e.g. Prepare revised proposal for client Acme by Friday. Update pricing and send confirmation message..."
          className="w-full bg-[#F4F4F0] border-2 border-[#0A0A0A] rounded-xl p-4 font-mono text-xs text-[#0A0A0A] placeholder-[#888888] focus:outline-none focus:shadow-[4px_4px_0px_#0A0A0A] transition-all resize-y"
        />

        {/* Quick Example Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="font-label text-[10px] font-bold text-[#555555] flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-[#0A0A0A]" /> SAMPLE TRANSMISSIONS:
          </span>
          <button
            onClick={() => setInputText("Revise client proposal by Friday, schedule review call with Sarah, and email invoice summary.")}
            className="font-label text-[10px] bg-[#DEDEC8] hover:bg-[#FFFFFF] border border-[#0A0A0A] text-[#0A0A0A] px-2.5 py-1 rounded-lg transition-colors font-bold cursor-pointer"
          >
            CLIENT PROPOSAL & INVOICE
          </button>
          <button
            onClick={() => setInputText("Write outline for YouTube video by Wednesday, record intro on Thursday, and publish by Sunday.")}
            className="font-label text-[10px] bg-[#DEDEC8] hover:bg-[#FFFFFF] border border-[#0A0A0A] text-[#0A0A0A] px-2.5 py-1 rounded-lg transition-colors font-bold cursor-pointer"
          >
            CONTENT CREATOR SCHEDULE
          </button>
          <button
            onClick={() => setInputText("Finish Chapter 4 study notes, submit calculus assignment by tomorrow 5 PM, review flashcards.")}
            className="font-label text-[10px] bg-[#DEDEC8] hover:bg-[#FFFFFF] border border-[#0A0A0A] text-[#0A0A0A] px-2.5 py-1 rounded-lg transition-colors font-bold cursor-pointer"
          >
            STUDENT STUDY PLAN
          </button>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleProcess}
            disabled={isLoading || !inputText.trim()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A0A0A] text-[#FFFFFF] font-label text-xs font-bold sticker-shadow-lift cursor-pointer disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#FFFFFF]/30 border-t-[#FFFFFF] rounded-full animate-spin" />
                <span>DECODING TRANSMISSION...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>EXTRACT ACTION ITEMS</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feed of Processed Tasks */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3">
          <h2 className="font-display text-sm text-[#0A0A0A] tracking-wider uppercase flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-[#0A0A0A]" />
            RECENTLY LOGGED MISSION ITEMS ({recentTasks.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-2xl p-4 flex flex-col justify-between gap-3 sticker-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-bold text-xs text-[#0A0A0A] leading-snug">{task.title}</span>
                <span className="font-label text-[9px] bg-[#0A0A0A] text-[#FFFFFF] px-2 py-0.5 rounded font-bold uppercase tracking-wider flex-shrink-0">
                  {task.priority}
                </span>
              </div>

              <div className="flex items-center justify-between font-label text-[10px] text-[#555555] pt-2 border-t border-[#0A0A0A]/10">
                <span className="flex items-center gap-1.5 text-[#0A0A0A] font-bold">
                  <FolderKanban className="w-3.5 h-3.5 text-[#0A0A0A]" />
                  {task.project_name || "GENERAL"}
                </span>

                <div className="flex items-center gap-3">
                  {task.due_date && (
                    <span className="flex items-center gap-1 font-mono text-[#555555]">
                      <Clock className="w-3.5 h-3.5" />
                      {task.due_date}
                    </span>
                  )}
                  {task.ai_generated && (
                    <span className="font-label text-[9px] bg-[#DEDEC8] border border-[#0A0A0A] text-[#0A0A0A] px-1.5 py-0.2 rounded font-bold">
                      AI DECODED
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
