import {
  IVehicleFilterRepository,
  VehicleFilterParam,
} from "@/core/domain/interfaces/IVehicleFilterRepository";

export class GetFilterValuesUseCase {
  constructor(private repository: IVehicleFilterRepository) {}

  async execute(params?: VehicleFilterParam): Promise<{
    manufacturer: string[];
    type: string[];
    year: number[];
  }> {
    return await this.repository.getFilterValues(params);
  }
}
