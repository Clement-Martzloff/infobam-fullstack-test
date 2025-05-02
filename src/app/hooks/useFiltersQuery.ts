import { vehicleSearchParamsParser } from "@/infrastructure/nextjs/vehicleSearchParamsParser";
import { useQueryState } from "nuqs";

export function useFiltersQuery() {
  const [manufacturer, setManufacturer] = useQueryState("manufacturer", {
    ...vehicleSearchParamsParser.manufacturer,
    shallow: false,
  });
  const [type, setType] = useQueryState("type", {
    ...vehicleSearchParamsParser.type,
    shallow: false,
  });
  const [year, setYear] = useQueryState("year", {
    ...vehicleSearchParamsParser.year,
    shallow: false,
  });

  return {
    manufacturer,
    setManufacturer,
    type,
    setType,
    year,
    setYear,
  };
}
