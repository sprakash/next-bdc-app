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
        <div className="my-2 px-2 py-1 text-lg bg-gray-100 text-gray-500">
            <label htmlFor="filterYear" className="text-sm mb-10">
                {label}
              <select className="border-0 font-normal block w-full"
                value={value ?? ""}
                onChange={(e) => {
                 onChange(e.target.value || undefined)
                }}
              >
                <option value="" className="text-sm">ALL</option>

                {options?.map((opt) => (
                  <option className="capitalize text-md text-gray-400 font-bold border-0" key={opt.value} value={opt.value}>
                    <span className="py-3">{opt.label}</span> 
                  </option>
                ))}
              </select>

              </label>
        </div>
    );
}