"use client";

import OptionsSelector from "@/src/app/components/SortSelector/OptionsSelector";
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
  const currentSortOption = sortOptions.find(
    (option) => option.sortBy === sortBy && option.sortOrder === sortOrder,
  );
  const selectedValue = currentSortOption?.label || sortOptions[0].label;
  const handleValueChange = (value: string) => {
    const selectedOption = sortOptions.find((option) => option.label === value);
    if (selectedOption) {
      setSortBy(selectedOption.sortBy);
      setSortOrder(selectedOption.sortOrder);
    }
  };

  return (
    <OptionsSelector
      filterName="sort"
      label="Sort by"
      options={sortOptions.map((option) => option.label)}
      selectedValue={selectedValue}
      onValueChange={handleValueChange}
    />
  );
}
