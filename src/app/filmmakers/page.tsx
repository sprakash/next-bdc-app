import { getFilmmakers, getAvailableFilmmakerSubjects } from "../lib/filmmakers";
import { getAvailableRoles } from "../lib/roles";
import FilmmakersClient from "./FilmmakersClient";

export default async function FilmmakersPage({
  searchParams,
}: {
  searchParams: Promise<{
    role?: string;
    filmmakerSubject?: string;
  }>;
}) {
  const { role, filmmakerSubject } = await searchParams;

  const initialData = await getFilmmakers({
    role,
    filmmakerSubject,
  });

  const roles = await getAvailableRoles();
  const filmmakerSubjects = await getAvailableFilmmakerSubjects();

  return (
    <FilmmakersClient
      initialFilmmakers={initialData.filmmaker}
      roles={roles}
      subjects={filmmakerSubjects}
      initialRole={role}
      initialSubject={filmmakerSubject}
    />
  );
}