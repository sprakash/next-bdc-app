import { fetchAirtableData, fetchSingleAirtableRecord } from "@/lib/baseUtils";

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

type GetFilmmakersResult = {
  filmmaker: Filmmaker[];
  nextOffset?: string;
  totalCount: number;
};

export async function getFilmmakers() : Promise<GetFilmmakersResult>{
  //get base access 
  //get all filmmakers 

  const filmmakerData = await fetchAirtableData(process.env.AIRTABLE_FILMMAKERS_TABLE_ID!);
  return {
    filmmaker: filmmakerData.records.map((r: any) => ({
        id: r.id,
        name: r.fields.Name,
    })),
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