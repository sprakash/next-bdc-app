type FilterProps = {
    years: string[];
    year?: string;
    isLoading: boolean;
    onChange: (year?:string) => void;
}

export function Filter({ years, year, isLoading, onChange}: FilterProps){
    return (
        <div className="border-2 border-blue-100 my-2 py-2 px-1 w-1/5">
            <label htmlFor="filterYear">
                Filter by Year:{" "}
              <select id="filterYear"
                value={year ?? ""}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  onChange(value);
                }}
              >
                <option value="">All</option>

                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>

              </label>
        </div>
    );
}