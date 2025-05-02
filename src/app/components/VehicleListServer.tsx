import { Vehicle } from "@/core/domain/entities/vehicle";
import { ParsedVehicleSearchParams } from "@/infrastructure/framework/nextjs/vehicleSearchParamsLoader";
import {
  getVehicles,
  getFilteredUniqueFilters,
} from "@/infrastructure/framework/nextjs/vehicleServerFunctions";
import VehicleListClient from "@/src/app/components/VehicleListClient";

interface VehicleListServerProps {
  searchParams: ParsedVehicleSearchParams;
}

export default async function VehicleListServer({
  searchParams,
}: VehicleListServerProps) {
  const { pagination, filters } = searchParams;
  const { data: vehiclesData, error: vehiclesError } = await getVehicles({
    ...pagination,
    ...filters,
  });
  const { data: uniqueFiltersData, error: uniqueFiltersError } =
    await getFilteredUniqueFilters(filters);

  if (vehiclesError) {
    return <div>Error loading vehicles: {vehiclesError}</div>;
  }

  if (uniqueFiltersError) {
    return <div>Error loading filter options: {uniqueFiltersError}</div>;
  }

  const vehicles: Vehicle[] = vehiclesData?.vehicles || [];
  const total: number = vehiclesData?.total || 0;
  const uniqueFilters = uniqueFiltersData || {
    manufacturer: [],
    type: [],
    year: [],
  };

  return (
    <VehicleListClient
      vehicles={vehicles}
      total={total}
      uniqueFilters={uniqueFilters}
    />
  );
}
