import { getVehicleById } from "@/infrastructure/nextjs/vehicleServerFunctions";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
      <div className="mb-4">
        <Link href="/">
          <Button variant="secondary" size="sm">
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Image and Title Card */}
      <Card className="mb-4 w-full">
        <CardContent className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-2">
          {/* Image Section */}
          <div className="flex items-center justify-center lg:col-span-1">
            {vehicle.images && vehicle.images.length > 0 && (
              <Image
                src={vehicle.images[0]}
                alt={`Image of ${vehicle.model}`}
                width={220}
                height={128}
                className="mx-auto w-[190px] md:w-[220px]"
                priority={true}
              />
            )}
          </div>
          {/* Title Section */}
          <div className="flex flex-col lg:col-span-1">
            <CardTitle>
              {vehicle.manufacturer} {vehicle.model}
            </CardTitle>
            <CardDescription>{vehicle.description}</CardDescription>
          </div>
        </CardContent>
      </Card>

      {/* Features Card */}
      <Card className="mb-4 w-full">
        {/* <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader> */}
        <CardContent>
          <div className="space-y-1">
            {vehicle.features.map((feature, index) => (
              <Badge className="mr-1" key={index}>
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Details Section */}
      <Card className="mb-4 w-full">
        <CardContent>
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start gap-y-4 pb-4 last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-">
              <p className="text-sm leading-none font-medium">Year</p>
              <p className="text-muted-foreground text-sm">{vehicle.year}</p>
            </div>
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm leading-none font-medium">Price</p>
              <p className="text-muted-foreground text-sm">{vehicle.price}</p>
            </div>
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm leading-none font-medium">Type</p>
              <p className="text-muted-foreground text-sm">{vehicle.type}</p>
            </div>
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm leading-none font-medium">Fuel Type</p>
              <p className="text-muted-foreground text-sm">
                {vehicle.fuelType}
              </p>
            </div>
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm leading-none font-medium">Transmission</p>
              <p className="text-muted-foreground text-sm">
                {vehicle.transmission}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
