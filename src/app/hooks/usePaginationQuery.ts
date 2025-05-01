import { vehicleSearchParamsParser } from "@/infrastructure/framework/nextjs/vehicleSearchParamsParser";
import { useQueryState } from "nuqs";

export function usePaginationQuery() {
  const [page, setPage] = useQueryState("page", {
    ...vehicleSearchParamsParser.page,
    shallow: false,
  });
  const [limit, setLimit] = useQueryState("limit", {
    ...vehicleSearchParamsParser.limit,
    shallow: false,
  });

  return {
    page,
    setPage,
    limit,
    setLimit,
  };
}
