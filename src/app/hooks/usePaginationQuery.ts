import { vehicleSearchParams } from "@/infrastructure/framework/nextjs/vehicleSearchParams";
import { useQueryState } from "nuqs";

export function usePaginationQuery() {
  const [page, setPage] = useQueryState("page", {
    ...vehicleSearchParams.page,
    shallow: false,
  });
  const [limit, setLimit] = useQueryState("limit", {
    ...vehicleSearchParams.limit,
    shallow: false,
  });

  return {
    page,
    setPage,
    limit,
    setLimit,
  };
}
