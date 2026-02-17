import Link from "next/link"
import { Card, CardContent, CardHeader } from "../../components/ui/card"

type FilmCardProps = {
  id: string
  title: string
  year?: string
  summary?: string
  posterUrl?: string
}

export function FilmCard({ id, title, year, summary, posterUrl }: FilmCardProps) {
  return (
    <Link href={`/films/${id}`} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-[3/4] bg-muted flex items-center justify-center">
          {posterUrl ? (
            <img
              src={posterUrl.url}
              alt={`${title} poster`}
              className="w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <span className="text-sm text-muted-foreground">
              No poster
            </span>
          )}
        </div>

        <CardContent className="px-3">
          <h3 className="font-semibold leading-tight line-clamp-2 text-center text-md pb-2">
            {title}
          </h3>

          {year && (
            <p className="text-sm text-muted-foreground mt-1 text-center pb-4">
              {year}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
