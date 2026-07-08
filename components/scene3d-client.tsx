"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Scene3D = dynamic(() => import("@/components/scene3d"), { ssr: false });

export default function Scene3DClient() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const handleDefer = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => setShouldLoad(true), { timeout: 1000 });
      } else {
        setTimeout(() => setShouldLoad(true), 100);
      }
    };

    if (document.readyState === "complete") {
      handleDefer();
    } else {
      window.addEventListener("load", handleDefer);
      return () => window.removeEventListener("load", handleDefer);
    }
  }, []);

  if (!shouldLoad) return null;
  return <Scene3D />;
}
