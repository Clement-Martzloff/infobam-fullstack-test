"use client";

import PaginationPageItems from "@/src/app/components/PaginationControl/PaginationPageItems";
import { usePaginationQuery } from "@/src/app/hooks/usePaginationQuery";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";

interface PaginationControlClientProps {
  total: number;
}

export default function PaginationControlClient({
  total,
}: PaginationControlClientProps) {
  const { page, limit, setPage } = usePaginationQuery();
  const totalPages = Math.ceil(total / limit);

  const handlePreviousPage = () => {
    if (page && page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page && page < totalPages) {
      setPage(page + 1);
    }
  };

  if (typeof page !== "number" || typeof limit !== "number") {
    return null;
  }

  return (
    <>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handlePreviousPage} />
          </PaginationItem>
          <PaginationPageItems
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
          <PaginationItem>
            <PaginationNext href="#" onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="text-muted-foreground mt-2 text-center text-sm">
        <p>Total vehicles: {total}</p>
      </div>
    </>
  );
}
