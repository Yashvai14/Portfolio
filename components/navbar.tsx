"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#project" },
  { name: "Contact", href: "/#contact" },
  { name: "Blog", href: "/blog" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        const prevScrollY = lastScrollY.current;
        if (currentScrollY - prevScrollY > 5) {
          setVisible(false); // scroll down → hide
          setIsOpen(false); // also close mobile dropdown
        } else if (prevScrollY - currentScrollY > 5) {
          setVisible(true); // scroll up → show
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 40, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="fixed inset-x-0 z-50 px-3 flex flex-col items-center"
        >
          {/* Desktop Navbar */}
          <motion.ul
            className="hidden md:flex justify-center items-center  bg-white/10 backdrop-blur-md space-x-2 sm:space-x-4 md:space-x-8 p-2.5 sm:p-4 rounded-3xl w-full max-w-[650px] shadow-lg relative px-4 sm:px-6 text-xs sm:text-sm border border-white/10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {navLinks.map((link) => (
              <motion.li
                key={link.name}
                className="relative text-white cursor-pointer px-2 sm:px-3 py-1 rounded-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={link.href}>
                  <span
                    className={`relative z-10 ${pathname === link.href ? "text-blue-400 font-bold" : ""
                      }`}
                  >
                    {link.name}
                  </span>
                </Link>

                {/* Animated underline / highlight on hover or active */}
                <motion.div
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  animate={{
                    opacity: pathname === link.href ? 1 : 0,
                    scaleX: pathname === link.href ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </motion.li>
            ))}
          </motion.ul>

          {/* Mobile Navbar Header */}
          <motion.div
            className="flex md:hidden justify-between items-center bg-white/10 backdrop-blur-md p-3 px-6 rounded-3xl w-full max-w-[90%] shadow-lg border border-white/10 text-white relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-bold text-sm tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              YASH VAIDYA
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.div>

          {/* Mobile Dropdown Menu overlay */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-16 w-[90%] bg-[#0a0f1e]/95 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col space-y-4 md:hidden mt-2 z-40"
              >
                <ul className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block text-center text-white py-2.5 rounded-xl hover:bg-white/5 transition-all text-sm font-medium ${
                          pathname === link.href ? "text-blue-400 font-bold bg-white/5" : ""
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
