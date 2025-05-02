/**
 * @jest-environment jsdom
 */

import { Vehicle, VehicleType } from "@/core/domain/entities/vehicle";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import VehicleListClient from "./VehicleListClient";

import { usePaginationQuery } from "@/src/app/hooks/usePaginationQuery";
import PaginationControls from "./PaginationControls/PaginationControls";
import VehicleListGrid from "./VehicleListGrid/VehicleListGridClient";

jest.mock("@/src/app/hooks/usePaginationQuery", () => ({
  __esModule: true,
  usePaginationQuery: jest.fn(),
}));

// Mock the child components to test the integration in VehicleListClient
jest.mock("./VehicleListGrid", () => ({
  __esModule: true,
  default: jest.fn(({ vehicles }) => (
    <div data-testid="vehicle-list-grid">
      {vehicles.map((v: Vehicle) => v.model).join(", ")}
    </div>
  )),
}));

jest.mock("./PaginationControls", () => ({
  __esModule: true,
  default: jest.fn(({ page, limit, total }) => (
    <div data-testid="pagination-controls">
      Page {page} of {Math.ceil(total / limit)}, Total: {total}
    </div>
  )),
}));

const mockUsePaginationQuery = usePaginationQuery as jest.Mock;

const mockSetPage = jest.fn();

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

describe("VehicleListClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (
    page: number,
    total: number = 20,
    vehicles: Vehicle[] = mockVehicles,
  ) => {
    mockUsePaginationQuery.mockReturnValue({
      page,
      setPage: mockSetPage,
      limit: 10,
    });

    render(<VehicleListClient vehicles={vehicles} total={total} />);
  };

  it("renders the main container and title", () => {
    renderComponent(1);
    expect(screen.getByText("Vehicle Listing")).toBeInTheDocument();
    // Check for the presence of the mocked child components
    expect(screen.getByTestId("vehicle-list-grid")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-controls")).toBeInTheDocument();
  });

  it("passes the correct vehicles prop to VehicleListGrid", () => {
    renderComponent(1);
    expect(VehicleListGrid).toHaveBeenCalledWith(
      { vehicles: mockVehicles },
      undefined,
    );
  });

  it("passes the correct pagination props to PaginationControls", () => {
    const page = 2;
    const total = 30;
    renderComponent(page, total);
    expect(PaginationControls).toHaveBeenCalledWith(
      { page, limit: 10, total, setPage: mockSetPage },
      undefined,
    );
  });

  // The tests for button clicks and disabled states are now handled in PaginationControls.test.tsx
  // The tests for rendering individual vehicle items are now handled in VehicleItem.test.tsx
  // The tests for rendering the grid of items are now handled in VehicleListGrid.test.tsx
});
