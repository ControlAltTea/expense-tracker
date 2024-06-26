import React from "react";
import { Chart } from "react-google-charts";

//same thing as ExpensesPieChart but instead with incomeData
function IncomePieChart({ incomeData }) {
  const options = {
    title: 'Income',
    backgroundColor: "transparent", 
    is3D: true,
    width: 400,
    height: 400,
    legend: "none",
  };

  return (
    <div className="flex-column">

      {incomeData.length < 2 && (
        <div className="p-6">Add Income To Visualize Your Finances.</div>
      )}

      {incomeData.length > 1 && (
        <Chart chartType="PieChart" data={incomeData} options={options} />
      )}
    </div>
  );
}

export default IncomePieChart;
