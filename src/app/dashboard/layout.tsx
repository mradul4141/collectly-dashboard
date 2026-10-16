import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-screen p-2 md:p-4 bg-[#DEDEC8] flex items-center justify-center">
      {/* Outer Retro Device Container (24px radius, 2px solid black border, 3D offset shadow) */}
      <div className="w-full h-[96vh] rounded-[24px] border-2 border-[#0A0A0A] bg-[#FFFFFF] shadow-[8px_8px_0px_#0A0A0A] overflow-hidden flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F4F0]">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
