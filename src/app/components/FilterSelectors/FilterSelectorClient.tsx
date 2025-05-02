"use client";

import FilterSelect from "@/src/app/components/FilterSelectors/FilterSelector";
import { useFiltersQuery } from "@/src/app/hooks/useFiltersQuery";

interface FilterSelectorClientProps {
  filterName: string;
  label: string;
  options: (string | number)[];
}

export default function FilterSelectorClient({
  filterName,
  label,
  options,
}: FilterSelectorClientProps) {
  // Dynamically get the selected value and setter function from useFiltersQuery
  const filters = useFiltersQuery();
  // We need to ensure that the filterName corresponds to a key in the object returned by useFiltersQuery
  // and that there is a corresponding setter function named 'set' + capitalized filterName.
  // This assumes a convention in the useFiltersQuery hook.
  const selectedValue = filters[filterName as keyof typeof filters];
  const setterName = `set${filterName.charAt(0).toUpperCase() + filterName.slice(1)}`;
  const setFilterValue = filters[setterName as keyof typeof filters] as (
    value: string | null,
  ) => void;

  const handleValueChange = (value: string) => {
    // Call the dynamically obtained setter function
    setFilterValue(value === "All" ? null : value);
  };

  return (
    <FilterSelect
      filterName={filterName}
      label={label}
      options={options}
      // Ensure selectedValue is treated as string | number | null for FilterSelect props
      selectedValue={selectedValue as string | number | null}
      onValueChange={handleValueChange}
    />
  );
}
