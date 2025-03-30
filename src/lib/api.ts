import { Flashcard } from "@/app/[slug]/page";

export async function getFlashcards(slug: string): Promise<Flashcard[]> {
  const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
  if (NEXT_HYGRAPH_ENDPOINT) {
    const response = await fetch(NEXT_HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Lesson {
                    lesson (where: {slug:"${slug}"}) {
                        flashcard(first: 100) {
                            term
                            youtubeLink
                        }
                    }
                }`,
      }),
    });
    const json = await response.json();
    if (json.data && json.data.lesson) {
      return json.data.lesson.flashcard || [];
    }
    return [];
  }
  return [];
}

export async function getLessons() {
  const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
  if (NEXT_HYGRAPH_ENDPOINT) {
    const response = await fetch(NEXT_HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Lessons {
            lessons {
              slug
              id
              title
            }
          }`,
      }),
    });
    const json = await response.json();
    return json.data.lessons;
  }
}
