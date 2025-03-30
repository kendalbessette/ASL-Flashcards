"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useState } from "react";
import type { Flashcard as FlashcardType } from "@/app/[slug]/page";
import Flashcard from "./Flashcard";
import { Button } from "./ui/button";
import { GalleryHorizontal, LayoutGrid } from "lucide-react";
import Modal from "./Modal";
import { getYouTubeEmbedUrl } from "@/lib/utils";

export default function CardLayout({
  flashcards,
}: {
  flashcards: FlashcardType[];
}) {
  const [layout, setLayout] = useState("grid");
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<FlashcardType | null>(null);

  const onClick = (index: number) => {
    const card = flashcards[index];
    if (layout === "carousel") {
      setActiveCard(activeCard === index ? null : index);
    } else {
      setSelectedCard(card);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex gap-2 p-8">
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer"
          onClick={() => setLayout("grid")}
        >
          <LayoutGrid className="h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer"
          onClick={() => setLayout("carousel")}
        >
          <GalleryHorizontal className="h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
      <div className="p-8 md:pb-12 md:pr-12 md:pl-12">
        {layout === "carousel" ? (
          <Carousel
            className="w-[80%] max-w-[800px] mx-auto"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {flashcards.map((card, index) => (
                <CarouselItem className="flex justify-center" key={index}>
                  <Flashcard
                    key={index}
                    card={card}
                    index={index}
                    layout={layout}
                    activeCard={activeCard}
                    onClick={onClick}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {flashcards.map((card, index) => (
              <div key={index} className="" onClick={() => onClick(index)}>
                <Flashcard
                  card={card}
                  index={index}
                  layout={layout}
                  activeCard={activeCard}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCard && (
          <div className="relative w-full aspect-video w-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={getYouTubeEmbedUrl(selectedCard.youtubeLink, true)}
              title={selectedCard.term}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </Modal>
    </>
  );
}
