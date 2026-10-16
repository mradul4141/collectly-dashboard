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
      name: "24-Hour Urgent Escalation Relay",
      trigger: "Task due date is within 24 hours and incomplete",
      action: "Automatically bump priority to 'Urgent' and stamp visual alert tag",
      enabled: true,
      category: "deadlines",
      lastRun: "Executed 12 mins ago"
    },
    {
      id: "rule-2",
      name: "Auto-Complete Orbital Mission on Task Finish",
      trigger: "All child tasks inside a project reach 'Done' status",
      action: "Mark parent mission status as 'Completed' and record in archive",
      enabled: true,
      category: "projects",
      lastRun: "Executed 1 hour ago"
    },
    {
      id: "rule-3",
      name: "AI Capture Follow-up Dispatch",
      trigger: "Approved payload includes a detected client or proposal deadline",
      action: "Draft polite follow-up template in Mission Transmission Queue",
      enabled: false,
      category: "tasks"
    },
    {
      id: "rule-4",
      name: "MSME 43B(h) 40-Day Tax Warning Relay",
      trigger: "Vendor invoice unpaid after 40 days (5 days before legal penalty)",
      action: "Trigger priority alert banner on telemetry dashboard overview",
      enabled: true,
      category: "invoices",
      lastRun: "Executed yesterday"
    }
  ]);

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#0A0A0A] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-label text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] bg-[#DEDEC8] px-2.5 py-0.5 rounded-full border border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
              AUTONOMOUS LOGIC RELAYS
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#0A0A0A] tracking-tight uppercase">
            WORKSPACE AUTOMATIONS
          </h1>
          <p className="text-xs sm:text-sm text-[#0A0A0A]/70 mt-1 font-sans">
            Deterministic, verifiable background relays that prevent dropped transmissions without unpredictable AI drift.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border-2 border-[#0A0A0A] px-3.5 py-2 rounded-full font-label text-xs uppercase tracking-wider text-[#0A0A0A] font-bold shadow-[3px_3px_0px_#0A0A0A]">
          <CheckCircle2 className="w-4 h-4 text-[#0A0A0A]" />
          <span>{rules.filter(r => r.enabled).length} ACTIVE RELAYS</span>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`p-5 rounded-[20px] border-2 transition-all flex flex-col justify-between gap-4 shadow-[4px_4px_0px_#0A0A0A] ${
              rule.enabled
                ? "bg-white border-[#0A0A0A]"
                : "bg-[#DEDEC8]/50 border-[#0A0A0A]/40 opacity-70"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label text-xs font-bold text-[#0A0A0A] uppercase tracking-wide flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 fill-[#0A0A0A]" />
                  {rule.name}
                </span>

                <button
                  onClick={() => toggleRule(rule.id)}
                  className="font-label text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer px-2 py-0.5 rounded-full border border-[#0A0A0A] bg-[#DEDEC8] shadow-[1px_1px_0px_#0A0A0A]"
                >
                  {rule.enabled ? (
                    <span className="text-[#0A0A0A] font-black">ON</span>
                  ) : (
                    <span className="text-[#0A0A0A]/50">OFF</span>
                  )}
                </button>
              </div>

              <div className="space-y-2 mt-3 bg-[#DEDEC8] border border-[#0A0A0A]/20 p-3 rounded-[12px] font-mono text-xs text-[#0A0A0A]">
                <div className="flex items-start gap-2">
                  <span className="font-label font-bold text-[10px] uppercase text-[#0A0A0A]/70 shrink-0">TRIGGER:</span>
                  <span className="leading-snug">{rule.trigger}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-label font-bold text-[10px] uppercase text-[#0A0A0A]/70 shrink-0">ACTION:</span>
                  <span className="leading-snug font-medium">{rule.action}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#0A0A0A]/10 text-[10px] font-label uppercase tracking-wider text-[#0A0A0A]/60">
              <span>CATEGORY // {rule.category}</span>
              {rule.lastRun && <span>{rule.lastRun}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
