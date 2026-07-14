"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Set initial off-screen positions
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Hover triggers
    const onMouseEnter = () => {
      gsap.to(ring, {
        scale: 1.8,
        borderColor: "#2fd9f4", // Cyan
        backgroundColor: "rgba(47, 217, 244, 0.05)",
        duration: 0.2,
      });
      gsap.to(dot, {
        scale: 1.5,
        backgroundColor: "#2fd9f4",
        duration: 0.2,
      });
    };

    const onMouseLeave = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(173, 198, 255, 0.4)", // Primary dim
        backgroundColor: "rgba(0, 0, 0, 0)",
        duration: 0.2,
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: "#adc6ff",
        duration: 0.2,
      });
    };

    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, input, select, textarea, [role='button'], .hover-target"
      );
      targets.forEach((target) => {
        target.addEventListener("mouseenter", onMouseEnter);
        target.addEventListener("mouseleave", onMouseLeave);
      });
    };

    addHoverListeners();

    // Create a MutationObserver to watch for dynamic DOM additions
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const targets = document.querySelectorAll(
        "a, button, input, select, textarea, [role='button'], .hover-target"
      );
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", onMouseEnter);
        target.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Small central dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#adc6ff] pointer-events-none z-50 mix-blend-screen"
        style={{ willChange: "transform" }}
      />
      {/* Outer ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[rgba(173,198,255,0.4)] pointer-events-none z-50 hidden md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
