import { GetFilterValuesUseCase } from "@/core/usecases/vehicleFilterUseCases";
import { MockVehicleFilterRepository } from "@/infrastructure/repositories/MockVehicleFilterRepository";
import "server-only";

const mockVehicleFilterRepository = new MockVehicleFilterRepository();
const getFilterValuesUseCase = new GetFilterValuesUseCase(
  mockVehicleFilterRepository,
);

export async function getFilterValues(params: {
  manufacturer?: string[] | null;
  type?: string[] | null;
  year?: number[] | null;
}) {
  try {
    const cleanedParams = {
      manufacturer: params.manufacturer ?? undefined,
      type: params.type ?? undefined,
      year: params.year ?? undefined,
    };
    const filters = await getFilterValuesUseCase.execute(cleanedParams);
    return { data: filters, error: null };
  } catch (error: unknown) {
    console.error("Error fetching filters:", error);
    return { data: null };
  }
}
