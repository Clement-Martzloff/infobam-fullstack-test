import { Vehicle } from "@/core/domain/entities/vehicle";
import { ParsedVehicleSearchParams } from "@/infrastructure/framework/nextjs/vehicleSearchParamsLoader";
import { getVehicles } from "@/infrastructure/framework/nextjs/vehicleServerFunctions";
import VehicleListClient from "@/src/components/VehicleListClient";

interface VehicleListServerProps {
  searchParams: ParsedVehicleSearchParams;
}

export default async function VehicleListServer({
  searchParams,
}: VehicleListServerProps) {
  // console.log("searchParams: ", searchParams);
  const { pagination } = searchParams;
  const { data, error } = await getVehicles({ ...pagination });

  if (error) {
    return <div>Error loading vehicles: {error}</div>;
  }

  const vehicles: Vehicle[] = data?.vehicles || [];
  const total: number = data?.total || 0;

  return <VehicleListClient vehicles={vehicles} total={total} />;
}
