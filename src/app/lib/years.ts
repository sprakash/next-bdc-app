type YearRecord = {
    id: string;
    name: string;
}

export async function getYears(): Promise<YearRecord[]>{

  const url = new URL(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_YEARS_TABLE_ID}`
  );

  const res = await fetch(url.toString(), {
    headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
    },
    cache: "no-store",
  });

  console.log(res, " response years ");

  if(!res.ok) {
    throw new Error("Failed to fetch years from base");
  }

  const data = await res.json();

  console.log(" year records ",  data.records);
  return data.records.map((r: any) => ({
    id: r.id,
  }))

}

export async function getYearMap(): Promise<Record<string, string>> {
  const years = await getYears();

  const map: Record<string, string> = {};

  for (const year of years) {
    map[year.id] = year.name;
  }

  return map;
}