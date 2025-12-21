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

import { VT323 } from "next/font/google";
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "Shashwat Pandey | AI/ML Engineer",
  description: "Portfolio of Shashwat Pandey - AI/ML Engineer and Data Scientist specializing in Deep Learning and LLMs.",
};

import Chatbot from "@/components/Chatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable} antialiased`}
      >
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
