/**
 * @jest-environment jsdom
 */

import FilterSelect from "@/src/app/components/FilterSelectors/FilterSelector";
import { useFiltersQuery } from "@/src/app/hooks/useFiltersQuery";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import FilterSelectorClient from "./FilterSelectorClient";

// Mock the useFiltersQuery hook
jest.mock("@/src/app/hooks/useFiltersQuery", () => ({
  useFiltersQuery: jest.fn(),
}));

// Mock the FilterSelect component
jest.mock("@/src/app/components/FilterSelectors/FilterSelector", () => {
  // Use a functional component mock that accepts props and context
  return jest.fn((props) => (
    <div data-testid={`mock-filter-select-${props.filterName}`}>
      {/* Render something that can be used to identify and interact with the mock */}
      <label htmlFor={`mock-select-${props.filterName}`}>{props.label}</label>
      {/* We'll simulate calling onValueChange directly in tests */}
    </div>
  ));
});

const mockUseFiltersQuery = useFiltersQuery as jest.Mock;
const MockFilterSelect = FilterSelect as jest.Mock;

describe("FilterSelectorClient", () => {
  const mockSetManufacturer = jest.fn();
  const mockSetType = jest.fn();
  const mockSetYear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementation for useFiltersQuery
    mockUseFiltersQuery.mockReturnValue({
      manufacturer: null,
      type: null,
      year: null,
      setManufacturer: mockSetManufacturer,
      setType: mockSetType,
      setYear: mockSetYear,
    });
  });

  it("renders the FilterSelect component with correct props", () => {
    const filterName = "manufacturer";
    const label = "Manufacturer";
    const options = ["Toyota", "Honda"];

    render(
      <FilterSelectorClient
        filterName={filterName}
        label={label}
        options={options}
      />,
    );

    // Check if the mocked FilterSelect component was rendered
    expect(MockFilterSelect).toHaveBeenCalledTimes(1);
    // Check if the mocked FilterSelect component was rendered with the correct props
    // Check the first argument of the first call
    expect(MockFilterSelect.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        filterName: filterName,
        label: label,
        options: options,
        selectedValue: null, // Default from mockUseFiltersQuery
        onValueChange: expect.any(Function),
      }),
    );
  });

  it("calls the correct setter function from useFiltersQuery when onValueChange is triggered", () => {
    const filterName = "manufacturer";
    const label = "Manufacturer";
    const options = ["Toyota", "Honda"];
    const selectedValue = "Toyota";

    render(
      <FilterSelectorClient
        filterName={filterName}
        label={label}
        options={options}
      />,
    );

    // Get the onValueChange prop passed to the mocked FilterSelect
    const onValueChange = MockFilterSelect.mock.calls[0][0].onValueChange;

    // Simulate calling the onValueChange callback
    onValueChange(selectedValue);

    expect(mockSetManufacturer).toHaveBeenCalledWith(selectedValue);
  });

  it("calls the correct setter function with null when 'All' is selected via onValueChange", () => {
    const filterName = "type";
    const label = "Type";
    const options = ["SEDAN", "SUV"];
    const selectedValue = "All";

    render(
      <FilterSelectorClient
        filterName={filterName}
        label={label}
        options={options}
      />,
    );

    const onValueChange = MockFilterSelect.mock.calls[0][0].onValueChange;
    onValueChange(selectedValue);

    expect(mockSetType).toHaveBeenCalledWith(null);
  });

  it("uses the correct selected value from useFiltersQuery and passes it to FilterSelect", () => {
    const filterName = "year";
    const label = "Year";
    const options = [2020, 2021];
    const initialSelectedValue = 2021;

    // Mock useFiltersQuery to return an initial selected value for 'year'
    mockUseFiltersQuery.mockReturnValue({
      manufacturer: null,
      type: null,
      year: initialSelectedValue,
      setManufacturer: mockSetManufacturer,
      setType: mockSetType,
      setYear: mockSetYear,
    });

    render(
      <FilterSelectorClient
        filterName={filterName}
        label={label}
        options={options}
      />,
    );

    // Check if the mocked FilterSelect was called with the correct selectedValue prop
    // Check the first argument of the first call
    expect(MockFilterSelect.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        selectedValue: initialSelectedValue,
      }),
    );
  });
});
