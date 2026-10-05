import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export const metadata: Metadata = {
  title: "CollectWise - SaaS Dashboard",
  description: "Payment-Chasing SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden flex bg-[#f6f5f2] antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--background)]">
          <Topbar />
          <main className="flex-1 overflow-auto p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
