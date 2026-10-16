"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Radio, CheckSquare, FolderKanban, FileText } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "ORBIT", href: "/dashboard", icon: Compass },
    { label: "CAPTURE", href: "/dashboard/capture", icon: Radio, highlight: true },
    { label: "TASKS", href: "/dashboard/tasks", icon: CheckSquare },
    { label: "KANBAN", href: "/dashboard/projects", icon: FolderKanban },
    { label: "INVOICES", href: "/dashboard/invoices", icon: FileText },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#DEDEC8] border-t-2 border-[#0A0A0A] px-2 py-1.5 flex items-center justify-around shadow-[0px_-4px_0px_#0A0A0A] select-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              isActive
                ? "bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] -translate-y-1"
                : item.highlight
                ? "bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]"
                : "text-[#0A0A0A] hover:bg-black/5"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-label text-[9px] uppercase tracking-wider font-bold mt-0.5">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
