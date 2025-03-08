"use client";

import { getYouTubeEmbedUrl } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { CarouselItem } from "./ui/carousel";
import { useState } from "react";
import type { Flashcard } from "@/app/[slug]/page";

export default function Flashcard({
  card,
  index,
}: {
  card: Flashcard;
  index: number;
}) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <CarouselItem className="flex justify-center">
      <Card
        className="p-4 w-full cursor-pointer flex flex-col justify-center items-center dark:hover:bg-zinc-900 hover:bg-zinc-100"
        onClick={() => setActiveCard(activeCard === index ? null : index)}
      >
        <CardContent className="w-full flex flex-col justify-center items-center">
          <div className="w-full max-w-[800px]">
            {activeCard === index ? (
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={getYouTubeEmbedUrl(card.youtubeLink, true)}
                  title={card.term}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="h-[225px] md:h-[300px] lg:h-[400px] flex items-center justify-center text-center text-xl">
                {card.term}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
}
