"use client";

import { useRef, useEffect, useState } from "react";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Github({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.071 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioData } from "@/context/PortfolioDataContext";

gsap.registerPlugin(ScrollTrigger);

interface ProjectType {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  linkDemo?: string;
  linkSource?: string;
  type?: string;
}

function Tag({ label, idx }: { label: string; idx: number }) {
  const colors = [
    "text-brand-primary bg-[#adc6ff]/10 border-[#adc6ff]/25",
    "text-[#ddb7ff] bg-[#ddb7ff]/10 border-[#ddb7ff]/25",
    "text-brand-tertiary bg-brand-tertiary/10 border-[#2fd9f4]/25",
  ];
  return (
    <span className={`font-mono text-[10px] tracking-wider font-semibold px-2.5 py-1 rounded-sm border ${colors[idx % 3]}`}>
      {label}
    </span>
  );
}

function HeroPreview({ project, animKey }: { project: ProjectType; animKey: number }) {
  const [hovered, setHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
  }, [animKey]);

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden animated-border-box"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0">
        {project.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={project.id} src={project.image} alt={project.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`} />
          </>
        ) : (
          <div className="w-full h-full bg-linear-to-br from-[#0b1f45] to-[#1a0b30]" />
        )}
        <div className="absolute inset-0 bg-[#050816]/50" />
        <div className="absolute inset-0 bg-linear-to-t from-[#050816] via-[#050816]/80 to-transparent" />
      </div>

      <div className="absolute top-5 left-5 z-10">
        <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-brand-tertiary bg-brand-tertiary/10 border border-brand-tertiary/30 px-3 py-1 rounded-full">
          Projects Showcase
        </span>
      </div>

      <div ref={contentRef} className="absolute bottom-0 left-0 right-0 p-7 z-10">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((t, i) => <Tag key={i} label={t} idx={i} />)}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold font-geist text-white mb-2 leading-tight">{project.title}</h3>
        <p className="text-sm text-[#c2c6d6] leading-relaxed line-clamp-3 mb-5 max-w-lg">{project.description}</p>
        <div className="flex gap-5">
          {project.linkDemo && (
            <a href={project.linkDemo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold font-geist text-brand-tertiary hover:text-white transition-colors">
              <Activity className="w-3.5 h-3.5" />
              {project.type || "Live Demo"}
            </a>
          )}
          {project.linkSource && (
            <a href={project.linkSource} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold font-geist text-[#c2c6d6] hover:text-white transition-colors">
              <Github className="w-3.5 h-3.5" />
              View Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const ACCENTS: Array<"blue" | "purple" | "cyan"> = ["blue", "purple", "cyan"];
const glowMap = { blue: "rgba(173,198,255,0.10)", purple: "rgba(168,85,247,0.10)", cyan: "rgba(47,217,244,0.10)" };
const borderIdleMap = { blue: "border-[#adc6ff]/15", purple: "border-[#a855f7]/15", cyan: "border-[#2fd9f4]/15" };
const borderActiveMap = { blue: "border-[#adc6ff]/60", purple: "border-[#a855f7]/60", cyan: "border-[#2fd9f4]/60" };
const stripeColorMap = { blue: "#adc6ff", purple: "#a855f7", cyan: "#2fd9f4" };

function SelectorCard({ project, accent, selected, onSelect }: {
  project: ProjectType; accent: "blue" | "purple" | "cyan"; selected: boolean; onSelect: () => void;
}) {
  const border = selected ? borderActiveMap[accent] : borderIdleMap[accent];
  const bg = `radial-gradient(circle at 60% 30%, ${glowMap[accent]}, #0b1326 70%)`;

  return (
    <button onClick={onSelect}
      className={`group w-full h-full text-left relative rounded-2xl overflow-hidden border transition-all duration-300 ${border} ${selected ? "shadow-[0_0_24px_rgba(47,217,244,0.07)] scale-[1.02]" : "hover:border-white/20 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(173,198,255,0.12)] hover:scale-[1.01]"}`}
      style={{ background: bg }}>
      {selected && (
        <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full transition-all duration-300"
          style={{ background: stripeColorMap[accent] }} />
      )}
      <div className="p-3 pl-4 h-full flex flex-col">
        {project.image && (
          <div className="relative h-14 -mx-3 -mt-3 mb-2 overflow-hidden rounded-t-2xl shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-brand-surface" />
          </div>
        )}
        <h3 className={`text-sm font-bold font-geist leading-snug mb-1 transition-colors ${selected ? "text-white" : "text-white/70"}`}>
          {project.title}
        </h3>
        <p className={`text-[11px] text-[#c2c6d6]/60 leading-relaxed ${project.image ? 'line-clamp-1' : 'line-clamp-2'} mb-2 grow`}>{project.description}</p>
        <div className="flex flex-wrap gap-1 shrink-0">
          {project.tags.slice(0, 2).map((t, i) => <Tag key={i} label={t} idx={i} />)}
        </div>
      </div>
    </button>
  );
}

function FillerSlot() {
  return (
    <div className="w-full h-full rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2"
      style={{ background: "radial-gradient(circle at 50% 0%, rgba(173,198,255,0.03), #0b1326 80%)" }}>
      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center">
        <span className="text-white/20 text-base font-light leading-none">+</span>
      </div>
      <p className="text-[9px] font-mono tracking-widest text-white/15 uppercase">More Coming Soon</p>
    </div>
  );
}

function ScrollCard({ project, index }: { project: ProjectType; index: number }) {
  return (
    <div className="snap-center shrink-0 w-[80vw] sm:w-[340px] md:w-[380px] h-52">
      <SelectorCard project={project} accent={ACCENTS[index % 3]} selected={false} onSelect={() => {}} />
    </div>
  );
}


import { ProjectData } from "@/lib/initialData";

export default function ProjectsShowcase({ initialProjects }: { initialProjects?: ProjectData[] }) {
  const { data, loading } = usePortfolioData();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const projects: ProjectType[] = (initialProjects?.length ? initialProjects : data?.projects ?? []).map((p: ProjectData) => ({
    id: p.id as string, title: p.title as string, description: p.description as string,
    tags: (p.tags as string[]) ?? [], image: (p.image || p.imageUrl) as string ?? "", linkDemo: (p.linkDemo || p.liveUrl) as string ?? "",
    linkSource: (p.linkSource || p.githubUrl) as string ?? "", type: (p.type as string) ?? "Live Demo",
  }));

  const panelProjects = projects.slice(0, 3);
  const overflowProjects = projects.slice(3);
  const selectedProject = panelProjects[Math.min(selectedIdx, panelProjects.length - 1)];

  const handleSelect = (i: number) => {
    if (i === selectedIdx) return;
    setSelectedIdx(i);
    setAnimKey(k => k + 1);
  };

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.from(".proj-header", { scrollTrigger: { trigger: ".proj-header", start: "top 88%" }, opacity: 0, y: 40, duration: 0.9, ease: "power3.out" });
      gsap.from(".bento-item", { scrollTrigger: { trigger: ".bento-grid", start: "top 85%" }, opacity: 0, y: 50, stagger: 0.12, duration: 1.1, ease: "power4.out" });
    }, containerRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { ctx.revert(); clearTimeout(t); };
  }, [loading]);

  const scrollCards = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });

  const handleContactScroll = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) return null;

  return (
    <section id="projects" ref={containerRef} className="py-20 md:py-32 px-6 relative max-w-6xl mx-auto z-10 w-full">
      <div className="proj-header mb-14 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-bold font-geist text-white tracking-tight leading-tight mb-4">
          Featured <span className="text-brand-primary italic">Projects</span>
        </h2>
        <p className="max-w-2xl text-base text-[#c2c6d6] leading-relaxed">
          A collection of high-performance technical solutions, built with architectural precision and creative vision. Each piece represents a deep dive into engineering complex systems.
        </p>
      </div>

      {projects.length > 0 && (
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 md:h-[560px]">
          {selectedProject && (
            <div className="bento-item md:col-span-2 h-[350px] sm:h-[400px] md:h-full">
              <HeroPreview project={selectedProject} animKey={animKey} />
            </div>
          )}
          <div className="flex flex-col gap-5 h-[400px] sm:h-[450px] md:h-full">
            {panelProjects.map((proj, i) => (
              <div key={proj.id || i} className="bento-item flex-1 min-h-0">
                <SelectorCard project={proj} accent={ACCENTS[i % 3]} selected={selectedIdx === i} onSelect={() => handleSelect(i)} />
              </div>
            ))}
            {Array.from({ length: Math.max(0, 3 - panelProjects.length) }).map((_, i) => (
              <div key={`filler-${i}`} className="bento-item flex-1 min-h-0"><FillerSlot /></div>
            ))}
          </div>
        </div>
      )}

      {overflowProjects.length > 0 && (
        <div className="relative group/scroll mb-14">
          <button onClick={() => scrollCards("left")}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-brand-surface/90 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/scroll:opacity-100 transition-opacity">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div ref={scrollRef} className="flex gap-5 py-3 overflow-x-auto snap-x snap-mandatory horizontal-scroll-container">
            {overflowProjects.map((proj, i) => <ScrollCard key={proj.id || i} project={proj} index={i} />)}
          </div>
          <button onClick={() => scrollCards("right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-brand-surface/90 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/scroll:opacity-100 transition-opacity">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="glass-card spotlight-border p-10 md:p-16 text-center max-w-4xl mx-auto rounded-2xl relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full aurora-cyan opacity-40 blur-[50px] pointer-events-none" />
        <h3 className="text-2xl md:text-3xl font-bold font-geist text-white mb-4">Have a vision for something new?</h3>
        <p className="max-w-md mx-auto text-sm text-[#c2c6d6] leading-relaxed mb-8">
          I&apos;m currently accepting select high-impact engineering projects for 2026. Let&apos;s discuss your product roadmap.
        </p>
        <button onClick={handleContactScroll}
          className="px-8 py-3.5 rounded-md bg-brand-tertiary text-[#050816] font-geist font-semibold text-xs hover:shadow-[0_0_25px_rgba(47,217,244,0.4)] transition-all hover-target">
          Start a Project
        </button>
      </div>
    </section>
  );
}
