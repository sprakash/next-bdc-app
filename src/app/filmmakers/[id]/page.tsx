import { getFilmmakerById } from "@/app/lib/filmmakers";
import { getFilmById } from "@/app/lib/films";
import Link from "next/link";
import {
    Globe,
    Instagram,
    Youtube,
    Linkedin,
    Film
} from "lucide-react";

export default async function FilmmakerDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;
    const filmmakerData = await getFilmmakerById(id);
    const filmmakersFilms = filmmakerData.films
        ? await Promise.all(
            filmmakerData.films.map((filmId: string) =>
                getFilmById(filmId)
            )
        )
        : [];

    return (
        <main className="flex flex-col items-center justify-center px-4 py-8 ">
            <Link href="/filmmakers" className="mb-5 border-1 bg-blue-100 px-3 py-2">Back to Filmmakers</Link>
            <section className="flex gap-4">
                <div className="w-1/2 flex  items-center justify-end mt-20" >
                    <img src={filmmakerData.photoInfo[0].url} alt={`${filmmakerData.name} headshot`} className="w-1/2 object-contain" />
                </div>
                <div className="w-1/2">
                    <h1 className="text-5xl font-extrabold italic text-gray-900 dark:text-gray-100 drop-shadow-sm my-4">
                        {filmmakerData.name}
                    </h1>
                    <hr />
                    <div>
                        {filmmakerData.bio && (
                            <div className="my-4 w-2/3 text-justify">{filmmakerData.bio}</div>
                        )}
                    </div>

                    {filmmakersFilms && filmmakersFilms.length > 0 && (
                        <div className="mt-4">

                            <h2 className="font-semibold mb-2">Films</h2>
                            <ul className="flex flex-wrap gap-2 w-2/3">
                                {filmmakersFilms.map((film, index) => (
                                    <li key={film.id} className="px-2 py-1
  bg-blue-100 font-medium
  rounded
  text-sm
  transition
  duration-150
  ease-out
  hover:bg-yellow-100
 hover:text-black
  hover:shadow-sm
  hover:-translate-y-[1px]"
                                    >
                                        <Link href={`/films/${film.id}`}>{film.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {filmmakerData.roles && filmmakerData.roles.length > 0 && (
                        <div className="mt-4">

                            <h2 className="font-semibold mb-2">Roles</h2>
                            <ul className="flex flex-wrap gap-2 w-2/3">
                                {filmmakerData.roles.map((role, index) => (
                                    <li
                                        key={index}
                                        className="px-2 py-1
  bg-orange-100 font-medium
  rounded
  text-sm
  transition
  duration-150
  ease-out
  hover:bg-yellow-100
 hover:text-black
  hover:shadow-sm
  hover:-translate-y-[1px]"
                                    >
                                        <Link href={{ pathname: "/filmmakers", query: { role: role } }}>{role}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}


                    {filmmakerData.subjects && filmmakerData.subjects.length > 0 && (
                        <div className="mt-4">

                            <h2 className="font-semibold mb-2">Subjects</h2>
                            <ul className="flex flex-wrap gap-2 w-2/3">
                                {filmmakerData.subjects.map((s) => (
                                    <li
                                        key={s}
                                        className="px-2 py-1
  bg-purple-100 font-medium
  rounded
  text-sm
  transition
  duration-150
  ease-out
  hover:bg-yellow-100
 hover:text-black
  hover:shadow-sm
  hover:-translate-y-[1px]"
                                    >
                                        <Link href={{ pathname: "/filmmakers", query: { filmmakerSubject: s } }}>{s}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {filmmakerData.other && (
                        <div className="mt-4 flex">
                            <h2 className="font-semibold mb-2 mr-2">Other Skills: </h2>
                            <ul className="flex flex-wrap gap-2 w-2/3">
                                <ul className="flex flex-wrap gap-2 w-2/3">
                                    {filmmakerData.other.toString()
                                        .split(/[,|\n]+/)
                                        .map(s => s.trim())
                                        .filter(Boolean)
                                        .map(skill => (
                                            <li
                                                key={skill}
                                                className="px-1 py-1 text-sm"
                                            >
                                                {skill}
                                            </li>
                                        ))}
                                </ul>
                            </ul>
                        </div>
                    )}
                    {(filmmakerData.web ||
                        filmmakerData.imdb ||
                        filmmakerData.insta ||
                        filmmakerData.yt ||
                        filmmakerData.linkedIn) && (
                            <div className="mt-4">
                                <h2 className="font-semibold mb-2">Links</h2>

                                <div className="flex items-center gap-4 text-gray-600">
                                    {filmmakerData.web && (
                                        <Link
                                            href={filmmakerData.web}
                                            target="_blank"
                                            className="hover:text-black transition"
                                            aria-label="web"
                                        >
                                            <Globe className="h-5 w-5" />
                                        </Link>
                                    )}

                                    {filmmakerData.imdb && (
                                        <Link
                                            href={filmmakerData.imdb}
                                            target="_blank"
                                            className="hover:text-yellow-600 transition"
                                            aria-label="IMDb"
                                        >
                                            <Film className="h-5 w-5" />
                                        </Link>
                                    )}

                                    {filmmakerData.insta && (
                                        <Link
                                            href={filmmakerData.insta}
                                            target="_blank"
                                            className="hover:text-pink-600 transition"
                                            aria-label="insta"
                                        >
                                            <Instagram className="h-5 w-5" />
                                        </Link>
                                    )}

                                    {filmmakerData.yt && (
                                        <Link
                                            href={filmmakerData.yt}
                                            target="_blank"
                                            className="hover:text-red-600 transition"
                                            aria-label="yt"
                                        >
                                            <Youtube className="h-5 w-5" />
                                        </Link>
                                    )}

                                    {filmmakerData.linkedIn && (
                                        <Link
                                            href={filmmakerData.linkedIn}
                                            target="_blank"
                                            className="hover:text-blue-600 transition"
                                            aria-label="linkedIn"
                                        >
                                            <Linkedin className="h-5 w-5" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}

                </div>
            </section>
        </main>
    )
}