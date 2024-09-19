'use client';

import { useTheme } from "next-themes";
import { Button } from "../../ui/button";
import { Sun, Moon } from "lucide-react";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    
    return (
        <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
    );
    }
