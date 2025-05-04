"use client";

import FilterCheckboxGroup from "@/src/app/components/FilterCheckboxGroup/FilterCheckboxGroup";
import { useFilters } from "@/src/app/hooks/filtersContext";

interface FilterCheckboxGroupClientProps {
  filterName: "manufacturer" | "type" | "year";
  label: string;
  options: (string | number)[];
}

export default function FilterCheckboxGroupClient({
  filterName,
  label,
  options,
}: FilterCheckboxGroupClientProps) {
  const { stagedFilters, setStagedFilters } = useFilters();
  const selectedValues = Array.isArray(stagedFilters[filterName])
    ? (stagedFilters[filterName] as (string | number)[])
    : [];
  const handleValueChange = (values: (string | number)[]) => {
    setStagedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: values.length === 0 ? null : values,
    }));
  };

  return (
    <FilterCheckboxGroup
      filterName={filterName}
      label={label}
      options={options}
      selectedValues={selectedValues}
      onValueChange={handleValueChange}
    />
  );
}
