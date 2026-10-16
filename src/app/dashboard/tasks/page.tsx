"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Plus, Search, Calendar, FolderKanban, Sparkles, Filter } from "lucide-react";
import { Task, Priority } from "@/lib/workspace-types";
import { PlanetIllustration } from "@/components/illustrations/retro-space";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      user_id: "demo",
      title: "Update client pricing sheet and send revised proposal",
      project_name: "Client Deliverables",
      priority: "high",
      status: "todo",
      due_date: "This Friday",
      is_completed: false,
      ai_generated: true,
      created_at: new Date().toISOString()
    },
    {
      id: "task-2",
      user_id: "demo",
      title: "Confirm milestone payment deposit with accountant",
      project_name: "Finance & Invoices",
      priority: "urgent",
      status: "todo",
      due_date: "Tomorrow",
      is_completed: false,
      ai_generated: true,
      created_at: new Date().toISOString()
    },
    {
      id: "task-3",
      user_id: "demo",
      title: "Record video walkthrough for marketing campaign",
      project_name: "Content Creation",
      priority: "medium",
      status: "in_progress",
      due_date: "Next Monday",
      is_completed: false,
      ai_generated: false,
      created_at: new Date().toISOString()
    },
    {
      id: "task-4",
      user_id: "demo",
      title: "Audit MSME Section 43B compliance ledger",
      project_name: "Finance & Invoices",
      priority: "low",
      status: "done",
      due_date: "Completed",
      is_completed: true,
      ai_generated: false,
      created_at: new Date().toISOString()
    }
  ]);

  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [newTitle, setNewTitle] = useState("");

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, is_completed: !t.is_completed } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      user_id: "demo",
      title: newTitle.trim(),
      project_name: "General Workspace",
      priority: "medium",
      status: "todo",
      due_date: "Today",
      is_completed: false,
      created_at: new Date().toISOString()
    };

    setTasks([newTask, ...tasks]);
    setNewTitle("");
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
      (t.project_name && t.project_name.toLowerCase().includes(search.toLowerCase()));
    const matchesPriority = filterPriority === "all" || t.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const pendingCount = tasks.filter(t => !t.is_completed).length;
  const completedCount = tasks.filter(t => t.is_completed).length;

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#0A0A0A] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label text-[10px] bg-[#0A0A0A] text-[#FFFFFF] px-2 py-0.5 rounded font-bold tracking-widest">
              MISSION CHECKLIST
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl text-[#0A0A0A] tracking-wider uppercase mt-1">
            MY TASKS & RUNTIME QUEUE
          </h1>
          <p className="font-label text-xs text-[#555555] tracking-wider mt-1">
            MANAGE, EXECUTE, AND CHECK OFF ORBITAL DELIVERABLES
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-label text-xs bg-[#FFFFFF] border-2 border-[#0A0A0A] text-[#0A0A0A] px-3 py-1.5 rounded-xl font-bold sticker-shadow-sm">
            {pendingCount} PENDING
          </span>
          <span className="font-label text-xs bg-[#0A0A0A] text-[#FFFFFF] px-3 py-1.5 rounded-xl font-bold sticker-shadow-sm">
            {completedCount} FINISHED
          </span>
        </div>
      </div>

      {/* Quick Add Bar */}
      <form onSubmit={addTask} className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="+ LOG NEW TASK AND PRESS ENTER..."
          className="flex-1 bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-xl px-4 py-3 font-mono text-xs text-[#0A0A0A] placeholder-[#888888] focus:outline-none sticker-shadow-sm focus:shadow-[4px_4px_0px_#0A0A0A]"
        />
        <button
          type="submit"
          className="bg-[#0A0A0A] text-[#FFFFFF] font-label font-bold px-5 py-3 rounded-xl text-xs sticker-shadow-lift flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> <span>CREATE</span>
        </button>
      </form>

      {/* Controls / Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FFFFFF] p-3 rounded-2xl border-2 border-[#0A0A0A] sticker-shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#0A0A0A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="FILTER TASKS / PROJECTS..."
            className="w-full bg-[#F4F4F0] border border-[#0A0A0A] rounded-lg pl-9 pr-3 py-1.5 font-mono text-[11px] text-[#0A0A0A] placeholder-[#888888] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-[#0A0A0A]" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#F4F4F0] border border-[#0A0A0A] rounded-lg px-2.5 py-1.5 font-label text-[10px] font-bold text-[#0A0A0A] focus:outline-none"
          >
            <option value="all">ALL PRIORITIES</option>
            <option value="urgent">URGENT</option>
            <option value="high">HIGH</option>
            <option value="medium">MEDIUM</option>
            <option value="low">LOW</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-2.5">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-4 rounded-2xl border-2 border-[#0A0A0A] transition-all flex items-center justify-between gap-4 cursor-pointer ${
              task.is_completed
                ? "bg-[#DEDEC8]/60 opacity-60"
                : "bg-[#FFFFFF] sticker-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5"
            }`}
          >
            <div className="flex items-center gap-3.5 flex-1">
              <button
                type="button"
                className="text-[#0A0A0A] transition-colors cursor-pointer"
              >
                {task.is_completed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#0A0A0A]" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>

              <div className="space-y-0.5">
                <span
                  className={`text-xs font-bold ${
                    task.is_completed ? "line-through text-[#666666]" : "text-[#0A0A0A]"
                  }`}
                >
                  {task.title}
                </span>

                <div className="flex items-center gap-2 font-label text-[10px] text-[#666666]">
                  <span className="flex items-center gap-1 text-[#0A0A0A] font-bold">
                    <FolderKanban className="w-3 h-3 text-[#0A0A0A]" />
                    {task.project_name || "GENERAL"}
                  </span>
                  {task.due_date && (
                    <span className="flex items-center gap-1 font-mono text-[#666666]">
                      • <Calendar className="w-3 h-3" /> {task.due_date}
                    </span>
                  )}
                  {task.ai_generated && (
                    <span className="font-label text-[9px] bg-[#DEDEC8] border border-[#0A0A0A] text-[#0A0A0A] px-1.5 py-0.2 rounded font-bold flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> AI
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <span className="font-label text-[9px] bg-[#0A0A0A] text-[#FFFFFF] px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                {task.priority}
              </span>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 bg-[#FFFFFF] border-2 border-[#0A0A0A] rounded-2xl font-mono text-xs text-[#555555] sticker-shadow-sm">
            NO LOGGED ITEMS FOUND. ADD A TASK ABOVE OR DECODE TRANSMISSIONS IN AI CAPTURE.
          </div>
        )}
      </div>
    </div>
  );
}
