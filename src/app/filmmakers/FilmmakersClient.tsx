"use client"
import { useState, useMemo } from "react";
import { Filter } from "../components/Filter";
import { useRouter } from "next/navigation";
import { FilmmakerGrid } from "./components/FilmmakerGrid";
import { Loader2 } from "lucide-react";
import { AlphabetStrip } from "../components/AlphabetStrip";
import { getAvailableLetters, getLastName } from "@/lib/catalogUtils";


type Filmmaker = {
    id: string;
    name: string;  
}
    
export default function FilmmakersClient(
    {
        initialFilmmakers,
        initialRole,
        initialSubject,
        roles,
        subjects,
    }: 
    {
        initialFilmmakers : Filmmaker[],
        initialRole? : string,
        initialSubject? : string,
        roles: string[],
        subjects: string[],
    }){

      const router = useRouter();
      const [filmmakers, setFilmmakers] = useState(initialFilmmakers);
      const [role, setRole] = useState(initialRole);
      const [subject, setSubject] = useState(initialSubject);
      const [isLoading, setIsLoading] = useState(false);
      const [totalCount, setTotalCount] = useState(initialFilmmakers.length);
      const [activeLetter, setActiveLetter] = useState<string | undefined>(undefined);

      const allLetters = getAvailableLetters(initialFilmmakers); // from full list
      
      const orderedFilmmakers = useMemo(() => {
        if(!activeLetter) return filmmakers;

        const matches: typeof filmmakers = [];
        const rest: typeof filmmakers = [];

        for(const f of filmmakers) {
            const lastName = getLastName(f.name);
            const firstLetter = lastName[0]?.toUpperCase();

            if(firstLetter === activeLetter) {
                matches.push(f);
            } else {
                rest.push(f);
            }
        }

        return [...matches, ...rest];
      }, [filmmakers, activeLetter])

    

    async function loadFirstPage(filters: {
        role?: string;
        filmmakerSubject?: string;
        }) {
        setIsLoading(true);

        const params = new URLSearchParams();
        if (filters.role) params.set("role", filters.role);
        if (filters.filmmakerSubject) params.set("filmmakerSubject", filters.filmmakerSubject);

        const res = await fetch(`/api/filmmakers?${params.toString()}`);
        const data = await res.json();

        // console.log(" Filtered ", data);
        setFilmmakers(data.filmmaker);
        setIsLoading(false);
        setTotalCount(data.filmmaker.length);
        router.push(`/filmmakers?${params.toString()}`, { scroll: false });
    }
    
    async function onRoleChange(value?: string) {
        setRole(value);
        loadFirstPage({ role: value, filmmakerSubject: subject })
    }

    async function onFilmmakerSubjectChange(value?: string) {
        setSubject(value);
        loadFirstPage({ role: role, filmmakerSubject: value })
    }

 return (
  <main className="min-h-[200px]">
    <div className="flex-none sm:flex items-center pt-4 px-8 bg-linear-to-r from-gray-800 to-black min-h-[250px]">
        <div className="flex-1  border-b border-gray-600">
            <h1 className="text-5xl font-bold text-gray-200 mb-4 mt-20">
            Filmmakers Directory
            </h1>
            <p className="text-gray-300 max-w-2xl pb-8 text-lg">
            Explore our community of filmmakers, their stories, and their work.
            </p>
        </div>

        <div className="shrink-0 ml-8 sm:mt-15">
            <img 
            src="/images/slides/filmmaker-directory-hero-black.png" 
            alt="Hero Image" 
            className="h-[200px] w-auto object-contain"
            />
        </div>
    </div>

       <section className="flex-none sm:flex gap-6">
                <section className="ml-5">
                            <aside className="flex-none sm:flex flex-col gap-4 w-3/4 sm:w-60 sm:fixed left-0 ml-5">
                                <h1 className="text-2xl font-light mt-10 sm:mt-20 text-center">Filters</h1>
                                    <Filter 
                                    label="By Filmmaker Roles"
                                    options={roles.map((r) => ({label: r, value: r}))} 
                                    value={role}
                                    isLoading={isLoading} 
                                    onChange={onRoleChange}
                                    />
                                    <Filter 
                                    label="By Filmmaker Subjects"
                                    options={subjects.map((s) => ({label: s, value: s}))} 
                                    value={subject}
                                    isLoading={isLoading} 
                                    onChange={onFilmmakerSubjectChange}
                                    />
                            </aside>
                    </section>
                    <section className="flex-1 flex flex-col gap-4 mt-5 mx-10 sm:ml-64">
                        <section>
                             { isLoading ? (
                                <div className="flex justify-center items-center min-h-[300px]">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                                ) : (
                                <div>
                                    <AlphabetStrip 
                                        activeLetter={activeLetter}
                                        availableLetters={allLetters}  // full set always
                                        onSelectLetter={(letter) => setActiveLetter(letter)}
                                    />
                                    <FilmmakerGrid filmmakers={orderedFilmmakers} totalCount={totalCount} activeLetter={activeLetter}/>
                                </div>
                                ) 
                            }
                        </section>
                    </section>
         </section>
    </main>
)}