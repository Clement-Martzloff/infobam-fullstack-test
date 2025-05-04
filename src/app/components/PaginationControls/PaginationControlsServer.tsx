import type { ParsedVehicleSearchParams } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import { getVehicleCount } from "@/infrastructure/nextjs/vehicleServerFunctions";
import PaginationControlsClient from "@/src/app/components/PaginationControls/PaginationControlsClient";

export default async function PaginationControlsServer({
  searchParams,
}: {
  searchParams: ParsedVehicleSearchParams;
}) {
  const result = await getVehicleCount({
    manufacturer: searchParams.filters.manufacturer,
    type: searchParams.filters.type,
    year: searchParams.filters.year,
  });

  const total = result.data ?? 0;

  return <PaginationControlsClient total={total} />;
}
