import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, LinearScale } from "chart.js";
Chart.register(CategoryScale, LinearScale);

const ChartComponent = ({ watch }) => {
  const [data, setData] = React.useState();
  
  let category_6 = parseInt(watch("amount.category_6"));
  let category_7 = parseInt(watch("amount.category_7"));
  let category_8 = parseInt(watch("amount.category_8"));
  let category_9 = parseInt(watch("amount.category_9"));
  let category_10 = parseInt(watch("amount.category_10"));

  React.useEffect(() => {
    const chartData = {
      labels: [
        "Custom",
        "Category 1",
        "category_8",
        "category_9",
        "category_10",
      ],
      datasets: [
        {
          label: "Prices",
          data: [category_6, category_7, category_8, category_9, category_10],
          backgroundColor: "#F0C3F1",
          borderColor: "#FFFFFF",
          borderWidth: 1,
        },
      ],
    };
    setData(chartData);
  }, [category_6, category_7, category_8, category_9, category_10]);

  return (
    <div className="h-[400px] w-full">
      {data && <Bar data={data} options={{ maintainAspectRatio: false }} />}
    </div>
  );
};

export default ChartComponent;
