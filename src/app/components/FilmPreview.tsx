import Link from "next/link";
import { getFilms } from '@/app/lib/films';

type FilmRecord = {
    id: string;
    title?: string;
    filename: string;
    posterUrl?: { url: string};
};


export default async function FilmPreview() {

    let  previewFilms;
    try {
        previewFilms = await getFilms({pageSize: 44});
    } catch(error) {
        console.error(error,"\n Preview fetch failed");
        previewFilms = {preview: []};
    }

    const records: FilmRecord[] = previewFilms?.films ?? [];
    // // 2️⃣ Extract first 12 clean values
    console.log(records);
    const preview = records.filter(film => film.posterUrl?.filename !== "poster.png").slice(0,44).map((record) => ({
        id: record.id,
        poster: record.posterUrl?.url ?? "",
    }));

    console.log(preview);

    return (
        <section className="py-20 text-center flex-row justify-center shadow-[gainsboro_0px_0px_20px_1px]" >
            <h3 className="text-neutral-500 text-3xl text-center mb-2 mt-10 uppercase tracking-wide">Film Catalog</h3>
            <p className="my-3">Browse through the <Link href="/films"><span className="font-semibold text-blue-600">work</span></Link> of our filmmakers</p>
            <div className="px-6 py-5 md:px-16 lg:px-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-5 xl:px-25">
                    {preview.map((film) => (
                        <Link
                            key={film.id}
                            href="/films"
                            className="group h-100 sm:h-80 md:h-73 xl:h-115 relative overflow-hidden rounded-md shadow-md transition-all duration-300 hover:scale-95 hover:shadow-lg"
                        >
                            {/* Background image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${film.poster ?? '/images/default-headshot.png'})`, backgroundSize:`contain`, backgroundRepeat: `no-repeat`, backgroundColor: `white`, 
                                }} 
                            ></div>
                        </Link>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Link
                        href="/films"
                        className="px-8 py-3 border border-black uppercase tracking-wider text-sm hover:bg-black hover:text-white transition-all duration-300"
                    >
                        More Films
                    </Link>
                </div>
            </div>
        </section>
    );
}