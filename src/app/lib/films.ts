import { bdcBase } from "../../lib/bdcbase";

type Film = {
  id: string;
  title: string;
  totalCount: number;
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
    const years = new Set<string>();
    
    await bdcBase("Films").select({
        fields: ["Name (from Year)"],
        pageSize: 100,
    }).eachPage((records, fetchNextPage) => {
        for(const record of records) {
            const yearValues = record.get("Name (from Year)") as string[] | undefined;
                if (yearValues && yearValues.length > 0) {
                years.add(yearValues[0]);
            }
        }
        fetchNextPage();
    })

    return Array.from(years).sort((a,b) =>  Number(b) - Number(a));
}

async function countAllFilms({ tags, year,}: {
  tags?: string;
  year?: string;
}): Promise<number> {
  let total = 0;
  let offset: string | undefined = undefined;

  const formulas: string[] = [];

  if (year) {
    formulas.push(`FIND('${year}', {Name (from Year)})`);
  }

  if (tags) {
    formulas.push(`FIND("${tags}", {Subject})`);
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
        tags,
        year,
    }: {
        pageSize? : number;
        offset? : string;
        tags?: string;
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
    }

    if (tags) {
    formulas.push(`FIND("${tags}", {Subject})`);
    }

    const filterFormula =
    formulas.length === 1
        ? formulas[0]
        : formulas.length > 1
        ? `AND(${formulas.join(",")})`
        : undefined;

    if (filterFormula) {
         url.searchParams.set("filterByFormula", filterFormula);
    }
    
    console.log("url check", url.toString());
    const res = await fetch(url.toString(), {
        headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch films from Airtable");
    }

    const data = await res.json();
    const countData = await countAllFilms({ tags, year });
    const totalCount = countData > data.records.length ? countData : data.records.length;


  return {
    films: data.records.map((r: any) => ({
      id: r.id,
      title: r.fields.Name as string,
    })),
    nextOffset: data.offset,
    totalCount,
  };
}

export  async function getFilmById(id: string) {
  const url = new URL(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_FILMS_TABLE_ID}/${id}`
  )

  const res = await fetch(url.toString(), {
    headers: {
      AUthorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
    },
    cache: "no-store",
  });

  if(!res.ok) {
    throw new Error("Failed to fetch film");
  }

  const data = await res.json();
  const fields = data.fields;
  console.log(" F I E L D S", fields);

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
    trailer: fields.Trailer
  };
}