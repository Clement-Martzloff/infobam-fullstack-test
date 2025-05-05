import { Vehicle, VehicleType } from "@/core/domain/entities/vehicle";
import { IVehicleRepository } from "@/core/domain/interfaces/IVehicleRepository";
import {
  GetVehicleByIdUseCase,
  GetVehicleCountUseCase,
  SearchVehiclesUseCase,
} from "./vehicleUseCases";

// Mock the repository
const mockVehicleRepository: IVehicleRepository = {
  searchVehicles: jest.fn(),
  getVehicleById: jest.fn(),
  getVehicleCount: jest.fn(),
};

describe("SearchVehiclesUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call the repository's searchVehicles method with correct parameters", async () => {
    const useCase = new SearchVehiclesUseCase(mockVehicleRepository);
    const mockVehicles: Vehicle[] = [
      {
        id: "1",
        manufacturer: "Toyota",
        model: "Camry",
        year: 2020,
        price: 25000,
        type: VehicleType.SEDAN,
        fuelType: "Gasoline",
        transmission: "Automatic",
        features: ["AC", "Radio"],
        images: ["image1.jpg"],
        description: "A reliable sedan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (mockVehicleRepository.searchVehicles as jest.Mock).mockResolvedValue(
      mockVehicles,
    );

    const params = { page: 1, limit: 6, manufacturer: ["Toyota"] };
    const result = await useCase.execute(params);

    expect(mockVehicleRepository.searchVehicles).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockVehicles);
  });

  it("should call the repository's searchVehicles method with no parameters if none are provided", async () => {
    const useCase = new SearchVehiclesUseCase(mockVehicleRepository);
    const mockVehicles: Vehicle[] = [];

    (mockVehicleRepository.searchVehicles as jest.Mock).mockResolvedValue(
      mockVehicles,
    );

    const result = await useCase.execute({ page: 1, limit: 6 });

    expect(mockVehicleRepository.searchVehicles).toHaveBeenCalledWith({
      page: 1,
      limit: 6,
    });
    expect(result).toEqual(mockVehicles);
  });
});

describe("GetVehicleByIdUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call the repository's getVehicleById method with the correct ID", async () => {
    const useCase = new GetVehicleByIdUseCase(mockVehicleRepository);
    const mockVehicle: Vehicle = {
      id: "1",
      manufacturer: "Toyota",
      model: "Camry",
      year: 2020,
      price: 25000,
      type: VehicleType.SEDAN,
      fuelType: "Gasoline",
      transmission: "Automatic",
      features: ["AC", "Radio"],
      images: ["image1.jpg"],
      description: "A reliable sedan",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockId = "1";

    (mockVehicleRepository.getVehicleById as jest.Mock).mockResolvedValue(
      mockVehicle,
    );

    const result = await useCase.execute(mockId);

    expect(mockVehicleRepository.getVehicleById).toHaveBeenCalledWith(mockId);
    expect(result).toEqual(mockVehicle);
  });

  it("should return null if the repository returns null", async () => {
    const useCase = new GetVehicleByIdUseCase(mockVehicleRepository);
    const mockId = "non-existent-id";

    (mockVehicleRepository.getVehicleById as jest.Mock).mockResolvedValue(null);

    const result = await useCase.execute(mockId);

    expect(mockVehicleRepository.getVehicleById).toHaveBeenCalledWith(mockId);
    expect(result).toBeNull();
  });
});

describe("GetVehicleCountUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call the repository's getVehicleCount method with correct parameters", async () => {
    const useCase = new GetVehicleCountUseCase(mockVehicleRepository);
    const mockCount = 10;

    (mockVehicleRepository.getVehicleCount as jest.Mock).mockResolvedValue(
      mockCount,
    );

    const params = { manufacturer: ["Toyota"], type: ["SEDAN"], year: [2020] };
    const result = await useCase.execute(params);

    expect(mockVehicleRepository.getVehicleCount).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockCount);
  });

  it("should call the repository's getVehicleCount method with no parameters if none are provided", async () => {
    const useCase = new GetVehicleCountUseCase(mockVehicleRepository);
    const mockCount = 0;

    (mockVehicleRepository.getVehicleCount as jest.Mock).mockResolvedValue(
      mockCount,
    );

    const result = await useCase.execute({});

    expect(mockVehicleRepository.getVehicleCount).toHaveBeenCalledWith({});
    expect(result).toEqual(mockCount);
  });
});
