/**
 * @jest-environment jsdom
 */

import { Vehicle, VehicleType } from "@/core/domain/entities/vehicle";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import VehicleItem from "./VehicleItem";

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

describe("VehicleItem", () => {
  it("renders vehicle details correctly", () => {
    render(<VehicleItem vehicle={mockVehicle} />);

    expect(
      screen.getByRole("heading", { name: "Toyota Camry" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Year: 2020")).toBeInTheDocument();
    expect(screen.getByText("Price: $25000")).toBeInTheDocument();
    expect(screen.getByText("Type: SEDAN")).toBeInTheDocument();
  });
});
