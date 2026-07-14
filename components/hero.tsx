"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Cpu, Globe } from "lucide-react";
import gsap from "gsap";
import { usePortfolioData } from "@/context/PortfolioDataContext";

export default function Hero() {
  const { data, loading } = usePortfolioData();
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;

    // Break title down into characters for text reveal
    const titleEl = titleRef.current;
    if (!titleEl) return;

    const text = titleEl.textContent || "";
    titleEl.innerHTML = "";
    
    // Split into characters, wrapped in span elements
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.className = "inline-block opacity-0 translate-y-8 filter blur-[2px]";
      titleEl.appendChild(span);
    });

    const chars = titleEl.querySelectorAll("span");

    // Timeline setup
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2,
    })
      .to(
        chars,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.03,
          duration: 0.8,
        },
        "-=0.6"
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.6"
      )
      .to(
        scrollRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        "-=0.4"
      );

    // Floating animation for scroll indicator
    gsap.to(scrollRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
    });
  }, [loading, data.hero.title]);

  const handleScrollClick = () => {
    const element = document.getElementById("projects");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#050816]">
        <div className="w-8 h-8 rounded-full border-2 border-brand-tertiary border-t-transparent animate-spin" />
      </section>
    );
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20"
    >
      {/* Dynamic Aura background lights */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full aurora-blue opacity-50 blur-[100px] pointer-events-none -z-10 animate-glow-pulse" />
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full aurora-purple opacity-40 blur-[100px] pointer-events-none -z-10 animate-glow-pulse [animation-delay:1.5s]" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 w-full">
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Availability Badge */}
          <div
            ref={badgeRef}
            className="opacity-0 translate-y-4 mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/3 border border-white/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-tertiary"></span>
            </span>
            <span className="font-geist text-[10px] font-semibold tracking-wider text-brand-primary uppercase">
              {data.hero.badgeText}
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-geist text-white tracking-tight leading-[1.1] mb-6 glow-text max-w-3xl"
          >
            {data.hero.title}
          </h1>

          {/* Subheadings / Pillars */}
          <div
            ref={subtitleRef}
            className="opacity-0 translate-y-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-10 text-[#c2c6d6] font-geist text-sm tracking-wide"
          >
            {data.hero.subtitle1 && (
              <div className="flex items-center gap-2 bg-white/2 px-3.5 py-1.5 rounded-full border border-white/5 shadow-inner">
                <Cpu className="w-4 h-4 text-brand-tertiary" />
                <span>{data.hero.subtitle1}</span>
              </div>
            )}
            {data.hero.subtitle1 && data.hero.subtitle2 && (
              <span className="hidden sm:inline text-white/20">|</span>
            )}
            {data.hero.subtitle2 && (
              <div className="flex items-center gap-2 bg-white/2 px-3.5 py-1.5 rounded-full border border-white/5 shadow-inner">
                <Globe className="w-4 h-4 text-brand-secondary" />
                <span>{data.hero.subtitle2}</span>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div
            ref={ctaRef}
            className="opacity-0 translate-y-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full sm:w-auto"
          >
            <a
              href="/Resume/Yash_Vaidya%20(1).pdf"
              target="_blank"
              download
              className="flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto rounded-md bg-linear-to-r from-brand-primary to-brand-secondary text-brand-primary-dark font-geist font-semibold text-sm hover:brightness-110 transition-all hover:shadow-[0_0_30px_rgba(173,198,255,0.4)] hover-target"
            >
              Download Resume
            </a>
            <button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-8 py-4 w-full sm:w-auto rounded-md bg-white/2 border border-white/10 text-white font-geist font-medium text-sm hover:bg-white/6 hover:border-brand-primary/30 transition-all hover-target"
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Right Column: Hero Image */}
        <div className="lg:col-span-5 flex justify-center items-center relative perspective-1000">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full group">
            {/* Glow effect behind the image */}
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-brand-primary/40 via-brand-tertiary/40 to-brand-secondary/40 shadow-[0_0_80px_rgba(47,217,244,0.3)] animate-glow-pulse -z-10 blur-xl"></div>
            
            {/* Spinning border */}
            <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-spin-slow pointer-events-none"></div>
            
            {/* Image Container */}
            <div className="absolute inset-2 rounded-full overflow-hidden bg-[#0a0f24] border border-white/5 shadow-inner z-10">
              {data.hero.image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.hero.image}
                  alt={data.hero.title}
                  className="w-full h-full object-cover filter group-hover:brightness-110 group-hover:scale-105 transition-all duration-500"
                />
              </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[#8c909f] font-geist text-xs text-center px-4">Upload photo in Admin</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        onClick={handleScrollClick}
        className="opacity-0 translate-y-4 absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer text-[#8c909f] hover:text-white transition-colors duration-300 hover-target"
      >
        <span className="font-geist text-[10px] tracking-[0.25em] font-medium uppercase">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 text-brand-tertiary" />
      </div>
    </section>
  );
}
