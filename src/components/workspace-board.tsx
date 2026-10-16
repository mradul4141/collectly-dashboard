"use client";

import { useState } from "react";
import { 
  FolderKanban, 
  Plus, 
  Calendar, 
  Sparkles, 
  Search,
} from "lucide-react";
import { Project, Task, Priority, TaskStatus } from "@/lib/workspace-types";
import { PlanetIllustration } from "@/components/illustrations/retro-space";

export function WorkspaceBoard() {
  const [activeTab, setActiveTab] = useState<"projects" | "kanban">("projects");
  const [search, setSearch] = useState("");

  const [projects] = useState<Project[]>([
    {
      id: "proj-1",
      user_id: "demo",
      title: "Client Deliverables & Proposals",
      description: "Q4 client revamps, milestone delivery specs, and proposals.",
      status: "in_progress",
      color: "#0A0A0A",
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
      color: "#0A0A0A",
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
      color: "#0A0A0A",
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

  const columns: { id: TaskStatus; label: string }[] = [
    { id: "todo", label: "TO DO" },
    { id: "in_progress", label: "IN PROGRESS" },
    { id: "review", label: "REVIEW & STAGING" },
    { id: "done", label: "COMPLETED" }
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
    <div className="space-y-6">
      {/* Top Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFFFF] p-3 rounded-2xl border-2 border-[#0A0A0A] sticker-shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-xl font-label text-xs font-bold transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-[#0A0A0A] text-[#FFFFFF] sticker-shadow-lift"
                : "text-[#555555] hover:text-[#0A0A0A] hover:bg-[#F4F4F0]"
            }`}
          >
            PROJECTS OVERVIEW ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("kanban")}
            className={`px-4 py-2 rounded-xl font-label text-xs font-bold transition-all cursor-pointer ${
              activeTab === "kanban"
                ? "bg-[#0A0A0A] text-[#FFFFFF] sticker-shadow-lift"
                : "text-[#555555] hover:text-[#0A0A0A] hover:bg-[#F4F4F0]"
            }`}
          >
            KANBAN BOARD ({tasks.length} TASKS)
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#0A0A0A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH MISSIONS..."
            className="w-full bg-[#F4F4F0] border border-[#0A0A0A] rounded-xl pl-9 pr-3 py-1.5 font-mono text-[11px] text-[#0A0A0A] placeholder-[#888888] focus:outline-none"
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
                className="bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-[22px] p-5 flex flex-col justify-between shadow-[6px_6px_0px_#0A0A0A] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0A0A0A]" />
                    <span className="font-label text-[9px] bg-[#DEDEC8] border border-[#0A0A0A] text-[#0A0A0A] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {proj.status.replace("_", " ")}
                    </span>
                  </div>

                  <h3 className="font-display text-sm text-[#0A0A0A] mb-1.5 tracking-wider uppercase">{proj.title}</h3>
                  <p className="font-sans text-xs text-[#555555] leading-relaxed mb-4">{proj.description}</p>
                </div>

                <div className="pt-4 border-t-2 border-[#0A0A0A]/10 space-y-3">
                  <div className="flex items-center justify-between font-label text-xs">
                    <span className="text-[#555555] font-bold">COMPLETION:</span>
                    <span className="font-mono text-[#0A0A0A] font-bold">{pct}%</span>
                  </div>

                  {/* Retro Progress Bar with Engraved Border */}
                  <div className="w-full h-2.5 bg-[#DEDEC8] border border-[#0A0A0A] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#0A0A0A] rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] text-[#555555] pt-1">
                    <span>{proj.completed_count}/{proj.task_count} TASKS DONE</span>
                    {proj.due_date && (
                      <span className="flex items-center gap-1 text-[#0A0A0A] font-bold">
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
                className="bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-[22px] p-4 flex flex-col min-h-[500px] shadow-[4px_4px_0px_#0A0A0A]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-[#0A0A0A]">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs text-[#0A0A0A] tracking-wider">{col.label}</span>
                    <span className="font-mono text-[10px] bg-[#0A0A0A] text-[#FFFFFF] px-1.5 py-0.2 rounded font-bold">
                      {colTasks.length}
                    </span>
                  </div>
                </div>

                {/* Column Task Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-[#F4F4F0] border-2 border-[#0A0A0A] rounded-xl p-3.5 space-y-2.5 shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs text-[#0A0A0A] leading-snug">{task.title}</span>
                        <span className="font-label text-[9px] bg-[#0A0A0A] text-[#FFFFFF] px-1.5 py-0.5 rounded uppercase tracking-wider flex-shrink-0 font-bold">
                          {task.priority}
                        </span>
                      </div>

                      <div className="flex items-center justify-between font-label text-[10px] text-[#555555] pt-1 border-t border-[#0A0A0A]/20">
                        <span className="text-[#0A0A0A] font-bold">{task.project_name || "GENERAL"}</span>

                        {task.ai_generated && (
                          <span className="font-label text-[9px] bg-[#DEDEC8] border border-[#0A0A0A] text-[#0A0A0A] px-1 py-0.2 rounded font-bold flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> AI
                          </span>
                        )}
                      </div>

                      {/* Quick Move Buttons */}
                      <div className="pt-1 flex items-center justify-between font-label text-[10px] text-[#555555]">
                        <span>SHIFT:</span>
                        <div className="flex gap-1">
                          {columns.filter(c => c.id !== col.id).map(targetCol => (
                            <button
                              key={targetCol.id}
                              onClick={() => moveTask(task.id, targetCol.id)}
                              className="px-1.5 py-0.5 bg-[#FFFFFF] hover:bg-[#0A0A0A] hover:text-[#FFFFFF] text-[#0A0A0A] font-bold rounded border border-[#0A0A0A] transition-colors cursor-pointer"
                              title={`Move to ${targetCol.label}`}
                            >
                              {targetCol.label.slice(0, 3)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="text-center py-10 font-mono text-[#888888] text-xs border-2 border-dashed border-[#0A0A0A]/20 rounded-xl">
                      // STAGE CLEAR
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
