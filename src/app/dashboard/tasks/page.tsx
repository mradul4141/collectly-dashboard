"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Plus, Search, Calendar, Flag, FolderKanban, Sparkles, Filter } from "lucide-react";
import { Task, Priority } from "@/lib/workspace-types";

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
    <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-in p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">My Tasks</h1>
          <p className="text-sm text-gray-400 mt-1">
            Organize, prioritize, and check off your day-to-day work.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-xl font-bold">
            {pendingCount} Pending
          </span>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-bold">
            {completedCount} Completed
          </span>
        </div>
      </div>

      {/* Quick Add Bar */}
      <form onSubmit={addTask} className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="+ Add a quick task and press Enter..."
          className="flex-1 bg-[#111114] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </form>

      {/* Controls / Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#111114] p-3 rounded-xl border border-gray-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks or projects..."
            className="w-full bg-[#0a0a0c] border border-gray-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#0a0a0c] border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-gray-300 focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
              task.is_completed
                ? "bg-[#0c0c0e]/60 border-gray-900 opacity-50"
                : "bg-[#111114] hover:bg-[#151518] border-gray-800 hover:border-gray-700"
            }`}
          >
            <div className="flex items-center gap-3.5 flex-1">
              <button
                type="button"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                {task.is_completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>

              <div className="space-y-0.5">
                <span
                  className={`text-sm font-medium ${
                    task.is_completed ? "line-through text-gray-500" : "text-gray-200"
                  }`}
                >
                  {task.title}
                </span>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1 text-gray-400">
                    <FolderKanban className="w-3 h-3 text-indigo-400" />
                    {task.project_name || "General"}
                  </span>
                  {task.due_date && (
                    <span className="flex items-center gap-1 text-gray-500">
                      • <Calendar className="w-3 h-3" /> {task.due_date}
                    </span>
                  )}
                  {task.ai_generated && (
                    <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded border border-indigo-500/20 font-bold flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> AI
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
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
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 bg-[#111114] border border-gray-800 rounded-xl text-gray-400 text-sm">
            No tasks found. Use the quick-add input above or capture tasks with AI!
          </div>
        )}
      </div>
    </div>
  );
}
