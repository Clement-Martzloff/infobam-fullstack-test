import { vehicleSearchParamsLoader } from "@/infrastructure/framework/nextjs/vehicleSearchParamsLoader";
import VehicleListServer from "@/src/app/components/VehicleListServer";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const parsedSearchParams = vehicleSearchParamsLoader(await searchParams);

  return (
    <div>
      <Suspense fallback={<div>Loading vehicles...</div>}>
        <VehicleListServer searchParams={parsedSearchParams} />
      </Suspense>
    </div>
  );
}
