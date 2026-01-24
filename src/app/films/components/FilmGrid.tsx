import { FilmCard } from "./FilmCard";

type Film = {
    id: string;
    title: string;
    year?: string;
    summary?: string;
    posterUrl?: string;
}

type FilmGridProps = {
    films: Film[]
}

export function FilmGrid({films}:FilmGridProps) {
    console.log("just image files", films.map((film) => (film.posterUrl)))
    return (
        <section
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {films.map((film) => (
            <FilmCard
            key={film.id}
            id={film.id}
            title={film.title}
            year={film.year}
            summary={film.summary}
            posterUrl={film.posterUrl}
            />
      ))}
    </section>
    )
}