"use client";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { GetInTouch } from "@/components/GetInTouch";
import Process from "@/components/Process";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/Services";
import { InfiniteSlider } from "@/components/slider";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <div className="flex-1">
        <InfiniteSlider />
        <Process />
        <ServicesSection />
        <ProjectsSection/>
        {/* <InfiniteSlider rotate={0}/> */}
        {/* <SocialLinks/> */}
        <GetInTouch/>
        <Contact/>
      </div>
      <Footer/>
    </main>
  );
}