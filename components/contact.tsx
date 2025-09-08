"use client";
import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { 
    transition: { staggerChildren: 0.1 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Contact() {
  return (
    <motion.section
      className="flex items-center justify-center px-4 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants} id="contact"
    >
      <motion.div
        className="max-w-5xl w-full grid md:grid-cols-2 gap-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl"
        variants={containerVariants}
      >
        {/* Left Side - Contact Form */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <motion.h2 className="text-3xl font-bold text-white" variants={itemVariants}>
            Send a Message
          </motion.h2>
          <motion.form className="space-y-4" variants={containerVariants}>
            <motion.div className="grid grid-cols-2 gap-4" variants={containerVariants}>
              <motion.input
                type="text"
                placeholder="Your name"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                variants={itemVariants}
              />
              <motion.input
                type="email"
                placeholder="your.email@example.com"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                variants={itemVariants}
              />
            </motion.div>
            <motion.input
              type="text"
              placeholder="What's this about?"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              variants={itemVariants}
            />
            <motion.textarea
              placeholder="Tell me about your project..."
              rows={4}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              variants={itemVariants}
            />
            <motion.button
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-violet-500 rounded-lg text-white font-semibold hover:opacity-90 transition"
              variants={itemVariants}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Right Side - Info */}
        <motion.div className="space-y-6 text-white" variants={itemVariants}>
          <motion.h2 className="text-3xl font-bold" variants={itemVariants}>
            Contact Information
          </motion.h2>
          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg" variants={itemVariants}>
              <Mail className="w-5 h-5" /> vaidyayash36@gmail.com
            </motion.div>
            <motion.div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg" variants={itemVariants}>
              <Phone className="w-5 h-5" /> +91-7517993207
            </motion.div>
            <motion.div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg" variants={itemVariants}>
              <MapPin className="w-5 h-5" /> Nagpur, Maharashtra, India
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-3">Connect With Me</h3>
            <motion.div className="flex gap-4" variants={containerVariants}>
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="p-3 bg-white/10 rounded-lg hover:bg-white/20"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  variants={itemVariants}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Availability */}
          <motion.div className="bg-white/10 p-4 rounded-lg" variants={itemVariants}>
            <div className="flex items-center gap-2 text-green-400 font-medium">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              Available for new projects
            </div>
            <p className="text-sm text-gray-200 mt-2">
              I’m currently accepting new client projects and collaborations. Let’s discuss how I can help bring your vision to life.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
