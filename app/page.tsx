import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import About from "../components/about";
import Skill from "../components/skill";
import Project from "../components/project";
import Contact from "../components/contact";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return(
    <>
    <Navbar />
    <Hero />
    <About />
    <Skill />
    <Project projects={projects} />
    <Contact />
    </>
  )
}