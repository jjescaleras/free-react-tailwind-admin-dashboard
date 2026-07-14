import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ProTableOne from "../../components/tables/ProTables/ProTableOne";
import ProTableTwo from "../../components/tables/ProTables/ProTableTwo";
import ProTableThree from "../../components/tables/ProTables/ProTableThree";

export default function ProTables() {
  return (
    <>
      <PageMeta
        title="React.js Pro Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Pro Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Pro Tables" />
      <div className="space-y-6">
        <ComponentCard
          title="Pro Table 1"
          desc="Sortable columns, search and pagination"
        >
          <ProTableOne />
        </ComponentCard>
        <ComponentCard
          title="Pro Table 2"
          desc="Adds row actions (edit / delete)"
        >
          <ProTableTwo />
        </ComponentCard>
        <ComponentCard
          title="Pro Table 3"
          desc="Adds row selection, status badges and CSV export"
        >
          <ProTableThree />
        </ComponentCard>
      </div>
    </>
  );
}
