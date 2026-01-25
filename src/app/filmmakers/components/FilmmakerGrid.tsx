import Link from "next/link";
import { FilmmakerCard } from "./FilmmakerCard";

type Filmmaker = {
    id: string;
    name: string;
    bio?: string;
    headshot?: string;
}

type FilmGridProps = {
    filmmakers: Filmmaker[],
    totalCount: number
}

export function FilmmakerGrid({
    filmmakers, 
    totalCount
}:FilmGridProps) {
    // console.log("just image files", films.map((film) => (film.posterUrl)))
      
    console.log(" HEADSHOT INFO ", filmmakers[0]);

    return (
        <section>
            <section>
                <span className="font-bold my-4 text-lg">
                            Found <span className="text-2xl text-purple-500">{ totalCount } </span> Filmmakers that match this combination of filters.
                        </span>
                        <hr className="pb-4" />
            </section>
            <section
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        
                        
    {/*
                            { totalCount === 0 ? (
                                <div className="mt-12 text-center text-muted-foreground">
                                <p className="text-lg font-medium">
                                    No filmmakers match this combination of filters
                                </p>
                                <p className="text-sm mt-2">
                                    Try removing one filter or choosing a different role or subject.
                                </p>
                                </div>
                            ) : ( */}
                            { filmmakers && filmmakers.map(((e, index) => 
                                    <div key={index}>
                                        {/* <Link href={`/filmmakers/${e.id}`}>{e.name}</Link> */}
                                        <FilmmakerCard name={e.name} id={e.id} bio={e.bio} headshot={e.headshot} />
                                    </div>
                                )) }
                            {/* )} */}
            </section>
        </section>
    )
}