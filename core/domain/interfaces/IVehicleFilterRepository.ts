export interface IVehicleFilterRepository {
  getFilterValues(params?: VehicleFilterParam): Promise<{
    manufacturer: string[];
    type: string[];
    year: number[];
  }>;
}

export interface VehicleFilterParam {
  manufacturer?: string;
  type?: string;
  year?: number;
}
