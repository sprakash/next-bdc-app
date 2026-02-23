import Link from "next/link";
import { FilmmakerCard } from "./FilmmakerCard";
import { getLastName } from "@/lib/catalogUtils";

type Filmmaker = {
    id: string;
    name: string;
    bio?: string;
    headshot?: string;
}

type FilmGridProps = {
    filmmakers: Filmmaker[];
    totalCount: number;
    activeLetter?: string;
}

export function FilmmakerGrid({
    filmmakers,
    totalCount, 
    activeLetter,
}: FilmGridProps) {
    // console.log("just image files", films.map((film) => (film.posterUrl)))

    console.log(" HEADSHOT INFO ", filmmakers[0]);

    return (
        <section className="sm:pr-20">
            <section>
                <span className="font-bold my-4 text-lg">
                    Found <span className="text-2xl text-purple-500">{totalCount} </span> Filmmakers that match this combination of filters.
                </span>
                <hr className="pb-4" />
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-8 gridgap:gap-4">
                {filmmakers && filmmakers.map((f) => {
                    const isHighlighted = 
                    !!activeLetter && 
                    getLastName(f.name)[0]?.toUpperCase() === activeLetter;
                    

                    return (
                        <div
                            key={f.id}
                            className={`
                                transition-all duration-300 ease-in-out
                                rounded-md   /* <- match card rounding */
                                ${
                                isHighlighted
                                    ? "shadow-[0_0_15px_3px_rgba(128,0,128,0.5)] scale-[1.02]"
                                    : "border border-transparent"
                                }
                            `}
                            >
                         <FilmmakerCard 
                            name={f.name} 
                            id={f.id} 
                            bio={f.bio} 
                            headshot={f.headshot}
                        />
                        </div>
                    );
                })}
            </section>
        </section>
    )}