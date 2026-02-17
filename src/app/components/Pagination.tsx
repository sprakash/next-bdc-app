import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  hasNext: boolean;
  isLoading: boolean;
  onPrev: () => void;
  onNext: () => void;
  start: number;
  end: number;
  totalCount: number;
};

export function Pagination({
  page,
  hasNext,
  isLoading,
  onPrev,
  onNext,
  start,
  end,
  totalCount,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4 bg-gradient-to-r from-purple-100 to-white pt-5 px-10 uppercase">
      
      
      {/* Left side — Results meta */}
      <div className="text-md  text-gray-900">
        Showing{" "}
        <span className="font-semibold text-foreground text-purple-700">
          {start}–{end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-foreground text-purple-700">
          {totalCount}
        </span>{" "}
        films
      </div>

      {/* Right side — Controls */}
      <div className="flex items-center gap-2 text-2xl">
        <Button
          variant="outline"
          size="lg"
          onClick={onPrev}
          disabled={page === 1 || isLoading}
          className="gap-1 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>

        <span className="text-sm font-semibold px-2">
          Page {page}
        </span>

        <Button
          variant="outline"
          size="lg"
          onClick={onNext}
          disabled={!hasNext || isLoading}
          className="gap-1 cursor-pointer hover:bg-purple-400 hover:text-white"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
