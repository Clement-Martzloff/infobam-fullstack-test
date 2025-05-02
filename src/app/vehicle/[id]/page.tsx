import { getVehicleById } from "@/infrastructure/nextjs/vehicleServerFunctions";

export default async function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { data: vehicle, error } = await getVehicleById(id);

  if (error) {
    return <div>Error loading vehicle details: {error}</div>;
  }

  if (!vehicle) {
    return <div>Vehicle not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        {vehicle.manufacturer} {vehicle.model}
      </h1>
      <p>Year: {vehicle.year}</p>
      <p>Price: ${vehicle.price}</p>
      <p>Type: {vehicle.type}</p>
      <p>Fuel Type: {vehicle.fuelType}</p>
      <p>Transmission: {vehicle.transmission}</p>
      {vehicle.mileage && <p>Mileage: {vehicle.mileage} miles</p>}
      <div className="mt-4">
        <h2 className="mb-2 text-xl font-semibold">Features</h2>
        <ul className="list-inside list-disc">
          {vehicle.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="mb-2 text-xl font-semibold">Description</h2>
        <p>{vehicle.description}</p>
      </div>
      {/* TODO: Display images */}
      <div className="mt-4">
        <h2 className="mb-2 text-xl font-semibold">Images</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Images will go here */}
        </div>
      </div>
    </div>
  );
}
