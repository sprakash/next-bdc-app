import Link from "next/link";
import {Button} from "./components/ui/button"
import { listTables } from "../lib/baseTables";
import HeroSlideshow from "./components/HeroSlideshow";
import { Instagram } from "lucide-react";
import MemberSpotlight from './components/MemberSpotlight';
import FilmmakerPreview from "./components/FilmmakerPreview";
import FilmPreview from "./components/FilmPreview";
import Fiscal from "./components/Fiscal";
import Mission from "./components/Mission";
import ContactArea from "./components/Contact";

export  default async function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSlideshow/>
        <section className="flex text-center flex-col py-10">
          <h1 className="text-6xl text-gray-700 font-extrabold">Black Documentary Collective</h1>
          <div className="text-lg pt-5 text-gray-700 font-semibold px-10">&quot;I want to do with the documentary what jazz musicians did with music.&quot; - St, Clair Bourne, Founder</div>
        </section>

      <section className="pt-5">
        <hr />
        <h3 className="text-neutral-500 text-4xl text-center mb-2 mt-10 uppercase tracking-wide"
        >
          Spotlight On
        </h3>

<script src="https://elfsightcdn.com/platform.js" async></script>
<div className="elfsight-app-4f00f54b-3ec6-421f-8e7f-fe2a66d75bd6" data-elfsight-app-lazy></div>
      </section>
        {/* <pre>{JSON.stringify(tables, null, 2)}</pre> */}
        {/* <MemberSpotlight/> */}
        <FilmmakerPreview/>
        <FilmPreview/>
        <hr/>
        <Fiscal/>
        <ContactArea/>
        <Mission/>
      </main>
    </div>
  );
}



