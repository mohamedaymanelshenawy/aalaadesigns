// app/layout.tsx
"use client";
import { useState, useEffect } from "react";

import LogoAnimated from "@/components/logo_animated";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => {
      //set delay for the logo animation
      setTimeout(() => {
        setLoading(false);
      }, 6000);
    };

    if (document.readyState === "complete") handleComplete();
    else window.addEventListener("load", handleComplete);

    return () => window.removeEventListener("load", handleComplete);
  }, []);

  return loading ? <LogoAnimated /> : <>{children}</>;
};

export default AppWrapper;
