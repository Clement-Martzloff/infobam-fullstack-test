/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom matchers
import VehicleListClient from "./VehicleListClient";
import { getVehicles } from "@/infrastructure/framework/nextjs/vehicleServerFunctions";
import { Vehicle, VehicleType } from "@/core/domain/entities/vehicle"; // Import VehicleType

// Mock the getVehicles server function
jest.mock("@/infrastructure/framework/nextjs/vehicleServerFunctions", () => ({
  getVehicles: jest.fn(),
}));

const mockGetVehicles = getVehicles as jest.Mock;

const mockInitialVehicles: Vehicle[] = [
  {
    id: "1",
    manufacturer: "Toyota",
    model: "Camry",
    year: 2020,
    price: 25000,
    type: VehicleType.SEDAN, // Use enum value
    fuelType: "Gasoline", // Added missing required properties
    transmission: "Automatic",
    features: ["AC", "Radio"],
    images: ["image1.jpg"],
    description: "A reliable sedan",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    manufacturer: "Honda",
    model: "CR-V",
    year: 2022,
    price: 30000,
    type: VehicleType.SUV, // Use enum value
    fuelType: "Gasoline", // Added missing required properties
    transmission: "Automatic",
    features: ["AC", "Sunroof"],
    images: ["image2.jpg"],
    description: "A spacious SUV",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("VehicleListClient", () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockGetVehicles.mockReset();
  });

  it("should render initial vehicles", () => {
    render(
      <VehicleListClient
        initialVehicles={mockInitialVehicles}
        initialTotal={mockInitialVehicles.length}
      />,
    );

    // Check if the component title is present
    expect(
      screen.getByRole("heading", { name: /Vehicle Listing/i }),
    ).toBeInTheDocument();

    // Check if initial vehicles are displayed
    expect(screen.getByText("Toyota Camry")).toBeInTheDocument();
    expect(screen.getByText("Year: 2020")).toBeInTheDocument();
    expect(screen.getByText("Price: $25000")).toBeInTheDocument();
    // Note: The component displays the enum value directly, which is "SEDAN" not "Sedan"
    expect(screen.getByText(`Type: ${VehicleType.SEDAN}`)).toBeInTheDocument();

    expect(screen.getByText("Honda CR-V")).toBeInTheDocument();
    expect(screen.getByText("Year: 2022")).toBeInTheDocument();
    expect(screen.getByText("Price: $30000")).toBeInTheDocument();
    // Note: The component displays the enum value directly, which is "SUV" not "SUV"
    expect(screen.getByText(`Type: ${VehicleType.SUV}`)).toBeInTheDocument();

    // Check if total is displayed
    expect(
      screen.getByText(`Total vehicles: ${mockInitialVehicles.length}`),
    ).toBeInTheDocument();

    // Ensure getVehicles is not called on initial render (as per component logic)
    expect(mockGetVehicles).not.toHaveBeenCalled();
  });

  // Add more describe blocks for other test cases for this component
});
