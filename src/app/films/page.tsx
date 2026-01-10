import { getFilms } from "@/lib/films";
import Link from "next/link";

const PAGE_SIZE = 20;

export default async function FilmsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // 1️⃣ Read page from URL
    const { page } = await searchParams;
    const pageNumber = Number(page ?? "1");

  // 2️⃣ Fetch films (still first 20 only for now)
  const films = await getFilms();

  // 3️⃣ Pagination math
  const start = (pageNumber - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  // 4️⃣ Slice what we show
  const visibleFilms = films.slice(start, end);

  return (
    <main>
      <h1>Films</h1>

      <ul>
        {visibleFilms.map((film) => (
          <li key={film.id}>
            <Link href={`/films/${film.id}`}>
              {film.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* 5️⃣ Pagination controls */}
      <div style={{ marginTop: "2rem" }}>
        {pageNumber > 1 && (
          <Link href={`/films?page=${pageNumber - 1}`}>
            ← Previous
          </Link>
        )}

        <span style={{ margin: "0 1rem" }}>
          Page {pageNumber}
        </span>

        {visibleFilms.length === PAGE_SIZE && (
          <Link href={`/films?page=${pageNumber + 1}`}>
            Next →
          </Link>
        )}
      </div>
    </main>
  );
}
