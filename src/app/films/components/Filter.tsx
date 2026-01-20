type FilterOption = {
    label: string;
    value: string;
}

type FilterProps = {
    label: string;
    options: FilterOption[];
    value?: string;
    isLoading: boolean;
    onChange: (value?:string) => void;
}

export function Filter({ label, options, value, isLoading, onChange}: FilterProps){
    return (
        <div className="border-2 border-blue-100 my-2 py-2 px-1 w-1/5">
            <label htmlFor="filterYear">
                {label}
              <select id="filterYear"
                value={value ?? ""}
                onChange={(e) => {
                 onChange(e.target.value || undefined)
                }}
              >
                <option value="">All</option>

                {options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              </label>
        </div>
    );
}