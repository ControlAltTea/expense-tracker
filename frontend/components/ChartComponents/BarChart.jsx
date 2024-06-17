import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  chartArea: { width: "65%" },
  hAxis: {
    title: "Amount in $",
    minValue: 0,
  },
};

//pass barData and netIncome to render in child component
function BarChart({ barData, netIncome }) {
  return (
    <>
      <Chart
        chartType="BarChart"
        width="100%"
        height="200px"
        data={barData}
        options={options}
      />
      <div className="text-xl font-medium text-gray-900 text-center p-8">
        Net Income: {netIncome}
      </div>
    </>
  );
}

export default BarChart;
