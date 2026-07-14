import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ExperienceSkills from "@/components/ExperienceSkills";
import ServicesContact from "@/components/ServicesContact";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const prismaProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="relative flex flex-col w-full overflow-x-clip">
        <Hero />
        <About />
        <ProjectsShowcase initialProjects={prismaProjects} />
        <ExperienceSkills />
        <ServicesContact />
      </main>
      <Footer />
    </div>
  );
}
