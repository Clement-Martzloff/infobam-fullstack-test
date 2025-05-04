import { getFilterValues } from "@/infrastructure/nextjs/vehicleFilterServerFunctions";
import { ParsedVehicleSearchParams } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import FilterCheckboxGroupClient from "@/src/app/components/FilterCheckboxGroup/FilterCheckboxGroupClient";

interface FilterCheckboxGroupServerProps {
  filterName: "manufacturer" | "type" | "year";
  label: string;
  searchParams: ParsedVehicleSearchParams;
}

export default async function FilterCheckboxGroupServer({
  filterName,
  label,
  searchParams,
}: FilterCheckboxGroupServerProps) {
  const { filters } = searchParams;
  const { data: filterValuesData, error: filterValuesError } =
    await getFilterValues(filters);

  if (filterValuesError) {
    return (
      <div>
        Error loading {label.toLowerCase()} filters: {filterValuesError}
      </div>
    );
  }

  interface FilterValues {
    manufacturer?: (string | number)[];
    type?: (string | number)[];
    year?: (string | number)[];
  }

  const filterValues: FilterValues = filterValuesData || {};
  const options = filterValues[filterName] || [];
  const validOptions: (string | number)[] = Array.isArray(options)
    ? options.filter(
        (item): item is string | number =>
          typeof item === "string" || typeof item === "number",
      )
    : [];

  return (
    <FilterCheckboxGroupClient
      filterName={filterName}
      label={label}
      options={validOptions}
    />
  );
}
