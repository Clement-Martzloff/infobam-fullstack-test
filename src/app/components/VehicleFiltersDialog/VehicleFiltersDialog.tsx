"use client";

import { ParsedVehicleSearchParams } from "@/infrastructure/nextjs/vehicleSearchParamsLoader";
import FilterCheckboxOptions from "@/src/app/components/VehicleFiltersDialog/FilterCheckboxOptions";
import { useFiltersQuery } from "@/src/app/hooks/useFiltersQuery";
import { usePaginationQuery } from "@/src/app/hooks/usePaginationQuery";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Form } from "@/src/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const filterFormSchema = z.object({
  manufacturer: z.array(z.string()).nullable(),
  type: z.array(z.string()).nullable(),
  year: z.array(z.number()).nullable(),
});

type FilterFormValues = z.infer<typeof filterFormSchema>;

interface VehicleFiltersDialogProps {
  searchParams: ParsedVehicleSearchParams;
  filterOptions: {
    manufacturer: string[];
    type: string[];
    year: number[];
  };
}

export default function VehicleFiltersDialog({
  searchParams,
  filterOptions,
}: VehicleFiltersDialogProps) {
  const [isFiltersDialogOpen, setIsDialogOpen] = useState(false);
  const { setManufacturer, setType, setYear } = useFiltersQuery();
  const { setPage } = usePaginationQuery();
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      manufacturer: searchParams.filters.manufacturer || null,
      type: searchParams.filters.type || null,
      year: searchParams.filters.year || null,
    },
  });

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
      setPage(1); // Reset pagination to page 1
      setIsDialogOpen(false);
    },
    [setManufacturer, setType, setYear, setPage],
  );
  const clearFilters = useCallback(() => {
    form.reset({ manufacturer: null, type: null, year: null });
    setManufacturer(null);
    setType(null);
    setYear(null);
    setPage(1); // Reset pagination to page 1
    setIsDialogOpen(false);
  }, [setManufacturer, setType, setYear, setPage, form]);

  return (
    <Dialog open={isFiltersDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal />
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-screen flex-col sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Vehicles</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(applyFilters)}
              className="grid gap-6 py-4"
            >
              <FilterCheckboxOptions
                filterName="manufacturer"
                label="Manufacturer"
                options={filterOptions.manufacturer}
              />
              <FilterCheckboxOptions
                filterName="type"
                label="Type"
                options={filterOptions.type}
              />
              <FilterCheckboxOptions
                filterName="year"
                label="Year"
                options={filterOptions.year}
              />
              <Button type="submit" className="hidden">
                Apply Filters
              </Button>
            </form>
          </Form>
        </div>
        <DialogFooter className="flex flex-col px-6 py-4 sm:flex-row sm:justify-end sm:space-x-2">
          <Button onClick={() => form.handleSubmit(applyFilters)()}>
            Apply Filters
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
