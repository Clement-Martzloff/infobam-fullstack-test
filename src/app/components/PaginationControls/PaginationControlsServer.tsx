import type { ParsedVehicleSearchParams } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import { getVehicleCount } from "@/infrastructure/nextjs/vehicleServerFunctions";
import PaginationControls from "@/src/app/components/PaginationControls/PaginationControls";

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

  // PaginationControls is a client component, it will handle page/limit state via usePaginationQuery
  // and receive the total count from the server component.
  return <PaginationControls total={total} />;
}
