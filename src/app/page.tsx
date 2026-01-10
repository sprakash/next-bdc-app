import Link from "next/link";
import {Button} from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main>
        <h1>Black Documentary Collective</h1>
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
