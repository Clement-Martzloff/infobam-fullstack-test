import {
  GetVehicleByIdUseCase,
  GetVehicleCountUseCase,
  SearchVehiclesUseCase,
} from "@/core/usecases/vehicleUseCases";
import { MockVehicleRepository } from "@/infrastructure/repositories/MockVehicleRepository";
import "server-only";

const mockVehicleRepository = new MockVehicleRepository();
const searchVehiclesUseCase = new SearchVehiclesUseCase(mockVehicleRepository);
const getVehicleByIdUseCase = new GetVehicleByIdUseCase(mockVehicleRepository);
const getVehicleCountUseCase = new GetVehicleCountUseCase(
  mockVehicleRepository,
);

export async function searchVehicules(params: {
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
    const result = await searchVehiclesUseCase.execute(cleanedParams);
    return { data: result, error: null };
  } catch (error: unknown) {
    console.error("Error fetching vehicles:", error);
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
    };
  }
}

export async function getVehicleCount(params: {
  manufacturer?: string | null;
  type?: string | null;
  year?: number | null;
}) {
  try {
    const cleanedParams = {
      manufacturer: params.manufacturer ?? undefined,
      type: params.type ?? undefined,
      year: params.year ?? undefined,
    };
    const uniqueFilters = await getVehicleCountUseCase.execute(cleanedParams);
    return { data: uniqueFilters, error: null };
  } catch (error: unknown) {
    console.error("Error getting vehicle count:", error);
    return { data: null };
  }
}
