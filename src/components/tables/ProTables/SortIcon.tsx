import { SortDirection } from "./useProTable";

interface SortIconProps {
  direction: SortDirection | null;
  onClick: () => void;
  label: string;
}

export default function SortIcon({ direction, onClick, label }: SortIconProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Sort by ${label}`}
      className="flex flex-col gap-0.5"
    >
      <svg
        width="8"
        height="5"
        viewBox="0 0 8 5"
        fill="none"
        className={
          direction === "asc"
            ? "fill-brand-500"
            : "fill-gray-300 dark:fill-gray-600"
        }
      >
        <path d="M4 0L8 5H0L4 0Z" />
      </svg>
      <svg
        width="8"
        height="5"
        viewBox="0 0 8 5"
        fill="none"
        className={
          direction === "desc"
            ? "fill-brand-500"
            : "fill-gray-300 dark:fill-gray-600"
        }
      >
        <path d="M4 5L0 0H8L4 5Z" />
      </svg>
    </button>
  );
}
