import Link from "next/link";
import { getFilmmakers } from '@/app/lib/filmmakers';

type FilmmakerRecord = {
    id: string;
    name?: string;
    headshot?: string;
    fields?: {
        Name?: string;
        Headshot?: string;
    };
};


export default async function FilmmakerPreview() {

    let previewFilmmakers;

    try {
     previewFilmmakers = await getFilmmakers();
    } catch(error) {
     console.error(error,"\n Preview fetch failed");
     previewFilmmakers = {preview: []};
    }

     // 1️⃣ Normalize the data shape
    const records: FilmmakerRecord[] = Array.isArray(previewFilmmakers)
        ? previewFilmmakers
        : previewFilmmakers?.filmmaker ?? [];

    // 2️⃣ Extract first 12 clean values
     const preview = records.slice(0, 12).map((record) => ({
        id: record.id,
        name: record.name ??  "Unnamed",
        headshot: record.headshot ?? "No Headshot"
    }));

    return (
        <section className="py-20 text-center flex-row justify-center">
            <h3 className="text-neutral-500 text-3xl text-center mb-2 mt-10 uppercase tracking-wide">Filmmaker Directory</h3>
            <p className="my-3">Browse through our <Link href="/filmmakers"><span className="font-semibold text-blue-600">directory</span></Link> of talented filmmakers of our community</p>
            <div className="px-6 py-5 md:px-16 lg:px-24">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                    {preview?.map((filmmaker) => (
                        <Link
                            key={filmmaker.id}
                            href="/filmmakers"
                            className="group h-180 sm:h-64 xl:h-120 relative overflow-hidden rounded-md shadow-md transition-all duration-300 hover:scale-95 hover:shadow-lg"
                        >
                            {/* Background image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${filmmaker.headshot ?? '/images/default-headshot.png'})`,
                                }}
                            ></div>

                            {/* Name caption */}
                            <div className="absolute bottom-0 right-0 bg-[#ad0110] text-white font-semibold px-3 py-1 md:text-md lg:text-xl">
                                {filmmaker.name}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Link
                        href="/filmmakers"
                        className="px-8 py-3 border border-black uppercase tracking-wider text-sm hover:bg-black hover:text-white transition-all duration-300"
                    >
                        More Filmmakers
                    </Link>
                </div>

            </div>
        </section>
    );
}