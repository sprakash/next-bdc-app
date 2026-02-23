"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"

interface Option {
  label: string | number
  value: string | number
}

interface FilterProps {
  label: string
  options: Option[]
  value?: string
  onChange: (value: string) => void
  isLoading?: boolean
  placeholder?: string
}

export function Filter({
  label,
  options,
  value,
  onChange,
  isLoading = false,
  placeholder,
}: FilterProps) {
  return (
    <div className="my-2 px-2 flex flex-col gap-2">
      <label className="text-sm font-medium text-muted-foreground text-center sm:text-left">
        {label}
      </label>

      <Select
        value={value}
        onValueChange={onChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder ?? `Select ${label}`} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value.toString()}
              value={option.value.toString()}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
