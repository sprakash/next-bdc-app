"use client"
import Link from "next/link";
import { useState } from "react";
import { Filter } from "../components/Filter";
import { useRouter } from "next/navigation";


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

        console.log(" Filtered ", data);
        setFilmmakers(data.filmmaker);
        setIsLoading(false);
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
    <section className="p-4">
        <h1 className="font-bold text-3xl">Filmmakers</h1>
            <section className="flex">
                <section className="flex gap-6">
                        {/* Left column: Filters */}
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
                </section>
                <section className="w-1/2">
                    {filmmakers && filmmakers.map(((e, index) => 
                        <div key={index}>
                            <Link href={`/filmmakers/${e.id}`}>{e.name}</Link>
                        </div>
                     ))}
                </section>
            </section>
     </section>

)}