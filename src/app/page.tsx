import Link from "next/link";
import {Button} from "./components/ui/button"
import { listTables } from "../lib/baseTables";
import HeroSlideshow from "./components/HeroSlideshow";
import { Instagram } from "lucide-react";

export  default async function Home() {

  return (
    <div className="min-h-screen">
      <main>
        <HeroSlideshow/>
        <section className="flex text-center flex-col py-10 border-b">
          <h1 className="text-4xl text-gray-700 font-extrabold">Black Documentary Collective</h1>
          <div className="text-sm pt-5 text-gray-700 font-semibold">&quot;I want to do with the documentary what jazz musicians did with music.&quot; - St, Clair Bourne, Founder</div>
        </section>

      <section className="pt-5">
        <hr />
        <h3 className="text-neutral-500 text-3xl text-center mb-2 mt-10 uppercase tracking-wide"
        >
          Latest News
        <a
                  href="https://instagram.com/bdcnewyork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 transition"
                >
                  <Instagram size={18} />
                </a>
        </h3>
        <div
          className="elfsight-app-4f00f54b-3ec6-421f-8e7f-fe2a66d75bd6"
          data-elfsight-app-lazy
        ></div>
      </section>
        
        {/* <pre>{JSON.stringify(tables, null, 2)}</pre> */}

        <Link href="/films">
          <Button> Film Catalog</Button> 
        </Link> 
         <br />  
        <Link href="/filmmakers">
          <Button> Filmmakers Directory</Button> 
        </Link>   
      </main>
    </div>
  );
}



