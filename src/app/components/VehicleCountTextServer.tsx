import type { ParsedVehicleSearchParams } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import { getVehicleCount } from "@/infrastructure/nextjs/vehicleServerFunctions";

export default async function VehicleCountTextServer({
  searchParams,
}: {
  searchParams: ParsedVehicleSearchParams;
}) {
  const result = await getVehicleCount({
    manufacturer: searchParams.filters.manufacturer,
    type: searchParams.filters.type,
    year: searchParams.filters.year,
  });

  const count = result.data ?? 0;

  return <>{count}</>;
}
