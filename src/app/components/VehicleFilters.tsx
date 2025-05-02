"use client";

import FilterDialog from "@/src/app/components/FilterDialog";
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogTrigger } from "@/src/components/ui/dialog";
import { FilterIcon } from "lucide-react";
import { useState } from "react";

interface VehicleFiltersProps {
  uniqueFilters: { manufacturer: string[]; type: string[]; year: number[] };
  total: number;
}

export default function VehicleFilters({
  uniqueFilters,
  total,
}: VehicleFiltersProps) {
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);

  return (
    <Dialog open={isFiltersDialogOpen} onOpenChange={setIsFiltersDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters ({total} results)
        </Button>
      </DialogTrigger>
      <FilterDialog uniqueFilters={uniqueFilters} total={total} />
    </Dialog>
  );
}
