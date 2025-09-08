"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Project One",
    description: "Showcases my skills in front-end development.",
    url: "/pictures/FarmPulse.png",
  },
  {
    id: 2,
    title: "Project Two",
    description: "Highlights my experience with back-end technologies.",
    url: "/pictures/FarmPulse.png",
  },
  {
    id: 3,
    title: "Project Three",
    description: "Demonstrates my ability to work with full-stack development.",
    url: "/pictures/FarmPulse.png",
  },
  {
    id: 4,
    title: "Project Four",
    description: "Focuses on my expertise in database management.",
    url: "/pictures/FarmPulse.png",
  },
];

const Projects = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="w-full overflow-hidden py-24 text-white relative" id="project">
      <h1 className="text-4xl text-center font-bold">My Projects</h1>

      <div className="mt-16 relative overflow-hidden w-[1300px] py-5 mx-auto rounded-2xl">
        <motion.div
          className="flex space-x-6"
          animate={{ x: hoveredCard !== null ? "0%" : ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {[...projects, ...projects].map((proj, idx) => (
            <motion.div
              key={idx}
              className="relative min-w-[400px] p-6 rounded-3xl cursor-pointer flex flex-col justify-center items-center bg-white/10 backdrop-blur-md shadow-lg"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Neon Glow Background */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 opacity-10 blur-2xl"></div>

              <AnimatePresence mode="wait">
                {hoveredCard === idx ? (
                  <motion.div
                    key="expanded"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }} // smoother closing
                    className="z-10 text-center flex flex-col items-center justify-center"
                  >
                    <Image
                      src={proj.url ?? "/placeholder.png"}
                      alt={proj.title}
                      width={400}
                      height={250}
                      className="rounded-2xl mb-4"
                    />
                    <h1 className="text-2xl font-bold mb-2">{proj.title}</h1>
                    <p className="text-gray-300 text-[15px]">{proj.description}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="title-only"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }} // smooth exit
                    className="z-10 text-center"
                  >
                    <h1 className="text-2xl font-semibold">{proj.title}</h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
