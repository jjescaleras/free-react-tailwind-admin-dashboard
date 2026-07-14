import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PieChartOne from "../../components/charts/pie-chart/PieChartOne";
import PieChartTwo from "../../components/charts/pie-chart/PieChartTwo";
import PageMeta from "../../components/common/PageMeta";

export default function PieChart() {
  return (
    <div>
      <PageMeta
        title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Pie Chart" />
      <div className="space-y-6">
        <ComponentCard title="Pie Chart 1">
          <PieChartOne />
        </ComponentCard>
        <ComponentCard title="Pie Chart 2">
          <PieChartTwo />
        </ComponentCard>
      </div>
    </div>
  );
}
