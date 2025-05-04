"use client";

import { ParsedVehicleSearchParams } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import { useFiltersQuery } from "@/src/app/hooks/useFiltersQuery";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import FilterCheckboxGroup from "@/src/app/components/FilterCheckboxGroup/FilterCheckboxGroup"; // Import FilterCheckboxGroup
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Import shadcn form components
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver
import { FilterIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // Import useForm
import { z } from "zod"; // Import zod

// Define the Zod schema for the filter form
const filterFormSchema = z.object({
  manufacturer: z.array(z.string()).nullable(),
  type: z.array(z.string()).nullable(),
  year: z.array(z.number()).nullable(), // Update year to be an array of numbers
});

type FilterFormValues = z.infer<typeof filterFormSchema>;

interface VehicleFiltersDialogProps {
  searchParams: ParsedVehicleSearchParams;
  vehicleCountText: React.ReactNode;
  // We will pass filter options down from the server component instead of rendering checkboxes here
  filterOptions: {
    manufacturer: string[];
    type: string[];
    year: number[]; // Corrected type to number[]
  };
}

export default function VehicleFiltersDialog({
  searchParams,
  vehicleCountText,
  filterOptions,
}: VehicleFiltersDialogProps) {
  const [isFiltersDialogOpen, setIsDialogOpen] = useState(false);
  const { setManufacturer, setType, setYear } = useFiltersQuery();

  // Initialize the form with default values from searchParams
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      manufacturer: searchParams.filters.manufacturer || null,
      type: searchParams.filters.type || null,
      year: searchParams.filters.year || null,
    },
  });

  // Update form values when searchParams change (e.g., from direct URL changes)
  useEffect(() => {
    form.reset({
      manufacturer: searchParams.filters.manufacturer || null,
      type: searchParams.filters.type || null,
      year: searchParams.filters.year || null,
    });
  }, [searchParams.filters, form]);

  const applyFilters = useCallback(
    (values: FilterFormValues) => {
      setManufacturer(values.manufacturer || null);
      setType(values.type || null);
      setYear(values.year || null);
      setIsDialogOpen(false);
    },
    [setManufacturer, setType, setYear],
  );

  const clearFilters = useCallback(() => {
    form.reset({ manufacturer: null, type: null, year: null });
    setManufacturer(null);
    setType(null);
    setYear(null);
    setIsDialogOpen(false);
  }, [setManufacturer, setType, setYear, form]);

  return (
    <Dialog open={isFiltersDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Vehicles</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(applyFilters)}
            className="grid gap-4 py-4"
          >
            {/* Manufacturer Filter Field */}
            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer</FormLabel>
                  <FormControl>
                    <FilterCheckboxGroup
                      filterName="manufacturer"
                      label="" // Label is already handled by FormLabel
                      options={filterOptions.manufacturer}
                      selectedValues={field.value || []}
                      onValueChange={(values) =>
                        field.onChange(values.length === 0 ? null : values)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Type Filter Field */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <FilterCheckboxGroup
                      filterName="type"
                      label="" // Label is already handled by FormLabel
                      options={filterOptions.type}
                      selectedValues={field.value || []}
                      onValueChange={(values) =>
                        field.onChange(values.length === 0 ? null : values)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Year Filter Field */}
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <FilterCheckboxGroup
                      filterName="year"
                      label="" // Label is already handled by FormLabel
                      options={filterOptions.year}
                      selectedValues={field.value || []}
                      onValueChange={(values) =>
                        field.onChange(values.length === 0 ? null : values)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* The submit button is now part of the form */}
            <Button type="submit" className="hidden">
              Apply Filters
            </Button>{" "}
            {/* Hidden button to enable form submission on Enter */}
          </form>
        </Form>
        <div className="mt-4 text-center text-lg font-semibold">
          {vehicleCountText} vehicles match your criteria
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
          {/* The Apply Filters button now triggers form submission */}
          <Button onClick={() => form.handleSubmit(applyFilters)()}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
