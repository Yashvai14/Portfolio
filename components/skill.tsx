"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const skills = {
  frontend: [
    { name: "Next.js / React.js", level: 92 },
    { name: "TypeScript", level: 90 },
    { name: "Tailwind CSS", level: 93 },
    { name: "HTML5 / CSS3", level: 96 },
  ],
  backend: [
    { name: "FastAPI (Python)", level: 88 },
    { name: "Node.js", level: 82 },
    { name: "PostgreSQL", level: 84 },
    { name: "REST API / JWT / OAuth 2.0", level: 87 },
  ],
  tools: [
    { name: "LangChain / LangGraph", level: 85 },
    { name: "Ollama (Local LLMs)", level: 80 },
    { name: "Telegram / Gmail / Slack APIs", level: 83 },
    { name: "Git / GitHub", level: 92 },
  ],
  platforms: [
    "VS Code", "Postman", "GitHub", "Vercel",
    "n8n", "Supabase", "Ollama", "Prisma"
  ]
};

const Skills = () => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeInOut" },
    }),
  };



  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <section className="text-center text-white py-20 bg-white/5 backdrop-blur-sm border-t border-purple-500/20 relative" id="skills">
      <h2 className="text-3xl font-semibold mb-2">Skills & Technologies</h2>
      <p className="text-gray-400 max-w-2xl mx-auto mb-20">
        A comprehensive overview of my technical expertise and the tools I use to bring ideas to life
      </p>

      {/* Background Blob Wrapper to prevent horizontal overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className='w-[300px] h-[300px] rounded-full absolute animate-pulse blur-3xl opacity-10 left-[5%] bg-blue-600'
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: ["easeInOut"] }}
        />
      </div>

      {/* Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[90%] max-w-[1200px] mx-auto">
        {["frontend", "backend", "tools"].map((cat, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <SkillCard title={cat === "frontend" ? "Frontend Development" : cat === "backend" ? "Backend & APIs" : "AI / Automation"} skills={skills[cat as keyof typeof skills] as { name: string; level: number }[]} />
          </motion.div>
        ))}
      </div>

      {/* Platforms */}
      <div>
        <h3 className="text-3xl font-semibold mt-16 mb-6">Platforms & Tools I Use</h3>
        <motion.div className="mt-12 w-[90%] max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.platforms.map((tool, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={badgeVariants}
              className="bg-blue-800/40 backdrop-blur-sm backdrop-brightness-75 hover:backdrop-brightness-100 p-4 rounded-lg border border-purple-500/30 hover:border-pink-200 transition text-white text-sm font-medium shadow-md"
            >
              {tool}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Currently Learning */}
      <div className="mt-20 max-w-3xl mx-auto relative">
  {/* Background Neon Blobs Wrapper to prevent horizontal overflow */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-500/30 blur-3xl opacity-30"
      animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: ["easeInOut"] }}
    />
    <motion.div
      className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-500/30 blur-3xl opacity-30"
      animate={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: ["easeInOut"] }}
    />
  </div>

  {/* Glass Card */}
  <motion.div 
    className="relative bg-white/5 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8 shadow-lg overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: ["easeOut"] }}
  >
    <h1 className="mb-3 text-3xl font-bold text-white">Currently Learning</h1>
    <p className="text-gray-400 text-sm mb-6">
      I&apos;m always expanding my skillset and staying current with emerging technologies.
    </p>

    <motion.ul className="grid grid-cols-2 gap-4 max-w-md mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {["System Design", "Advanced AI Agents", "C++ DSA", "Machine Learning"].map((item, i) => (
        <motion.li
          key={i}
          custom={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: (i) => ({
              opacity: 1,
              y: 0,
              transition: { delay: i * 0.15, duration: 0.5, ease: ["easeOut"] },
            }),
          }}
          className="relative bg-gradient-to-br from-violet-600 to-blue-600 px-5 py-2 rounded-full text-white font-medium cursor-pointer shadow-lg hover:scale-110 hover:shadow-2xl transition-transform duration-300"
        >
          {/* Glowing Neon Overlay */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-20 blur-xl"></span>
          <span className="relative">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  </motion.div>
</div>

    </section>
  );
};

// SkillCard component with animated progress bars
const SkillCard = ({ title, skills }: { title: string; skills: { name: string; level: number }[] }) => (
  <div className="bg-blue-800/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border backdrop-brightness-75 transform transition-transform duration-300 hover:scale-110 hover:backdrop-brightness-100 border-purple-500/30">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="space-y-4">
      {skills.map((skill, i) => (
        <div key={i}>
          <div className="flex justify-between text-sm mb-1">
            <span>{skill.name}</span>
            <span>{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Skills;
