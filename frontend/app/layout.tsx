import Navbar from "../components/Navbar";
import AuthGuard from "@/components/AuthGuard";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OMNI AI",
    template: "%s | OMNI AI",
  },
  description:
    "OMNI AI is an all-in-one AI platform for chat, image generation, code generation, and productivity.",
  keywords: [
    "OMNI AI",
    "AI Chat",
    "Image Generator",
    "Code Generator",
    "Artificial Intelligence",
    "Productivity",
  ],
  authors: [{ name: "OMNI AI Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}