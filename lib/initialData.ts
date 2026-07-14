export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  linkDemo?: string;
  linkSource?: string;
  type?: string;
}

export const defaultPortfolioData = {
  hero: {
    badgeText: "Open To Work",
    title: "Yash Vaidya",
    subtitle1: "Full Stack Developer • AI & Automation",
    subtitle2: "Fresher 2026",
    image: "",
  },
  socials: {
    linkedin: "https://linkedin.com/in/yash-vaidya",
    github: "https://github.com/vaidyayash",
    twitter: "https://twitter.com",
    calendly: "https://calendly.com",
  },
  stats: [
    { label: "FRONTEND", val: 92, suffix: "%" },
    { label: "BACKEND", val: 84, suffix: "%" },
    { label: "AI/AUTOMATION", val: 85, suffix: "%" },
    { label: "API INTEGRATION", val: 87, suffix: "%" },
  ],
  services: [
    {
      num: "01",
      title: "Frontend Development",
      description: "Next.js / React.js (92%), TypeScript (90%), Tailwind CSS (93%), HTML5 / CSS3 (96%)",
      category: "Frontend",
    },
    {
      num: "02",
      title: "Backend & APIs",
      description: "FastAPI (Python) (88%), Node.js (82%), PostgreSQL (84%), REST API / JWT / OAuth 2.0 (87%)",
      category: "Backend",
    },
    {
      num: "03",
      title: "AI / Automation",
      description: "LangChain / LangGraph (85%), Ollama (Local LLMs) (80%), Telegram / Gmail / Slack APIs (83%), Git / GitHub (92%)",
      category: "AI",
    },
    {
      num: "04",
      title: "Platforms & Tools",
      description: "VS Code, Postman, GitHub, Vercel, n8n, Supabase, Ollama, Prisma",
      category: "Tools",
    },
  ],
  projects: [] as ProjectData[],
  experience: [
    {
      date: "May 2025 - Nov 2025",
      role: "Full Stack Developer Intern",
      company: "InternPro",
      bullets: [
        "Developed InternPro's main business website and LMS platform using Next.js and TypeScript.",
        "Built client-facing project deliverables including logistics dashboards and e-commerce admin panels.",
        "Assisted in setting up n8n-based automation workflows for client onboarding.",
      ],
    },
    {
      date: "Nov 2022 - Jun 2026",
      role: "B.Tech Computer Engineering",
      company: "SSIT, Nagpur",
      bullets: [
        "President of CS Department Forum, driving tech initiatives for 200+ students.",
        "Head Organiser for Annual Technical Fest, planning coding contests and AI workshops.",
        "Founder of College Coding Club, running bi-weekly competitive programming sessions.",
      ],
    },
  ],
  taxonomies: [
    {
      category: "ABOUT ME",
      title: "Computer Engineering Graduate",
      skills: ["Next.js", "FastAPI", "PostgreSQL", "LangChain"],
      description: "Hello! I'm Yash, a Computer Engineering graduate from SSIT, Nagpur, with hands-on experience building full-stack web applications, SaaS platforms, and AI-powered automation tools. I have worked on real-world D2C business automation projects, building AI-powered workflows for lead management, CRM automation, and business operations using n8n, custom APIs, and LLMs. I am currently exploring AI/ML building multi-agent pipelines with LangChain & LangGraph, hosting local LLMs via Ollama. I won 1st Prize at InnoSpark and presented at NCIETE-2026.",
    },
    {
      category: "CURRENTLY LEARNING",
      title: "Expanding my skillset",
      skills: ["System Design", "Advanced AI Agents", "C++ DSA", "Machine Learning"],
      description: "I'm always expanding my skillset and staying current with emerging technologies.",
    }
  ],
};
