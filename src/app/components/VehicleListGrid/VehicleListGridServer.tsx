import { ParsedVehicleSearchParams } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import { searchVehicules } from "@/infrastructure/nextjs/vehicleServerFunctions";
import VehicleListGridClient from "@/src/app/components/VehicleListGrid/VehicleListGridClient";

interface VehicleListServerProps {
  searchParams: ParsedVehicleSearchParams;
}

export default async function VehicleListGridServer({
  searchParams,
}: VehicleListServerProps) {
  const { filters, pagination } = searchParams;
  const { data: vehiclesData, error: vehiclesError } = await searchVehicules({
    ...pagination,
    ...filters,
  });

  if (vehiclesError) {
    return <div>Error loading vehicles: {vehiclesError}</div>;
  }

  const vehicles = vehiclesData || [];

  return <VehicleListGridClient vehicles={vehicles} />;
}
