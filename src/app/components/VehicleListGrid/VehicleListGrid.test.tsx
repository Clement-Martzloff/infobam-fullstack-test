/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import VehicleListGrid from "./VehicleListGrid";
import { Vehicle, VehicleType } from "@/core/domain/entities/vehicle";
import VehicleItem from "./VehicleItem"; // Import the component to be mocked

// Mock the VehicleItem component
jest.mock("./VehicleItem", () => ({
  __esModule: true,
  default: jest.fn(({ vehicle }: { vehicle: Vehicle }) => (
    <div data-testid={`vehicle-item-${vehicle.id}`}>
      {vehicle.manufacturer} {vehicle.model}
    </div>
  )),
}));

describe("VehicleListGrid", () => {
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
      images: ["/dummy-car-1.jpg"],
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
      images: ["/dummy-car-2.jpg"],
      description: "A fuel-efficient car",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a list of VehicleItem components", () => {
    render(<VehicleListGrid vehicles={mockVehicles} />);

    expect(screen.getByTestId("vehicle-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("vehicle-item-2")).toBeInTheDocument();
  });

  it("renders the correct number of VehicleItem components", () => {
    render(<VehicleListGrid vehicles={mockVehicles} />);

    const vehicleItems = screen.getAllByTestId(/vehicle-item-/);
    expect(vehicleItems).toHaveLength(mockVehicles.length);
  });

  it("passes the correct vehicle data to each VehicleItem", () => {
    render(<VehicleListGrid vehicles={mockVehicles} />);

    // Check props passed to the first VehicleItem
    const firstVehicleItemProps = (VehicleItem as jest.Mock).mock.calls.find(
      (call: [{ vehicle: Vehicle }]) => call[0].vehicle.id === "1",
    )[0];
    expect(firstVehicleItemProps.vehicle).toEqual(mockVehicles[0]);

    // Check props passed to the second VehicleItem
    const secondVehicleItemProps = (VehicleItem as jest.Mock).mock.calls.find(
      (call: [{ vehicle: Vehicle }]) => call[0].vehicle.id === "2",
    )[0];
    expect(secondVehicleItemProps.vehicle).toEqual(mockVehicles[1]);
  });

  it("renders nothing when the vehicles array is empty", () => {
    const { container } = render(<VehicleListGrid vehicles={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
