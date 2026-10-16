import type { Metadata } from "next";
import { Rubik_Mono_One, Oswald, Inter } from "next/font/google";
import "./globals.css";

const rubikMonoOne = Rubik_Mono_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-retro-display",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-retro-label",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collectly — AI Workspace (Retro Space Zine Edition)",
  description: "Turn scattered information into organized work and actionable results with AI.",
  openGraph: {
    title: "Collectly — AI Workspace",
    description: "Turn scattered information into organized work and actionable results with AI.",
    url: "https://collectly.app",
    siteName: "Collectly",
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubikMonoOne.variable} ${oswald.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen bg-[#DEDEC8] text-[#0A0A0A] font-sans selection:bg-[#0A0A0A] selection:text-[#FFFFFF]">
        {children}
      </body>
    </html>
  );
}
