import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { PencilIcon, TrashBinIcon } from "../../../icons";
import ProTableControls from "./ProTableControls";
import ProTablePagination from "./ProTablePagination";
import SortIcon from "./SortIcon";
import { useProTable } from "./useProTable";

interface Employee {
  id: number;
  avatar: string;
  name: string;
  position: string;
  office: string;
  age: number;
  startDate: string; // ISO date
  startDateLabel: string;
  salary: number;
  salaryLabel: string;
}

const employees: Employee[] = [
  { id: 1, avatar: "/images/user/user-30.jpg", name: "Hannah Berg", position: "Sales Assistant", office: "Oslo", age: 32, startDate: "2025-04-25", startDateLabel: "25 Apr, 2025", salary: 44500, salaryLabel: "$44,500" },
  { id: 2, avatar: "/images/user/user-31.jpg", name: "Ravi Shankar", position: "Marketing Manager", office: "Mumbai", age: 39, startDate: "2024-03-12", startDateLabel: "12 Mar, 2024", salary: 58000, salaryLabel: "$58,000" },
  { id: 3, avatar: "/images/user/user-32.jpg", name: "Chloe Martin", position: "Software Engineer", office: "Montreal", age: 28, startDate: "2023-01-01", startDateLabel: "01 Jan, 2023", salary: 82000, salaryLabel: "$82,000" },
  { id: 4, avatar: "/images/user/user-33.jpg", name: "Tobias Meyer", position: "UI/UX Designer", office: "Vienna", age: 26, startDate: "2024-07-18", startDateLabel: "18 Jul, 2024", salary: 46000, salaryLabel: "$46,000" },
  { id: 5, avatar: "/images/user/user-17.jpg", name: "Amara Okafor", position: "Data Analyst", office: "Nairobi", age: 30, startDate: "2024-09-20", startDateLabel: "20 Sep, 2024", salary: 51000, salaryLabel: "$51,000" },
  { id: 6, avatar: "/images/user/user-18.jpg", name: "Lucas Silva", position: "DevOps Engineer", office: "Sao Paulo", age: 35, startDate: "2023-10-30", startDateLabel: "30 Oct, 2023", salary: 69000, salaryLabel: "$69,000" },
  { id: 7, avatar: "/images/user/user-20.jpg", name: "Freya Nilsen", position: "Content Strategist", office: "Copenhagen", age: 24, startDate: "2025-12-12", startDateLabel: "12 Dec, 2025", salary: 40000, salaryLabel: "$40,000" },
  { id: 8, avatar: "/images/user/user-21.jpg", name: "Omar Haddad", position: "HR Specialist", office: "Dubai", age: 37, startDate: "2024-11-08", startDateLabel: "08 Nov, 2024", salary: 45000, salaryLabel: "$45,000" },
  { id: 9, avatar: "/images/user/user-22.jpg", name: "Mei Lin", position: "Product Manager", office: "Singapore", age: 34, startDate: "2025-06-15", startDateLabel: "15 Jun, 2025", salary: 70000, salaryLabel: "$70,000" },
  { id: 10, avatar: "/images/user/user-23.jpg", name: "Jonas Weber", position: "Financial Analyst", office: "Zurich", age: 42, startDate: "2025-02-03", startDateLabel: "03 Feb, 2025", salary: 60000, salaryLabel: "$60,000" },
];

type ColumnKey = "name" | "position" | "office" | "age" | "startDate" | "salary";

const columns: { key: ColumnKey; label: string }[] = [
  { key: "name", label: "User" },
  { key: "position", label: "Position" },
  { key: "office", label: "Office" },
  { key: "age", label: "Age" },
  { key: "startDate", label: "Start Date" },
  { key: "salary", label: "Salary" },
];

export default function ProTableTwo() {
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
  } = useProTable<Employee, ColumnKey>({
    data: employees,
    defaultRowsPerPage: 5,
    matchesSearch: (employee, query) =>
      employee.name.toLowerCase().includes(query) ||
      employee.position.toLowerCase().includes(query) ||
      employee.office.toLowerCase().includes(query),
    sortComparators: {
      name: (a, b) => a.name.localeCompare(b.name),
      position: (a, b) => a.position.localeCompare(b.position),
      office: (a, b) => a.office.localeCompare(b.office),
      age: (a, b) => a.age - b.age,
      startDate: (a, b) => a.startDate.localeCompare(b.startDate),
      salary: (a, b) => a.salary - b.salary,
    },
  });

  return (
    <div className="space-y-4">
      <ProTableControls
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.05]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
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
                rows.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img
                            width={40}
                            height={40}
                            src={employee.avatar}
                            alt={employee.name}
                          />
                        </div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {employee.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {employee.position}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {employee.office}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {employee.age}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {employee.startDateLabel}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {employee.salaryLabel}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Edit ${employee.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-gray-200"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete ${employee.name}`}
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
