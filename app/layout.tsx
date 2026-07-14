import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ThreeBackground from "@/components/ThreeBackground";
import ShaderBackground from "@/components/ShaderBackground";
import CustomCursor from "@/components/CustomCursor";
import { PortfolioDataProvider } from "@/context/PortfolioDataContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yash Vaidya | Full Stack Developer",
  description:
    "Portfolio of Yash Vaidya. Specialized in Full Stack Development, AI Automation, and Software Engineering.",
  applicationName: "Yash Vaidya",
  keywords: [
    "Yash Vaidya",
    "AI Automation",
    "SaaS Development",
    "Product Engineering",
    "Software Development",
    "AI Agents",
    "n8n Automation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${interSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0b1326] text-[#dae2fd] font-inter selection:bg-brand-primary/20 selection:text-brand-primary">
        <ThreeBackground />
        <ShaderBackground />
        <CustomCursor />
        <PortfolioDataProvider>{children}</PortfolioDataProvider>
      </body>
    </html>
  );
}
