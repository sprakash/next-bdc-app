"use client"
import Link from "next/link";
import { useState } from "react";

 

type Filmmaker = {
    id: string;
    name: string;
}
export default function FilmmakersClient(
    {
        initialFilmmakers
    }: 
    {
        initialFilmmakers : Filmmaker[]
    }){
      const [filmmakers, setFilmmakers] = useState(initialFilmmakers);
 return (
    <div>
        <h1 className="font-bold">Filmmakers List</h1>
           {filmmakers && filmmakers.map(((e, index) => 
            <div key={index}>
                <Link href={`/filmmakers/${e.id}`}>{e.name}</Link>
            </div>
        ))}
    </div>

)}