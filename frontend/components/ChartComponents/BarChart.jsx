import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  chartArea: { width: "65%" },
  hAxis: {
    title: "Amount in $",
    minValue: 0,
  },
  colors: ["#109618", "#dc3912"],
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
        <div

        // conditionally render background depending if negative or not
          className={`text-l w-3/12 rounded-lg font-medium text-center text-white p-3 m-12 ${
            netIncome < 0 ? "bg-[#dc3912]" : "bg-[#109618]"
          }`}

          // template literal with Math.abs() return positive number. conditionally render depending if number is negative or not
        >
          Monthly Net Income: {netIncome < 0 ? `-$${Math.abs(netIncome)}` : `$${netIncome}`}
        </div>
      </div>
    </>
  );
}

export default BarChart;
