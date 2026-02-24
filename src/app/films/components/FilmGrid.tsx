import { FilmCard } from "./FilmCard";

type Film = {
    id: string;
    title: string;
    year?: string;
    summary?: string;
    posterUrl?: {
        filename?: string;
        url?: string;
    };
}

type FilmGridProps = {
    films: Film[]
}

export function FilmGrid({films}:FilmGridProps) {
    // console.log("just image files", films.map((film) => (film.posterUrl)))
    return (
        <section
            className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
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