import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Card, CardContent } from "@/components/ui/card";
import { getLessons } from "@/lib/api";
import { sortLessons } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export interface Lesson {
  slug: string;
  id: string;
  title: string;
}

export default async function Home() {
  let lessons = await getLessons();
  lessons = sortLessons(lessons);

  return (
    <>
      <div className="p-12">
        <ul className="flex w-full flex-wrap justify-center gap-4">
          {lessons.map((lesson: Lesson) => (
            <Link key={lesson.id} href={`/${lesson.slug}`}>
              <Card className="p-4 h-48 max-w-[800px] cursor-pointer flex flex-col justify-center items-center dark:hover:bg-zinc-900 hover:bg-zinc-100">
                <CardContent className="h-full w-full flex flex-col justify-center items-center">
                  {lesson.title}
                </CardContent>
              </Card>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
