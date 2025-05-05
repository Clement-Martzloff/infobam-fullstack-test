import { Vehicle } from "@/core/domain/entities/vehicle";

export interface IVehicleRepository {
  searchVehicles(params: VehicleSearchParam): Promise<Vehicle[]>;
  getVehicleById(id: string): Promise<Vehicle | null>;
  getVehicleCount(params: VehicleCountParam): Promise<number>;
}

export interface VehicleSearchParam {
  page: number;
  limit: number;
  manufacturer?: string[] | null;
  type?: string[] | null;
  year?: number[] | null;
  sortBy?: "price" | "year" | null;
  sortOrder?: "asc" | "desc" | null;
}

export interface VehicleCountParam {
  manufacturer?: string[] | null;
  type?: string[] | null;
  year?: number[] | null;
}
