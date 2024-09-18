'use client';

import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    
    return (
        <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle theme
        </Button>
    );
    }
