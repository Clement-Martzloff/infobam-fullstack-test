/**
 * @jest-environment jsdom
 */

import { Vehicle, VehicleType } from "@/core/domain/entities/vehicle";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import VehicleListGrid from "./VehicleListGrid";
import VehicleItem from "./VehicleItem";

// Mock the VehicleItem component to simplify testing VehicleListGrid
jest.mock("./VehicleItem", () => ({
  __esModule: true,
  default: jest.fn(({ vehicle }) => (
    <div data-testid={`vehicle-item-${vehicle.id}`}>{vehicle.model}</div>
  )),
}));

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
  {
    id: "2",
    manufacturer: "Honda",
    model: "Civic",
    year: 2021,
    price: 22000,
    type: VehicleType.SEDAN,
    fuelType: "Gasoline",
    transmission: "Automatic",
    features: ["AC", "Bluetooth"],
    images: ["image2.jpg"],
    description: "A popular compact car",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("VehicleListGrid", () => {
  it("renders the correct number of VehicleItem components", () => {
    render(<VehicleListGrid vehicles={mockVehicles} />);

    // Check that the mocked VehicleItem component was called for each vehicle
    expect(VehicleItem).toHaveBeenCalledTimes(mockVehicles.length);

    // Check that the mocked VehicleItem components are rendered
    expect(screen.getByTestId("vehicle-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("vehicle-item-2")).toBeInTheDocument();
  });

  it("passes the correct vehicle data to each VehicleItem", () => {
    render(<VehicleListGrid vehicles={mockVehicles} />);

    // Check that VehicleItem was called with the correct props for each vehicle
    expect(VehicleItem).toHaveBeenCalledWith(
      { vehicle: mockVehicles[0] },
      undefined,
    );
    expect(VehicleItem).toHaveBeenCalledWith(
      { vehicle: mockVehicles[1] },
      undefined,
    );
  });

  it("renders an empty grid when no vehicles are provided", () => {
    render(<VehicleListGrid vehicles={[]} />);

    expect(VehicleItem).not.toHaveBeenCalled();
    // You might want to add a check for the grid container itself if needed
    // expect(screen.getByRole('grid')).toBeInTheDocument(); // Assuming the div has a grid role or similar
  });
});
