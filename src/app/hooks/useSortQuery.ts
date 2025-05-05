import { vehicleSearchParamsParser } from "@/infrastructure/nextjs/vehicleSearchParamsParser";
import { useQueryState } from "nuqs";

export const useSortQuery = () => {
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    ...vehicleSearchParamsParser.sortBy,
    shallow: false,
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    ...vehicleSearchParamsParser.sortOrder,
    shallow: false,
  });

  return {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  };
};
