import { fetchAirtableData, fetchSingleAirtableRecord } from "@/lib/baseUtils";
import { bdcBase } from "@/lib/bdcbase";

type Filmmaker = {
    id: string,
    name: string,
    bio: string,
    headshot?: string
}

type FilmmakerDetail = {
    id: string,
    name: string,
    bio: string,
    films?: string[],
    roles: string[],
    subjects: string[],
    headshot?: string,
    website?: string,
    imdb?: string,
    linkedin?: string,
    facebook?: string,
    twitter?: string,
    instagram?: string,
    youtube?: string,
    phone?: string
}

type GetFilmmakersArgs = {
    role?: string,
    filmmakerSubject?: string
}

type GetFilmmakersResult = {
  filmmaker: Filmmaker[];
  nextOffset?: string;
  totalCount: number;
};

export async function getFilmmakers(
    args: GetFilmmakersArgs = {}
):Promise<GetFilmmakersResult>{
  //get base access 
  //get all filmmakers 

  const filmmakerData = await fetchAirtableData(process.env.AIRTABLE_FILMMAKERS_TABLE_ID!);

  const filmmakersCollection = filmmakerData.records.map((r: any) => ({
        id: r.id,
        name: r.fields.Name,
        bio: r.fields.Bio,
        headshot: r.fields.Headshot[0].url,
        roles: Array.isArray(r.fields["Name (from Roles)"])? r.fields["Name (from Roles)"] : [],
        filmmakerSubjects: Array.isArray(r.fields["Subject of Films"]) ? r.fields["Subject of Films"] : [],
    }));
  
   let filtered = filmmakersCollection;

    if (args.role) {
        filtered = filtered.filter(f =>
            f.roles.includes(args.role!)
        );
    }

    if (args.filmmakerSubject) {
        filtered = filtered.filter(f =>
            f.filmmakerSubjects.includes(args.filmmakerSubject!)
        );
    }

  return { 
    filmmaker: filtered,
    totalCount: filmmakerData.records.length,
  }

}

export async function getFilmmakerById(id: string) {
    const filmmakersData = await fetchSingleAirtableRecord(process.env.AIRTABLE_FILMMAKERS_TABLE_ID!, id);
    return {
        id: filmmakersData.id,
        name: filmmakersData.fields.Name,
        bio: filmmakersData.fields.Bio,
        photoInfo: filmmakersData.fields.Headshot,
        roles: filmmakersData.fields["Name (from Roles)"],
        subjects: filmmakersData.fields["Subject of Films"],
        imdb: filmmakersData.fields.IMDB,
        linkedIn: filmmakersData.fields.LinkedIn,
        insta: filmmakersData.fields.Instagram,
        yt: filmmakersData.fields.YouTube,
        web: filmmakersData.fields.Website,
        other: filmmakersData.fields["Other Skills"],
        films: filmmakersData.fields.Films
    }
    
}

export async function getAvailableFilmmakerSubjects(): Promise<string[]>{
    const filmmakerSubjects = new Set<string>();

    await bdcBase("Filmmakers").select({
        fields: ["Subject of Films"],
        pageSize: 100,
    })
    .eachPage((records, fetchNextPage) => {
        for(const record of records) {
            const values = record.get("Subject of Films") as string[] | undefined;

            if(Array.isArray(values)) {
                values.forEach((subject) => { filmmakerSubjects.add(subject)})
            }
        }
        fetchNextPage();
    });

    return Array.from(filmmakerSubjects).sort();

}

export async function searchFilmmakers(query: string) {
    const params = new URLSearchParams();
     params.set(
        "filterByFormula",
        `SEARCH(LOWER("${query}"), LOWER({Name}))`
    );
    const data = await fetchAirtableData("Filmmakers", params);
    return data.records.map((record: any) => ({
        id: record.id,
        name: record.fields.Name,
        bio: record.fields.Bio,
        headshot: record.fields.Headshot[0].url
    }));

}