import { bdcBase } from "../../lib/bdcbase";

export async function getFilms() {
  console.log("🔥 getFilms WITHOUT OFFSET is running");

  const records = await bdcBase("Films")
    .select({
      pageSize: 60,
    })
    .firstPage();

  return records.map((r) => ({
    id: r.id,
    title: r.get("Name") as string,
  }));
}
