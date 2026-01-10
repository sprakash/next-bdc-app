import Airtable from "airtable"

export const bdcBase = new Airtable({
    apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE_ID!)