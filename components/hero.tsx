"use client";
import React from "react";
import { VscGithub } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const TypedParagraph = () => {
  const paragraph = `Final-year Computer Engineering student building full stack web applications, SaaS platforms, and AI-powered automation tools using Next.js, FastAPI, PostgreSQL, and LangChain. Built end-to-end products integrating third-party APIs and local LLMs, and led technical initiatives across 200+ peers.`;
  const words = paragraph.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.6,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.p
      className="w-full lg:w-[70%] xl:w-[56%] text-gray-400 text-[15px] flex flex-wrap gap-x-[4px] gap-y-[2px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, idx) => {
        const highlightWords = ["full", "stack", "web", "saas", "ai-powered", "next.js", "fastapi", "postgresql", "langchain", "llms", "apis"];
        const shouldHighlight = highlightWords.some((w) =>
          word.toLowerCase().replace(/[^a-z.]/g, "").includes(w)
        );
        return (
          <motion.span
            key={idx}
            variants={wordVariants}
            className={shouldHighlight ? "text-purple-400 font-semibold inline-block" : "inline-block"}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.p>
  );
};

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden min-h-screen flex flex-col justify-start lg:justify-center items-center pt-24 pb-12 lg:py-0 px-4" id="home">
      {/* Animated Background Blobs */}
      <motion.div
        className="bg-blue-600 h-[200px] w-[200px] md:h-[300px] md:w-[300px] blur-3xl rounded-full opacity-20 absolute top-0 left-0"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="bg-purple-600 h-[200px] w-[200px] md:h-[300px] md:w-[300px] blur-3xl rounded-full opacity-20 absolute top-20 right-8"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      ></motion.div>
      <motion.div
        className="bg-green-300 h-[200px] w-[200px] md:h-[300px] md:w-[300px] blur-3xl rounded-full opacity-20 absolute bottom-5 right-[50%]"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      ></motion.div>

      {/* Main Hero Card */}
      <motion.div
        className="flex flex-col lg:flex-row justify-between items-center w-[90%] max-w-[1200px] mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-10 space-y-10 lg:space-y-0 lg:space-x-10 relative z-10 py-12 md:py-16 mt-0 lg:mt-24"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Mobile-only Open To Work Badge - Order 1 */}
        <motion.div
          className="flex lg:hidden space-x-4 justify-center items-center text-white backdrop-blur-md bg-white/10 p-2 rounded-3xl w-[180px] order-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Open To Work</h1>
          <div className="h-4 w-4 bg-green-600 animate-pulse rounded-full"></div>
        </motion.div>

        {/* Right Image & Social - Order 2 on mobile, Order 2 on desktop */}
        <motion.div
          className="flex flex-col items-center gap-6 order-2 lg:order-2"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Profile Card */}
          <div className="h-[260px] w-[260px] md:h-[300px] md:w-[300px] rounded-3xl overflow-hidden relative border border-white/20">
            <Image
              src="/pictures/Porfolio pic.png"
              alt="Yash Vaidya"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
          <div className="flex space-x-6 text-3xl text-gray-300 justify-center items-center">
            <a href="https://x.com/Yashvaidyaa" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ fill: "currentColor" }} className="w-[1em] h-[1em] hover:text-white cursor-pointer transition-colors">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" style={{ fill: "currentColor" }} />
              </svg>
            </a>
            <a href="https://github.com/Yashvai14" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <VscGithub className="hover:text-white cursor-pointer transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/yash-vaidya-417188262" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="hover:text-white cursor-pointer transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* Left Content - Order 3 on mobile, Order 1 on desktop */}
        <motion.div
          className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-3 lg:order-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Desktop-only Open To Work Badge */}
          <motion.div
            className="hidden lg:flex space-x-4 justify-center items-center text-white backdrop-blur-md bg-white/10 p-2 rounded-3xl w-[180px] mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Open To Work</h1>
            <div className="h-4 w-4 bg-green-600 animate-pulse rounded-full"></div>
          </motion.div>

          <motion.h1
            className="text-2xl md:text-3xl font-bold mb-5"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hi, I&apos;m
          </motion.h1>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-violet-500"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Yash Vaidya
          </motion.h1>
          <motion.h1
            className="text-xl md:text-2xl font-semibold mb-5 text-blue-400"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Full Stack Developer · AI & Automation · Fresher 2026
          </motion.h1>

          {/* Typing Effect Paragraph */}
          <TypedParagraph />

          {/* Buttons */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <a
              href="/Resume/Yash_Vaidya (1).pdf"
              download="Yash_Vaidya_Resume.pdf"
              className="bg-gradient-to-br from-violet-500 to-blue-800 text-white px-4 py-2.5 rounded-lg hover:scale-105 transition duration-300 font-bold text-sm"
            >
              Download Resume
            </a>
            <Link
              href="/#contact"
              className="text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition duration-300 border border-gray-400 text-sm"
            >
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;

