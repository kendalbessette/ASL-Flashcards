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

export default async function Home() {
  const { flashcard } = await getFlashcards();
  console.log(flashcard);
  return (
    <div className="m-12">
      <h1 className="text-5xl font-bold mb-4">
        Hygraph Implementation Guides demo
      </h1>
      <ul>
        {flashcard.map((card: Card) => {
          const { term, youtubeLink } = card;
          return (
            <>
              <div>{card.term}</div>
              <div>{card.youtubeLink}</div>
            </>
          );
        })}
      </ul>
    </div>
  );
}
