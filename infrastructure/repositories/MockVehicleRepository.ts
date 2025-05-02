import { Vehicle } from "@/core/domain/entities/vehicle";
import { IVehicleRepository } from "@/core/domain/interfaces/IVehicleRepository";
import { mockVehicles } from "@/infrastructure/data/mockVehicles";

export class MockVehicleRepository implements IVehicleRepository {
  async getVehicles(params: {
    page?: number;
    limit?: number;
    manufacturer?: string;
    type?: string;
    year?: number;
    sortBy?: "price" | "year";
    sortOrder?: "asc" | "desc";
  }): Promise<{ vehicles: Vehicle[]; total: number }> {
    let filteredVehicles = [...mockVehicles];

    // Filtering
    if (params.manufacturer) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.manufacturer
          .toLowerCase()
          .includes(params.manufacturer!.toLowerCase()),
      );
    }
    if (params.type) {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.type.toLowerCase() === params.type!.toLowerCase(),
      );
    }
    if (params.year) {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.year === params.year,
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

    return {
      vehicles: paginatedVehicles,
      total: filteredVehicles.length,
    };
  }

  async getVehicleById(id: string): Promise<Vehicle | null> {
    const vehicle = mockVehicles.find((v) => v.id === id);
    return vehicle || null;
  }

  async getUniqueFilterValues(params?: {
    manufacturer?: string;
    type?: string;
    year?: number;
  }): Promise<{
    manufacturer: string[];
    type: string[];
    year: number[];
  }> {
    let filteredVehicles = [...mockVehicles];

    if (params?.manufacturer) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.manufacturer
          .toLowerCase()
          .includes(params.manufacturer!.toLowerCase()),
      );
    }
    if (params?.type) {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.type.toLowerCase() === params.type!.toLowerCase(),
      );
    }
    if (params?.year) {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.year === params.year,
      );
    }

    const uniqueManufacturers = Array.from(
      new Set(filteredVehicles.map((v) => v.manufacturer)),
    );
    const uniqueTypes = Array.from(
      new Set(filteredVehicles.map((v) => v.type)),
    );
    const uniqueYears = Array.from(
      new Set(filteredVehicles.map((v) => v.year)),
    ).sort((a, b) => a - b);

    return {
      manufacturer: uniqueManufacturers,
      type: uniqueTypes,
      year: uniqueYears,
    };
  }
}
