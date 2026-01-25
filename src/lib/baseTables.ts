export async function listTables() {
  const res = await fetch(
    `https://api.airtable.com/v0/meta/bases/${process.env.AIRTABLE_BASE_ID}/tables`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Airtable tables");
  }

  const data = await res.json();
  // console.log(data, " tables ");

  return data.tables.map((t: any) => ({
    id: t.id,
    name: t.name,
    fields: t.fields.map((f: any) => ({
      name: f.name,
      type: f.type,
    })),
  }));
}