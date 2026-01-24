import { getFilmmakers } from "../lib/filmmakers";
import FilmmakersClient from "./FilmmakersClient";

export default async function FilmmakersPage() {
  const initialData = await getFilmmakers();
  return (
    <FilmmakersClient initialFilmmakers={initialData.filmmaker}/>
  )
}