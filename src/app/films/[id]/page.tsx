import { Button } from "@/app/components/ui/button";
import { getFilmById } from "@/app/lib/films";
import Link from "next/link";

export default async function FilmPage({
  params,
} : {
  params: Promise<{id: string}>;
}) {

    const { id } = await params;
    const film = await getFilmById(id);
    return (
      <main className="flex flex-col items-center justify-center px-4 py-8 ">
      <Link href="/films" className="mb-5 border-1 bg-blue-100 px-3 py-2">Back to Films</Link>
      <section className="flex gap-4">
        <div className="w-1/2 flex items-center justify-end">

          {film.posterUrl && (
             <img
              src={film.posterUrl.url}
              alt={`${film.title} poster`} 
              className="w-1/2 object-contain"
            />
            )} 
        </div>
        
        <div className="w-1/2">
          <h1 className="text-3xl font-extrabold italic text-gray-900 dark:text-gray-100 drop-shadow-sm my-4">
            {film.title}
          </h1>
          <hr />
          {film.year && (
              <p className="font-semibold mt-8">
                Year: <Link href={{pathname:"/films", query:{year: film.year}}} 
                        className="bg-yellow-100
                           text-gray-800 px-2 py-1 
                           hover:bg-blue-950 
                           hover:text-blue-200 
                           hover:cursor-pointer">{film.year}</Link>
              </p>
          )}

          {film.summary && (
            <p className="my-4 w-2/3 text-justify">{film.summary}</p>
          )}

          {film.trailer && (
            <div>
              <h2 className="font-semibold mb-2">Trailer</h2>
              <Link href={film.trailer} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold hover:scale-105 transition-transform duration-200 shadow-md hover:cursor-pointer"
                >
                  🎬 Watch Trailer
                </Button>
              </Link>
            </div>
          )}
          
          {film.subjects.length > 0 && (
            <div className="mt-4">
                
              <h2 className="font-semibold mb-2">Subjects</h2>
              <ul className="flex flex-wrap gap-2 w-2/3">
                {film.subjects.map((s) => (
                  <li
                    key={s}
                    className="px-2 py-1 bg-blue-100 rounded text-sm hover:bg-blue-50 hover:text-purple-950 hover:cursor-pointer hover:font-medium"
                  >
                    <Link href={{pathname:"/films", query:{subject: s}}}>{s}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}