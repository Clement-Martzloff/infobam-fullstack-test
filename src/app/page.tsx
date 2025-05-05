import { getFilterValues } from "@/infrastructure/nextjs/vehicleFilterServerFunctions";
import { vehicleSearchParamsLoader } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import PaginationControlsServer from "@/src/app/components/PaginationControl/PaginationControlServer";
import SortSelectorClient from "@/src/app/components/SortSelector/SortSelectorClient";
import VehicleFilterDialog from "@/src/app/components/VehicleFiltersDialog/VehicleFiltersDialog";
import VehicleListGridServer from "@/src/app/components/VehicleListGrid/VehicleListGridServer";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: Promise<SearchParams>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const parsedSearchParams = vehicleSearchParamsLoader(await searchParams);
  const { data: filterOptions } = await getFilterValues(
    parsedSearchParams.filters,
  );

  return (
    <div className="container mx-auto p-4 lg:max-w-5xl">
      <h1 className="mb-4 text-2xl leading-tight font-semibold">
        Vehicle Listing
      </h1>
      <Suspense fallback={<div>Loading pagination...</div>}>
        <PaginationControlsServer searchParams={parsedSearchParams} />
      </Suspense>
      <div className="mb-4 flex items-center justify-between">
        <VehicleFilterDialog
          searchParams={parsedSearchParams}
          filterOptions={filterOptions!}
        ></VehicleFilterDialog>
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
