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

    if (params?.manufacturer && params.manufacturer.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        params.manufacturer!.includes(vehicle.manufacturer),
      );
    }
    if (params?.type && params.type.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        params.type!.includes(vehicle.type),
      );
    }
    if (params?.year && params.year.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        params.year!.includes(vehicle.year),
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
