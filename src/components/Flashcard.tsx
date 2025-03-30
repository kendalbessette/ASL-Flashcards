"use client";

import { getYouTubeEmbedUrl } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import type { Flashcard } from "@/app/[slug]/page";

export default function Flashcard({
  card,
  index,
  layout,
  activeCard,
  onClick,
}: {
  card: Flashcard;
  index: number;
  layout: string;
  activeCard: number | null;
  onClick?: (index: number) => void;
}) {
  const cardHeight = layout === "grid" ? "h-40" : "";
  const carouselCardContent =
    layout === "carousel" ? "h-[225px] md:h-[300px] lg:h-[400px]" : "";

  return (
    <Card
      className={`p-4 w-full cursor-pointer flex flex-col justify-center items-center dark:hover:bg-zinc-900 hover:bg-zinc-100 ${cardHeight}`}
      onClick={layout === "carousel" ? () => onClick?.(index) : undefined}
    >
      <CardContent
        className={`w-full flex flex-col justify-center items-center ${cardHeight}`}
      >
        <div className="w-full">
          {layout === "carousel" && activeCard === index ? (
            <div className="relative w-full aspect-video max-w-[800px]">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={getYouTubeEmbedUrl(card.youtubeLink, true)}
                title={card.term}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div
              className={`${carouselCardContent} flex items-center justify-center text-center text-xl`}
            >
              {card.term}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
