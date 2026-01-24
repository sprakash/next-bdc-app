import { getUniqueFieldValues, fetchSingleAirtableRecord } from '@/lib/baseUtils';
import { bdcBase } from "../../lib/bdcbase";

type Film = {
  id: string;
  title: string;
  totalCount: number;
  year?: string;
  summary?: string;
  posterUrl?: string;
  directors?: {
    id: string;
    name: string;
  };
  producers?: {
    id: string;
    name: string;
  };
  cameras?: {
    id: string;
    name: string;
  };
  editors?: {
    id: string;
    name: string;
  }
};

type FilmDetal = {
 id:string;
 title: string;
 year?: string;
 summary?: string;
 posterUrl?: string;
 subjects: string[];
 trailer: string;
};

type GetFilmsResult = {
  films: Film[];
  nextOffset?: string;
  totalCount: number;
};

export async function getAvailableYears(): Promise<string[]>{
    const years = await getUniqueFieldValues({
      table: "Films",
      field: "Name (from Year)",
    })
    return years.sort((a,b) =>  Number(b) - Number(a));
}
export async function getAvailableSubjects(): Promise<string[]>{
    const subjects = await getUniqueFieldValues({
      table: "Films",
      field: "Tags",
    })
    return subjects.sort((a,b) =>  Number(b) - Number(a));
}

async function countAllFilms({ subject, year}: {
  subject?: string;
  year?: string;
}): Promise<number> {
  let total = 0;
  let offset: string | undefined = undefined;

  const formulas: string[] = [];

    if (year) {
      formulas.push(`FIND('${year}', {Name (from Year)})`);
    }

    if (subject) {
      formulas.push(`FIND("${subject}", ARRAYJOIN({Tags}))`);
    }

    const filterFormula =
      formulas.length === 1
        ? formulas[0]
        : formulas.length > 1
        ? `AND(${formulas.join(",")})`
        : undefined;

  do {
    const url = new URL(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_FILMS_TABLE_ID}`
    );

    url.searchParams.set("pageSize", "100");

    if (offset) {
      url.searchParams.set("offset", offset);
    }

    if (filterFormula) {
      url.searchParams.set("filterByFormula", filterFormula);
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to count films");
    }

    const data = await res.json();

    total += data.records.length;
    offset = data.offset;
  } while (offset);
  
  return total;
}


export async function getFilms({
        pageSize = 20, 
        offset, 
        subject,
        year,
    }: {
        pageSize? : number;
        offset? : string;
        subject?: string;
        year?: string;
    }) : Promise<GetFilmsResult> {
    
    const url = new URL(
        `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_FILMS_TABLE_ID}`
    );
        
    url.searchParams.set("pageSize", pageSize.toString());

    if (offset) {
        url.searchParams.set("offset", offset);
    }

   const formulas: string[] = [];

    if (year) {
      formulas.push(`FIND('${year}', {Name (from Year)})`);
      // console.log(" yes we are looking for year", year);
    }

    if (subject) {
      formulas.push(`FIND("${subject}", ARRAYJOIN({Tags}))`);
      // console.log(" yes we are looking for subject", subject);
    }

    const filterFormula =
      formulas.length === 1
        ? formulas[0]
        : formulas.length > 1
        ? `AND(${formulas.join(",")})`
        : undefined;

    if (filterFormula) {
      url.searchParams.set("filterByFormula", filterFormula);
      console.log("url check", url.toString(), " formula ", filterFormula);
    }

    const res = await fetch(url.toString(), {
        headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch FILMS from Airtable");
    }

    const data = await res.json();
    const countData = await countAllFilms({ subject, year });
    const totalCount = countData > data.records.length ? countData : data.records.length;

    console.log(" just length ", totalCount);

  return {
    films: data.records.map((r: any) => ({
      id: r.id,
      title: r.fields.Name as string,
      year: Array.isArray(r.fields["Name (from Year)"]) 
      ? r.fields["Name (from Year)"][0] : undefined,
      summary: r.fields.Summary as string | undefined,
      posterUrl: Array.isArray(r.fields.Poster)
      && r.fields.Poster.length > 0 
      ? r.fields.Poster[0]
      : undefined,

    })),
    nextOffset: data.offset,
    totalCount,
  };
}

export  async function getFilmById(id: string) {
  const data = await fetchSingleAirtableRecord(process.env.AIRTABLE_FILMS_TABLE_ID!, id);
  const fields = data.fields;
   console.log(" F I L M  ", fields);



  return {
    id: data.id,
    title: fields.Name as string,
    summary: fields.Summary as string | undefined,
    year: Array.isArray(fields["Name (from Year)"])
    ? fields["Name (from Year)"][0]
    : undefined,
    posterUrl: Array.isArray(fields.Poster)
      && fields.Poster.length > 0 
      ? fields.Poster[0]
      : undefined,
    subjects: Array.isArray(fields.Tags)
      ? fields.Tags
      : [],
    trailer: fields.Trailer,
    website: fields.Website,
    directors: Array.isArray(fields.Director) && 
    Array.isArray(fields["Name (from Director)"])
    ? fields.Director.map((id: string, index: number) => ({
        id,
        name: fields["Name (from Director)"][index],
      }))
    : [],
    producers: Array.isArray(fields.Producer) && 
    Array.isArray(fields["Name (from Producer)"])
    ? fields.Producer.map((id: string, index: number) => ({
        id,
        name: fields["Name (from Producer)"][index],
      }))
    : [],
    cameras: Array.isArray(fields["Camera / Cinematographer"]) && 
    Array.isArray(fields["Name (from Camera Person"])
    ? fields["Camera / Cinematographer"].map((id: string, index: number) => ({
        id,
        name: fields["Name (from Camera Person)"][index],
      }))
    : [],
    editors: Array.isArray(fields.Editor) && 
    Array.isArray(fields["Name (from Editor)"])
    ? fields.Editor.map((id: string, index: number) => ({
        id,
        name: fields["Name (from Editor)"][index],
      }))
    : []
  };
}