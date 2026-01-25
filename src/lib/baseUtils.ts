import { bdcBase } from "./bdcbase";

type GetUniqueFieldValuesArgs = {
    table: string;
    field: string;
}

export async function getUniqueFieldValues({
    table,
    field,
}: GetUniqueFieldValuesArgs): Promise<string[]> {

    const values = new Set<string>();
        
        await bdcBase(table).select({
            fields: [field],
            pageSize: 100,
        }).eachPage((records, fetchNextPage) => {
            for(const record of records) {
                const fieldValues = record.get(field) as string[] | undefined;
                    if (fieldValues && fieldValues.length > 0) {
                    values.add(fieldValues[0]);
                }
            }
            fetchNextPage();
        })
    
        return Array.from(values);

}

export async function fetchAirtableData(
    tableId: string,
    params?: URLSearchParams
) {
    const url = new URL(
            `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableId}`
    );

    if(params) {
        url.search = params.toString();
        // console.log(" URL ", url.search)
    }

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        }, 
        cache: "no-store",
    });

    if(!res.ok) {
        throw new Error(`Failed to fetch Airtable data ${tableId}`);
    }
    
    return res.json();

}

export async  function fetchSingleAirtableRecord(
    tableId: string,
    recordId: string
) {
    const url = new URL(
            `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableId}/${recordId}`
    );

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        }, 
        cache: "no-store",
    });

    if(!res.ok) {
        throw new Error(`Failed to fetch Airtable record ${recordId}`);
    }
    
    return res.json();
}