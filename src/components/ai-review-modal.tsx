"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Calendar, Flag, Trash2, Plus, AlertCircle, RefreshCw } from "lucide-react";
import { AIExtractionResult, Priority } from "@/lib/workspace-types";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#121214] border border-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-800/80 bg-gradient-to-r from-indigo-950/30 to-purple-950/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">AI Review & Approval</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  mode === "live_ai" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                }`}>
                  {mode === "live_ai" ? "Gemini Live" : "Smart Parser"}
                </span>
              </div>
              <p className="text-xs text-gray-400">Review, adjust, and approve AI-generated action items before saving.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-sm font-semibold p-2">✕</button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Objective & Project */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Identified Objective</label>
              <input
                type="text"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Assign to Project</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Action Items List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Extracted Tasks ({selectedCount} Selected)
              </span>
              <button
                onClick={addNewTask}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Task
              </button>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    task.selected
                      ? "bg-[#18181c] border-gray-700/80 shadow-sm"
                      : "bg-[#0d0d10] border-gray-900 opacity-60"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.selected}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 w-4 h-4 rounded border-gray-700 text-indigo-600 focus:ring-0 cursor-pointer"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) => updateTitle(task.id, e.target.value)}
                      className="w-full bg-transparent text-sm font-medium text-white focus:outline-none border-b border-transparent focus:border-indigo-500"
                    />

                    <div className="flex items-center gap-3 text-xs">
                      {/* Priority selector */}
                      <select
                        value={task.priority}
                        onChange={(e) => updatePriority(task.id, e.target.value as Priority)}
                        className="bg-[#0f0f13] border border-gray-800 rounded-lg px-2 py-1 text-gray-300 text-xs focus:outline-none"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                        <option value="urgent">Urgent</option>
                      </select>

                      {task.dueDate && (
                        <span className="flex items-center gap-1 text-gray-400">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => removeTask(task.id)}
                    className="text-gray-500 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-800 bg-[#0c0c0e] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleApprove}
            disabled={selectedCount === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            Approve & Create {selectedCount} Task{selectedCount === 1 ? "" : "s"}
          </button>
        </div>
      </div>
    </div>
  );
}
