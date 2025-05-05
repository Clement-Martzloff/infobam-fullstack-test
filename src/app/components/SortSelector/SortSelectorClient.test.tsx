/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SortSelectorClient from "./SortSelectorClient";
import { useSortQuery } from "@/src/app/hooks/useSortQuery";
import OptionsSelector from "./OptionsSelector"; // Import the component to be mocked

// Mock the useSortQuery hook
jest.mock("@/src/app/hooks/useSortQuery", () => ({
  useSortQuery: jest.fn(),
}));

// Mock the OptionsSelector component to check its props
jest.mock("./OptionsSelector", () => ({
  __esModule: true,
  default: jest.fn(({ label, options, selectedValue, onValueChange }) => (
    <div data-testid="options-selector">
      <label>{label}</label>
      <select
        data-testid="select-element"
        value={selectedValue}
        onChange={(e) => onValueChange(e.target.value)}
      >
        {options.map((option: string | number) => (
          <option key={String(option)} value={String(option)}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )),
}));

describe("SortSelectorClient", () => {
  const mockUseSortQuery = useSortQuery as jest.Mock;
  const setSortByMock = jest.fn();
  const setSortOrderMock = jest.fn();

  // Import the mocked component after the mock definition
  const MockedOptionsSelector = OptionsSelector;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSortQuery.mockReturnValue({
      sortBy: "year",
      sortOrder: "desc",
      setSortBy: setSortByMock,
      setSortOrder: setSortOrderMock,
    });
  });

  it("renders OptionsSelector with correct props", () => {
    render(<SortSelectorClient />);

    const optionsSelector = screen.getByTestId("options-selector");
    expect(optionsSelector).toBeInTheDocument();

    // Check props passed to OptionsSelector using the imported mock
    const optionsSelectorProps = (MockedOptionsSelector as jest.Mock).mock
      .calls[0][0];

    expect(optionsSelectorProps.filterName).toBe("sort");
    expect(optionsSelectorProps.label).toBe("Sort by");
    expect(optionsSelectorProps.options).toEqual([
      "Most recent",
      "Oldest",
      "Price ascending",
      "Price descending",
    ]);
    expect(optionsSelectorProps.selectedValue).toBe("Most recent"); // Default value from mock hook
    expect(optionsSelectorProps.onValueChange).toBeInstanceOf(Function);
  });

  it("calls setSortBy and setSortOrder when a new option is selected", () => {
    render(<SortSelectorClient />);

    const selectElement = screen.getByTestId("select-element");

    // Simulate selecting "Price ascending"
    fireEvent.change(selectElement, { target: { value: "Price ascending" } });

    expect(setSortByMock).toHaveBeenCalledWith("price");
    expect(setSortOrderMock).toHaveBeenCalledWith("asc");
  });

  it("selects the correct option based on initial sortBy and sortOrder", () => {
    mockUseSortQuery.mockReturnValue({
      sortBy: "price",
      sortOrder: "asc",
      setSortBy: setSortByMock,
      setSortOrder: setSortOrderMock,
    });

    render(<SortSelectorClient />);

    const optionsSelectorProps = (MockedOptionsSelector as jest.Mock).mock
      .calls[0][0];

    expect(optionsSelectorProps.selectedValue).toBe("Price ascending");
  });

  it("defaults to 'Most recent' if sortBy/sortOrder do not match any option", () => {
    mockUseSortQuery.mockReturnValue({
      sortBy: "invalid",
      sortOrder: "invalid",
      setSortBy: setSortByMock,
      setSortOrder: setSortOrderMock,
    });

    render(<SortSelectorClient />);

    const optionsSelectorProps = (MockedOptionsSelector as jest.Mock).mock
      .calls[0][0];

    expect(optionsSelectorProps.selectedValue).toBe("Most recent");
  });
});
