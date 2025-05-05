import { ParsedVehicleSearchParams } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface FiltersContextValue {
  stagedFilters: ParsedVehicleSearchParams["filters"];
  setStagedFilters: Dispatch<
    SetStateAction<ParsedVehicleSearchParams["filters"]>
  >;
}

export const FiltersContext = createContext<FiltersContextValue | undefined>(
  undefined,
);

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
