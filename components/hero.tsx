"use client";
import React, { useEffect, useState } from "react";
import { IoMail } from "react-icons/io5";
import { VscGithub } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";

// Typing effect hook
const useTypewriter = (text: string, speed = 50) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
};

const Hero = () => {
  const paragraph = `I am a Full Stack Developer with a passion for creating dynamic and responsive web applications. I have experience in both front-end and back-end development, and I am always eager to learn new technologies and improve my skills.`;

  const typedText = useTypewriter(paragraph, 25);

  return (
    <div className="relative w-full overflow-hidden" id="home">
      {/* Animated Background Blobs */}
      <motion.div
        className="bg-blue-600 h-[300px] w-[300px] blur-3xl rounded-full opacity-20 absolute top-0 left-0"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="bg-purple-600 h-[300px] w-[300px] blur-3xl rounded-full opacity-20 absolute top-20 right-8"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      ></motion.div>
      <motion.div
        className="bg-green-300 h-[300px] w-[300px] blur-3xl rounded-full opacity-20 absolute bottom-5 right-[50%]"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      ></motion.div>

      {/* Main Hero Card */}
      <motion.div
        className="flex justify-between items-center w-[1200px] mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-10 space-x-10 relative z-10 py-16 mt-40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Left Content */}
        <motion.div
          className="flex flex-col justify-center items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className="flex space-x-4 justify-center items-center text-white backdrop-blur-md bg-white/10 p-2 rounded-3xl w-[180px] mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Open To Work</h1>
            <div className="h-4 w-4 bg-green-600 animate-pulse rounded-full"></div>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold mb-5"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hi, I&apos;m
          </motion.h1>
          <motion.h1
            className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-violet-500"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Yash Deepak Vaidya
          </motion.h1>
          <motion.h1
            className="text-2xl font-semibold mb-3 text-blue-400"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Full Stack Developer
          </motion.h1>

          {/* Typing Effect Paragraph */}
          <motion.p
            className="w-[56%] text-gray-400 text-[15px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {typedText.split(" ").map((word, idx) => {
              const highlightWords = ["Full " ,"Stack ","Developer", "web ","applications", "front-end", "back-end", "technologies"];
              const shouldHighlight = highlightWords.some((w) =>
                word.includes(w.split(" ")[0])
              );
              return (
                <span
                  key={idx}
                  className={shouldHighlight ? "text-purple-400 font-semibold" : ""}
                >
                  {word}{" "}
                </span>
              );
            })}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mt-8 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <button className="bg-gradient-to-br from-violet-500 to-blue-800 text-white px-4 py-2 rounded-lg hover:scale-105 transition duration-300 font-bold">
              Download Resume
            </button>
            <button className="text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300 ml-4 border border-gray-400">
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        {/* Right Image & Social */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="h-[300px] w-[300px] bg-gray-400 rounded-3xl mb-6"></div>
          <div className="flex space-x-6 text-3xl text-gray-300 justify-center items-center">
            <IoMail className="hover:text-white cursor-pointer" />
            <VscGithub className="hover:text-white cursor-pointer" />
            <FaLinkedin className="hover:text-white cursor-pointer" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
