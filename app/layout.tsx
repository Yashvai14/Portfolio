import React from "react";
import "./globals.css";
import { Poppins } from "next/font/google";
import Scene3DClient from "@/components/scene3d-client";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // pick what you need
  variable: "--font-poppins", // optional CSS variable
});

export const metadata = {
  title: "Yash Vaidya | Full Stack Developer & AI Automation",
  description: "Final-year Computer Engineering student specialising in full stack web development and AI automation. Experienced with Next.js, FastAPI, PostgreSQL, LangChain, and LangGraph. Open to full-time roles — Fresher 2026, Nagpur, India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="shortcut icon" href="/icon.svg" />
      </head>
      <body className={poppins.className}>
        <Scene3DClient />
        {children}
      </body>
    </html>
  );
}