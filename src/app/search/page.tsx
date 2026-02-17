import { FilmGrid } from "../films/components/FilmGrid";
import { searchFilms } from "../lib/films";
import { searchFilmmakers } from "../lib/filmmakers";
import { FilmmakerGrid } from "../filmmakers/components/FilmmakerGrid";

export  default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{q?: string, type?: string}>;
}) {
    const params = await searchParams;
    const query = params.q ?? "";
    const type = params.type ?? "films";

    let films = [];
    let filmmakers = [];

    if(query) {
        films = await searchFilms(query);
        filmmakers = await searchFilmmakers(query);
    }

    return (
        <main className="ml-5 min-h-[200px]">
            <h1 className="text-2xl font-bold mt-5 mb-4">
                Search
            </h1>

            <form action="/search" method="GET" className="mb-6 flex gap-2">
                <input type="text" name="q" defaultValue={query} placeholder="Search films and filmmakers..." className="border rounded-md px-3 py-2 w-80" />
                <input type="hidden" name="type" value={type} />

                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
                    Search
                </button>
            </form>

            {query && (
                <div className="flex border-b mb-6">
                    <a
                    href={`/search?q=${query}&type=films`}
                    className={`pb-2 ${
                        type === "films"
                        ? "border-b-2 border-purple-600 font-semibold"
                        : "text-muted-foreground"
                    }`}
                    >
                    Films ({films.length})
                    </a>
                    <span className="px-3">|</span>
                    <a
                    href={`/search?q=${query}&type=filmmakers`}
                    className={`pb-2 ${
                        type === "filmmakers"
                        ? "border-b-2 border-purple-600 font-semibold"
                        : "text-muted-foreground"
                    }`}
                    >
                    Filmmakers ({filmmakers.length})
                    </a>
                </div>
            )}

            {type === "films" && (
                <>
                    <h2 className="text-sm font-semibold mb-2">
                        Films ({ films.length })
                    </h2>
                    <FilmGrid films={films} />
                </>
            )}
            {type === "filmmakers" && (
                <>
                    <h2 className="text-lg font-semibold mb-2">
                        Filmmakers ({ filmmakers.length })
                    </h2>
                    <FilmmakerGrid filmmakers={filmmakers} totalCount={filmmakers.length} />

                </>
             )}
        </main>

    );
}