"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

async function getFlashcards() {
  const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_HYGRAPH_ENDPOINT;
  if (NEXT_HYGRAPH_ENDPOINT) {
    const response = await fetch(NEXT_HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Lesson {
        lesson (where: {slug:"level-2-week-2"}) {
          flashcard {
            term
            youtubeLink
          }
        }
      }`,
      }),
    });
    const json = await response.json();
    return json.data.lesson;
  }
}

interface Card {
  term: string;
  youtubeLink: string;
}

export default function Home() {
  const { setTheme } = useTheme();
  const [flashcard, setFlashcard] = React.useState<Card[]>([]);

  React.useEffect(() => {
    getFlashcards().then((data) => {
      setFlashcard(data?.flashcard || []);
    });
  }, []);
  return (
    <div className="m-12">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ul className="flex justify-center items-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            {flashcard.map((card: Card) => {
              const { term, youtubeLink } = card;
              return (
                <>
                  <div>{card.term}</div>
                  <div>{card.youtubeLink}</div>
                </>
              );
            })}
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </ul>
    </div>
  );
}
