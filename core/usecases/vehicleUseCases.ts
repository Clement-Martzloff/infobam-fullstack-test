import { Vehicle } from "@/core/domain/entities/vehicle";
import {
  IVehicleRepository,
  VehicleSearchParam,
} from "@/core/domain/interfaces/IVehicleRepository";

export class SearchVehiclesUseCase {
  constructor(private repository: IVehicleRepository) {}

  async execute(params: VehicleSearchParam): Promise<Vehicle[]> {
    return await this.repository.searchVehicles(params);
  }
}

export class GetVehicleByIdUseCase {
  constructor(private repository: IVehicleRepository) {}

  async execute(id: string): Promise<Vehicle | null> {
    return await this.repository.getVehicleById(id);
  }
}

export class GetVehicleCountUseCase {
  constructor(private repository: IVehicleRepository) {}

  async execute(params: {
    manufacturer?: string[] | null;
    type?: string[] | null;
    year?: number[] | null;
  }): Promise<number> {
    return await this.repository.getVehicleCount(params);
  }
}
