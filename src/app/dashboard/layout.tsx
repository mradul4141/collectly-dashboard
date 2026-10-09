import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[var(--background)]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--background)]">
        <Topbar />
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
