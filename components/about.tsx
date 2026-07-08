"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <div className="w-[1200px] mx-auto my-20 relative" id="about">
      {/* Background Neon Blobs */}
      <motion.div
        className="bg-purple-500 h-[300px] w-[300px] blur-3xl rounded-full absolute -top-20 -left-20 opacity-20"
        whileInView={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="bg-blue-500 h-[300px] w-[300px] blur-3xl rounded-full absolute -bottom-20 right-0 opacity-20"
        whileInView={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <div className="py-16 flex flex-col">
        <motion.h1
          className="text-center text-4xl mb-20 text-white"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          About Me
        </motion.h1>

        <div className="flex justify-between items-center space-x-10 gap-10 relative">
          {/* Image Box with Floating Animation */}
          {/* Styled Profile Card */}
          <motion.div
            className="h-[300px] w-[300px] rounded-3xl relative border border-white/20 overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: [50, -20, 50], opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/pictures/Porfolio pic.png"
              alt="Yash Vaidya"
              fill
              className="object-cover"
              unoptimized
            />
          </motion.div>

          {/* Text Content with Staggered Fade-In */}
          <motion.div
            className="flex flex-col space-y-6 text-gray-400 text-[15px] w-[59%]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.3 } },
            }}
          >
            <motion.h2
              className="text-white text-2xl"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              Full Stack Developer · AI & Automation
            </motion.h2>
            <motion.p
              className="text-justify"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              Hello! I’m Yash, a final-year Computer Engineering student from SSIT, Nagpur, with hands-on experience building full stack web applications, SaaS platforms, and AI-powered automation tools using Next.js, FastAPI, PostgreSQL, and LangChain.
            </motion.p>
            <motion.p
              className="text-justify"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              During my internship at InternPro (May–Nov 2025), I built the company’s main business website, an LMS platform, a logistics operations dashboard with RBAC, and an e-commerce admin panel with Razorpay integration. I also set up n8n-based automation workflows for client onboarding pipelines.
            </motion.p>
            <motion.p
              className="text-justify"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              I’m currently exploring Artificial Intelligence and Machine Learning — building multi-agent pipelines with LangChain & LangGraph, hosting local LLMs via Ollama, and integrating AI automation into real-world applications. I won 1st Prize at InnoSpark and presented at NCIETE-2026 (IEEE format).
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
