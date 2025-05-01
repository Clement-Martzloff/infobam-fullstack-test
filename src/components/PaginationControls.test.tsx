/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PaginationControls from "./PaginationControls";

describe("PaginationControls", () => {
  const mockSetPage = jest.fn();
  const totalVehicles = 35;
  const limit = 10;
  const totalPages = Math.ceil(totalVehicles / limit);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders pagination information correctly", () => {
    const currentPage = 2;
    render(
      <PaginationControls
        page={currentPage}
        limit={limit}
        total={totalVehicles}
        setPage={mockSetPage}
      />,
    );

    expect(
      screen.getByText(`Page ${currentPage} of ${totalPages}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Total vehicles: ${totalVehicles}`),
    ).toBeInTheDocument();
  });

  it("calls setPage with page - 1 when Previous button is clicked and not on the first page", async () => {
    const currentPage = 3;
    render(
      <PaginationControls
        page={currentPage}
        limit={limit}
        total={totalVehicles}
        setPage={mockSetPage}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Previous" }));

    await waitFor(() => {
      expect(mockSetPage).toHaveBeenCalledWith(currentPage - 1);
    });
  });

  it("calls setPage with page + 1 when Next button is clicked and not on the last page", async () => {
    const currentPage = 1;
    render(
      <PaginationControls
        page={currentPage}
        limit={limit}
        total={totalVehicles}
        setPage={mockSetPage}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(mockSetPage).toHaveBeenCalledWith(currentPage + 1);
    });
  });

  it("disables the Previous button on the first page", () => {
    const currentPage = 1;
    render(
      <PaginationControls
        page={currentPage}
        limit={limit}
        total={totalVehicles}
        setPage={mockSetPage}
      />,
    );

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).not.toBeDisabled();
  });

  it("disables the Next button on the last page", () => {
    const currentPage = totalPages;
    render(
      <PaginationControls
        page={currentPage}
        limit={limit}
        total={totalVehicles}
        setPage={mockSetPage}
      />,
    );

    expect(screen.getByRole("button", { name: "Previous" })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("does not call setPage when Previous button is clicked on the first page", async () => {
    const currentPage = 1;
    render(
      <PaginationControls
        page={currentPage}
        limit={limit}
        total={totalVehicles}
        setPage={mockSetPage}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Previous" }));

    await waitFor(() => {
      expect(mockSetPage).not.toHaveBeenCalled();
    });
  });

  it("does not call setPage when Next button is clicked on the last page", async () => {
    const currentPage = totalPages;
    render(
      <PaginationControls
        page={currentPage}
        limit={limit}
        total={totalVehicles}
        setPage={mockSetPage}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(mockSetPage).not.toHaveBeenCalled();
    });
  });
});
