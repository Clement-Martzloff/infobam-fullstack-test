import { vehicleSearchParamsLoader } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import FilterSelectorServer from "@/src/app/components/FilterSelectors/FilterSelectorServer";
import PaginationControlsServer from "@/src/app/components/PaginationControls/PaginationControlsServer"; // Import the new server component
import VehicleCountTextServer from "@/src/app/components/VehicleCountTextServer";
import VehicleFiltersDialog from "@/src/app/components/VehicleFiltersDialog";
import VehicleListGridServer from "@/src/app/components/VehicleListGrid/VehicleListGridServer";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const parsedSearchParams = vehicleSearchParamsLoader(await searchParams);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Vehicle Listing</h1>
      <div className="mb-4 flex items-center justify-between">
        <div className="mb-4 flex items-center justify-between">
          <VehicleFiltersDialog
            VehicleCountText={
              <Suspense fallback={<div>Loading vehicle count...</div>}>
                <VehicleCountTextServer searchParams={parsedSearchParams} />
              </Suspense>
            }
            selectors={
              <>
                <Suspense fallback={<div>Loading manufacturer filters...</div>}>
                  <FilterSelectorServer
                    filterName="manufacturer"
                    label="Manufacturer"
                    searchParams={parsedSearchParams}
                  />
                </Suspense>
                <Suspense fallback={<div>Loading type filters...</div>}>
                  <FilterSelectorServer
                    filterName="type"
                    label="Type"
                    searchParams={parsedSearchParams}
                  />
                </Suspense>
                <Suspense fallback={<div>Loading year filters...</div>}>
                  <FilterSelectorServer
                    filterName="year"
                    label="Year"
                    searchParams={parsedSearchParams}
                  />
                </Suspense>
              </>
            }
          ></VehicleFiltersDialog>
        </div>
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
