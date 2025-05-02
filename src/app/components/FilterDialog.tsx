"use client";

import FilterSelect from "@/src/app/components/FilterSelect";
import { useFiltersQuery } from "@/src/app/hooks/useFiltersQuery";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

interface FilterDialogProps {
  uniqueFilters: { manufacturer: string[]; type: string[]; year: number[] };
  total: number;
}

export default function FilterDialog({
  uniqueFilters,
  total,
}: FilterDialogProps) {
  const { manufacturer, setManufacturer, type, setType, year, setYear } =
    useFiltersQuery();

  const handleManufacturerChange = (value: string) => {
    setManufacturer(value === "All" ? null : value);
  };

  const handleTypeChange = (value: string) => {
    setType(value === "All" ? null : value);
  };

  const handleYearChange = (value: string) => {
    setYear(value === "All" ? null : value ? parseInt(value, 10) : null);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Filter Vehicles</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <FilterSelect
          filterName="manufacturer"
          label="Manufacturer"
          options={uniqueFilters.manufacturer}
          selectedValue={manufacturer}
          onValueChange={handleManufacturerChange}
        />

        <FilterSelect
          filterName="type"
          label="Type"
          options={uniqueFilters.type}
          selectedValue={type}
          onValueChange={handleTypeChange}
        />

        <FilterSelect
          filterName="year"
          label="Year"
          options={uniqueFilters.year}
          selectedValue={year}
          onValueChange={handleYearChange}
        />
      </div>

      <div className="mt-4 text-center text-lg font-semibold">
        {total} vehicles match your criteria
      </div>
      {/* Future Sort Feature Area */}
      <div className="mt-6 border-t pt-4">
        <h3 className="mb-2 text-lg font-semibold">
          Sort Options (Coming Soon)
        </h3>
        {/* Placeholder for sort controls */}
        <p className="text-sm text-gray-500">
          Sorting by price and year will be added here.
        </p>
      </div>
    </DialogContent>
  );
}
