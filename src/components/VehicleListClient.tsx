/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Vehicle } from "@/core/domain/entities/vehicle";
import { useQueryState } from "nuqs";

interface VehicleListClientProps {
  vehicles: Vehicle[];
  total: number;
}

export default function VehicleListClient({
  vehicles,
  total,
}: VehicleListClientProps) {
  const [page, setPage] = useQueryState<number>("page", {
    defaultValue: 1,
    parse: (value) => parseInt(value) || 1,
  });
  const [limit, setLimit] = useQueryState<number>("limit", {
    defaultValue: 5,
    parse: (value) => parseInt(value) || 5,
  });
  const [manufacturer, setManufacturer] = useQueryState<string | null>(
    "manufacturer",
    {
      defaultValue: null,
      parse: (value) => (value === "" ? null : value),
      serialize: (value) => (value === null ? "" : value),
    },
  );
  const [type, setType] = useQueryState<string | null>("type", {
    defaultValue: null,
    parse: (value) => (value === "" ? null : value),
    serialize: (value) => (value === null ? "" : value),
  });
  const [year, setYear] = useQueryState<number | null>("year", {
    defaultValue: null,
    parse: (value) => (value ? parseInt(value, 10) : null),
    serialize: (value) => (value === null ? "" : String(value)),
  });
  const [sortBy, setSortBy] = useQueryState<"price" | "year" | null>("sortBy", {
    defaultValue: null,
    parse: (value) => (value === "price" || value === "year" ? value : null),
    serialize: (value) => (value === null ? "" : value),
  });
  const [sortOrder, setSortOrder] = useQueryState<"asc" | "desc" | null>(
    "sortOrder",
    {
      defaultValue: null,
      parse: (value) => (value === "asc" || value === "desc" ? value : null),
      serialize: (value) => (value === null ? "" : value),
    },
  );

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Vehicle Listing</h1>
      <div className="mb-4">{/* Filter and Sort controls will go here */}</div>
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
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={page <= 1}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page >= Math.ceil(total / limit)}
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
