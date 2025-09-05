'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer, Navbar, BackstageModal } from "@/components";
import { GameProvider } from "./context/GameContext";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [backstageModalOpen, setBackstageModalOpen] = useState(false);
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <GameProvider>
          <Navbar onOpenBackstage={() => setBackstageModalOpen(true)} />
          {children}
          <Footer />
          <BackstageModal
            isOpen={backstageModalOpen}
            onClose={() => setBackstageModalOpen(false)}
          />
        </GameProvider>
      </body>
    </html>
  );
}
