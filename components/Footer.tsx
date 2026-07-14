"use client";

import { usePortfolioData } from "@/context/PortfolioDataContext";

export default function Footer() {
  const { data, loading } = usePortfolioData();

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) return null;

  return (
    <footer className="border-t border-white/5 bg-[#050816] py-12 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div
            onClick={handleLogoClick}
            className="text-lg font-bold font-geist text-white cursor-pointer hover-target"
          >
            Yash <span className="text-brand-tertiary">Vaidya</span>
          </div>
          <p className="text-[10px] text-[#8c909f]">
            © {new Date().getFullYear()} Yash Vaidya. All rights reserved.
          </p>
        </div>

        {/* Right Links */}
        <div className="flex gap-8 text-xs font-geist text-[#8c909f]">
          {data.socials.linkedin && (
            <a
              href={data.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-primary transition-colors duration-300 hover-target"
            >
              LinkedIn
            </a>
          )}
          {data.socials.github && (
            <a
              href={data.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300 hover-target"
            >
              GitHub
            </a>
          )}
          {data.socials.twitter && (
            <a
              href={data.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-secondary transition-colors duration-300 hover-target"
            >
              Twitter
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
