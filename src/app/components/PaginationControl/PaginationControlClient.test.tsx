/**
 * @jest-environment jsdom
 */

import { usePaginationQuery } from "@/src/app/hooks/usePaginationQuery";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PaginationControlsClient from "./PaginationControlClient";

// Mock the usePaginationQuery hook
jest.mock("@/src/app/hooks/usePaginationQuery", () => ({
  usePaginationQuery: jest.fn(),
}));

const mockUsePaginationQuery = usePaginationQuery as jest.Mock;

describe("PaginationControlsClient", () => {
  const mockSetPage = jest.fn();
  const totalVehicles = 35;
  const limit = 10;
  const totalPages = Math.ceil(totalVehicles / limit);

  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementation for usePaginationQuery
    mockUsePaginationQuery.mockReturnValue({
      page: 1,
      limit: limit,
      setPage: mockSetPage,
    });
  });

  it("renders pagination information correctly", () => {
    const currentPage = 2;
    mockUsePaginationQuery.mockReturnValue({
      page: currentPage,
      limit: limit,
      setPage: mockSetPage,
    });

    render(<PaginationControlsClient total={totalVehicles} />);

    expect(
      screen.getByText(`Page ${currentPage} of ${totalPages}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Total vehicles: ${totalVehicles}`),
    ).toBeInTheDocument();
  });

  it("calls setPage with page - 1 when Previous button is clicked and not on the first page", () => {
    const currentPage = 3;
    mockUsePaginationQuery.mockReturnValue({
      page: currentPage,
      limit: limit,
      setPage: mockSetPage,
    });

    render(<PaginationControlsClient total={totalVehicles} />);

    fireEvent.click(screen.getByRole("button", { name: "Previous" }));

    expect(mockSetPage).toHaveBeenCalledWith(currentPage - 1);
  });

  it("calls setPage with page + 1 when Next button is clicked and not on the last page", () => {
    const currentPage = 1;
    mockUsePaginationQuery.mockReturnValue({
      page: currentPage,
      limit: limit,
      setPage: mockSetPage,
    });

    render(<PaginationControlsClient total={totalVehicles} />);

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(mockSetPage).toHaveBeenCalledWith(currentPage + 1);
  });

  it("disables the Previous button on the first page", () => {
    const currentPage = 1;
    mockUsePaginationQuery.mockReturnValue({
      page: currentPage,
      limit: limit,
      setPage: mockSetPage,
    });

    render(<PaginationControlsClient total={totalVehicles} />);

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).not.toBeDisabled();
  });

  it("disables the Next button on the last page", () => {
    const currentPage = totalPages;
    mockUsePaginationQuery.mockReturnValue({
      page: currentPage,
      limit: limit,
      setPage: mockSetPage,
    });

    render(<PaginationControlsClient total={totalVehicles} />);

    expect(screen.getByRole("button", { name: "Previous" })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("does not call setPage when Previous button is clicked on the first page", () => {
    const currentPage = 1;
    mockUsePaginationQuery.mockReturnValue({
      page: currentPage,
      limit: limit,
      setPage: mockSetPage,
    });

    render(<PaginationControlsClient total={totalVehicles} />);

    fireEvent.click(screen.getByRole("button", { name: "Previous" }));

    expect(mockSetPage).not.toHaveBeenCalled();
  });

  it("does not call setPage when Next button is clicked on the last page", () => {
    const currentPage = totalPages;
    mockUsePaginationQuery.mockReturnValue({
      page: currentPage,
      limit: limit,
      setPage: mockSetPage,
    });

    render(<PaginationControlsClient total={totalVehicles} />);

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(mockSetPage).not.toHaveBeenCalled();
  });

  it("renders null if page or limit are not numbers", () => {
    mockUsePaginationQuery.mockReturnValue({
      page: null,
      limit: limit,
      setPage: mockSetPage,
    });

    const { container } = render(
      <PaginationControlsClient total={totalVehicles} />,
    );
    expect(container.firstChild).toBeNull();

    mockUsePaginationQuery.mockReturnValue({
      page: 1,
      limit: null,
      setPage: mockSetPage,
    });

    const { container: container2 } = render(
      <PaginationControlsClient total={totalVehicles} />,
    );
    expect(container2.firstChild).toBeNull();
  });
});
