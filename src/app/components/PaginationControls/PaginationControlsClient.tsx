"use client";

import { usePaginationQuery } from "@/src/app/hooks/usePaginationQuery";

interface PaginationControlsProps {
  total: number;
}

export default function PaginationControls({ total }: PaginationControlsProps) {
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

  // Ensure page and limit are numbers before rendering
  if (typeof page !== "number" || typeof limit !== "number") {
    return null; // Or a loading state
  }

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={page <= 1}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="mt-2">
        <p>Total vehicles: {total}</p>
      </div>
    </>
  );
}
