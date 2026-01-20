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