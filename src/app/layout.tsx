import type { Metadata } from "next";

import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { asap_condensed } from "@/lib/fonts";
import { Header } from "@/components/Header";


export const metadata: Metadata = {
  title: "Bizer - Empowering Innovation",
  description: 
    "Bizer is a leading tech startup revolutionizing the digital landscape. " +
    "We specialize in cutting-edge solutions, innovative technologies, and transformative services to help businesses thrive in the digital age.",
  keywords: [
    "Bizer",
    "Tech Startup",
    "Innovative Solutions",
    "Technology Services",
    "Digital Transformation",
    "Software Development",
    "AI Solutions",
    "Tech Innovation",
  ]
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${asap_condensed.className} antialiased`}>
        <Navbar />
        <Header />
        {children}
      </body>
    </html>
  );
}
