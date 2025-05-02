import { GetUniqueFilterValuesUseCase } from "@/core/application/usecases/getUniqueFilterValuesUseCase";
import { MockVehicleRepository } from "@/infrastructure/repositories/MockVehicleRepository";
import "server-only";

const vehicleRepository = new MockVehicleRepository();
const getUniqueFilterValuesUseCase = new GetUniqueFilterValuesUseCase(
  vehicleRepository,
);

export async function getVehicleFilterOptions() {
  try {
    const uniqueFilters = await getUniqueFilterValuesUseCase.execute();
    return { data: uniqueFilters, error: null };
  } catch (error: unknown) {
    console.error("Error fetching unique filter values:", error);
    return { data: null, error: "Failed to fetch filter options" };
  }
}
