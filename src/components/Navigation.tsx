import Link from "next/link";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";

export default function Navigation() {
  return (
    <div className="flex min-h-16 items-center pl-8 pr-8 border-b-1 justify-between">
      <Link href="/">
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Home className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </Link>
      <DarkModeToggle />
    </div>
  );
}
