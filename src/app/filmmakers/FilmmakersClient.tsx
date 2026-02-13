"use client"
import Link from "next/link";
import { useState } from "react";
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

      let orderedFilmmakers = filmmakers; 

      if(activeLetter) {
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
        orderedFilmmakers = [...matches, ...rest];
      }
    

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
  <main className="ml-5 min-h-[200px]">
    <h1 className="text-2xl font-bold mt-5 mb-4">Films</h1>
       <section className="flex gap-6">
                    <aside className="w-1/5 flex flex-col gap-4">
                            <Filter 
                              label="Filter by Roles"
                              options={roles.map((r) => ({label: r, value: r}))} 
                              value={role}
                              isLoading={isLoading} 
                              onChange={onRoleChange}
                            />
                            <Filter 
                              label="Filter by Subjects"
                              options={subjects.map((s) => ({label: s, value: s}))} 
                              value={subject}
                              isLoading={isLoading} 
                              onChange={onFilmmakerSubjectChange}
                            />
                    </aside>
                    <section className="flex-1 flex flex-col gap-4">
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