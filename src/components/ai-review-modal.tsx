"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Calendar, Trash2, Plus } from "lucide-react";
import { AIExtractionResult, Priority } from "@/lib/workspace-types";
import { UfoIllustration } from "@/components/illustrations/retro-space";

interface AIReviewModalProps {
  initialResult: AIExtractionResult;
  mode: "live_ai" | "demo_local";
  onClose: () => void;
  onApprove: (approvedTasks: any[], projectName?: string) => void;
}

export function AIReviewModal({ initialResult, mode, onClose, onApprove }: AIReviewModalProps) {
  const [tasks, setTasks] = useState(initialResult.suggestedTasks);
  const [projectName, setProjectName] = useState(initialResult.detectedProject || "General");
  const [objective, setObjective] = useState(initialResult.objective);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, selected: !t.selected } : t));
  };

  const updateTitle = (id: string, newTitle: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, title: newTitle } : t));
  };

  const updatePriority = (id: string, priority: Priority) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, priority } : t));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addNewTask = () => {
    setTasks([
      ...tasks,
      {
        id: `task-manual-${Date.now()}`,
        title: "New Action Item",
        priority: "medium",
        selected: true
      }
    ]);
  };

  const selectedCount = tasks.filter(t => t.selected).length;

  const handleApprove = () => {
    const approved = tasks.filter(t => t.selected);
    onApprove(approved, projectName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/70 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] border-3 border-[#0A0A0A] rounded-[24px] w-full max-w-2xl overflow-hidden shadow-[10px_10px_0px_#0A0A0A] flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b-2 border-[#0A0A0A] bg-[#DEDEC8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0A0A0A] flex items-center justify-center text-[#FFFFFF] sticker-shadow-sm flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base text-[#0A0A0A] tracking-wider uppercase">
                  TRANSMISSION ANALYSIS
                </h3>
                <span className="font-label text-[9px] bg-[#0A0A0A] text-[#FFFFFF] px-2 py-0.5 rounded font-bold">
                  {mode === "live_ai" ? "GEMINI LIVE" : "SMART PARSER"}
                </span>
              </div>
              <p className="font-label text-[11px] text-[#555555] tracking-wider">
                CONFIRM EXTRACTED FLIGHT ITEMS BEFORE COMMIT
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] bg-[#FFFFFF] text-[#0A0A0A] font-bold text-sm flex items-center justify-center sticker-shadow-sm hover:bg-[#F0F0EE] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#F4F4F0]">
          {/* Objective & Project */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-label text-[10px] text-[#555555] block mb-1.5 font-bold">
                // DETECTED OBJECTIVE
              </label>
              <input
                type="text"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-xl px-3 py-2 text-xs font-mono text-[#0A0A0A] sticker-shadow-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="font-label text-[10px] text-[#555555] block mb-1.5 font-bold">
                // TARGET PROJECT
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-xl px-3 py-2 text-xs font-mono text-[#0A0A0A] sticker-shadow-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Action Items List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-label text-[11px] text-[#0A0A0A] font-bold tracking-wider">
                EXTRACTED TASKS ({selectedCount} SELECTED)
              </span>
              <button
                onClick={addNewTask}
                className="font-label text-xs font-bold text-[#0A0A0A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> + ADD TASK
              </button>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-xl border-2 border-[#0A0A0A] transition-all flex items-start gap-3 ${
                    task.selected
                      ? "bg-[#FFFFFF] sticker-shadow-sm"
                      : "bg-[#DEDEC8] opacity-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.selected}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 w-4 h-4 accent-[#0A0A0A] cursor-pointer"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) => updateTitle(task.id, e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#0A0A0A] focus:outline-none border-b border-dashed border-[#0A0A0A]"
                    />

                    <div className="flex items-center gap-3 text-xs">
                      <select
                        value={task.priority}
                        onChange={(e) => updatePriority(task.id, e.target.value as Priority)}
                        className="bg-[#DEDEC8] border border-[#0A0A0A] rounded-md px-2 py-0.5 font-label text-[10px] text-[#0A0A0A] font-bold focus:outline-none"
                      >
                        <option value="low">LOW PRIORITY</option>
                        <option value="medium">MEDIUM PRIORITY</option>
                        <option value="high">HIGH PRIORITY</option>
                        <option value="urgent">URGENT</option>
                      </select>

                      {task.dueDate && (
                        <span className="flex items-center gap-1 font-mono text-[10px] text-[#555555]">
                          <Calendar className="w-3 h-3 text-[#0A0A0A]" />
                          {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => removeTask(task.id)}
                    className="text-[#555555] hover:text-[#0A0A0A] p-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t-2 border-[#0A0A0A] bg-[#DEDEC8] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 font-label text-xs font-bold text-[#555555] hover:text-[#0A0A0A] transition-colors cursor-pointer"
          >
            DISCARD
          </button>

          <button
            onClick={handleApprove}
            disabled={selectedCount === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A0A0A] text-[#FFFFFF] font-label text-xs font-bold sticker-shadow-lift cursor-pointer disabled:opacity-40"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>APPROVE & COMMIT ({selectedCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
