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
        <div className="my-2 px-1 text-lg">
            <label htmlFor="filterYear" className="font-bold">
                {label}
              <select className="border-2 font-normal block"
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