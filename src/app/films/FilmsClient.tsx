"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Filter } from '../components/Filter';
import { Pagination } from "../components/Pagination";
import { FilmGrid } from './components/FilmGrid';

type Film = {
  id: string;
  title: string;
  posterUrl?: {
    filename?: string;
    url?: string;
  }
};

const PAGE_SIZE = 20;

export default function FilmsClient({
  initialFilms,
  initialNextOffset,
  initialTotalCount,
  years,
  initialYear,
  initialSubject,
  subjects,
}: {
  initialFilms: Film[];
  initialNextOffset?: string;
  initialTotalCount: number;
  years: string[];
  initialYear?: string;
  initialSubject?: string;
  subjects: string[];
}) {
  const [page, setPage] = useState(1);
  const [films, setFilms] = useState(initialFilms);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [year, setYear] = useState<string | undefined>(initialYear);
  const [subject, setSubject] = useState<string | undefined>(initialSubject);
  const [isLoading, setIsLoading] = useState(false);
  const [hideDefaultPosters, setHideDefaultPosters] = useState(false);


  const hasNext = page * PAGE_SIZE < totalCount;
  const start = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(start + films.length - 1, totalCount);

  // THIS is the important part
  const [offsets, setOffsets] = useState<(string | undefined)[]>([
    undefined,           // page 1
    initialNextOffset,   // page 2
  ]);

  async function loadFirstPage(filters: {
    year?: string, 
    subject?: string;
  }) {

    const params = new URLSearchParams();

    if(filters.year) params.set("year", filters.year);
    if(filters.subject) params.set("subject", filters.subject);

    setIsLoading(true);

    const query = params.toString();

    const res = await fetch(
     query ? `/api/films?${query}` : `/api/films`
    );
    const data = await res.json();

    setFilms(data.films);
    setPage(1);
    setOffsets([undefined, data.nextOffset]);
    setTotalCount(data.totalCount);
    setIsLoading(false);

    // console.log(" total loadFirstPage", totalCount)
  }

  async function loadPage(nextPage: number) {
    setIsLoading(true);
    const params = new URLSearchParams();

    const offset = offsets[nextPage - 1];

    if(offset) params.set("offset", offset);
    if(year) params.set("year", year);
    if(subject) params.set("subject", subject);

    // console.log("LOAD PAGE DEBUG", {
    //   nextPage,
    //   offsetFromState: offsets[nextPage - 1],
    //   year,
    //   subject,
    // });


    const res = await fetch(`/api/films?${params.toString()}`);
    const data = await res.json();
  

    setFilms(data.films);
    setTotalCount(data.totalCount);

    const newOffsets = [...offsets];
    newOffsets[nextPage] = data.nextOffset;
    setOffsets(newOffsets);
    setPage(nextPage);
    setIsLoading(false);

    // console.log(" total loadPage", data.totalCount)
  }

 
  return (
    <main className="min-h-[200px]">
    <div className="flex-none sm:flex items-center pt-4 px-8 bg-linear-to-r from-gray-800 to-black min-h-[250px]">
        <div className="flex-1 border-b-1 border-gray-600">
            <h1 className="text-5xl font-bold text-gray-200 mb-4 mt-20">
            Film Catalog
            </h1>
            <p className="text-gray-300 max-w-2xl pb-4 text-lg">
              Discover films that amplify voices, challenge narratives, and shape culture.            
            </p>
        </div>

        <div className="sm:flex-shrink-0 sm:ml-8 sm:pt-20 pb-5">
            <img 
            src="/images/slides/filmcatalog-hero.png" 
            alt="Hero Image" 
            className="h-[200px] w-auto object-contain"
            />
        </div>
    </div>

      
       <section className="flex-none sm:flex gap-6">
        {/* Left column: Filters */}
        <aside className="w-4/5 sm:w-50 left-0 sm:fixed flex flex-col ml-5 items-center sm:items-baseline mt-5">
          <h1 className="text-2xl font-light sm:mt-20">Filters</h1>
            <Filter 
              label="By Film Year"
              options={years.map((y) => ({label: y, value: y}))} 
              value={year}
              isLoading={isLoading} 
              onChange={(value)=>{ 
                setYear(value); 
                loadFirstPage({year: value, subject});
              }}
            />
            <Filter 
              label="By Film Subject"
              options={subjects.map((s) => ({label: s, value: s}))} 
              value={subject}
              isLoading={isLoading} 
              onChange={(value)=>{ 
                setSubject(value); 
                loadFirstPage({year, subject:value});
              }}
            />

            <div className="my-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <input
                type="checkbox"
                checked={hideDefaultPosters}
                onChange={(e) => setHideDefaultPosters(e.target.checked)}
                className="accent-blue-500"
              />
              show films with posters
            </label>
          </div>
        </aside>
        {/* Right column: Pagination + Grid */}
        <section className="flex-1 flex flex-col gap-4 sm:pr-12 sm:ml-64">
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

          {isLoading ? (
                  <div className="flex justify-center items-center min-h-[300px]">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
            <FilmGrid films={hideDefaultPosters
            ? films.filter(film => film.posterUrl?.filename !== "poster.png") : films}/>
          )}
        </section>
      </section>
    </main>
  );
}
