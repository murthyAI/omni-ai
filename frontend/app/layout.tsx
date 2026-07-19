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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ??
      "https://your-vercel-domain.vercel.app"
  ),

  title: {
    default: "OMNI AI",
    template: "%s | OMNI AI",
  },

  description:
    "OMNI AI is an all-in-one AI platform for AI Chat, Image Generation, Code Generation and productivity tools.",

  keywords: [
    "OMNI AI",
    "AI",
    "Artificial Intelligence",
    "AI Chat",
    "Image Generator",
    "Code Generator",
    "Productivity",
    "Next.js AI",
    "Generative AI",
    "Chatbot",
  ],

  authors: [
    {
      name: "OMNI AI Team",
    },
  ],

  creator: "OMNI AI Team",
  publisher: "OMNI AI",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "OMNI AI",
    description:
      "All-in-One AI Platform for Chat, Images, Code and Productivity.",
    url: "/",
    siteName: "OMNI AI",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "OMNI AI",
    description:
      "All-in-One AI Platform for Chat, Images, Code and Productivity.",
  },
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