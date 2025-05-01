import { vehicleSearchParamsLoader } from "@/infrastructure/framework/nextjs/vehicleSearchParamsLoader";
import VehicleListServer from "@/src/components/VehicleListServer";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // console.log("searchParams: ", await searchParams);
  const parsedSearchParams = vehicleSearchParamsLoader(await searchParams);
  // console.log("parsedSearchParams: ", parsedSearchParams);

  return (
    <div>
      <Suspense fallback={<div>Loading vehicles...</div>}>
        <VehicleListServer searchParams={parsedSearchParams} />
      </Suspense>
    </div>
  );
}
