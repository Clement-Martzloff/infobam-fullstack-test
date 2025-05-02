interface PaginationControlsProps {
  page: number;
  limit: number;
  total: number;
  setPage: (page: number) => void;
}

export default function PaginationControls({
  page,
  limit,
  total,
  setPage,
}: PaginationControlsProps) {
  const totalPages = Math.ceil(total / limit);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

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
