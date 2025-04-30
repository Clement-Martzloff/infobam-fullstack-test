import { Vehicle } from "@/core/domain/entities/vehicle";

export interface IVehicleRepository {
  getVehicles(params: {
    page?: number;
    limit?: number;
    manufacturer?: string;
    type?: string;
    year?: number;
    sortBy?: "price" | "year";
    sortOrder?: "asc" | "desc";
  }): Promise<{ vehicles: Vehicle[]; total: number }>;
  getVehicleById(id: string): Promise<Vehicle | null>;
}
