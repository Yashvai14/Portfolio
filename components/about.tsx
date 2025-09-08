"use client";
import React from "react";
import { motion } from "framer-motion";

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
          <motion.div
            className="h-[300px] w-[300px] bg-gray-400 rounded-3xl relative"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: [50, -20, 50], opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="bg-violet-600 h-[300px] w-[300px] blur-3xl rounded-full opacity-20 absolute -top-10 -left-10"
              whileInView={{ x: [0, 20, 0], y: [0, -20, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
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
              Passionate Web Developer & Exploring AI/ML
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              Hello! I’m Yash, a passionate Computer Engineering student with a strong foundation in web development, software engineering, and AI-driven solutions.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              I’ve gained hands-on experience through an internship at InternPro Tech, multiple hackathons, and organizing tech events that challenged me to solve real-world problems with creativity and code. I’ve also completed a Web Development Bootcamp, solidifying my expertise in frontend and backend development, scalable architectures, and modern frameworks.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              Currently, I’m diving deep into Artificial Intelligence and Machine Learning, exploring areas like AI-powered automation, predictive modeling, and intelligent systems integration. I enjoy experimenting with projects that combine full-stack development and AI, bridging the gap between practical applications and emerging technologies.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
