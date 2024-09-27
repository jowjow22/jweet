"use client";

import { ListRenderer } from "../utils/ListRenderer/ListRenderer";
import { Home, Edit } from "lucide-react";
import { NavItem } from "./NavItem/NavItem";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import { User } from "@/models/User";
import Link from "next/link";
import Image from 'next/image'
import JweetLogo from "@/assets/jweet-logo.svg";

interface NavbarProps {
  user: User;
}

export const Navbar = ({ user }: NavbarProps) => {
  const links = [
    {
      title: "Home",
      icon: Home,
      variant: "default",
      href: "/",
    },
    {
      title: "Alterar dados",
      icon: Edit,
      variant: "default",
      href: "/user/update",
    },
  ];

  return (
    <Sheet>
      <nav className="flex items-center justify-between p-5">
        <SheetTrigger>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>
              {user.name
                ?.split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <Link href="/home" className="text-md font-bold flex gap-x-1">
          <Image
            src={JweetLogo}
            alt="Google Logo"
            width={20}
            height={20}
            className="mr-2"
          />
          Jweet
        </Link>
        <ThemeSwitcher />
      </nav>
      <Separator />
      <SheetContent side="left">
        <SheetHeader className="flex flex-col items-center gap-y-2 p-4">
          <Avatar
            className={cn(
              "flex-shrink-0",
              "h-24 w-24",
              "overflow-hidden",
              "rounded-full",
              "bg-muted",
              "flex items-center justify-center"
            )}
          >
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>
              {user.name
                ?.split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <SheetTitle>{user.name}</SheetTitle>
          <ul className="flex gap-x-2 text-sm font-thin">
            <li>Seguidores: {0} </li>
            <li>Seguindo: {0} </li>
          </ul>
        </SheetHeader>
        <ul className="flex flex-col gap-y-2">
          <ListRenderer
            items={links}
            ChildComponent={NavItem as React.ComponentType}
            itemPropName="link"
            keyValue="title"
          />
        </ul>
        <Button
          variant="destructive"
          className={cn(
            "hover:scale-[1.02]",
            "transition-transform w-full mt-10"
          )}
        >
          Sair
        </Button>
      </SheetContent>
    </Sheet>
  );
};
