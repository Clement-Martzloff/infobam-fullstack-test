/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Vehicle } from "@/core/domain/entities/vehicle";
import { getVehicles } from "@/infrastructure/framework/nextjs/vehicleServerFunctions";
import { useQueryState } from "nuqs";
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

  // Use nuqs for pagination state
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => parseInt(value) || 1,
  });
  const [limit, setLimit] = useQueryState("limit", {
    defaultValue: 5,
    parse: (value) => parseInt(value) || 5,
  });

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

    // Fetch whenever pagination, filter, or sort parameters change
    fetchVehicles();
  }, [page, limit, manufacturer, type, year, sortBy, sortOrder]); // Dependencies now include nuqs state

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(total / limit);
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // TODO: Implement filter dropdowns, and sort options
  // TODO: Add handlers for changing limit, filters, and sort

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

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={page <= 1 || loading}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page >= Math.ceil(total / limit) || loading}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="mt-2">
        <p>Total vehicles: {total}</p>
      </div>
    </div>
  );
}
