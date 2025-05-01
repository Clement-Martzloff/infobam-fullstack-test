import VehicleListServer from "@/src/components/VehicleListServer";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    manufacturer?: string;
    type?: string;
    year?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}) {
  return (
    <div>
      <Suspense fallback={<div>Loading vehicles...</div>}>
        <VehicleListServer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
