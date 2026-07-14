"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Zap,
  Layout,
  Rocket,
  Calendar,
  ArrowRight,
  Send,
  CheckCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/BrandIcons";
import gsapInstance from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioData } from "@/context/PortfolioDataContext";

gsapInstance.registerPlugin(ScrollTrigger);

export default function ServicesContact() {
  const { data, loading } = usePortfolioData();
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "AI Automation",
    details: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (loading) return;

    const ctx = gsapInstance.context(() => {
      // Header reveal
      gsapInstance.fromTo(
        ".services-header",
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: ".services-header",
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Services Cards
      gsapInstance.fromTo(
        ".service-card",
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Contact Form & Info Columns
      gsapInstance.fromTo(
        ".contact-col",
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
        }
      );
    }, containerRef);

    // Refresh ScrollTrigger after a short delay to account for layout shifts
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      ctx.revert();
      clearTimeout(t);
    };
  }, [loading]);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", service: "AI Automation", details: "" });

      // Animate success box entry
      if (successRef.current) {
        gsapInstance.fromTo(
          successRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
        );
      }
    }, 1500);
  };

  const getServiceIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Sparkles className="w-5 h-5 text-brand-tertiary" />;
      case 1:
        return <Zap className="w-5 h-5 text-brand-primary" />;
      case 2:
        return <Layout className="w-5 h-5 text-brand-secondary" />;
      case 3:
        return <Rocket className="w-5 h-5 text-brand-tertiary" />;
      default:
        return <Sparkles className="w-5 h-5 text-brand-primary" />;
    }
  };

  if (loading) {
    return null;
  }

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-20 md:py-32 px-6 relative max-w-6xl mx-auto z-10"
    >
      {/* Background glowing aurora */}
      <div className="absolute bottom-[20%] left-[-15%] w-[450px] h-[450px] rounded-full aurora-blue opacity-25 blur-[130px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="services-header mb-16 md:mb-24 opacity-0">
        <h2 className="text-3xl md:text-5xl font-bold font-geist text-white tracking-tight leading-tight mb-4">
          What I Can <span className="text-brand-secondary italic">Build for You</span>
        </h2>
        <p className="max-w-2xl text-base text-[#c2c6d6] leading-relaxed">
          From AI-powered automation workflows to full-stack web applications, I bring technical expertise to turn ideas into functional, real-world solutions.
        </p>
      </div>

      {/* Services Grid */}
      <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
        {data.services.map((service, idx) => (
          <div
            key={idx}
            className="service-card opacity-0 glass-card p-8 rounded-lg relative overflow-hidden flex items-start gap-5 group"
          >
            <div className="shrink-0 w-10 h-10 rounded-md bg-white/3 border border-white/5 flex items-center justify-center group-hover:border-brand-tertiary/40 group-hover:bg-brand-tertiary/5 transition-colors duration-300">
              {getServiceIcon(idx)}
            </div>
            <div>
              <span className="font-mono text-xs text-brand-primary/40 block mb-1">
                {service.num}
              </span>
              <h3 className="text-lg font-bold font-geist text-white mb-2 group-hover:text-brand-tertiary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-xs text-[#c2c6d6] leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div id="contact" className="contact-grid grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-start">
        {/* Contact Info (Left) */}
        <div className="contact-col opacity-0 lg:col-span-2">
          <h2 className="text-3xl md:text-4xl font-bold font-geist text-white leading-tight mb-4">
            Let&apos;s Build Something <span className="text-brand-primary italic">Amazing</span> Together
          </h2>
          <p className="text-[#c2c6d6] text-sm leading-relaxed mb-8">
            I’m a fresher (2026 graduate) actively looking for full-time opportunities in full stack development and AI/automation engineering. Let’s build something great together.
          </p>

          <div className="flex flex-col gap-6 mb-10">
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full bg-white/3 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-brand-tertiary/40 transition-colors">
                <Calendar className="w-4 h-4 text-brand-tertiary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold font-geist text-white mb-1">Availability</h4>
                <p className="text-xs text-[#8c909f]">Available for new projects</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full bg-white/3 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-brand-primary/40 transition-colors">
                <Zap className="w-4 h-4 text-brand-primary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold font-geist text-white mb-1">Contact Information</h4>
                <div className="flex flex-col gap-1">
                  <a href="mailto:vaidyayash36@gmail.com" className="text-xs text-brand-primary hover:text-white transition-colors hover-target">
                    vaidyayash36@gmail.com
                  </a>
                  <a href="tel:+917517993207" className="text-xs text-[#c2c6d6] hover:text-white transition-colors hover-target">
                    +91-7517993207
                  </a>
                  <span className="text-xs text-[#8c909f]">Nagpur, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {data.socials.linkedin && (
              <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/3 border border-white/10 flex items-center justify-center text-[#c2c6d6] hover:bg-brand-primary/10 hover:text-brand-primary hover:border-brand-primary/30 transition-all hover-target">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {data.socials.github && (
              <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/3 border border-white/10 flex items-center justify-center text-[#c2c6d6] hover:bg-white/10 hover:text-white transition-all hover-target">
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {data.socials.twitter && (
              <a href={data.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/3 border border-white/10 flex items-center justify-center text-[#c2c6d6] hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-all hover-target">
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Contact Form (Right) */}
        <div className="contact-col opacity-0 lg:col-span-3">
          <div className="glass-card p-6 md:p-8 rounded-xl relative overflow-hidden">
            {isSubmitted ? (
              <div ref={successRef} className="flex flex-col items-center justify-center text-center py-16 h-full min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-brand-tertiary/20 flex items-center justify-center mb-6 border border-brand-tertiary/40">
                  <CheckCircle className="w-8 h-8 text-brand-tertiary" />
                </div>
                <h3 className="text-2xl font-bold font-geist text-white mb-3">Inquiry Sent</h3>
                <p className="text-[#8c909f] text-sm max-w-sm mx-auto mb-8">
                  Thank you for reaching out. I&apos;ll review your project details and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-semibold text-brand-primary hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[11px] font-semibold font-geist text-[#8c909f] uppercase tracking-wider">
                      Name <span className="text-brand-tertiary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-white/2 border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand-primary/50'} rounded-md px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:bg-white/4 transition-all hover-target`}
                      placeholder="Jane Doe"
                    />
                    {errors.name && <span className="text-red-400 text-[10px]">{errors.name}</span>}
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[11px] font-semibold font-geist text-[#8c909f] uppercase tracking-wider">
                      Email <span className="text-brand-tertiary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-white/2 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand-primary/50'} rounded-md px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:bg-white/4 transition-all hover-target`}
                      placeholder="jane@company.com"
                    />
                    {errors.email && <span className="text-red-400 text-[10px]">{errors.email}</span>}
                  </div>
                </div>

                {/* Service Selection */}
                <div className="flex flex-col gap-1.5 mt-1">
                  <label htmlFor="service" className="text-[11px] font-semibold font-geist text-[#8c909f] uppercase tracking-wider">
                    Area of Interest
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-white/2 border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-primary/50 focus:bg-white/4 appearance-none transition-all hover-target cursor-pointer"
                    >
                      {data.services.map((s, i) => (
                        <option key={i} value={s.title} className="bg-brand-container text-white">
                          {s.title}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ArrowRight className="w-4 h-4 text-[#8c909f] rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex flex-col gap-1.5 mt-1">
                  <label htmlFor="details" className="text-[11px] font-semibold font-geist text-[#8c909f] uppercase tracking-wider">
                    Project Details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white/2 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-primary/50 focus:bg-white/4 transition-all resize-none hover-target"
                    placeholder="Tell me about your goals, timeline, and current stack..."
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-white text-[#050816] font-geist font-semibold text-xs hover:bg-brand-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed hover-target"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full border-2 border-[#050816] border-t-transparent animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-3.5 h-3.5" /> Initialize Project
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
