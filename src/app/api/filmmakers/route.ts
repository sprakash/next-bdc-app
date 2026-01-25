import { getFilmmakers } from "@/app/lib/filmmakers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const filmmakerSubject = searchParams.get("filmmakerSubject") ?? undefined;
    const role = searchParams.get("role") ?? undefined;
    const data = await getFilmmakers({ 
        role, 
        filmmakerSubject,
    });
    console.log(" route ", data);
    return NextResponse.json(data);
}