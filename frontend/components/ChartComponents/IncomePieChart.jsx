import React from "react";
import { Chart } from "react-google-charts";

//same thing as ExpensesPieChart but instead with incomeData

function IncomePieChart({ incomeData }) {
  const options = {
    is3D: true,
    width: 400,
    height: 400,
    legend: "none",
  };

  return (
    <div className="flex-column">
      <div className="text-xl font-medium text-gray-900 text-center">
        Income
      </div>

      {incomeData.length < 2 && (
        <div>Add Income To Visualize Your Finances.</div>
      )}

      {incomeData.length > 1 && (
        <Chart chartType="PieChart" data={incomeData} options={options} />
      )}
    </div>
  );
}

export default IncomePieChart;
