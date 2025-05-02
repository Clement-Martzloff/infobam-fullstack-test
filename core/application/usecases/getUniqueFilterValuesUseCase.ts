import { IVehicleRepository } from "@/core/domain/interfaces/IVehicleRepository";

export class GetUniqueFilterValuesUseCase {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async execute(): Promise<{
    manufacturer: string[];
    type: string[];
    year: number[];
  }> {
    return this.vehicleRepository.getUniqueFilterValues();
  }
}
