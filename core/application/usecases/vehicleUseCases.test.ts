import { IVehicleRepository } from "@/core/domain/interfaces/IVehicleRepository";
import { GetVehiclesUseCase, GetVehicleByIdUseCase } from "./vehicleUseCases";
import { Vehicle, VehicleType } from "@/core/domain/entities/vehicle"; // Import Vehicle and VehicleType

// Mock the repository
const mockVehicleRepository: IVehicleRepository = {
  getVehicles: jest.fn(),
  getVehicleById: jest.fn(),
};

describe("GetVehiclesUseCase", () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockVehicleRepository.getVehicles = jest.fn();
  });

  it("should call the repository's getVehicles method with correct parameters", async () => {
    const useCase = new GetVehiclesUseCase(mockVehicleRepository);
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
    const mockTotal = 1;
    const mockReturn = { vehicles: mockVehicles, total: mockTotal };

    (mockVehicleRepository.getVehicles as jest.Mock).mockResolvedValue(
      mockReturn,
    );

    const params = { page: 1, limit: 10, manufacturer: "Toyota" };
    const result = await useCase.execute(params);

    expect(mockVehicleRepository.getVehicles).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockReturn);
  });

  it("should call the repository's getVehicles method with no parameters if none are provided", async () => {
    const useCase = new GetVehiclesUseCase(mockVehicleRepository);
    const mockVehicles: Vehicle[] = [];
    const mockTotal = 0;
    const mockReturn = { vehicles: mockVehicles, total: mockTotal };

    (mockVehicleRepository.getVehicles as jest.Mock).mockResolvedValue(
      mockReturn,
    );

    const result = await useCase.execute({});

    expect(mockVehicleRepository.getVehicles).toHaveBeenCalledWith({});
    expect(result).toEqual(mockReturn);
  });
});

describe("GetVehicleByIdUseCase", () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockVehicleRepository.getVehicleById = jest.fn();
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
