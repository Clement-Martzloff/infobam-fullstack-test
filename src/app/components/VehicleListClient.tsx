"use client";

import { Vehicle } from "@/core/domain/entities/vehicle";
import PaginationControls from "@/src/app/components/PaginationControls";
import VehicleFilters from "@/src/app/components/VehicleFilters";
import VehicleListGrid from "@/src/app/components/VehicleListGrid";
import { usePaginationQuery } from "@/src/app/hooks/usePaginationQuery";

interface VehicleListClientProps {
  vehicles: Vehicle[];
  total: number;
  uniqueFilters: { manufacturer: string[]; type: string[]; year: number[] };
}

export default function VehicleListClient({
  vehicles,
  total,
  uniqueFilters,
}: VehicleListClientProps) {
  const { page, setPage, limit } = usePaginationQuery();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Vehicle Listing</h1>
      <div className="mb-4 flex items-center justify-between">
        <VehicleFilters uniqueFilters={uniqueFilters} total={total} />
      </div>
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
