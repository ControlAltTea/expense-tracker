import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  chartArea: { width: "65%" },
  hAxis: {
    title: "Amount in $",
    minValue: 0,
  },
  colors: ['#109618','#dc3912']
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
      <div className="flex justify-center">
        <div className="text-l w-3/12 rounded-lg bg-green-400 font-medium text-center text-white p-3 m-12">
          Net Income: {netIncome}
        </div>
      </div>
    </>
  );
}

export default BarChart;
