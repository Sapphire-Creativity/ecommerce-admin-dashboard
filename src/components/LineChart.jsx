import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useEffect, useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function EcommerceTrendsChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255, 122, 0, 0.4)");
    gradient.addColorStop(1, "rgba(255, 122, 0, 0)");

    // Apply gradient background dynamically
    chart.data.datasets.forEach((dataset) => {
      if (dataset.fill) dataset.backgroundColor = gradient;
    });
    chart.update();
  }, []);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [1400, 1000, 2000, 2500, 4000, 4200, 4600, 3000, 3000],
        borderColor: "#ff7a00",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: "#ff7a00",
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
        borderWidth: 1.5,
      },
      {
        label: "Orders",
        data: [200, 380, 450, 500, 550, 600, 670, 400, 600],
        borderColor: "#ff7a00",
        borderDash: [4, 1],
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: "#ff7a00",
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // keeps chart flexible
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151",
          font: { size: 10, weight: "400" },
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#f3f4f6",
        padding: 8,
        borderColor: "#ff7a00",
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "#6b7280", font: { size: 9 } },
        grid: { color: "#e5e7eb" },
      },
      y: {
        ticks: { color: "#6b7280", font: { size: 9 } },
        grid: { color: "#f3f4f6" },
      },
    },
    animation: {
      duration: 1800,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg h-[350px] flex flex-col">
      {/* Fixed Header */}
      <div className="p-3 border-b border-gray-100">
        <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-[#ff7a00]">📈</span>
          E-commerce Performance
        </h4>
      </div>

      {/* Scrollable Chart */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="h-[280px] min-w-[500px]">
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
