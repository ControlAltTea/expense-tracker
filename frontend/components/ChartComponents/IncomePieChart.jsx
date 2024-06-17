import React from "react";
import { Chart } from "react-google-charts";

//same thing as ExpensesPieChart but instead with incomeData
function IncomePieChart({ incomeData }) {
  const options = {
    title: 'Income',
    is3D: true,
    width: 450,
    height: 450,
    legend: "none",
  };

  return (
    <div className="flex-column">

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
