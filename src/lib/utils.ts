import { Lesson } from "@/app/page";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYouTubeEmbedUrl(url: string, autoplay = false): string {
  const regex =
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|embed\/|v\/))([^?&]+)/;
  const match = url.match(regex);
  return match
    ? `https://www.youtube.com/embed/${match[1]}?autoplay=${
        autoplay ? "1" : "0"
      }&mute=1&controls=0`
    : "";
}

export function sortLessons(lessons: Lesson[]): Lesson[] {
  return lessons.sort((a, b) => {
    const matchA = a.slug.match(/level-(\d+)-week-(\d+)/);
    const matchB = b.slug.match(/level-(\d+)-week-(\d+)/);

    if (!matchA || !matchB) return 0; // If the format is incorrect, keep original order

    const [levelA, weekA] = matchA.slice(1).map(Number);
    const [levelB, weekB] = matchB.slice(1).map(Number);

    return levelA !== levelB ? levelA - levelB : weekA - weekB;
  });
}
