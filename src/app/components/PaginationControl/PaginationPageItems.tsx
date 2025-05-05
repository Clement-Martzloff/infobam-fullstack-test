"use client";

import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/src/components/ui/pagination";

interface PaginationPageItemsProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function PaginationPageItems({
  page,
  totalPages,
  setPage,
}: PaginationPageItemsProps) {
  const items = [];
  const currentPage = page;

  // Always show the first page
  items.push(
    <PaginationItem key={1}>
      <PaginationLink
        href="#"
        isActive={currentPage === 1}
        onClick={() => setPage(1)}
      >
        1
      </PaginationLink>
    </PaginationItem>,
  );

  // Add ellipsis if current page is far from the first page
  if (currentPage > 3) {
    items.push(<PaginationEllipsis key="start-ellipsis" />);
  }

  // Show pages around the current page
  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    if (i !== 1 && i !== totalPages) {
      // Avoid duplicating first/last page if they are within the range
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={() => setPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
  }

  // Add ellipsis if current page is far from the last page
  if (currentPage < totalPages - 2) {
    items.push(<PaginationEllipsis key="end-ellipsis" />);
  }

  // Always show the last page (if more than one page)
  if (totalPages > 1) {
    items.push(
      <PaginationItem key={totalPages}>
        <PaginationLink
          href="#"
          isActive={currentPage === totalPages}
          onClick={() => setPage(totalPages)}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  return <>{items}</>;
}
