import { Vehicle } from "@/core/domain/entities/vehicle";
import VehicleItem from "@/src/app/components/VehicleItem";

interface VehicleListGridProps {
  vehicles: Vehicle[];
}

export default function VehicleListGrid({ vehicles }: VehicleListGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle: Vehicle) => (
        <VehicleItem key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
