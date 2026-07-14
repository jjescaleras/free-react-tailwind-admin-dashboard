import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function PieChartTwo() {
  const options: ApexOptions = {
    colors: ["#465FFF", "#9CB9FF", "#FDB022", "#12B76A"],
    labels: ["Direct", "Organic Search", "Referral", "Social"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 310,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#fff"],
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontFamily: "Outfit, sans-serif",
      },
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      show: true,
      position: "bottom",
      fontFamily: "Outfit",
      markers: {
        size: 5,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              fontSize: "14px",
              fontFamily: "Outfit, sans-serif",
              color: "#6B7280",
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 260,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [45, 25, 20, 10];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartPieTwo" className="flex justify-center">
        <Chart options={options} series={series} type="donut" height={310} />
      </div>
    </div>
  );
}
