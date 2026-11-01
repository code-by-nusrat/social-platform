"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // wait until the page is on the client, so the icon matches the real theme
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-10 w-10 rounded-full text-[#FDEB9E] hover:bg-white/15 hover:text-white"
    >
      {mounted ? (
        isDark ? <MdLightMode className="text-2xl" /> : <MdDarkMode className="text-2xl" />
      ) : (
        <span className="h-6 w-6" />
      )}
    </Button>
  );
};

export default ThemeToggle;