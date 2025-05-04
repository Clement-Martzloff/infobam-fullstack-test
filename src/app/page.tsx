import { vehicleSearchParamsLoader } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import PaginationControlsServer from "@/src/app/components/PaginationControls/PaginationControlsServer"; // Import the new server component
import SortSelectorClient from "@/src/app/components/SortSelectors/SortSelectorClient"; // Import SortSelectorClient
import VehicleCountTextServer from "@/src/app/components/VehicleCountTextServer";
import { getFilterValues } from "@/infrastructure/nextjs/vehicleFilterServerFunctions";
import VehicleFiltersDialog from "@/src/app/components/VehicleFiltersDialog";
import VehicleListGridServer from "@/src/app/components/VehicleListGrid/VehicleListGridServer"; // Import VehicleListGridServer
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";

interface HomePageProps {
  searchParams: Promise<SearchParams>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const parsedSearchParams = vehicleSearchParamsLoader(await searchParams);
  const { data: filterOptions } = await getFilterValues(
    parsedSearchParams.filters,
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Vehicle Listing</h1>
      <div className="mb-4 flex items-center justify-between">
        <VehicleFiltersDialog
          vehicleCountText={
            <Suspense fallback={<div>Loading vehicle count...</div>}>
              <VehicleCountTextServer searchParams={parsedSearchParams} />
            </Suspense>
          }
          searchParams={parsedSearchParams}
          filterOptions={filterOptions!}
        ></VehicleFiltersDialog>
        <SortSelectorClient />
      </div>
      <Suspense fallback={<div>Loading vehicles...</div>}>
        <VehicleListGridServer searchParams={parsedSearchParams} />
      </Suspense>
      <Suspense fallback={<div>Loading pagination...</div>}>
        <PaginationControlsServer searchParams={parsedSearchParams} />
      </Suspense>
    </div>
  );
}
