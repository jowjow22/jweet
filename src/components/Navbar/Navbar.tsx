"use client";

import { ListRenderer } from "../utils/ListRenderer/ListRenderer";
import { Home, Edit } from "lucide-react";
import { NavItem } from "./NavItem/NavItem";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export const Navbar = () => {
  const links = [
    {
      title: "Home",
      icon: Home,
      variant: "default",
      href: "/",
    },
    { title: "Alterar dados", icon: Edit, variant: "default", href: "/inbox" },
  ];

  return (
      <nav className="flex flex-col px-10 h-screen py-32 gap-y-10 min-w-72">
        <div className="flex items-center justify-center flex-col">
          <Avatar
            className={cn(
              "flex-shrink-0",
              "h-24 w-24",
              "overflow-hidden",
              "rounded-full",
              "bg-muted",
              "flex items-center justify-center",
              "border-[1px] border-zinc-500"
            )}
          >
            <AvatarImage src="https://avatars.githubusercontent.com/u/51102351?s=400&v=4" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold">Jonata tweetar</h3>
          <ul className="flex gap-x-2 text-sm font-thin">
            <li>Seguidores: {0} </li>
            <li>Seguindo: {0} </li>
          </ul>
        </div>
        <ul className="flex flex-col gap-y-2">
          <ListRenderer
            items={links}
            ChildComponent={NavItem}
            itemPropName="link"
          />
        </ul>
        <Button
          variant="destructive"
          className={cn("hover:scale-[1.02]", "transition-transform")}
        >
          Sair
        </Button>
      </nav>
  );
};
