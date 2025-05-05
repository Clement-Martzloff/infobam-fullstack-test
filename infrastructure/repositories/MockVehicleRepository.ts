import { Vehicle } from "@/core/domain/entities/vehicle";
import {
  IVehicleRepository,
  VehicleSearchParam,
  VehicleCountParam,
} from "@/core/domain/interfaces/IVehicleRepository";
import { mockVehicles } from "@/infrastructure/data/mockVehicles";

export class MockVehicleRepository implements IVehicleRepository {
  async searchVehicles(params: VehicleSearchParam): Promise<Vehicle[]> {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Add 1-second delay
    let filteredVehicles = [...mockVehicles];

    // Filtering
    if (params.manufacturer && params.manufacturer.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        params.manufacturer!.includes(vehicle.manufacturer),
      );
    }
    if (params.type && params.type.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        params.type!.includes(vehicle.type),
      );
    }
    if (params.year && params.year.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        params.year!.includes(vehicle.year),
      );
    }

    // Sorting
    if (params.sortBy) {
      filteredVehicles.sort((a, b) => {
        const valueA = a[params.sortBy!];
        const valueB = b[params.sortBy!];

        if (params.sortOrder === "desc") {
          if (valueA < valueB) return 1;
          if (valueA > valueB) return -1;
        } else {
          if (valueA < valueB) return -1;
          if (valueA > valueB) return 1;
        }
        return 0;
      });
    }

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

    return paginatedVehicles;
  }

  async getVehicleById(id: string): Promise<Vehicle | null> {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Add 1-second delay
    const vehicle = mockVehicles.find((v) => v.id === id);
    return vehicle || null;
  }

  async getVehicleCount(params: VehicleCountParam): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Add 1-second delay
    let filteredVehicles = [...mockVehicles];

    // Filtering
    if (params.manufacturer && params.manufacturer.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        params.manufacturer!.includes(vehicle.manufacturer),
      );
    }
    if (params.type && params.type.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        params.type!.includes(vehicle.type),
      );
    }
    if (params.year && params.year.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        params.year!.includes(vehicle.year),
      );
    }

    return filteredVehicles.length;
  }
}
