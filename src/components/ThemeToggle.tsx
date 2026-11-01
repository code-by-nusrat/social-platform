"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // wait for the client, so server and browser render the same thing first
  useEffect(() => setMounted(true), []);

  // before mounting, always render the same default as the server
  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      aria-label={label}
      title={mounted ? label : undefined}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 hover:text-[#FDEB9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      {mounted ? (
        isDark ? <Sun size={22} /> : <Moon size={22} />
      ) : (
        <span className="h-5.5 w-5.5" />
      )}
    </button>
  );
};

export default ThemeToggle;