import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
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
  startDate: string; // ISO date, e.g. "2025-04-25"
  startDateLabel: string; // display label, e.g. "25 Apr, 2025"
  salary: number;
  salaryLabel: string; // display label, e.g. "$89,500"
}

const employees: Employee[] = [
  { id: 1, avatar: "/images/user/user-17.jpg", name: "Marco Alvarez", position: "Sales Assistant", office: "Madrid", age: 34, startDate: "2025-04-25", startDateLabel: "25 Apr, 2025", salary: 42500, salaryLabel: "$42,500" },
  { id: 2, avatar: "/images/user/user-18.jpg", name: "Elena Fischer", position: "Marketing Manager", office: "Berlin", age: 41, startDate: "2024-03-12", startDateLabel: "12 Mar, 2024", salary: 61000, salaryLabel: "$61,000" },
  { id: 3, avatar: "/images/user/user-20.jpg", name: "Yuto Tanaka", position: "Software Engineer", office: "Tokyo", age: 29, startDate: "2023-01-01", startDateLabel: "01 Jan, 2023", salary: 78000, salaryLabel: "$78,000" },
  { id: 4, avatar: "/images/user/user-21.jpg", name: "Priya Nair", position: "UI/UX Designer", office: "Bangalore", age: 27, startDate: "2024-07-18", startDateLabel: "18 Jul, 2024", salary: 48000, salaryLabel: "$48,000" },
  { id: 5, avatar: "/images/user/user-22.jpg", name: "Noah Bergström", position: "Data Analyst", office: "Stockholm", age: 31, startDate: "2024-09-20", startDateLabel: "20 Sep, 2024", salary: 52000, salaryLabel: "$52,000" },
  { id: 6, avatar: "/images/user/user-23.jpg", name: "Camille Rousseau", position: "DevOps Engineer", office: "Paris", age: 36, startDate: "2023-10-30", startDateLabel: "30 Oct, 2023", salary: 71000, salaryLabel: "$71,000" },
  { id: 7, avatar: "/images/user/user-24.jpg", name: "Diego Fernandez", position: "Content Strategist", office: "Lisbon", age: 25, startDate: "2025-12-12", startDateLabel: "12 Dec, 2025", salary: 39000, salaryLabel: "$39,000" },
  { id: 8, avatar: "/images/user/user-25.jpg", name: "Grace Adebayo", position: "HR Specialist", office: "Lagos", age: 38, startDate: "2024-11-08", startDateLabel: "08 Nov, 2024", salary: 44000, salaryLabel: "$44,000" },
  { id: 9, avatar: "/images/user/user-26.jpg", name: "Liu Wei", position: "Product Manager", office: "Shanghai", age: 33, startDate: "2025-06-15", startDateLabel: "15 Jun, 2025", salary: 68000, salaryLabel: "$68,000" },
  { id: 10, avatar: "/images/user/user-27.jpg", name: "Isabella Conti", position: "Financial Analyst", office: "Milan", age: 40, startDate: "2025-02-03", startDateLabel: "03 Feb, 2025", salary: 55000, salaryLabel: "$55,000" },
  { id: 11, avatar: "/images/user/user-28.jpg", name: "Ahmed Hassan", position: "Backend Engineer", office: "Cairo", age: 30, startDate: "2024-05-22", startDateLabel: "22 May, 2024", salary: 65000, salaryLabel: "$65,000" },
  { id: 12, avatar: "/images/user/user-29.jpg", name: "Sofia Kowalski", position: "QA Engineer", office: "Warsaw", age: 28, startDate: "2023-08-14", startDateLabel: "14 Aug, 2023", salary: 47000, salaryLabel: "$47,000" },
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

export default function ProTableOne() {
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
