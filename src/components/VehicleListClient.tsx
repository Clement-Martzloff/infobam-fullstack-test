"use client";

import { Vehicle } from "@/core/domain/entities/vehicle";
import { usePaginationQuery } from "@/src/app/hooks/usePaginationQuery";
import PaginationControls from "@/src/components/PaginationControls";
import VehicleListGrid from "@/src/components/VehicleListGrid";

interface VehicleListClientProps {
  vehicles: Vehicle[];
  total: number;
}

export default function VehicleListClient({
  vehicles,
  total,
}: VehicleListClientProps) {
  const { page, setPage, limit } = usePaginationQuery();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Vehicle Listing</h1>
      <div className="mb-4">{/* Filter and Sort controls will go here */}</div>
      <VehicleListGrid vehicles={vehicles} />
      <PaginationControls
        page={page}
        limit={limit}
        total={total}
        setPage={setPage}
      />
    </div>
  );
}
