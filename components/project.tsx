"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FolderGit2, ExternalLink, Github, X } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  tags: string[];
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Projects = ({ projects = [] }: { projects?: Project[] }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Disable body scroll when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section className="w-full py-24 text-white relative" id="project">
      {/* Section heading */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-3">My Projects</h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm">
          A selection of things I&apos;ve built — from full stack apps to AI-powered platforms.
        </p>
      </motion.div>

      {projects.length === 0 ? (
        <div className="mt-8 text-center text-gray-500">
          <FolderGit2 className="w-14 h-14 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No projects added yet.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setSelectedProject(proj)}
              className="group relative flex flex-col bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-300 shadow-lg cursor-pointer"
            >
              {/* Neon glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Project image */}
              <div className="relative w-full h-44 overflow-hidden bg-white/5">
                {proj.imageUrl ? (
                  <Image
                    src={proj.imageUrl}
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderGit2 className="w-12 h-12 text-gray-600" />
                  </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                  {proj.description}
                </p>

                {/* Tags */}
                {proj.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {proj.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3 mt-5 pt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating Popup Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-[#0b0f19] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/80 text-white/80 hover:text-white p-2 rounded-full border border-white/10 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto w-full flex-grow">
                {/* Project Image */}
                <div className="relative w-full h-64 sm:h-80 bg-white/5 border-b border-white/10">
                  {selectedProject.imageUrl ? (
                    <Image
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FolderGit2 className="w-16 h-16 text-gray-500" />
                    </div>
                  )}
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {selectedProject.title}
                    </h3>

                    {/* Tags */}
                    {selectedProject.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/25"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                    {selectedProject.description}
                  </div>

                  {/* Footer Links */}
                  <div className="flex gap-4 pt-4 border-t border-white/5">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/15"
                      >
                        <Github className="w-4 h-4" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

