import Link from "next/link"
import { Card, CardContent, CardHeader } from "../../components/ui/card"

type FilmmakerCardProps = {
  id: string
  name: string
  bio?: string
  headshot?: string
}

export function FilmmakerCard({ id, name, bio, headshot }: FilmmakerCardProps) {
  return (
    <Link href={`/filmmakers/${id}`} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-[2/3] bg-muted flex items-center justify-center">
          {headshot ? (
            <img
              src={headshot}
              alt={`${name} poster`}
              className="w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <span className="text-sm text-muted-foreground">
              No Headshot
            </span>
          )}
        </div>

        <CardContent className="px-3">
          <h3 className="font-semibold italic leading-tight line-clamp-2">
            {name}
          </h3>
        </CardContent>
      </Card>
    </Link>
  )
}
