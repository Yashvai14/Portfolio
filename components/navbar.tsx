"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#project" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY - lastScrollY > 5) {
        setVisible(false); // scroll down → hide
      } else if (lastScrollY - currentScrollY > 5) {
        setVisible(true); // scroll up → show
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 40, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="fixed left-0 w-full z-50"
        >
          <motion.ul
            className="flex justify-center items-center bg-white/10 backdrop-blur-md space-x-8 p-4 rounded-3xl w-[450px] mx-auto shadow-lg relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {navLinks.map((link) => (
              <motion.li
                key={link.name}
                className={`relative text-white cursor-pointer px-3 py-1 rounded-lg`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={link.href}>
                  <span
                    className={`relative z-10 ${
                      pathname === link.href ? "text-blue-400 font-bold" : ""
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
