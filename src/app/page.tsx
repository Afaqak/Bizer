"use client";
import { Suspense, lazy } from "react";
import { Header } from "@/components/Header";
import { InfiniteSlider } from "@/components/slider";
import Process from "@/components/Process";

// Lazily load components that are below the fold
const ServicesSection = lazy(() => import("@/components/Services"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const GetInTouch = lazy(() =>
  import("@/components/GetInTouch").then((mod) => ({ default: mod.GetInTouch }))
);
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Simple fallback for lazy-loaded components
const LoadingFallback = () => <div className="w-full h-24 bg-black"></div>;

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <div className="flex-1">
        <Header />
        <InfiniteSlider />
        <Process />

        <Suspense fallback={<LoadingFallback />}>
          <ServicesSection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <GetInTouch />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </div>

      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </main>
  );
}
