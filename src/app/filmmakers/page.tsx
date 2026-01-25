import { getFilmmakers, getAvailableFilmmakerSubjects } from "../lib/filmmakers";
import { getAvailableRoles } from "../lib/roles";
import FilmmakersClient from "./FilmmakersClient";

export default async function FilmmakersPage({
  searchParams,
} : {
  searchParams:{
    role?: Promise<{role?: string}>,
    filmmakerSubject?: Promise<{filmmakerSubject?: string}>
  }
}) {
  const { role } = await searchParams;
  const { filmmakerSubject } = await searchParams;

  console.log(role, " is role(s) ", filmmakerSubject, " is filmmakerSubject(s) ");

  const initialData = await getFilmmakers({
    role: role,
    filmmakerSubject: filmmakerSubject
  });

  const roles = await getAvailableRoles();
  const filmmakerSubjects = await getAvailableFilmmakerSubjects();
  return (
    <FilmmakersClient 
      initialFilmmakers={initialData.filmmaker} 
      roles={roles} 
      subjects={filmmakerSubjects}
      initialRole={role}
      initialSubject={filmmakerSubject}/>
  )
}