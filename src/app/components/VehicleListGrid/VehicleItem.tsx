import { Vehicle } from "@/core/domain/entities/vehicle";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VehicleItemProps {
  vehicle: Vehicle;
}

export default function VehicleItem({ vehicle }: VehicleItemProps) {
  return (
    <Card key={vehicle.id} className="gap-3">
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
      <CardHeader>
        <CardTitle>{vehicle.model}</CardTitle>
        <CardDescription>{vehicle.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight">
          $
          {vehicle.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <Badge>{vehicle.manufacturer}</Badge>&nbsp;
        <Badge>{vehicle.year}</Badge>&nbsp;
        <Badge>{vehicle.type}</Badge>
      </CardContent>
      <CardFooter className="mt-2">
        <Link href={`/vehicle/${vehicle.id}`} className="w-full">
          <Button className="w-full hover:cursor-pointer" variant="secondary">
            <Search /> More Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
