/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Vehicle } from "@/core/domain/entities/vehicle";
import { getVehicles } from "@/infrastructure/framework/nextjs/vehicleServerFunctions";
import { useEffect, useState } from "react";

interface VehicleListClientProps {
  initialVehicles: Vehicle[];
  initialTotal: number;
}

export default function VehicleListClient({
  initialVehicles,
  initialTotal,
}: VehicleListClientProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [total, setTotal] = useState<number>(initialTotal);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [manufacturer, setManufacturer] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [year, setYear] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<"price" | "year" | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      const { data, error } = await getVehicles({
        page,
        limit,
        manufacturer,
        type,
        year,
        sortBy,
        sortOrder,
      });
      if (data) {
        setVehicles(data.vehicles);
        setTotal(data.total);
      } else if (error) {
        console.error("Error fetching vehicles:", error);
        // Handle error display to user
      }
      setLoading(false);
    };

    // Only fetch if parameters change (excluding initial load handled by Server Component)
    // This useEffect will handle subsequent fetches based on filter/sort/pagination changes
    if (
      page !== 1 ||
      manufacturer ||
      type ||
      year !== undefined ||
      sortBy ||
      sortOrder
    ) {
      fetchVehicles();
    }
  }, [page, limit, manufacturer, type, year, sortBy, sortOrder]); // Dependencies

  // TODO: Implement pagination controls, filter dropdowns, and sort options
  // TODO: Add handlers for changing page, limit, filters, and sort

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Vehicle Listing</h1>

      {/* TODO: Add Filter and Sort Controls */}
      <div className="mb-4">{/* Filter and Sort controls will go here */}</div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle: Vehicle) => (
            <div key={vehicle.id} className="rounded border p-4 shadow">
              <h2 className="text-xl font-semibold">
                {vehicle.manufacturer} {vehicle.model}
              </h2>
              <p>Year: {vehicle.year}</p>
              <p>Price: ${vehicle.price}</p>
              <p>Type: {vehicle.type}</p>
              {/* TODO: Add link to detail page */}
            </div>
          ))}
        </div>
      )}

      {/* TODO: Add Pagination Controls */}
      <div className="mt-4">
        {/* Pagination controls will go here */}
        <p>Total vehicles: {total}</p>
      </div>
    </div>
  );
}
