import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Notebin",
  description: "Self-hosted code snippet sharing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geistSans.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            const theme = localStorage.getItem('theme');
            if (theme === 'dark') document.documentElement.classList.add('dark');
          `
        }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
