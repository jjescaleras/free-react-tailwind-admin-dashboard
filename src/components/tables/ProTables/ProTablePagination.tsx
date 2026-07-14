interface ProTablePaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(page: number, totalPages: number): number[] {
  const maxVisible = 5;
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export default function ProTablePagination({
  page,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
}: ProTablePaginationProps) {
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {totalItems === 0
          ? "Showing 0 of 0 entries"
          : `Showing ${startIndex} to ${endIndex} of ${totalItems} entries`}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          Previous
        </button>
        {pageNumbers[0] > 1 && (
          <span className="px-2 text-sm text-gray-400">…</span>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => onPageChange(number)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium ${
              number === page
                ? "bg-brand-500 text-white"
                : "text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            }`}
          >
            {number}
          </button>
        ))}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <span className="px-2 text-sm text-gray-400">…</span>
        )}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
