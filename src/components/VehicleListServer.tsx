import { Vehicle } from "@/core/domain/entities/vehicle";
import { getVehicles } from "@/infrastructure/framework/nextjs/vehicleServerFunctions";
import VehicleListClient from "@/src/components/VehicleListClient";

interface VehicleListServerProps {
  searchParams: {
    page?: string;
    limit?: string;
    manufacturer?: string;
    type?: string;
    year?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}

export default async function VehicleListServer({
  searchParams,
}: VehicleListServerProps) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "5", 10);
  const manufacturer = searchParams.manufacturer;
  const type = searchParams.type;
  const year = searchParams.year ? parseInt(searchParams.year, 10) : undefined;
  const sortBy = searchParams.sortBy as "price" | "year" | undefined;
  const sortOrder = searchParams.sortOrder as "asc" | "desc" | undefined;

  const { data, error } = await getVehicles({
    page,
    limit,
    manufacturer,
    type,
    year,
    sortBy,
    sortOrder,
  });

  if (error) {
    return <div>Error loading vehicles: {error}</div>;
  }

  const vehicles: Vehicle[] = data?.vehicles || [];
  const total: number = data?.total || 0;

  return <VehicleListClient vehicles={vehicles} total={total} />;
}
