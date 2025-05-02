import { Vehicle } from "@/core/domain/entities/vehicle";

export interface IVehicleRepository {
  searchVehicles(params: VehicleSearchParam): Promise<Vehicle[]>;
  getVehicleById(id: string): Promise<Vehicle | null>;
  getVehicleCount(params: VehicleCountParam): Promise<number>;
}

export interface VehicleSearchParam {
  page?: number;
  limit?: number;
  manufacturer?: string;
  type?: string;
  year?: number;
  sortBy?: "price" | "year";
  sortOrder?: "asc" | "desc";
}

export interface VehicleCountParam {
  manufacturer?: string;
  type?: string;
  year?: number;
}
