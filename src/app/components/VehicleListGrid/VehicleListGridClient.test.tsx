/**
 * @jest-environment jsdom
 */

import { Vehicle, VehicleType } from "@/core/domain/entities/vehicle";
import VehicleItem from "@/src/app/components/VehicleListGrid/VehicleItem";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import VehicleListGridClient from "./VehicleListGridClient";

// Mock the VehicleItem component to check its props
jest.mock("@/src/app/components/VehicleListGrid/VehicleItem", () => {
  // Use a functional component mock that accepts props and context
  return jest.fn((props) => (
    <div data-testid={`vehicle-item-${props.vehicle.id}`}>
      {props.vehicle.model}
    </div>
  ));
});

const MockVehicleItem = VehicleItem as jest.Mock;

describe("VehicleListGridClient", () => {
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
      year: 2019,
      price: 22000,
      type: VehicleType.SEDAN,
      fuelType: "Gasoline",
      transmission: "Automatic",
      features: ["AC", "Bluetooth"],
      images: ["image2.jpg"],
      description: "A fuel-efficient car",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a VehicleItem for each vehicle in the list", () => {
    render(<VehicleListGridClient vehicles={mockVehicles} />);

    expect(MockVehicleItem).toHaveBeenCalledTimes(mockVehicles.length);

    mockVehicles.forEach((vehicle) => {
      // Check if the mock was called with an object containing the correct vehicle prop
      // We only assert on the first argument (props) and ignore the second (context)
      // Check if the mock was called with an object containing the correct vehicle prop
      // Check if the vehicle is present in the arguments of any call
      expect(MockVehicleItem.mock.calls).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({ vehicle: vehicle }),
            expect.anything(), // Still include this to match the call signature
          ]),
        ]),
      );
    });
  });

  it("renders correctly with an empty list of vehicles", () => {
    render(<VehicleListGridClient vehicles={[]} />);

    expect(MockVehicleItem).not.toHaveBeenCalled();
    expect(screen.queryByTestId(/vehicle-item-/)).toBeNull();
  });
});
