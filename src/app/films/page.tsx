//only fetch the first page
import { getAvailableYears, getAvailableSubjects, getFilms } from "../lib/films";
import FilmsClient from "./FilmsClient";


export default async function FilmsPage({ searchParams, } : 
  { 
    searchParams: Promise<{
    year?: string;
    subject?: string;
  }>;
}) {
  const { year, subject } = await searchParams;
    // console.log(await searchParams, " search Params");

  const years = await getAvailableYears();
  const subjects = await getAvailableSubjects();
  const isValidYear = year && years.includes(year);
  const safeYear = isValidYear ? year : undefined;
  const initialData = await getFilms({ pageSize: 20, year: safeYear, subject: subject });

  return (
    <FilmsClient
      initialFilms={initialData.films}
      initialNextOffset={initialData.nextOffset}
      initialTotalCount={initialData.totalCount}
      years={years}
      initialYear={safeYear}
      initialSubject={subject}
      subjects={subjects}
    />
  );
}
