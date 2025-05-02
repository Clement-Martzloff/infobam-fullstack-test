import { getFilterValues } from "@/infrastructure/nextjs/vehicleFilterServerFunctions";
import { ParsedVehicleSearchParams } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import FilterSelectorClient from "@/src/app/components/FilterSelectors/FilterSelectorClient";

interface FilterSelectorServerProps {
  filterName: string;
  label: string;
  searchParams: ParsedVehicleSearchParams;
}

export default async function FilterSelectorServer({
  filterName,
  label,
  searchParams,
}: FilterSelectorServerProps) {
  const { filters } = searchParams;
  // Fetch all filter values, assuming getFilterValues returns an object with keys like 'manufacturer', 'type', 'year'
  const { data: filterValuesData, error: filterValuesError } =
    await getFilterValues(filters);

  if (filterValuesError) {
    return (
      <div>
        Error loading {label.toLowerCase()} filters: {filterValuesError}
      </div>
    );
  }

  // Define a type for the expected filter values structure
  interface FilterValues {
    manufacturer?: (string | number)[];
    type?: (string | number)[];
    year?: (string | number)[];
    [key: string]: (string | number)[] | undefined; // Allow other potential filter keys
  }

  const filterValues: FilterValues = filterValuesData || {};
  // Extract the specific options for the given filterName
  const options = filterValues[filterName] || [];

  // Ensure options is an array of string | number
  const validOptions: (string | number)[] = Array.isArray(options)
    ? options.filter(
        (item): item is string | number =>
          typeof item === "string" || typeof item === "number",
      )
    : [];

  return (
    <FilterSelectorClient
      filterName={filterName}
      label={label}
      options={validOptions}
    />
  );
}
