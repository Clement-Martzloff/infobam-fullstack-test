import { IVehicleFilterRepository } from "@/core/domain/interfaces/IVehicleFilterRepository";
import { GetFilterValuesUseCase } from "./vehicleFilterUseCases";

// Mock the repository
const mockVehicleFilterRepository: IVehicleFilterRepository = {
  getFilterValues: jest.fn(),
};

describe("GetFilterValuesUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call the repository's getFilterValues method with correct parameters", async () => {
    const useCase = new GetFilterValuesUseCase(mockVehicleFilterRepository);
    const mockFilterValues = {
      manufacturer: ["Toyota", "Honda"],
      type: ["SEDAN", "SUV"],
      year: [2020, 2021],
    };

    (
      mockVehicleFilterRepository.getFilterValues as jest.Mock
    ).mockResolvedValue(mockFilterValues);

    const params = { manufacturer: "Toyota" };
    const result = await useCase.execute(params);

    expect(mockVehicleFilterRepository.getFilterValues).toHaveBeenCalledWith(
      params,
    );
    expect(result).toEqual(mockFilterValues);
  });

  it("should call the repository's getFilterValues method with no parameters if none are provided", async () => {
    const useCase = new GetFilterValuesUseCase(mockVehicleFilterRepository);
    const mockFilterValues = {
      manufacturer: [],
      type: [],
      year: [],
    };

    (
      mockVehicleFilterRepository.getFilterValues as jest.Mock
    ).mockResolvedValue(mockFilterValues);

    const result = await useCase.execute({});

    expect(mockVehicleFilterRepository.getFilterValues).toHaveBeenCalledWith(
      {},
    );
    expect(result).toEqual(mockFilterValues);
  });
});
