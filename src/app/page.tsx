import Link from "next/link";
import {Button} from "./components/ui/button"
import { getYears } from "./lib/years";
import { listTables } from "../lib/baseTables";

export  default async function Home() {

  // const tables = await listTables();
  // console.log("🟡 Tables FROM AIRTABLE:", tables);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main>
        <h1>Black Documentary Collective</h1>
        {/* <pre>{JSON.stringify(tables, null, 2)}</pre> */}

        <Link href="/films">
          <Button> Film Catalog</Button> 
        </Link> 
         <br />  
        <Link href="/filmmakers">
          <Button> Filmmakers Directory</Button> 
        </Link>   
      </main>
    </div>
  );
}



