"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Services", id: "services" },
  { label: "Blog", id: "blog", path: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.filter(item => !item.path).map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (id: string, path?: string) => {
    setIsOpen(false);
    
    if (path) {
      router.push(path);
      return;
    }

    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || pathname !== "/" ? "glass-nav py-4 bg-[#050816]/90 border-b border-white/5 backdrop-blur-md" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => handleNavClick("home")}
          className="text-xl font-bold font-geist tracking-tight text-white cursor-pointer flex items-center gap-2 hover-target"
        >
          Yash <span className="text-brand-tertiary">Vaidya</span>
        </div>

        {/* Desktop Menu */}
        <div className="md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = item.path ? pathname === item.path : activeSection === item.id && pathname === "/";
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.path)}
                className={`relative font-geist text-sm font-medium tracking-wide transition-colors hover:text-white cursor-pointer pb-1 hover-target ${
                  isActive ? "text-white" : "text-[#c2c6d6]"
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-tertiary rounded-full"
                    style={{
                      boxShadow: "0 0 10px #2fd9f4, 0 0 20px #2fd9f4",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand-primary text-brand-primary-dark font-geist text-xs font-semibold hover:bg-white hover:text-black transition-all hover:shadow-[0_0_20px_rgba(173,198,255,0.4)] hover-target"
          >
            Book a Call <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-brand-tertiary transition-colors cursor-pointer hover-target"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] bg-brand-bg/95 border-b border-white/5 backdrop-blur-xl transition-all duration-300 ease-in-out z-30 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4 p-6">
          {navItems.map((item) => {
            const isActive = item.path ? pathname === item.path : activeSection === item.id && pathname === "/";
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.path)}
                className={`text-left font-geist text-base font-medium py-2 border-b border-white/5 ${
                  isActive ? "text-brand-tertiary" : "text-[#c2c6d6]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
            className="flex items-center justify-center gap-1.5 px-4 py-3 mt-2 rounded-md bg-brand-primary text-brand-primary-dark font-geist text-sm font-semibold text-center"
          >
            Book a Call <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}
