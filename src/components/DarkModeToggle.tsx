"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const MenuTrigger = () => {
  return (
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon" className="cursor-pointer">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
  );
};

const DropDownContent = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuContent
      align="start"
      className="mt-2 w-40 rounded-md border border-zinc-300 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
    >
      <DropdownMenuItem
        onClick={() => setTheme("light")}
        className="cursor-pointer px-4 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        Light
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => setTheme("dark")}
        className="cursor-pointer px-4 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => setTheme("system")}
        className="cursor-pointer px-4 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export const DarkModeToggle = () => {
  return (
    <DropdownMenu>
      <MenuTrigger />
      <DropDownContent />
    </DropdownMenu>
  );
};
