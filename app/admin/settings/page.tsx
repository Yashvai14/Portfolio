"use client";

import React, { useState, useEffect } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";
import {
  Save,
  Plus,
  Trash2,
  Sliders,
  Briefcase,
  Layers,
  Cpu,
  Settings,
  Share2,
  FolderOpen,
  CornerDownRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

export default function AdminPanel() {
  const { data, loading, updateData } = usePortfolioData();
  const [localData, setLocalData] = useState<typeof data | null>(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (data) {
      setLocalData(JSON.parse(JSON.stringify(data)));
    }
  }, [data]);

  if (loading || !localData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050816]">
        <div className="w-10 h-10 rounded-full border-2 border-brand-tertiary border-t-transparent animate-spin" />
        <span className="font-geist text-xs text-[#8c909f] mt-4">Connecting to PostgreSQL Database...</span>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const success = await updateData(localData);
      if (success) {
        setSaveStatus("success");
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const handleHeroChange = (key: string, value: string) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        hero: {
          ...prev.hero,
          [key]: value,
        },
      };
    });
  };

  const handleSocialChange = (key: string, value: string) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        socials: {
          ...prev.socials,
          [key]: value,
        },
      };
    });
  };

  // Projects handlers
  const handleProjectChange = (idx: number, key: string, value: unknown) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      const updatedProjects = [...prev.projects];
      updatedProjects[idx] = {
        ...updatedProjects[idx],
        [key]: value,
      };
      return { ...prev, projects: updatedProjects };
    });
  };

  const addProject = () => {
    setLocalData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        projects: [
          ...prev.projects,
          {
            id: `project-${Date.now()}`,
            title: "New Dynamic Project",
            description: "Describe your high-performance engineering solution here.",
            tags: ["React", "Tailwind", "PostgreSQL"],
            image: "",
            linkDemo: "",
            linkSource: "",
            type: "Live Demo",
          },
        ],
      };
    });
  };

  const deleteProject = (idx: number) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        projects: prev.projects.filter((_, i) => i !== idx),
      };
    });
  };

  // Services handlers
  const handleServiceChange = (idx: number, key: string, value: unknown) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      const updatedServices = [...prev.services];
      updatedServices[idx] = {
        ...updatedServices[idx],
        [key]: value,
      };
      return { ...prev, services: updatedServices };
    });
  };

  // Experience handlers
  const handleExpChange = (idx: number, key: string, value: unknown) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      const updatedExp = [...prev.experience];
      updatedExp[idx] = {
        ...updatedExp[idx],
        [key]: value,
      };
      return { ...prev, experience: updatedExp };
    });
  };

  const addExperience = () => {
    setLocalData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        experience: [
          ...prev.experience,
          {
            date: "2026 - Present",
            role: "New Role",
            company: "Company Name",
            bullets: ["Description bullet point 1.", "Description bullet point 2."],
          },
        ],
      };
    });
  };

  const deleteExperience = (idx: number) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        experience: prev.experience.filter((_, i) => i !== idx),
      };
    });
  };

  const addBullet = (expIdx: number) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      const updatedExp = [...prev.experience];
      updatedExp[expIdx] = {
        ...updatedExp[expIdx],
        bullets: [...updatedExp[expIdx].bullets, "New description point."],
      };
      return { ...prev, experience: updatedExp };
    });
  };

  const updateBullet = (expIdx: number, bulletIdx: number, value: string) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      const updatedExp = [...prev.experience];
      const updatedBullets = [...updatedExp[expIdx].bullets];
      updatedBullets[bulletIdx] = value;
      updatedExp[expIdx] = { ...updatedExp[expIdx], bullets: updatedBullets };
      return { ...prev, experience: updatedExp };
    });
  };

  const deleteBullet = (expIdx: number, bulletIdx: number) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      const updatedExp = [...prev.experience];
      updatedExp[expIdx] = {
        ...updatedExp[expIdx],
        bullets: updatedExp[expIdx].bullets.filter((_, i) => i !== bulletIdx),
      };
      return { ...prev, experience: updatedExp };
    });
  };

  // Taxonomies handlers
  const handleTaxonomyChange = (idx: number, key: string, value: unknown) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      if (!prev.taxonomies) return prev;
      const updatedTax = [...prev.taxonomies];
      updatedTax[idx] = {
        ...updatedTax[idx],
        [key]: value,
      };
      return { ...prev, taxonomies: updatedTax };
    });
  };

  // Stats handlers
  const handleStatChange = (idx: number, key: string, value: unknown) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      const updatedStats = [...prev.stats];
      updatedStats[idx] = {
        ...updatedStats[idx],
        [key]: value,
      };
      return { ...prev, stats: updatedStats };
    });
  };

  const menuItems = [
    { id: "hero", label: "Hero Banner", icon: <Cpu className="w-4 h-4" /> },
    { id: "projects", label: "Projects Showcase", icon: <FolderOpen className="w-4 h-4" /> },
    { id: "experience", label: "Professional Narrative", icon: <Briefcase className="w-4 h-4" /> },
    { id: "services", label: "Services Provided", icon: <Settings className="w-4 h-4" /> },
    { id: "taxonomies", label: "Tech Taxonomy", icon: <Layers className="w-4 h-4" /> },
    { id: "stats", label: "Stats & Socials", icon: <Share2 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-[#dae2fd] p-6 font-inter">
      {/* Top Navbar */}
      <div className="max-w-6xl mx-auto flex justify-between items-center border-b border-white/5 pb-5 mb-8">
        <div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-[#8c909f] hover:text-white transition-colors hover-target mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
          </Link>
          <h1 className="text-2xl font-bold font-geist text-white flex items-center gap-2">
            Portfolio Settings <span className="text-brand-tertiary">Admin Dashboard</span>
          </h1>
        </div>

        {/* Save Indicators */}
        <div className="flex items-center gap-4">
          {saveStatus === "success" && (
            <span className="text-xs text-brand-tertiary font-geist font-semibold animate-pulse">
              ✓ Database Synced Successfully!
            </span>
          )}
          {saveStatus === "error" && (
            <span className="text-xs text-brand-error font-geist font-semibold animate-pulse">
              ⨯ Failed to sync database!
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded bg-brand-primary text-brand-primary-dark font-geist text-xs font-bold hover:bg-white hover:text-black transition-all disabled:opacity-50 hover-target"
          >
            <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side Menu Tabs */}
        <div className="md:col-span-3 flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded text-left font-geist text-xs font-semibold tracking-wide transition-all border hover-target ${
                activeTab === item.id
                  ? "bg-brand-primary/10 border-brand-primary text-white"
                  : "bg-white/2 border-white/5 text-[#8c909f] hover:bg-white/4 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Side Settings Area */}
        <div className="md:col-span-9 glass-card p-8 rounded-lg relative overflow-hidden">
          
          {/* TAB 1: HERO */}
          {activeTab === "hero" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-lg font-bold font-geist text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-brand-tertiary" /> Hero Banner Text Content
              </h2>
              
              <ImageUpload
                label="Hero Profile Image"
                value={localData.hero.image || ""}
                onChange={(url) => handleHeroChange("image", url)}
              />

              <div className="flex flex-col gap-1.5">
                <label className="font-geist text-[10px] tracking-wider font-bold text-[#8c909f] uppercase">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={localData.hero.badgeText}
                  onChange={(e) => handleHeroChange("badgeText", e.target.value)}
                  placeholder="Badge placeholder"
                  className="px-4 py-3 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white focus:outline-none focus:border-brand-tertiary focus:ring-1 focus:ring-brand-tertiary/30 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-geist text-[10px] tracking-wider font-bold text-[#8c909f] uppercase">
                  Hero Title
                </label>
                <input
                  type="text"
                  value={localData.hero.title}
                  onChange={(e) => handleHeroChange("title", e.target.value)}
                  placeholder="Hero main title"
                  className="px-4 py-3 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white focus:outline-none focus:border-brand-tertiary focus:ring-1 focus:ring-brand-tertiary/30 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-geist text-[10px] tracking-wider font-bold text-[#8c909f] uppercase">
                    Left Subtitle Pillar
                  </label>
                  <input
                    type="text"
                    value={localData.hero.subtitle1}
                    onChange={(e) => handleHeroChange("subtitle1", e.target.value)}
                    placeholder="Subtitle 1"
                    className="px-4 py-3 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white focus:outline-none focus:border-brand-tertiary focus:ring-1 focus:ring-brand-tertiary/30 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-geist text-[10px] tracking-wider font-bold text-[#8c909f] uppercase">
                    Right Subtitle Pillar
                  </label>
                  <input
                    type="text"
                    value={localData.hero.subtitle2}
                    onChange={(e) => handleHeroChange("subtitle2", e.target.value)}
                    placeholder="Subtitle 2"
                    className="px-4 py-3 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white focus:outline-none focus:border-brand-tertiary focus:ring-1 focus:ring-brand-tertiary/30 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === "projects" && (
            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold font-geist text-white flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-brand-primary" /> Projects Showcase cards
                </h2>
                <button
                  onClick={addProject}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-brand-tertiary text-brand-tertiary-dark font-geist text-[10px] font-bold hover:shadow-[0_0_15px_rgba(47,217,244,0.3)] transition-all hover-target"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {localData.projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="p-6 rounded border border-white/5 bg-white/1 flex flex-col gap-4 relative">
                    <button
                      onClick={() => deleteProject(idx)}
                      className="absolute top-4 right-4 text-[#8c909f] hover:text-brand-error transition-colors hover-target"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                          className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Project Tagline / Type
                        </label>
                        <input
                          type="text"
                          value={proj.type}
                          onChange={(e) => handleProjectChange(idx, "type", e.target.value)}
                          className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                        Description
                      </label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                        rows={3}
                        className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white resize-none"
                      />
                    </div>

                    {/* Image Upload */}
                    <ImageUpload
                      label="Cover Image"
                      value={proj.image ?? ""}
                      onChange={(url) => handleProjectChange(idx, "image", url)}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Demo Link
                        </label>
                        <input
                          type="text"
                          value={proj.linkDemo}
                          onChange={(e) => handleProjectChange(idx, "linkDemo", e.target.value)}
                          placeholder="e.g. #demo"
                          className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Source Link
                        </label>
                        <input
                          type="text"
                          value={proj.linkSource}
                          onChange={(e) => handleProjectChange(idx, "linkSource", e.target.value)}
                          placeholder="e.g. https://github.com/..."
                          className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={proj.tags.join(", ")}
                          onChange={(e) =>
                            handleProjectChange(
                              idx,
                              "tags",
                              e.target.value.split(",").map((s) => s.trim())
                            )
                          }
                          className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EXPERIENCE */}
          {activeTab === "experience" && (
            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold font-geist text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-brand-secondary" /> Experience Narrative Timeline
                </h2>
                <button
                  onClick={addExperience}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-brand-primary text-brand-primary-dark font-geist text-[10px] font-bold hover-target"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Experience
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {localData.experience.map((exp, idx) => (
                  <div key={idx} className="p-6 rounded border border-white/5 bg-white/1 flex flex-col gap-4 relative">
                    <button
                      onClick={() => deleteExperience(idx)}
                      className="absolute top-4 right-4 text-[#8c909f] hover:text-brand-error transition-colors hover-target"
                      title="Delete Role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Role Title
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleExpChange(idx, "role", e.target.value)}
                          className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExpChange(idx, "company", e.target.value)}
                          className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Dates
                        </label>
                        <input
                          type="text"
                          value={exp.date}
                          onChange={(e) => handleExpChange(idx, "date", e.target.value)}
                          className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Role Bullet Points
                        </label>
                        <button
                          type="button"
                          onClick={() => addBullet(idx)}
                          className="flex items-center gap-1 text-[8px] font-bold font-geist text-brand-tertiary hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" /> Add Point
                        </button>
                      </div>

                      <div className="flex flex-col gap-2">
                        {exp.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-2 items-center">
                            <CornerDownRight className="w-4 h-4 text-brand-primary/50 shrink-0" />
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => updateBullet(idx, bIdx, e.target.value)}
                              className="flex-1 px-3 py-2 rounded bg-[#050816] border border-white/5 font-geist text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() => deleteBullet(idx, bIdx)}
                              className="text-[#8c909f] hover:text-brand-error transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === "services" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-lg font-bold font-geist text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-brand-tertiary" /> Services Provided
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                {localData.services.map((service, idx) => (
                  <div key={idx} className="p-6 rounded border border-white/5 bg-white/1 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Index / Num
                        </label>
                        <input
                          type="text"
                          value={service.num}
                          onChange={(e) => handleServiceChange(idx, "num", e.target.value)}
                          className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Service Title
                        </label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => handleServiceChange(idx, "title", e.target.value)}
                          className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                        Description
                      </label>
                      <textarea
                        value={service.description}
                        onChange={(e) => handleServiceChange(idx, "description", e.target.value)}
                        rows={2}
                        className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TAXONOMIES */}
          {activeTab === "taxonomies" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-lg font-bold font-geist text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-primary" /> Tech Stack Taxonomies
              </h2>
              
              {localData.taxonomies && (
                <div className="flex flex-col gap-6">
                  {localData.taxonomies.map((tax, idx) => (
                    <div key={idx} className="p-6 rounded border border-white/5 bg-white/1 flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                            Taxonomy Title
                          </label>
                          <input
                            type="text"
                            value={tax.title}
                            onChange={(e) => handleTaxonomyChange(idx, "title", e.target.value)}
                            className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                            Category Header
                          </label>
                          <input
                            type="text"
                            value={tax.category}
                            onChange={(e) => handleTaxonomyChange(idx, "category", e.target.value)}
                            className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Skills List (comma separated)
                        </label>
                        <input
                          type="text"
                          value={tax.skills.join(", ")}
                          onChange={(e) =>
                            handleTaxonomyChange(
                              idx,
                              "skills",
                              e.target.value.split(",").map((s) => s.trim())
                            )
                          }
                          className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
                          Short Description
                        </label>
                        <textarea
                          value={tax.description}
                          onChange={(e) => handleTaxonomyChange(idx, "description", e.target.value)}
                          rows={2}
                          className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: STATS & SOCIALS */}
          {activeTab === "stats" && (
            <div className="flex flex-col gap-8">
              {/* Stats Block */}
              <div className="flex flex-col gap-5">
                <h3 className="text-base font-bold font-geist text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-brand-tertiary" /> Numerical Stats Indicators
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {localData.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded border border-white/5 bg-white/1 flex flex-col gap-3">
                      <span className="font-mono text-[9px] text-[#8c909f] block uppercase">
                        Stat {idx + 1}: {stat.label}
                      </span>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <label className="font-geist text-[8px] text-[#8c909f] block mb-1">LABEL</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="font-geist text-[8px] text-[#8c909f] block mb-1">VALUE</label>
                          <input
                            type="number"
                            value={stat.val}
                            onChange={(e) => handleStatChange(idx, "val", parseInt(e.target.value || "0", 10))}
                            className="w-full px-2.5 py-1.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Socials Connection Block */}
              <div className="flex flex-col gap-5 border-t border-white/5 pt-6">
                <h3 className="text-base font-bold font-geist text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-brand-secondary" /> Connection Social URLs
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-geist text-[10px] tracking-wider font-bold text-[#8c909f] uppercase">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={localData.socials.linkedin}
                      onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                      className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="font-geist text-[10px] tracking-wider font-bold text-[#8c909f] uppercase">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={localData.socials.github}
                      onChange={(e) => handleSocialChange("github", e.target.value)}
                      className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-geist text-[10px] tracking-wider font-bold text-[#8c909f] uppercase">
                      Twitter / X URL
                    </label>
                    <input
                      type="text"
                      value={localData.socials.twitter}
                      onChange={(e) => handleSocialChange("twitter", e.target.value)}
                      className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-geist text-[10px] tracking-wider font-bold text-[#8c909f] uppercase">
                      Calendly Schedule URL
                    </label>
                    <input
                      type="text"
                      value={localData.socials.calendly}
                      onChange={(e) => handleSocialChange("calendly", e.target.value)}
                      className="px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
