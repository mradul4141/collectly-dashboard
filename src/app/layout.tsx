import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Collectly - Automated Payment Chasing for Agencies",
  description: "Stop chasing unpaid invoices. Collectly automates your AR so you can focus on creative work.",
  openGraph: {
    title: "Collectly",
    description: "Automated payment chasing for creative agencies.",
    url: "https://collectly.app",
    siteName: "Collectly",
    images: [
      {
        url: "https://collectly.app/og-image.jpg",
        width: 1200,
        height: 630,
      }
    ],
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
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
