//only fetch the first page
import { getAvailableYears, getFilms } from "../lib/films";
import FilmsClient from "./FilmsClient";

export default async function FilmsPage() {
  const initialData = await getFilms({ pageSize: 20 });
  const years = await getAvailableYears();

  return (
    <FilmsClient
      initialFilms={initialData.films}
      initialNextOffset={initialData.nextOffset}
      initialTotalCount={initialData.totalCount}
      years={years}
    />
  );
}
