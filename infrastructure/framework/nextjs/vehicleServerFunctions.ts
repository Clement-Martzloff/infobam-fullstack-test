"use server";

import {
  GetVehicleByIdUseCase,
  GetVehiclesUseCase,
} from "@/core/application/usecases/vehicleUseCases";
import { MockVehicleRepository } from "@/infrastructure/repositories/MockVehicleRepository";

const vehicleRepository = new MockVehicleRepository();
const getVehiclesUseCase = new GetVehiclesUseCase(vehicleRepository);
const getVehicleByIdUseCase = new GetVehicleByIdUseCase(vehicleRepository);

export async function getVehicles(params: {
  page?: number;
  limit?: number;
  manufacturer?: string;
  type?: string;
  year?: number;
  sortBy?: "price" | "year";
  sortOrder?: "asc" | "desc";
}) {
  try {
    const result = await getVehiclesUseCase.execute(params);
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
