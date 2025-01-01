import type { Metadata } from "next";

import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { asap_condensed } from "@/lib/fonts";
import { Header } from "@/components/Header";
import { Toaster } from "sonner";
import Script from "next/script";
import JsonLd from "@/lib/JsonLd";

export const metadata: Metadata = {
  title: "HackToast - Empowering Innovation",
  description:
    "HackToast is a leading tech startup revolutionizing the digital landscape. We specialize in cutting-edge solutions, innovative technologies, and transformative services to help businesses and individuals thrive in the digital age.",
  keywords: [
    "Tech Startup",
    "Innovative Solutions",
    "Technology Services",
    "Digital Transformation",
    "Software Development",
    "AI Solutions",
    "Tech Innovation",
    "HackToast",
    "Digital Revolution",
    "Cutting-Edge Technology",
  ],
  openGraph: {
    title: "HackToast - Empowering Innovation",
    description:
      "HackToast is a leading tech startup revolutionizing the digital landscape with cutting-edge solutions, innovative technologies, and transformative services.",
    url: "https://hacktoast.com",
    siteName: "HackToast",
    type: "website",
    images: [
      {
        url: "https://hacktoast.com/logo.png",
        width: 1200,
        height: 630,
        alt: "HackToast Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HackToast - Empowering Innovation",
    description:
      "HackToast is a leading tech startup revolutionizing the digital landscape with cutting-edge solutions, innovative technologies, and transformative services.",
    site: "@hacktoast",
    creator: "@hacktoast",
    // images: ["https://hacktoast.com/twitter-card-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://hacktoast.com",
    languages: {
      "en-US": "https://hacktoast.com",
      // "es-ES": "https://hacktoast.com/es",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${asap_condensed.className} antialiased`}>
      <JsonLd />
        <Navbar />
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
