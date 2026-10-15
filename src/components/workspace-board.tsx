"use client";

import { useState } from "react";
import { 
  FolderKanban, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar, 
  Sparkles, 
  MoreHorizontal, 
  Search,
  Filter
} from "lucide-react";
import { Project, Task, Priority, TaskStatus } from "@/lib/workspace-types";

export function WorkspaceBoard() {
  const [activeTab, setActiveTab] = useState<"projects" | "kanban">("projects");
  const [search, setSearch] = useState("");

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj-1",
      user_id: "demo",
      title: "Client Deliverables & Proposals",
      description: "Q4 client revamps, milestone delivery specs, and proposals.",
      status: "in_progress",
      color: "#6366f1",
      due_date: "2026-10-31",
      task_count: 5,
      completed_count: 3,
      created_at: new Date().toISOString()
    },
    {
      id: "proj-2",
      user_id: "demo",
      title: "Product Launch & Marketing",
      description: "Landing page video, YouTube walkthroughs, and distribution.",
      status: "in_progress",
      color: "#f59e0b",
      due_date: "2026-11-15",
      task_count: 6,
      completed_count: 2,
      created_at: new Date().toISOString()
    },
    {
      id: "proj-3",
      user_id: "demo",
      title: "Operations & Compliance",
      description: "Tax audit, MSME Section 43B compliance, and accounting review.",
      status: "completed",
      color: "#10b981",
      due_date: "2026-10-20",
      task_count: 4,
      completed_count: 4,
      created_at: new Date().toISOString()
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-101",
      user_id: "demo",
      project_id: "proj-1",
      project_name: "Client Deliverables",
      title: "Update client pricing sheet & proposal terms",
      status: "todo",
      priority: "high",
      due_date: "This Friday",
      is_completed: false,
      ai_generated: true,
      created_at: new Date().toISOString()
    },
    {
      id: "task-102",
      user_id: "demo",
      project_id: "proj-2",
      project_name: "Product Launch",
      title: "Record video walkthrough for marketing campaign",
      status: "in_progress",
      priority: "medium",
      due_date: "Next Monday",
      is_completed: false,
      ai_generated: false,
      created_at: new Date().toISOString()
    },
    {
      id: "task-103",
      user_id: "demo",
      project_id: "proj-1",
      project_name: "Client Deliverables",
      title: "Legal & milestone signoff from client lead",
      status: "review",
      priority: "urgent",
      due_date: "Tomorrow",
      is_completed: false,
      ai_generated: true,
      created_at: new Date().toISOString()
    },
    {
      id: "task-104",
      user_id: "demo",
      project_id: "proj-3",
      project_name: "Operations",
      title: "Audit MSME Section 43B compliance ledger",
      status: "done",
      priority: "low",
      due_date: "Completed",
      is_completed: true,
      ai_generated: false,
      created_at: new Date().toISOString()
    }
  ]);

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: "todo", label: "To Do", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { id: "in_progress", label: "In Progress", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    { id: "review", label: "Review & Approval", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    { id: "done", label: "Completed", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" }
  ];

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { 
      ...t, 
      status: newStatus,
      is_completed: newStatus === "done"
    } : t));
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    (t.project_name && t.project_name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111114] p-3 rounded-2xl border border-gray-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "projects"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-gray-400 hover:text-white hover:bg-gray-900"
            }`}
          >
            Projects Overview ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("kanban")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "kanban"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-gray-400 hover:text-white hover:bg-gray-900"
            }`}
          >
            Kanban Board ({tasks.length} Tasks)
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects or tasks..."
            className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* 1. Projects View */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((proj) => {
            const pct = Math.round(((proj.completed_count || 0) / (proj.task_count || 1)) * 100);
            return (
              <div
                key={proj.id}
                className="bg-[#111114] border border-gray-800 hover:border-gray-700/80 rounded-2xl p-5 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: proj.color || "#6366f1" }} 
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-900 px-2 py-0.5 rounded-full border border-gray-800">
                      {proj.status.replace("_", " ")}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5 tracking-tight">{proj.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{proj.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-medium">Progress</span>
                    <span className="text-gray-200 font-bold">{pct}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                    <span>{proj.completed_count}/{proj.task_count} Tasks Done</span>
                    {proj.due_date && (
                      <span className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {proj.due_date}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Kanban Board View */}
      {activeTab === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter(t => t.status === col.id);
            return (
              <div
                key={col.id}
                className="bg-[#0f0f13] border border-gray-800/80 rounded-2xl p-4 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800/60">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white tracking-tight">{col.label}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${col.color}`}>
                      {colTasks.length}
                    </span>
                  </div>
                </div>

                {/* Column Task Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-[#16161b] border border-gray-800 hover:border-gray-700/80 rounded-xl p-3.5 space-y-2.5 transition-all shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-gray-200 leading-snug">{task.title}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider flex-shrink-0 ${
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

                      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-800/50">
                        <span className="text-gray-400 font-medium">{task.project_name || "General"}</span>

                        {task.ai_generated && (
                          <span className="text-[9px] text-indigo-400 bg-indigo-500/10 px-1 py-0.5 rounded border border-indigo-500/20 font-bold flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> AI
                          </span>
                        )}
                      </div>

                      {/* Quick Move Dropdown */}
                      <div className="pt-1 flex items-center justify-between text-[10px] text-gray-500">
                        <span>Move:</span>
                        <div className="flex gap-1">
                          {columns.filter(c => c.id !== col.id).map(targetCol => (
                            <button
                              key={targetCol.id}
                              onClick={() => moveTask(task.id, targetCol.id)}
                              className="px-1.5 py-0.5 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded border border-gray-800 transition-colors"
                              title={`Move to ${targetCol.label}`}
                            >
                              {targetCol.label.slice(0, 4)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="text-center py-10 text-gray-600 text-xs border border-dashed border-gray-800/60 rounded-xl">
                      Empty
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
