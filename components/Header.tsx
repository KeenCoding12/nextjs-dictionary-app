"use client";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
export default function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <header>
      <div className="container flex justify-between items-center py-6 md:py-8">
        {/* Logo */}
        <span className="text-2xl font-bold uppercase">Dicap</span>

        {/* Theme toggle */}
        <button
          className={`size-11 flex bg-surface hover:bg-surface-muted items-center justify-center rounded-full   transition-colors`}
          title="Theme Toggle"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? <Moon /> : <Sun />}
        </button>
      </div>
    </header>
  );
}
