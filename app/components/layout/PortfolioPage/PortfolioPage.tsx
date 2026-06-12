"use client";

import Header from "@/app/components/layout/Header/Header";
import Footer from "@/app/components/layout/Footer/Footer";
import Hero from "@/app/components/sections/Hero/Hero";
import Profile from "@/app/components/sections/Profile/Profile";
import FeaturedProjects from "@/app/components/sections/FeaturedProjects/FeaturedProjects";
import Skills from "@/app/components/sections/Skills/Skills";
import FrontendLab from "@/app/components/sections/FrontendLab/FrontendLab";
import WorkProcess from "@/app/components/sections/WorkProcess/WorkProcess";
import ExperienceSection from "@/app/components/sections/Experience/ExperienceSection";
import Services from "@/app/components/sections/Services/Services";
import Contact from "@/app/components/sections/Contact/Contact";
import { PRIMARY_NAV } from "@/app/data/navigation";
import { useScrollSpy } from "@/app/hooks/useScrollSpy";

const SCROLL_SPY_IDS = PRIMARY_NAV.map((item) => item.sectionId);

export default function PortfolioPage() {
  const activeSection = useScrollSpy([...SCROLL_SPY_IDS]);

  return (
    <>
      <Header activeSection={activeSection} />
      <Hero />
      <Profile />
      <FeaturedProjects />
      <Skills />
      <FrontendLab />
      <WorkProcess />
      <ExperienceSection />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
