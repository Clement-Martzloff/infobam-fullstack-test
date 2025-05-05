import { getVehicleById } from "@/infrastructure/nextjs/vehicleServerFunctions";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";
import Link from "next/link";

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
    <div className="container mx-auto p-4 lg:max-w-2xl">
      <div className="mb-2">
        <Link href="/">
          <Button variant="secondary" size="sm">
            Back to Home
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            {vehicle.manufacturer} {vehicle.model}
          </CardTitle>
          <CardDescription>{vehicle.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Image Section */}
            {vehicle.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Image of ${vehicle.model} ${index + 1}`}
                width={220}
                height={128}
                className="mx-auto w-[190px] md:w-[220px]"
                priority={true}
              />
            ))}

            {/* Details Section */}
            <div className="lg:col-span-1">
              <div className="mt-4 lg:mt-0">
                <h2 className="mb-2 text-lg font-semibold">Features</h2>
                <ul className="list-inside list-disc">
                  {vehicle.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h2 className="mb-2 text-lg font-semibold">Technical</h2>
                <ul className="list-inside list-disc text-sm">
                  <li>
                    <span className="font-semibold">Year: </span>
                    {vehicle.year}
                  </li>
                  <li>
                    <span className="font-semibold">Price: </span>$
                    {vehicle.price}
                  </li>
                  <li>
                    <span className="font-semibold">Type: </span>
                    {vehicle.type}
                  </li>
                  <li>
                    <span className="font-semibold">Fuel Type: </span>
                    {vehicle.fuelType}
                  </li>
                  <li>
                    <span className="font-semibold">Transmission: </span>
                    {vehicle.transmission}
                  </li>
                  <li>
                    <span className="font-semibold">Mileage: </span>
                    {vehicle.mileage} miles
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
