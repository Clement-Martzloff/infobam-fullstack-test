import { Vehicle } from "@/core/domain/entities/vehicle";
import { IVehicleRepository } from "@/core/domain/interfaces/IVehicleRepository";

export class GetVehiclesUseCase {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async execute(params: {
    page?: number;
    limit?: number;
    manufacturer?: string;
    type?: string;
    year?: number;
    sortBy?: "price" | "year";
    sortOrder?: "asc" | "desc";
  }): Promise<{ vehicles: Vehicle[]; total: number }> {
    return this.vehicleRepository.getVehicles(params);
  }
}

export class GetFilteredUniqueFilterValuesUseCase {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async execute(params: {
    manufacturer?: string;
    type?: string;
    year?: number;
  }): Promise<{
    manufacturer: string[];
    type: string[];
    year: number[];
  }> {
    return this.vehicleRepository.getUniqueFilterValues(params);
  }
}

export class GetVehicleByIdUseCase {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async execute(id: string): Promise<Vehicle | null> {
    return this.vehicleRepository.getVehicleById(id);
  }
}
