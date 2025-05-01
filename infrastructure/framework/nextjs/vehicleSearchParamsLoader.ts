import { vehicleSearchParams } from "@/infrastructure/framework/nextjs/vehicleSearchParams";
import { createLoader, SearchParams } from "nuqs/server";
import "server-only";

const baseLoader = createLoader(vehicleSearchParams);

export const vehicleSearchParamsLoader = (searchParams: SearchParams) => {
  const parsed = baseLoader(searchParams);

  return {
    pagination: {
      page: parsed.page,
      limit: parsed.limit,
    },
    filters: {
      manufacturer: parsed.manufacturer,
      type: parsed.type,
      year: parsed.year,
    },
    sorting: {
      sortBy: parsed.sortBy,
      sortOrder: parsed.sortOrder,
    },
  };
};

export type ParsedVehicleSearchParams = ReturnType<
  typeof vehicleSearchParamsLoader
>;
