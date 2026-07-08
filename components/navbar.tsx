"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

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
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        const prevScrollY = lastScrollY.current;
        if (currentScrollY - prevScrollY > 5) {
          setVisible(false); // scroll down → hide
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
          className="fixed left-0 w-full z-50 px-3"
        >
          <motion.ul
            className="flex justify-center items-center bg-white/10 backdrop-blur-md space-x-2 sm:space-x-4 md:space-x-8 p-2.5 sm:p-4 rounded-3xl w-full max-w-[650px] mx-auto shadow-lg relative px-4 sm:px-6 text-xs sm:text-sm"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
