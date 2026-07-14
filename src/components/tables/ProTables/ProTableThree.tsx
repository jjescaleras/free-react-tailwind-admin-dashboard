import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import Checkbox from "../../form/input/Checkbox";
import Button from "../../ui/button/Button";
import { DownloadIcon, PencilIcon, TrashBinIcon } from "../../../icons";
import ProTableControls from "./ProTableControls";
import ProTablePagination from "./ProTablePagination";
import SortIcon from "./SortIcon";
import { useProTable } from "./useProTable";

type Status = "Hired" | "In Progress" | "Pending";

interface Candidate {
  id: number;
  avatar: string;
  name: string;
  email: string;
  position: string;
  salary: number;
  salaryLabel: string;
  office: string;
  status: Status;
}

const candidates: Candidate[] = [
  { id: 1, avatar: "/images/user/user-17.jpg", name: "Nadia Petrova", email: "nadia.petrova@example.com", position: "Sales Assistant", salary: 44500, salaryLabel: "$44,500", office: "Edinburgh", status: "Hired" },
  { id: 2, avatar: "/images/user/user-18.jpg", name: "Julian Roth", email: "julian.roth@example.com", position: "Chief Executive Officer", salary: 105000, salaryLabel: "$105,000", office: "London", status: "In Progress" },
  { id: 3, avatar: "/images/user/user-20.jpg", name: "Sana Malik", email: "sana.malik@example.com", position: "Junior Technical Author", salary: 62000, salaryLabel: "$62,000", office: "San Francisco", status: "In Progress" },
  { id: 4, avatar: "/images/user/user-21.jpg", name: "Marcus Lindqvist", email: "marcus.lindqvist@example.com", position: "Software Engineer", salary: 95000, salaryLabel: "$95,000", office: "New York", status: "Hired" },
  { id: 5, avatar: "/images/user/user-22.jpg", name: "Bianca Ferreira", email: "bianca.ferreira@example.com", position: "Integration Specialist", salary: 80000, salaryLabel: "$80,000", office: "Chicago", status: "Pending" },
  { id: 6, avatar: "/images/user/user-23.jpg", name: "Youssef Amrani", email: "youssef.amrani@example.com", position: "Data Engineer", salary: 91000, salaryLabel: "$91,000", office: "Casablanca", status: "Pending" },
  { id: 7, avatar: "/images/user/user-24.jpg", name: "Ingrid Solberg", email: "ingrid.solberg@example.com", position: "Product Designer", salary: 73000, salaryLabel: "$73,000", office: "Bergen", status: "Hired" },
  { id: 8, avatar: "/images/user/user-25.jpg", name: "Rohan Kapoor", email: "rohan.kapoor@example.com", position: "Support Engineer", salary: 54000, salaryLabel: "$54,000", office: "Pune", status: "In Progress" },
  { id: 9, avatar: "/images/user/user-26.jpg", name: "Clara Dubois", email: "clara.dubois@example.com", position: "Business Analyst", salary: 67000, salaryLabel: "$67,000", office: "Brussels", status: "Pending" },
  { id: 10, avatar: "/images/user/user-27.jpg", name: "Tomas Novak", email: "tomas.novak@example.com", position: "Security Engineer", salary: 88000, salaryLabel: "$88,000", office: "Prague", status: "Hired" },
];

type ColumnKey = "name" | "position" | "salary" | "office" | "status";

const columns: { key: ColumnKey; label: string }[] = [
  { key: "name", label: "User" },
  { key: "position", label: "Position" },
  { key: "salary", label: "Salary" },
  { key: "office", label: "Office" },
  { key: "status", label: "Status" },
];

function statusColor(status: Status) {
  if (status === "Hired") return "success" as const;
  if (status === "Pending") return "warning" as const;
  return "info" as const;
}

function exportToCsv(rows: Candidate[]) {
  const header = ["Name", "Email", "Position", "Salary", "Office", "Status"];
  const lines = rows.map((row) =>
    [row.name, row.email, row.position, row.salaryLabel, row.office, row.status]
      .map((value) => `"${value.replace(/"/g, '""')}"`)
      .join(",")
  );
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "candidates.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function ProTableThree() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const {
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
  } = useProTable<Candidate, ColumnKey>({
    data: candidates,
    defaultRowsPerPage: 5,
    matchesSearch: (candidate, query) =>
      candidate.name.toLowerCase().includes(query) ||
      candidate.email.toLowerCase().includes(query) ||
      candidate.position.toLowerCase().includes(query) ||
      candidate.office.toLowerCase().includes(query) ||
      candidate.status.toLowerCase().includes(query),
    sortComparators: {
      name: (a, b) => a.name.localeCompare(b.name),
      position: (a, b) => a.position.localeCompare(b.position),
      salary: (a, b) => a.salary - b.salary,
      office: (a, b) => a.office.localeCompare(b.office),
      status: (a, b) => a.status.localeCompare(b.status),
    },
  });

  const allVisibleSelected =
    rows.length > 0 && rows.every((row) => selectedIds.includes(row.id));

  const toggleSelectAll = (checked: boolean) => {
    setSelectedIds((prev) => {
      const visibleIds = rows.map((row) => row.id);
      if (checked) {
        return Array.from(new Set([...prev, ...visibleIds]));
      }
      return prev.filter((id) => !visibleIds.includes(id));
    });
  };

  const toggleSelectRow = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  };

  return (
    <div className="space-y-4">
      <ProTableControls
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
        rowsPerPageOptions={[5, 8, 10]}
        search={search}
        onSearchChange={setSearch}
        rightSlot={
          <Button
            size="sm"
            variant="outline"
            startIcon={<DownloadIcon className="w-4 h-4" />}
            onClick={() =>
              exportToCsv(
                selectedIds.length > 0
                  ? candidates.filter((c) => selectedIds.includes(c.id))
                  : rows
              )
            }
          >
            Download
          </Button>
        }
      />

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.05]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start w-11"
                >
                  <Checkbox
                    id="select-all-pro-table-three"
                    checked={allVisibleSelected}
                    onChange={toggleSelectAll}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    isHeader
                    className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{column.label}</span>
                      <SortIcon
                        direction={
                          sort?.key === column.key ? sort.direction : null
                        }
                        onClick={() => toggleSort(column.key)}
                        label={column.label}
                      />
                    </div>
                  </TableCell>
                ))}
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-6 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                    No matching records found
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="px-5 py-4 text-start">
                      <Checkbox
                        id={`select-row-${candidate.id}`}
                        checked={selectedIds.includes(candidate.id)}
                        onChange={(checked) =>
                          toggleSelectRow(candidate.id, checked)
                        }
                      />
                    </TableCell>
                    <TableCell className="px-4 py-4 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img
                            width={40}
                            height={40}
                            src={candidate.avatar}
                            alt={candidate.name}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {candidate.name}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {candidate.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {candidate.position}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {candidate.salaryLabel}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {candidate.office}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Badge size="sm" color={statusColor(candidate.status)}>
                        {candidate.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Edit ${candidate.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-gray-200"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete ${candidate.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-error-50 hover:text-error-600 dark:text-gray-400 dark:hover:bg-error-500/15 dark:hover:text-error-500"
                        >
                          <TrashBinIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ProTablePagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={setPage}
      />
    </div>
  );
}
