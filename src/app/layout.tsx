import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "sonner";
import JsonLd from "@/lib/JsonLd";
import PageLoader from "@/components/PageLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HackToast | Modern Web Design & Development",
  description:
    "Custom web design, development and digital solutions that drive growth for your business.",
  keywords: "web design, web development, UI/UX, digital solutions, HackToast",
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "HackToast | Modern Web Design & Development",
    description:
      "Custom web design, development and digital solutions that drive growth for your business.",
    url: "https://hacktoast.com",
    siteName: "HackToast",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "HackToast Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HackToast | Modern Web Design & Development",
    description:
      "Custom web design, development and digital solutions that drive growth for your business.",
    images: ["/logo.png"],
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth view-transition">
      <body
        className={`${inter.className} bg-black text-white overflow-x-hidden`}
      >
        <JsonLd />
        <PageLoader />
        <Navbar />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1f1f1f",
              color: "#ffffff",
              border: "1px solid #333333",
            },
            className: "toast-class",
          }}
        />
      </body>
    </html>
  );
}
