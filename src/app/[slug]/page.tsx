import { DarkModeToggle } from "@/components/DarkModeToggle";
import Flashcard from "@/components/Flashcard";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getFlashcards } from "@/lib/api";
import { notFound } from "next/navigation";
import React from "react";

export interface Flashcard {
  term: string;
  youtubeLink: string;
}

export default async function LessonPage({
  params,
}: {
  params: { slug: string };
}) {
  const flashcards = await getFlashcards(params.slug);

  if (!flashcards || flashcards.length === 0) {
    return notFound();
  }

  return (
    <div className="min-h-full">
      <div className="p-12 w-full flex justify-center">
        <Carousel
          className="w-[80%] max-w-[800px]"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {flashcards.map((card, index) => (
              <Flashcard key={index} card={card} index={index} />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
