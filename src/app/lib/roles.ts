// src/app/lib/roles.ts
import { bdcBase } from "../../lib/bdcbase";

export async function getAvailableRoles(): Promise<string[]> {
  const roles = new Set<string>();

  await bdcBase("Roles")
    .select({
      fields: ["Name", "Filmmakers"],
      pageSize: 100,
    })
    .eachPage((records, fetchNextPage) => {
      for (const record of records) {
        const name = record.get("Name") as string | undefined;
        const filmmakers = record.get("Filmmakers") as string[] | undefined;

        if (name && filmmakers && filmmakers.length > 0) {
          roles.add(name);
        }
      }

      fetchNextPage();
    });

  return Array.from(roles).sort();
}
