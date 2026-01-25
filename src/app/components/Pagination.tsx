type PaginationProps = {
    page: number;
    hasNext: boolean;
    isLoading: boolean;
    onPrev: () => void;
    onNext: () => void;
    start: number;
    end: number;
    totalCount: number;
}

export function Pagination({page, hasNext, isLoading, onPrev, onNext, start, end, totalCount } : PaginationProps) {
    return (
            <nav>
              <p className="my-3 font-bold">
                Showing {start}–{end} of {totalCount} films
              </p>
              {page > 1 && (
                <button
                  disabled={page === 1}
                  onClick={(e) => onPrev()} className="hover:cursor-pointer"
                >
                  ← Previous
                </button>
              )}
              { (page > 1 || hasNext) && (
                <span style={{ margin: "0 1rem" }}>
                    Page {page}
                </span>
              )}
              {hasNext && (
                  <button onClick={() => onNext()} className="hover:cursor-pointer">
                      Next →
                  </button>
              )}
            </nav>
    );
}