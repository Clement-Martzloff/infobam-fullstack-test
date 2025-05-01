import {
  GetVehicleByIdUseCase,
  GetVehiclesUseCase,
} from "@/core/application/usecases/vehicleUseCases";
import { MockVehicleRepository } from "@/infrastructure/repositories/MockVehicleRepository";
import "server-only";

const vehicleRepository = new MockVehicleRepository();
const getVehiclesUseCase = new GetVehiclesUseCase(vehicleRepository);
const getVehicleByIdUseCase = new GetVehicleByIdUseCase(vehicleRepository);

export async function getVehicles(params: {
  page?: number | null;
  limit?: number | null;
  manufacturer?: string | null;
  type?: string | null;
  year?: number | null;
  sortBy?: "price" | "year" | null;
  sortOrder?: "asc" | "desc" | null;
}) {
  try {
    // Convert nulls to undefined for the use case if it expects undefined
    const cleanedParams = {
      page: params.page ?? undefined,
      limit: params.limit ?? undefined,
      manufacturer: params.manufacturer ?? undefined,
      type: params.type ?? undefined,
      year: params.year ?? undefined,
      sortBy: params.sortBy ?? undefined,
      sortOrder: params.sortOrder ?? undefined,
    };
    const result = await getVehiclesUseCase.execute(cleanedParams);
    return { data: result, error: null };
  } catch (error: unknown) {
    console.error("Error fetching vehicles:", error);
    // return { data: null, error: error.message || "Failed to fetch vehicles" };
    return { data: null };
  }
}

export async function getVehicleById(id: string) {
  try {
    const result = await getVehicleByIdUseCase.execute(id);
    return { data: result, error: null };
  } catch (error: unknown) {
    console.error(`Error fetching vehicle with ID ${id}:`, error);
    return {
      data: null,
      // error: error.message || `Failed to fetch vehicle with ID ${id}`,
    };
  }
}
