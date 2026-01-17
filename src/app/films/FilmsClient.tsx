"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Filter } from './components/Filter';
import { Pagination } from "./components/Pagination";

type Film = {
  id: string;
  title: string;
};

const PAGE_SIZE = 20;

export default function FilmsClient({
  initialFilms,
  initialNextOffset,
  initialTotalCount,
  years,
}: {
  initialFilms: Film[];
  initialNextOffset?: string;
  initialTotalCount: number;
  years: string[];
}) {
  const [page, setPage] = useState(1);
  const [films, setFilms] = useState(initialFilms);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [year, setYear] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const hasNext = page * PAGE_SIZE < totalCount;
  const start = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(start + films.length - 1, totalCount);

  // THIS is the important part
  const [offsets, setOffsets] = useState<(string | undefined)[]>([
    undefined,           // page 1
    initialNextOffset,   // page 2
  ]);

  async function loadFirstPage(selectedYear?: string) {
    setIsLoading(true);
    const res = await fetch(
      `/api/films?year=${selectedYear ?? ""}`
    );
    const data = await res.json();

    setFilms(data.films);
    setPage(1);
    setOffsets([undefined, data.nextOffset]);
    setTotalCount(data.totalCount);
    setIsLoading(false);

    console.log(" total loadFirstPage", totalCount)
  }

  async function loadPage(nextPage: number) {
    setIsLoading(true);
    const offset = offsets[nextPage - 1];
    const res = await fetch(`/api/films?offset=${offset ?? ""}&year=${year ?? ""}`);
    const data = await res.json();
  

    setFilms(data.films);
    setTotalCount(data.totalCount);

    const newOffsets = [...offsets];
    newOffsets[nextPage] = data.nextOffset;
    setOffsets(newOffsets);
    setPage(nextPage);
    setIsLoading(false);

    console.log(" total loadPage", data.totalCount)
  }

 
  return (
    <main className="ml-5 min-h-[200px]">
      { isLoading ? (
        <div className="flex items-center gap-2 py-3">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Loading films…
          </span>
        </div>
      ) : (
        <section>
            <h1 className="text-lg font-bold mt-5">Films</h1>
            <Filter 
              years={years} 
              year={year} 
              isLoading={false} 
              onChange={(value)=>{ 
                setYear(value); 
                loadFirstPage(value)
              }}
            />
            <ul>
              {films.map((film, index) => (
                <li key={film.id}>
                  <Link href={`/films/${film.id}`}>{film.title}</Link>
                </li>
              ))}
            </ul>

          

            <Pagination 
              page={page}
              hasNext={hasNext}
              isLoading={isLoading}
              onPrev={() => loadPage(page - 1)}
              onNext={() => loadPage(page + 1)}
              start={start}
              end={end}
              totalCount={totalCount}
            />

        </section>
      )}

    </main>
  );
}
