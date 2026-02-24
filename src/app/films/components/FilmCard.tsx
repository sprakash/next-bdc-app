import Link from "next/link"
import { Card, CardContent, CardHeader } from "../../components/ui/card"

type FilmCardProps = {
  id: string
  title: string
  year?: string
  summary?: string
  posterUrl?: {
    filename?: string;
    url?:string;
  }
}

export function FilmCard({ id, title, year, summary, posterUrl }: FilmCardProps) {
  return (
    <Link href={`/films/${id}`} className="group">
      <Card className="sm:h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="sm:aspect-[3/4] bg-muted flex items-center justify-center">
          {posterUrl ? (
            <img
              src={posterUrl.url}
              alt={`${title} poster`}
              className="w-2/3 sm:w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <span className="text-sm text-muted-foreground">
              No poster
            </span>
          )}
        </div>

        <CardContent className="px-3">
          <h3 className="font-bold uppercase leading-tight line-clamp-2 text-center text-md">
            {title}
          </h3>

          {year && (
            <p className="text-sm text-muted-foreground mt-1 text-center pb-2">
              {year}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
