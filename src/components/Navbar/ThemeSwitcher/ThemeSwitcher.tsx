'use client';

import { useTheme } from "next-themes";
import { Button } from "../../ui/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
      const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
    
    return (
        <Button suppressHydrationWarning onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
             {isClient ? (theme === "dark" ? <Sun /> : <Moon />) : 'Theme'}
        </Button>
    );
    }
