import type { ParsedVehicleSearchParams } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import { getVehicleCount } from "@/infrastructure/nextjs/vehicleServerFunctions";
import PaginationControlClient from "@/src/app/components/PaginationControl/PaginationControlClient";

interface PaginationControlServer {
  searchParams: ParsedVehicleSearchParams;
}

export default async function PaginationControlServer({
  searchParams,
}: PaginationControlServer) {
  const result = await getVehicleCount({
    manufacturer: searchParams.filters.manufacturer,
    type: searchParams.filters.type,
    year: searchParams.filters.year,
  });

  const total = result.data ?? 0;

  return <PaginationControlClient total={total} />;
}
