"use client";

import { useState } from "react";
import { Zap, Clock, AlertTriangle, CheckCircle2, ArrowRight, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  category: "deadlines" | "tasks" | "projects" | "invoices";
  lastRun?: string;
}

export default function AutomationsPage() {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: "rule-1",
      name: "24-Hour Urgent Escalation",
      trigger: "Task due date is within 24 hours and incomplete",
      action: "Automatically bump priority to 'Urgent' and highlight badge",
      enabled: true,
      category: "deadlines",
      lastRun: "Ran 12 mins ago"
    },
    {
      id: "rule-2",
      name: "Auto-Complete Project on Task Finish",
      trigger: "All child tasks inside a project reach 'Done' status",
      action: "Mark parent project status as 'Completed'",
      enabled: true,
      category: "projects",
      lastRun: "Ran 1 hour ago"
    },
    {
      id: "rule-3",
      name: "AI Capture Follow-up Notification",
      trigger: "Approved task includes a detected client or proposal deadline",
      action: "Draft polite follow-up template in Review Queue",
      enabled: false,
      category: "tasks"
    },
    {
      id: "rule-4",
      name: "MSME 43B(h) 40-Day Tax Warning",
      trigger: "Vendor invoice unpaid after 40 days (5 days before legal penalty)",
      action: "Send priority alert banner on dashboard overview",
      enabled: true,
      category: "invoices",
      lastRun: "Ran yesterday"
    }
  ]);

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
              Deterministic Rules
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Workspace Automations</h1>
          <p className="text-sm text-gray-400 mt-1">
            Predictable, verifiable background rules that prevent dropped balls without unpredictable AI behavior.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#111114] border border-gray-800 px-3.5 py-2 rounded-xl text-xs text-emerald-400 font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>{rules.filter(r => r.enabled).length} Active Rules</span>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
              rule.enabled
                ? "bg-[#111114] border-gray-800 hover:border-gray-700/80 shadow-md"
                : "bg-[#0c0c0e]/60 border-gray-900 opacity-60"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                  {rule.name}
                </span>

                <button
                  onClick={() => toggleRule(rule.id)}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {rule.enabled ? (
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                      ON
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-gray-500 bg-gray-900 px-2.5 py-1 rounded-full border border-gray-800">
                      OFF
                    </span>
                  )}
                </button>
              </div>

              {/* Trigger & Action Spec */}
              <div className="space-y-2 mt-3 text-xs bg-[#0a0a0c] p-3 rounded-xl border border-gray-800/60">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px] w-14">WHEN:</span>
                  <span className="text-gray-300 font-medium">{rule.trigger}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] w-14">THEN:</span>
                  <span className="text-gray-200 font-semibold">{rule.action}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-800/40">
              <span className="capitalize">{rule.category} automation</span>
              {rule.lastRun && <span>{rule.lastRun}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
