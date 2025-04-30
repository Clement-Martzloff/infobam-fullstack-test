import { getVehicles } from "@/infrastructure/framework/nextjs/vehicleServerFunctions";
import VehicleListClient from "@/src/components/VehicleListClient";

export default async function HomePage() {
  const { data, error } = await getVehicles({});

  if (error) {
    return <div>Error loading vehicles: {error}</div>;
  }

  const initialVehicles = data?.vehicles || [];
  const initialTotal = data?.total || 0;

  return (
    <VehicleListClient
      initialVehicles={initialVehicles}
      initialTotal={initialTotal}
    />
  );
}
