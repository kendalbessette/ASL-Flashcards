import CardLayout from "@/components/CardLayout";
import Flashcard from "@/components/Flashcard";
import { getFlashcards } from "@/lib/api";
import { notFound } from "next/navigation";
import React from "react";

export interface Flashcard {
  term: string;
  youtubeLink: string;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    return notFound();
  }

  const flashcards = await getFlashcards(slug);

  if (!flashcards || flashcards.length === 0) {
    return notFound();
  }

  return (
    <div className="min-h-full w-full">
      <CardLayout flashcards={flashcards} />
    </div>
  );
}
