"use client";

import FilterSelector from "@/src/app/components/FilterSelectors/FilterSelector";
import { useSortQuery } from "@/src/app/hooks/useSortQuery";

interface SortOption {
  label: string;
  sortBy: "year" | "price";
  sortOrder: "asc" | "desc";
}

const sortOptions: SortOption[] = [
  { label: "Most recent", sortBy: "year", sortOrder: "desc" },
  { label: "Oldest", sortBy: "year", sortOrder: "asc" },
  { label: "Price ascending", sortBy: "price", sortOrder: "asc" },
  { label: "Price descending", sortBy: "price", sortOrder: "desc" },
];

export default function SortSelectorClient() {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useSortQuery();

  // Determine the currently selected label based on sortBy and sortOrder
  const currentSortOption = sortOptions.find(
    (option) => option.sortBy === sortBy && option.sortOrder === sortOrder,
  );
  // With middleware, currentSortOption should always be defined on the root page.
  // Add a fallback for TypeScript's static analysis.
  const selectedValue = currentSortOption?.label || sortOptions[0].label;

  const handleValueChange = (value: string) => {
    const selectedOption = sortOptions.find((option) => option.label === value);
    if (selectedOption) {
      setSortBy(selectedOption.sortBy);
      setSortOrder(selectedOption.sortOrder);
    }
  };

  return (
    <FilterSelector
      filterName="sort" // Unique name for this selector
      label="Sort by"
      options={sortOptions.map((option) => option.label)} // Use labels as options
      selectedValue={selectedValue}
      onValueChange={handleValueChange}
    />
  );
}
