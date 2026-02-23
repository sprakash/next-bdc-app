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
    <Link href={`/filmmakers/${id}`} className="group block">
      <Card
        className="
            relative
            h-full
            overflow-hidden
            rounded-md
            border-0
            bg-neutral-900
            shadow-[0_8px_20px_rgba(0,0,0,0.6)]
            transition-all
            hover:-translate-y-1
            hover:shadow-[0_16px_40px_rgba(0,0,0,0.8)]
            gap-0
          "
      >
        <div className="relative overflow-hidden sm:aspect-square filmmaker:aspect-[4/5] lg:aspect-none">
          {headshot ? (
            <img
              src={headshot}
              alt={`${name} headshot`}
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No Headshot
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-yellow-50/93 text-neutral-700 px-4 py-4 flex flex-col gap-3 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
            <p className="text-sm lg:leading-snug lg:line-clamp-6 my-6 lg:text-lg sm:line-clamp-4 sm:leading-tight">
              {bio || "No bio available."}
            </p>

            <div className="justify-center flex">
              <span
                className="
                  bg-yellow-100
                  uppercase
                  inline-block
                  text-lg font-semibold
                  border
                  text-purple-900
                  px-3 py-1
                  rounded-sm
                  hover:bg-purple-600 hover:text-neutral-300
                  transition
                "
              >
                Learn more →
              </span>
            </div>
          </div>
        </div>


        <CardContent className="p-0">
          <div className="bg-neutral-800 px-3 py-2 border-t border-neutral-300">
            <h3 className="text-xl font-medium text-neutral-100 text-right leading-tight line-clamp-2 sm:text-sm">
              {name}
            </h3>
          </div>
        </CardContent>
      </Card>
      
    </Link>
  )
}
