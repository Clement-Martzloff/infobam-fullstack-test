"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { FilterIcon } from "lucide-react";
import { useState } from "react";

export default function VehicleFiltersDialog({
  selectors,
  VehicleCountText,
}: {
  selectors: React.ReactNode;
  VehicleCountText: React.ReactNode;
}) {
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);

  return (
    <Dialog open={isFiltersDialogOpen} onOpenChange={setIsFiltersDialogOpen}>
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
        <div className="grid gap-4 py-4">{selectors}</div>
        <div className="mt-4 text-center text-lg font-semibold">
          {VehicleCountText} vehicles match your criteria
        </div>
        {/* Future Sort Feature Area */}
        <div className="mt-6 border-t pt-4">
          <h3 className="mb-2 text-lg font-semibold">
            Sort Options (Coming Soon)
          </h3>
          {/* Placeholder for sort controls */}
          <p className="text-sm text-gray-500">
            Sorting by price and year will be added here.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
