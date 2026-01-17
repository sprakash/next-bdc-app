import { getFilms, getAvailableYears } from "../../lib/films";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = searchParams.get("offset") ?? undefined;
  const tags = searchParams.get("tag") ?? undefined;
  const year = searchParams.get("year") ?? undefined;
  const includeYears = searchParams.get("includeYears") === "true";

  const data = await getFilms({
    pageSize: 20,
    offset,
    tags,
    year,
  });

  if(includeYears) {
    const years = await getAvailableYears();

    return NextResponse.json({
      ...data,
      years
    })
  }

  return NextResponse.json(data);
}
