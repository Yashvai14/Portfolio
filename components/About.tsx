"use client";

import { useEffect, useRef } from "react";
import gsapInstance from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Code2, Bot, Trophy } from "lucide-react";

gsapInstance.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsapInstance.context(() => {
      gsapInstance.fromTo(
        ".about-header",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: ".about-header",
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsapInstance.fromTo(
        ".about-paragraph",
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsapInstance.fromTo(
        ".about-icon",
        { opacity: 0, scale: 0.8 },
        {
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 80%",
          },
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.5)",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-20 md:py-32 px-6 relative max-w-6xl mx-auto z-10"
    >
      {/* Background glowing aurora */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full aurora-blue opacity-20 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[300px] h-[300px] rounded-full aurora-purple opacity-20 blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="about-header mb-16 opacity-0 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-geist text-white tracking-tight leading-tight mb-4">
          About <span className="text-brand-tertiary italic">Me</span>
        </h2>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-primary text-sm font-medium font-geist">
          <User className="w-4 h-4" /> Full Stack Developer · AI & Automation
        </div>
      </div>

      {/* Content */}
      <div className="about-content grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        
        {/* Text Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="glass-card p-8 md:p-10 rounded-2xl border border-white/5 bg-[#1a2346]/40 relative overflow-hidden group hover:border-brand-primary/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-linear-to-tr from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <p className="about-paragraph opacity-0 text-[#c2c6d6] text-base md:text-lg leading-relaxed font-geist relative z-10">
              <strong className="text-white">Hello! I’m Yash</strong>, a Computer Engineering graduate from SSIT, Nagpur, with hands-on experience building full-stack web applications, SaaS platforms, and AI-powered automation tools using Next.js, FastAPI, PostgreSQL, and LangChain.
            </p>
          </div>

          <div className="glass-card p-8 md:p-10 rounded-2xl border border-white/5 bg-[#1a2346]/40 relative overflow-hidden group hover:border-brand-secondary/30 transition-colors duration-500">
             <div className="absolute inset-0 bg-linear-to-tr from-brand-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <p className="about-paragraph opacity-0 text-[#c2c6d6] text-base md:text-lg leading-relaxed font-geist relative z-10">
              I have worked on real-world D2C business automation projects, building AI-powered workflows for lead management, customer support, CRM automation, and business operations using <span className="text-brand-tertiary">n8n, custom APIs, and LLMs</span>. I have also developed scalable SaaS platforms, AI dashboards, and automated systems that streamline business processes and improve operational efficiency.
            </p>
          </div>

          <div className="glass-card p-8 md:p-10 rounded-2xl border border-white/5 bg-[#1a2346]/40 relative overflow-hidden group hover:border-brand-tertiary/30 transition-colors duration-500">
             <div className="absolute inset-0 bg-linear-to-tr from-brand-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <p className="about-paragraph opacity-0 text-[#c2c6d6] text-base md:text-lg leading-relaxed font-geist relative z-10">
              I’m currently exploring Artificial Intelligence and Machine Learning building multi-agent pipelines with <span className="text-brand-primary">LangChain & LangGraph</span>, hosting local LLMs via <span className="text-brand-secondary">Ollama</span>, and integrating AI automation into real-world applications. I won <strong className="text-brand-tertiary">1st Prize at InnoSpark</strong> and presented at NCIETE-2026 (IEEE format).
            </p>
          </div>
        </div>

        {/* Visual Column / Icons */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col justify-center gap-6 lg:gap-8 h-full">
          <div className="about-icon opacity-0 w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-[#111936] border border-white/10 flex items-center justify-center shadow-lg transform hover:scale-110 hover:-rotate-6 transition-all duration-300">
            <Code2 className="w-8 h-8 md:w-12 md:h-12 text-brand-primary" />
          </div>
          <div className="about-icon opacity-0 w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-[#111936] border border-white/10 flex items-center justify-center shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-300 lg:ml-12">
            <Bot className="w-8 h-8 md:w-12 md:h-12 text-brand-secondary" />
          </div>
          <div className="about-icon opacity-0 w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-[#111936] border border-white/10 flex items-center justify-center shadow-lg transform hover:scale-110 hover:-rotate-3 transition-all duration-300">
            <Trophy className="w-8 h-8 md:w-12 md:h-12 text-brand-tertiary" />
          </div>
        </div>
      </div>
    </section>
  );
}
