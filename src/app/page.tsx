"use client";
import { ContactForm } from "@/components/Contact";
import Footer from "@/components/Footer";
import { GetInTouch } from "@/components/GetInTouch";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/Services";
import { InfiniteSlider } from "@/components/slider";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
  return (
    <main className="w-full">
      <InfiniteSlider />
      <ServicesSection />
      <ProjectsSection/>
      {/* <InfiniteSlider rotate={0}/> */}
      {/* <SocialLinks/> */}
      <GetInTouch/>
      <ContactForm/>
      <Footer/>
    </main>
  );
}