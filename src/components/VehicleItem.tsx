import { Vehicle } from "@/core/domain/entities/vehicle";

interface VehicleItemProps {
  vehicle: Vehicle;
}

export default function VehicleItem({ vehicle }: VehicleItemProps) {
  return (
    <div key={vehicle.id} className="rounded border p-4 shadow">
      <h2 className="text-xl font-semibold">
        {vehicle.manufacturer} {vehicle.model}
      </h2>
      <p>Year: {vehicle.year}</p>
      <p>Price: ${vehicle.price}</p>
      <p>Type: {vehicle.type}</p>
      {/* TODO: Add link to detail page */}
    </div>
  );
}
