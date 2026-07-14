"use client";

import { useEffect, useRef } from "react";
import { Layers, Briefcase, Code, Send, Github, Triangle, Settings, Database, Bot } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioData } from "@/context/PortfolioDataContext";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSkills() {
  const { data, loading } = usePortfolioData();
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: ".skills-header",
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Tech Stack Taxonomy Grid Reveal
      gsap.fromTo(
        ".taxonomy-card",
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: ".taxonomy-grid",
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Timeline nodes drawing and reveals
      gsap.fromTo(
        ".timeline-node",
        { scale: 0 },
        {
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
          },
          scale: 1,
          stagger: 0.2,
          duration: 0.6,
          ease: "back.out(2)",
        }
      );

      gsap.fromTo(
        ".timeline-content-left",
        { opacity: 0, x: -40 },
        {
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
          },
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".timeline-content-right",
        { opacity: 0, x: 40 },
        {
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
          },
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Stats counters animation
      const statsElements = document.querySelectorAll(".stat-number");
      statsElements.forEach((el) => {
        const targetVal = parseInt(el.getAttribute("data-val") || "0", 10);
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        
        const countObj = { val: 0 };
        gsap.to(countObj, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
          },
          val: targetVal,
          duration: 2,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = `${prefix}${Math.floor(countObj.val)}${suffix}`;
          },
        });
      });
    }, containerRef);

    // Refresh ScrollTrigger after a short delay to account for layout shifts
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      ctx.revert();
      clearTimeout(t);
    };
  }, [loading]);

  if (loading) {
    return null;
  }

  // Helper to pick taxonomy icon dynamically


  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-20 md:py-32 px-6 relative max-w-6xl mx-auto z-10"
    >
      {/* Aurora spotlight */}
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full aurora-purple opacity-30 blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="skills-header mb-16 md:mb-24 opacity-0">
        <h2 className="text-3xl md:text-5xl font-bold font-geist text-white tracking-tight leading-tight mb-4">
          Skills & <span className="text-brand-tertiary italic">Experience</span>
        </h2>
        <p className="max-w-2xl text-base text-[#c2c6d6] leading-relaxed">
          Building modern web applications and AI-driven solutions. A look at the technologies I use and my journey so far.
        </p>
      </div>

      {/* Custom Tech Stack & Platforms */}
      <div className="mb-24">
        {/* Progress bars row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {data.services.slice(0, 3).map((service, sIdx) => {
            // parse the string "Next.js / React.js (92%), TypeScript (90%), ..."
            const skillsStr = service.description;
            const skillPairs = skillsStr.split(', ').map(s => {
              const match = s.match(/(.*?)\s*\((\d+)%\)/);
              if (match) return { name: match[1], val: parseInt(match[2]) };
              return { name: s, val: 80 };
            });

            return (
              <div key={sIdx} className="glass-card p-6 md:p-8 rounded-xl border border-[#2e375e] bg-[#1a2346]/80 flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-[#253268]/20 to-transparent pointer-events-none" />
                <h3 className="text-xl font-bold font-geist text-white text-center mb-8 relative z-10">{service.title}</h3>
                <div className="flex flex-col gap-6 relative z-10">
                  {skillPairs.map((skill, kIdx) => (
                    <div key={kIdx} className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-white">{skill.name}</span>
                        <span className="text-xs font-bold text-[#c2c6d6]">{skill.val}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#0a0f24] rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full rounded-full bg-linear-to-r from-brand-primary to-brand-tertiary" 
                          style={{ width: `${skill.val}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Platforms & Tools */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold font-geist text-white mb-8">Platforms & Tools I Use</h3>
          <div className="glass-card p-6 md:p-10 rounded-xl border border-[#2e375e] bg-[#1a2346]/50 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "VS Code", Icon: Code },
                { name: "Postman", Icon: Send },
                { name: "GitHub", Icon: Github },
                { name: "Vercel", Icon: Triangle },
                { name: "n8n", Icon: Settings },
                { name: "Supabase", Icon: Database },
                { name: "Ollama", Icon: Bot },
                { name: "Prisma", Icon: Layers },
              ].map((tool, tIdx) => (
                <div key={tIdx} className="flex items-center justify-center gap-3 bg-[#111936] hover:bg-[#1a254d] transition-colors border border-brand-primary/20 rounded-lg p-4">
                  <tool.Icon className="w-5 h-5 text-brand-tertiary" />
                  <span className="text-sm font-semibold font-geist text-white">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Narrative Timeline */}
      <div className="timeline-container mb-24 relative">
        <h3 className="text-lg font-semibold font-geist tracking-wider text-[#8c909f] uppercase mb-16 flex items-center gap-2">
          <Briefcase className="w-4.5 h-4.5 text-brand-secondary" /> My Journey
        </h3>

        {/* Central Vertical Line */}
        <div className="absolute left-[50%] translate-x-[-50%] top-24 bottom-0 w-[2px] bg-linear-to-b from-brand-primary via-brand-secondary to-brand-tertiary opacity-30 hidden md:block" />

        <div className="flex flex-col gap-16 relative">
          {data.experience.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center justify-between relative w-full ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Center dot */}
                <div className="timeline-node absolute left-[50%] translate-x-[-50%] w-10 h-10 rounded-full bg-brand-bg border-2 border-brand-primary/60 flex items-center justify-center z-10 md:flex scale-0">
                  <div className="w-3 h-3 rounded-full bg-brand-tertiary" />
                </div>

                {/* Left/Right Text Content */}
                <div
                  className={`w-full md:w-[45%] timeline-content-left opacity-0 ${
                    isEven ? "text-left md:text-right" : "text-left"
                  }`}
                >
                  <span className="font-mono text-xs text-brand-tertiary font-semibold">
                    {item.date}
                  </span>
                  <h4 className="text-xl font-bold font-geist text-white mt-1">{item.role}</h4>
                  <p className="text-xs text-[#8c909f] font-medium mb-4">{item.company}</p>
                </div>

                {/* Bullets Card (Opposite Side) */}
                <div className="w-full md:w-[45%] timeline-content-right opacity-0 mt-4 md:mt-0">
                  <div className="glass-card p-6 rounded-lg text-left">
                    <ul className="flex flex-col gap-3">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-xs text-[#c2c6d6] leading-relaxed flex gap-2">
                          <span className="text-brand-tertiary">▹</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Counters */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/5 pt-16"
      >
        {data.stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 text-center rounded-lg relative overflow-hidden">
            <div
              className="stat-number text-3xl md:text-5xl font-bold font-geist text-white mb-2"
              data-val={stat.val}
              data-suffix={stat.suffix}
            >
              0
            </div>
            <div className="text-[10px] font-bold font-geist tracking-wider text-[#8c909f]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
