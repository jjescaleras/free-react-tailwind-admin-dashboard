import { useEffect, useMemo, useState } from "react";

export type SortDirection = "asc" | "desc";

export interface SortConfig<K extends string> {
  key: K;
  direction: SortDirection;
}

interface UseProTableOptions<T, K extends string> {
  data: T[];
  matchesSearch: (row: T, query: string) => boolean;
  sortComparators: Record<K, (a: T, b: T) => number>;
  defaultRowsPerPage?: number;
}

export function useProTable<T, K extends string>({
  data,
  matchesSearch,
  sortComparators,
  defaultRowsPerPage = 10,
}: UseProTableOptions<T, K>) {
  const [search, setSearchValue] = useState("");
  const [sort, setSort] = useState<SortConfig<K> | null>(null);
  const [rowsPerPage, setRowsPerPageValue] = useState(defaultRowsPerPage);
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data;
    return data.filter((row) => matchesSearch(row, query));
  }, [data, search, matchesSearch]);

  const sortedRows = useMemo(() => {
    if (!sort) return filteredRows;
    const comparator = sortComparators[sort.key];
    const sorted = [...filteredRows].sort(comparator);
    return sort.direction === "desc" ? sorted.reverse() : sorted;
  }, [filteredRows, sort, sortComparators]);

  const totalItems = sortedRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const rows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedRows.slice(start, start + rowsPerPage);
  }, [sortedRows, page, rowsPerPage]);

  const toggleSort = (key: K) => {
    setPage(1);
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  };

  const setSearch = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };

  const setRowsPerPage = (value: number) => {
    setRowsPerPageValue(value);
    setPage(1);
  };

  const startIndex = totalItems === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const endIndex = Math.min(page * rowsPerPage, totalItems);

  return {
    rows,
    search,
    setSearch,
    sort,
    toggleSort,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
  };
}
