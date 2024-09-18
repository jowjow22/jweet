import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  link: {
    title: string;
    label?: string;
    icon: LucideIcon;
    href: string;
    variant: "default" | "ghost";
  };
}

export const NavItem = ({ link }: NavItemProps) => {
  return (
    <Link
      href={link.href}
      className={cn(
        buttonVariants({ variant: link.variant }),
        link.variant === "default" &&
          "dark:bg-transparent dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start"
      )}
    >
      <link.icon className="mr-2 h-4 w-4" />
      {link.title}
    </Link>
  );
};