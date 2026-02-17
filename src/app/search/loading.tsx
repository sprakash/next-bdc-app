export default function Loading() {
  return (
    <main className="ml-5 min-h-[200px]">
      <h1 className="text-2xl font-bold mt-5 mb-6">
        Search
      </h1>

      <div className="space-y-4 max-w-md">
        {/* Animated bar */}
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-purple-600 animate-pulse rounded-full" />
        </div>

        {/* Loading text */}
        <p className="text-muted-foreground animate-pulse">
          Searching films and filmmakers...
        </p>
      </div>
    </main>
  );
}


/**
 * import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="ml-5 min-h-[200px]">
      <h1 className="text-2xl font-bold mt-5 mb-6">
        Search
      </h1>

      <div className="space-y-4">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-40 w-full" />
      </div>
    </main>
  );
}
 */