import { ParsedVehicleSearchParams } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import { searchVehicules } from "@/infrastructure/nextjs/vehicleServerFunctions";
import VehicleListGrid from "@/src/app/components/VehicleListGrid/VehicleListGrid";

interface VehicleListServerProps {
  searchParams: ParsedVehicleSearchParams;
}

export default async function VehicleListGridServer({
  searchParams,
}: VehicleListServerProps) {
  const { filters, pagination, sorting } = searchParams;
  const { data: vehiclesData, error: vehiclesError } = await searchVehicules({
    ...pagination,
    ...filters,
    ...sorting,
  });

  if (vehiclesError) {
    return <div>Error loading vehicles: {vehiclesError}</div>;
  }

  const vehicles = vehiclesData || [];

  return <VehicleListGrid vehicles={vehicles} />;
}
