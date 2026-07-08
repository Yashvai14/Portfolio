"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { 
    transition: { staggerChildren: 0.1 } 
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ fill: "currentColor" }} {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" style={{ fill: "currentColor" }} />
  </svg>
);

const socialLinks = [
  { Icon: Github, href: "https://github.com/Yashvai14", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/yash-vaidya-417188262", label: "LinkedIn" },
  { Icon: XIcon, href: "https://x.com/Yashvaidyaa", label: "X (formerly Twitter)" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

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

          {/* Status Toast */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 bg-green-500/20 border border-green-500/40 text-green-400 p-4 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">Message sent successfully! I&apos;ll get back to you soon.</span>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 bg-red-500/20 border border-red-500/40 text-red-400 p-4 rounded-xl"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">Failed to send message. Please try emailing me directly.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form className="space-y-4" variants={containerVariants} onSubmit={handleSubmit}>
            <motion.div className="grid grid-cols-2 gap-4" variants={containerVariants}>
              <motion.input
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                disabled={status === "loading"}
                variants={itemVariants}
              />
              <motion.input
                type="email"
                placeholder="your.email@example.com"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                disabled={status === "loading"}
                variants={itemVariants}
              />
            </motion.div>
            <motion.input
              type="text"
              placeholder="What's this about?"
              required
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              disabled={status === "loading"}
              variants={itemVariants}
            />
            <motion.textarea
              placeholder="Tell me about your project..."
              rows={4}
              required
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              disabled={status === "loading"}
              variants={itemVariants}
            />
            <motion.button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-violet-500 rounded-lg text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              variants={itemVariants}
              whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
            >
              {status === "loading" ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
              ) : (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Right Side - Info */}
        <motion.div className="space-y-6 text-white" variants={itemVariants}>
          <motion.h2 className="text-3xl font-bold" variants={itemVariants}>
            Contact Information
          </motion.h2>
          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.a
              href="mailto:vaidyayash36@gmail.com"
              className="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              variants={itemVariants}
            >
              <Mail className="w-5 h-5 text-blue-400" /> vaidyayash36@gmail.com
            </motion.a>
            <motion.a
              href="tel:+917517993207"
              className="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              variants={itemVariants}
            >
              <Phone className="w-5 h-5 text-blue-400" /> +91-7517993207
            </motion.a>
            <motion.div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg" variants={itemVariants}>
              <MapPin className="w-5 h-5 text-blue-400" /> Nagpur, Maharashtra, India
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-3">Connect With Me</h3>
            <motion.div className="flex gap-4" variants={containerVariants}>
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
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
              I’m a fresher (2026 graduate) actively looking for full-time opportunities in full stack development and AI/automation engineering. Let’s build something great together.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
