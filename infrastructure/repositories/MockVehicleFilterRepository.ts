import {
  IVehicleFilterRepository,
  VehicleFilterParam,
} from "@/core/domain/interfaces/IVehicleFilterRepository";
import { mockVehicles } from "@/infrastructure/data/mockVehicles";

export class MockVehicleFilterRepository implements IVehicleFilterRepository {
  async getFilterValues(params?: VehicleFilterParam): Promise<{
    manufacturer: string[];
    type: string[];
    year: number[];
  }> {
    let filteredVehicles = mockVehicles;

    if (params?.manufacturer) {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.manufacturer === params.manufacturer,
      );
    }
    if (params?.type) {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.type === params.type,
      );
    }
    if (params?.year) {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.year === params.year,
      );
    }

    const manufacturers = Array.from(
      new Set(filteredVehicles.map((vehicle) => vehicle.manufacturer)),
    ).sort();
    const types = Array.from(
      new Set(filteredVehicles.map((vehicle) => vehicle.type)),
    ).sort();
    const years = Array.from(
      new Set(filteredVehicles.map((vehicle) => vehicle.year)),
    ).sort((a, b) => a - b);

    return {
      manufacturer: manufacturers,
      type: types,
      year: years,
    };
  }
}
